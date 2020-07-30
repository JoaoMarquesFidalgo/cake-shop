import { GeneratePassword } from '@models/GeneratePassword'
import * as faker from 'faker/locale/pt_BR'

describe('test the generatePassword model', () => {
  it('should create a new generatePassword object', () => {
    const generatedPassword = new GeneratePassword()
    generatedPassword.hash = faker.random.alphaNumeric(20)
    generatedPassword.salt = faker.random.alphaNumeric(20)

    expect(generatedPassword.hash).toBeDefined()
    expect(generatedPassword.salt).toBeDefined()
  })
})
