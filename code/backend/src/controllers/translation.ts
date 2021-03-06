import { typesOfValue } from 'src/enum/typesValues'
import { translationError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { TranslationModel, Translation } from '@models/Translation'
import { translationSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { languages } from '@enum/languages'
import { ObjectId } from 'mongodb'

function addTranslation (req: Request, res: Response): void {
  handlePostPromise(createTranslationAsync, req, res, translationSuccess['6000'], translationError['6000'], Translation)
}

async function createTranslationAsync (translation: Translation): Promise<Translation> {
  if (!translation.language || !translation.value) {
    throw translationError['6006']
  }
  const verifiedTranslation: Translation = verifyTranslationFields(translation)
  if (!verifiedTranslation) {
    throw generalError['801']
  }
  try {
    translation._id = new ObjectId()
    translation.value = verifiedTranslation.value
    const { _id: id } = await TranslationModel.create(translation)
    return await TranslationModel.findById(id).exec()
  } catch (err) {
    throw translationError['6007']
  }
}

function getTranslations (req: Request, res: Response) {
  handleGetPromise(getTranslationsAsync, res, translationSuccess['6001'], translationError['6001'], Translation)
}

async function getTranslationsAsync (): Promise<Translation[]> {
  return await TranslationModel.find().exec()
}

function deleteTranslation (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteTranslationAsync, res, translationSuccess['6002'], translationError['6002'], Translation)
}

async function deleteTranslationAsync (id: string): Promise<Translation> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await TranslationModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw translationError['6002']
  }
  return deleted
}

function getOneTranslation (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneTranslationAsync, res, translationSuccess['6003'], translationError['6003'], Translation)
}

async function getOneTranslationAsync (id: string): Promise<Translation> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneTranslation = await TranslationModel.findById(id).exec()
  if (!getOneTranslation) {
    throw translationError['6003']
  }
  return getOneTranslation
}

function updateOneTranslation (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneTranslationTypeAsync, req, res, translationSuccess['6004'], translationError['6004'], Translation)
}

async function updateOneTranslationTypeAsync (id: string, translation: Translation): Promise<Translation> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(translation).length === 0) {
    throw translationError['6005']
  }
  if (!translation.language || !translation.value) {
    throw translationError['6006']
  }
  const verifiedTranslation: Translation = verifyTranslationFields(translation)
  if (!verifiedTranslation) {
    throw generalError['801']
  }

  translation.value = verifiedTranslation.value
  const getOneTranslation = await TranslationModel.findByIdAndUpdate(id, translation, { new: true }).exec()
  if (!getOneTranslation) {
    throw translationError['6004']
  }
  return getOneTranslation
}

function verifyTranslationFields (translation: Translation): Translation {
  if (translation.language !== languages.PT && translation.language !== languages.EN && translation.language !== languages.ESP) {
    throw translationError['6007']
  }
  const validValue = sanitizeValidateValue(typesOfValue.WORD, translation.value)
  if (!validValue) throw translationError['6008']
  translation.value = String(validValue)
  return translation
}

export { addTranslation, getTranslations, deleteTranslation, getOneTranslation, updateOneTranslation, verifyTranslationFields, createTranslationAsync }
