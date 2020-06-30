import { typesOfValue } from 'src/enum/typesValues'
import { seoError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { SeoModel, Seo } from '@models/Seo'
import { seoSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'

function addSeo (req: Request, res: Response): void {
  handlePostPromise(createSeoAsync, req, res, seoSuccess['7000'], seoError['7000'], Seo)
}

async function createSeoAsync (seo: Seo): Promise<Seo> {
  if (!seo.seoTitle || !seo.seoDescription) {
    throw seoError['7006']
  }
  const seoVerified: Seo = verifySeoFields(seo)
  if (!seoVerified) {
    throw generalError['801']
  }
  try {
    seo.seoTitle = seoVerified.seoTitle
    seo.seoDescription = seoVerified.seoDescription
    const { _id: id } = await SeoModel.create(seo)
    return await SeoModel.findById(id).exec()
  } catch (err) {
    throw seoError['7007']
  }
}

function getSeos (req: Request, res: Response) {
  handleGetPromise(getSeosAsync, res, seoSuccess['7001'], seoError['7001'], Seo)
}

async function getSeosAsync (): Promise<Seo[]> {
  return await SeoModel.find().exec()
}

function deleteSeo (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteSeoAsync, res, seoSuccess['7002'], seoError['7002'], Seo)
}

async function deleteSeoAsync (id: string): Promise<Seo> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await SeoModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw seoError['7002']
  }
  return deleted
}

function getOneSeo (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneSeoAsync, res, seoSuccess['7003'], seoError['7003'], Seo)
}

async function getOneSeoAsync (id: string): Promise<Seo> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneSeo = await SeoModel.findById(id).exec()
  if (!getOneSeo) {
    throw seoError['7003']
  }
  return getOneSeo
}

function updateOneSeo (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneSeoTypeAsync, req, res, seoSuccess['7004'], seoError['7004'], Seo)
}

async function updateOneSeoTypeAsync (id: string, seo: Seo): Promise<Seo> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(seo).length === 0) {
    throw seoError['7005']
  }
  if (!seo.seoTitle || !seo.seoDescription) {
    throw seoError['7006']
  }
  const seoVerified: Seo = verifySeoFields(seo)
  if (!seoVerified) {
    throw generalError['801']
  }

  seo.seoTitle = seoVerified.seoTitle
  seo.seoDescription = seoVerified.seoDescription
  const getOneSeo = await SeoModel.findByIdAndUpdate(id, seo, { new: true }).exec()
  if (!getOneSeo) {
    throw seoError['7003']
  }
  return getOneSeo
}

function verifySeoFields (seo: Seo): Seo {
  const validSeoTitle = sanitizeValidateValue(typesOfValue.WORD, seo.seoTitle)
  if (!validSeoTitle) throw seoError['7007']
  seo.seoTitle = String(validSeoTitle)
  const validSeoDescription = sanitizeValidateValue(typesOfValue.WORD, seo.seoDescription)
  if (!validSeoDescription) throw seoError['7007']
  seo.seoDescription = String(validSeoDescription)
  return seo
}

export { addSeo, getSeos, deleteSeo, getOneSeo, updateOneSeo }
