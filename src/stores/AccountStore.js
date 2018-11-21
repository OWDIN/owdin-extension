import {
  action,
  observable,
  // runInAction,
  spy,
} from 'mobx'
import {
  // getAccountInfo,
  eos,
} from '../utils/eosJsApi'
import Log from '../utils/debugLog'

class AccountStore {
  @observable
  accountList = []

  @observable
  currentAccount = ''

  @observable
  accountInfo = {}

  @observable
  passphrase = ''

  @observable
  status = 'unset'

  @observable
  network = 'OWDIN TestNet'

  @action
  setAccountList = (data) => {
    this.accountList = data
    this.currentAccount = data[0]
  }

  @action
  setAccountInfo = async (account) => {
    try {
      await eos.getAccount(account, (error, result) => {
        this.accountInfo = result
        if (error) {
          Log.error('eos.getAccount()', error)
        }
      })
    } catch (error) {
      Log.error('setAccountInfo()', error)
    }
  }

  @action
  setPassphrase = (data) => {
    this.passphrase = data
  }

  @action
  setStatus = (data) => {
    this.status = data
  }

  @action
  setNetwork = (text) => {
    this.network = text
  }

  constructor() {
    setInterval(() => {
      Log.info('MobX::AccountStore', 'setInterval(setAccountInfo(), 5000)')
      this.setAccountInfo(this.currentAccount)
    }, 5000)
  }
}

export const accountStore = new AccountStore()

spy((event) => {
  if (event.type === 'action') {
    Log.info('MobX::AccountStore', `${event.name} with args: ${event.arguments}`)
    Log.info('MobX::AccountStore', accountStore)
  }
})

export default accountStore
