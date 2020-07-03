import { Discount } from './Discount'
import { Payment } from './Payment'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Product } from './Product'

export class ShoppingCartReceived extends TimeStamps {
  @prop()
  public tax?: number;

  @prop()
  public subtotal?: number;

  @prop()
  public total?: number;

  @prop()
  public payment: Payment;

  @prop()
  public comments?: string[];

  @prop()
  public costumer: User;

  @prop()
  public discount?: Discount;

  @prop()
  public products: Product[];
}

export const ShoppingCartReceivedModel = getModelForClass(ShoppingCartReceived)
