const R = FlowRouter
const BL = BlazeLayout

R.route('/', {
  name: 'root',
  action: () => {
    Meteor.userId() ? R.go('/timeline') : BL.render('main', tmp('index'))
  }
})

R.route('/timeline', {
  name: 'timeline',
  action: () => {
    BL.render('main', tmp('timeline'))
  }
})

R.route('/logout', {
  name: 'logout'
  action: () => {
    AccountsTemplates.logout()
  }
})

R.notFound = {
  name: '404',
  action: () => {
    BL.render('main', tmp('404'))
  }
}

const tmp = t => {
  return {top: 'header', main: t}
}
