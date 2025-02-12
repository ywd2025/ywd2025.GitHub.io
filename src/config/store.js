/*
 * @Author: 张慧茜 921879459@qq.com
 * @Date: 2023-12-11 17:22:24
 * @LastEditors: 张慧茜 921879459@qq.com
 * @LastEditTime: 2024-03-26 14:59:28
 * @FilePath: \天晟交易所\src\config\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";
import Api from "./api";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    member: null,
    lang: "zh_cn",
    exchangeSkin: "night",
    loginTimes: null,
    count: 0,
    allRate: [],
    pricingStatusRate: 0,
    hot_coin: [],
    pageTagsList: [],
    exchangePageTagsList: [],
    pricing: "CNY",
    swapCoin: "",
    exchangeCoin: "",
    newallCoinSwap: [],
    newallCoinExchange: [],
  },
  getters: {
    member(state) {
      return state.member;
    },
    isLogin(state) {
      return state.member != null;
    },
    lang(state) {
      return state.lang;
    },
    loginTimes(state) {
      return state.loginTimes;
    },
  },
  mutations: {
    LOGOUT(state) {
      // 清除用户状态
      state = {
        member: null,
        lang: "zh_cn",
        exchangeSkin: "night",
        loginTimes: null,
        count: 0,
        allRate: [],
        pricingStatusRate: 0,
        hot_coin: [],
        pageTagsList: [],
        exchangePageTagsList: [],
        swapCoin: "",
        exchangeCoin: "",
        newallCoinSwap: [],
        newallCoinExchange: [],
      };
      localStorage.clear();
      // 你可以在这里清除其他状态
    },
    getAllCoinSwap(state, newallCoinSwap) {
      state.newallCoinSwap = newallCoinSwap;
    },
    getAllCoinExchange(state, newallCoinExchange) {
      state.newallCoinExchange = newallCoinExchange;
    },
    getswapCoin(state, swapCoin) {
      state.swapCoin = swapCoin;
    },
    getexchangeCoin(state, exchangeCoin) {
      state.exchangeCoin = exchangeCoin;
    },
    setMember(state, member) {
      state.member = member;
      localStorage.setItem("MEMBER", JSON.stringify(member));
    },
    recoveryMember(state) {
      state.member = null;
    },
    setlang(state, lang) {
      state.lang = lang;
      localStorage.setItem("LANGUAGE", lang);
    },
    setPricing(state, pricing) {
      state.pricing = pricing;
      localStorage.setItem("pricingStatus", pricing);
    },
    initLang(state) {
      if (localStorage.getItem("LANGUAGE") == null) {
        localStorage.setItem("LANGUAGE", state.lang);
      } else {
        state.lang = localStorage.getItem("LANGUAGE");
      }
    },
    initLoginTimes(state) {
      if (localStorage.getItem("LOGINTIMES") == null) {
        state.loginTimes = 0;
      } else {
        state.loginTimes = JSON.parse(localStorage.getItem("LOGINTIMES"));
      }
    },
    setLoginTimes(state, times) {
      state.loginTimes = times;
      localStorage.setItem("LOGINTIMES", JSON.stringify(times));
    },
    setSkin(state, skin) {
      state.exchangeSkin = skin;
    },
    increment(state) {
      state.count++;
    },
    setAllRate(state, allRate) {
      // 1. 存所有的汇率 allRate
      state.allRate = allRate;
      // 2. 存当前计价方式的汇率 pricingStatusRate
      const pricingStatus = localStorage.getItem("pricingStatus");
      const rateMap = {
        CNY: "usdtCnyRate",
        TRY: "usdTryRate",
        VND: "usdVndRate",
        JPY: "usdJpyRate",
        RUB: "usdRubRate",
        UAH: "usdUahRate",
        EUR: "usdEurRate",
      };

      // 判断并设置当前计价方式的汇率
      if (pricingStatus === "USD") {
        state.pricingStatusRate = 1;
      } else if (rateMap[pricingStatus]) {
        state.pricingStatusRate = allRate[0][rateMap[pricingStatus]];
      } else {
        state.pricingStatusRate = null; // 或者设置一个默认值
      }
    },
    // 币种的历史搜搜记录
    get_hot_coin(state, data) {
      if (state.hot_coin.indexOf(data) == -1) {
        if (state.hot_coin.length >= 10) {
          state.hot_coin.pop();
          state.hot_coin.unshift(data);
        } else {
          state.hot_coin.unshift(data);
        }
      } else {
        state.hot_coin.splice(state.hot_coin.indexOf(data), 1);
        state.hot_coin.unshift(data);
      }
    },
    // 清历史记录
    clear_Hot_Coin(state) {
      state.hot_coin = [];
    },
    removeTag(state, name) {
      state.pageTagsList.forEach((item, index) => {
        if (item === name) {
          state.pageTagsList.splice(index, 1);
        }
      });
    },
    addPage(state, data) {
      if (state.pageTagsList.indexOf(data) == -1) {
        state.pageTagsList.push(data);
      }
    },
    removeExchangeTag(state, name) {
      state.exchangePageTagsList.forEach((item, index) => {
        if (item === name) {
          state.exchangePageTagsList.splice(index, 1);
        }
      });
    },
    addExchangePage(state, data) {
      if (state.exchangePageTagsList.indexOf(data) == -1) {
        state.exchangePageTagsList.push(data);
      }
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    // 汇率汇率汇率  this.$store.dispatch("getAllRateActions"); 调用方法
    getAllRateActions(context) {
      Vue.http.get(Api.baseUrl + Api.finance.getAllRateApi, {}).then((res) => {
        // 获取所有汇率, 分发
        context.commit("setAllRate", res.data.data);
      });
    },
  },
  plugins: [
    createPersistedState({
      // 配置选项，例如指定存储的 key 和存储引擎
      storage: window.localStorage,
      key: "vuex-store", // 你可以自定义这个 key
    }),
  ],
});
