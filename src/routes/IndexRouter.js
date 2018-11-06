import React from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  Div,
} from 'glamorous'
import history from '../utils/history'
import Dashboard from '../pages/Dashboard'

const Error404 = ({ location }) => (
  <Div
    margin='20px'
  >
    <h3>Page does not exist. <b>{location.pathname}</b></h3>
  </Div>
)

export default class IndexRouter extends React.Component {
  signout = () => {
    localStorage.clear()
  }

  render() {
    return (
      <Switch history={history}>
        <Route
          exact
          path='/dashboard'
          render={() => {
            return <Dashboard {...this.props} />
          }}
        />
        <Route
          exact
          path='/logout'
          render={() => {
            localStorage.clear()
            window.location.replace('/')
            return <Redirect to='/' />
          }}
        />

        {/* Redirect */}
        <Route
          exact
          path='/'
          render={() => {
            window.location.reload()
            return <Redirect to='/feed' />
          }}
        />

        {/* Error */}
        <Route component={Error404} />
      </Switch>
    )
  }
}
