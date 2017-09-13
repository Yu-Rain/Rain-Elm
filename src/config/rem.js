
;(function (window, document) {

  /**
   * 设置meta viewport
   * 计算1rem的值
   */
  var recalculate = function () {

    /**
     * 1. 获取dpr
     * 2. 根据dpr计算页面缩放的比例值
     * 3. 设置viewport
     * 4. 给<html>元素添加自定义属性, 记录当前dpr
     * 5. 计算1rem的值
     * 6. 设置根元素的字体大小等于1rem的值.
     * 7. 设置页面默认字体大小.
     * */


    // 获取dpr
    var dpr = Math.floor(window.devicePixelRatio) || 1;

    // 获取html元素
    var html = document.documentElement;


    // 计算缩放比例的值
    var scale = 1 / dpr;

    // 创建meta元素
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width='+ 'device-width' + ', initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.head.appendChild(metaEl);

    // 此时设置完viewport, clientWidth的值要取决于initial-scale的值, 如果是0.5, clientWidth = 375(逻辑像素) / 0.5 = 750
    // console.log(document.documentElement.clientWidth); // 750

// 设置data-dpr 属性, 用于以后CSS Hack
    html.setAttribute('data-dpr', dpr);

// 动态写入样式
// 计算1rem的值
    var rem = 75;

    // 通过分析饿了么官网的页面, 发现屏幕宽度大于1242时, rem都等于108
    if (html.clientWidth < 1242) {
      rem = html.clientWidth / 10; // 网上做法是html.clientWidth * dpr / 10, 但前提是clientWidth为375. 所以进行改进 1rem = 物理像素 / 10 (10也可以是其他的数值);
    } else {
      rem = 108;
    }

    // 设置根元素的字体大小
    html.style.fontSize = rem + 'px';

    // 设置页面默认字体大小
    document.body.style.fontSize = 12 * dpr + 'px';

  };


  // 设置监听事件, 当文档加载完成或设备改变方向的时候, 重新计算1rem的值.
  if(document.addEventListener){
    document.addEventListener('DOMContentLoaded', recalculate, false);
    window.addEventListener('orientationchange', recalculate, false);

  }else{
    // 适配IE
    window.attachEvent('resize', recalculate);
    document.onreadystatechange=function(){
      if(document.readyState=='complete'){
        recalculate();
      }
    };
  }

})(window, document);
