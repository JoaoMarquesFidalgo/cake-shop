import { Router, Request, Response } from 'express'
import { addPaymentType, getPaymentTypes, deletePaymentType, getOnePaymentType, updateOnePaymentType } from '@controllers/payment'

const routes = Router()

// Payment Routes
routes.post('/payment', (req: Request, res: Response) => {
  return addPaymentType(req, res)
})
routes.get('/payment', (req: Request, res: Response) => {
  return getPaymentTypes(req, res)
})
routes.delete('/payment/:id', (req: Request, res: Response) => {
  return deletePaymentType(req, res)
})
routes.get('/payment/:id', (req: Request, res: Response) => {
  return getOnePaymentType(req, res)
})
routes.put('/payment/:id', (req: Request, res: Response) => {
  return updateOnePaymentType(req, res)
})

export default routes
