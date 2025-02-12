/*
 * @Author: toString
 * @Date: 2023-12-15 14:19:12
 * @LastEditTime: 2024-03-26 10:19:18
 * @LastEditors: 张慧茜 921879459@qq.com
 * @Description:
 * @FilePath: \lianghua-uniapp\src\locale\index.ts
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
const i18n = new VueI18n({
  // legacy: false,
  locale: localStorage.getItem("LANGUAGE") || "zh_cn",
  // globalInjection: true,
  messages: {
    zh_cn: require("./zh_CN.js"), //中文
    tw_cn: require("./TW_CN.js"), //中文繁体
    en_us: require("./en_US.js"), //英
    ko_kr: require("./ko_KR.js"), //韩
    jp_jp: require("./jp_JP.js"), //日
  },
  silentTranslationWarn: true,
});
// console.log(i18n);
export { i18n };
