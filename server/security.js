Security.defineMethod('ifIsSameUser', {
  fetch: [],
  transform: null,
  deny (type, arg, userId, doc) {
    return doc._id !== userId
  }
})

// users can create new updates
Updates.permit(['insert']).ifLoggedIn().apply()

// logged in users can add themselves to follower lists of other users
Users.permit(['update']).ifLoggedIn().ifIsSameUser().onlyProps(['profile']).apply()
