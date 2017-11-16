'use strict';

const {ipcRenderer} = require("electron");

const windowResize = require("./resize");
const badgeCount = require("./badge_count");
const utils = require("../utils");

class InjectsPreload {
    constructor() {
        this.resize = new windowResize();
        this.badgeCount = new badgeCount();
        this.DingDingApp = window.DingDingApp = {};

        this.bindObj();
    }

    init() {
        window.onresize = function () {
            ipcRenderer.send(utils.ipcChan.renderSendResizeToMain, "resize");
        }
    }

    bindObj() {
        this.DingDingApp.doResize = this.resize.doResize;
    }

}

new InjectsPreload().init()