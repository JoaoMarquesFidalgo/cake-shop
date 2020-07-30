import { typesOfValue } from 'src/enum/typesValues'
import { discountError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { DiscountModel, Discount } from '@models/Discount'
import { discountSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { ObjectId } from 'mongodb'

function addDiscount (req: Request, res: Response): void {
  handlePostPromise(createDiscountAsync, req, res, discountSuccess['8000'], discountError['8000'], Discount)
}

async function createDiscountAsync (discount: Discount): Promise<Discount> {
  if (!discount.value) {
    throw discountError['8005']
  }
  if (!verifyDiscountFields(discount)) {
    throw generalError['801']
  }
  try {
    discount._id = new ObjectId()
    const { _id: id } = await DiscountModel.create(discount)
    return await DiscountModel.findById(id).exec()
  } catch (err) {
    throw discountError['8006']
  }
}

function getDiscounts (req: Request, res: Response) {
  handleGetPromise(getDiscountsAsync, res, discountSuccess['8001'], discountError['8001'], Discount)
}

async function getDiscountsAsync (): Promise<Discount[]> {
  return await DiscountModel.find().exec()
}

function deleteDiscount (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteDiscountAsync, res, discountSuccess['8002'], discountError['8002'], Discount)
}

async function deleteDiscountAsync (id: string): Promise<Discount> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await DiscountModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw discountError['8002']
  }
  return deleted
}

function getOneDiscount (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneDiscountAsync, res, discountSuccess['8003'], discountError['8003'], Discount)
}

async function getOneDiscountAsync (id: string): Promise<Discount> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneDiscount = await DiscountModel.findById(id).exec()
  if (!getOneDiscount) {
    throw discountError['8003']
  }
  return getOneDiscount
}

function updateOneDiscount (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneDiscountTypeAsync, req, res, discountSuccess['8004'], discountError['8004'], Discount)
}

async function updateOneDiscountTypeAsync (id: string, discount: Discount): Promise<Discount> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(discount).length === 0) {
    throw discountError['8005']
  }
  if (!discount.value) {
    throw discountError['8005']
  }
  if (!verifyDiscountFields(discount)) {
    throw generalError['801']
  }
  try {
    const getOneDiscount = await DiscountModel.findByIdAndUpdate(id, discount, { new: true }).exec()
    if (!getOneDiscount) {
      throw discountError['8004']
    }
    return getOneDiscount
  } catch (err) {
    throw discountError['8006']
  }
}

function verifyDiscountFields (discount: Discount): Boolean {
  return Boolean(sanitizeValidateValue(typesOfValue.NUMBER, discount.value))
}

export { addDiscount, getDiscounts, deleteDiscount, getOneDiscount, updateOneDiscount, verifyDiscountFields, createDiscountAsync, getDiscountsAsync }
