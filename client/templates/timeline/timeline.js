Template.timeline.limit = 20
Template.timeline._trigger = new Tracker.Dependency()

Template.timeline.onCreated(function () {
  this.autorun(() => {
    // sub to only the stuff we need
    Template.timeline._trigger.depend()
    this.subscribe('updateFeed', Meteor.userId(), Template.timeline.limit)
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

Template.timeline.events({
  'click #paginate': evt => {
    evt.preventDefault()
    Template.timeline.limit = Template.timeline.limit + 20
    Template.timeline._trigger.changed()
    $(document).scrollTop($(document).height())
  }
})
