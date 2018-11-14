"use strict";
var fs = require('fs');
// var name: string="";
var new_file = ""; // contains the encrypted code
var user_name = "";
var user_emailId = "";
var BrowserWindow2 = require('electron').remote.BrowserWindow;
var dialog = require('electron').remote.dialog;
var ipc = require('electron').ipcRenderer;
var submits = function () {
    // dialog.showErrorBox('This is an err','some random error')
    var user_name = document.getElementById('nameUser').innerHTML;
    var data = document.getElementById('message').innerHTML;
    console.log(data);
    // dialog.showErrorBox('data is', data)
    var alpha = new Array(3000 - 33);
    var al = [];
    function code_allocation2() {
        for (var i = 33; i < 3000; i++) {
            var a = new Array(4);
            var b = new Array(4);
            var ch = "", val = "";
            for (var j = 1; j < 5; j++) {
                var temp = Math.floor(Math.random() * 61);
                a[j] = String.fromCharCode(65 + temp);
                //  console.log(' a[j] at j '+j+' is '+a[j] );
            }
            for (var j = 1; j < 5; j++)
                ch = ch + a[j];
            for (var j = 1; j < 5; j++) {
                var temp = Math.floor(Math.random() * 10);
                b[j] = String(temp);
                //   console.log(' b[j] at j '+j+' is '+b[j] );
            }
            for (var j = 1; j < 5; j++)
                val = val + b[j];
            alpha[i - 33] = ch + val;
            // console.log('Value of cal + val at count '+ i + ' is : ' + (ch+val));
            ch = "";
            val = "";
        }
        console.warn('alpha below');
        // console.warn(alpha)
        file_saving();
    }
    code_allocation2();
    function file_saving() {
        var r = Math.floor(Math.random() * 1001);
        var x = Math.floor(Math.random() * 1001);
        var wx = String(x);
        //console.log("value of wx : " + wx);
        var wr = wx + "_encryptCode_" + wx + ".txt"; //use this variable to get the file of encrypted code
        var fw = fs.open(wr, 'w', function (err) {
            if (err)
                console.log('Error occured while creating a new file with name ' + wr);
            else {
                //console.log('File Created with name ' + wr);
            }
        });
        for (var i = 0; i < alpha.length; i++)
            fs.appendFile(wr, i + ". " + alpha[i] + "\n", function (err) {
                if (err)
                    console.log("Error Occured while appending the file created earlier"); // creating the encrypted key
            });
        dic_alpha_assign();
    }
    function dic_alpha_assign() {
        for (var i = 33; i < 3000; i++)
            al[i - 33] = String.fromCharCode(i);
        dic_assign();
    }
    function dic_assign() {
        var dic = [];
        for (var i = 0; i < 2967; i++) {
            dic.push({
                key: al[i],
                value: alpha[i]
            });
        }
        // console.log('dic below')
        // console.log(dic)
        open_file(dic);
    }
    var new_ch = "";
    function open_file(dic) {
        var code1 = data;
        console.log('data is ');
        console.warn(data);
        // dialog.showErrorBox('sth', data);
        for (var i = 0; i < data.length; i++) {
            var ch = data.charAt(i);
            for (var j = 0; j < dic.length; j++) {
                if (ch == dic[j].key) {
                    new_file = new_file + dic[j].value;
                    console.log('got inside');
                    // ipc.send('encryptedCode', ' openfile');
                    break;
                }
            }
        }
        // outputWindow(new_file);
        // dialog.showErrorBox('Output encryted', new_file)
        ipc.send('encryptedCode', new_file);
    }
    function outputWindow(new_file) {
        var outputWindowBW = new BrowserWindow2({
            height: 600,
            width: 800
        });
        outputWindowBW.loadURL('file://' + __dirname + '/output.html');
        outputWindowBW.on('closed', function () { outputWindowBW = null; });
    }
};
document.getElementById('submitted').onclick = function () {
    submits();
};
