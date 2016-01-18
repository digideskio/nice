// users can create new updates
Updates.permit(['insert']).ifLoggedIn().apply()
