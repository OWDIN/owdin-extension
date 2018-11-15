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
  authenticate: {
    passphrase: 'sample-string',
  },
  status: 'online', // online, offline, locked, unset
}

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
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('status', result => {
        return result
      })
      /* eslint-enable */
    } catch (error) {
      throw error
    }
  }

  // for test
  return localStorage.getItem('status') || 'unset'
}

export function setStatus(status) {
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.set({
        status,
      })
      /* eslint-enable */
    } catch (error) {
      throw error
    }
  }

  // for test
  localStorage.setItem('status', status)
}

export function setPassphrase(passphrase) {
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.set({
        authenticate: {
          passphrase,
        },
      })
      /* eslint-enable */
    } catch (error) {
      throw error
    }
  } else {
    localStorage.setItem('passphrase', passphrase)
  }
}

export function getPassphrase() {
  try {
    /* eslint-disable */
    if (isExtension()) {
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
    if (isExtension()) {
      /* eslint-disable */
      chrome.storage.local.get('authenticate', items => {
        if (items.passphrase === passphrase) {
          setStatus('online')
          return true
        }
      })
      /* eslint-enable */
    }
  } catch (error) {
    console.log(error)
  }

  if (localStorage.getItem('passphrase') === passphrase) {
    setStatus('online')
    return true
  }

  return false
}

export function getKeyPairs() {
  let pairs = []
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
        pairs = items
      })
      return pairs
      /* eslint-enable */
    } catch (error) {
      console.log(error)
    }
  } else {
    return localStorage.getItem('keyPairs')
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
  if (isExtension()) {
    try {
      /* eslint-disable */
      chrome.storage.local.get('keyPairs', items => {
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
      console.log(error)
    }
  } else {
    localStorage.setItem('keyPairs', JSON.stringify({ [accountName]: privateKeys }))
  }
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
