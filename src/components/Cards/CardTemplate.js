import React from 'react'
import {
  Badge,
  Card,
  Icon,
  Progress,
  Tooltip,
} from 'antd'
import styled from 'styled-components'

const colors = {
  'primary': '#1890ff',
  'success': '#52c41a',
  'warning': '#fadb14',
  'error': '#f5222d',
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

const TitleLink = styled.a`
  margin-left: 8px;
`

const UpperDiv = styled.div`
  margin-bottom: 1rem;
`
const Label = styled.span`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 1rem;
  display: block;
`
const Data = styled.span`
  font-size: 1.8rem;
  font-weight: normal;
  color: black;
`

class CardTemplate extends React.Component {
  render() {
    return (
      <Card
        title='Card title'
        type='inner'
        extra={(
          <div>
            <TitleIcon type='sync' spin />
            <TitleBadge status='processing' text='Syncing' />
            <Tooltip title='Tooltip Text'>
              <TitleLink href='#more'>More</TitleLink>
            </Tooltip>
          </div>
        )}
      >
        <UpperDiv>
          <Label>Label</Label>
          <Data>Data Here</Data>
        </UpperDiv>
        <UpperDiv>
          <Progress type='line' percent={20} strokeColor={colors.primary} format={() => 'CPU'} />
          <Progress type='line' percent={40} strokeColor={colors.warning} format={() => 'NET'} />
          <Progress type='line' percent={80} strokeColor={colors.error} format={() => 'RAM'} />
          <Progress type='circle' percent={90} format={() => 'Custom Text'} />
          <Progress type='dashboard' percent={90} format={() => 'Custom Text'} />
        </UpperDiv>
        <div>
          Bottom div
        </div>
      </Card>
    )
  }
}

export default CardTemplate
