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
  // httpEndpoint: 'https://api.eosnewyork.io',  // default, null for cold-storage
  // httpEndpoint: 'https://eos.owdin.network:8888',
  httpEndpoint: 'https://eos-kr.owdin.network:8888',
  verbose: false, // API logging
  // logger: { // Default logging functions
  //   log: config.verbose ? console.log : null,
  //   error: config.verbose ? console.error : null,
  // },
  fetchConfiguration: {},
}
export const eos = EosApi(eosOption)

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
  }).catch((error) => {
    console.log('ERR::eosJsApi::getAccountByPrivKey()', error)
  })

  return result
}

// export function getAccountInfo(account) {
//   let data = ''

//   try {
//     eos.getAccount(account).then((resp) => {
//       data = resp
//     })
//   } catch (error) {
//     console.log(error)
//   }

//   console.log('LOG::eosJsApi::getAccountInfo()', data)
//   return data
// }

export default eos
