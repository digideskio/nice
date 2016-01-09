const R = FlowRouter
const BL = BlazeLayout

R.route('/', {
  action: (params, queryParams) => {
    BL.render('main', tmp('index'))
  }
})

const tmp = t => {
  return {top: 'header', main: t}
}
