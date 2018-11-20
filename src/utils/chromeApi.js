/* global chrome */
/**
 * Chrome API Wrapper
 */
import { accountStore } from '../stores/AccountStore'

export const sample = {
  version: '0.0.x',
  keyPairs: {
    accountname1: [
      '5JCJxqB6********',
    ],
    accountname2: [
      '5JCJxqB6********',
      '5KsfkDq1********',
    ],
  },
  authenticate: {
    passphrase: 'sample-string',
  },
  status: 'online', // online, offline, locked, unset
}

// TODO: Use Mobx Store
let _storageData = null

export function version() {
  try {
    /* eslint-disable */
    chrome.storage.local.set({
      version: '0.0.1',
      debug: true,
    });
    /* eslint-enable */
  } catch (error) {
    localStorage.setItem('version', '0.0.1')
    localStorage.setItem('debug', true)
  }
}

export function isExtension() {
  try {
    if (typeof chrome.storage === 'object') {
      return true
    }
  } catch (error) {
    console.log(error)
  }

  return false
}

export function getStatus() {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.get('status', item => {
        if (item.status !== accountStore.status && JSON.stringify(item) !== '{}') {
          accountStore.setStatus(item.status)
        }
      })
      /* eslint-enable */
    } else {
      return localStorage.getItem('status') || 'unset'
    }
  } catch (error) {
    throw error
  }

  // for test
  return accountStore.status
}

export function setStatus(status) {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.set({
        status,
      })
      /* eslint-enable */
    } else {
      // for test
      localStorage.setItem('status', status)
    }
  } catch (error) {
    throw error
  }

  accountStore.setStatus(status)
}

export function setPassphrase(passphrase) {
  try {
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.set({
        authenticate: {
          passphrase,
        },
      })
      /* eslint-enable */
    } else {
      localStorage.setItem('passphrase', passphrase)
    }
  } catch (error) {
    throw error
  }
}

export function getPassphrase() {
  try {
    /* eslint-disable */
    if (isExtension()) {
      chrome.storage.local.get('authenticate', items => {
        accountStore.setPassphrase(items.authenticate.passphrase)
      })
    } else {
      accountStore.setPassphrase(localStorage.getItem('passphrase'))
    }
    /* eslint-enable */
  } catch (error) {
    console.log(error)
  }

  return accountStore.passphrase
}

export function isValidPassphrase(passphrase) {
  const storePassphrase = getPassphrase()
  if (storePassphrase === passphrase) {
    return true
  }
  console.log(storePassphrase, passphrase)

  return false
}

/**
 * TODO: Wrapping up for Multiple Browser Storage
 * Get browser storage data
 */
async function _getStorageValue(item = null) {
  const local = chrome.storage.local

  local.get([item], (result) => {
    _storageData = result[item]
  })
  await _storageData

  return _storageData
}

export async function getKeyPairs() {
  try {
    if (isExtension()) {
      _getStorageValue('keyPairs')
    } else {
      return JSON.parse(localStorage.getItem('keyPairs'))
    }
  } catch (error) {
    console.log(error)
  }

  return _storageData
}

/**
 * Set account and private keys
 *
 * @param {string} accountName
 * @param {array} privateKeys
 */
// TODO: Encrypt Key Pairs
export function setKeyPairs(accountName, privateKeys) {
  let pairs = []
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
        pairs = items.keyPairs
      })

      pairs = {
        ...pairs,
        [accountName]: privateKeys
      }

      chrome.storage.local.set({
        keyPairs: pairs,
      })
      /* eslint-enable */
    } catch (error) {
      console.log(error)
    }
  } else {
    localStorage.setItem('keyPairs', JSON.stringify({ [accountName]: privateKeys }))
  }
}

export function getAccountList() {
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
        accountStore.setAccountList(Object.keys(items.keyPairs))
      })
      /* eslint-enable */
    } catch (error) {
      console.log(error)
      return false
    }
  } else {
    // for test
    accountStore.setAccountList(Object.keys(JSON.parse(localStorage.getItem('keyPairs'))))
  }

  return accountStore.accountList
}

export function isLoggedIn() {
  if (['online', 'offline'].includes(getStatus())) {
    return true
  }

  return false
}

export function isTabExist() {
  // wip
  return true
}

export function newWindow() {
  window.open(window.location.href, 'OWDIN Wallet', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=380,height=800')
}

export default version
