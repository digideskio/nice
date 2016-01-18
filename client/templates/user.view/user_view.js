Template.user_view.onCreated(function () {
  this.autorun(() => {
    this.subscribe('userOne', FlowRouter.getParam('username'))
    this.subscribe('updates', FlowRouter.getParam('username'))
  })
})

Template.user_view.helpers({
  gravatar () {
    // let's take a short break to discuss: why not 'user = Users.find()[0]'?
    // there's only one user subscribed to, right?
    // no, actually. see what happens when you execute Meteor.user()? that's
    // right, you get a user entry. now this isn't stored in a separate
    // collection, oh no. it's always stored in Meteor.users aka. Users.
    // because of that, you might get your own user object back when you get
    // the user with that query.
    let user = Users.findOne({username: FlowRouter.getParam('username')})
    return ''
  }
})
