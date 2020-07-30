import { Router, Request, Response } from 'express'
import { addShoppingCart, getShoppingCarts, deleteShoppingCart, getOneShoppingCart, updateOneShoppingCart } from '@controllers/shoppingCart'

const router = Router()

// ShoppingCart router
router.post('/', (req: Request, res: Response) => {
  return addShoppingCart(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getShoppingCarts(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteShoppingCart(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneShoppingCart(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneShoppingCart(req, res)
})

module.exports = router
