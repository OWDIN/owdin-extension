import React from 'react'
import {
  Steps,
  Button,
  message,
} from 'antd'
import styled from 'styled-components'
import {
  Img,
  H1,
} from 'glamorous'
import {
  isExtension,
  isTabExist,
  newWindow,
} from '../utils/chromeApi'
import SetPasswordForm from '../components/SetPasswordForm'
import AppIcon from '../assets/img/owdin-bi-color.svg'

const WrapperDiv = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`

const TitleDiv = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ContentDiv = styled.div`
  width: 100%;
  margin-top: 20px;
`
const StepButtonDiv = styled.div`
  bottom: 0;
  right: 0;
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: right;
  width: 100%;
`

const Step = Steps.Step;
const steps = [{
  title: 'Create Password',
  description: 'Set up your password for extension',
  content: <SetPasswordForm />,
}, {
  title: 'Import Account',
  description: 'Store your account securely',
  content: 'Second-content',
}, {
  title: 'Agreement',
  description: 'Term of Use',
  content: 'Last-content',
}]

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  togglePopupWindow = () => {
    window.open(window.location.href, 'OWDIN Wallet', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=380,height=800')
  }

  toggleNext = () => {
    this.setState(prevState => ({
      current: prevState.current + 1,
    }))
  }

  togglePrev = () => {
    this.setState(prevState => ({
      current: prevState.current - 1,
    }))
  }

  render() {
    if (isExtension() && !isTabExist()) {
      newWindow()
    }

    const { current } = this.state;
    return (
      <WrapperDiv>
        <TitleDiv>
          <Img
            src={AppIcon}
            alt='OWDIN Wallet Icon'
            width='52px'
            height='52px'
          />
          <H1>Set up your wallet</H1>
          <span id='open-popup' role='presentation' onClick={() => this.togglePopupWindow()}>
            {/* <a id='open-newtab' href={window.location.href} target='_blank' rel='noopener noreferrer'> */}
            <span>Open in a new Popup Window</span>
            {/* </a> */}
          </span>
        </TitleDiv>
        <Steps
          direction='vertical'
          current={current}
        >
          {
            steps.map(item => (
              <Step key={item.title} title={item.title} description={item.description} />
            ))
          }
        </Steps>
        <ContentDiv>
          {steps[current].content}
        </ContentDiv>
        <StepButtonDiv>
          {
            current > 0
            && (
            <Button style={{ marginRight: 20 }} onClick={() => this.togglePrev()}>
              Previous
            </Button>
            )
          }
          {
            current < steps.length - 1
            && <Button type='primary' onClick={() => this.toggleNext()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type='primary' onClick={() => message.success('Processing complete!')}>Done</Button>
          }
        </StepButtonDiv>
      </WrapperDiv>
    )
  }
}

export default Setup
