// TODO: dont make this all updates
Meteor.publish('updateFeed', id => {
  return Updates.find()
})

Meteor.publish('userOne', username => {
  return Users.find({username})
})

Meteor.publish('updates', username => {
  return Updates.find({'user.username': username})
})
