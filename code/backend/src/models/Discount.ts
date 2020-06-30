import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Discount extends TimeStamps {
  @prop({ type: Number, unique: true })
  public value: number;
}

export const DiscountModel = getModelForClass(Discount)
