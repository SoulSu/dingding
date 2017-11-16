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
        let that = this;
        ipcMain.on(utils.ipcChan.renderSendResizeToMain, () => {
            that.mainWindow.resize();
        });

        ipcMain.on(utils.ipcChan.renderSendTrayDbclickToMain, () => {
            console.log("tray info", arguments);
            that.mainWindow.showOrHide();
        });

        ipcMain.on(utils.ipcChan.renderSendTrayExitToMain, () => {
            console.log("tray exit", arguments);
            that.exit();
        });
    }

    addEventListener() {
        this.onAppReady();
        this.onAppWindowAllClosed();
    }

    onAppReady() {
        // let that = this;
        app.on('ready', () => {
            this.createMainWIndow();
            this.mainWindow.loadURL(config.APP_URL);
        });
    }

    onAppWindowAllClosed() {
        // 当所有窗口被关闭了，退出。
        app.on('window-all-closed', () => {
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

    exit() {
        app.exit(0);
    }
}


new DingDingApp().init();
