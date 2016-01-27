Template.notifs.limit = 20
Template.notifs._trigger = new Tracker.Dependency()

Template.notifs.onCreated(function () {
	this.autorun(() => {
		Template.timeline._trigger.depend()
		this.subscribe('notifications', Meteor.userId(), Template.notifs.limit)
	})

	Meteor.call('notifications.allRead', Meteor.userId())
})

Template.notifs.helpers({
	notifications () {
		return Notifications.find({}, {sort: {createdAt: -1}})
	},
	gravatar (email) {
		return Gravatar.imageUrl(email, {size: 50})
	},
	isMention (type) {
		return type === 'mention'
	}
})

Template.notifs.events({
  'click #paginate': evt => {
    evt.preventDefault()
    Template.notifs.limit = Template.notifs.limit + 20
    Template.notifs._trigger.changed()
    $(document).scrollTop($(document).height())
  }
})
