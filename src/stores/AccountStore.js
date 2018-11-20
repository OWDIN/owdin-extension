import {
  action,
  observable,
  runInAction,
} from 'mobx'
import {
  // getAccountInfo,
  eos,
} from '../utils/eosJsApi'

class AccountStore {
  @observable
  accountList = []

  @observable
  accountInfo = {}

  @observable
  passphrase = ''

  @observable
  status = 'unset'

  @action('set account list belong to public key')
  setAccountList = (data) => {
    this.accountList = data
  }

  @action('set account information')
  setAccountInfo = async (account) => {
    try {
      // const resp = await eos.getAccount(account)
      await eos.getAccount(account, (error, result) => {
        console.log('callback', error, result)
        this.accountInfo = result
      })

      runInAction('Update Account Info', () => {
        // this.accountInfo = resp
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action('set passphrase')
  setPassphrase = (data) => {
    this.passphrase = data
  }

  @action('set state')
  setStatus = (data) => {
    this.status = data
  }
}

export const accountStore = new AccountStore()

export default accountStore
