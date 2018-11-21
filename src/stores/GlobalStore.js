import {
  action,
  observable,
  spy,
} from 'mobx'
// import {
//   eos,
// } from '../utils/eosJsApi'
import Log from '../utils/debugLog'

class GlobalStore {
  @observable
  network = 'OWDIN TestNet'

  @observable
  status = 'unset'

  @observable
  passphrase = ''

  @action
  setNetwork = (text) => {
    this.network = text
  }

  @action
  checkStatus = () => {
    Log.info('MobX::GlobalStore', 'getStatus()')
  }

  @action
  setStatus = (data) => {
    this.status = data
  }

  @action
  setPassphrase = (data) => {
    this.passphrase = data
  }

  constructor() {
    setInterval(() => {
      this.getStatus()
      Log.info('getStatus()', 'setInterval()')
    }, 1000)
  }
}

export const globalStore = new GlobalStore()

spy((event) => {
  if (event.type === 'action') {
    Log.info('MobX::GlobalStore', `${event.name} with args: ${event.arguments}`)
    Log.info('MobX::GlobalStore', globalStore)
  }
})

export default globalStore
