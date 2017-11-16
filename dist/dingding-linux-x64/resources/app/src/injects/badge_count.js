'use strict';


const {ipcRenderer} = require("electron");
const utils = require("../utils");


class badgeCount {

    constructor() {
        setInterval(() => {
            let countDom = document.querySelector("#menu-pannel .unread-num .ng-binding");
            let count = "";
            if (countDom) {
                count = countDom.innerText;
                count = parseInt(count, 10);
            }

            if (count > 0) {
                ipcRenderer.send(utils.ipcChan.renderSendBadgeCountChange, count.toString());
            } else {
                ipcRenderer.send(utils.ipcChan.renderSendBadgeCountChange, "");
            }

        }, 1500);
    }
}


module.exports = badgeCount;