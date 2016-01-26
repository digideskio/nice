Invitations = new Mongo.Collection('invitations')

const invitationSchema = new SimpleSchema({
  token: {
    type: String,
    min: 19,
    max: 20
  },
  used: {
    type: Boolean
  }
})

Invitations.attachSchema(invitationSchema)

Invitations.generateOne = () => {
  let token = Random.id(20)
  Invitations.insert({token, used: false})
  console.log(`/register?token=${token}`)
}
