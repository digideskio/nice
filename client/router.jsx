const { render } = ReactDOM
const {
  Router,
  Route
} = ReactRouter
const history = ReactRouter.history.createHistory

const routes = (
  <Route path='/' component={Body}></Route>
)

const router = (
  <Router history={history()}>
    {routes}
  </Router>
)

Meteor.startup(() => {
  render(router, $('#app-container').get(0))
})
