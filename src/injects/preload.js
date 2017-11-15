'use strict';



const windowResize = require("./resize");

class InjectsPreload {
    constructor() {
        this.resize = new windowResize();

        setInterval(() => {
            console.log("-")
        }, 1000);
    }

    init() {
        console.log("------- in injects ");
        alert("--")
    }

}


new InjectsPreload().init()