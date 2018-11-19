/* eslint-disable */
const path = require('path')
const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')
// const rewireMobX = require('react-app-rewire-mobx')  // NOTE: old way; see https://github.com/timarney/react-app-rewired/issues/332#issuecomment-436229891

module.exports = function override(config, env) {
  // config = injectBabelPlugin('transform-decorators-legacy', config)  // NOTE: old way
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { legacy:true }], config)
  config = injectBabelPlugin(['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }],
    config,
  )

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      // '@primary-color': 'black',
    },
    javascriptEnabled: true,
  })(config, env)

  // config = rewireMobX(config, env)
  return config
}
