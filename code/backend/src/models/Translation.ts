import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Translation extends TimeStamps {
  @prop()
  public language: string;

  @prop()
  public value: string;
}

export const TranslationModel = getModelForClass(Translation)
