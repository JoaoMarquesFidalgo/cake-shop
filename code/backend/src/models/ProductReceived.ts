import { Discount } from '@models/Discount'
import { Seo } from './Seo'
import { Zone } from './Zone'
import { TypeProduct } from './TypeProduct'
import { Translation } from './Translation'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class ProductReceived extends TimeStamps {
  @prop()
  public name: Translation[];

  @prop({ default: undefined })
  public description?: Translation[];

  @prop()
  public thumbnailUrl?: string;

  @prop({ default: undefined })
  public imageUrl?: string[];

  @prop({ default: undefined })
  public typesOfProduct?: TypeProduct[];

  @prop({ default: undefined })
  public fromZone?: Zone;

  @prop()
  public stock: number;

  @prop()
  public reserved?: number;

  @prop()
  public price: number;

  @prop()
  public weight?: number;

  @prop({ default: undefined })
  public discount?: Discount;

  @prop({ default: undefined })
  public seo?: Seo;

  @prop()
  public url?: string;

  @prop()
  public newDoc?: boolean;

  @prop()
  public tax: number;
}

export const ProductReceivedModel = getModelForClass(ProductReceived)
