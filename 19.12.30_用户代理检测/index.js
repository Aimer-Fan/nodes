var client = function () {
  // 呈现引擎
  var engine = {
    ie: 0,
    gecko: 0,
    khtml: 0,
    opera: 0,

    // 完整版本号
    ver = null
  };

  // 浏览器
  var borwser = {
    // 主要浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    // 具体版本号
    ver: null
  };

  // 平台、设备和操作系统
  var system = {
    win: false,
    mac: false,
    x11: false,

    // 移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,

    // 游戏系统
    wii: false,
    ps: false
  };

  // 呈现引擎和浏览器
  var ua = navigator.userAgent;
  if (window.opera) {
    engine.ver = borwser.ver = window.opera.version();
    engine.opera = borwser.opera = parseFloat(engine.ver);
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    borwser.webkit = parseFloat(engine.ver);

    // 确定是Chrome还是Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      borwser.ver = RegExp["$1"];
      borwser.chrome = parseFloat(borwser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
      borwser.ver = RegExp["$1"];
      borwser.safari = parseFloat(borwser.ver);
    } else {
      // 近似的确定版本号
      var safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      } else if (engine.webkit < 312) {
        safariVersion = 1.2;
      } else if (engine.webkit < 412) {
        safariVersion = 1.3;
      } else {
        safariVersion = 2;
      }

      borwser.safari = borwser.ver = safariVersion;
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = borwser.ver = RegExp["$1"];
    engine.khtml = borwser.konq = parseFloat(engine.ver);
  } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);

    // 确定是不是Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      borwser.ver = RegExp["$1"];
      borwser.firefox = parseFloat(borwser.ver);
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    engine.ver = borwser.ver = RegExp["$1"];
    engine.ie = borwser.ie = parseFloat(engine.ver);
  }

  // 检测浏览器
  borwser.ie = engine.ie;
  borwser.opera = engine.opera;

  // 检测平台
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = p.indexOf("X11") == 0 || (p.indexOf("Linux") == 0);

  // 检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
      if (RegExp["$1"] == "NT") {
        switch (RegExp["$2"]) {
          case "5.0":
            system.win = "2000";
            break;
          case "5.1":
            system.win = "XP";
            break;
          case "6.0":
            system.win = "Vista";
            break;
          case "6.1":
            system.win = "7";
            break;
          default:
            system.win = "NT";
            break;
        }
      } else if (RegExp["$1"] == "9x") {
        system.win = "ME";
      } else {
        system.win = RegExp["$1"];
      }
    }
  }

  // 移动设备
  system.iphone = ua.indexOf("iPhone") > -1;
  system.ipod = ua.indexOf("iPod") > -1;
  system.ipad = ua.indexOf("iPad") > -1;
  system.nokiaN = ua.indexOf("NokiaN") > -1;

  // windows mobile
  if (system.win == "CE") {
    system.winMobile = system.win;
  } else if (system.win  == "Ph") {
    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
      system.win = "Phone";
      system.winMobile = parseFloat(RegExp["$1"]);
    }
  }

  // 检测IOS版本
  if (system.mac && ua.indexOf("Mobile") > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace("_", "."));
    } else {
      system.ios = 2; // 不能真正检测出来，所以只能猜测
    }
  }

  // 检测Android版本
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1);
  }

  // 游戏系统
  system.wii = ua.indexOf("Wii") > -1;
  system.ps = /playstation/i.test(ua);

  return {
    engine: engine,
    borwser: borwser,
    system: system
  };

}();