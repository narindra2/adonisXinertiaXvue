import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare  title : string
  @column()
  declare  content : string
  @column()
  declare  online : boolean
  @column()
  declare  image : string | null
  @column()
  declare  catId : number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}