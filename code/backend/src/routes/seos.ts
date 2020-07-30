import { Router, Request, Response } from 'express'
import { addSeo, getSeos, deleteSeo, getOneSeo, updateOneSeo } from '@controllers/seo'

const router = Router()

// Seo router
router.post('/', (req: Request, res: Response) => {
  return addSeo(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getSeos(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteSeo(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneSeo(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneSeo(req, res)
})

module.exports = router
