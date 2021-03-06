import { generalError } from '@utils/errorMessage'
import { userSuccess } from './../utils/successMessage'
import { handlePostPromise, handleAuthPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { userError } from './../utils/errorMessage'
import { UserModel, User } from '@models/User'
import { Request, Response } from 'express'
import * as utils from '@utils/passportHandle'
import { ObjectId } from 'mongodb'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { typesOfValue } from '@enum/typesValues'

function authenticateUser (req: Request, res: Response) {
  handleAuthPromise(authenticateUserAsync, req, res, userSuccess['3001'], userError['3011'], User)
}

async function authenticateUserAsync (user: User) {
  const userFound = await UserModel.findOne({ email: user.email })
  if (!userFound) {
    throw userError['3013']
  }

  const isValid = utils.validPassword(user.password, userFound.hash, userFound.salt)
  if (!isValid) {
    throw userError['3013']
  }

  const tokenObject = utils.issueJWT(userFound)
  return {
    token: tokenObject.token, expiresIn: tokenObject.expires
  }
}

function registerUser (req: Request, res: Response) {
  handlePostPromise(registerUserAsync, req, res, userSuccess['3000'], userError['3000'], User)
}

async function registerUserAsync (user: User): Promise<User> {
  if (!user.email) {
    throw userError['3000']
  }
  let newUser = new User()
  newUser = verifyUserFields(user)
  const saltHash = utils.genPassword(user.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  newUser._id = new ObjectId()
  newUser.email = user.email
  newUser.hash = hash
  newUser.salt = salt
  newUser.active = true

  // Email already exists
  try {
    return await UserModel.create(newUser)
  } catch (error) {
    throw userError['3000']
  }
}

function getUsers (req: Request, res: Response) {
  handleGetPromise(getUsersAsync, res, userSuccess['3004'], userError['3001'], User)
}

async function getUsersAsync (): Promise<User[]> {
  // Return active users or users that don't have that propriety
  return await UserModel.find({
    $or: [{ active: { $exists: false } }, { active: true }]
  }).exec()
}

function disableUser (req: Request, res: Response) {
  handleDeletePromise(req.params.id, disableUserAsync, res, userSuccess['3005'], userError['3002'], User)
}

async function disableUserAsync (id: string): Promise<User> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const userFound = await UserModel.findById(id).exec()
  if (!userFound) {
    throw userError['3002']
  }

  return await UserModel.findByIdAndUpdate(id, { $set: { active: !userFound.active } }).exec()
}

function getOneUser (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneUserAsync, res, userSuccess['3006'], userError['3003'], User)
}

async function getOneUserAsync (id: string): Promise<User> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneUser = await UserModel.findById(id).exec()
  if (!getOneUser) {
    throw userError['3003']
  }
  return getOneUser
}

function updateOneUser (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneUserTypeAsync, req, res, userSuccess['3007'], userError['3004'], User)
}

async function updateOneUserTypeAsync (id: string, user: User): Promise<User> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(user).length === 0) {
    throw userError['3005']
  }
  if (!user.email) {
    throw userError['3006']
  }
  const userVerified: User = verifyUserFields(user)
  if (!userVerified) {
    throw generalError['801']
  }
  if (user.password) {
    const saltHash = utils.genPassword(user.password)
    userVerified.salt = saltHash.salt
    userVerified.hash = saltHash.hash
    userVerified.password = undefined
  }

  try {
    return await UserModel.findByIdAndUpdate(id, user, { new: true }).exec()
  } catch (err) {
    throw userError['3008']
  }
}

function verifyUserFields (user: User): User {
  const email = sanitizeValidateValue(typesOfValue.EMAIL, user.email)
  if (email) {
    user.email = String(email)
  } else {
    throw userError['3010']
  }
  if (user.name) user.name = String(sanitizeValidateValue(typesOfValue.WORD, user.name))
  return user
}

export { authenticateUser, registerUser, getUsers, disableUser, getOneUser, updateOneUser, verifyUserFields }
