Accounts.validateNewUser(user => {
  invitation = Invitations.findOne({
    token: user.profile.invitationToken,
    used: false
  })
  if (!invitation)
    throw new Meteor.Error(403, 'Please provide a valid invitation token.')
  Invitations.update({
    token: user.profile.invitationToken,
    used: false
  }, {$set: { used: true }})
  return true
})
