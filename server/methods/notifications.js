Meteor.methods({
	'notifications.new' (targetId, type, contentId) {
		let user = Users.findOne({_id: this.userId})
		let status = Updates.findOne({_id: contentId})
		let doc = {
			to: targetId,
			from: {
				_id: user._id,
				username: user.username,
				email: user.emails[0].address
			},
			type,
			status: {
				_id: status._id,
				content: status.content
			},
			read: false
		}
		Notifications.insert(doc)
	},

	'notifications.allRead' (_id) {
		if (_id === this.userId) {
			Notifications.find({to: _id, read: false}).forEach(notif => {
				Notifications.update(notif, {$set: {read: true}})
			})
		}
	}
})
