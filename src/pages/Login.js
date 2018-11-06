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
import AppIcon from '../assets/img/owdin-bi-color.svg'

const FormItem = Form.Item

export default class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      address: '',
      privateKey: '',
      isLogin: false,
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('address', this.state.address)
    localStorage.setItem('privateKey', this.state.privateKey)

    this.setState({
      address: '',
      privateKey: '',
      isLogin: true,
    })

    // setTimeout(1000, () => window.location.replace('/'))
    // setTimeout(1000, () => { window.location.href = '/' })
    // setTimeout(100, () => this.props.history.push('/'))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    if (localStorage.getItem('address') !== null && localStorage.getItem('privateKey') !== null && this.state.isLogin === true) {
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
          align-items='center'
          flex-direction='column'
        >
          <Img
            src={AppIcon}
            alt='Addit App Icon'
            width='52px'
            height='52px'
          />
          <H1
            marginTop='10px'
          >
            OWDIN Extension
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
                id='address'
                name='address'
                type='text'
                value={this.state.address}
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='EOS Account'
                onChange={e => this.handleChange(e)}
              />
            </FormItem>
            <FormItem>
              <Input
                id='privateKey'
                name='privateKey'
                type='password'
                value={this.state.privateKey}
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Private Key'
                onChange={e => this.handleChange(e)}
              />
            </FormItem>
            <FormItem
              style={{
                textAlign: 'center',
              }}
            >
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Log in
              </Button>
              <span style={{ marginLeft: '10px' }}>
                or <a href='https://eos.io' target='_blank' rel='noopener noreferrer'>Create New EOS Account</a>
              </span>
            </FormItem>
          </Form>
        </Div>
      </Div>
    )
  }
}
