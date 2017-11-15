'use strict';

// 主窗口

const {BrowserWindow, ipcRenderer} = require("electron");

const utils = require("../utils");
const config = require("../config");
const path = require("path");
const TrayOp = require("./tray");


class MainWindows {

    constructor() {
        this.browserWindow = null;

        this.tray = new TrayOp();
        this.createBrowserWindow();
        this.addEventListener();
    }

    createBrowserWindow() {
        let options = {
            width: 1000,
            height: 600,
            transparent: true,
            frame: true,
            icon: utils.assets("logo.png"),
            center: true,
            title: config.APP_TITLE,
            webPreferences: {
                javascript: true,
                plugins: true,
                nodeIntegration: false, // 不集成 Nodejs
                webSecurity: false,
                preload: path.join(__dirname, "../injects/preload.js") // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
            }
        };
        console.log("preload", path.join(__dirname, "../injects/preload.js"));
        this.browserWindow = new BrowserWindow(options);

    }

    addEventListener() {
        this.onReadyToShow();
        this.onClose();
        this.onResize();
    }

    onReadyToShow() {
        let that = this;
        this.browserWindow.on("ready-to-show", () => {
            that.show();
        });
    }

    onClose() {
        let that = this;
        this.browserWindow.on("close", () => {
            console.log("-----------");
            that.browserWindow.hide();
        });
    }

    onResize() {
        let that = this;
        this.browserWindow.on("resize", () => {
            that.resize();
        });
    }

    show() {
        this.browserWindow.show();
    }

    hide() {
        this.browserWindow.hide();
    }

    loadURL(url) {
        this.browserWindow.loadURL(url);
    }

    resize() {
        let winSize = this.browserWindow.getSize();
        let x = winSize[0];
        let y = winSize[1];
        let fixPx = 59;
        this.browserWindow.send(utils.ipcChan.renderSendResizeToMain,'123');
        // ipcRenderer.send(utils.ipcChan.renderSendResizeToMain, '123');
    }
}

module.exports = MainWindows;