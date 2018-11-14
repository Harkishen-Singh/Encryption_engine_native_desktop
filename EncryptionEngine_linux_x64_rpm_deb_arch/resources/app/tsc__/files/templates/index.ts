console.log('index.js working')

// import { app, BrowserWindow } from 'electron';
const BrowserWindow = require('electron').remote.BrowserWindow;
const Menu = require('electron').remote.Menu;

let aboutWindow, nextWindow;

function showAbout() {
    aboutWindow = new BrowserWindow({
        width: 400,
        height: 400,
        backgroundColor: '#fff',
    });
    let template: string[] = [];
    Menu.setApplicationMenu(null);
    aboutWindow.loadURL('file://'+__dirname+'/about.html');
    aboutWindow.on('closed', () => {aboutWindow = null;});
}

let ele: any = document.getElementById('thisss');
ele.onclick = () =>  {showAbout()};

