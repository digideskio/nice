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

// meteor-internal
Meteor.publish('userData', function () {
  if (this.userId) {
    return Users.find({_id: this.userId}, {fields: {
      followers: 1,
      following: 1
    }})
  } else {
    this.ready()
  }
})
