const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {

    globalShortcut.register('Ctrl+w',function(){
        return;
    })

  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
        width: 1000, 
        height: 600,
        transparent: true, 
        frame: false,
        icon:__dirname + '/logo.png',
    });

  // 加载应用的 index.html
  mainWindow.loadURL('https://im.dingtalk.com/');
  
  // 打开开发工具
//   mainWindow.openDevTools();

  mainWindow.on('resize', function(){
      var winSize = mainWindow.getSize();
      doResize(winSize[0], winSize[1]);
  })

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });

  mainWindow.on('will-quit',function(){
      globalShortcut.unregisterAll()
  })
});



var doResize = (x,y) => (
    mainWindow.webContents.executeJavaScript(`
    // layout-main 
    // 1. flex 设置成当前高度 
    // 2. width 100%
    var layoutMain = document.getElementById('layout-main');
    layoutMain.style.width = "100%";
    layoutMain.style.flexBasis = "`+(y)+`px";

    // layout-container 去掉 justify-content 属性
    var layoutContainer = document.getElementById('layout-container');
    layoutMain.style.justifyContent = "inherit";
    // body 设置 成当前高度 - 59px
    var body = document.getElementById('body');
    body.style.height = "`+(y - 59)+`px";
    `)
)