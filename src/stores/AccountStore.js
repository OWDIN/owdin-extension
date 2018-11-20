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
  accountInfo = {}

  @observable
  passphrase = ''

  @observable
  status = 'unset'

  @action
  setAccountList = (data) => {
    this.accountList = data
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
}

spy((event) => {
  if (event.type === 'action') {
    Log.info('MobX::AccountStore', `${event.name} with args: ${event.arguments}`)
  }
})

export const accountStore = new AccountStore()

export default accountStore
