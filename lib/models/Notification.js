Notifications = new Mongo.Collection('notifications')

const NotificationsSchema = new SimpleSchema({
	to: {
		type: String
	},
	'from._id': {
		type: String
	},
	'from.username': {
		type: String
	},
	'from.email': {
		type: String
	},
	type: {
		type: String,
		allowedValues: [
			'mention'
		]
	},
	content: {
		type: String
	}
})
