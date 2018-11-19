// import {
//   Api,
//   JsonRpc,
//   // RpcError,
//   JsSignatureProvider,
// } from 'eosjs'
import EosApi from 'eosjs-api'
import ecc from 'eosjs-ecc'

// const defaultPrivKey = ''
const eosOption = {
  // https://api.eosnewyork.io/v1/chain/get_info
  // httpEndpoint: 'https://api.eosnewyork.io',
  httpEndpoint: 'https://eos-kr.owdin.network:8888', // default, null for cold-storage
  // verbose: true, // API logging
  verbose: false, // API logging
  // logger: { // Default logging functions
  //   log: config.verbose ? console.log : null,
  //   error: config.verbose ? console.error : null,
  // },
  fetchConfiguration: {},
}
const eos = EosApi(eosOption)

// const rpc = new JsonRpc('https://eos.owdin.network:8888')
// const signatureProvider = new JsSignatureProvider([defaultPrivKey])
// const api = new Api({
//   rpc,
//   signatureProvider,
//   textDecoder: new TextDecoder(),
//   textEncoder: new TextEncoder(),
// })

export function privToPub(privateKey) {
  try {
    const pubKey = ecc.privateToPublic(privateKey)
    return pubKey
  } catch (error) {
    console.log(error)
  }

  return false
}

export async function getAccountsByPubKey(publicKey) {
  let result = false

  await eos.getKeyAccounts(publicKey).then((resp) => {
    result = resp.account_names
    return result
  }).catch((error) => {
    console.log('ERR::getAccountByPrivKey()', error)
  })

  return result
}

export async function getAccountInfo(account) {
  let result = false

  try {
    result = await eos.getAccount(account).then((resp) => {
      result = resp
    }).catch((error) => {
      console.log('ERR::getAccountInfo()', error)
    })
  } catch (error) {
    console.log('ERR::getAccountInfo()', error)
  }

  return result
}

export default privToPub
