Template.timeline.onCreated(function () {
  this.autorun(() => {
    this.subscribe('updateFeed', Meteor.userId())
  })
})

Template.timeline.helpers({
  updates () {
    return Updates.find({}, {sort: {createdAt: -1}})
  }
})
