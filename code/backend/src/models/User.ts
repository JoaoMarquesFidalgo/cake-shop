import { prop, getModelForClass/*, Severity */ } from '@typegoose/typegoose'
import * as mongoose from 'mongoose'
// import { IModelOptions } from '@typegoose/typegoose/lib/types'
type ObjectId = mongoose.Types.ObjectId;

export class User {
  @prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  public _id?: ObjectId;

  @prop()
  public password?: string;

  @prop()
  public hash?: string;

  @prop()
  public salt?: string;

  @prop({ unique: true })
  public email?: string;

  @prop()
  public facebookId?: string;

  @prop()
  public name?: string;

  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;

  @prop()
  public active?: boolean;
}
/*
const options: IModelOptions = {
  options: {
    allowMixed: Severity.ALLOW,
    customName: 'notification'
  }
}
*/
export const UserModel = getModelForClass(User)
