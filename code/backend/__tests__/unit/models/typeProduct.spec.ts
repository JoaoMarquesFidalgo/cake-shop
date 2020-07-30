import { TypeProduct } from '@models/TypeProduct'
import * as faker from 'faker'

describe('test the typeProduct model', () => {
  it('should create a new typeProduct object', () => {
    const typeProduct = new TypeProduct()
    typeProduct.name = faker.random.word()
    typeProduct.googleTaxo = []
    typeProduct.googleTaxo.push(faker.random.word())

    expect(typeProduct.name).toBeDefined()
    expect(typeProduct.googleTaxo.length).toBeGreaterThan(0)

    expect(typeProduct._id).not.toBeDefined()
    expect(typeProduct.createdAt).not.toBeDefined()
    expect(typeProduct.updatedAt).not.toBeDefined()
  })
})
