Meteor.publish('userData', username => {
  check(username, String)
  return Users.find({username}, {
    fields: {
      services: 0
    }
  })
})

Meteor.publish('updateFeed', id => {
  return Updates.find()
})
