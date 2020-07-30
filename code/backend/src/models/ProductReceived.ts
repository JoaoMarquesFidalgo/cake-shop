import { Discount } from '@models/Discount'
import { Seo } from '@models/Seo'
import { Translation } from '@models/Translation'
import { TypeProduct } from '@models/TypeProduct'
import { Zone } from '@models/Zone'

export class ProductReceived {
  public name: Translation[];

  public description?: Translation[];

  public thumbnailUrl?: string;

  public imageUrl?: string[];

  public typesOfProduct?: TypeProduct[];

  public fromZone?: Zone;

  public stock: number;

  public reserved?: number;

  public price: number;

  public weight?: number;

  public discount?: Discount;

  public seo?: Seo;

  public url?: string;

  public newDoc?: boolean;

  public tax: number;
}
