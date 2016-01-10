Meteor.publish('userData', username => {
  check(username, String)
  return Users.find({username})
})
