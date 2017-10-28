// https://eslint.org/docs/user-guide/configuring

module.exports = {
  // 此项是用来告诉eslint找当前配置文件，不能往父级查找
  root: true,
  // 指定解析器
  parser: 'babel-eslint',
  // 指定语言类型和风格，sourceType指定 js 导入的方式，默认为script，此处设置为module，指某块导入方式
  parserOptions: {
    sourceType: 'module'
  },
  // 指定环境的全局变量，下面为浏览器环境
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // 配置标准的 js 风格
  extends: 'standard',
  // required to lint *.vue files
  // 规范 html 的
  plugins: [
    'html'
  ],
  // add your custom rules here
  // rules 设置从插件来的规范代码的规则，使用须去掉 eslint-plugin-
  // off -> 0 关闭规则
  // warn -> 1 开启警告规则
  // error -> 2 开启错误规则
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
