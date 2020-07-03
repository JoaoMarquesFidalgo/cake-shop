import { User } from './User'
import { Discount } from './Discount'
import { Payment } from './Payment'
import { prop, Ref, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Product } from './Product'

export class ShoppingCart extends TimeStamps {
  @prop()
  public tax?: number;

  @prop()
  public subtotal?: number;

  @prop()
  public total?: number;

  @prop()
  public payment: Ref<Payment>;

  @prop()
  public comments?: string[];

  @prop()
  public costumer: Ref<User>;

  @prop()
  public discount?: Ref<Discount>;

  @prop()
  public products: Ref<Product>[];
}

export const ShoppingCartModel = getModelForClass(ShoppingCart)
