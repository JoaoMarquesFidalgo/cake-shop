import { Router, Request, Response } from 'express'
import { addPayment, getPayments, deletePayment, getOnePayment, updateOnePayment } from '@controllers/payment'
import { addCostumer, getCostumers, disableCostumer, getOneCostumer } from '@controllers/costumer'

const routes = Router()

// Payment Routes
routes.post('/payment', (req: Request, res: Response) => {
  return addPayment(req, res)
})
routes.get('/payment', (req: Request, res: Response) => {
  return getPayments(req, res)
})
routes.delete('/payment/:id', (req: Request, res: Response) => {
  return deletePayment(req, res)
})
routes.get('/payment/:id', (req: Request, res: Response) => {
  return getOnePayment(req, res)
})
routes.put('/payment/:id', (req: Request, res: Response) => {
  return updateOnePayment(req, res)
})

// Costumer Routes
routes.post('/costumer', (req: Request, res: Response) => {
  return addCostumer(req, res)
})

routes.get('/costumer', (req: Request, res: Response) => {
  return getCostumers(req, res)
})
routes.delete('/costumer/:id', (req: Request, res: Response) => {
  return disableCostumer(req, res)
})
routes.get('/costumer/:id', (req: Request, res: Response) => {
  return getOneCostumer(req, res)
})
routes.put('/costumer/:id', (req: Request, res: Response) => {
  return updateOnePayment(req, res)
})

// Authentication routes

routes.get('/failed-login', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, msg: 'Failed to login!' })
})

// Use the routes defined in `./users.js` for all activity to http://localhost:3000/users/
routes.use('/users', require('./users'))

export default routes
