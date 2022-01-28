const path = require('path')
const resolve = dir => path.join(__dirname, dir)


module.exports = {
  publicPath: './',
  outputDir: 'dist',
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("layout", resolve("src/layout"))
        .set("router", resolve("src/router"))
        .set("store", resolve("src/store"))
        .set("utils", resolve("src/utils"))
        .set("views", resolve("src/views"));
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()

    config
        .when(process.env.NODE_ENV !== 'development',
            config => {
              config
                  .plugin('ScriptExtHtmlWebpackPlugin')
                  .after('html')
                  .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /runtime\..*\.js$/
                  }])
                  .end()
              config
                  .optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                  },
                  elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
              // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
              config.optimization.runtimeChunk('single')
            }
        )
  }
}
