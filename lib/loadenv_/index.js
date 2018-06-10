const fs = require('fs');
const path = require('path');

/**
 * @description an IIFE utility function
 */
const utils = (function() {
  function readFileToEnv(file) {
    const content = fs.readFileSync(file, { encoding: 'utf8' });
  
    if (!content) throw Error('Unable to read file content');
  
    content.split(/\n/).forEach(function(item) {
      const itemMap = item.split('=');
      process.env[itemMap[0]] = itemMap[1];
    });
  }

  function isDirectory(file) {
    return fs.statSync(file).isDirectory();
  }

  function isFile(file) {
    return fs.statSync(file).isFile();
  }

  return {
    readFileToEnv,
    isDirectory,
    isFile
  };
})();

/**
 * @class Loadenv_
 * @classdesc main Loadenv class
 */
const Loadenv_ = function() {
  this.rootDir = process.cwd();
};

/**
 * @description loads env file
 * @param {string} filePath - path to env file or directory housing it
 */
Loadenv_.prototype.init = function(filePath = undefined) {
  let files = [];

  if (!filePath) filePath = this.rootDir;

  if (utils.isDirectory(filePath)) {
    files.push(
      ...fs.readdirSync(filePath).map(function(file) {
        return `${filePath}/${file}`;
      })
    );
  }

  if (utils.isFile(filePath)) files.push(filePath);

  files.forEach(function(file) {
    if (path.basename(file) === '.env' || path.extname(file) === '.env') {
      try {
        utils.readFileToEnv(file);
      } catch (e) {
        console.error(e);
      }
    }
  });

  files.length = 0;
};

module.exports = new Loadenv_();
