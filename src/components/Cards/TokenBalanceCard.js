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
  Tooltip,
} from 'antd'
import styled from 'styled-components'

const TitleIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`
const TitleBadge = styled(Badge)`
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: inherit;
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

@inject('accountStore')
@observer
class TokenBalance extends React.Component {
  render() {
    const { accountStore } = this.props

    return (
      <Card
        title={(
          <span>
            <TitleIcon type='wallet' />
            Token Balance
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
        loading={false}
      >
        <UpperDiv>
          <Label>EOS</Label>
          <Data>
            { accountStore.accountInfo.core_liquid_balance }
          </Data>
        </UpperDiv>
        <Divider />
        <UpperDiv>
          <Label>OWDIN</Label>
          <Data>
            10000 OWDIN
          </Data>
        </UpperDiv>
      </Card>
    )
  }
}
TokenBalance.defaultProps = {
  loading: true,
};

export default TokenBalance
