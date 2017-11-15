'use strict';

const {app, ipcMain} = require("electron");

const utils = require("./utils");
const MainWindows = require("./ctl/mainwindows");
const config = require("./config");


class DingDingApp {
    constructor() {
        this.mainWindow = null;
    }

    init() {
        this.addEventListener();
        this.addIpcEventListener();
    }

    addIpcEventListener() {
        ipcMain.on(utils.ipcChan.renderSendResizeToMain, ()=>{
            console.log("ipcman", arguments)
        });
    }

    addEventListener() {
        this.onAppReady();
        this.onAppWindowAllClosed();
    }

    onAppReady() {
        let that = this;
        app.on('ready', function () {
            that.createMainWIndow();
            that.mainWindow.loadURL(config.APP_URL);
        });
    }

    onAppWindowAllClosed() {
        // 当所有窗口被关闭了，退出。
        app.on('window-all-closed', function () {
            // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
            // 应用会保持活动状态
            if (process.platform != 'darwin') {
                app.quit();
            }
        });
    }


    createMainWIndow() {
        this.mainWindow = new MainWindows();
    }
}


new DingDingApp().init();
//
//
// // 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// // 这个方法就被调用
//
//
// var executeJavaScriptStr = `
// function doResize(x,y,fixPx){
//   console.log(arguments);
//   // layout-main
//   // 1. flex 设置成当前高度
//   // 2. width 100%
//   var layoutMain = document.getElementById('layout-main');
//   if(layoutMain){
//     layoutMain.style.width = "100%";
//     layoutMain.style.flexBasis = y+"px";
//   }
//   // layout-container 去掉 justify-content 属性
//   var layoutContainer = document.getElementById('layout-container');
//   if(layoutContainer){
//     layoutContainer.style.justifyContent = "inherit";
//   }
//
//   // body 设置 成当前高度 - 59px
//   var body = document.getElementById('body');
//   if(body){
//     body.style.height = (y - fixPx) +"px";
//   }
// }
// `;
//
// var doResize = () => {
//     let winSize = mainWindow.getSize();
//     let x = winSize[0];
//     let y = winSize[1];
//     let fixPx = 59;
//     mainWindow.webContents.executeJavaScript(`doResize(` + x + `,` + y + `,` + fixPx + `)`)
// };
