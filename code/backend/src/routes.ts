import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/users', (req: Request, res: Response) => {
  return res.json([{ name: 'joao', email: 'joao@email.com' }])
})

export default routes
