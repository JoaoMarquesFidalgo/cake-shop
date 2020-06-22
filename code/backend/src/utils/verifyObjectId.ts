import { typesOfValue } from 'src/enum/typesValues'
import { sanitizeValidateValue } from './sanitizeValues'

export function verifyObjectId (id: string): boolean | string {
  return sanitizeValidateValue(typesOfValue.OBJECT_ID, id)
}
