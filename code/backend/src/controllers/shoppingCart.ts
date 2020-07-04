import { verifyDiscountFields } from '@controllers/discount'
import { verifyPaymentFields } from '@controllers/payment'
import { createProductAsync, verifyProductFields } from '@controllers/product'
import { typesOfValue } from '@enum/typesValues'
import { DiscountModel } from '@models/Discount'
import { Product, ProductModel } from '@models/Product'
import { ProductReceived } from '@models/ProductReceived'
import { ShoppingCart, ShoppingCartModel } from '@models/ShoppingCart'
import { generalError, shoppingCartError } from '@utils/errorMessage'
import { handleDeletePromise, handleGetOnePromise, handleGetPromise, handlePostPromise, handleUpdatePromise } from '@utils/handlePromise'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { shoppingCartSuccess } from '@utils/successMessage'
import { verifyObjectId } from '@utils/verifyObjectId'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

function addShoppingCart (req: Request, res: Response): void {
  handlePostPromise(createShoppingCartAsync, req, res, shoppingCartSuccess['10000'], shoppingCartError['10000'], ShoppingCart)
}

async function createShoppingCartAsync (shoppingCart: ShoppingCart): Promise<ShoppingCart> {
  if (((shoppingCart.productsRef === undefined || shoppingCart.productsRef.length === 0) ||
  !shoppingCart.userRef || !shoppingCart.paymentRef) &&
    ((shoppingCart.productsFull === undefined || shoppingCart.productsFull.length === 0) || !shoppingCart.paymentFull)) {
    throw shoppingCartError['10006']
  }
  const shoppingCartVerified: ShoppingCart = verifyShoppingCartFields(shoppingCart)
  if (!shoppingCartVerified) {
    throw generalError['801']
  }

  // Handle products, either full or reference, and give shopping cart subtotal, discounted and total values
  let subtotal = 0
  let discounted = 0
  let total = 0
  if (shoppingCartVerified.productsFull && shoppingCartVerified.productsFull.length > 0) {
    for (const productFull of shoppingCartVerified.productsFull) {
      const productInserted = await createProductAsync(productFull)
      productFull._id = productInserted._id
      subtotal += productFull.price
      if (productFull.discount) discounted += productFull.price * productFull.discount.value
      total += (subtotal - discounted) * productFull.tax
    }
  }
  if (shoppingCartVerified.productsRef && shoppingCartVerified.productsRef.length > 0) {
    for (const productRef of shoppingCartVerified.productsRef) {
      try {
        const product = await ProductModel.findById(productRef)
        subtotal += product.price
        const discount = await DiscountModel.findById(shoppingCartVerified.discountRef)
        discounted += product.price * discount.value
        total += (subtotal - discounted) * (1 - product.tax)
      } catch (error) {
        throw generalError['802']
      }
    }
  }
  try {
    const shoppingCartToSave: ShoppingCart = shoppingCartVerified
    shoppingCartToSave.subtotal = subtotal
    shoppingCartToSave.discounted = discounted
    shoppingCartToSave.total = total
    return await ShoppingCartModel.create(shoppingCartToSave)
  } catch (err) {
    console.log(err)
    throw shoppingCartError['10000']
  }
}

function getShoppingCarts (req: Request, res: Response) {
  handleGetPromise(getShoppingCartsAsync, res, shoppingCartSuccess['10001'], shoppingCartError['10001'], ShoppingCart)
}

async function getShoppingCartsAsync (): Promise<ShoppingCart[]> {
  return await ShoppingCartModel.find().populate('productsRef').populate('userRef')
    .populate('discountRef').populate('paymentRef')
    .populate('paymentFull').populate({
      path: 'productsFull',
      model: 'Product'
    }).populate({
      path: 'discountFull',
      model: 'Discount'
    }).populate({
      path: 'paymentFull',
      model: 'Payment'
    }).populate({
      path: 'paymentFull',
      model: 'Payment'
    }).populate({
      path: 'productsFull',
      model: 'Product',
      populate: {
        path: 'name',
        model: 'Translation'
      }
    }).populate({
      path: 'productsRef',
      model: 'Product',
      populate: {
        path: 'name',
        model: 'Translation'
      }
    }).exec()
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

  const getOneShoppingCart = await ShoppingCartModel.findById(id).populate('productsRef')
    .populate('userRef').populate('discountRef').populate('paymentRef')
    .populate('paymentFull').populate({
      path: 'productsFull',
      model: 'Product'
    }).populate({
      path: 'discountFull',
      model: 'Discount'
    }).populate({
      path: 'paymentFull',
      model: 'Payment'
    }).populate({
      path: 'paymentFull',
      model: 'Payment'
    }).populate({
      path: 'productsFull',
      model: 'Product',
      populate: {
        path: 'name',
        model: 'Translation'
      }
    }).populate({
      path: 'productsRef',
      model: 'Product',
      populate: {
        path: 'name',
        model: 'Translation'
      }
    }).exec()
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
  const shoppingCartVerified: ShoppingCart = verifyShoppingCartFields(shoppingCart)
  if (!shoppingCartVerified) {
    throw generalError['801']
  }
  try {
    const getOneShoppingCart = await ShoppingCartModel.findByIdAndUpdate(id, shoppingCart, { new: true }).exec()
    if (!getOneShoppingCart) {
      throw shoppingCartError['10004']
    }
    return getOneShoppingCart
  } catch (err) {
    throw shoppingCartError['10007']
  }
}

function verifyShoppingCartFields (shoppingCart: ShoppingCart): ShoppingCart {
  // Payment method
  if (shoppingCart.paymentRef) {
    verifyObjectId(String(shoppingCart.paymentRef))
  } else if (shoppingCart.paymentFull) {
    shoppingCart.paymentFull = verifyPaymentFields(shoppingCart.paymentFull)
  }

  // User
  const userRefValidated = verifyObjectId(String(shoppingCart.userRef))
  if (userRefValidated) {
    shoppingCart.userRef = new ObjectId(String(shoppingCart.userRef))
  } else {
    throw generalError['800']
  }

  // Products
  if (shoppingCart.productsRef) {
    shoppingCart.productsRef.forEach((product: Product) => {
      verifyObjectId(String(product))
    })
  } else if (shoppingCart.productsFull) {
    shoppingCart.productsFull.forEach((product: ProductReceived) => {
      verifyProductFields(product)
    })
  }

  // Discount
  if (shoppingCart.discountRef) {
    verifyObjectId(String(shoppingCart.discountRef))
  } else if (shoppingCart.discountFull) {
    if (!verifyDiscountFields(shoppingCart.discountFull)) throw generalError['801']
  }

  // Comments
  if (shoppingCart.comments.length > 0) {
    const comments = []
    shoppingCart.comments.forEach((comment) => {
      comments.push(sanitizeValidateValue(typesOfValue.WORD, comment))
    })
    shoppingCart.comments = comments
  }
  return shoppingCart
}

export { addShoppingCart, getShoppingCarts, deleteShoppingCart, getOneShoppingCart, updateOneShoppingCart, verifyShoppingCartFields, createShoppingCartAsync, getShoppingCartsAsync }
