import { prop, getModelForClass } from '@typegoose/typegoose'

export class Payment {
  @prop()
  public paymentMethod: string;

  @prop()
  public paymentStatus: string;

  @prop()
  public deliveryStatus: string;
}

export const PaymentTypeModel = getModelForClass(Payment)
