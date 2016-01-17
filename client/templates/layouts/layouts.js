Template.header.events({
  'submit #updateModalForm': evt => {
    evt.preventDefault()

    let content = evt.target.content.value
    let userid = Meteor.userId()
    Updates.insert({content, user: {_id: userid}})

    $('#updateModalForm textarea').val('')
  }
})
