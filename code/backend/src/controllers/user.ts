import { userSuccess } from './../utils/successMessage'
import { handlePostPromise, handleAuthPromise } from '@utils/handlePromise'
import { userError } from './../utils/errorMessage'
import { UserModel, User } from '@models/User'
import { Request, Response } from 'express'
import * as utils from '@utils/passportHandle'
import { ObjectId } from 'mongodb'

export function authenticateUser (req: Request, res: Response) {
  handleAuthPromise(authenticateUserAsync, req, res, userSuccess['3001'], userError['3001'], User)
}

async function authenticateUserAsync (user: User) {
  const userFound = await UserModel.findOne({ email: user.email })
  if (!userFound) {
    throw userError['3001']
  }

  const isValid = utils.validPassword(user.password, userFound.hash, userFound.salt)

  if (!isValid) {
    throw userError['3001']
  }
  const tokenObject = utils.issueJWT(userFound)
  return {
    token: tokenObject.token, expiresIn: tokenObject.expires
  }
}

export function registerUser (req: Request, res: Response) {
  handlePostPromise(registerUserAsync, req, res, userSuccess['3000'], userError['3001'], User)
}

async function registerUserAsync (user: User): Promise<User> {
  if (!user.email) {
    throw userError['3000']
  }

  const saltHash = utils.genPassword(user.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new UserModel()
  newUser._id = new ObjectId()
  newUser.email = user.email
  newUser.hash = hash
  newUser.salt = salt

  // Email already exists
  try {
    return await UserModel.create(newUser)
  } catch (error) {
    throw userError['3002']
  }
}
