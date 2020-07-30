import { FavoriteShoppingCart } from '@models/FavoriteShoppingCart'
import { ObjectId } from 'mongodb'

describe('test the sharedShoppingCart model', () => {
  it('should create a new sharedShoppingCart object', () => {
    const sharedShoppingCart = new FavoriteShoppingCart()
    sharedShoppingCart.user = new ObjectId()
    sharedShoppingCart.shoppingCart = new ObjectId()
    sharedShoppingCart.comments = [new ObjectId(), new ObjectId()]

    expect(sharedShoppingCart.user).toBeDefined()
    expect(sharedShoppingCart.shoppingCart).toBeDefined()
    expect(sharedShoppingCart.comments).toBeDefined()

    expect(sharedShoppingCart._id).not.toBeDefined()
  })
})
