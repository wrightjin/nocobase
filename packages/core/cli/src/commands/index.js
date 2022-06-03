const { Command } = require('commander');
const { isPackageValid } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  require('./global')(cli);
  require('./build')(cli);
  require('./dev')(cli);
  require('./start')(cli);
  require('./test')(cli);
  require('./clean')(cli);
  require('./doc')(cli);
  require('./umi')(cli);
  require('./upgrade')(cli);
  require('./postinstall')(cli);
  if (isPackageValid('@umijs/utils')) {
    require('./create-plugin')(cli);
  }
}
