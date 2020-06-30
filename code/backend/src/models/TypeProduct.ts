import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class TypeProduct extends TimeStamps {
  @prop({ unique: true })
  public name: string;

  @prop()
  public googleTaxo: string[];
}

export const TypeProductModel = getModelForClass(TypeProduct)
