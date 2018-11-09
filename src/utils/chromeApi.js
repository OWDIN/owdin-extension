/* global chrome */
/**
 * Chrome API Specification
 */


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
}

export function version() {
  try {
    /* eslint-disable */
    chrome.storage.local.set({
      version: '0.0.1',
    });
    /* eslint-enable */
  } catch (error) {
    localStorage.setItem('version', '0.0.1')
  }
}

export function isExtension() {
  if (typeof chrome.storage === 'object') {
    return true
  }

  return false
}

export function setPassphrase(passphrase) {
  try {
    /* eslint-disable */
    chrome.storage.local.set({
      authenticate: {
        passphrase,
      },
    })
    /* eslint-enable */
  } catch (error) {
    localStorage.setItem('passphrase', passphrase)
    console.log(error)
  }
}

export function getPassphrase() {
  try {
    /* eslint-disable */
    if (this.isExtension()) {
      chrome.storage.local.get('authenticate', items => {
        return items.passphrase
      })
    } else {
      return localStorage.getItem('passphrase')
    }
    /* eslint-enable */
  } catch (error) {
    // console.log(error)
  }

  return false
}

export function isValidPassphrase(passphrase) {
  try {
    if (this.isExtension()) {
      /* eslint-disable */
      chrome.storage.local.get('authenticate', items => {
        if (items.passphrase === passphrase) {
          return true
        }
      })
      /* eslint-enable */
    }
  } catch (error) {
    // console.log(this, error)
    if (localStorage.getItem('passphrase') === passphrase) {
      return true
    }
  }

  return false
}

/**
 * set account and private keys
 *
 * @param {string} accountName
 * @param {array} privateKeys
 */
// NOTE: MUST BE IMPROVE
export function setKeyPairs(accountName, privateKeys) {
  let pairs = []
  try {
    /* eslint-disable */
    chrome.storage.local.get('KeyPairs', items => {
      pairs = items
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
    localStorage.setItem('accountName', accountName)
    localStorage.setItem(accountName, privateKeys)
    console.log(error)
  }
}

export function isLoggedIn() {
  if (getPassphrase() !== false) {
    return true
  }

  // for local test only
  if (localStorage.getItem('passphrase') !== null) {
    return true
  }

  return false
}

export default version
