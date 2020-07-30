import { languages } from '@enum/languages'
import { Discount } from '@models/Discount'
import { ProductReceived } from '@models/ProductReceived'
import { Seo } from '@models/Seo'
import { Translation } from '@models/Translation'
import { TypeProduct } from '@models/TypeProduct'
import { Zone } from '@models/Zone'
import * as faker from 'faker'

describe('test the productReceived model', () => {
  it('should create a new productReceived object with only required fields', () => {
    const productReceived = new ProductReceived()
    productReceived.name = getArrayOfTranslatedWords('name')
    productReceived.price = faker.random.number()
    productReceived.stock = faker.random.number()
    productReceived.tax = faker.random.number(23)

    expect(productReceived.name).toBeDefined()
    expect(productReceived.price).toBeDefined()
    expect(productReceived.stock).toBeDefined()
    expect(productReceived.tax).toBeDefined()

    expect(productReceived.description).not.toBeDefined()
    expect(productReceived.discount).not.toBeDefined()
    expect(productReceived.fromZone).not.toBeDefined()
    expect(productReceived.imageUrl).not.toBeDefined()
    expect(productReceived.newDoc).not.toBeDefined()
    expect(productReceived.reserved).not.toBeDefined()
    expect(productReceived.seo).not.toBeDefined()
    expect(productReceived.thumbnailUrl).not.toBeDefined()
    expect(productReceived.typesOfProduct).not.toBeDefined()
    expect(productReceived.url).not.toBeDefined()
    expect(productReceived.weight).not.toBeDefined()
  })

  it('should create a new productReceived object with all fields', () => {
    const productReceived = new ProductReceived()
    productReceived.name = getArrayOfTranslatedWords('name')
    productReceived.price = faker.random.number()
    productReceived.stock = faker.random.number()
    productReceived.tax = faker.random.number(23)

    productReceived.thumbnailUrl = faker.internet.url()
    productReceived.imageUrl = [faker.internet.url()]
    productReceived.url = faker.internet.url()
    productReceived.newDoc = faker.random.boolean()
    productReceived.reserved = productReceived.stock - faker.random.number(productReceived.stock)
    productReceived.weight = faker.random.number()

    productReceived.description = getArrayOfTranslatedWords('description')
    productReceived.typesOfProduct = getArrayOfTypesProduct()
    productReceived.fromZone = getZone()
    productReceived.discount = getDiscount()
    productReceived.seo = getSeo()

    expect(productReceived.description).toBeDefined()
    expect(productReceived.discount).toBeDefined()
    expect(productReceived.fromZone).toBeDefined()
    expect(productReceived.imageUrl).toBeDefined()
    expect(productReceived.name).toBeDefined()
    expect(productReceived.newDoc).toBeDefined()
    expect(productReceived.price).toBeDefined()
    expect(productReceived.reserved).toBeDefined()
    expect(productReceived.seo).toBeDefined()
    expect(productReceived.stock).toBeDefined()
    expect(productReceived.tax).toBeDefined()
    expect(productReceived.thumbnailUrl).toBeDefined()
    expect(productReceived.typesOfProduct).toBeDefined()
    expect(productReceived.url).toBeDefined()
    expect(productReceived.weight).toBeDefined()
  })
})

function getArrayOfTranslatedWords (type: string): Array<Translation> {
  const ptTranslatedWord = new Translation()
  ptTranslatedWord.language = languages.PT
  const enTranslatedWord = new Translation()
  enTranslatedWord.language = languages.EN

  if (type === 'name') {
    ptTranslatedWord.value = faker.commerce.productName()
    enTranslatedWord.value = faker.commerce.productName()
  }
  if (type === 'description') {
    ptTranslatedWord.value = faker.random.words(6)
    enTranslatedWord.value = faker.random.words(6)
  }

  return [ptTranslatedWord, enTranslatedWord]
}

function getArrayOfTypesProduct (): Array<TypeProduct> {
  const typeProductFirst = new TypeProduct()
  typeProductFirst.name = faker.random.word()
  typeProductFirst.googleTaxo = []
  typeProductFirst.googleTaxo.push(faker.random.word())

  const typeProductSecond = new TypeProduct()
  typeProductSecond.name = faker.random.word()
  typeProductSecond.googleTaxo = []
  typeProductSecond.googleTaxo.push(faker.random.word())

  return [typeProductFirst, typeProductSecond]
}

function getZone (): Zone {
  const zone = new Zone()
  zone.name = faker.address.city()
  return zone
}

function getDiscount (): Discount {
  const discount = new Discount()
  discount.value = 23
  return discount
}

function getSeo (): Seo {
  const seo = new Seo()
  seo.seoTitle = faker.random.words(3)
  seo.seoDescription = faker.random.words(10)
  return seo
}
