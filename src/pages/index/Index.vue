<template>
  <div>
    <div id="fullpage">
      <div class="top-panel">
        <div class="top_content">
          <div class="top_left">
            <div class="top_title">
              <span class="top_title_se">{{ $t("common.name") }}</span>
              <span class="top_title_shou">{{ $t("newUi.text21") }}</span>
            </div>
            <div class="top_title_rowOne">
              {{ $t("newUi.text23") }}
            </div>
            <div class="top_title_rowTwo">
              {{ $t("newUi.text22") }}
            </div>
            <div class="input_button">
              <div class="input_button_left" v-if="!isLogin">
                <input
                  class="input"
                  :placeholder="$t('new.index.registerNumber')"
                />
              </div>
              <div
                class="input_button_right"
                @click="goLoginPage"
                v-if="!isLogin"
              >
                {{ $t("new.index.registerNow") }}
              </div>
              <div
                v-else
                @click="goPage('/exchange')"
                class="input_button_right"
              >
                {{ $t("new.index.tradeNow") }}
              </div>
              <img
                :src="$imgUrl + '/newUi/icon12.png'"
                alt=""
                class="iconAll"
              />
              <img
                :src="$imgUrl + '/newUi/icon11.png'"
                alt=""
                class="iconAll"
              />
              <img
                :src="$imgUrl + '/newUi/icon13.png'"
                alt=""
                class="iconAll"
                @click="go_load('download')"
              />
            </div>
            <div class="top_tips">
              <div class="top_tips_item">
                <div class="top_tips_item_left">{{ $t("newUi.text24") }}</div>
                <div class="top_tips_item_right">{{ $t("newUi.text25") }}</div>
              </div>
              <div class="top_tips_item">
                <div class="top_tips_item_left">{{ $t("newUi.text26") }}</div>
                <div class="top_tips_item_right">{{ $t("newUi.text27") }}</div>
              </div>
              <div class="top_tips_item">
                <div class="top_tips_item_left">{{ $t("newUi.text28") }}</div>
                <div class="top_tips_item_right">{{ $t("newUi.text29") }}</div>
              </div>
            </div>
          </div>
          <div class="top_right">
            <img
              :src="$imgUrl + '/newUi/home_right.gif'"
              alt=""
              class="top_right_img"
            />
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="home_notice">
        <div class="notice">
          <div class="notice_title">
            <img
              :src="$imgUrl + '/newUi/notice.png'"
              alt=""
              class="notice_title_img"
            />
          </div>
          <div class="notice_content">
            <div
              style="cursor: pointer;"
              @click="goPage('/announcement', `/${indexNotice.id}`)"
            >
              {{ indexNotice ? indexNotice.title : " " }}
            </div>
            <router-link style="color: #000" to="/notice"
              >{{ $t("new.index.more") }} ></router-link
            >
          </div>
        </div>
      </div>
      <div class="home-container">
        <!-- 輪播圖 -->
        <div class="banner-part">
          <div class="swiper" id="swiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="item in bannerList"
                :key="item.serialNumber"
              >
                <a :href="item.linkUrl" target="_blank">
                  <div class="activity-item">
                    <img
                      style="height: 160px;width: 280px;border-radius: 10px;"
                      :src="item.url"
                      alt=""
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev-unique  swiper-button-white"></div>
          <div class="swiper-button-next-unique  swiper-button-white"></div>
        </div>
        <!-- 热门交易 -->
        <!-- <HotCarouselItem /> -->
      </div>
      <!-- 行情-->
      <div class="home-container">
        <!-- 表格 -->
        <h3 class="table_title">{{ $t("new.index.marketConditions") }}</h3>
        <div class="tabs_content">
          <div
            class="tabs_item"
            :class="{ active: tabTypes === '1' }"
            @click="tabClick('1')"
          >
            {{ $t("newUi.text30") }}
          </div>
          <div
            class="tabs_item"
            :class="{ active: tabTypes === '2' }"
            @click="tabClick('2')"
          >
            {{ $t("newUi.text31") }}
          </div>
          <div
            class="tabs_item"
            :class="{ active: tabTypes === '3' }"
            @click="tabClick('3')"
          >
            {{ $t("newUi.text32") }}
          </div>
          <div
            class="tabs_item"
            :class="{ active: tabTypes === '4' }"
            @click="tabClick('4')"
          >
            {{ $t("newUi.text33") }}
          </div>
        </div>
        <div class="table_content">
          <div class="table_header">
            <div>
              <Dropdown @on-click="changeCoinType">
                {{ favorType }}
                <Icon type="ios-arrow-down"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem :name="$t('new.universal.contract')">{{
                    $t("new.universal.contract")
                  }}</DropdownItem>
                  <DropdownItem :name="$t('new.universal.spot')">{{
                    $t("new.universal.spot")
                  }}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>{{ $t("service.NewPrice") }}</div>
            <div>{{ $t("newUi.text34") }}</div>
            <div>{{ $t("new.universal.market") }}</div>
          </div>
          <div v-if="swapData.length > 0">
            <div
              class="table_item"
              v-for="(item, index) in swapData"
              :key="index"
              @click="getcurrent(item.symbol)"
            >
              <div>
                <img :src="item.coinImg" alt="" class="table_coin_img" />
                <span class="table_coin_name">{{
                  getCurrencyPairPrefix(item.symbol)
                }}</span>
                <span class="table_coin_name">USDT</span>
              </div>
              <div>{{ getFixed(item.close) }}</div>
              <div :style="{ color: item.chg < 0 ? '#ea4337' : '#15BA54' }">
                {{ item.chg }}%
              </div>
              <div v-if="favorType == $t('new.universal.contract')">
                <div
                  :key="index"
                  :id="'chart' + index"
                  :style="{
                    height: '80px',
                    width: '140px',
                    marginLeft: '160px',
                    marginTop: '2px',
                  }"
                ></div>
              </div>
              <div v-else>
                <div
                  :key="index"
                  :id="'charts' + index"
                  :style="{
                    height: '80px',
                    width: '140px',
                    marginLeft: '160px',
                    marginTop: '2px',
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div v-else class="noData">
            <noData />
          </div>
          <div class="bottom_more" @click="goPage('/markets')">
            {{ $t("new.index.more") }}
            <img
              :src="$imgUrl + '/newUi/coinMore.png'"
              alt=""
              class="coinMore"
            />
          </div>
        </div>
        <!-- 网站介绍 -->
        <h3 class="table_title">{{ $t("newUi.text35") }}</h3>
        <div class="cards_tips">{{ $t("newUi.text36") }}</div>
        <div class="cards">
          <div
            class="cards_item"
            v-for="(item, index) in cardsList"
            :key="index"
          >
            <div class="cards_item_img">
              <img :src="item.img" alt="" class="cards_item_img_img" />
            </div>
            <div class="cards_item_title">{{ item.title }}</div>
            <div class="cards_item_row">{{ item.row }}</div>
            <div class="cards_item_row">{{ item.row1 }}</div>
          </div>
        </div>
        <h3 class="table_title">{{ $t("newUi.text37") }}</h3>
        <div class="cards_goPage">
          <div
            class="cards_goPage_item"
            v-for="(item, index) in cardsGoPageList"
            :key="index"
          >
            <div class="cards_goPage_item_img">
              <img :src="item.img" alt="" class="cards_goPage_item_img_img" />
            </div>
            <div class="cards_goPage_item_right">
              <div class="cards_goPage_item_title">{{ item.title }}</div>
              <div class="cards_goPage_item_row">{{ item.row }}</div>
              <div
                class="cards_goPage_item_btn"
                @click="goPage(item.url)"
                v-if="item.url"
              >
                {{ $t("newUi.text38") }}
              </div>
            </div>
          </div>
        </div>
        <h3 class="table_title" id="download">{{ $t("newUi.text39") }}</h3>
        <div class="download_part">
          <div class="download_part_left">
            <div class="download_part_left_title">
              {{ $t("newUi.text45") }}
            </div>
            <div class="download_part_left_row">
              <div class="download_part_left_row_img">
                <img
                  :src="$imgUrl + '/newUi/downloadApp.png'"
                  alt=""
                  class="download_part_left_row_img_img"
                />
              </div>
              <div class="download_part_left_row_all">
                <div class="row_all_title">{{ $t("newUi.text40") }}</div>
                <div class="row_all_title">
                  {{ $t("newUi.text46") }}
                </div>
              </div>
            </div>
            <div class="download_part_left_b">
              <div class="download_part_left_b_all">
                <img :src="$imgUrl + '/newUi/ios.png'" alt="" />
                <div>App Store</div>
              </div>
              <div class="download_part_left_b_all">
                <img :src="$imgUrl + '/newUi/appStore.png'" alt="" />
                <div>Google Play</div>
              </div>
              <div class="download_part_left_b_all">
                <img :src="$imgUrl + '/newUi/adnder.png'" alt="" />
                <div>{{ $t("newUi.text41") }}</div>
              </div>
            </div>
          </div>
          <div class="download_part_right">
            <img
              :src="$imgUrl + '/newUi/download.png'"
              alt=""
              class="download_part_right_img"
            />
          </div>
        </div>
      </div>
      <!-- 合作夥伴 -->
      <div class="friends">
        <LineCarousel2 />
      </div>
      <!-- 底部 -->
      <FooterPart></FooterPart>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
import FooterPart from "@/components/footerPart.vue";
var moment = require("moment");
import SvgLine from "@components/exchange/SvgLine.vue";
import SvgIndex from "@components/exchange/SvgIndex.vue";
import HotCarouselItem from "@components/exchange/carouselItem.vue";
import LineCarousel from "@components/exchange/carousel.vue";
import LineCarousel2 from "@components/exchange/carousel2.vue";
import noData from "../../components/header/noData.vue";
import Swiper from "swiper";
export default {
  components: {
    VueQriously,
    FooterPart,
    SvgLine,
    SvgIndex,
    HotCarouselItem,
    LineCarousel,
    LineCarousel2,
    noData,
  },
  data() {
    let self = this;
    return {
      tabTypes: "1",
      // 背景图
      // headerBG: "",
      // 公益轮播图
      // public_value: 0,
      // 轮播图
      bannerList: 0,
      // 公告
      indexNotice: {},
      // 收藏數據
      // favorData: [],
      // 合約數據
      swapData: [],
      // 現貨數據
      // marketData: [],
      // 公益
      // publicList: [],
      // publicTitle: "",
      // publicContent: "",
      // 媒体评价
      // evaluateList: [],
      // 折线图配置
      chartConfig: {
        color: ["#03C59E"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
        },
        yAxis: {
          type: "value",
          min: 0.9,
          max: 1.1,
          show: false,
          splitLine: { show: false },
        },
        grid: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [1, 10, 20, 50], // 自定义数据点
            // smooth: true,
            symbol: "none",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#03C59E50",
                },
                {
                  offset: 1,
                  color: "#03C59E00",
                },
              ]),
            },
          },
        ],
      },
      // 列表項
      // columns: [
      //   {
      //     title: this.$t("new.markets.tradingPairs"),
      //     slot: "symbol",
      //     align: "left",
      //   },
      //   {
      //     title: this.$t("dolphin.text183"),
      //     key: "close",
      //     align: "center",
      //     render: (h, params) => {
      //       return h("span", {}, this.fixed2(params.row.close));
      //     },
      //   },
      //   {
      //     align: "center",
      //     title: this.$t("new.markets.gains"),
      //     key: "chg",
      //     render: (h, params) => {
      //       return h(
      //         "span",
      //         {
      //           style: { color: params.row.chg < 0 ? "#ea4337" : "#03C59E" },
      //         },
      //         params.row.chg + "%"
      //       );
      //     },
      //   },
      //   {
      //     title: this.$t("new.markets.turnover"),
      //     align: "center",
      //     key: "turnover",
      //     render: (h, params) => {
      //       return h("span", {}, this.getNewUnit(params.row.turnover));
      //     },
      //   },
      //   {
      //     title: this.$t("dolphin.text172"),
      //     slot: "operate",
      //   },
      // ],
      tabType: "1",
      favorType: this.$t("new.universal.contract"),
      // loading: false,
      // percent: 0,
      // pageNo: 1,
      // pageSize: 6,
      // totalNum: 0,
      // FAQList: [],
      // CNYRate: null,
      // dataIndex: [],
      pageNo: 1,
      // totalNum: 0,
      // searchKey: "",
      // width: window.innerWidth,
      // value1: 0,
      // choseBtn: 0,
      symbol: "",
      cardsList: [
        {
          img: this.$imgUrl + "/newUi/card1.png",
          title: this.$t("newUi.text42"),
          row: this.$t("newUi.text43"),
          row1: this.$t("newUi.text44"),
        },
        {
          img: this.$imgUrl + "/newUi/card2.png",
          title: this.$t("newUi.text55"),
          row: this.$t("newUi.text47"),
          row1: this.$t("newUi.text48"),
        },
        {
          img: this.$imgUrl + "/newUi/card3.png",
          title: this.$t("newUi.text56"),
          row: this.$t("newUi.text49"),
          row1: this.$t("newUi.text50"),
        },
        {
          img: this.$imgUrl + "/newUi/card4.png",
          title: this.$t("newUi.text57"),
          row: this.$t("newUi.text51"),
          row1: this.$t("newUi.text52"),
        },
        {
          img: this.$imgUrl + "/newUi/card5.png",
          title: this.$t("newUi.text58"),
          row: this.$t("newUi.text53"),
          row1: this.$t("newUi.text54"),
        },
        {
          img: this.$imgUrl + "/newUi/card6.png",
          title: this.$t("newUi.text59"),
          row: this.$t("newUi.text60"),
          row1: this.$t("newUi.text61"),
        },
      ],
      cardsGoPageList: [
        {
          img: this.$imgUrl + "/newUi/card7.png",
          title: this.$t("newUi.text62"),
          row: this.$t("newUi.text66"),
          url: "/exchange",
        },
        {
          img: this.$imgUrl + "/newUi/card8.png",
          title: this.$t("newUi.text63"),
          row: this.$t("newUi.text67"),
          url: "/swap",
        },
        {
          img: this.$imgUrl + "/newUi/card9.png",
          title: this.$t("newUi.text64"),
          row: this.$t("newUi.text68"),
          url: "/financing",
        },
        {
          img: this.$imgUrl + "/newUi/card10.png",
          title: this.$t("newUi.text65"),
          row: this.$t("newUi.text69"),
          url: "",
        },
      ],
    };
  },
  created: function() {},
  destroyed: function() {},
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    lang: function() {
      return this.$store.state.lang;
    },
    langPram: function() {
      return this.$store.state.lang;
    },
  },
  // watch: {
  //   lang() {
  //     this.updateLangData();
  //   },
  // },
  // filters: {
  // fixed2: function(value) {
  //   return parseFloat(value).toFixed(2);
  // },
  // dateFormat: function(tick) {
  //   return moment(tick).format("MM-DD HH:mm");
  // },
  // },
  mounted() {
    // 获取轮播图和公告
    this.getBasicData();
    // 获取行情数据列表
    this.getDataList();
    // 设置定时器，每3秒更新行情数据列表
    this.updataTimer = window.setInterval(() => {
      this.getDataList();
    }, 3000);
  },
  beforeDestroy() {
    // 断开链接
    window.clearInterval(this.updataTimer);
  },
  methods: {
    // 下载
    go_down(url) {
      this.$http
        .get(this.host + `${this.api.flashExchange.version}${url}`)
        .then((res) => {
          window.open(res.data.data.downloadUrl, "_blank");
        });
    },

    // 頁面跳轉
    goPage(url, data = "") {
      this.$router.push({
        path: `${url}${data}`,
      });
    },
    // fixed2: function(value) {
    //   return parseFloat(value).toFixed(2);
    // },
    // 未登录时搜索框立即登录
    goLoginPage(value) {
      this.$router.push(`/register?user=${value}`);
    },
    // 获取轮播图 公告
    getBasicData() {
      // 获取轮播图
      var paramBanner = {};
      (paramBanner["sysAdvertiseLocation"] = 1),
        this.$http
          .post(this.host + this.api.index.getBanner, paramBanner)
          .then((response) => {
            var resp = response.body;
            this.bannerList = resp.data;
            setTimeout(() => {
              // 初始化轮播图
              var mySwiper = new Swiper(".swiper", {
                autoplay: {
                  delay: 1000,
                  disableOnInteraction: false,
                },
                loop: true,
                autoplay: true,
                height: 160,
                slidesPerView: 4,
                spaceBetween: 20,
                navigation: {
                  nextEl: ".swiper-button-next-unique",
                  prevEl: ".swiper-button-prev-unique",
                },
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                on: {
                  init: function() {
                    this.el.addEventListener("mouseenter", function() {
                      mySwiper.autoplay.stop();
                    });
                    this.el.addEventListener("mouseleave", function() {
                      mySwiper.autoplay.start();
                    });
                  },
                },
              });
              // 自动变换动画
              mySwiper.autoplay.start();
            }, 1000);
          });

      // 獲取公告
      var paramNotice = {};
      (paramNotice["pageNo"] = 1),
        (paramNotice["papageSizegeNo"] = 110),
        this.$http
          .post(this.host + this.api.index.getNotice, paramNotice)
          .then((res) => {
            this.indexNotice = res.data.data.content[0];
          });

      // 获取公益
      // var paramPublic = {};
      // (paramPublic["type"] = 0),
      //   this.$http
      //     .post(this.host + this.api.index.getEvaluate, paramPublic)
      //     .then((res) => {
      //       this.publicList = res.data.data;
      //       this.publicTitle = this.publicList[0].title;
      //       this.publicContent = this.publicList[0].content;
      //     });

      // 获取媒体评价
      // var paramEvaluate = {};
      // (paramEvaluate["type"] = 1),
      //   this.$http
      //     .post(this.host + this.api.index.getEvaluate, paramEvaluate)
      //     .then((res) => {
      //       this.evaluateList = res.data.data;
      //     });
    },
    // 公益图片切换时
    // carouselChange(oldValue, value) {
    //   this.publicTitle = this.publicList[value].title;
    //   this.publicContent = this.publicList[value].content;
    // },

    // 獲取行情數據
    getDataList() {
      if (this.tabTypes == "1") {
        let params = {
          volumeSort: 0,
          closeSort: 0,
          chgSort: 0,
        };
        if (this.favorType === this.$t("new.universal.contract")) {
          this.getSwapList(params);
        } else {
          this.getMarketList(params);
        }
      } else if (this.tabTypes == "2") {
        let params = {
          volumeSort: 0,
          closeSort: 0,
          chgSort: -1,
        };
        if (this.favorType === this.$t("new.universal.contract")) {
          this.getSwapList(params);
        } else {
          this.getMarketList(params);
        }
      } else if (this.tabTypes == "3") {
        let params = {
          volumeSort: 0,
          closeSort: 0,
          chgSort: 1,
        };
        if (this.favorType === this.$t("new.universal.contract")) {
          this.getSwapList(params);
        } else {
          this.getMarketList(params);
        }
      } else if (this.tabTypes == "4") {
        let params = {
          volumeSort: 0,
          closeSort: 0,
          chgSort: 0,
        };
        if (this.favorType === this.$t("new.universal.contract")) {
          this.getSwapList(params);
        } else {
          this.getMarketList(params);
        }
      }
    },
    // 获取合约数据列表
    getSwapList(params) {
      this.$http
        .post(this.host + this.api.markets.swapThumb, params)
        .then((res) => {
          var allData = res.data;
          if (this.tabTypes != 4) {
            this.swapData = allData;
            this.swapData.forEach((item, index) => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.drawLines(item, index);
                }, 500);
              });
            });
          } else {
            this.swapData = allData.filter((item) => item.newCoin == 1);
            this.swapData.forEach((item, index) => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.drawLines(item, index);
                }, 500);
              });
            });
          }
        });
    },
    // 获取現貨数据列表
    getMarketList(params) {
      this.$http
        .post(this.host + this.api.markets.marketThumb, params)
        .then((res) => {
          var allData = res.data.data;
          if (this.tabTypes != 4) {
            this.swapData = allData;
            this.swapData.forEach((item, index) => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.drawLines1(item, index);
                }, 500);
              });
            });
          } else {
            this.swapData = allData.filter((item) => item.newCoin == 1);
            this.swapData.forEach((item, index) => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.drawLines1(item, index);
                }, 500);
              });
            });
          }
        });
    },
    // tab頁點擊
    tabClick(name) {
      this.tabTypes = name;
      this.swapData = [];
      this.$nextTick(() => {
        this.getDataList();
      });
    },
    // 切換类型
    changeCoinType(name) {
      this.favorType = name;
      this.swapData = [];
      this.$nextTick(() => {
        this.getDataList();
      });
    },
    go_load(download) {
      const element = document.getElementById(download);
      element.scrollIntoView({ behavior: "smooth" });
    },
    // 點擊收藏 0 不收藏 1收藏
    // handleCollect(symbol, num, favorType) {
    //   var params = {};
    //   params["symbol"] = symbol;
    //   // 判斷是合約還是現貨
    //   if (favorType === "合約") {
    //     // 合約
    //     // 判斷是否要收藏
    //     if (num === 0) {
    //       this.$http
    //         .post(this.host + this.api.markets.delSwapFavor, params)
    //         .then((res) => {
    //           this.getDataList();
    //         });
    //     } else {
    //       this.$http
    //         .post(this.host + this.api.markets.addSwapFavor, params)
    //         .then((res) => {
    //           this.getDataList();
    //         });
    //     }
    //   } else {
    //     // 現貨
    //     // 判斷是否要收藏
    //     if (num === 0) {
    //       this.$http
    //         .post(this.host + this.api.markets.delFavor, params)
    //         .then((res) => {
    //           this.getDataList();
    //         });
    //     } else {
    //       this.$http
    //         .post(this.host + this.api.markets.addFavor, params)
    //         .then((res) => {
    //           // this.$nextTick(() => {
    //           this.getDataList();
    //           // });
    //         });
    //     }
    //   }
    // },
    // scrollto(id) {
    //   const dom = document.getElementById(id);
    //   dom.scrollIntoView({
    //     behavior: "smooth", // 平滑过渡<br>
    //     block: "start", // start 上边框  center 中间  end 底部边框 与视窗顶部平齐<br>
    //   });
    // },

    // seachInputChange() {
    //   this.searchKey = this.searchKey.toUpperCase();
    //   if (this.choseBtn == 0) {
    //     this.dataIndex = this.coins.favor.filter(
    //       (item) => item["symbol"].indexOf(this.searchKey) == 0
    //     );
    //   } else if (this.choseBtn == 1) {
    //     this.dataIndex = this.coins.USDT.filter(
    //       (item) => item["symbol"].indexOf(this.searchKey) == 0
    //     );
    //   } else if (this.choseBtn == 2) {
    //     this.dataIndex = this.coins.BTC.filter(
    //       (item) => item["symbol"].indexOf(this.searchKey) == 0
    //     );
    //   } else if (this.choseBtn == 3) {
    //     this.dataIndex = this.coins.ETH.filter(
    //       (item) => item["symbol"].indexOf(this.searchKey) == 0
    //     );
    //   }
    // },
    // strde(str) {
    //   str = str.trim();
    //   if (this.langPram == "EN") {
    //     return str.length > 25 ? str.slice(0, 25) + "..." : str;
    //   }
    //   return str.length > 18 ? str.slice(0, 18) + "..." : str;
    // },
    // init() {
    // this.$store.state.HeaderActiveName = "1-1";
    // this.loadDataPage(this.pageNo);
    // },
    // getStyle(obj, attr) {
    //   if (obj.currentStyle) {
    //     return obj.currentStyle[attr];
    //   } else {
    //     return getComputedStyle(obj, false)[attr];
    //   }
    // },
    // loadDataPage(pageIndex) {
    //   var param = {};
    //   (param["pageNo"] = pageIndex),
    //     (param["pageSize"] = this.pageSize),
    //     (param["lang"] = this.langPram),
    //     this.$http
    //       .post(this.host + this.api.uc.announcement, param)
    //       .then((response) => {
    //         var resp = response.body;
    //         if (resp.code == 0) {
    //           if (resp.data.content.length == 0) return;

    //           this.totalNum = resp.data.totalElements;

    //           let FAQListtem = resp.data.content;
    //           if (this.totalNum > 3) {
    //             this.FAQList = FAQListtem.slice(0, 3);
    //           } else {
    //             this.FAQList = FAQListtem;
    //           }
    //           this.FAQList.forEach(function(item) {
    //             item.createTime = item.createTime.substring(5, 10);
    //           });
    //         } else {
    //           this.$Notice.error({
    //             title: this.$t("common.tip"),
    //             desc: resp.message,
    //           });
    //         }
    //       });
    // },
    // getCNYRate() {
    //   this.$http
    //     .post(this.host + "/market/exchange-rate/usd-cny")
    //     .then((response) => {
    //       var resp = response.body;
    //       this.CNYRate = resp.data;
    //     });
    // },
    // donwload(type) {
    //   const title = this.$t("common.tip");
    //   const content = "<p>" + this.$t("common.expect") + "</p>";
    //   this.$Modal.info({
    //     title: title,
    //     content: content,
    //     closable: true,
    //   });
    // },
    // round(v, e) {
    //   var t = 1;
    //   for (; e > 0; t *= 10, e--);
    //   for (; e < 0; t /= 10, e++);
    //   return Math.round(v * t) / t;
    // },
    // mul(a, b) {
    //   var c = 0,
    //     d = a.toString(),
    //     coins;
    //   e = b.toString();
    //   try {
    //     c += d.split(".")[1].length;
    //   } catch (f) {}
    //   try {
    //     c += e.split(".")[1].length;
    //   } catch (f) {}
    //   return (
    //     (Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
    //     Math.pow(10, c)
    //   );
    // },
    // getCoin(symbol) {
    //   return this.coins._map[symbol];
    // },
    getcurrent(e) {
      if (this.favorType === this.$t("new.universal.contract")) {
        this.goPageEx(e, "/swap/");
      } else {
        this.goPageEx(e, "/exchange/");
      }
    },
    // 跳頁
    goPageEx(data, url) {
      const coinsArr = data.split("/");
      this.$router.push({
        path: `${url}${coinsArr[0].toLowerCase()}_${coinsArr[1].toLowerCase()}`,
      });
    },
    // getcurrent0(e) {
    //   this.goPageEx(e.symbol, "/swap/");
    // },
    // getcurrent1(e) {
    //   this.goPageEx(e.symbol, "/exchange/");
    // },
    drawLines(chartData, index) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.getInstanceByDom(
        document.getElementById("chart" + index)
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("chart" + index));
      }
      this.chartConfig.series[0].data = chartData.ninetyClosePrice;
      this.chartConfig.yAxis.min = chartData.low;
      this.chartConfig.yAxis.max = chartData.high;
      let color = chartData.chg < 0 ? "#ea4337" : "#15BA54";
      this.chartConfig.color = color;
      this.chartConfig.series[0].areaStyle.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: color + "50",
          },
          {
            offset: 1,
            color: color + "00",
          },
        ]
      );
      // 绘制图表
      myChart.setOption(this.chartConfig);
    },
    drawLines1(chartData, index) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.getInstanceByDom(
        document.getElementById("charts" + index)
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("charts" + index));
      }
      this.chartConfig.series[0].data = chartData.ninetyClosePrice;
      this.chartConfig.yAxis.min = chartData.low;
      this.chartConfig.yAxis.max = chartData.high;
      let color = chartData.chg < 0 ? "#ea4337" : "#15BA54";
      this.chartConfig.color = color;
      this.chartConfig.series[0].areaStyle.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: color + "50",
          },
          {
            offset: 1,
            color: color + "00",
          },
        ]
      );
      // 绘制图表
      myChart.setOption(this.chartConfig);
    },
    getCurrencyPairPrefix(pair) {
      return pair.split("/")[0];
    },
  },
};
</script>
<style scoped lang="less">
@import url("../../assets/css/common.less");
#fullpage {
  background: #fff;
  padding-top: 50px;
}
// .video_style {
//   width: 388px;
//   height: 678px;
// }
.swiper-button-prev,
.swiper-button-next {
  width: 30px;
  height: 22px;
  margin-top: -11px;
}
.swiper-button-prev:after {
  display: none;
}
.swiper-button-next:after {
  display: none;
}
/*再自定义样式*/
.swiper-button-prev-unique {
  width: 21px;
  height: 21px;
  background: url("../../assets/images/newUi/iconleft.png") no-repeat;
  background-size: 21px 21px;
  position: absolute;
  top: 45%;
  left: 0;
  cursor: pointer;
}
.swiper-button-next-unique {
  width: 21px;
  height: 21px;
  background: url("../../assets/images/newUi/iconright.png") no-repeat;
  background-size: 21px 21px;
  position: absolute;
  top: 45%;
  right: 0;
  cursor: pointer;
}
.banner-part {
  width: 1200px;
  margin-top: 6px;
  padding: 20px 0;
  position: relative;
}
.swiper {
  min-height: 180px;
  margin: 0 auto;
  width: 1110px;
  padding: 0 15px;
  position: relative;
  overflow: hidden;
  .swiper-slide {
    height: 160px;
    .activity-item {
      margin: 15px 0;

      &:hover {
        opacity: 0.9;
        cursor: pointer;
      }

      img {
        // max-width: 00px;
        transition: all 0.5s;
        max-height: 149px;
        max-width: 250px;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 0 8px #fff;
        }
      }
    }
  }
}

.top-panel {
  background-color: #fff;
  background-size: 100% 100%;
  // height: 768px;
  .top_content {
    padding-top: 27px;
    max-width: 1200px;
    min-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .top_left {
      max-width: 630px;
      min-width: 600px;
      background-image: url("../../assets/images/newUi/home_topleft.png");
      background-repeat: no-repeat;
      background-size: 147px 82px;
      background-position: 300px 78px;
      .top_title {
        font-size: 72px;
        color: #07c67b;
        font-weight: 600;
        .top_title_se {
          font-weight: 900;
          font-size: 72px;
          color: #35e9c5;
        }
        .top_title_shou {
          font-weight: 900;
          font-size: 72px;
          color: #000;
          margin-left: 20px;
        }
      }
      .top_title_rowOne {
        font-weight: 900;
        font-size: 64px;
        color: #000;
      }
      .top_title_rowTwo {
        font-weight: 400;
        font-size: 24px;
        color: #898c91;
        line-height: 35px;
      }
      .input_button {
        font-size: 18px;
        line-height: 20px;
        height: 56px;
        margin: 35px 0;
        display: flex;
        align-items: center;

        .input_button_left {
          width: 255px;
          height: 60px;
          border-radius: 5px 5px 5px 5px;
          border: 1px solid #e2e2e2;
          padding-left: 11px;
          .input {
            width: 240px;
            height: 60px;
            border: none;
            outline: none;
            background: transparent;
          }
        }

        .input_button_right {
          width: 141px;
          height: 60px;
          background: #35e9c5;
          border-radius: 5px 5px 5px 5px;
          text-align: center;
          line-height: 60px;
          font-size: 22px;
          color: #212121;
          margin-left: 5px;
          cursor: pointer;
        }
        .iconAll {
          width: 60px;
          height: 60px;
          border-radius: 5px 5px 5px 5px;
          margin-left: 5px;
          cursor: pointer;
        }
        .jiaoyiBtn {
          width: 156px;
          height: 56px;
          border-radius: 28px;
          font-size: 16px;
        }
      }
      .top_tips {
        display: flex;
        .top_tips_item {
          display: flex;
          flex-direction: column;
          margin-right: 40px;
          .top_tips_item_left {
            font-size: 32px;
            color: #3d3d3d;
            font-weight: 700;
          }
          .top_tips_item_right {
            font-weight: 400;
            font-size: 18px;
            color: #898c91;
          }
        }
      }
      .top_icons {
        display: flex;
        flex-direction: row;
        div {
          border: 1px solid #eeeeee60;
        }
      }
    }
    .top_right {
      width: 570px;
      height: 523px;
      position: relative;
      background: url("../../assets/images/newUi/home_topright.png");
      background-repeat: no-repeat;
      background-size: 570px 391px;
      background-position: 0px 90px;
      .top_right_img {
        width: 507px;
        height: 433px;
        transform: rotate(28deg);
        position: absolute;
        top: -10px;
        left: 20px;
      }
      .btnScoll {
        position: absolute;
        width: 300px;
        height: 200px;
        bottom: -60px;
        right: 200px;
        cursor: pointer;
      }
    }
  }
}
.home_notice {
  margin-top: 50px;
  min-width: 1200px;
  height: 55px;
  background: linear-gradient(270deg, rgba(33, 231, 191, 0) 0%, #21e7bf 100%);
  border-radius: 0px 0px 0px 0px;
  .notice {
    margin: 0 auto;
    width: 1200px;
    font-size: 14px;
    line-height: 55px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    .notice_title {
      display: flex;
      align-items: center;
      padding-right: 18px;
      // border-right: 1px solid #66666650;
      .notice_title_img {
        width: 24px;
        height: 24px;
      }
    }
    .notice_content {
      flex: 1 1 0%;
      padding-left: 18px;
      justify-content: space-between;
      align-items: center;
      display: flex;
    }
  }
}

.home-container {
  margin: 33px auto;
  width: 1200px;
  .table_title {
    margin: 100px 0 10px;
    font-weight: 500;
    font-size: 46px;
    color: #212121;
    text-align: left;
  }
  .tabs_content {
    display: flex;
    justify-content: flex-start;
    .tabs_item {
      margin: 0 44px 35px 0;
      text-align: left;
      font-weight: 500;
      font-size: 28px;
      color: rgba(33, 33, 33, 0.54);
      cursor: pointer;
    }
    .active {
      font-weight: 500;
      font-size: 28px;
      color: #212121;
    }
  }
  .table_content {
    min-width: 1303px;
    margin-left: -50px;
    // margin: 0 auto;
    .table_header {
      margin: 0 auto;
      max-width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        flex: 1 1 0%;
        font-weight: 400;
        font-size: 14px;
        color: #898c91;
      }
      div:nth-child(1) {
        text-align: left;
        padding-left: 10px;
      }
      div:nth-child(2) {
        text-align: center;
      }
      div:nth-child(3) {
        text-align: center;
      }
      div:nth-child(4) {
        text-align: right;
        padding-right: 10px;
      }
    }
    .table_item {
      margin: 0 auto;
      width: 1200px;
      height: 67px;
      border-bottom: 1px solid #eefdfa;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        flex: 1 1 0%;
      }
      div:nth-child(1) {
        text-align: left;
        padding-left: 10px;
        display: flex;
        align-items: center;
        .table_coin_img {
          width: 35px;
          height: 35px;
          margin-right: 10px;
          margin-left: 10px;
          border-radius: 50%;
        }
        .table_coin_name {
          color: #1c1c1c;
          font-weight: 700;
          font-size: 16px;
          margin-right: 5px;
        }
        .table_coin_name1 {
          color: #999;
          font-size: 12px;
        }
      }
      div:nth-child(2) {
        text-align: center;
      }
      div:nth-child(3) {
        text-align: center;
      }
    }
    .table_item:hover {
      transition: all 1s;
      width: 1303px;
      height: 67px;
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px rgba(214, 250, 243, 0.7);
      color: #000;
    }
    .noData {
      min-height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .bottom_more {
      width: 60px;
      color: #3beac6;
      display: flex;
      align-items: center;
      margin: 20px auto 0;
      cursor: pointer;
      .coinMore {
        margin-left: 10px;
        width: 13px;
        height: 13px;
      }
    }
  }
  // 介紹
  // .about_part {
  //   width: 100%;
  //   .cards {
  //     display: flex;
  //     justify-content: space-between;
  //     position: relative;
  //     .card_content {
  //       padding: 40px;
  //     }
  //     .flex-row {
  //       display: flex;
  //       justify-content: space-between;
  //     }
  //     .flex-col {
  //       display: flex;
  //       flex-direction: column;
  //       .trophy {
  //         position: absolute;
  //         bottom: 0;
  //       }
  //     }
  //   }
  // }
  // 公司评价
  // .evaluate {
  //   margin-top: 120px;
  //   .title {
  //     line-height: 22px;
  //     font-size: 40px;
  //     font-weight: 600;
  //   }
  //   .detail {
  //     font-size: 16px;
  //     line-height: 24px;
  //     margin-top: 30px;
  //     color: #6f6f6f;
  //   }
  //   .companys {
  //     margin-top: 30px;
  //     gap: 16px;
  //     grid-template-columns: repeat(3, minmax(0, 1fr));
  //     display: grid;
  //     .card {
  //       .company_img {
  //         width: 100%;
  //         height: 160px;
  //         object-fit: cover;
  //         border-radius: 4px;
  //       }
  //       .company_text {
  //         font-size: 14px;
  //         line-height: 20px;
  //         overflow: hidden;
  //         display: -webkit-box;
  //         -webkit-box-orient: vertical;
  //         -webkit-line-clamp: 3;
  //         margin: 16px 0;
  //         color: #6f6f6f;
  //       }
  //       .company_logo {
  //         object-fit: cover;
  //         max-width: 50%;
  //         max-height: 40px;
  //       }
  //     }
  //   }
  // }
  .cards_tips {
    font-weight: 400;
    font-size: 24px;
    color: #898c91;
  }
  .cards {
    margin: 33px auto;
    width: 1200px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 44px 34px;

    .cards_item {
      width: 378px;
      height: 401px;
      background: #ffffff;
      border-radius: 5px 5px 5px 5px;
      border: 1px solid #f1f1f1;
      padding: 23px 28px;
      box-sizing: border-box;
      .cards_item_img {
        margin: 0 auto;
        height: 253px;
        width: 253px;
        object-fit: cover;
        .cards_item_img_img {
          width: 253px;
          height: 253px;
          object-fit: cover;
        }
      }
      .cards_item_title {
        font-weight: 700;
        font-size: 24px;
        color: #3d3d3d;
        margin-bottom: 15px;
      }
      .cards_item_row {
        font-weight: 400;
        font-size: 14px;
        color: #898c91;
      }
    }
    .cards_item:hover {
      transform: all 1s;
      width: 378px;
      height: 401px;
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 5px 5px 5px 5px;
    }
  }
  .cards_goPage {
    margin: 33px auto;
    width: 1200px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 44px 34px;
    .cards_goPage_item {
      display: flex;
      width: 585px;
      height: 197px;
      background: #f9f9f9;
      border-radius: 5px 5px 5px 5px;
      .cards_goPage_item_img {
        width: 145px;
        height: 145px;
        object-fit: cover;
        .cards_goPage_item_img_img {
          width: 145px;
          height: 145px;
          object-fit: cover;
          margin-top: 26px;
        }
      }
      .cards_goPage_item_right {
        padding-top: 29px;
        .cards_goPage_item_title {
          font-weight: 700;
          font-size: 24px;
          color: #212121;
        }
        .cards_goPage_item_row {
          width: 340px;
          font-weight: 400;
          font-size: 14px;
          color: #212121;
          margin-top: 23px;
        }
        .cards_goPage_item_btn {
          margin-top: 5px;
          font-weight: 400;
          font-size: 14px;
          color: #fc9307;
          cursor: pointer;
          width: 70px;
        }
      }
    }
    .cards_goPage_item:hover {
      transform: all 1s;
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
      border-radius: 5px 5px 5px 5px;
    }
  }
  .download_part {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .download_part_left {
      width: 700px;
      .download_part_left_title {
        font-weight: 400;
        font-size: 24px;
        color: #898c91;
      }
      .download_part_left_row {
        margin-top: 56px;
        display: flex;
        .download_part_left_row_img {
          width: 132px;
          height: 132px;
          margin-right: 27px;
          object-fit: cover;
          .download_part_left_row_img_img {
            width: 132px;
            height: 132px;
            object-fit: cover;
          }
        }
        .download_part_left_row_all {
          .row_all_title {
            font-weight: 400;
            font-size: 18px;
            color: #212121;
          }
        }
      }
      .download_part_left_b {
        margin-top: 29px;
        display: flex;
        align-items: center;
        .download_part_left_b_all {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 18px;
          color: #212121;
          margin-right: 65px;
          img {
            width: 21px;
            height: 21px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .download_part_right {
      .download_part_right_img {
        width: 509px;
        height: 291px;
        object-fit: cover;
      }
    }
  }
}
// .download_part {
//   margin-top: 140px;
//   padding: 100px 0 68px 0;
//   background-color: #f8f8f8;
//   background-color: #f8f8f8;
//   .download_content {
//     width: 1200px;
//     height: 670px;
//     margin: 0 auto;
//     .download_title {
//       font-size: 38px;
//       line-height: 46px;
//       font-weight: 600;
//       margin-bottom: 20px;
//       text-align: center;
//       display: block;
//     }
//     .download_tip {
//       font-size: 20px;
//       line-height: 20px;
//       text-align: center;
//       margin-bottom: 32px;
//       color: #6f6f6f;
//     }
//     .download_detail {
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       .download_tips_dd {
//         h3 {
//           font-size: 20px;
//           line-height: 24px;
//           font-weight: 500;
//         }
//         p {
//           margin-top: 12px;
//           font-size: 16px;
//           line-height: 18px;
//           color: #6f6f6f;
//         }
//       }
//       .download_btns {
//         display: grid;
//         grid-template-columns: repeat(2, minmax(0, 1fr));
//         gap: 20px;
//         margin-right: 20px;
//         button {
//           height: 48px;
//           width: 160px;
//           color: #ffffff;
//           background-color: #1c1c1c;
//         }
//       }
//       .download_code {
//         padding: 8px;
//         background-color: #ffffff;
//         border: 1px solid #eeeeee;
//         border-radius: 6px;
//       }
//     }
//   }
// }

.friends {
  padding: 70px 0 0;
}
// 公益
// .public_part {
//   margin-top: 120px;
//   padding: 80px 0 80px;
//   background-color: #f8f8f8;
//   position: relative;
//   .public_text {
//     width: 598px;
//     position: absolute;
//     right: 0;
//     top: 22%;
//     padding-left: 96px;
//     padding-right: 48px;
//     .public_title {
//       font-size: 40px;
//       font-weight: 700;
//     }
//     .public_detail {
//       font-size: 16px;
//       color: #6f6f6f;
//       line-height: 24px;
//     }
//   }
// }
// .input_button .input .ivu-input-inner-container .ivu-input-large {
//   height: 56px;
// }
// #progress {
//   .ivu-progress.ivu-progress-normal {
//     .ivu-progress-inner {
//       background: #fff;
//       border-radius: 5px;
//       border: 1px solid #03C59E;

//       .ivu-progress-bg {
//         border-radius: 0;
//         background: #03C59E;
//       }
//     }
//   }
// }

// #page2 {
//   .ptjy {
//     position: relative;
//     min-height: 500px;
//     background-color: #fff;

//     &:after {
//       content: "";
//       width: 1px;
//       height: 100%;
//       position: absolute;
//       top: 0;
//       right: 0;
//       z-index: 3;
//     }

//     &:before {
//       content: "";
//       width: 1px;
//       height: 100%;
//       position: absolute;
//       top: 0;
//       left: 0;
//       z-index: 3;
//     }

//     .tables {
//       .ivu-table {
//         .ivu-table-header {
//           color: #888;

//           th {
//             background: none;
//           }
//         }

//         .ivu-table-header {
//           background: #fff;

//           .ivu-table-cell {
//             padding: 10px 0;
//           }
//         }

//         .ivu-table-body {
//           .ivu-table-cell {
//             padding: 5px 0;
//           }
//         }
//       }
//     }
//   }
// }
// .section .ivu-carousel-dots-inside {
//   bottom: 20px;
// }

// .green {
//   color: #00b275 !important;
// }

// .red {
//   color: #f15057 !important;
// }

// .brclearfix:after {
//   content: "";
//   display: block;
//   height: 0;
//   overflow: hidden;
//   clear: both;
// }

// .carousel-item {
//   background-repeat: no-repeat;
//   background-position: center;
//   height: 500px;
//   background-size: cover;
// }

// .demo-carousel1 {
//   height: 575px;
//   background-size: cover;
// }

// .demo-carousel2 {
//   height: 575px;
//   background-size: cover;
// }

// .demo-carousel-btn {
//   width: 100%;
//   height: 100%;
//   padding-top: 345px;
// }

// .demo-carousel1 a {
//   display: inline-block;
//   width: 250px;
//   height: 55px;
//   margin: 0 15px;
// }

// .usdt_icon {
//   float: left;
//   width: 18%;
//   height: 290px;
//   background: #1d293a;
//   padding-top: 125px;
//   margin: 5px;
// }

// .btc,
// .eth {
//   float: left;
//   width: 100%;
//   margin-top: 10px;
// }

// .btc_icon,
// .eth_icon {
//   float: left;
//   width: 18%;
//   height: 140px;
//   background: #1d293a;
//   padding-top: 50px;
//   margin: 5px;
// }

// #nav {
//   position: fixed;
//   right: 10%;
//   top: 50%;
//   z-index: 100;
// }

// #nav ul li {
//   display: block;
//   height: 25px;
//   margin: 7px;
//   position: relative;
//   padding-right: 20px;
//   text-align: right;
//   color: #fff;
// }

// #nav ul li span {
//   display: none;
// }

// #nav ul li a {
//   top: 2px;
//   right: 2px;
//   width: 8px;
//   height: 8px;
//   background: url(../../assets/images/page.png) no-repeat;
//   position: absolute;
//   z-index: 1;
// }

// #nav ul li a:hover,
// #nav ul li a.active {
//   top: 0;
//   right: -3px;
//   width: 18px;
//   height: 18px;
//   background: url(../../assets/images/page_active.png) no-repeat;
//   position: absolute;
//   z-index: 1;
// }

/* #page3 {
  position: relative;
  color: #979797;
}

#page3 label {
  position: absolute;
  top: 30%;
  left: 20%;
  font-size: 30px;
} */

// @-webkit-keyframes fadeinB {
//   0% {
//     top: 50%;
//     opacity: 0;
//   }

//   100% {
//     top: 30%;
//     opacity: 1;
//   }
// }

// @keyframes fadeinB {
//   0% {
//     top: 50%;
//     opacity: 0;
//   }

//   100% {
//     top: 30%;
//     opacity: 1;
//   }
// }

// @-webkit-keyframes fadeinA {
//   0% {
//     top: 60%;
//     opacity: 0;
//   }

//   100% {
//     top: 40%;
//     opacity: 1;
//   }
// }

// @keyframes fadeinA {
//   0% {
//     top: 60%;
//     opacity: 0;
//   }

//   100% {
//     top: 40%;
//     opacity: 1;
//   }
// }

/* #page3 p {
  position: absolute;
  top: 40%;
  left: 20%;
  font-size: 15px;
} */

// .news_1 {
//   color: #202b3c;
//   font-size: 12px;
// }

// .news_2 {
//   color: #505c6f;
//   font-size: 13px;
// }

// .news_3 {
//   color: #fff;
//   font-size: 18px;
// }

// .news_title {
//   color: #fff;
//   font-size: 20px;
// }

// .news_date {
//   color: #505c6f;
// }

// .news_detail {
//   color: #98999f;
//   margin-top: 10px;
// }

// .ptjy .ivu-table td,
// .ptjy .ivu-table th {
//   height: 80px;
//   border: none !important;
// }

// .price-rmb {
//   color: #828ea1;
//   font-size: 10px;
//   margin-left: 3px;
// }

// .price-td {
//   padding-left: 100px;
//   text-align: left;
// }

// th .ivu-table-cell span {
//   font-weight: normal !important;
// }

// @keyframes masked-animation {
//   0% {
//     background-position: 0 0;
//   }

//   100% {
//     background-position: -100% 0;
//   }
// }

// .go_page_btn {
//   cursor: pointer;
// }
// .downlow_btn {
//   margin: 0 20px;
//   width: 200px;
//   height: 36px;
//   background-color: #03C59E;
//   color: #fff;
//   font-size: 16px;
//   border-radius: 10px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
// .downlow_img {
//   width: 20px;
//   height: 20px;
//   margin-right: 10px;
//   margin-top: -5px;
// }
@media (max-width: 1600px) {
  .top_right_img {
    width: 520px;
    height: 354px;
  }
}
</style>
