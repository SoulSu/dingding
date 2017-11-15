'use strict';

// 托盘

const {Tray,Menu} = require('electron');

const utils = require("../utils");

class TrayOp {
    constructor(){
        this.tray = null;
        this.createTray();
    }

    createTray(){
        // this.tray = new Tray();

        this.tray= new Tray(utils.assets("logo.png"));
        var contextMenu = Menu.buildFromTemplate([
            { label: 'Item1', type: 'radio' },
            { label: 'Item2', type: 'radio' },
            { label: 'Item3', type: 'radio', checked: true },
            { label: 'Item4', type: 'radio' }
        ]);
        this.tray.setToolTip('This is my application.');
        this.tray.setContextMenu(contextMenu);
    }
}


module.exports = TrayOp;