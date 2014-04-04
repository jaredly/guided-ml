// adapted from https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

module.exports = sendFile

/**
 * sendFile('/target', 'myfile', theFile, {parties: 7})
 *    .on('progress', fn(percentage | null))
 *    .on('success', fn(responseText, xhr)
 *    .on('error', fn(evt))
 *    .on('abort', fn(evt))
 *
 * @function sendFile
 * @param {string} target the url to POST to
 * @param {string} name the form name for the file
 * @param {File} file html5 file object
 * @param {object} data (optional) any extra data
 * @return {chain}
 */
function sendFile(target, name, file, data) {
  var xhr = new XMLHttpRequest()

  xhr.open("POST", target, true);

  // Initiate a multipart/form-data upload
  var fd = new FormData();
  fd.append(name, file);
  if (data) {
    for (var key in data) {
      fd.append(key, data[key]);
    }
  }
  xhr.send(fd);

  var events = {
    'progress': function (func) {
      xhr.upload.addEventListener("progress", function(e) {
        var percentage = null;
        if (e.lengthComputable) {
          percentage = Math.round((e.loaded * 100) / e.total);
        }
        func(percentage);
      }, false);
    }
    'success': function (func) {
      xhr.addEventListener('load', function (e) {
        func(xhr.responseText, xhr);
      });
    },
  }

  var chain = {
    on: function (evt, func) {
      if (events[evt]) {
        events[evt](func);
      } else {
        xhr.addEventListener(evt, func);
      }
      return chain
    }
  }
  return chain
}

