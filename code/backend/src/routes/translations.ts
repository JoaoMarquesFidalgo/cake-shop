import { Router, Request, Response } from 'express'
import { addTranslation, getTranslations, deleteTranslation, getOneTranslation, updateOneTranslation } from '@controllers/translation'

const router = Router()

// Translation router
router.post('/', (req: Request, res: Response) => {
  return addTranslation(req, res)
})
router.get('/', (req: Request, res: Response) => {
  return getTranslations(req, res)
})
router.delete('/:id', (req: Request, res: Response) => {
  return deleteTranslation(req, res)
})
router.get('/:id', (req: Request, res: Response) => {
  return getOneTranslation(req, res)
})
router.put('/:id', (req: Request, res: Response) => {
  return updateOneTranslation(req, res)
})

module.exports = router
