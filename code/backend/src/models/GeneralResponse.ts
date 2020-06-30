export class GeneralResponse {
  error: boolean
  code: number
  description: string
  data: Object

  constructor (data?: Object, ...object: any) {
    if (data) {
      this.data = data
    }
    this.error = object[0]
    this.code = object[1]
    this.description = object[2]
  }
}
