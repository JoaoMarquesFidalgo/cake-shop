import { GeneralResponse } from '@models/GeneralResponse'
import { Response, Request } from 'express'

export function handlePostPromise (functionToCall: Function, req: Request, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall(req.body)
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch((errorMessage) => {
      if (errorMessage) {
        return res.json(new GeneralResponse({ ...errorMessage }))
      }
      return res.json(new GeneralResponse({ ...objectError }))
    })
}

export function handleGetPromise (functionToCall: Function, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall()
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch(() => {
      return res.json(new GeneralResponse({ ...objectError }))
    })
}

export function handleDeletePromise (id: string, functionToCall: Function, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall(id)
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch((errorMessage) => {
      if (errorMessage) {
        return res.json(new GeneralResponse({ ...errorMessage }))
      }
      return res.json(new GeneralResponse({ ...objectError }))
    })
}

export function handleGetOnePromise (id: string, functionToCall: Function, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall(id)
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch((errorMessage) => {
      if (errorMessage) {
        return res.json(new GeneralResponse({ ...errorMessage }))
      }
      return res.json(new GeneralResponse({ ...objectError }))
    })
}

export function handleUpdatePromise (id: string, functionToCall: Function, req: Request, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall(id, req.body)
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch((errorMessage) => {
      if (errorMessage) {
        return res.json(new GeneralResponse({ ...errorMessage }))
      }
      return res.json(new GeneralResponse({ ...objectError }))
    })
}

export function handleAuthPromise (functionToCall: Function, req: Request, res: Response, objectSuccess: Object, objectError: Object, objectType: Object) {
  functionToCall(req.body)
    .then((response: typeof objectType) => {
      return res.json(new GeneralResponse({ response, ...objectSuccess }))
    })
    .catch((errorMessage) => {
      if (errorMessage) {
        return res.json(new GeneralResponse({ ...errorMessage }))
      }
      return res.json(new GeneralResponse({ ...objectError }))
    })
}
