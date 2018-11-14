import {app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import url from 'url';

// windows
let win1: any;

function createWindows() {
    win1 = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#fff'
    });
    win1.webContents.openDevTools();
    win1.loadURL('file://'+__dirname+'/templates/index.html');

    win1.on('closed', () => {win1 = null;});
}

ipcMain.on('encryptedCode', (event: any, data: any) => {
    console.log('information received from renderer proces below');
    console.warn(data)
    console.warn(event)
})

app.on('ready', createWindows);

// Mac-darwin codes

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin')
//         app.quit;
// });

// app.on('activate', () => {
//     if (win1===null)
//         createWindows;
// });