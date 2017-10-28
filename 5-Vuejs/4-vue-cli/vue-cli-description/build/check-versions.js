'use strict'
/**
 * 以下是变量的说明 
 * chalk, 让命令行彩色输出的 插件
 * semver, 对特定的版本号做判断的
 * packageConfig, 导入pacjage.json文件，要使用 engines 选项
 * shell, 执行 Unic 系统命令
 */
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')
function exec (cmd) {
  // 可通过 chil_process 模块新建子进程，执行 Unix 系统命令
  // 下面的命令就是获取版本号
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node', // node 版本的信息
    currentVersion: semver.clean(process.version), // 使用 semver 转化为规定格式
    versionRequirement: packageConfig.engines.node // 获取版本信息
  }
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 自动调用 npm --version 命令，获取版本号
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      // 版本号不符合要求，就命令行输出提示
      // 当前版本：红色，符合要求的版本号绿色，提示具体的版本号
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
