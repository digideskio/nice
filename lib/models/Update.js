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
  // TODO: figure out if i can place this in a subobject on model level
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
