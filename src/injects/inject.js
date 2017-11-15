'use-strict';

// 注入electron窗口中的js

// inject js
var DingInject = {};

DingInject.doResize = (x, y, fixPx) => {
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

// title 通知的标题
// body  通知的内容
DingInject.notify = (title, body) => {
    new Notification(title,{title: title, body: body});
}


DingInject.loopNotify = () => {
    var convLists = null;
    var convListIntervalId = null;

    convListIntervalId = setInterval(()=>{
      convLists = document.querySelectorAll('.conv-lists');
      console.log("runconvLists" , convLists);
      if(convLists.length <= 0) return;
      clearInterval(convListIntervalId);
    }, 1000);


    var item = convLists[convLists.length - 1].querySelector('conv-item');
    var lastConId = item.getAttribute('con-id');

    var loopFunc = () => {
        // 当前焦点在窗口就不提示
        let nowItem = convLists[convLists.length - 1].querySelector('conv-item');
        let nowConId = nowItem.getAttribute('con-id');
        if( lastConId != nowConId ){
          console.log("lastConId", lastConId ,"nowConId", nowConId);
          let isBinding = nowItem.querySelector('.conv-item-content .noti .unread-num .ng-binding');
          if(isBinding){
            let unreadNum = 1 * isBinding.innerHTML;
            new Notification("釘釘消息通知", {title:"釘釘消息通知",body:"你有一条新消息"});
            lastConId = nowConId;
          }
        }
    }

    setInterval(loopFunc, 1)
}




