if (Invitations.find().count() === 0) {
  Invitations.insert({
    token: 'aaaaaaaaaaaaaaaaaaaa'
  })
}

if (Users.find().count() === 1) {
  let id = Users.find().fetch()[0]._id
  Roles.addUsersToRoles(id, ['admin', 'verified'])
}
