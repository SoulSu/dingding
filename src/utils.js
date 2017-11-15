'use strict';

// 工具类

const path = require('path');


class Utils {
    static assets(name) {
        return path.join(__dirname, '/../assets/' + name);
    }
}


module.exports = Utils;