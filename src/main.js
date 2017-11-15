'use strict';

const {app, BrowserWindow} = require('electron');

const Utils = require('./utils');


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {

    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        transparent: true,
        frame: true,
        icon: Utils.assets('1.png'),
        center: true,
        show: false,
        title: '钉钉',
        webPreferences: {
            preload: require('./injects/preload'),
        }
    });
    mainWindow.setHasShadow(true);
    // console.log(mainWindow.setThumbarButtons(new Button()));
    // mainWindow.setSkipTaskbar(true)

    // mainWindow.setMenuBarVisibility

    // @link https://github.com/electron/electron/issues/5951
    mainWindow.setMenu(null);

    // 加载应用的 index.html
    mainWindow.loadURL('https://im.dingtalk.com/');

    // 打开开发工具
    // mainWindow.openDevTools();
    mainWindow.setMenuBarVisibility(false)

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })

    mainWindow.on('resize', function () {
        doResize();
    })

    mainWindow.on('closed', function () {
        // 当 window 被关闭，这个事件会被发出
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });

    /*
    mainWindow.on('will-quit', function () {
      globalShortcut.unregisterAll()
    })
    */


    mainWindow.webContents.on('dom-ready', function () {
        mainWindow.webContents.executeJavaScript(executeJavaScriptStr);
        mainWindow.webContents.doResize()
    })
});

var executeJavaScriptStr = `
function doResize(x,y,fixPx){
  console.log(arguments);
  // layout-main 
  // 1. flex 设置成当前高度 
  // 2. width 100%
  var layoutMain = document.getElementById('layout-main');
  if(layoutMain){
    layoutMain.style.width = "100%";
    layoutMain.style.flexBasis = y+"px";
  }
  // layout-container 去掉 justify-content 属性
  var layoutContainer = document.getElementById('layout-container');
  if(layoutContainer){
    layoutContainer.style.justifyContent = "inherit";
  }
  
  // body 设置 成当前高度 - 59px
  var body = document.getElementById('body');
  if(body){
    body.style.height = (y - fixPx) +"px";
  }
}
`;

var doResize = () => {
    let winSize = mainWindow.getSize();
    let x = winSize[0];
    let y = winSize[1];
    let fixPx = 59;
    mainWindow.webContents.executeJavaScript(`doResize(` + x + `,` + y + `,` + fixPx + `)`)
};
