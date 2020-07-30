import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId;

export class Discount extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop({ type: Number, required: true, unique: true, sparse: true })
  public value: number;
}

export const DiscountModel = getModelForClass(Discount)
