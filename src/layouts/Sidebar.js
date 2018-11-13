import React from 'react'
import {
  NavLink,
} from 'react-router-dom'
import {
  Avatar,
  Icon,
  Menu,
  // message,
  // Tag,
  // Tooltip,
} from 'antd'
import {
  Div,
} from 'glamorous'
import styled from 'styled-components'

const UpperDiv = styled.div`
margin-bottom: 10px;
`

const BottomBtn = styled.div`
bottom: 0;
position: absolute;
width: 100%;
text-align: center;
height: 44px;
}
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

const SidebarMenu = (
  <Div>
    <Div
      textAlign='center'
      padding='20px'
    >
      <Avatar
        src={`https://avatars.dicebear.com/v2/identicon/${localStorage.getItem('accountName')}.svg`}
        shape='circle'
        size={52}
        icon='user'
      />
      <UpperDiv style={{ marginTop: '10px' }}>
        <b>
          { localStorage.getItem('accountName') }
        </b>
      </UpperDiv>
      <UpperDiv>
        1000 EOS
      </UpperDiv>
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
      defaultSelectedKeys={[window.location.href.split('#')[1]]}
    >
      <Menu.Item key='/dashboard'>
        <NavLink to='/dashboard'>
          <Icon type='dashboard' theme='outlined' />
          <span>Dashboard</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/wallet'>
        <NavLink to='/wallet'>
          <Icon type='wallet' theme='outlined' />
          <span>Wallet</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/settings' disabled>
        <NavLink to='/settings'>
          <Icon type='tool' theme='outlined' />
          <span>Settings</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key='/logout'>
        <NavLink to='/logout'>
          <Icon type='logout' theme='outlined' />
          <span>Logout</span>
        </NavLink>
      </Menu.Item>
    </Menu>
    <BottomBtn>
      <a id='open-newtab' href={window.location.href} target='_blank' rel='noopener noreferrer'>
        <TitleIcon type='export' theme='outlined' />
        <span>Open in a new tab</span>
      </a>
    </BottomBtn>
  </Div>
)

export default SidebarMenu
