const AT = AccountsTemplates

AT.addField({
  _id: 'username',
  type: 'text',
  displayName: 'Username',
  required: true,
  minLength: 2,
  lowercase: true
})

AT.removeField('email')
AT.addField({
  _id: 'email',
  type: 'email',
  required: true,
  re: /.+@(.+){2,}\.(.+){2,}/
})

AT.removeField('password')
AT.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 5
})

AT.configure({
  defaultLayoutType: 'blaze',
  defaultLayout: 'main',
  defaultLayoutRegions: {
    top: 'header'
  },
  defaultContentRegion: 'main'
})

AT.configureRoute('signIn', {
  path: '/login'
})

AT.configureRoute('signUp', {
  path: '/register'
})
