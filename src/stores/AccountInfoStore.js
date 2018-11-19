import {
  action,
  observable,
  runInAction,
} from 'mobx'
import {
  // getAccountInfo,
  eos,
} from '../utils/eosJsApi'

class AccountInfoStore {
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
    // const accountInfo = await getAccountInfo(account)

    let data = 'zzzz'
    try {
      await eos.getAccount(account, (resp) => {
        data = resp
      })
    } catch (error) {
      console.log(error)
    }

    runInAction('Update Account Info', () => {
      this.accountInfo = data
    })
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

export const accountInfoStore = new AccountInfoStore()

export default accountInfoStore
