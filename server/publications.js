// TODO: dont make this all updates
Meteor.publish('updateFeed', _id => {
  let followed = Users.findOne({_id}).following
  let updates = Updates.find({$or: [
    {'user._id': {$in: followed}},
    {'user._id': {$eq: _id}}
  ]})
  return updates
})

Meteor.publish('userOne', username => {
  return Users.find({username})
})

Meteor.publish('updates', username => {
  return Updates.find({'user.username': username})
})

Meteor.publish('update', _id => {
  return Updates.find({_id})
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
