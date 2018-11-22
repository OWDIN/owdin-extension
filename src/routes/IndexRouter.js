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
import {
  setStatus,
} from '../utils/chromeApi'
import Dashboard from '../pages/Dashboard'
import Wallet from '../pages/Wallet'
import Settings from '../pages/Settings'

const Error404 = ({ location }) => (
  <Div
    margin='20px'
  >
    <h3>Page does not exist. <b>{location.pathname}</b></h3>
  </Div>
)

class IndexRouter extends React.Component {
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
          path='/wallet'
          render={() => {
            return <Wallet {...this.props} />
          }}
        />
        <Route
          exact
          path='/settings'
          render={() => {
            return <Settings {...this.props} />
          }}
        />
        <Route
          exact
          path='/logout'
          render={() => {
            setStatus('locked')
            setTimeout(() => {
              window.location.replace('/index.html')
            }, 100)
            // window.location.reload()
            return <Redirect to='/' />
          }}
        />

        {/* Redirect */}
        <Route
          exact
          path='/'
          render={() => {
            // window.location.reload()
            return <Redirect to='/dashboard' />
          }}
        />

        {/* Error */}
        <Route component={Error404} />
      </Switch>
    )
  }
}

export default IndexRouter
