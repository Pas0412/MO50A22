const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //website logo
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'views':'@/views',
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
      ]
    },
    devServer: {
      proxy: 'http://'+'server.cklovery.life',//resolve the cross-domain problem
      historyApiFallback: true,
      allowedHosts: "all",
    },
  },
})
