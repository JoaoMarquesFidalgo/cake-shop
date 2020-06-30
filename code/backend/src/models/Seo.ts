import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Seo extends TimeStamps {
  @prop()
  public seoTitle: string;

  @prop()
  public seoDescription: string;
}

export const SeoModel = getModelForClass(Seo)
