import { ShoppingCart } from '@models/ShoppingCart'
import { Translation } from '@models/Translation'
import { User } from '@models/User'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId;

export class FavoriteShoppingCart extends TimeStamps {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop({ ref: ShoppingCart })
  public shoppingCart: Ref<ShoppingCart>;

  @prop({ ref: Translation })
  public comments: Ref<Translation>[];
}

export const FavoriteShoppingCartModel = getModelForClass(FavoriteShoppingCart)
