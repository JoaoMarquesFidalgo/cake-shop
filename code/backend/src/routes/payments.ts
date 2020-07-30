import { Router, Request, Response } from 'express'
import { addPayment, getPayments, deletePayment, getOnePayment, updateOnePayment } from '@controllers/payment'

const router = Router()

// Payment router
router.post('/', (req: Request, res: Response) => {
  return addPayment(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getPayments(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deletePayment(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOnePayment(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOnePayment(req, res)
})

module.exports = router
