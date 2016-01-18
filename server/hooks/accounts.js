Accounts.validateNewUser(user => {
  // search for invitation and see if it isn't used already. if it isn't, update
  // it to be and continue.
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
