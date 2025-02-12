<template>
  <!-- 首页 -->
  <div class="page-view">
    <div class="page-content">
      <!-- 导航栏 -->
      <div class="layout">
        <div class="layout-ceiling">
          <!-- logo -->
          <div class="layout-logo">
            <!-- 首页 -->
            <router-link to="/">
              <img
                :src="$imgUrl + '/logos/logo-long-transparent.png'"
                alt=""
                class="logo"
              />
            </router-link>
          </div>
          <div class="layout-ceiling-main" style="margin-left: 140px">
            <!-- 导航条 -->
            <div class="header_nav">
              <!-- 活動專區 -->
              <HeaderAllPoptip
                :openCycle="openCycle"
                :openC2c="openC2c"
                :openFlash="openFlash"
              />
              <Menu
                :active-name="activeNav"
                mode="horizontal"
                width="auto"
                :open-names="['1']"
              >
                <router-link to="/markets">
                  <MenuItem name="nav-markets">{{
                    $t("new.universal.market")
                  }}</MenuItem>
                </router-link>
                <MenuItem name="nav-swap">
                  <HeaderSwap
                    :openSwap="openSwap"
                    :name="$t('new.universal.contractTrading')"
                    :toUrl="'/swap'"
                  />
                </MenuItem>
                <MenuItem name="nav-exchange">
                  <HeaderSwap
                    :openSwap="'1'"
                    :name="$t('new.universal.spotTrading')"
                    :toUrl="'/exchange'"
                  />
                </MenuItem>
                <router-link to="/follow">
                  <MenuItem name="nav-follow">{{
                    $t("new.header.follow")
                  }}</MenuItem>
                </router-link>
                <MenuItem name="nav-active">
                  <HeaderActive :openCycle="openCycle" />
                </MenuItem>
              </Menu>
            </div>
            <div class="header_nav" style="float: right; margin-left: 10px">
              <HeaderInput v-if="currentPath == '/'" />
              <!-- 登录 -->
              <HeaderLogin />
              <!-- 下载 -->
              <HeaderDownload />
              <HeaderLang />
              <Icon
                type="ios-moon-outline"
                size="20"
                color="#000"
                style="margin-left: 20px;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="router_view">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>
    <template>
      <BackTop :bottom="50"></BackTop>
    </template>
  </div>
</template>
<script>
import HeaderActive from "@/components/header/headerActive.vue";
import HeaderAllPoptip from "@/components/header/headerAllPoptip.vue";
import HeaderSwap from "@/components/header/headerSwap.vue";
import HeaderLang from "@/components/header/headerLang.vue";
import HeaderDownload from "@/components/header/headerDownload.vue";
import HeaderLogin from "@/components/header/headerLogin.vue";
import HeaderInput from "@/components/header/headerInput.vue";
export default {
  name: "app",
  components: {
    HeaderAllPoptip,
    HeaderSwap,
    HeaderActive,
    HeaderLang,
    HeaderDownload,
    HeaderLogin,
    HeaderInput,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      v_auto: [], //权限控制
      openC2c: 0,
      openSwap: 0,
      openFlash: 0,
      openCycle: 0,
      openSwap_fellow: 0,
      // 計價方式
      pricingStatus: localStorage.getItem("locale"),
      isRouterAlive: true,
      // activeWidth: window.innerWidth,
      // utc: null,
      // navDrawerModal: false,
      // allData: {},
      coinlist: [], // 合约
      newCoinListL: [],
      newCoinListv: [],
      allCoinExchange: [], // 现货
      newallCoinExchangeL: [],
      newallCoinExchangev: [],
    };
  },
  watch: {
    activeNav: function() {
      switch (this.activeNav) {
        case "nav-index":
          window.document.title =
            (this.lang == "zh_cn" ? "首页" : "HOME") + " - SE";
          break;
        case "nav-markets":
          window.document.title =
            (this.lang == "zh_cn" ? "行情" : "MARKET") + " - SE";
          break;
        case "nav-swap":
          window.document.title =
            (this.lang == "zh_cn" ? "合约交易" : "CONTRACT") + " - SE";
          break;
        case "nav-exchange":
          window.document.title =
            (this.lang == "zh_cn" ? "现货交易" : "SPOT") + " - SE";
          break;
        case "nav-active":
          window.document.title =
            (this.lang == "zh_cn" ? "活动中心" : "ACTIVITY") + " - SE";
          break;
        case "nav-follow":
          window.document.title =
            (this.lang == "zh_cn" ? "跟单" : "FOLLOW") + " - SE";
          break;
        default:
          window.document.title = "SE";
          break;
      }
    },
  },
  computed: {
    activeNav: function() {
      return this.$store.state.activeNav;
    },
    lang() {
      return this.$store.state.lang;
    },
    currentPath() {
      return this.$route.path;
    },
  },
  created: function() {
    // 存个默认的计价方式
    if (!localStorage.getItem("pricingStatus")) {
      localStorage.setItem("pricingStatus", "CNY");
    }
    // 更新汇率
    this.$store.dispatch("getAllRateActions");
    localStorage.setItem("LANGUAGE", this.lang);
    this.initialize();
    this.getDataList();
    this.getmarketList();
    this.initMqtt();
    zE("webWidget", "hide");
    // var d = new Date(),
    // gmtHours = d.getTimezoneOffset() / 60;
    // this.utc = "GMT " + (gmtHours > 0 ? "-" : "+") + " " + String(gmtHours)[1];
    this.getAuto();
    // 隐藏加载层
    let initLoading = document.getElementById("initLoading");
    if (initLoading != null) {
      document.body.removeChild(initLoading);
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    initialize() {
      this.$store.commit("initLang");
      this.$store.commit("initLoginTimes");
    },
    go_pages(url) {
      this.$router.push(url);
    },
    // 判断权限
    getAuto() {
      this.$http
        .post(this.host + this.api.login.configQuery, {})
        .then((res) => {
          this.v_auto = res.body.data[0];
          this.v_auto.forEach((item) => {
            if (item.alia == "c2c_allow") {
              this.openC2c = item.val;
            }
            if (item.alia == "swap_allow") {
              this.openSwap = item.val;
            }
            if (item.alia == "flash_allow") {
              this.openFlash = item.val;
            }
            if (item.alia == "cycle_allow") {
              this.openCycle = item.val;
            }
            if (item.alia == "swap_fellow_allow") {
              this.openSwap_fellow = item.val;
            }
          });
        });
    },
    getDataList() {
      this.$http
        .post(this.host + this.api.markets.swapThumb, {})
        .then((res) => {
          this.coinlist = res.body;
          for (var i = 0; i < this.coinlist.length; i++) {
            var coin = this.coinlist[i];
            coin.base = this.coinlist[i].symbol.split("/")[1];
            this.newCoinListv[coin.base] = [];
            this.newCoinListL = [];
          }
          for (var i = 0; i < this.coinlist.length; i++) {
            var coinlist = this.coinlist[i];
            coinlist.price = this.coinlist[i].close = this.coinlist[
              i
            ].close.toFixed(6);
            coinlist.rose =
              this.coinlist[i].chg > 0
                ? "+" + this.coinlist[i].chg.toFixed(2) + "%"
                : this.coinlist[i].chg.toFixed(2) + "%";
            // herf
            coinlist.coin = this.coinlist[i].symbol.split("/")[0];
            coinlist.base = this.coinlist[i].symbol.split("/")[1];
            coinlist.href = (coinlist.coin + "_" + coinlist.base).toLowerCase();
            coinlist.tourl = "/swap/" + coinlist.href;
            this.newCoinListL.push(coinlist);
            this.newCoinListv[coinlist.symbol] = coinlist;
          }
        });
    },
    getmarketList() {
      this.$http
        .post(this.host + this.api.markets.marketThumb, {})
        .then((res) => {
          this.allCoinExchange = res.data.data;
          for (var i = 0; i < this.allCoinExchange.length; i++) {
            var coin = this.allCoinExchange[i];
            coin.base = this.allCoinExchange[i].symbol.split("/")[1];
            this.newallCoinExchangev[coin.base] = [];
            this.newallCoinExchangeL = [];
          }
          for (var i = 0; i < this.allCoinExchange.length; i++) {
            var coinlist = this.allCoinExchange[i];
            coinlist.price = this.allCoinExchange[
              i
            ].close = this.allCoinExchange[i].close.toFixed(6);
            coinlist.rose =
              this.allCoinExchange[i].chg > 0
                ? "+" + this.allCoinExchange[i].chg.toFixed(2) + "%"
                : this.allCoinExchange[i].chg.toFixed(2) + "%";
            coinlist.coin = this.allCoinExchange[i].symbol.split("/")[0];
            coinlist.base = this.allCoinExchange[i].symbol.split("/")[1];
            coinlist.href = (coinlist.coin + "_" + coinlist.base).toLowerCase();
            coinlist.tourl = "/exchange/" + coinlist.href;
            this.newallCoinExchangeL.push(coinlist);
            this.newallCoinExchangev[coinlist.symbol] = coinlist;
          }
        });
    },
    getCoin(symbol) {
      return this.newCoinListv[symbol];
    },
    getExchangeCoin(symbol) {
      return this.newallCoinExchangev[symbol];
    },
    initMqtt() {
      this.$mqttService.initMqtts().then((client) => {
        var that = this;
        client.subscribe("contract-thumb/#", function(err, message) {
          if (!err) {
            client.on("message", (topic, message) => {
              let parts = topic.split("/");
              let firstPart = parts.shift();
              if (firstPart == "contract-thumb") {
                var resp = JSON.parse(message);
                var coin = that.getCoin(resp.symbol);
                that.$store.commit("getAllCoinSwap", that.newCoinListL);
                if (coin != null) {
                  coin.price = resp.close;
                  coin.rose =
                    resp.chg > 0
                      ? "+" + resp.chg.toFixed(2) + "%"
                      : resp.chg.toFixed(2) + "%";
                  coin.close = resp.close;
                  coin.high = resp.high;
                  coin.low = resp.low;
                  coin.turnover = parseInt(resp.volume);
                  coin.volume = resp.volume;
                  coin.usdRate = resp.usdRate;
                  coin.change = resp.change;
                }
              }
            });
          } else {
            console.log("订阅失败");
          }
        });
        client.subscribe("exchange-thumb/#", function(err, message) {
          if (!err) {
            client.on("message", (topic, message) => {
              let parts = topic.split("/");
              let firstPart = parts.shift();
              that.$store.commit(
                "getAllCoinExchange",
                that.newallCoinExchangeL
              );
              if (firstPart == "exchange-thumb") {
                var resp = JSON.parse(message);
                var coin = that.getExchangeCoin(resp.symbol);
                if (coin != null) {
                  coin.price = resp.close;
                  coin.rose =
                    resp.chg > 0
                      ? "+" + resp.chg.toFixed(2) + "%"
                      : resp.chg.toFixed(2) + "%";
                  coin.close = resp.close;
                  coin.high = resp.high;
                  coin.low = resp.low;
                  coin.turnover = parseInt(resp.volume);
                  coin.volume = resp.volume;
                  coin.usdRate = resp.usdRate;
                }
              }
            });
          } else {
            console.log("订阅失败");
          }
        });
      });
    },
  },
  beforeDestroy() {
    //断开连接
    this.$mqttService.disconnect();
  },
};
</script>

<style lang="less" scoped>
@import "./assets/css/newui.css";
.page-view {
  width: 100%;
  min-width: 1080px;
  height: 100%;
  .page-content {
    min-height: 100%;
    .layout {
      min-width: 1080px;
      width: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 998;
      .layout-ceiling {
        padding: 5px 20px;
        background: #fff;
        border: 1px solid #f6f6f6;
        box-sizing: border-box;
        .layout-logo {
          width: auto;
          height: 40px;
          background-size: 100% 100%;
          float: left;
          z-index: 10;
          .logo {
            height: 100%;
            width: auto;
            margin-top: 5px;
          }
        }
        .layout-ceiling-main {
          height: 50px;
          line-height: 50px;
          color: #000;
          .header_nav {
            height: 100%;
            .ivu-menu {
              .ivu-menu-item {
                font-weight: 400;
                font-size: 15px;
                color: #000000;
                border-bottom: 0 !important;
                text-align: center;
              }
            }

            .ivu-menu-vertical.ivu-menu-light {
              background: none;

              &:after {
                width: 0;
              }
            }
          }
        }
        // .rightwrapper {
        //   float: right;

        //   .appdownload {
        //     float: left;
        //     // padding: 0 20px;
        //     padding-right: 0px;

        //     .ivu-poptip-rel {
        //       a {
        //         color: #828ea1;
        //       }

        //       i.ivu-icon.ivu-icon-arrow-down-b {
        //         margin-left: 5px;
        //       }
        //     }
        //   }

        //   .ivu-dropdown-rel a {
        //     color: #fff;
        //   }

        //   .ivu-select-dropdown {
        //     z-index: 901;
        //   }

        //   .changelanguage {
        //     float: left;

        //     .languagelogo {
        //       float: left;
        //       padding-top: 5px;
        //       height: 45px;
        //       padding-left: 15px;
        //       margin-right: 12px;
        //     }
        //   }
        // }
      }
    }
    .router_view {
      padding-top: 12px;
    }
  }
}

.header_nav {
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header_nav {
}
.ivu-poptip-popper {
  z-index: 999;
}
.ivu-menu {
  z-index: 0;
}

.header_nav {
  .ivu-poptip-body {
    padding: 0px !important;
  }
}
.ivu-table:after {
  content: none;
}

.ivu-table-filter-list .ivu-table-filter-select-item {
  color: #ccc;

  &:hover {
    background-color: #27313e;
    color: #03c59e;
  }
}

.ivu-table-filter-list .ivu-table-filter-select-item-selected {
  color: #03c59e;

  &:hover {
    color: #03c59e;
  }
}

.ivu-table-filter i.on {
  color: #fff;
}

//tips
.ivu-message {
  color: #333;
}

/* 多选框 */
.exchange .ivu-checkbox-checked .ivu-checkbox-inner {
  background-color: #03c59e;
  border-color: #03c59e;
}

/* modal */
.ivu-modal-confirm-head {
  text-align: center;
  margin-bottom: 15px;
}

.ivu-modal-body {
  border-radius: 5px;

  .ivu-modal-confirm {
    .ivu-modal-confirm-body {
      font-size: 14px;
    }
  }
}

.ivu-modal-confirm-footer .ivu-btn-primary {
  background-color: #35E9C5;
  border-color: #35E9C5;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: none;

  &:after {
    background: none;
  }
}

.ivu-carousel-dots li button {
  width: 30px;
  height: 10px;
  border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: #18202a;
}

#checkbox {
  width: 10px;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}

.ivu-select-dropdown a {
  width: 100%;
  text-align: left;
  margin: 0;
  height: 20px;
  line-height: 20px;
}

.ivu-dropdown-item img {
  width: 14px;
  vertical-align: middle;
}

.ivu-radio-inner:after {
  background: #18202a;
}

#qrcode canvas {
  width: 120px;
}

#qrcode img {
  width: 100%;
}

.changelanguage {
  .ivu-dropdown {
    .ivu-select-dropdown {
      z-index: 901;
    }
  }
}

.ivu-tooltip-inner {
  background: #394559;
}

.ivu-tooltip-arrow {
  border-bottom-color: #394559;
}

.ivu-notice-notice {
  background: #21364d;
}

.ivu-notice-title {
  color: #ffffff;
}

.ivu-notice-desc {
  color: #ffffff;
}

.ivu-menu-light {
  background: transparent !important;
}

.ivu-spin-fullscreen-wrapper {
  background: #46597a70 !important;
}

.ivu-spin {
  color: #03c59e !important;
}

.ivu-poptip-title-inner {
  color: #ccc;
  font-size: 14px;
}

.ivu-poptip-title:after {
  background-color: #394253;
}

.page {
  text-align: right;
  margin-top: 10px;

  .ivu-page {
    .ivu-page-prev,
    .ivu-page-next {
      background: transparent !important;
      color: #000;
      border: none;
    }

    .ivu-page-item {
      background-color: transparent !important;
      color: #000;
      border: none;
    }
  }
}

.ivu-progress-bg {
  border-radius: 0 !important;
  background-color: #ff8100;
  max-width: 100%;
}

.ivu-progress-success .ivu-progress-bg {
  background-color: #ff8100 !important;
}

// .header_nav_mobile
//   .ivu-drawer-wrap
//   .ivu-drawer-no-header
//   .ivu-drawer-content
//   .ivu-drawer-body {
//   background: #2b323a;
//   padding-top: 60px;
// }

// .header_nav_mobile .ivu-menu-vertical.ivu-menu-light:after {
//   background: transparent !important;
// }

// .header_nav_mobile
//   .ivu-menu-light.ivu-menu-vertical
//   .ivu-menu-item-active:not(.ivu-menu-submenu) {
//   color: #03C59E;
// }



</style>
