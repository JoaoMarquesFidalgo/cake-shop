import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Payment extends TimeStamps {
  @prop()
  public paymentMethod: string;

  @prop()
  public paymentStatus: string;

  @prop()
  public deliveryStatus: string;
}

export const PaymentModel = getModelForClass(Payment)
