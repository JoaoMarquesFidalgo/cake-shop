import { Zone } from '@models/Zone'
import * as faker from 'faker'

describe('test the zone model', () => {
  it('should create a new zone object', () => {
    const zone = new Zone()
    zone.name = faker.address.city()

    expect(zone.name).toBeDefined()

    expect(zone._id).not.toBeDefined()
    expect(zone.createdAt).not.toBeDefined()
    expect(zone.updatedAt).not.toBeDefined()
  })
})
