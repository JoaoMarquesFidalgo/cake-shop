import { Router, Request, Response } from 'express'
import { addPaymentType, getPaymentTypes, deletePaymentType, getOnePaymentType, updateOnePaymentType } from '@controllers/payment'

const routes = Router()

routes.get('/users', (req: Request, res: Response) => {
  return res.json([{ name: 'joao', email: 'joao@email.com' }])
})

// Payment types
routes.post('/paymentType', (req: Request, res: Response) => {
  return addPaymentType(req, res)
})
routes.get('/paymentType', (req: Request, res: Response) => {
  return getPaymentTypes(req, res)
})
routes.delete('/paymentType/:id', (req: Request, res: Response) => {
  return deletePaymentType(req, res)
})
routes.get('/paymentType/:id', (req: Request, res: Response) => {
  return getOnePaymentType(req, res)
})
routes.put('/paymentType/:id', (req: Request, res: Response) => {
  return updateOnePaymentType(req, res)
})

export default routes
