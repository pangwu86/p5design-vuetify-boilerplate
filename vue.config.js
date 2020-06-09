const webpack = require("webpack");
const compressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["html", "js", "css"];
const isProduction = process.env.NODE_ENV === "production";
const useAnalyzer = true;
const useImgCompress = true;
const useGZip = false;
const useCDN = false;
const confCDN = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    echarts: "echarts",
    moment: "moment"
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@3.3.2/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js",
    "//cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js",
    "//cdn.jsdelivr.net/npm/moment@2.26.0/moment.min.js",
    "//cdn.jsdelivr.net/npm/moment@2.26.0/locale/zh-cn.min.js"
  ]
};

module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true, //是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, //不在production环境使用SourceMap
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  publicPath: isProduction ? "/" : "/", // 打包后引用的资源路径
  outputDir: "dist", // 打包目录
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 解决moment打包过大的问题，只引用中文
    config.plugin("ignore").use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(zh-cn)$/));
    // 生产环境打包分析体积
    if (isProduction && useAnalyzer) {
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    // 使用CDN
    if (useCDN) {
      // ============注入cdn start============
      config.plugin("html").tap(args => {
        // 生产环境或本地需要cdn时，才注入cdn
        if (isProduction || useCDN) args[0].cdn = confCDN;
        return args;
      });
      // ============注入cdn start============
    }
  },
  configureWebpack: config => {
    // 准备gzip文件
    if (useGZip) {
      // 生产环境
      config.plugins.push(
        new compressionWebpackPlugin({
          filename: "[path].gz[query]", // 提示compression-webpack-plugin@3.0.0的话asset改为filename
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
    }
    // CDN
    if (useCDN) {
      // 用cdn方式引入，则构建时要忽略相关资源
      if (isProduction || useCDN) config.externals = confCDN.externals;
    }
  },
  devServer: {
    //跨域
    port: 8080, // 端口号
    open: false, //配置自动启动浏览器,
    proxy: {
      "^/api": {
        target: "https://anju.vue2.cn/",
        changeOrigin: true
      }
    }
  }
};
