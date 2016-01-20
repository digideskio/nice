Migrations.add({
  version: 1,
  up () {
    Users.find().forEach(user => {
      Users.update(user, {$set: {
        following: [],
        followers: []
      }})
    })
  }
})
