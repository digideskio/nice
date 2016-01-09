const R = FlowRouter
const BL = BlazeLayout

R.route('/', {
  action: (params, queryParams) => {
    BL.render('main', tmp('index'))
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
