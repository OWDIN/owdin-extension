import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Button,
  Card,
  Divider,
  Form,
  Icon,
  Input,
  message,
} from 'antd'
import styled from 'styled-components'

const FormItem = Form.Item

const TitleIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
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
const SubDiv = styled.div`
  line-height: 0.8;
`
const SubLabel = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 1rem;
  margin-right: 1rem;
  display: inline;
`
const SubData = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
  line-height: 0.8;
  color: black;
`

@inject('accountStore')
@observer
class TokenTransfer extends React.Component {
  constructor(props) {
    super(props)

    this.accountStore = this.props.accountStore

    this.state = {
      recipient: '',
      amount: '',
      memo: '',
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      recipient: '',
      amount: '',
      memo: '',
    })

    message.info('Transfer Confirmed!')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { accountStore } = this.props

    return (
      <Card
        title={(
          <span>
            <TitleIcon type='wallet' />
            Transfer
          </span>
          )}
        type='inner'
      >
        <UpperDiv>
          <Label>Balance</Label>
          <Data>
            <SubDiv>
              <SubLabel>EOS</SubLabel>
              <SubData>
                { accountStore.accountInfo.core_liquid_balance }
              </SubData>
            </SubDiv>
            <SubDiv>
              <SubLabel>OWDIN</SubLabel>
              <SubData>
                { accountStore.owdinBalance }
              </SubData>
            </SubDiv>
          </Data>
        </UpperDiv>
        <Divider />
        <UpperDiv>
          <Label>Transfer</Label>
          <Data>
            <Form
              onSubmit={this.onSubmit}
              style={{
                width: '280px',
                margin: '0 auto',
                marginTop: '40px',
              }}
            >
              <FormItem>
                <Input
                  id='recipient'
                  name='recipient'
                  type='text'
                  value={this.state.recipient}
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Recipient (Account)'
                  onChange={e => this.handleChange(e)}
                />
              </FormItem>
              <FormItem>
                <Input
                  id='amount'
                  name='amount'
                  type='text'
                  value={this.state.amount}
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Amount'
                  onChange={e => this.handleChange(e)}
                />
              </FormItem>
              <FormItem>
                <Input
                  id='memo'
                  name='memo'
                  type='text'
                  value={this.state.memo}
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Memo (Optional)'
                  onChange={e => this.handleChange(e)}
                />
              </FormItem>
              <FormItem
                style={{
                  textAlign: 'center',
                }}
              >
                <Button type='primary' htmlType='submit'>
                  Send
                </Button>
              </FormItem>
            </Form>
          </Data>
        </UpperDiv>
      </Card>
    )
  }
}
TokenTransfer.defaultProps = {
  loading: true,
};

export default TokenTransfer
