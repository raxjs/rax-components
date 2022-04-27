const { default: chalk } = require('chalk');

module.exports = {
  info(...args) {
    console.log(chalk.blue('info'), ...args);
  },
  success(...args) {
    console.log(chalk.green('success'), ...args);
  },
  warn(...args) {
    console.log(chalk.yellow('warn'), ...args);
  },
  error(...args) {
    console.log(chalk.red('error'), ...args);
  },
};
