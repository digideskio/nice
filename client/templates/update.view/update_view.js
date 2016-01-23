Template.update_view.onCreated(function () {
  this.autorun(() => {
    this.subscribe('update', FlowRouter.getParam('_id'))
  })
})

Template.update_view.helpers({
  update () {
    return Updates.findOne({_id: FlowRouter.getParam('_id')})
  },
  gravatar (email) {
    return Gravatar.imageUrl(email, {size: 300})
  },
  timestamp (date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss A')
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
    let parent = Updates.findOne({_id: FlowRouter.getParam('_id')})._id

    Updates.insert({content, parent, user})
  }
})
