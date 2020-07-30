import { SharedShoppingCart } from '@models/SharedShoppingCart'
import { ObjectId } from 'mongodb'

describe('test the sharedShoppingCart model', () => {
  it('should create a new sharedShoppingCart object', () => {
    const sharedShoppingCart = new SharedShoppingCart()
    sharedShoppingCart.from = new ObjectId()
    sharedShoppingCart.to = [new ObjectId(), new ObjectId()]
    sharedShoppingCart.shoppingCart = new ObjectId()
    sharedShoppingCart.comments = [new ObjectId(), new ObjectId()]

    expect(sharedShoppingCart.from).toBeDefined()
    expect(sharedShoppingCart.to).toBeDefined()
    expect(sharedShoppingCart.shoppingCart).toBeDefined()
    expect(sharedShoppingCart.comments).toBeDefined()

    expect(sharedShoppingCart._id).not.toBeDefined()
  })
})
