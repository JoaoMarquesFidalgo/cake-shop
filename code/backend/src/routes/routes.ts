import { Router, Request, Response } from 'express'

const router = Router()
// Authentication router

router.get('/failed-login', (req: Request, res: Response): void => {
  res.status(200).json({ success: true, msg: 'Failed to login!' })
})

// Each route should be accessible from https://localhost:3000/<name-of-route>
router.use('/users', require('./users'))
router.use('/payments', require('./payments'))
router.use('/costumers', require('./costumers'))
router.use('/zones', require('./zones'))
router.use('/type-products', require('./type-products'))
router.use('/translations', require('./translations'))
router.use('/seos', require('./seos'))
router.use('/discounts', require('./discounts'))
router.use('/products', require('./products'))

export default router
