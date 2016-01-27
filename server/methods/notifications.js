Meteor.methods({
	'notifications.new' (targetId, type, content) {
		let user = Users.findOne({_id: this.userId})
		let doc = {
			to: targetId,
			from: {
				_id: user._id,
				username: user.username,
				email: user.emails[0].address
			},
			type,
			content,
			read: false
		}
		Notifications.insert(doc)
	}
})
