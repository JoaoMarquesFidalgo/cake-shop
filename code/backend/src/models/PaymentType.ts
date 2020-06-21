import { prop, getModelForClass } from '@typegoose/typegoose'

export class PaymentType {
  @prop()
  public type: string;
}

export const PaymentTypeModel = getModelForClass(PaymentType)
