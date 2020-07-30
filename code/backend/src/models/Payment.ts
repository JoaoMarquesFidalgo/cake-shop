import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId;

export class Payment extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop({ required: true })
  public paymentMethod: string;

  @prop({ required: true })
  public paymentStatus: string;

  @prop({ required: true })
  public deliveryStatus: string;
}

export const PaymentModel = getModelForClass(Payment)
