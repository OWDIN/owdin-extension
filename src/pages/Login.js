import React from 'react'
import {
  Button,
  Form,
  Icon,
  Input,
} from 'antd'
import {
  Div,
  H1,
  Img,
} from 'glamorous'
import {
  version,
  isLoggedIn,
  isValidPassphrase,
} from '../utils/chromeApi'
import AppIcon from '../assets/img/owdin-bi-color.svg'

const FormItem = Form.Item

export default class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      passphrase: '',
    }
  }

  onSubmit = (event) => {
    event.preventDefault()

    version()
    if (isValidPassphrase(this.state.passphrase)) {
      window.location.replace('/index.html')
    }

    this.setState({
      passphrase: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    if (isLoggedIn() === true) {
      window.location.replace('/index.html')
    }

    return (
      <Div
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Div
          width='100%'
          display='flex'
          alignItems='center'
          flexDirection='column'
        >
          <Img
            src={AppIcon}
            alt='OWDIN Wallet Icon'
            width='52px'
            height='52px'
          />
          <H1
            marginTop='10px'
          >
            OWDIN Wallet
          </H1>
        </Div>
        <Div>
          <Form
            onSubmit={this.onSubmit}
            // onClick={this.handleLogin}
            style={{
              width: '280px',
              margin: '0 auto',
              marginTop: '40px',
            }}
          >
            <FormItem>
              <Input
                id='passphrase'
                name='passphrase'
                type='password'
                value={this.state.passphrase}
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Passphrase'
                onChange={e => this.handleChange(e)}
              />
            </FormItem>
            <FormItem
              style={{
                textAlign: 'center',
              }}
            >
              <Button type='primary' htmlType='submit'>
                Unlock
              </Button>
              <div>
                <a href='https://eos.io' target='_blank' rel='noopener noreferrer'>Restore your accout</a>
              </div>
            </FormItem>
          </Form>
        </Div>
      </Div>
    )
  }
}
