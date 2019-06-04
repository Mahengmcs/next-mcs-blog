/*
 * @Description: 
 * @Author: edison
 * @Date: 2019-01-15 16:18:12
 * @LastEditors: edison
 * @LastEditTime: 2019-01-25 16:38:47
 */


// /* eslint-disable */
// const withCss = require('@zeit/next-css')

// // fix: prevents error when .css files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.css'] = file => {}
// }

// module.exports = withCss()

const withLess = require('@zeit/next-less')
module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    }
  })

