Migrations.add({
  version: 2,
  up () {
    Notifications.find().forEach(notif => {
      Notifications.update(notif, {$set: {
        createdAt: new Date()
      }})
    })
  }
})
