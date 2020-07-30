import { Costumer, CostumerModel } from '@models/Costumer'
import { generalError, userError } from '@utils/errorMessage'
import { handleDeletePromise, handleGetOnePromise, handleGetPromise, handlePostPromise, handleUpdatePromise } from '@utils/handlePromise'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { costumerSuccess } from '@utils/successMessage'
import { verifyObjectId } from '@utils/verifyObjectId'
import { Request, Response } from 'express'
import { typesOfValue } from 'src/enum/typesValues'

function addCostumer (req: Request, res: Response): void {
  handlePostPromise(createCostumerAsync, req, res, costumerSuccess['2000'], userError['3000'], Costumer)
}

async function createCostumerAsync (costumer: Costumer): Promise<Costumer> {
  if (!costumer.email) {
    throw userError['3007']
  }
  const emailExists = await CostumerModel.findOne({ email: costumer.email })
  if (emailExists) {
    throw userError['3008']
  }
  if (!costumer.facebookAuth && (!costumer.name || !costumer.password)) {
    throw userError['3006']
  }
  if (!costumer.facebookAuth && !verifyCostumerFields(costumer)) {
    throw userError['3011']
  }

  costumer.stateOfAccount = 'active'
  const { _id: id } = await CostumerModel.create(costumer)
  return await CostumerModel.findById(id).exec()
}

function getCostumers (req: Request, res: Response) {
  handleGetPromise(getCostumersAsync, res, costumerSuccess['2001'], userError['3001'], Costumer)
}

async function getCostumersAsync (): Promise<Costumer[]> {
  return await CostumerModel.find({ stateOfAccount: 'active' }).exec()
}

function disableCostumer (req: Request, res: Response) {
  handleDeletePromise(req.params.id, disableCostumerAsync, res, costumerSuccess['2002'], userError['3002'], Costumer)
}

async function disableCostumerAsync (id: string): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const disabled = await CostumerModel.findOneAndUpdate({ _id: id }, { stateOfAccount: 'disabled' }, { new: true }).exec()
  if (!disabled) {
    throw userError['3002']
  }
  return disabled
}

function getOneCostumer (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneCostumerAsync, res, costumerSuccess['2003'], userError['3003'], Costumer)
}

async function getOneCostumerAsync (id: string): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  const getOneCostumer = await CostumerModel.findById(id).exec()
  if (!getOneCostumer) {
    throw userError['3003']
  }
  return getOneCostumer
}

function updateOneCostumer (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneCostumerTypeAsync, req, res, costumerSuccess['2004'], userError['3004'], Costumer)
}

async function updateOneCostumerTypeAsync (id: string, costumer: Costumer): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(costumer).length === 0) {
    throw userError['3005']
  }
  if (!costumer.email) {
    throw userError['3006']
  }
  if (!costumer.facebookAuth && (!costumer.name || !costumer.password)) {
    throw userError['3006']
  }
  if (!verifyCostumerFields(costumer)) {
    throw userError['3011']
  }

  const getOneCostumer = await CostumerModel.findByIdAndUpdate(id, costumer, { new: true }).exec()
  if (!getOneCostumer) {
    throw userError['3004']
  }
  return getOneCostumer
}

function verifyCostumerFields (costumer: Costumer): boolean {
  const validEmail = sanitizeValidateValue(typesOfValue.EMAIL, costumer.email)
  if (!validEmail) return false
  if (!costumer.facebookAuth) {
    const validName = sanitizeValidateValue(typesOfValue.WORD, costumer.name)
    const validPassword = sanitizeValidateValue(typesOfValue.PASSWORD, costumer.password)
    if (!validName || !validPassword) return false
  }
  return true
}

export { addCostumer, getCostumers, disableCostumer, getOneCostumer, updateOneCostumer }
