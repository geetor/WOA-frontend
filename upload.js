'use strict'
// 引入scp2
const client = require('scp2')
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()

client.scp('./dist/', {
  'host': '45.195.155.230',
  'port': '22',
  'username': 'root',
  'password': 'cloud2021.',
  'path': '/dist'
}, err => {
  spinner.stop()
  if (!err) {
    console.log(chalk.green('项目发布完毕!'))
  } else {
    console.log('err', err)
  }
})
