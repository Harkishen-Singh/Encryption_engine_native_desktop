"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// windows
var win1;
function createWindows() {
    win1 = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#fff'
    });
    win1.webContents.openDevTools();
    win1.loadURL('file://' + __dirname + '/templates/index.html');
    win1.on('closed', function () { win1 = null; });
}
electron_1.ipcMain.on('encryptedCode', function (event, data) {
    console.log('information received from renderer proces below');
    console.warn(data);
    console.warn(event);
    var outputWindowBW = new electron_1.BrowserWindow({
        height: 600,
        width: 800
    });
    outputWindowBW.loadURL('file://' + __dirname + '/templates/output.html');
    outputWindowBW.webContents.on('did-finish-load', function () {
        outputWindowBW.webContents.send('dataEncrytped', data);
    });
    outputWindowBW.on('closed', function () { outputWindowBW = null; });
});
electron_1.app.on('ready', createWindows);
// Mac-darwin codes
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin')
//         app.quit;
// });
// app.on('activate', () => {
//     if (win1===null)
//         createWindows;
// });
