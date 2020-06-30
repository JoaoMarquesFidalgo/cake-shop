import validator from 'validator'
import { typesOfValue } from '@enum/typesValues'

export function sanitizeValidateValue (type: typesOfValue, value: any): boolean | string {
  switch (type) {
    case typesOfValue.WORD:
    case typesOfValue.PASSWORD:
      value = '' + value
      if (validator.isEmpty(value)) {
        return false
      }
      if (!validator.isLength(value, { min: 2, max: undefined })) {
        return false
      }
      return validator.escape(value)
    case typesOfValue.EMAIL:
      return (validator.isEmail(value)) ? validator.normalizeEmail(value) : false

    case typesOfValue.NUMBER:
      return validator.isNumeric(String(value))

    case typesOfValue.JSON:
      return validator.isJSON(value)

    case typesOfValue.PHONE:
      return validator.isMobilePhone(value)

    case typesOfValue.BOOLEAN:
      return validator.isBoolean(value)

    case typesOfValue.DATE:
      return validator.isISO8601(value)

    case typesOfValue.OBJECT_ID:
      return validator.isMongoId(value)
  }
}
