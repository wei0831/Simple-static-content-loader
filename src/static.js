/**************************************************/
// Simple Content Moudle for NodeJS
// File Name: static.js
// Author: Jack Chang
// Modified Date: 07/08/2015
// Changelog:
//   - Initial version -- 07/08/2015
/**************************************************/
var fs = require('fs');
var path = require('path');
var default_imgage_folder = "./images";
var default_audio_folder = "./audios";
var default_css_folder = "./css"

module.exports = function(request, response) {
  var requestpath = path.parse(request.url);
  var ext = requestpath.ext;
  var lastChar = request.url.slice(-1);

  // Directory access
  if(lastChar === '/') {
    // Try to find default index.html
    fs.readFile('.' + request.url + 'index.html', 'utf8', function (errors, contents){
        if(errors) return errorpage(response, 401, "ERROR 401: Directory is not accessiable.");
        responsecontent(response, 200, "text/html", null, contents);
    });
  }
  // File access
  else {
    // Private access
    if(requestpath.dir.indexOf('private') != -1) return errorpage(response, 401, "ERROR 401:  Not accessiable.");
    // Public access
    switch (ext) {
      case '.html':
        fs.readFile('.' + request.url, 'utf8', function (errors, contents){
            if(errors) return errorpage(response);
            responsecontent(response, 200, "text/html", null, contents);
        });
        break;
      case '.css' :
        fs.readFile(default_css_folder + request.url, 'utf8', function (errors, contents){
            if(errors) return errorpage(response);
            responsecontent(response, 200, "text/css", null, contents);
        });
        break;
      case '.jpeg':
      case '.jpg':
      case '.png':
      case '.gif':
      case '.bmp':
        console.log("image/" + ext.slice(1,4));
        fs.readFile(default_imgage_folder + request.url, function (errors, contents){
            if(errors) return errorpage(response);
            responsecontent(response, 200, "image/" + ext.slice(1,4), null, contents);
        });
        break;
      case '.mp3' :
        fs.readFile(default_audio_folder + request.url, function (errors, contents){
            if(errors) return errorpage(response);
            responsecontent(response, 200, "audio/mpeg", null, contents);
        });
        break;
      // Non-support file type
      default:
        fs.readFile('.' + request.url, function (errors, contents){
            if(errors) return errorpage(response);
            responsecontent(response, 200, null, null, contents);
        });
    }
  }
};

function errorpage(response, status, msg) {
  msg = msg || "ERROR 404: Request Not Found.";
  status = status || 404;
  responsecontent(response, status, "text/html", msg);
  return null;
};

function responsecontent(response, status, content_type, msg, content) {
  response.writeHead(status, {'Content-Type': content_type});
  if(content) response.write(content);
  response.end(msg);
}
