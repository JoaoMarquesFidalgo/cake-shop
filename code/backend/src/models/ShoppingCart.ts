import { Discount } from '@models/Discount'
import { Payment } from '@models/Payment'
import { Product } from '@models/Product'
import { ProductReceived } from '@models/ProductReceived'
import { User } from '@models/User'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

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
