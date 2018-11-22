import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Badge,
  Card,
  Divider,
  Icon,
  Progress,
  Tooltip,
} from 'antd'
import styled from 'styled-components'
import bytes from 'bytes'

const colors = {
  'primary': '#1890ff',
  'success': '#52c41a',
  'warning': '#fadb14',
  'error': '#f5222d',
  'cpu': '#52c41a',
  'net': '#fadb14',
  'ram': '#1890ff',
}

const TitleIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`
const TitleBadge = styled(Badge)`
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: inherit;
`

// const TitleLink = styled.a`
//   margin-right: 8px;
// `

const UpperDiv = styled.div`
  margin-bottom: 1rem;
`
const SubDiv = styled.div`
  line-height: 0.8;
`
const Label = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1rem;
  display: block;
`
const SubLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 1rem;
  margin-right: 1rem;
  display: inline;
`
const Data = styled.span`
  font-size: 1.8rem;
  font-weight: normal;
  color: black;
`
const SubData = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 0.8;
  color: black;
`

@inject('accountStore')
@observer
class TotalUsageCard extends React.Component {
  render() {
    const { accountStore } = this.props

    // get cpu usage
    let cpuLimit = null
    let loading = true
    if (accountStore.accountInfo.cpu_limit) {
      cpuLimit = accountStore.accountInfo.cpu_limit
      loading = false
    } else {
      cpuLimit = {
        'available': 0,
        'used': 0,
        'max': 0,
      }
    }

    // get network usage
    let netLimit = null
    if (accountStore.accountInfo.net_limit) {
      netLimit = accountStore.accountInfo.net_limit
    } else {
      netLimit = {
        'available': 0,
        'used': 0,
        'max': 0,
      }
    }

    // get ram usage
    let ramLimit = null
    if (accountStore.accountInfo.ram_quota) {
      ramLimit = {
        max: accountStore.accountInfo.ram_quota,
        used: accountStore.accountInfo.ram_usage,
        available: accountStore.accountInfo.ram_quota - accountStore.accountInfo.ram_usage,
      }
    } else {
      ramLimit = {
        'available': 0,
        'used': 0,
        'max': 0,
      }
    }

    return (
      <Card
        title={(
          <span>
            <TitleIcon type='info-circle' />
            Total Usage
          </span>
          )}
        type='inner'
        extra={(
          <div>
            <Tooltip title='Update every 5s'>
              <TitleBadge status='processing' />
            </Tooltip>
          </div>
        )}
        loading={loading}
      >
        <UpperDiv>
          <span>CPU</span>
          <Progress
            type='line'
            strokeColor={colors.cpu}
            status='active'
            percent={cpuLimit.used / cpuLimit.max * 100}
            format={text => text.toFixed(2) + ' %'}
          />
          <span>NET</span>
          <Progress
            type='line'
            strokeColor={colors.cpu}
            status='active'
            percent={netLimit.used / netLimit.max * 100}
            format={text => text.toFixed(2) + ' %'}
          />
          <span>RAM</span>
          <Progress
            type='line'
            strokeColor={colors.cpu}
            status='active'
            percent={ramLimit.used / ramLimit.max * 100}
            format={text => text.toFixed(2) + ' %'}
          />
        </UpperDiv>
        <Divider />
        <UpperDiv>
          <Label>CPU</Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>{ bytes(cpuLimit.max, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>{ bytes(cpuLimit.used, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>{ bytes(cpuLimit.available, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <UpperDiv>
          <Label>NET</Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>{ bytes(netLimit.max, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>{ bytes(netLimit.used, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>{ bytes(netLimit.available, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <UpperDiv>
          <Label>RAM </Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>{ bytes(ramLimit.max, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>{ bytes(ramLimit.used, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>{ bytes(ramLimit.available, { unitSeparator: ' ' }) }</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
      </Card>
    )
  }
}

export default TotalUsageCard
