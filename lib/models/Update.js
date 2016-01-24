Updates = new Mongo.Collection('updates')

const updateSchema = new SimpleSchema({
  content: {
    type: String,
    min: 1,
    max: 141
  },
  createdAt: {
    type: Date,
    autoValue () { return new Date() }
  },
  parent: {
    type: String,
    optional: true
  },
  // TODO: figure out if i can place this in a subobject on model level
  'user._id': {
    type: String
  },
  'user.username': {
    type: String
  },
  'user.email': {
    type: String
  }
})

Updates.attachSchema(updateSchema)

Updates.helpers({
  relDate () {
    return moment(this.createdAt).from(moment())
  },
  parseMentions (matches = false) {
    // regexp to find the mentions
    const re = /@[\w\d]+/igm
    let match
    let matchArr = []
    // the new content string is HTML escaped
    let newcontent = this.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // runs as long as there are matches to the regex
    while ((match = re.exec(this.content)) !== null) {
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
      return matchArr
    return newcontent
  }
})
