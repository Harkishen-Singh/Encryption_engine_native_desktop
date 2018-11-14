var ipcOutput = require('electron').ipcRenderer;


ipcOutput.on('dataEncrytped', (event: any, data: any) => {
    document.getElementById('encryptCode').innerHTML = data;
})