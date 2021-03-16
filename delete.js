const fs = require('fs');

module.exports = file => {
  fs.unlinkSync(__dirname + '/upload/' + file);
};
