import { Payment } from '@models/Payment'

describe('test the payment model', () => {
  it('should create a new payment object', () => {
    const payment = new Payment()
    payment.deliveryStatus = 'Delivered on 20/08/2020'
    payment.paymentMethod = 'MBWay'
    payment.paymentStatus = 'Done'

    expect(payment.deliveryStatus).toBe('Delivered on 20/08/2020')
    expect(payment.paymentMethod).toBe('MBWay')
    expect(payment.paymentStatus).toBe('Done')

    expect(payment._id).not.toBeDefined()
    expect(payment.createdAt).not.toBeDefined()
    expect(payment.updatedAt).not.toBeDefined()
  })
})
