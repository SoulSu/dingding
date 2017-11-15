'use strict';

// 主窗口

const {BrowserWindow} = require('electron');

const Utils = require('../utils');



class MainWindows {

    constructor() {
        this.browserWindow = null;
    }


    createBrowserWindow() {
        let options = {
            width: 1000,
            height: 600,
            transparent: true,
            frame: true,
            icon: Utils.assets('logo.png'),
            center: true,
            title: '钉钉',
            webPreferences:{
                javascript: true,
                plugins: true,
                nodeIntegration: false, // 不集成 Nodejs
                webSecurity: false,
                preload: path.join(__dirname, 'preload/window_sdk.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
            }
        };
        this.browserWindow = new BrowserWindow(options);
    }

    show() {
        this.browserWindow.show();
    }

    loadURL(url) {
        this.browserWindow.loadURL(url);
    }
}