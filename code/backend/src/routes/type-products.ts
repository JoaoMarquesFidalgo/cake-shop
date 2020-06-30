import { Router, Request, Response } from 'express'
import { addTypeProduct, getTypeProducts, deleteTypeProduct, getOneTypeProduct, updateOneTypeProduct } from '@controllers/typeProduct'

const router = Router()

// TypeProduct router
router.post('/', (req: Request, res: Response) => {
  return addTypeProduct(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getTypeProducts(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteTypeProduct(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneTypeProduct(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneTypeProduct(req, res)
})

module.exports = router
