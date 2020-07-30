import { Router, Request, Response } from 'express'
import { addProduct, getProducts, deleteProduct, getOneProduct, updateOneProduct } from '@controllers/product'

const router = Router()

// Product router
router.post('/', (req: Request, res: Response) => {
  return addProduct(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getProducts(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteProduct(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneProduct(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneProduct(req, res)
})

module.exports = router
