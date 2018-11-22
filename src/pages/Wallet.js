import React from 'react'
import {
  Col,
  Row,
} from 'antd'
import styled from 'styled-components'
import TokenBalanceCard from '../components/Cards/TokenBalanceCard'
import TokenTransferCard from '../components/Cards/TokenTransferCard'

const FlexRow = styled(Row)`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  @media (max-width: 700px) {
    max-width: 100%;
    margin: 0 auto !important;
  }
`
const FlexCol = styled(Col)`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;

  @media (max-width: 700px) {
    max-width: 100%;
    padding: 0 !important;
  }
`

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <FlexRow
          gutter={16}
          type='flex'
          justify='center'
        >
          <FlexCol>
            <TokenBalanceCard />
          </FlexCol>
          <FlexCol>
            <TokenTransferCard />
          </FlexCol>
        </FlexRow>
      </div>
    )
  }
}

export default Dashboard