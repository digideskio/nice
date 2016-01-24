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
  parseMentions () {
    const re = /@[\w\d]+/igm
    let match
    let newcontent = this.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    while ((match = re.exec(this.content)) !== null) {
      let link = '<a href="/u/' + match[0].split('@')[1] + '">' + match[0] + '</a>'
      let regex = new RegExp(match[0], 'ig')
      newcontent = newcontent.replace(regex, link)
    }
    return newcontent
  }
})
