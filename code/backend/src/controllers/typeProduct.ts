import { typesOfValue } from 'src/enum/typesValues'
import { typeProductError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { TypeProductModel, TypeProduct } from '@models/TypeProduct'
import { typeProductSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'

function addTypeProduct (req: Request, res: Response): void {
  handlePostPromise(createTypeProductAsync, req, res, typeProductSuccess['5000'], typeProductError['5000'], TypeProduct)
}

async function createTypeProductAsync (typeProduct: TypeProduct): Promise<TypeProduct> {
  if (!typeProduct.name || typeProduct.googleTaxo === undefined || typeProduct.googleTaxo.length === 0) {
    throw typeProductError['5006']
  }
  const validTypeProduct: TypeProduct = verifyTypeProductFields(typeProduct)
  if (!validTypeProduct) {
    throw generalError['801']
  }

  try {
    typeProduct.name = validTypeProduct.name
    typeProduct.googleTaxo = validTypeProduct.googleTaxo

    const { _id: id } = await TypeProductModel.create(typeProduct)
    return await TypeProductModel.findById(id).exec()
  } catch (err) {
    throw typeProductError['5007']
  }
}

function getTypeProducts (req: Request, res: Response) {
  handleGetPromise(getTypeProductsAsync, res, typeProductSuccess['5001'], typeProductError['5001'], TypeProduct)
}

async function getTypeProductsAsync (): Promise<TypeProduct[]> {
  return await TypeProductModel.find().exec()
}

function deleteTypeProduct (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteTypeProductAsync, res, typeProductSuccess['5002'], typeProductError['5002'], TypeProduct)
}

async function deleteTypeProductAsync (id: string): Promise<TypeProduct> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await TypeProductModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw typeProductError['5002']
  }
  return deleted
}

function getOneTypeProduct (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneTypeProductAsync, res, typeProductSuccess['5003'], typeProductError['5003'], TypeProduct)
}

async function getOneTypeProductAsync (id: string): Promise<TypeProduct> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneTypeProduct = await TypeProductModel.findById(id).exec()
  if (!getOneTypeProduct) {
    throw typeProductError['5003']
  }
  return getOneTypeProduct
}

function updateOneTypeProduct (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneTypeProductTypeAsync, req, res, typeProductSuccess['5004'], typeProductError['5004'], TypeProduct)
}

async function updateOneTypeProductTypeAsync (id: string, typeProduct: TypeProduct): Promise<TypeProduct> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(typeProduct).length === 0) {
    throw typeProductError['5005']
  }
  if (!typeProduct.name || typeProduct.googleTaxo === undefined || typeProduct.googleTaxo.length === 0) {
    throw typeProductError['5006']
  }
  const validTypeProduct: TypeProduct = verifyTypeProductFields(typeProduct)
  if (!validTypeProduct) {
    throw generalError['801']
  }
  try {
    typeProduct.name = validTypeProduct.name
    typeProduct.googleTaxo = validTypeProduct.googleTaxo
    const getOneTypeProduct = await TypeProductModel.findByIdAndUpdate(id, typeProduct, { new: true }).exec()
    if (!getOneTypeProduct) {
      throw typeProductError['5004']
    }
    return getOneTypeProduct
  } catch (err) {
    throw typeProductError['5007']
  }
}

function verifyTypeProductFields (typeProduct: TypeProduct): TypeProduct {
  const validName = sanitizeValidateValue(typesOfValue.WORD, typeProduct.name)
  if (!validName) throw typeProductError['5008']
  typeProduct.name = String(validName)
  for (let googleTaxo of typeProduct.googleTaxo) {
    const validGoogleTaxo = sanitizeValidateValue(typesOfValue.WORD, googleTaxo)
    if (!validGoogleTaxo) throw typeProductError['5008']
    googleTaxo = String(validGoogleTaxo)
  }
  return typeProduct
}

export { addTypeProduct, getTypeProducts, deleteTypeProduct, getOneTypeProduct, updateOneTypeProduct }
