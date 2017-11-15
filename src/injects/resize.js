'use strict';

const {ipcRenderer} = require('electron');

const utils = require("../utils");


// 重构界面大小

class windowResize {

    constructor() {
        // ipcRenderer.on(utils.ipcChan.mainSendResizeToRender, () => {
        ipcRenderer.on(utils.ipcChan.renderSendResizeToMain, () => {
            console.log("windowresize", arguments);
        })

    }

    // 重置
    doResize(x, y, fixPx) {
        console.log(arguments);
        // layout-main
        // 1. flex 设置成当前高度
        // 2. width 100%
        let layoutMain = document.getElementById('layout-main');
        if (layoutMain) {
            layoutMain.style.width = "100%";
            layoutMain.style.flexBasis = y + "px";
        }
        // layout-container 去掉 justify-content 属性
        let layoutContainer = document.getElementById('layout-container');
        if (layoutContainer) {
            layoutContainer.style.justifyContent = "inherit";
        }

        // body 设置 成当前高度 - 59px
        let body = document.getElementById('body');
        if (body) {
            body.style.height = (y - fixPx) + "px";
        }
    }
}


module.exports = windowResize;