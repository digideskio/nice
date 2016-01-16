Invitations = new Mongo.Collection('invitations')

const invitationSchema = new SimpleSchema({
  token: {
    type: String,
    min: 19,
    max: 20
  },
  used: {
    type: Boolean
    autoValue () {
      return false
    }
  }
})
