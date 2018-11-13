"use strict";
console.log('index.js working');
// import { app, BrowserWindow } from 'electron';
var BrowserWindow = require('electron').remote.BrowserWindow;
var Menu = require('electron').remote.Menu;
var aboutWindow, nextWindow;
function showAbout() {
    aboutWindow = new BrowserWindow({
        width: 400,
        height: 400,
        backgroundColor: '#fff',
    });
    var template = [];
    Menu.setApplicationMenu(null);
    aboutWindow.loadURL('file://' + __dirname + '/about.html');
    aboutWindow.on('closed', function () { aboutWindow = null; });
}
