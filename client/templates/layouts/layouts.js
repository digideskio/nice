// main template

Template.main.onRendered(() => {
  if (Session.get('nice.bannerContent') !== Info.banner.content)
    Session.clear('nice.bannerHidden')

  if (Session.get('nice.bannerHidden') === true)
    $('#welcome').hide(0)

  $('#welcome .close').on('click', () => {
    Session.setPersistent('nice.bannerHidden', true)
    Session.setPersistent('nice.bannerContent', Info.banner.content)
    $('#welcome').hide(0)
  })

  $('#updateModal').sticky({
    context: '#main'
  })
})

Template.main.helpers({
  banner () { return Info.banner }
})

// sidebar template

Template.sidebar.events({
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
  },
  'keydown textarea': evt => {
    if ((evt.metaKey && evt.keyCode === 13) ||
        (evt.ctrlKey && evt.keyCode === 13)) {
      $('#updateModalForm').submit()
    }
  }
})
