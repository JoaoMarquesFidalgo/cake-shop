import { typesOfValue } from 'src/enum/typesValues'
import { paymentError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { PaymentModel, Payment } from '@models/Payment'
import { paymentSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'

function addPayment (req: Request, res: Response): void {
  handlePostPromise(createPaymentAsync, req, res, paymentSuccess['1000'], paymentError['1000'], Payment)
}

async function createPaymentAsync (payment: Payment): Promise<Payment> {
  if (!payment.paymentMethod || !payment.paymentStatus || !payment.deliveryStatus) {
    throw paymentError['1006']
  }
  if (!verifyPaymentFields(payment)) {
    throw generalError['801']
  }

  const { _id: id } = await PaymentModel.create(payment)
  return await PaymentModel.findById(id).exec()
}

function getPayments (req: Request, res: Response) {
  handleGetPromise(getPaymentsAsync, res, paymentSuccess['1001'], paymentError['1001'], Payment)
}

async function getPaymentsAsync (): Promise<Payment[]> {
  return await PaymentModel.find().exec()
}

function deletePayment (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deletePaymentAsync, res, paymentSuccess['1002'], paymentError['1002'], Payment)
}

async function deletePaymentAsync (id: string): Promise<Payment> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await PaymentModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw paymentError['1002']
  }
  return deleted
}

function getOnePayment (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOnePaymentAsync, res, paymentSuccess['1003'], paymentError['1003'], Payment)
}

async function getOnePaymentAsync (id: string): Promise<Payment> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOnePayment = await PaymentModel.findById(id).exec()
  if (!getOnePayment) {
    throw paymentError['1003']
  }
  return getOnePayment
}

function updateOnePayment (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOnePaymentTypeAsync, req, res, paymentSuccess['1004'], paymentError['1004'], Payment)
}

async function updateOnePaymentTypeAsync (id: string, payment: Payment): Promise<Payment> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(payment).length === 0) {
    throw paymentError['1005']
  }
  if (!payment.paymentMethod || !payment.paymentStatus || !payment.deliveryStatus) {
    throw paymentError['1006']
  }
  if (!verifyPaymentFields(payment)) {
    throw generalError['801']
  }

  const getOnePayment = await PaymentModel.findByIdAndUpdate(id, payment, { new: true }).exec()
  if (!getOnePayment) {
    throw paymentError['1004']
  }
  return getOnePayment
}

function verifyPaymentFields (payment: Payment): boolean {
  const validDS = sanitizeValidateValue(typesOfValue.WORD, payment.deliveryStatus)
  if (!validDS) return false
  const validPM = sanitizeValidateValue(typesOfValue.WORD, payment.paymentMethod)
  if (!validPM) return false
  const validPS = sanitizeValidateValue(typesOfValue.WORD, payment.paymentStatus)
  if (!validPS) return false
  return true
}

export { addPayment, getPayments, deletePayment, getOnePayment, updateOnePayment }
