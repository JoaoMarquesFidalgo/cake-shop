import { paymentError } from './../utils/errorMessage'
import { Request, Response } from 'express'
import { PaymentTypeModel, Payment } from '@models/Payment'
import { paymentSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'

function addPaymentType (req: Request, res: Response): void {
  handlePostPromise(createPaymentTypeAsync, req, res, paymentSuccess['1000'], paymentError['1000'], Payment)
}

async function createPaymentTypeAsync (paymentType: Payment): Promise<Payment> {
  if (!paymentType.deliveryStatus || !paymentType.deliveryStatus || !paymentType.deliveryStatus) {
    throw paymentError['1006']
  }
  const { _id: id } = await PaymentTypeModel.create(paymentType)
  return await PaymentTypeModel.findById(id).exec()
}

function getPaymentTypes (req: Request, res: Response) {
  handleGetPromise(getPaymentTypesAsync, res, paymentSuccess['1001'], paymentError['1001'], Payment)
}

async function getPaymentTypesAsync (): Promise<Payment[]> {
  return await PaymentTypeModel.find().exec()
}

function deletePaymentType (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deletePaymentTypeAsync, res, paymentSuccess['1002'], paymentError['1002'], Payment)
}

async function deletePaymentTypeAsync (id: string): Promise<Payment> {
  const deleted = await PaymentTypeModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw paymentError['1002']
  }
  return deleted
}

function getOnePaymentType (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOnePaymentTypeAsync, res, paymentSuccess['1003'], paymentError['1003'], Payment)
}

async function getOnePaymentTypeAsync (id: string): Promise<Payment> {
  const getOnePaymentType = await PaymentTypeModel.findById(id).exec()
  if (!getOnePaymentType) {
    throw paymentError['1003']
  }
  return getOnePaymentType
}

function updateOnePaymentType (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOnePaymentTypeTypeAsync, req, res, paymentSuccess['1004'], paymentError['1004'], Payment)
}

async function updateOnePaymentTypeTypeAsync (id: string, paymentType: Payment): Promise<Payment> {
  if (Object.keys(paymentType).length === 0) {
    throw paymentError['1005']
  }

  if (!paymentType.deliveryStatus || !paymentType.deliveryStatus || !paymentType.deliveryStatus) {
    throw paymentError['1006']
  }

  const getOnePaymentType = await PaymentTypeModel.findByIdAndUpdate(id, paymentType, { new: true }).exec()
  if (!getOnePaymentType) {
    throw paymentError['1004']
  }
  return getOnePaymentType
}

export { addPaymentType, getPaymentTypes, deletePaymentType, getOnePaymentType, updateOnePaymentType }
