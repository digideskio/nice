Security.defineMethod('ifIsSameUser', {
  fetch: [],
  transform: null,
  deny (type, arg, userId, doc) {
    return doc._id !== userId
  }
})

// this functions checks if the document modification only consists of
// adding/removing the logged in user to a followers list of another user.
// this prevents users from modifying followers at will.
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
Users.permit(['update']).ifLoggedIn().ifIsSameUser().onlyProps(['following', 'profile']).apply()
Users.permit(['update']).ifLoggedIn().ifChangesSelf().onlyProps(['followers']).apply()
