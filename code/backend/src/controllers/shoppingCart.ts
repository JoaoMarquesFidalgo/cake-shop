import { typesOfValue } from 'src/enum/typesValues'
import { shoppingCartError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { ShoppingCartModel, ShoppingCart } from '@models/ShoppingCart'
import { shoppingCartSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { ObjectId } from 'mongodb'
import { ShoppingCartReceived } from '@models/ShoppingCartReceived'
import { verifyPaymentFields } from '@controllers/payment'
import { verifyCostumerFields } from '@controllers/costumer'

function addShoppingCart (req: Request, res: Response): void {
  handlePostPromise(createShoppingCartAsync, req, res, shoppingCartSuccess['10000'], shoppingCartError['10000'], ShoppingCart)
}

async function createShoppingCartAsync (shoppingCart: ShoppingCartReceived): Promise<ShoppingCart> {
  if (shoppingCart.products.length === 0 || !shoppingCart.costumer || !shoppingCart.payment) {
    throw shoppingCartError['10006']
  }
  const shoppingCartVerified: ShoppingCart = verifyShoppingCartFields(shoppingCart)
  if (!shoppingCartVerified) {
    throw generalError['801']
  }
  try {
    shoppingCart._id = new ObjectId()
    shoppingCart.name = shoppingCartVerified.name
    const { _id: id } = await ShoppingCartModel.create(shoppingCart)
    return await ShoppingCartModel.findById(id).exec()
  } catch (err) {
    throw shoppingCartError['10007']
  }
}

function getShoppingCarts (req: Request, res: Response) {
  handleGetPromise(getShoppingCartsAsync, res, shoppingCartSuccess['10001'], shoppingCartError['10001'], ShoppingCart)
}

async function getShoppingCartsAsync (): Promise<ShoppingCart[]> {
  return await ShoppingCartModel.find().exec()
}

function deleteShoppingCart (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteShoppingCartAsync, res, shoppingCartSuccess['10002'], shoppingCartError['10002'], ShoppingCart)
}

async function deleteShoppingCartAsync (id: string): Promise<ShoppingCart> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await ShoppingCartModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw shoppingCartError['10002']
  }
  return deleted
}

function getOneShoppingCart (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneShoppingCartAsync, res, shoppingCartSuccess['10003'], shoppingCartError['10003'], ShoppingCart)
}

async function getOneShoppingCartAsync (id: string): Promise<ShoppingCart> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneShoppingCart = await ShoppingCartModel.findById(id).exec()
  if (!getOneShoppingCart) {
    throw shoppingCartError['10003']
  }
  return getOneShoppingCart
}

function updateOneShoppingCart (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneShoppingCartTypeAsync, req, res, shoppingCartSuccess['10004'], shoppingCartError['10004'], ShoppingCart)
}

async function updateOneShoppingCartTypeAsync (id: string, shoppingCart: ShoppingCart): Promise<ShoppingCart> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(shoppingCart).length === 0) {
    throw shoppingCartError['10005']
  }
  if (!shoppingCart.name) {
    throw shoppingCartError['10006']
  }
  const shoppingCartVerified: ShoppingCart = verifyShoppingCartFields(shoppingCart)
  if (!shoppingCartVerified) {
    throw generalError['801']
  }
  try {
    shoppingCart.name = shoppingCartVerified.name
    const getOneShoppingCart = await ShoppingCartModel.findByIdAndUpdate(id, shoppingCart, { new: true }).exec()
    if (!getOneShoppingCart) {
      throw shoppingCartError['10004']
    }
    return getOneShoppingCart
  } catch (err) {
    throw shoppingCartError['10007']
  }
}

function verifyShoppingCartFields (shoppingCart: ShoppingCartReceived): ShoppingCartReceived {
  shoppingCart.payment = verifyPaymentFields(shoppingCart.payment)
  // shoppingCart.user = verifyUserFields(shoppingCart.user)

  return shoppingCart
}

export { addShoppingCart, getShoppingCarts, deleteShoppingCart, getOneShoppingCart, updateOneShoppingCart, verifyShoppingCartFields, createShoppingCartAsync, getShoppingCartsAsync }
