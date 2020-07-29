module.exports = {
  devServer: {
    port: 3333,
    open: true
  },
  //配置_variable.scss
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
