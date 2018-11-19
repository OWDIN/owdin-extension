import {
  action,
  observable,
} from 'mobx'

class AccountInfoStore {
  @observable
  accountList = []

  @observable
  accountInfo = null

  @observable
  passphrase = null

  @observable
  status = 'unset'

  @action
  setAccountList = (accountList) => {
    this.accountList = accountList
  }

  @action
  setAccountInfo = (accountInfo) => {
    this.accountInfo = accountInfo
  }

  @action
  setPassphrase = (passphrase) => {
    this.passphrase = passphrase
  }
}

export default AccountInfoStore
