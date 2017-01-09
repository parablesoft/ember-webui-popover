/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-webui-popover',
  included: function(app){
    app.import("bower_components/webui-popover/dist/jquery.webui-popover.css");
    app.import("bower_components/webui-popover/dist/jquery.webui-popover.js");
  }
};
