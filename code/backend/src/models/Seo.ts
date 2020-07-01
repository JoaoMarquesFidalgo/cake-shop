import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongoose from 'mongoose'
type ObjectId = mongoose.Types.ObjectId;

export class Seo extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop()
  public seoTitle: string;

  @prop()
  public seoDescription: string;
}

export const SeoModel = getModelForClass(Seo)
