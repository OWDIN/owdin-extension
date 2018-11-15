import React from 'react'
import {
  Form,
  Icon,
  Input,
} from 'antd'
import styled from 'styled-components'

const FormItem = Form.Item

const InputIcon = styled(Icon)`
  color: rgba(0,0,0,.25);
`

class SetPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      account: this.props.account || '',
      publicKey: '',
      privateKey: this.props.privateKey || '',
      accountCheck: '',
      accountHelpMsg: '',
      privateKeyCheck: '',
      privateKeyHelpMsg: '',
    }
  }


  componentDidMount() {
    if (this.state.privateKey.length === 51) {
      this.setState({
        publicKey: 'PUBLIC_KEY_SAMPLE',
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      if (this.state.account.length <= 0) {
        this.setState({
          account: '',
          accountCheck: '',
          accountHelpMsg: '',
        })
      } else if (this.state.account.length > 12) {
        this.setState(prevState => ({
          account: prevState.account,
          accountCheck: 'warning',
          accountHelpMsg: 'It must be 12 characters or lower.',
        }))
      } else {
        this.setState({
          accountHelpMsg: '',
          accountCheck: 'success',
        })
      }

      if (this.state.privateKey.length === 0) {
        this.setState({
          privateKeyCheck: '',
          privateKeyHelpMsg: '',
        })
      } else if (this.state.privateKey.length !== 51) {
        this.setState({
          privateKeyCheck: 'error',
          privateKeyHelpMsg: 'Invalid Private Key.',
        }, () => {
          this.props.setKeyPair(this.state.account, '')
          this.props.allowNext(false)
        })
      } else {
        this.setState({
          privateKeyCheck: 'success',
          privateKeyHelpMsg: 'Confirmed!',
        }, () => {
          this.props.setKeyPair(this.state.account, this.state.privateKey)
          this.props.allowNext(true)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Form>
          <FormItem
            validateStatus={this.state.accountCheck}
            hasFeedback={this.state.account.length > 0}
            help={this.state.accountHelpMsg}
          >
            <Input
              prefix={(
                <InputIcon type='user' />
              )}
              type='text'
              id='account'
              name='account'
              value={this.state.account}
              placeholder='EOS Account'
              onChange={e => this.handleChange(e)}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={(
                <InputIcon type='unlock' />
              )}
              type='text'
              id='publicKey'
              name='publicKey'
              value={this.state.publicKey}
              placeholder='Public Key'
              readOnly
              disabled
            />
          </FormItem>
          <FormItem
            validateStatus={this.state.privateKeyCheck}
            hasFeedback={this.state.privateKey.length > 0}
            help={this.state.privateKeyHelpMsg}
          >
            <Input
              prefix={(
                <InputIcon type='lock' />
              )}
              type='password'
              id='privateKey'
              name='privateKey'
              value={this.state.privateKey}
              placeholder='Private Key'
              onChange={e => this.handleChange(e)}
              autoComplete='false'
            />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default SetPassword
