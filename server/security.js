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
  deny (type, arg, userId, doc) {
    const origUser = Users.findOne({_id: doc._id})
    if (_.difference(origUser.followers, doc.followers).length === 1 &&
        _.difference(origUser.followers, doc.followers)[0] === userId)
      return false
    return true
  }
})

// users can create new updates
Updates.permit(['insert']).ifLoggedIn().apply()

// logged in users can add themselves to follower lists of other users
Users.permit(['update']).ifLoggedIn().ifIsSameUser().apply()
Users.permit(['update']).ifLoggedIn().ifChangesSelf().onlyProps(['followers']).apply()
