// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import routes from "./config/routes.js";
import store from "./config/store.js";
import VueRouter from "vue-router";
import vueResource from "vue-resource";
import VueI18n from "vue-i18n";
import MqttService from "./utils/mqtt.js";
import CryptoJS from "crypto-js";
Vue.use(VueI18n);
import { i18n } from "./assets/lang";
import "./assets/css/common.less";
import iView from "iview";
import "iview/dist/styles/iview.css";
import util from "./assets/js/util.js";
import "swiper/dist/css/swiper.css";
import "./assets/icons/iconfont.css";
import App from "./App.vue";
import Api from "./config/api";

var moment = require("moment");
var momentTimezone = require("moment-timezone");

// import ViewUI from "view-design";
import "./my-theme/index.less";
// Vue.use(ViewUI, { locale });
import mixin from "./mixin";
Vue.prototype.$imgURL = "@/assets/images/";
Vue.mixin(mixin);
import locale from "view-design/dist/locale/en-US";
import { Swipe, SwipeItem } from "vant";
import "vant/lib/swipe/style";
import "vant/lib/swipe-item/style";
Vue.use(iView)
  .use(Swipe)
  .use(SwipeItem);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.prototype.host = Api.baseUrl;
Vue.prototype.$imgUrl = Api.imgUrl;

Vue.prototype.api = Api;
// Vue.prototype.imageUrl = Vue.prototype.host + "/uc/upload/local/image";

Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "Content-Type": "application/json;charset=utf-8",
  equipment: "PC",
};

const router = new VueRouter({
  mode: "hash",
  routes,
});

iView.LoadingBar.config({
  color: "#F90",
  failedColor: "#f0ad4e",
  height: 2,
});
iView.Message.config({
  top: 150,
  duration: 3,
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  iView.LoadingBar.finish();
});

Vue.http.interceptors.push((request, next) => {
  // !request.url.includes("http") && (request.url = Api.a.baseUrl + request.url);
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  if (request.noHeader) {
  } else {
    var currentTime = Date.now();
    request.headers.set("access-auth-token", localStorage.getItem("TOKEN"));
    if (
      request.url != "/uc/login" &&
      request.url != "/mqtts/exchange/exchange-rate/getAllRate"
    ) {
      if (request.body) {
        if (!objectToQueryString(request.body)) {
          var code = localStorage.getItem("salt");
        } else {
          var code =
            objectToQueryString(request.body) +
            "&" +
            localStorage.getItem("salt");
        }
        if (code) {
          code = escapeAmpersand(code);
          code = escapeEquals(code);
        }
        request.headers.set("signature", CryptoJS.SHA256(code).toString());
        request.headers.set("nonce", generateRandomString(8));
        request.headers.set("timestamp", currentTime.toString());
      } else if (request.params) {
        if (!objectToQueryString(request.params)) {
          var code = localStorage.getItem("salt");
        } else {
          var code =
            objectToQueryString(request.params) +
            "&" +
            localStorage.getItem("salt");
        }
        if (code) {
          code = escapeAmpersand(code);
          code = escapeEquals(code);
        }
        request.headers.set("signature", CryptoJS.SHA256(code).toString());
        request.headers.set("nonce", generateRandomString(8));
        request.headers.set("timestamp", currentTime.toString());
      }
    }
  }
  let lang = localStorage.getItem("LANGUAGE");
  request.headers.set("lang", lang);
  next((response) => {
    if (response.data.code == "4000") {
      store.commit("LOGOUT");
      store.commit("setMember", null);
      localStorage.clear();
      router.push("/login");
      return false;
    }
    return response;
  });
});

Vue.config.productionTip = false;

Vue.filter("timeFormat", function(tick) {
  return moment(tick).format("HH:mm:ss");
});

Vue.filter("dateFormat", function(tick) {
  return moment(tick).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("toFixed", function(number, scale) {
  return new Number(number).toFixed(scale);
});

Vue.filter("toPercent", function(point) {
  var str = Number(point * 100).toFixed(1);
  str += "%";
  return str;
});
function objectToQueryString(obj) {
  const keys = Object.keys(obj).sort();
  const pairs = keys.map(
    (key) =>
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(obj[key] == 0 || obj[key] ? obj[key] : "")
  );
  return pairs.join("&");
}
// 随机字符串
function generateRandomString(length) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  var result = "";
  var charactersLength = chars.length;
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function escapeAmpersand(str) {
  return str.replace(/&/g, "%26");
}
function escapeEquals(str) {
  return str.replace(/=/g, "%3D");
}
function toFloor(number, scale = 8) {
  if (new Number(number) == 0) {
    return 0;
  }
  var __str = number + "";
  if (__str.indexOf("e") > -1 || __str.indexOf("E") > -1) {
    var __num = new Number(number).toFixed(scale + 1),
      __str = __num + "";
    return __str.substring(0, __str.length - 1);
  } else if (__str.indexOf(".") > -1) {
    if (scale == 0) {
      return __str.substring(0, __str.indexOf("."));
    }
    return __str.substring(0, __str.indexOf(".") + scale + 1);
  } else {
    return __str;
  }
}
Vue.filter("toFloor", (number, scale) => {
  return toFloor(number, scale);
});
Vue.prototype.toFloor = toFloor;

Vue.prototype.getTimezone4K = function() {
  var curlang = this.$store.getters.lang;
  if (curlang == "zh_cn") {
    return "Asia/Shanghai";
  }
  if (curlang == "tw_cn") {
    return "Asia/Taipei";
  }
  if (curlang == "en_us") {
    return "America/New_York";
  }
  if (curlang == "jp_jp") {
    return "Asia/Tokyo";
  }
  if (curlang == "ko_kr") {
    return "Asia/Seoul";
  }
  return curlang;
};
Vue.prototype.getLang4K = function() {
  var curlang = this.$store.getters.lang;
  if (curlang == "zh_cn") {
    return "zh";
  }
  if (curlang == "tw_cn") {
    return "zh_TW";
  }
  if (curlang == "en_us") {
    return "en";
  }
  if (curlang == "jp_jp") {
    return "ja";
  }
  if (curlang == "ko_kr") {
    return "ko";
  }
  return curlang;
};
Vue.prototype.timeFormat = function(tick) {
  return momentTimezone(tick)
    .tz(this.getTimezone4K())
    .format("HH:mm:ss");
};
Vue.prototype.dateFormat = function(tick) {
  return momentTimezone(tick)
    .tz(this.getTimezone4K())
    .format("YYYY-MM-DD HH:mm:ss");
};
Vue.prototype.dateFormatHM = function(tick) {
  return momentTimezone(tick)
    .tz(this.getTimezone4K())
    .format("YYYY-MM-DD HH:mm");
};
Vue.prototype.dateFormatFromString = function(tick) {
  var timestamp = momentTimezone(tick)
    .tz("Asia/Shanghai")
    .valueOf();
  return momentTimezone(timestamp)
    .tz(this.getTimezone4K())
    .format("YYYY-MM-DD HH:mm:ss");
};
const mqttService = new MqttService(Api);
Vue.prototype.$mqttService = mqttService;
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  template: "<App/>",
  components: { App },
});
