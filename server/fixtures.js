if (Invitations.find().count() === 0) {
  Invitations.insert({
    token: 'aaaaaaaaaaaaaaaaaaaa'
  })
}
