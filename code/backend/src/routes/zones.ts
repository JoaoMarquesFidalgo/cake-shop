import { Router, Request, Response } from 'express'
import { addZone, getZones, deleteZone, getOneZone, updateOneZone } from '@controllers/zone'

const router = Router()

// Zone router
router.post('/', (req: Request, res: Response) => {
  return addZone(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getZones(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteZone(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneZone(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneZone(req, res)
})

module.exports = router
