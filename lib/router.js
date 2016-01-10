const R = FlowRouter
const BL = BlazeLayout

R.route('/', {
  action: () => {
    Meteor.userId() ? R.go('/timeline') : BL.render('main', tmp('index'))
  }
})

R.route('/timeline', {
  action: () => {
    BL.render('main', tmp('timeline'))
  }
})

R.route('/logout', {
  action: () => {
    AccountsTemplates.logout()
  }
})

R.notFound = {
  action: () => {
    BL.render('main', tmp('404'))
  }
}

const tmp = t => {
  return {top: 'header', main: t}
}
