import { costumerError, generalError } from './../utils/errorMessage'
import { Request, Response } from 'express'
import { CostumerModel, Costumer } from '@models/Costumer'
import { costumerSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { typesOfValue } from 'src/enum/typesValues'
import { verifyObjectId } from '@utils/verifyObjectId'

function addCostumer (req: Request, res: Response): void {
  handlePostPromise(createCostumerAsync, req, res, costumerSuccess['2000'], costumerError['2000'], Costumer)
}

async function createCostumerAsync (costumer: Costumer): Promise<Costumer> {
  if (!costumer.email) {
    throw costumerError['2007']
  }
  const emailExists = await CostumerModel.findOne({ email: costumer.email })
  if (emailExists) {
    throw costumerError['2008']
  }
  if (!costumer.facebookAuth && (!costumer.name || !costumer.password)) {
    throw costumerError['2006']
  }
  if (!costumer.facebookAuth && !verifyCostumerFields(costumer)) {
    throw costumerError['2011']
  }

  costumer.stateOfAccount = 'active'
  const { _id: id } = await CostumerModel.create(costumer)
  return await CostumerModel.findById(id).exec()
}

function getCostumers (req: Request, res: Response) {
  handleGetPromise(getCostumersAsync, res, costumerSuccess['2001'], costumerError['2001'], Costumer)
}

async function getCostumersAsync (): Promise<Costumer[]> {
  return await CostumerModel.find({ stateOfAccount: 'active' }).exec()
}

function disableCostumer (req: Request, res: Response) {
  handleDeletePromise(req.params.id, disableCostumerAsync, res, costumerSuccess['2002'], costumerError['2002'], Costumer)
}

async function disableCostumerAsync (id: string): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const disabled = await CostumerModel.findOneAndUpdate({ _id: id }, { stateOfAccount: 'disabled' }, { new: true }).exec()
  if (!disabled) {
    throw costumerError['2002']
  }
  return disabled
}

function getOneCostumer (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneCostumerAsync, res, costumerSuccess['2003'], costumerError['2003'], Costumer)
}

async function getOneCostumerAsync (id: string): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  const getOneCostumer = await CostumerModel.findById(id).exec()
  if (!getOneCostumer) {
    throw costumerError['2003']
  }
  return getOneCostumer
}

function updateOneCostumer (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneCostumerTypeAsync, req, res, costumerSuccess['2004'], costumerError['2004'], Costumer)
}

async function updateOneCostumerTypeAsync (id: string, costumer: Costumer): Promise<Costumer> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(costumer).length === 0) {
    throw costumerError['2005']
  }
  if (!costumer.email) {
    throw costumerError['2006']
  }
  if (!costumer.facebookAuth && (!costumer.name || !costumer.password)) {
    throw costumerError['2006']
  }
  if (!verifyCostumerFields(costumer)) {
    throw costumerError['2011']
  }

  const getOneCostumer = await CostumerModel.findByIdAndUpdate(id, costumer, { new: true }).exec()
  if (!getOneCostumer) {
    throw costumerError['2004']
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
