/*
 *
 * Add header info here
 *
 */

'use strict';

var ffmpeg = require('fluent-ffmpeg')

var render = (function () {
 
  var module = {},
    render_callback

  /**
  * Initiate the rendering process by sending a data object containing params, vis and data (see data/example.json for structure)
  *
  * @param {Object} `data` Parameters for the rendering process.
  * @api public
  */

  module.render = function (folder, width, height, callback) {
    render_callback = callback

    var split = folder.split('/'),
      name = split[split.length-1]
    
    ffmpeg()
      .addInput(folder + '/png/%03d.png')
      .fps(30)
      .size(width + 'x' + height)
      .videoCodec('libx264')
      //Bigger Files
      //.videoCodec('mpeg4')
      .outputOptions([
        //Video Player Support
        '-pix_fmt yuv420p'//,
        //Quality > works best with mpeg4
        //'-crf 0'
      ])
      .format('mp4')
      .on('end', function() {
        render_callback()
      })
      .on('error', function(err) {
        console.log('an error happened: ' + err.message);
      })
      .save(folder + '/' + name + '.mp4');
  }

  return module;
 
})();

module.exports = render;