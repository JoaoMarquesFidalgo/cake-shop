import { Router, Request, Response } from 'express'

const router = Router()
// Authentication router

router.get('/failed-login', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, msg: 'Failed to login!' })
})

// Each route should be accessible from https://localhost:3000/<name-of-route>
router.use('/user', require('./users'))
router.use('/payment', require('./payments'))
router.use('/costumer', require('./costumers'))
router.use('/zone', require('./zones'))
router.use('/type-product', require('./type-products'))
router.use('/translation', require('./translations'))
router.use('/seo', require('./seos'))
router.use('/discount', require('./discounts'))
router.use('/product', require('./products'))
router.use('/shopping-cart', require('./shopping-carts'))

export default router
