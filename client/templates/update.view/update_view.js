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
