Updates.after.insert(function (userId, doc) {
	// send notifications to everyone mentioned
	let thisDoc = Updates.findOne({_id: this._id})
	let mentions = thisDoc.parseMentions(true)
	mentions.forEach(e => {
		let user = Users.findOne({username: e.split('@')[1]})
		Meteor.call('notifications.new', user._id, 'mention', thisDoc._id)
	})
})
