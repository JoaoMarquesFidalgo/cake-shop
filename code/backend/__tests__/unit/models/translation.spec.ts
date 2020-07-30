import { Translation } from '@models/Translation'
import { languages } from '@enum/languages'
import * as faker from 'faker'

describe('test the translation model', () => {
  it('should create a new translation object', () => {
    const translation = new Translation()
    translation.language = languages.EN
    translation.value = faker.random.words(5)

    expect(translation.language).toBeDefined()
    expect(translation.value).toBeDefined()

    expect(translation._id).not.toBeDefined()
    expect(translation.createdAt).not.toBeDefined()
    expect(translation.updatedAt).not.toBeDefined()
  })
})
