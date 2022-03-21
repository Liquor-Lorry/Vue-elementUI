module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  }
  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   //添加自定义规则
  //   'prettier/prettier': [
  //     //eslint校验不成功后，error或2报错，warn或1则警告，off或0则无提示
  //     'error',
  //     {
  //       //是否以分号结尾
  //       semi: false,
  //       //单引号代替双引号
  //       singleQuote: true,
  //       //换行
  //       printWidth: 120
  //     }
  //   ]
  // }
};
