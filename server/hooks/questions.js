Questions.before.insert((userId, doc) => {
  doc.isAnon = userId ? false : true // eslint-disable-line
  doc.authorId = userId

  // TODO: add question to recipient inbox
})
