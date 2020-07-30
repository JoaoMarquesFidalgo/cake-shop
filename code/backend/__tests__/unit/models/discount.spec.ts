import { Discount } from '@models/Discount'

describe('test the discount model', () => {
  it('should create a new discount object', () => {
    const discount = new Discount()
    discount.value = 23

    expect(discount.value).toBe(23)

    expect(discount._id).not.toBeDefined()
    expect(discount.createdAt).not.toBeDefined()
    expect(discount.updatedAt).not.toBeDefined()
  })
})
