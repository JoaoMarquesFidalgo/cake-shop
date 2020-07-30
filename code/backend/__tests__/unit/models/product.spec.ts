import { Product } from '@models/Product'
import * as faker from 'faker'
import { ObjectId } from 'mongodb'

describe('test the product model', () => {
  it('should create a new product object with only required fields', () => {
    const product = new Product()
    product.name = [new ObjectId()]
    product.price = faker.random.number()
    product.stock = faker.random.number()
    product.tax = faker.random.number(23)

    expect(product.name).toBeDefined()
    expect(product.price).toBeDefined()
    expect(product.stock).toBeDefined()
    expect(product.tax).toBeDefined()

    expect(product.description).not.toBeDefined()
    expect(product.discount).not.toBeDefined()
    expect(product.fromZone).not.toBeDefined()
    expect(product.imageUrl).not.toBeDefined()
    expect(product.reserved).not.toBeDefined()
    expect(product.seo).not.toBeDefined()
    expect(product.thumbnailUrl).not.toBeDefined()
    expect(product.typesOfProduct).not.toBeDefined()
    expect(product.url).not.toBeDefined()
    expect(product.weight).not.toBeDefined()
  })
})

it('should create a new product object with all fields', () => {
  const product = new Product()
  product.name = [new ObjectId()]
  product.price = faker.random.number()
  product.stock = faker.random.number()
  product.tax = faker.random.number(23)

  product.thumbnailUrl = faker.internet.url()
  product.imageUrl = [faker.internet.url()]
  product.url = faker.internet.url()
  product.reserved = product.stock - faker.random.number(product.stock)
  product.weight = faker.random.number()

  product.description = [new ObjectId()]
  product.typesOfProduct = [new ObjectId()]
  product.fromZone = new ObjectId()
  product.discount = new ObjectId()
  product.seo = new ObjectId()

  expect(product.description).toBeDefined()
  expect(product.discount).toBeDefined()
  expect(product.fromZone).toBeDefined()
  expect(product.imageUrl).toBeDefined()
  expect(product.name).toBeDefined()
  expect(product.price).toBeDefined()
  expect(product.reserved).toBeDefined()
  expect(product.seo).toBeDefined()
  expect(product.stock).toBeDefined()
  expect(product.tax).toBeDefined()
  expect(product.thumbnailUrl).toBeDefined()
  expect(product.typesOfProduct).toBeDefined()
  expect(product.url).toBeDefined()
  expect(product.weight).toBeDefined()
})
