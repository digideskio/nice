Updates = new Mongo.Collection('updates')

const updateSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 141
  },
  'user._id': {
    type: String
  },
  'user.username': {
    type: String
  },
  'user.email': {
    type: String
  }
})

Updates.attachSchema(updateSchema)
