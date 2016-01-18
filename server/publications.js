// TODO: dont make this all updates
Meteor.publish('updateFeed', id => {
  return Updates.find()
})
