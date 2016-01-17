Template.header.events({
  'submit #updateModalForm': evt => {
    evt.preventDefault()

    let content = evt.target.content.value
    let userObj = Meteor.user()
    let user = {
      _id: userObj._id,
      username: userObj.username,
      email: userObj.emails[0].address
    }
    Updates.insert({content, user})

    $('#updateModalForm textarea').val('')
  }
})

Template.main.onRendered(() => {
  if (Session.get('nice.bannerHidden') === true)
    $('#welcome').hide(0)

  $('#welcome .close').on('click', () => {
    Session.setPersistent('nice.bannerHidden', true)
    $('#welcome').hide(0)
  })
})

Template.main.helpers({
  banner () { return Info.banner }
})
