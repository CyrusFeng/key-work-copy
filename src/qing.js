export default {
  fn:(function(a) {
      function b(c) {
        if (d[c])
          return d[c].exports;
        var e = d[c] = {
          i: c,
          l: !1,
          exports: {}
        };
        return a[c].call(e.exports, e, e.exports, b),
          e.l = !0,
          e.exports
      }
      var c = window.qingJsonpFunction;
      window.qingJsonpFunction = function(b, d, f) {
        for (var g, h, j = 0, i = []; j < b.length; j++)
          h = b[j],
          e[h] && i.push(e[h][0]),
            e[h] = 0;
        for (g in d)
          Object.prototype.hasOwnProperty.call(d, g) && (a[g] = d[g]);
        for (c && c(b, d, f); i.length; )
          i.shift()()
      }
      ;
      var d = {}
        , e = {
        5: 0
      };
      return b.e = function(a) {
        function c() {
          g.onerror = g.onload = null,
            clearTimeout(h);
          var b = e[a];
          0 !== b && (b && b[1](new Error("Loading chunk " + a + " failed.")),
            e[a] = void 0)
        }
        if (0 === e[a])
          return Promise.resolve();
        if (e[a])
          return e[a][2];
        var d = new Promise(function(b, c) {
            e[a] = [b, c]
          }
        );
        e[a][2] = d;
        var f = document.getElementsByTagName("head")[0]
          , g = document.createElement("script");
        g.type = "text/javascript",
          g.charset = "utf-8",
          g.async = !0,
          g.timeout = 1.2e5,
        b.nc && g.setAttribute("nonce", b.nc),
          g.src = b.p + "" + ({
            0: "mobile",
            1: "desktop",
            2: "mobile-early",
            3: "desktop-le-0.0.3"
          }[a] || a) + "." + {
            0: "2152d633696749005993",
            1: "10cf8ac477df39e41ea2",
            2: "75aea4560d091131215b",
            3: "b5c22df4c60d3e6edaf4"
          }[a] + ".js";
        var h = setTimeout(c, 1.2e5);
        return g.onerror = g.onload = c,
          f.appendChild(g),
          d
      }
        ,
        b.m = a,
        b.c = d,
        b.i = function(a) {
          return a
        }
        ,
        b.d = function(a, c, d) {
          b.o(a, c) || Object.defineProperty(a, c, {
            configurable: !1,
            enumerable: !0,
            get: d
          })
        }
        ,
        b.n = function(a) {
          var c = a && a.__esModule ? function() {
              return a["default"]
            }
            : function() {
              return a
            }
          ;
          return b.d(c, "a", c),
            c
        }
        ,
        b.o = function(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b)
        }
        ,
        b.p = "https://static.yunzhijia.com/public/js/qing/0.0.10/",
        b.oe = function(a) {
          throw console.error(a),
            a
        }
        ,
        b(b.s = 27)
    }
  )({
    0: function(a, b, c) {
      "use strict";
      c.d(b, "a", function() {
        return d
      }),
        c.d(b, "b", function() {
          return e
        });
      var d = function(a) {
        console && console.log("[Qing] " + a)
      }
        , e = function(a) {
        console && console.warn("[Qing] " + a)
      }
    },
    1: function(a, b, c) {
      "use strict";
      Object.defineProperty(b, "__esModule", {
        value: !0
      });
      var d = c(0);
      (function(a) {
          if (!(a.qing && a.qing.version)) {
            var b = a.qing || (a.qing = {});
            b.version = "0.0.10",
              b.isReady = !1,
              b.debug = !1;
            var e = navigator.userAgent.toLowerCase()
              , f = e.match(/Qing\/(\d+(?:\.\d+)*)/i) || e.match(/App\/cloudhub \d+\/(\d+(?:\.\d+)*)/i)
              , g = f;
            g && (b.nativeJsBridgeVersion = f[1]),
              b.isSupportNativeJsBridge = !!g,
              c(8).init(b),
              c(9).init(b),
              c(11).init(b),
              g ? b.isDesktop ? 3 < parseInt(b.nativeJsBridgeVersion.replace(/\./g, "")) ? !a.__hasQingDesktop && c.e(1).then(function() {
                c.i(d.a)("Load Desktop"),
                  c(5)
              }
                .bind(null, c)).catch(c.oe) : !a.__hasQingDesktopLE3 && c.e(3).then(function() {
                c.i(d.a)("Load Desktop LE 0.0.3"),
                  c(4)
              }
                .bind(null, c)).catch(c.oe) : b.checkVersion("0.9.50") ? !a.__hasQingMobile && c.e(0).then(function() {
                c.i(d.a)("Load Mobile"),
                  c(7)
              }
                .bind(null, c)).catch(c.oe) : !a.__hasQingMobile && c.e(2).then(function() {
                c.i(d.a)("Load Mobile Early"),
                  c(6)
              }
                .bind(null, c)).catch(c.oe) : b.isWX
          }
        }
      )(window)
    },
    10: function(a, b) {
      "use strict";
      var c = Array.from;
      b.a = c ? c : function(a) {
        for (var b = a.length, c = [], d = 0; d < b; d++)
          c.push(a[d]);
        return c
      }
    },
    11: function(a, b) {
      "use strict";
      Object.defineProperty(b, "__esModule", {
        value: !0
      }),
        b.init = function(a) {
          c.XuntongJSBridge = {
            call: function(b) {
              var c = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}
                , d = arguments[2];
              d && (c.complete = d),
                a.call(b, c)
            }
          }
        }
      ;
      var c = window
    },
    27: function(a, b, c) {
      a.exports = c(1)
    },
    3: function(a, b) {
      "use strict";
      b.c = function(a) {
        var b = a.jsApiList
          , d = {};
        (b || []).forEach(function(a) {
          e[a] && (d[a] = !0)
        });
        var f = a.success;
        a.success = function(a, b) {
          if (a.success)
            for (var c in d)
              a.data[c] = !0;
          f && f(a, b)
        }
          ,
          c._bridge.checkJsApi(a)
      }
        ,
        b.a = function(a, b, c, g) {
          b && (d[a] = b,
          c && (e[a] = !0),
          g && (f[a] = !0))
        }
        ,
        b.b = function(a) {
          var b = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}
            , e = d[a];
          if (e) {
            var g = e(b);
            g && (a = g.name,
              b = g.params)
          }
          f[a] || c._bridge.call(a, b)
        }
      ;
      var c = window.qing
        , d = {}
        , e = {}
        , f = {}
    },
    8: function(a, b, c) {
      "use strict";
      Object.defineProperty(b, "__esModule", {
        value: !0
      });
      var d = c(0)
        , e = c(10)
        , f = c(3);
      b.init = function(a) {
        var b = document
          , h = [];
        a.once = function(b, c) {
          a.on(b, function d() {
            a.off(b, d),
            c && c()
          })
        }
        ;
        var i = a.ready = a._bridge ? function(a) {
            a && a()
          }
          : function(a) {
            b.addEventListener("QingReady", function c() {
              a(),
                b.removeEventListener("QingReady", c)
            })
          }
        ;
        a.config = function(b) {
          a.debug = !!b.debug,
            i(function() {
              a._bridge.config(b)
            }),
            (b.jsEventList || []).forEach(function(b) {
              -1 != h.indexOf(b) || (h.push(b),
                a.on(b, function(a) {
                  g(b, {
                    data: a
                  })
                }))
            })
        }
          ,
          a.error = function(b) {
            a.on("error", b)
          }
        ;
        var j = ["call", "off", "on", "checkJsApi", "trigger"];
        j.forEach(function(b) {
          a[b] = function() {
            var d = c.i(e.a)(arguments);
            i(function() {
              a[b].apply(a, d),
                d = null
            })
          }
        }),
          i(function() {
            c.i(d.a)("Ready"),
              a.isReady = !0;
            var b = a._bridge;
            j.forEach(function(c) {
              a[c] = b[c]
            }),
              a.call = f.b,
              a.checkJsApi = f.c,
              a.ready = function(a) {
                a && a()
              }
          }),
          a.error = function(b) {
            a.on("error", b)
          }
          ,
          a.checkVersion = function(b) {
            var c = a.nativeJsBridgeVersion;
            if (!c || "string" != typeof b)
              return !1;
            if (c == b)
              return !0;
            for (var d = c.split("."), e = b.split("."), f = Math.max(d.length, e.length), g = 0; g < f; g++) {
              var h = ~~e[g]
                , i = ~~d[g];
              if (h < i)
                return !0;
              if (h > i)
                return !1
            }
          }
      }
      ;
      var g = function(a, b) {
        var c = document.createEvent("HTMLEvents");
        if (b)
          for (var d in b)
            c[d] = b[d];
        c.initEvent(a),
          document.dispatchEvent(c)
      }
    },
    9: function(a, b, c) {
      "use strict";
      function d(a) {
        return a.replace(/(^|;|\s*)deviceName\s*:[^;]*(;|$)/i, ";")
      }
      Object.defineProperty(b, "__esModule", {
        value: !0
      }),
        c.d(b, "init", function() {
          return e
        });
      var e = function(a) {
        var b = d(navigator.userAgent.toLowerCase() || "")
          , c = navigator.vendor && navigator.vendor.toLowerCase() || ""
          , e = navigator.appVersion.toLowerCase() || ""
          , f = a.isWX = /micromessenger/i.test(b)
          , g = a.isChrome = /chrome|chromium/i.test(b) && /google inc/.test(c)
          , h = a.isFirefox = /firefox/i.test(b)
          , i = a.isOpera = /^Opera\//.test(b) || /\x20OPR\//.test(b)
          , j = a.isSafari = /safari/i.test(b) && /apple computer/i.test(c)
          , k = a.isIe = function(a) {
          return a ? 11 <= a ? "ActiveXObject"in window : new RegExp("msie " + a).test(b) : /msie/i.test(b) || "ActiveXObject"in window
        }
          , l = a.isIphone = /iphone/i.test(b)
          , m = a.isIpad = /ipad/i.test(b)
          , n = a.isIpod = /ipod/i.test(b)
          , o = a.isIos = l || m || n
          , p = a.isAndroid = /android/i.test(b)
          , q = a.isAndroidPhone = p && /mobile/i.test(b)
          , r = a.isAndroidTablet = p && !/mobile/i.test(b)
          , s = a.isBlackberry = /blackberry/i.test(b)
          , t = a.isCoolpad = /coolpad/i.test(b)
          , u = a.isMac = /mac/i.test(e)
          , v = a.isWindows = /win/i.test(e)
          , w = a.isWindowsPhone = v && /phone/i.test(b)
          , x = a.isWindowsTablet = v && !w && /touch/i.test(b)
          , y = a.isMobile = l || n || q || s || w || t
          , z = a.isTablet = m || r || x
          , A = a.isDesktop = !y && !z
          , B = a.isTouchDevice = "ontouchstart"in window || "DocumentTouch"in window && document instanceof DocumentTouch
      }
    }
  })
}
