import {
  action,
  observable,
  // runInAction,
  spy,
} from 'mobx'
import {
  isExtension,
} from '../utils/chromeApi'
import {
  // getAccountInfo,
  eos,
} from '../utils/eosJsApi'
import Log from '../utils/debugLog'
import accountInfoFrame from '../data/get_account_info.json'

class AccountStore {
  @observable
  accountList = []

  @observable
  currentAccount = ''

  @observable
  accountInfo = accountInfoFrame

  @observable
  passphrase = ''

  @observable
  status = 'unset'

  @observable
  network = 'OWDIN TestNet'

  @observable
  owdinBalance = 0

  @action
  setAccountList = (data) => {
    this.accountList = data
    this.currentAccount = data[0]
  }

  @action
  setAccountInfo = async (account) => {
    if (account) {
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
    } else {
      Log.warn('MobX::AccountStore::setAccountInfo()', 'Loading account...')
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

  @action
  setOwdinBalance = (balance) => {
    this.owdinBalance = balance
  }

  @action
  checkStatus = () => {
    try {
      if (isExtension()) {
        /* eslint-disable */
        chrome.storage.local.get('status', item => {
          this.setStatus(item.status)
        })
        /* eslint-enable */
      } else {
        this.setStatus(localStorage.getItem('status'))
      }
    } catch (error) {
      Log.error(error)
    }
  }

  @action
  checkNetwork = () => {
    // WIP
  }

  @action
  fetchOwdinBalance = () => {
    eos.getCurrencyBalance('owdinnetwork', this.currentAccount, 'OWDIN')
      .then(result => this.setOwdinBalance(result))
      .catch(error => Log.error(error))
  }

  constructor() {
    Log.info('MobX::AccountStore', 'constructor()')

    setInterval(() => {
      Log.info('MobX::AccountStore::setInterval(5000)', this)
      this.setAccountInfo(this.currentAccount)
      this.checkStatus()
      this.fetchOwdinBalance()
    }, 5000)
  }
}

export const accountStore = new AccountStore()

spy((event) => {
  if (event.type === 'action') {
    // Log.info('MobX::AccountStore::action', `${event.name} with args: ${event.arguments}`)
    // Log.info('MobX::AccountStore::store', accountStore)
  }
})

export default accountStore
