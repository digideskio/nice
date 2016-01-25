Template.user_view.limit = 20
Template.user_view._trigger = new Tracker.Dependency()

Template.user_view.onCreated(function () {
  this.autorun(() => {
    Template.user_view._trigger.depend()
    this.subscribe('userOne', FlowRouter.getParam('username'))
    this.subscribe('updatesUser', FlowRouter.getParam('username'), Template.user_view.limit)
  })
})

Template.user_view.helpers({
  user () {
    return thisUser()
  },
  updates () {
    return Updates.find({}, {sort: {createdAt: -1}})
  },
  userIsCurrent () {
    return thisUser()._id === Meteor.userId()
  },
  followersCount () {
    return thisUser().followers.length
  },
  followingCount () {
    return thisUser().following.length
  }
})

Template.user_view.events({
  // this is what happens when someone follows
  'click #follow-button': evt => {
    evt.preventDefault()
    let user = Meteor.user()
    let tUser = thisUser()
    // check if the logged in user isn't following the target user yet
    if (!_.contains(user.following, tUser._id) &&
        !_.contains(tUser.followers, user._id)) {
      Users.update({_id: user._id}, {$push: {following: tUser._id}})
      Users.update({_id: tUser._id}, {$push: {followers: user._id}})
    }
  },
  // likewise, this is what happens when someone unfollows
  'click #unfollow-button': evt => {
    evt.preventDefault()
    let user = Meteor.user()
    let tUser = thisUser()
    // check if the logged in user is following the target user
    if (_.contains(user.following, tUser._id) &&
        _.contains(tUser.followers, user._id)) {
      Users.update({_id: user._id}, {$pull: {following: tUser._id}})
      Users.update({_id: tUser._id}, {$pull: {followers: user._id}})
    }
  },
  // toggles the user image modal
  'click #toggle-modal': evt => {
    evt.preventDefault()
    $('#profile-image-modal').modal('show')
  },
  // when the edit profile button on the own user page is clicked
  'click #edit-profile': evt => {
    evt.preventDefault()
    let bio = Meteor.user().profile.bio ? Meteor.user().profile.bio : ''
    let profileBio = `
      <div class="ui input" id="profile-bio">
        <input type="text" id="bio-editor" value="${bio}">
      </div>
    `
    $('#profile-bio').replaceWith(profileBio)
    $('#edit-profile').replaceWith(`
      <button class="ui primary button" id="save-edit">Save</button>
    `)
  },
  // likewise, when you're in 'edit mode' and press the save button
  'click #save-edit': evt => {
    evt.preventDefault()
    let newbio = $('#bio-editor').val()
    Users.update({_id: Meteor.userId()}, {$set: {'profile.bio': newbio}})
    let profileReplacement = `
      <p id="profile-bio">${newbio ? newbio : 'has no bio :('}</p>
    `
    $('#profile-bio').replaceWith(profileReplacement)
    $('#save-edit').replaceWith(`
      <button class="ui button" id="edit-profile">Edit profile</button>
    `)
  },
  // paginate updates on click
  'click #paginate': evt => {
    evt.preventDefault()
    Template.user_view.limit = Template.user_view.limit + 20
    Template.user_view._trigger.changed()
    $(document).scrollTop($(document).height())
  }
})

const thisUser = () => {
  // let's take a short break to discuss: why not 'user = Users.find()[0]'?
  // there's only one user subscribed to, right?
  // no, actually. see what happens when you execute Meteor.user()? that's
  // right, you get a user entry. now this isn't stored in a separate
  // collection, oh no. it's always stored in Meteor.users aka. Users.
  // because of that, you might get your own user object back when you get
  // the user with that query.
  return Users.findOne({username: FlowRouter.getParam('username')})
}
