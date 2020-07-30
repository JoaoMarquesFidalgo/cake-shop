import { languages } from '@enum/languages'
import { Discount } from '@models/Discount'
import { Payment } from '@models/Payment'
import { ProductReceived } from '@models/ProductReceived'
import { ShoppingCart } from '@models/ShoppingCart'
import { Translation } from '@models/Translation'
import * as faker from 'faker'
import { ObjectId } from 'mongodb'

describe('test the shoppingCart model', () => {
  it('should create a new shoppingCart object with fields as reference', () => {
    const shoppingCart = new ShoppingCart()
    shoppingCart.userRef = new ObjectId()
    shoppingCart.discountRef = new ObjectId()
    shoppingCart.productsRef = [new ObjectId()]
    shoppingCart.paymentRef = new ObjectId()
    shoppingCart.comments = [faker.random.words(5), faker.random.words(5)]

    expect(shoppingCart.userRef).toBeDefined()
    expect(shoppingCart.discountRef).toBeDefined()
    expect(shoppingCart.productsRef).toBeDefined()
    expect(shoppingCart.paymentRef).toBeDefined()
    expect(shoppingCart.comments).toBeDefined()

    expect(shoppingCart.discountFull).not.toBeDefined()
    expect(shoppingCart.productsFull).not.toBeDefined()
    expect(shoppingCart.paymentFull).not.toBeDefined()
  })

  it('should create a new shoppingCart object with fields completed', () => {
    const shoppingCart = new ShoppingCart()
    shoppingCart.userRef = new ObjectId()
    shoppingCart.discountFull = getDiscount()
    shoppingCart.productsFull = getProducts()
    shoppingCart.paymentFull = getPayment()
    shoppingCart.comments = [faker.random.words(5), faker.random.words(5)]

    expect(shoppingCart.userRef).toBeDefined()
    expect(shoppingCart.discountFull).toBeDefined()
    expect(shoppingCart.productsFull).toBeDefined()
    expect(shoppingCart.paymentFull).toBeDefined()
    expect(shoppingCart.comments).toBeDefined()

    expect(shoppingCart.discountRef).not.toBeDefined()
    expect(shoppingCart.productsRef).not.toBeDefined()
    expect(shoppingCart.paymentRef).not.toBeDefined()
  })
})

function getDiscount (): Discount {
  const discount = new Discount()
  discount.value = 23

  return discount
}

function getPayment (): Payment {
  const payment = new Payment()
  payment.deliveryStatus = 'Delivered on 20/08/2020'
  payment.paymentMethod = 'MBWay'
  payment.paymentStatus = 'Done'

  return payment
}

function getProducts (): Array<ProductReceived> {
  const firstProduct = new ProductReceived()
  firstProduct.name = getArrayOfTranslatedNames()
  firstProduct.price = faker.random.number()
  firstProduct.stock = faker.random.number()
  firstProduct.tax = faker.random.number(23)

  const secondProduct = new ProductReceived()
  secondProduct.name = getArrayOfTranslatedNames()
  secondProduct.price = faker.random.number()
  secondProduct.stock = faker.random.number()
  secondProduct.tax = faker.random.number(23)

  return [firstProduct, secondProduct]
}

function getArrayOfTranslatedNames (): Array<Translation> {
  const ptTranslatedWord = new Translation()
  ptTranslatedWord.language = languages.PT
  ptTranslatedWord.value = faker.commerce.productName()

  const enTranslatedWord = new Translation()
  enTranslatedWord.language = languages.EN
  enTranslatedWord.value = faker.commerce.productName()

  return [ptTranslatedWord, enTranslatedWord]
}
