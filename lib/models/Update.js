Updates = new Mongo.Collection('updates')

const updateSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 141
  },
  user: {
    type: updateUserSchema
  }
})

const updateUserSchema = new SimpleSchema({
  username: {
    type: String
  }
})

Updates.attachSchema(updateSchema)
