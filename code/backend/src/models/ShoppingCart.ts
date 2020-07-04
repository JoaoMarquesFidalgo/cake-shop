import { ProductReceived } from './ProductReceived'
import { User } from './User'
import { Discount } from './Discount'
import { Payment } from './Payment'
import { prop, Ref, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Product } from './Product'

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

  @prop()
  public userFull?: User;

  @prop({ ref: Discount, default: undefined })
  public discountRef?: Ref<Discount>;

  @prop()
  public discountFull?: Discount;

  @prop({ ref: Product, default: undefined })
  public productsRef?: Ref<Product>[];

  @prop()
  public productsFull?: ProductReceived[];

  @prop({ ref: Payment, default: undefined })
  public paymentRef?: Ref<Payment>;

  @prop()
  public paymentFull?: Payment;
}

export const ShoppingCartModel = getModelForClass(ShoppingCart)
