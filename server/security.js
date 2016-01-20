Security.defineMethod('ifIsSameUser', {
  fetch: [],
  transform: null,
  deny (type, arg, userId, doc) {
    return doc._id !== userId
  }
})

Security.defineMethod('ifChangesSelf', {
  fetch: [],
  transform: null,
  deny (type, arg, userId, doc, fields, modifier) {
    if (modifier.$push) {
      if (modifier.$push.followers.length === 1 &&
          modifier.$push.followers[0] === userId) {
        return false
      }
    } else if (modifier.$pull) {
      if (modifier.$pull.followers.length === 1 &&
          modifier.$pull.followers[0] === userId) {
        return false
      }
    } else {
      return true
    }
  }
})

// users can create new updates
Updates.permit(['insert']).ifLoggedIn().apply()

// logged in users can add themselves to follower lists of other users
Users.permit(['update']).ifLoggedIn().ifIsSameUser().apply()
Users.permit(['update']).ifLoggedIn().ifChangesSelf().onlyProps(['followers']).apply()
