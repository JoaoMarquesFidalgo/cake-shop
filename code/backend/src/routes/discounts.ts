import { Router, Request, Response } from 'express'
import { addDiscount, getDiscounts, deleteDiscount, getOneDiscount, updateOneDiscount } from '@controllers/discount'

const router = Router()

// Discount router
router.post('/', (req: Request, res: Response) => {
  return addDiscount(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getDiscounts(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteDiscount(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneDiscount(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneDiscount(req, res)
})

module.exports = router
