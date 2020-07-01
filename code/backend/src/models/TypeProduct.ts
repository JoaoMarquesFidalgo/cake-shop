import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongoose from 'mongoose'
type ObjectId = mongoose.Types.ObjectId;

export class TypeProduct extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId

  @prop({ unique: true, sparse: true })
  public name: string;

  @prop()
  public googleTaxo: string[];
}

export const TypeProductModel = getModelForClass(TypeProduct)
