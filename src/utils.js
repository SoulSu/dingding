'use strict';

// 工具类

const path = require('path');


class utils {
    static assets(name) {
        return path.join(__dirname, '/../assets/' + name);
    }
}

utils.ipcChan = {};
utils.ipcChan.renderSendNewMsgToMain = "on-new-msg";
utils.ipcChan.mainSendResizeToRender = "on-mainwindow-resize";
utils.ipcChan.renderSendResizeToMain = "on-mainwindow-resize-sm";



module.exports = utils;