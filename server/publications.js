Meteor.publish('updateFeed', (_id, limit) => {
  let followed = Users.findOne({_id}).following
  // filter out user updates for only the ones followed and, of course, the
  // user themselves
  let updates = Updates.find({$or: [
    {'user._id': {$in: followed}},
    {'user._id': {$eq: _id}}
  ]}, {sort: {createdAt: -1}, limit})
  return updates
})

// return a single user document
Meteor.publish('userOne', username => {
  return Users.find({username})
})

// returns all updates from a single user
Meteor.publish('updatesUser', (username, limit) => {
  return Updates.find({'user.username': username}, {sort: {createdAt: -1}, limit})
})

// returns a single update
Meteor.publish('update', _id => {
  return Updates.find({_id})
})

Meteor.publish('updateFamily', _id => {
  let thisUpdate = Updates.findOne({_id})
  let updates = Updates.find({$or: [
    {_id: {$eq: _id}},
    {_id: {$eq: thisUpdate.parent}},
    {parent: {$eq: _id}}
  ]})

  return updates
})

// meteor-internal, for granular access control
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
