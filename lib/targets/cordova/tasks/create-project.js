const Task             = require('../../../tasks/-task');
const cordovaPath      = require('../utils/get-path');
const fsUtils          = require('../../../utils/fs-utils');
const logger           = require('../../../utils/logger');
const camelize         = require('../../../utils/string.js').camelize;

const Promise          = require('rsvp');
const cordovaProj      = require('cordova-lib').cordova;
const cordovaCreate    = require('cordova-create');

module.exports = Task.extend({
  id: undefined,
  name: undefined,
  templatePath: undefined,
  project: undefined,

  run() {
    let cdvPath = cordovaPath(this.project, false);

    if (!fsUtils.existsSync(cdvPath)) {
      let id = camelize(this.id);
      let name = camelize(this.name);

      let config = {
        lib: {
          www: {}
        }
      };

      if (this.templatePath !== undefined) {
        config.lib.www.url = this.templatePath;
      }

      return cordovaCreate(cdvPath, { id, name, template: config.lib.www.url });

      //return cordovaProj.create(cdvPath, id, name, config);
    } else {
      logger.warn('Cordova dir already exists, please ensure it is valid');
      return Promise.resolve();
    }
  }
});
