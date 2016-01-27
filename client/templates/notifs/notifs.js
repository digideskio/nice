Template.notifs.onCreated(function () {
	this.autorun(() => {
		this.subscribe('notifications', Meteor.userId())
	})

	Meteor.call('notifications.allRead', Meteor.userId())
})
