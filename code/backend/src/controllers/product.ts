import { typesOfValue } from 'src/enum/typesValues'
import { productError, generalError } from '@utils/errorMessage'
import { Request, Response } from 'express'
import { ProductReceived, ProductReceivedModel } from '@models/ProductReceived'
import { productSuccess } from '@utils/successMessage'
import { handlePostPromise, handleGetPromise, handleDeletePromise, handleGetOnePromise, handleUpdatePromise } from '@utils/handlePromise'
import { verifyObjectId } from '@utils/verifyObjectId'
import { sanitizeValidateValue } from '@utils/sanitizeValues'
import { createTranslationAsync } from '@controllers/translation'
import { createTypeProductAsync, getTypeProductsAsync } from '@controllers/typeProduct'
import { createZoneAsync, getZonesAsync } from '@controllers/zone'
import { createDiscountAsync, getDiscountsAsync } from '@controllers/discount'
import { createSeoAsync } from '@controllers/seo'
import { Product, ProductModel } from '@models/Product'
import { ObjectId } from 'mongodb'

function addProduct (req: Request, res: Response): void {
  handlePostPromise(createProductAsync, req, res, productSuccess['9000'], productError['9000'], ProductReceivedModel)
}

async function createProductAsync (product: ProductReceived): Promise<Product> {
  if (product.name === undefined || !product.stock || !product.price) {
    throw productError['9007']
  }
  const productVerified: ProductReceived = verifyProductFields(product)
  if (!productVerified) {
    throw generalError['801']
  }
  const productToSave = new Product()
  productToSave._id = new ObjectId()

  // Mandatory Product Fields
  await saveMandatoryProductFields(productToSave, productVerified, product)

  // Optional Fields
  await saveOptionalProductFields(productToSave, productVerified, product)
  const { _id: id } = await ProductModel.create(productToSave)
  return await ProductModel.findById(id).exec()
}

function getProducts (req: Request, res: Response) {
  handleGetPromise(getProductsAsync, res, productSuccess['9001'], productError['9001'], Product)
}

async function getProductsAsync (): Promise<Product[]> {
  return await ProductModel.find().populate('name').populate('description').populate('typesOfProduct')
    .populate('fromZone').populate('discount').populate('seo').exec()
}

function deleteProduct (req: Request, res: Response) {
  handleDeletePromise(req.params.id, deleteProductAsync, res, productSuccess['9002'], productError['9002'], Product)
}

async function deleteProductAsync (id: string): Promise<Product> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const deleted = await ProductModel.findOneAndDelete({ _id: id }).exec()
  if (!deleted) {
    throw productError['9002']
  }
  return deleted
}

function getOneProduct (req: Request, res: Response) {
  handleGetOnePromise(req.params.id, getOneProductAsync, res, productSuccess['9003'], productError['9003'], Product)
}

async function getOneProductAsync (id: string): Promise<Product> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }

  const getOneProduct = await ProductModel.findById(id).populate('name').populate('description')
    .populate('typesOfProduct').populate('fromZone').populate('discount').populate('seo').exec()
  if (!getOneProduct) {
    throw productError['9003']
  }
  return getOneProduct
}

function updateOneProduct (req: Request, res: Response) {
  handleUpdatePromise(req.params.id, updateOneProductTypeAsync, req, res, productSuccess['9004'], productError['9004'], Product)
}

async function updateOneProductTypeAsync (id: string, product: ProductReceived): Promise<Product> {
  if (!verifyObjectId(id)) {
    throw generalError['800']
  }
  if (Object.keys(product).length === 0) {
    throw productError['9005']
  }
  const productToUpdate: Product = await ProductModel.findById(id)
  if (!productToUpdate) {
    throw productError['9004']
  }
  if (!product.name || !product.stock || !product.price) {
    throw productError['9007']
  }
  const productVerified: ProductReceived = verifyProductFields(product)

  // Mandatory Product Fields
  await saveMandatoryProductFields(productToUpdate, productVerified, product)

  // Optional Fields
  await saveOptionalProductFields(productToUpdate, productVerified, product, product.newDoc)
  if (product.newDoc) {
    return await ProductModel.findByIdAndUpdate({ _id: id },
      {
        $set:
        {
          name: productToUpdate.name,
          price: productToUpdate.price,
          stock: productToUpdate.stock,
          description: productToUpdate.description,
          thumbnailUrl: productToUpdate.thumbnailUrl,
          imageUrl: productToUpdate.imageUrl,
          url: productToUpdate.url,
          typesOfProduct: productToUpdate.typesOfProduct,
          fromZone: productToUpdate.fromZone,
          reserved: productToUpdate.reserved,
          weight: productToUpdate.weight,
          discount: productToUpdate.discount,
          seo: productToUpdate.seo,
          tax: productToUpdate.tax
        }
      },
      { new: true }).exec()
  } else {
    return await ProductModel.findByIdAndUpdate(id, productToUpdate, { new: true }).exec()
  }
}

function verifyProductFields (productToVerify: ProductReceived): ProductReceived {
  // Stock and Price
  if (!productToVerify.stock || !sanitizeValidateValue(typesOfValue.NUMBER, productToVerify.stock) || productToVerify.stock < 0) {
    throw productError['9005']
  }
  if (!productToVerify.price || !sanitizeValidateValue(typesOfValue.NUMBER, productToVerify.price) || productToVerify.price < 0) {
    throw productError['9005']
  }
  if (!productToVerify.tax || !sanitizeValidateValue(typesOfValue.NUMBER, productToVerify.price) || productToVerify.price < 0) {
    throw productError['9005']
  }
  // ThumbnailUrl, ImageUrl and Url
  if (productToVerify.thumbnailUrl) {
    if (!sanitizeValidateValue(typesOfValue.WORD_NO_ESCAPE, productToVerify.thumbnailUrl)) throw productError['9005']
  }
  if (productToVerify.imageUrl) {
    if (!sanitizeValidateValue(typesOfValue.WORD_NO_ESCAPE, productToVerify.imageUrl)) throw productError['9005']
  }
  if (productToVerify.url) {
    if (!sanitizeValidateValue(typesOfValue.WORD_NO_ESCAPE, productToVerify.url)) throw productError['9005']
  }
  // Reserved and Weight
  if (productToVerify.reserved && (!sanitizeValidateValue(typesOfValue.NUMBER, productToVerify.reserved))) throw productError['9005']
  if (productToVerify.weight && (!sanitizeValidateValue(typesOfValue.NUMBER, productToVerify.weight))) throw productError['9005']

  return productToVerify
}

async function saveMandatoryProductFields (productToSave: Product, productVerified: ProductReceived, originalProduct: ProductReceived): Promise<void> {
  // Stock, Price, Name
  productToSave.stock = productVerified.stock
  productToSave.price = productVerified.price
  productToSave.tax = productVerified.tax
  productToSave.name = []
  for (const name of originalProduct.name) {
    productToSave.name.push((await createTranslationAsync(name))._id)
  }
}

async function saveOptionalProductFields (productToSave: Product, productVerified: ProductReceived, originalProduct: ProductReceived, newDoc = false): Promise<void> {
  // If update wants to re-do the document's or just update the values passed (newDoc)
  // Description
  if (originalProduct.description && originalProduct.description.length > 0) {
    productToSave.description = []
    for (const description of originalProduct.description) {
      productToSave.description.push((await createTranslationAsync(description))._id)
    }
  } else if (newDoc) {
    productToSave.description = undefined
  }

  // Seo
  if (originalProduct.seo) {
    productToSave.seo = (await createSeoAsync(originalProduct.seo))._id
  } else if (newDoc) {
    productToSave.seo = undefined
  }

  // Some fields have unique index (eg. name), so we have to check if they already exist in database
  // in order to reference them, or create a new one

  // Types of Product
  if (originalProduct.typesOfProduct && originalProduct.typesOfProduct.length > 0) {
    productToSave.typesOfProduct = []
    const typesProducts = await getTypeProductsAsync()
    for (const typeOfProduct of originalProduct.typesOfProduct) {
      const typeProductFound = typesProducts.find((typeProductFromDB) => typeProductFromDB.name === typeOfProduct.name)
      if (!typeProductFound) {
        productToSave.typesOfProduct.push((await createTypeProductAsync(typeOfProduct))._id)
      } else {
        productToSave.typesOfProduct.push(typeProductFound._id)
      }
    }
  } else if (newDoc) {
    productToSave.typesOfProduct = undefined
  }

  // From Zone
  if (originalProduct.fromZone) {
    const zones = await getZonesAsync()
    const zoneFound = zones.find((zone) => zone.name === originalProduct.fromZone.name)
    if (!zoneFound) {
      productToSave.fromZone = (await createZoneAsync(originalProduct.fromZone))._id
    } else {
      productToSave.fromZone = zoneFound._id
    }
  } else if (newDoc) {
    productToSave.fromZone = undefined
  }

  // Discount
  if (originalProduct.discount) {
    const discounts = await getDiscountsAsync()
    const discountFound = discounts.find((discount) => discount.value === originalProduct.discount.value)
    if (!discountFound) {
      productToSave.discount = (await createDiscountAsync(originalProduct.discount))._id
    } else {
      productToSave.discount = discountFound._id
    }
  } else if (newDoc) {
    productToSave.discount = undefined
  }

  // ThumbnailUrl, ImageUrl and Url
  // Reserved and Weight
  productToSave.thumbnailUrl = (originalProduct.thumbnailUrl || !newDoc) ? productVerified.thumbnailUrl : undefined
  productToSave.imageUrl = (originalProduct.imageUrl || !newDoc) ? productVerified.imageUrl : undefined
  productToSave.url = (originalProduct.url || !newDoc) ? productVerified.url : undefined
  productToSave.reserved = (originalProduct.reserved || !newDoc) ? productVerified.reserved : undefined
  productToSave.weight = (originalProduct.weight || !newDoc) ? productVerified.weight : undefined
}

export { addProduct, getProducts, deleteProduct, getOneProduct, updateOneProduct, verifyProductFields, createProductAsync }
