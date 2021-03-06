import React from 'react'
import { NavLink } from 'react-router-dom'
import { observable } from 'mobx'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  // message,
  // Tag,
  // Tooltip,
  Avatar,
  Icon,
  Menu,
} from 'antd'
import {
  Div,
} from 'glamorous'
import styled from 'styled-components'
import {
  newWindow,
} from '../utils/chromeApi'
import Log from '../utils/debugLog'


const UpperDiv = styled.div`
  margin-bottom: 10px;
`

const BottomBtn = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  height: 44px;
`

// const EllipsisTag = styled(Tag)`
//   overflow: hidden;
//   text-overflow: ellipsis;
//   width: fit-content;
//   max-width: 160px;
// `

const TitleIcon = styled(Icon)`
margin-right: 10px;
`

@inject('accountStore')
@observer
class SidebarMenu extends React.Component {
  @observable selectedMenu = window.location.href.split('#')[1]

  constructor(props) {
    super(props)

    this.accountStore = this.props.accountStore || {}
    this.account = this.accountStore.currentAccount
    this.accountStore.setAccountInfo(this.account)
    this.accountInfo = this.accountStore.accountInfo

    if (window.location.href.split('#')[1] === '/') {
      this.selectedMenu = '/dashboard'
    }
  }

  render() {
    Log.info('Sidebar', 'render()')
    Log.info('Sidebar::selectedMenu', this.selectedMenu)

    // let accountBalance = ''
    // try {
    //   accountBalance = this.accountStore.accountInfo.core_liquid_balance
    // } catch (error) {
    //   Log.error('this.accountStore.accountInfo.core_liquid_balance')
    // }

    return (
      <Div>
        <Div
          textAlign='center'
          padding='20px'
        >
          <Avatar
            src={`https://avatars.dicebear.com/v2/identicon/${this.account}.svg`}
            shape='circle'
            size={52}
            icon='user'
          />
          <UpperDiv style={{ marginTop: '10px' }}>
            <b>{this.account}</b>
          </UpperDiv>
          {/* <UpperDiv>
            {accountBalance}
          </UpperDiv> */}
          <div>
            {/* <Tooltip placement='top' title='Copy address'>
              <Clipboard
                key='1'
                component='span'
                data-clipboard-text='0x58BEa8bD7938be0d87B2B235920BDeC828225c5e'
                onSuccess={() => message.success('Copied!', 1.5)}
              >
                <EllipsisTag>0x58BEa8bD7938be0d87B2B235920BDeC828225c5e</EllipsisTag>
              </Clipboard>
            </Tooltip> */}
          </div>
        </Div>
        <Menu
          mode='inline'
          selectedKeys={[this.selectedMenu]}
        >
          <Menu.Item
            key='/dashboard'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/dashboard'>
              <Icon type='dashboard' theme='outlined' />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key='/wallet'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/wallet'>
              <Icon type='wallet' theme='outlined' />
              <span>Wallet</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key='/settings'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/settings'>
              <Icon type='tool' theme='outlined' />
              <span>Settings</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key='/logout'
            onClick={(item) => {
              this.selectedMenu = item.key
              this.props.closeSidebar()
            }}
          >
            <NavLink to='/logout' style={{ color: 'red' }}>
              <Icon type='logout' theme='outlined' />
              <span>Logout</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        {
          (window.name)
            ? ''
            : (
              <BottomBtn>
                <a
                  id='open-newtab'
                  href='/#'
                  rel='noopener noreferrer'
                  onClick={() => {
                    newWindow()
                    window.close()
                  }}
                >
                  <TitleIcon type='export' theme='outlined' />
                  <span>Open in a new tab</span>
                </a>
              </BottomBtn>
            )
        }
      </Div>
    )
  }
}

export default SidebarMenu
