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
	'status._id': {
		type: String
	},
	'status.content': {
		type: String
	},
	createdAt: {
    type: Date,
    autoValue () { return new Date() }
  },
	read: {
		type: Boolean,
		defaultValue: false
	}
})

Notifications.helpers({
	relDate () {
    return moment(this.createdAt).from(moment())
  },
	parseMentions (matches = false) {
    // regexp to find the mentions
    const re = /@[\w\d]+/igm
    let match
    let matchArr = []
    // the new content string is HTML escaped
    let newcontent = this.status.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // runs as long as there are matches to the regex
    while ((match = re.exec(this.status.content)) !== null) {
      matchArr.push(match)
      // puts together the link to the user mentioned
      let link = '<a href="/u/' + match[0].split('@')[1] + '">' + match[0] + '</a>'
      // a custom regex
      let regex = new RegExp(match[0], 'ig')
      // replaces the mention in the cloned content
      newcontent = newcontent.replace(regex, link)
    }
    // returns the cloned content
    if (matches)
      return _.uniq(matchArr.map(it => it[0]))
    return newcontent
  }
})
