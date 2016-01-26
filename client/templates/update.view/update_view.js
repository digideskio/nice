Template.update_view.onCreated(function () {
  this.autorun(() => {
    this.subscribe('updateFamily', FlowRouter.getParam('_id'))
  })
})

Template.update_view.helpers({
  update () {
    return thisUpdate()
  },
  gravatar (email) {
    return Gravatar.imageUrl(email, {size: 300})
  },
  timestamp (date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss A')
  },
  hasParent () {
    return thisUpdate().parent
  },
  parent () {
    return Updates.findOne({_id: thisUpdate().parent})
  },
  hasChildren () {
    return Updates.find({parent: thisUpdate()._id}).count() !== 0
  },
  children () {
    return Updates.find({parent: thisUpdate()._id})
  },
  replyMentions (update) {
    let matches = update.parseMentions(true)
    let usernames = matches.map(it => it[0])
    let str
    if (!usernames.includes(`@${update.user.username}`)) {
      str = `@${update.user.username} ${usernames.join(' ')}`
    } else {
      str = `${usernames.join(' ')}`
    }
    if (str === ' ')
      return ''
    return str
  }
})

Template.update_view.events({
  'submit #submitReply': evt => {
    evt.preventDefault()

    let content = evt.target.reply.value
    let tUser = Meteor.user()
    let user = {
      _id: tUser._id,
      username: tUser.username,
      email: tUser.emails[0].address
    }
    let parent = thisUpdate()._id

    Updates.insert({content, parent, user})
    $('#submitReply textarea').val('')
  },
  'keydown textarea': evt => {
    if ((evt.metaKey && evt.keyCode === 13) ||
        (evt.ctrlKey && evt.keyCode === 13)) {
      $('#submitReply').submit()
    }
  }
})

const thisUpdate = () => {
  return Updates.findOne({_id: FlowRouter.getParam('_id')})
}
