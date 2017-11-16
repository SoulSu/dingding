'use strict';

// 托盘

const {Tray, Menu, BrowserWindow, app, ipcMain} = require('electron');

const utils = require("../utils");
const path = require("path");
const config = require("../config");

class TrayOp {
    constructor(mainWindows) {
        this.tray = null;
        this.mainWindows = mainWindows;
        this.lastMsgCount = 0;

        this.msgImage = utils.assets("tray.png");
        this.unReadMsgImage = utils.assets("redtray.png");
        this.lastUseImage = "msgImage";

        this.createTray();
        this.addEventListener();
        this.ipcInit();
    }

    createTray() {
        this.tray = new Tray(this.msgImage);
        let that = this;
        let contextMenu = Menu.buildFromTemplate([
            {
                label: "显示", type: 'normal', click: () => {
                that.mainWindows.show();
            }
            },
            {
                label: "关于", type: 'normal', click: () => {
                that.showAbout();
            }
            },
            {
                label: "退出", type: 'normal', click: () => {
                app.exit(0);
            }
            }
        ]);
        this.tray.setToolTip(config.APP_TITLE);
        this.tray.setTitle("ttttt");
        this.tray.setContextMenu(contextMenu);
    }

    addEventListener() {
        let that = this;
        this.tray.on("double-click", () => {
            console.log("-");
            that.mainWindows.showOrHide();
        });
    }

    showAbout() {
        const modalPath = path.join('file://', __dirname, "../views/about.html");
        let win = new BrowserWindow({width: 400, height: 320});
        win.on('close', function () {
            win = null
        });
        win.loadURL(modalPath);
        win.show();
    }

    freshImage() {
        if (this.lastMsgCount <= 0) {
            if (this.lastUseImage !== "msgImage") {
                this.tray.setImage(this.msgImage);
                this.lastUseImage = "msgImage";
            }
        } else {
            if (this.lastUseImage === "msgImage") {
                this.tray.setImage(this.unReadMsgImage);
                this.lastUseImage = "unReadMsgImage";
            }
        }
        app.setBadgeCount(this.lastMsgCount * 1);
    }

    ipcInit() {
        let that = this;
        ipcMain.on(utils.ipcChan.renderSendBadgeCountChange, (event, data) => {
            if (data === "") {
                that.lastMsgCount = 0;
            } else {
                that.lastMsgCount = parseInt(data, 10);
            }
            that.freshImage();
        })
    }
}


module.exports = TrayOp;