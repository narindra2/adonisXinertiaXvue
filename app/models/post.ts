import { DateTime } from 'luxon'
import { BaseModel, column  ,computed   } from '@adonisjs/lucid/orm'
import env from '#start/env'
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

  @column.dateTime({ 
    autoCreate: true ,
    serialize: (value: DateTime | null) => {
    return value ? value.toRelative() : value
  },})
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
 
  @computed()
  public  get imageUrl() {
    if (this.image) {
      return env.get("ASSET_URL") +"/" + this.image 
    }
  }
  
}