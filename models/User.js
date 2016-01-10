Users = Meteor.users // eslint-disable-line

const UserSchema = new SimpleSchema({
  username: {
    type: String,
    min: 2,
    max: 30
  },
  emails: {
    type: [Object]
  },
  'emails.$.address': {
    type: String
  },
  'emails.$.verified': {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true
  }
})

Users.attachSchema(UserSchema)
