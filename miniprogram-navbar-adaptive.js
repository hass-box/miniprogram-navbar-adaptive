function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return "";
}

var title = decodeURIComponent(getQueryVariable("title"));
var origin = decodeURIComponent(getQueryVariable("origin"));
document.title = title;
try {
  window.originalTitle = title;
  Object.defineProperty(document, "title", {
    get: function () {
      return originalTitle;
    },
    set: function () {},
  });
} catch (e) {}

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.src = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js";
document.head.appendChild(script);
script.onload = function () {
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      var style = getComputedStyle(document.body);
      var headerTextColor = style.getPropertyValue("--app-header-text-color");
      var headerBackgroundColor = style.getPropertyValue("--app-header-background-color");
      wx.miniProgram.postMessage({ data: { headerTextColor, headerBackgroundColor, origin } });
    }
  });
};
