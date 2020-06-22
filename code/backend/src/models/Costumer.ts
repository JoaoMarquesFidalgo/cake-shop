import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Costumer extends TimeStamps {
  @prop({ unique: true })
  public email: string;

  @prop({ default: null })
  public name: string;

  @prop({ default: null })
  public password: string;

  @prop({ default: false })
  public acceptMarketing: boolean;

  @prop({ default: false })
  public facebookAuth: boolean;

  @prop({ default: null })
  public accessToken: string;

  @prop({ default: 'active' })
  public stateOfAccount: string;
}

export const CostumerModel = getModelForClass(Costumer)
