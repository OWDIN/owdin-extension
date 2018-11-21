import React from 'react'
import {
  Badge,
  Card,
  Divider,
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

const TitleLink = styled.a`
  margin-left: 8px;
`

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

class CardTemplate extends React.Component {
  render() {
    return (
      <Card
        title='Total Usage'
        type='inner'
        extra={(
          <div>
            <Tooltip title='Update every 5s'>
              <TitleBadge status='processing' />
            </Tooltip>
          </div>
        )}
      >
        <UpperDiv>
          <span>CPU</span><Progress type='line' percent={20} strokeColor={colors.cpu} status='active' format={() => '123'} />
          <span>NET</span><Progress type='line' percent={40} strokeColor={colors.net} status='active' format={() => '123'} />
          <span>RAM</span><Progress type='line' percent={80} strokeColor={colors.ram} status='active' format={() => '123'} />
        </UpperDiv>
        <Divider />
        <UpperDiv>
          <Label>CPU </Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <UpperDiv>
          <Label>NET </Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <UpperDiv>
          <Label>RAN </Label>
          <Data>
            <SubDiv>
              <SubLabel>Quota</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Available</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>Used</SubLabel>
              <SubData>123 MB</SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <div>
          Bottom div
        </div>
      </Card>
    )
  }
}

export default CardTemplate
