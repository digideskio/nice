const R = FlowRouter
const BL = BlazeLayout

// name: root
// pathspec: /
// function: the index page that displays the front when not logged in, and
// the dashboard when logged in
R.route('/', {
  name: 'root',
  action: () => {
    Meteor.userId() ? R.go('/timeline') : BL.render('main', tmp('index'))
  }
})

// name: timeline
// pathspec: /timeline
// function: displays a timeline of recent updates
R.route('/timeline', {
  name: 'timeline',
  action: () => {
    BL.render('main', tmp('timeline'))
  }
})

// name: logout
// pathspec: /logout
// function: logs the user out
R.route('/logout', {
  name: 'logout',
  action: () => {
    AccountsTemplates.logout()
  }
})

// name: update.view
// pathspec: /u/:update_id
// function: displays a single update and (TODO) its reply chain
R.route('/u/:_id', {
  name: 'update.view',
  action: () => {
    BL.render('main', tmp('update_view'))
  }
})

// name: user.view
// pathspec: /u/:username
// function: displays a single users' profile
R.route('/u/:username', {
  name: 'user.view',
  action: () => {
    BL.render('main', tmp('user_view'))
  }
})

// name: 404
// pathspec: any
// function: not found page
R.notFound = {
  name: '404',
  action: () => {
    BL.render('main', tmp('404'))
  }
}

// lazy helper for the dumb blaze layout handling
const tmp = t => {
  return {top: 'nav', main: t}
}
