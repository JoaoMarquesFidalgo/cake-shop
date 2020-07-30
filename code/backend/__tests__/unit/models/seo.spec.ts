import { Seo } from '@models/Seo'
import * as faker from 'faker'

describe('test the seo model', () => {
  it('should create a new seo object', () => {
    const seo = new Seo()
    seo.seoTitle = faker.random.words(3)
    seo.seoDescription = faker.random.words(10)

    expect(seo.seoTitle).toBeDefined()
    expect(seo.seoDescription).toBeDefined()

    expect(seo._id).not.toBeDefined()
    expect(seo.createdAt).not.toBeDefined()
    expect(seo.updatedAt).not.toBeDefined()
  })
})
