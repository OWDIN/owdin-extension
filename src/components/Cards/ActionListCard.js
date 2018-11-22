import React from 'react'
import { observable } from 'mobx'
import {
  inject,
  observer,
} from 'mobx-react'
import {
  Badge,
  Card,
  Collapse,
  Icon,
  Tag,
  Tooltip,
} from 'antd'
import styled from 'styled-components'
import {
  eos,
} from '../../utils/eosJsApi'
import Log from '../../utils/debugLog'

const actionContracts = [
  'eosio.token',
  'owdinnetwork',
]
const Panel = Collapse.Panel

// Customized Style
const TitleIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`
const TitleMeta = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`
const TitleBadge = styled(Badge)`
  margin-left: 8px;
  margin-right: 8px;
  vertical-align: inherit;
`
const CustomPanel = styled(Panel)`
  background: #f7f7f7;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 0 !important;
  overflow: hidden;
`

@inject('accountStore')
@observer
class ActionListCard extends React.Component {
  @observable actionData = ''
  @observable actionList = []
  @observable start = 0
  @observable end = 5
  @observable loading = true

  constructor(props) {
    super(props)

    this.fetch = this.fetchActionList()
  }

  componentWillUnmount() {
    clearInterval(this.fetch)
  }

  fetchActionList = () => {
    this.fetch = setInterval(() => {
      eos.getActions(this.props.accountStore.currentAccount, this.start, this.end, (error, resp) => {
        if (error) {
          Log.error('ActionList::fetchActionList()', error)
        } else {
          this.actionData = resp

          const refinedActions = resp.actions.map((action) => {
            if (actionContracts.includes(action.action_trace.act.account) && action.action_trace.act.name === 'transfer') {
              let StatusTag = <Tag color='yellow'>Pending</Tag>

              if (action.block_num < resp.last_irreversible_block) {
                StatusTag = <Tag color='blue'>Approved</Tag>
              }

              return (
                <CustomPanel
                  header={(
                    <div>
                      <span>{action.action_trace.act.data.from}</span>
                      <TitleIcon type='arrow-right' />
                      <span>{action.action_trace.act.data.to}</span>
                      <div>
                        {action.action_trace.act.data.quantity}
                      </div>
                      <div>
                        {StatusTag}
                      </div>
                    </div>
                  )}
                  showArrow={false}
                  key={action.global_action_seqm}
                >
                  <div>block_time:{action.block_time}</div>
                  <div>block_num:{action.block_num}</div>
                  <div>global_action_seq:{action.global_action_seq}</div>
                  <div>from:{action.action_trace.act.data.from}</div>
                  <div>to:{action.action_trace.act.data.to}</div>
                  <div>quantity:{action.action_trace.act.data.quantity}</div>
                  <div>memo:{action.action_trace.act.data.memo}</div>
                  <div>hexdata:{action.action_trace.act.hex_data}</div>
                  <div>trx_id:{action.action_trace.trx_id}</div>
                </CustomPanel>
              )
            }

            return ''
          })

          this.actionList = refinedActions
          this.loading = false
        }
      })
    }, 5000)
  }

  render() {
    return (
      <Card
        title={(
          <span>
            <TitleIcon type='bars' />
            Transfer History
          </span>
          )}
        extra={(
          <div>
            {
              this.actionList.length !== 0 ? (
                <TitleMeta>
                  Finality : {this.actionData.last_irreversible_block}
                </TitleMeta>
              ) : ''
            }
            <Tooltip title='Update latest 5 actions every 5s'>
              <TitleBadge
                status='processing'
              />
            </Tooltip>
          </div>
        )}
        type='inner'
        loading={this.loading}
      >
        {/* {JSON.stringify(this.actionList)} */}
        <Collapse
          bordered={false}
        >
          {this.actionList}
        </Collapse>
      </Card>
    )
  }
}

export default ActionListCard
