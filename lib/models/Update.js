Updates = new Mongo.Collection('updates')

const updateSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 141
  },
  createdAt: {
    type: Date,
    autoValue () { return new Date() }
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
