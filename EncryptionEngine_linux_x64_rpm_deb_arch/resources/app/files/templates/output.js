"use strict";
var ipcOutput = require('electron').ipcRenderer;
ipcOutput.on('dataEncrytped', function (event, data) {
    document.getElementById('encryptCode').innerHTML = data;
});
