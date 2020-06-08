// 浏览器运行信息
export function browserEnv() {
  var u = window.navigator.userAgent;
  var ua = window.navigator.userAgent.toLocaleLowerCase();
  let _reg_mobile = /iphone|android|symbianos|windows\sphone/g;
  let isMobile = _reg_mobile.test(ua);
  return {
    // mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    mobile: isMobile, // 是否为移动终端
    pc: !isMobile, // 是否为桌面pc
    trident: u.indexOf("Trident") > -1, // IE内核
    presto: u.indexOf("Presto") > -1, // opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, // 火狐内核
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf("Android") > -1 || u.indexOf("Mac") > -1, // 安卓终端
    iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf("iPad") > -1, // 是否为iPad
    webApp: u.indexOf("Safari") == -1, // 是否web应用程序，没有头部与底部
    qqbrw: u.indexOf("MQQBrowser") > -1, // QQ浏览器
    qq: ua.match(/QQ/i) == "qq", // QQ
    tim: u.indexOf("MQQBrowser") > -1 && u.indexOf("TIM") > -1, // QQ的TIM
    alipay: u.indexOf("Alipay") > -1, // 支付宝
    dingding: u.indexOf("DingTalk") > -1, // 钉钉
    weixin: u.indexOf("MicroMessenger") > -1, // 微信
    weixinWork: u.indexOf("MicroMessenger") > -1 && ua.match(/wxwork/i) == "wxwork", // 微信
    weibo: ua.match(/WeiBo/i) == "weibo", // 微博
    ucLowEnd: u.indexOf("UCWEB7.") > -1, //
    ucSpecial: u.indexOf("rv:1.2.3.4") > -1,
    webview: !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) && u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucweb: (function() {
      try {
        return (
          parseFloat(
            u
              .match(/ucweb\d+\.\d+/gi)
              .toString()
              .match(/\d+\.\d+/)
              .toString()
          ) >= 8.2
        );
      } catch (e) {
        if (u.indexOf("UC") > -1) {
          return true;
        }
        return false;
      }
    })(),
    Symbian: u.indexOf("Symbian") > -1,
    ucSB: u.indexOf("Firofox/1.") > -1
  };
}

// 添加js库
export function addScriptToHtml(src) {
  let script = document.createElement("script");
  let head = document.getElementsByTagName("head")[0];
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = src;
  head.appendChild(script);
}

// 修正vh的问题
export function fixVH() {
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

// 创建form并提交
export function createForm(method = "POST", action, inputVals, removeTime = 0) {
  // 创建一个 form
  let form1 = document.createElement("form");
  form1.id = "form1";
  form1.name = "form1";

  // 添加到 body 中
  document.body.appendChild(form1);

  for (let index = 0; index < inputVals.length; index++) {
    const inputVal = inputVals[index];
    // 创建一个输入
    let input = document.createElement("input");
    // 设置相应参数
    input.type = inputVal.type || "text";
    input.name = inputVal.name || "";
    input.value = inputVal.value || "";

    // 将该输入框插入到 form 中
    form1.appendChild(input);
  }

  // form 的提交方式
  form1.method = method;
  // form 提交路径
  form1.action = action;
  // 对该 form 执行提交
  form1.submit();

  // 删除该 form
  if (removeTime == 0) {
  } else {
    setTimeout(() => {
      document.body.removeChild(form1);
    }, removeTime);
  }
}

// setTimeout的Promise版
export function timeout(timeout) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });
}

// 设置chart颜色
export function setChartColor(options) {
  return Object.assign(options, {
    // 全局调色盘。
    color: ["#1976d2", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3", "#c23531", "#2f4554"]
  });
}

// 禁止body滚动
export function stopBodyScroll() {
  let sbs = {
    bodyEl: document.body,
    isFixed: false,
    top: 0,
    toggle: function() {
      if (!sbs.isFixed) {
        sbs.top = window.scrollY;
        sbs.bodyEl.style.position = "fixed";
        sbs.bodyEl.style.top = -sbs.top + "px";
        sbs.isFixed = true;
      } else {
        sbs.bodyEl.style.position = "";
        sbs.bodyEl.style.top = "";
        window.scrollTo(0, sbs.top); // 回到原先的top
        sbs.isFixed = false;
      }
    },
    reset: function() {
      sbs.bodyEl.style.position = "";
      sbs.bodyEl.style.top = "";
      sbs.isFixed = false;
      sbs.top = 0;
    }
  };
  return sbs;
}

// 计算时间差, 毫秒值
export function datetimeDiff(start, end) {
  let diff = end - start;
  if (diff < 0) {
    return "You should exchange params start and end";
  }
  let result = {
    day: 0,
    hour: 0,
    second: 0
  };
  // 秒
  let second = parseInt(diff / 1000);
  if (second < 60) {
    result.second = second;
    return result;
  }
  let secondLeft = diff % 60;
  let minute = parseInt(second / 60);
  if (minute < 60) {
    result.second = secondLeft;
    result.minute = minute;
    return result;
  }
  let minuteLeft = minute % 60;
  let hour = parseInt(minute / 60);
  if (hour < 24) {
    result.second = secondLeft;
    result.minute = minuteLeft;
    result.hour = hour;
    return result;
  }
  let hourLeft = hour % 24;
  let day = parseInt(hour / 24);
  result.second = secondLeft;
  result.hour = hourLeft;
  result.day = day;
  return result;
}

// 获取视口宽高
export function getViewPortSize(w) {
  w = w || window;
  if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };
  let d = w.document;
  if (document.compatMode == "CSS1Compat")
    return {
      w: d.documentElement.clientWidth,
      h: d.documentElement.clientHeight
    };
  return { w: d.body.clientWidth, h: d.body.clientHeight };
}

// 获取滚动
export function getScrollOffsets(w) {
  w = w || window;
  if (w.pageXoffset != null) {
    return { x: w.pageXoffset, y: w.pageYoffset };
  }
  let d = w.document;
  if (document.compatMode == "CSS1Compat") return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
  return { x: d.body.scrollLeft, y: d.body.scrollTop };
}

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
};

export const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join("/");
};
