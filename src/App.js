import React from 'react'
import {
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom'
import {
  Layout,
} from 'antd'
import Sidebar from 'react-sidebar'
// import Clipboard from 'react-clipboard.js'
import history from './utils/history'
import {
  getStatus,
} from './utils/chromeApi'
import Header from './layouts/Header'
import SidebarMenu from './layouts/Sidebar'
import IndexRouter from './routes/IndexRouter'
import Login from './pages/Login'
import Setup from './pages/Setup'
import './assets/css/layout.less'

const {
  Content,
} = Layout

const mql = window.matchMedia('(min-width: 576px)')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      docked: mql.matches,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  toggleSidebar = () => {
    const isOpen = this.state.open
    this.setState({
      open: !isOpen,
    })
  }

  resize = () => {
    if (window.innerWidth <= 576) {
      if (this.state.docked === true) {
        this.setState({
          open: false,
          docked: false,
        })
      }
    }

    if (window.innerWidth >= 1200) {
      if (this.state.docked === false) {
        this.setState({
          open: false,
          docked: true,
        })
      }
    }
  }

  render() {
    const status = getStatus()

    switch (status) {
      case 'online':
      case 'offline':
        return (
          <HashRouter>
            <Layout
              style={{
                minHeight: '100vh',
              }}
            >
              <Sidebar
                sidebar={(
                  <SidebarMenu
                    account='sample-account-name'
                  />
                )}
                open={this.state.open}
                onSetOpen={this.toggleSidebar}
                docked={this.state.docked}
                styles={{
                  sidebar: {
                    background: 'white',
                    width: '220px',
                  },
                }}
              >
                <Header
                  open={this.state.open}
                  toggle={this.toggleSidebar}
                />
                <Content>
                  <IndexRouter />
                </Content>
              </Sidebar>
            </Layout>
          </HashRouter>
        )
      case 'locked':
        return (
          <HashRouter>
            <Switch history={history}>
              <Route component={Login} />
            </Switch>
          </HashRouter>
        )
      default:
        break;
    }

    return (
      <HashRouter>
        <Switch history={history}>
          <Route component={Setup} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App
