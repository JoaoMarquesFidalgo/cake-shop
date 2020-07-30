import { Router, Request, Response } from 'express'
import { addCostumer, getCostumers, disableCostumer, getOneCostumer, updateOneCostumer } from '@controllers/costumer'

const router = Router()

// Costumer router
router.post('/', (req: Request, res: Response) => {
  return addCostumer(req, res)
})

router.get('/', (req: Request, res: Response) => {
  return getCostumers(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return disableCostumer(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneCostumer(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneCostumer(req, res)
})

module.exports = router
