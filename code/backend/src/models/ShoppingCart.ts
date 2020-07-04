import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

import { Discount } from './Discount'
import { Payment } from './Payment'
import { Product } from './Product'
import { ProductReceived } from './ProductReceived'
import { User } from './User'

export class ShoppingCart extends TimeStamps {
  @prop()
  public discounted?: number;

  @prop()
  public subtotal?: number;

  @prop()
  public total?: number;

  @prop()
  public comments?: string[];

  @prop({ ref: User, default: undefined })
  public userRef?: Ref<User>;

  @prop({ ref: Discount, default: undefined })
  public discountRef?: Ref<Discount>;

  @prop({ ref: Discount, default: undefined })
  public discountFull?: Discount;

  @prop({ ref: Product, default: undefined })
  public productsRef?: Ref<Product>[];

  @prop({ ref: ProductReceived, default: undefined })
  public productsFull?: ProductReceived[];

  @prop({ ref: Payment, default: undefined })
  public paymentRef?: Ref<Payment>;

  @prop({ ref: Payment, default: undefined })
  public paymentFull?: Payment;
}

export const ShoppingCartModel = getModelForClass(ShoppingCart)
