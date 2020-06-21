import { paymentTypeError } from './../utils/errorMessage'
import { Request, Response } from 'express'
import { PaymentTypeModel, PaymentType } from '@models/PaymentType'
import { paymentTypeSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'

function addPaymentType (req: Request, res: Response): void {
  handlePostPromise(createPaymentTypeAsync, req, res, paymentTypeSuccess['1000'], paymentTypeError['1000'], PaymentType)
}

async function createPaymentTypeAsync (paymentType: PaymentType): Promise<PaymentType> {
  const newPaymentType = new PaymentType()
  newPaymentType.type = paymentType.type
  const { _id: id } = await PaymentTypeModel.create(newPaymentType as PaymentType)
  return await PaymentTypeModel.findById(id).exec()
}

function getPaymentTypes (req: Request, res: Response) {
  handleGetPromise(getPaymentTypesAsync, res, paymentTypeSuccess['1001'], paymentTypeError['1001'], PaymentType)
}

async function getPaymentTypesAsync (): Promise<PaymentType[]> {
  return await PaymentTypeModel.find().exec()
}

function deletePaymentType (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deletePaymentTypeAsync, res, paymentTypeSuccess['1002'], paymentTypeError['1002'], PaymentType)
}

async function deletePaymentTypeAsync (id: string): Promise<PaymentType> {
  const deleted = await PaymentTypeModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw paymentTypeError['1002']
  }
  return deleted
}

function getOnePaymentType (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOnePaymentTypeAsync, res, paymentTypeSuccess['1003'], paymentTypeError['1003'], PaymentType)
}

async function getOnePaymentTypeAsync (id: string): Promise<PaymentType> {
  const getOnePaymentType = await PaymentTypeModel.findById(id).exec()
  if (!getOnePaymentType) {
    throw paymentTypeError['1003']
  }
  return getOnePaymentType
}

function updateOnePaymentType (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOnePaymentTypeTypeAsync, req, res, paymentTypeSuccess['1004'], paymentTypeError['1004'], PaymentType)
}

async function updateOnePaymentTypeTypeAsync (id: string, paymentType: PaymentType): Promise<PaymentType> {
  if (Object.keys(paymentType).length === 0) {
    throw paymentTypeError['1005']
  }

  const getOnePaymentType = await PaymentTypeModel.findByIdAndUpdate(id, paymentType, { new: true }).exec()
  if (!getOnePaymentType) {
    throw paymentTypeError['1004']
  }
  return getOnePaymentType
}

export { addPaymentType, getPaymentTypes, deletePaymentType, getOnePaymentType, updateOnePaymentType }
