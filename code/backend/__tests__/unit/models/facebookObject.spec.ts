import { FacebookObject } from '@models/FacebookObject'
import * as faker from 'faker/locale/pt_BR'

describe('test the facebookObject model', () => {
  it('should create a new facebookObject object', () => {
    const facebookObject = new FacebookObject()
    facebookObject.facebookId = faker.random.alphaNumeric(10)
    facebookObject.id = faker.random.alphaNumeric(10)
    facebookObject.emails = []
    facebookObject.emails.push({ value: faker.internet.email() })

    expect(facebookObject.emails.length).toBeGreaterThan(0)
    expect(facebookObject.emails[0]).toBeDefined()
    expect(facebookObject.id).toBeDefined()
    expect(facebookObject.facebookId).toBeDefined()
  })
})
