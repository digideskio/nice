Template.timeline.onCreated(function () {
  this.autorun(() => {
    // sub to only the stuff we need
    this.subscribe('updateFeed', Meteor.userId())
  })
})

Template.timeline.helpers({
  updates () {
    return Updates.find({}, {sort: {createdAt: -1}})
  },
  gravatar (email) {
    return Gravatar.imageUrl(email, {size: 50})
  },
  hasParent (_id) {
    return Updates.findOne({_id}).parent
  },
  parent (_id) {
    let thisUpdate = Updates.findOne({_id})
    return Updates.findOne({_id: thisUpdate.parent})
  }
})
