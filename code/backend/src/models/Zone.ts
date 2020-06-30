import { prop, getModelForClass } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class Zone extends TimeStamps {
  @prop({ unique: true })
  public name: string;
}

export const ZoneModel = getModelForClass(Zone)
