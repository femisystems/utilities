const fs = require('fs');
const path = require('path');

const utils = (function() {
  function readFileToEnv(file) {
    const content = fs.readFileSync(file, { encoding: 'utf8'});
  
    if (!content) throw Error('Unable to read file content');
  
    content.split(/\n/).forEach(item => {
      const itemMap = item.split('=');
      process.env[itemMap[0]] = itemMap[1];
    });
  };

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

const loadEnv = function() {
  this.rootDir = process.cwd();
};

loadEnv.prototype.init = function(filePath = undefined) {
  let files = [];

  if (!filePath) filePath = this.rootDir;

  if (utils.isDirectory(filePath)) {
    files
      .push(...fs.readdirSync(filePath)
      .map(file => file = `${filePath}/${file}`));
  }

  if (utils.isFile(filePath)) files.push(filePath);

  files.forEach(file => {
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

module.exports = new loadEnv();
