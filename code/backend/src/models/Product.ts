import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Discount } from './Discount'
import { Seo } from './Seo'
import { Zone } from './Zone'
import { TypeProduct } from './TypeProduct'
import { Translation } from './Translation'
import * as mongoose from 'mongoose'
type ObjectId = mongoose.Types.ObjectId;
export class Product extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop({ ref: Translation })
  public name: Ref<Translation>[];

  @prop({ ref: Translation, default: undefined })
  public description?: Ref<Translation>[];

  @prop()
  public thumbnailUrl?: string;

  @prop({ default: undefined })
  public imageUrl?: string[];

  @prop({ ref: TypeProduct, default: undefined })
  public typesOfProduct?: Ref<TypeProduct>[];

  @prop({ ref: Zone, default: undefined })
  public fromZone?: Ref<Zone>;

  @prop()
  public stock: number;

  @prop()
  public reserved?: number;

  @prop()
  public price: number;

  @prop()
  public tax: number;

  @prop()
  public weight?: number;

  @prop({ ref: Discount, default: undefined })
  public discount?: Ref<Discount>;

  @prop({ ref: Seo, default: undefined })
  public seo?: Ref<Seo>;

  @prop()
  public url?: string;
}

export const ProductModel = getModelForClass(Product)
