Invitations = new Mongo.Collection('invitations')

const invitationSchema = new SimpleSchema({
  token: {
    type: String,
    min: 19,
    max: 20
  },
  used: {
    type: Boolean,
    autoValue () {
      return false
    }
  }
})

Invitations.attachSchema(invitationSchema)

Invitations.generateOne = () => {
  let token = Random.id(20)
  Invitations.insert({token})
  console.log(`/register?token=${token}`)
}
