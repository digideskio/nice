Template.user_view.onCreated(function () {
  this.autorun(() => {
    let username = FlowRouter.getParam('username')
    this.subscribe('userData', username)
  })
})

Template.user_view.helpers({
  user () {
    let username = FlowRouter.getParam('username')
    let user = Users.findOne({username}) || {}
    console.log(user)
    return user
  }
})
