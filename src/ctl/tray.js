'use-strict';

// 托盘

const {Tray} = require('electron');

class TrayOp {
    constructor(){
        this.tray = null;
    }

    createTray(){
        this.tray = new Tray();
    }
}
