import { JWTObject } from '@models/JWTObject'
import * as faker from 'faker/locale/pt_BR'

describe('test the jwtObject model', () => {
  it('should create a new jwtObject object', () => {
    const generatedPassword = new JWTObject()
    generatedPassword.token = faker.random.alphaNumeric(20)
    generatedPassword.expires = '1d'

    expect(generatedPassword.token).toBeDefined()
    expect(generatedPassword.expires).toBeDefined()
  })
})
