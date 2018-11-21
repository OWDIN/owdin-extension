import React from 'react'
import {
  Badge,
  Icon,
  Layout,
} from 'antd'
import {
  Div,
  // H1,
} from 'glamorous'

const HeaderWrapper = Layout.Header

const status = {
  'online': 'success',
  'offline': 'error',
  'warning': 'warning',
  'processing': 'processing',
  'unset': 'default',
}

const Header = (props) => {
  return (
    <HeaderWrapper style={{ background: '#fff', padding: 0 }}>
      <Div
        padding='16px'
        width='44px'
        height='44px'
        display='inline'
        onClick={props.toggle}
      >
        <Icon
          id='sider-trigger'
          className='sider-trigger'
          type='menu'
        />
      </Div>
      <Div
        display='inline'
      >
        {/* <H1 display='inline' fontSize='16px'>OWDIN Wallet</H1> */}
      </Div>
      <Badge
        status={status[props.status]}
        text={props.network}
        style={{
          float: 'right',
          padding: '0 20px',
        }}
      />
    </HeaderWrapper>
  )
}

export default Header
