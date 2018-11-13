import {
  Api,
  JsonRpc,
  // RpcError,
  JsSignatureProvider,
} from 'eosjs'

const privateKey = ''

const rpc = new JsonRpc('https://eos.owdin.network:8888/')
const signatureProvider = new JsSignatureProvider([privateKey])
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
})

export default api
