<!-- 行情 -->
<template>
  <div class="markets_main">
    <div class="main_content">
      <section style="display: flex; justify-content: space-between">
        <router-link
          v-if="topData[0]"
          :to="
            `/exchange/${(
              topData[0].symbol.split('/')[0] || ''
            ).toLowerCase()}_${(
              topData[0].symbol.split('/')[1] || ''
            ).toLowerCase()}`
          "
          class="iconsCards"
        >
          <div class="iconsCards_left">
            <div style="display: flex;align-items: center;">
              <img
                :src="topData[0].coinImg"
                alt=""
                style="width: 20px;height: 20px;margin-right: 10px;"
              />
              <h3 class="icon_name">
                {{ topData[0].symbol }}
                <span class="text-t2"></span>
              </h3>
            </div>
            <p
              class="icon_num"
              :style="{ color: topData[0].close < 0 ? '#ea4337' : '#03C59E' }"
            >
              {{ topData[0].close }}
            </p>
            <p class="icon_detail">
              {{ $t("new.markets.turnover") + topData[0].turnover }}
            </p>
          </div>
          <div class="iconsCards_right">
            <p :style="{ color: topData[0].chg < 0 ? '#ea4337' : '#03C59E' }">
              {{ topData[0].chg }}%
            </p>
          </div>
        </router-link>
        <router-link
          v-if="topData[1]"
          :to="
            `/exchange/${(
              topData[1].symbol.split('/')[0] || ''
            ).toLowerCase()}_${(
              topData[1].symbol.split('/')[1] || ''
            ).toLowerCase()}`
          "
          class="iconsCards"
        >
          <div class="iconsCards_left">
            <div style="display: flex;align-items: center;">
              <img
                :src="topData[1].coinImg"
                alt=""
                style="width: 20px;height: 20px;margin-right: 10px;"
              />
              <h3 class="icon_name">
                {{ topData[1].symbol }}
                <span class="text-t2"></span>
              </h3>
            </div>
            <p
              class="icon_num"
              :style="{ color: topData[1].close < 0 ? '#ea4337' : '#03C59E' }"
            >
              {{ topData[1].close }}
            </p>
            <p class="icon_detail">
              {{ $t("new.markets.turnover") + topData[1].turnover }}
            </p>
          </div>
          <div class="iconsCards_right">
            <p :style="{ color: topData[1].chg < 0 ? '#ea4337' : '#03C59E' }">
              {{ topData[1].chg }}%
            </p>
          </div>
        </router-link>
        <router-link
          :to="
            `/exchange/${(
              topData[2].symbol.split('/')[0] || ''
            ).toLowerCase()}_${(
              topData[2].symbol.split('/')[1] || ''
            ).toLowerCase()}`
          "
          class="iconsCards"
          v-if="topData[2]"
        >
          <div class="iconsCards_left">
            <div style="display: flex;align-items: center;">
              <img
                :src="topData[2].coinImg"
                alt=""
                style="width: 20px;height: 20px;margin-right: 10px;"
              />
              <h3 class="icon_name">
                {{ topData[2].symbol }}
                <span class="text-t2"></span>
              </h3>
            </div>
            <p
              class="icon_num"
              :style="{ color: topData[2].close < 0 ? '#ea4337' : '#03C59E' }"
            >
              {{ topData[2].close }}
            </p>
            <p class="icon_detail">
              {{ $t("new.markets.turnover") + topData[2].turnover }}
            </p>
          </div>
          <div class="iconsCards_right">
            <p :style="{ color: topData[2].chg < 0 ? '#ea4337' : '#03C59E' }">
              {{ topData[2].chg }}%
            </p>
          </div>
        </router-link>
        <div v-else style="width: 288px; height: 114px"></div>
        <router-link
          :to="
            `/exchange/${(
              topData[3].symbol.split('/')[0] || ''
            ).toLowerCase()}_${(
              topData[3].symbol.split('/')[1] || ''
            ).toLowerCase()}`
          "
          class="iconsCards"
          v-if="topData[3]"
        >
          <div class="iconsCards_left">
            <div style="display: flex;align-items: center;">
              <img
                :src="topData[3].coinImg"
                alt=""
                style="width: 20px;height: 20px;margin-right: 10px;"
              />
              <h3 class="icon_name">
                {{ topData[3].symbol }}
                <span class="text-t2"></span>
              </h3>
            </div>
            <p
              class="icon_num"
              :style="{ color: topData[3].close < 0 ? '#ea4337' : '#03C59E' }"
            >
              {{ topData[3].close }}
            </p>
            <p class="icon_detail">
              {{ $t("new.markets.turnover") + topData[3].turnover }}
            </p>
          </div>
          <div class="iconsCards_right">
            <p :style="{ color: topData[3].chg < 0 ? '#ea4337' : '#03C59E' }">
              {{ topData[3].chg }}%
            </p>
          </div>
        </router-link>
        <div v-else style="width: 288px; height: 114px"></div>
      </section>
      <div class="nav-right tradeCenter">
        <section class="list-content">
          <Tabs :value="tabType" v-model="tabType" @on-click="tabClick">
            <TabPane :label="$t('new.universal.collecting')" name="0">
              <RadioGroup
                v-model="favorType"
                type="button"
                size="small"
                @on-change="handleFavorType"
                style="margin-bottom: 16px"
              >
                <Radio :label="$t('new.universal.contract')"></Radio>
                <Radio :label="$t('new.universal.spot')"></Radio>
              </RadioGroup>
              <div class="table-responsive list-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :data="favorData"
                  :columns="columnsFavor"
                  class="table-item"
                  highlight-row
                  @on-current-change="getcurrent"
                >
                  <template slot-scope="{ row, index }" slot="symbol">
                    <div style="display: flex;align-items: center;">
                      <Icon
                        @click.stop="handleCollect(row.symbol, 0, favorType)"
                        size="18"
                        color="#03C59E"
                        type="md-star"
                        style="cursor: pointer"
                      />
                      <img
                        :src="row.icon"
                        alt=""
                        style="width: 20px;height: 20px;margin-right: 10px;margin-left: 10px;"
                      />
                      <span>{{ row.symbol }}</span>
                    </div>
                  </template>
                  <template slot-scope="{ row, index }" slot="operate">
                    <div
                      :key="index"
                      :id="
                        favorType === $t('new.universal.contract')
                          ? 'chart' + index
                          : 'charts' + index
                      "
                      :style="{ height: '83px', width: '140px' }"
                    ></div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <!-- swapThumb -->
            <TabPane :label="$t('new.universal.contractTrading')" name="1">
              <div class="table-responsive list-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :data="swapData"
                  :columns="columns"
                  class="table-item"
                  highlight-row
                  @on-current-change="getcurrent0"
                >
                  <template slot-scope="{ row, index }" slot="symbol">
                    <div style="display: flex;align-items: center;">
                      <Icon
                        @click.stop="handleCollect(row.symbol, 0, '合約')"
                        v-if="row.isFavor"
                        size="18"
                        color="#03C59E"
                        type="md-star"
                        style="cursor: pointer"
                      />
                      <Icon
                        @click.stop="handleCollect(row.symbol, 1, '合約')"
                        v-else
                        size="18"
                        type="md-star"
                        style="cursor: pointer"
                      />
                      <img
                        :src="row.coinImg"
                        alt=""
                        style="width: 20px;height: 20px;margin-right: 10px;margin-left: 10px;"
                      />
                      <span>{{ row.symbol }}</span>
                    </div>
                  </template>
                  <template slot-scope="{ row, index }" slot="operate">
                    <div
                      :key="index"
                      :id="'chart' + index"
                      :style="{ height: '83px', width: '140px' }"
                    ></div>
                  </template>
                </Table>
              </div>
            </TabPane>
            <TabPane :label="$t('new.universal.spotTrading')" name="2">
              <div class="table-responsive list-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  :data="marketData"
                  :columns="columns"
                  class="table-item"
                  highlight-row
                  @on-current-change="getcurrent1"
                >
                  <template slot-scope="{ row, index }" slot="symbol">
                    <div style="display: flex;align-items: center;">
                      <Icon
                        @click.stop="handleCollect(row.symbol, 0, '現貨')"
                        v-if="row.isFavor"
                        size="18"
                        color="#03C59E"
                        type="md-star"
                        style="cursor: pointer"
                      />
                      <Icon
                        @click.stop="handleCollect(row.symbol, 1, '現貨')"
                        v-else
                        size="18"
                        type="md-star"
                        style="cursor: pointer"
                      />
                      <img
                        :src="row.coinImg"
                        alt=""
                        style="width: 20px;height: 20px;margin-right: 10px;margin-left: 10px;"
                      />
                      <span>{{ row.symbol }}</span>
                    </div>
                  </template>
                  <template slot-scope="{ row, index }" slot="operate">
                    <div
                      :key="index"
                      :id="'charts' + index"
                      :style="{ height: '83px', width: '140px' }"
                    ></div>
                  </template>
                </Table>
              </div>
            </TabPane>
          </Tabs>
        </section>
      </div>
    </div>

    <!-- 底部 -->
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "../../components/footerPart.vue";
import * as echarts from "echarts";
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
export default {
  components: {
    FooterPart,
  },
  data() {
    var self = this;
    return {
      // 长连接
      stompClient: "",
      timer: "",
      // 頂端數據
      topData: [
        {
          symbol: " ",
          close: " ",
          turnover: " ",
          chg: " ",
        },
        {
          symbol: " ",
          close: " ",
          turnover: " ",
          chg: " ",
        },
        {
          symbol: " ",
          close: " ",
          turnover: " ",
          chg: " ",
        },
        {
          symbol: " ",
          close: " ",
          turnover: " ",
          chg: " ",
        },
      ],
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
      // 收藏數據
      favorData: [],
      // 合約數據
      swapData: [],
      // 現貨數據
      marketData: [],
      // 列表項
      columns: [
        {
          title: this.$t("new.markets.tradingPairs"),
          slot: "symbol",
          align: "left",
          width: 200,
        },
        {
          title: this.$t("dolphin.text183"),
          key: "close",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.close.toFixed(4));
          },
        },
        {
          align: "center",
          title: this.$t("new.markets.gains"),
          key: "chg",
          render: (h, params) => {
            return h(
              "span",
              {
                style: { color: params.row.chg < 0 ? "#ea4337" : "#03C59E" },
              },
              params.row.chg + "%"
            );
          },
        },
        // {
        //   align: "center",
        //   title: this.$t("new.markets.high"),
        //   key: "high",
        //   // render: (h, params) => {
        //   //   return h(
        //   //     "span",
        //   //     {
        //   //       style: { color: params.row.high < 0 ? "#ea4337" : "#03C59E" },
        //   //     },
        //   //     params.row.high
        //   //   );
        //   // },
        // },
        // {
        //   title: this.$t("new.markets.lowest"),
        //   align: "center",
        //   key: "low",
        // },
        // {
        //   title: this.$t("new.markets.volume"),
        //   align: "center",
        //   key: "volume",
        // },
        {
          title: this.$t("new.markets.turnover"),
          align: "center",
          key: "turnover",
          render: (h, params) => {
            return h("span", {}, this.getNewUnit(params.row.turnover));
          },
        },
        {
          title: this.$t("dolphin.text172"),
          slot: "operate",
        },
      ],
      columnsFavor: [
        {
          title: this.$t("new.markets.tradingPairs"),
          slot: "symbol",
          width: 200,
          align: "left",
        },
        {
          title: this.$t("dolphin.text183"),
          key: "close",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.close.toFixed(4));
          },
        },
        {
          align: "center",
          title: this.$t("new.markets.gains"),
          key: "chg",
          render: (h, params) => {
            return h(
              "span",
              {
                style: { color: params.row.chg < 0 ? "#ea4337" : "#03C59E" },
              },
              params.row.chg + "%"
            );
          },
        },
        {
          title: this.$t("new.markets.volume"),
          align: "center",
          key: "volume",
        },
        {
          title: this.$t("dolphin.text172"),
          slot: "operate",
        },
      ],
      tabType: "1",
      favorType: this.$t("new.universal.contract"),

      showIndex: false,
      showCheckbox: false,
      fixedHeader: false,
      dataCount: 10,
      tableSize: "large",
      advertiment: {
        //卖出的广告数据
        ask: {
          rows: [],
          currentPage: 1,
          totalPage: 1,
          pageNumber: 10,
          totalElement: 0,
        },
        //买入的广告数据
        bid: {
          rows: [],
          currentPage: 1,
          totalPage: 1,
          pageNumber: 10,
          totalElement: 0,
        },
        updataTimer: null,
      },
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    coin: function() {
      if (this.$route.query.unit == undefined) return "USDT";
      return this.$route.query.unit;
    },
    lang: function() {
      return this.$store.state.lang;
    },
  },
  watch: {
    coin: function() {
      this.reloadAd();
    },
    lang: function() {
      this.updateLangData();
    },
  },
  created() {
    this.init();

    // 獲取數據列表
    this.getDataList();
    // 改轮询
    this.updataTimer = window.setInterval(() => {
      setTimeout(() => {
        this.getDataList();
      }, 0);
    }, 3000);
  },
  beforeDestroy() {
    window.clearInterval(this.updataTimer);
  },
  methods: {
    goPage(data, url) {
      const coinsArr = data.split("/");
      console.log(coinsArr);
      this.$router.push({
        path: `${url}${coinsArr[0].toLowerCase()}_${coinsArr[1].toLowerCase()}`,
      });
    },
    // 點擊收藏 0 不收藏 1收藏
    handleCollect(symbol, num, favorType) {
      var params = {};
      params["symbol"] = symbol;
      // 判斷是合約還是現貨
      if (favorType === "合約") {
        // 合約
        // 判斷是否要收藏
        if (num === 0) {
          this.$http
            .post(this.host + this.api.markets.delSwapFavor, params)
            .then((res) => {
              this.getDataList();
            });
        } else {
          this.$http
            .post(this.host + this.api.markets.addSwapFavor, params)
            .then((res) => {
              this.getDataList();
            });
        }
      } else {
        // 現貨
        // 判斷是否要收藏
        if (num === 0) {
          this.$http
            .post(this.host + this.api.markets.delFavor, params)
            .then((res) => {
              this.getDataList();
            });
        } else {
          this.$http
            .post(this.host + this.api.markets.addFavor, params)
            .then((res) => {
              this.getDataList();
            });
        }
      }
    },
    // tab頁點擊
    tabClick(name) {
      this.tabType = name;
      this.$nextTick(() => {
        this.getDataList();
      });
    },
    // 切換收藏類別
    handleFavorType(name) {
      this.favorType = name;
      this.$nextTick(() => {
        this.getDataList();
      });
    },
    // 獲取數據
    getDataList() {
      // 頁面上方四條數據 獲取現貨的
      this.$http
        .post(this.host + this.api.markets.marketThumb, {})
        .then((res) => {
          this.topData = res.data.data;
        });
      if (this.tabType === "0") {
        if (this.isLogin) {
          // 收藏
          if (this.favorType === this.$t("new.universal.contract")) {
            // 合約收藏
            this.$http
              .post(this.host + this.api.markets.swapFavorThumb, {})
              .then((res) => {
                var resData = res.data.data;
                this.favorData = resData;
                this.favorData.forEach((item, index) => {
                  this.$nextTick(() => {
                    this.drawLines(item, index);
                  });
                });
              });
          } else {
            // 現貨收藏
            this.$http
              .post(this.host + this.api.markets.favorThumb, {})
              .then((res) => {
                var resData = res.data.data;
                this.favorData = resData;
                this.favorData.forEach((item, index) => {
                  this.$nextTick(() => {
                    this.drawLines1(item, index);
                  });
                });
              });
          }
        }
      } else if (this.tabType === "1") {
        // 合約
        this.$http
          .post(this.host + this.api.markets.swapThumb, {})
          .then((res) => {
            let allData = res.data;
            if (this.isLogin) {
              //查询收藏
              this.$http
                .post(this.host + this.api.markets.swapFavorThumb, {})
                .then((res) => {
                  var resData = res.data.data;
                  for (let i = 0; i < allData.length; i++) {
                    let Index = resData.findIndex((item) => {
                      return item.symbol === allData[i].symbol;
                    });
                    if (Index != -1) {
                      allData[i].isFavor = true;
                    } else {
                      allData[i].isFavor = false;
                    }
                  }
                });
            }
            this.swapData = allData;
            this.swapData.forEach((item, index) => {
              this.$nextTick(() => {
                this.drawLines(item, index);
              });
            });
          });
      } else {
        // 現貨
        this.$http
          .post(this.host + this.api.markets.marketThumb, {})
          .then((res) => {
            let allData = res.data.data;
            if (this.isLogin) {
              //查询收藏
              this.$http
                .post(this.host + this.api.markets.favorThumb, {})
                .then((res) => {
                  var resData = res.data.data;
                  for (let i = 0; i < allData.length; i++) {
                    let Index = resData.findIndex((item) => {
                      return item.symbol === allData[i].symbol;
                    });
                    if (Index != -1) {
                      allData[i].isFavor = true;
                    } else {
                      allData[i].isFavor = false;
                    }
                  }
                });
            }
            this.marketData = allData;
            this.marketData.forEach((item, index) => {
              this.$nextTick(() => {
                this.drawLines1(item, index);
              });
            });
          });
      }
    },
    getcurrent0(e) {
      this.goPage(e.symbol, "/swap/");
    },
    getcurrent1(e) {
      this.goPage(e.symbol, "/exchange/");
    },
    getcurrent(e) {
      if (this.favorType === this.$t("new.universal.contract")) {
        this.goPage(e.symbol, "/swap/");
      } else {
        this.goPage(e.symbol, "/exchange/");
      }
    },
    drawLines(chartData, index) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.getInstanceByDom(
        document.getElementById("chart" + index)
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("chart" + index));
      }
      this.chartConfig.series[0].data = chartData.ninetyClosePrice;
      let color = chartData.chg < 0 ? "#ea4337" : "#03C59E";
      this.chartConfig.yAxis.min = chartData.low;
      this.chartConfig.yAxis.max = chartData.high;
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
      let color = chartData.chg < 0 ? "#ea4337" : "#03C59E";
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

    init() {
    },
    updateLangData() {
      this.advertiment.columns[0].title = this.$t("otc.merchant");
      this.advertiment.columns[1].title = this.$t("otc.volume");
      this.advertiment.columns[2].title = this.$t("otc.paymethod");
      this.advertiment.columns[2].title = this.$t("otc.amount");
      this.advertiment.columns[2].title = this.$t("otc.price_coin");
      this.advertiment.columns[2].title = this.$t("otc.operate");
    },
    strpro(str) {
      let newStr = str;
      str = str.slice(1);
      var re = /[\D\d]*/g;
      var str2 = str.replace(re, function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
          result += "*";
        }
        return result;
      });
      return newStr.slice(0, 1) + str2;
    },
  },
};
</script>

<style scoped lang="less">
#List .nav-right {
  color: #26264c;
  padding-right: 0;
  .list-content {
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
@import url("../../assets/css/common.less");
.markets_main {
  width: 100%;
  .main_content {
    min-height: calc(100vh - 56px - 372px);
    width: 1200px;
    margin: 0 auto;
    padding-top: 94px;
    margin-bottom: 80px;
    .iconsCards {
      cursor: pointer;
      width: 288px;
      height: 114px;
      color: #6f6f6f;
      padding-top: 18px;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      .iconsCards_left {
        width: 60%;
        .icon_name {
          line-height: 18px;
          font-size: 16px;
          color: #1c1c1c;
          margin-right: 40px;
        }
        .icon_num {
          font-size: 18px;
          margin: 12px 0;
          font-weight: 500;
        }
        .icon_detail {
          line-height: 1 !important;
          font-size: 12px;
          width: 200px;
        }
      }
      .iconsCards_right {
        width: 40%;
        p {
          font-size: 18px;
          line-height: 28px;
          text-align: right;
        }
      }
    }
    .iconsCards:hover {
      box-shadow: 0 0 16px 12px #efefef;
    }
  }
  .tradeCenter {
    margin-top: 24px;
    box-shadow: 0 0 7px 0 rgba(172, 172, 172, 0.3);
    border-radius: 15px;
  }
}

.list-table {
  overflow: auto !important;
  &::-webkit-scrollbar {
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    // background: #ccc;
  }
  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  .table {
    width: 200%;
  }
}
.table-item {
  width: 1200px !important;
}
@media screen and (max-width: 768px) {
  .table-item {
    width: 800px !important;
  }
}
#List .nav-right {
  color: #26264c;
  padding-right: 0;
  .list-content {
    color: #fff;
    // overflow: auto;
    .ivu-tabs {
      // overflow: auto;
      .ivu-tabs-bar {
        border-bottom: none;
        .ivu-tabs-nav-container {
          .ivu-tabs-nav-wrap {
            .ivu-tabs-nav-scroll {
              .ivu-tabs-ink-bar.ivu-tabs-ink-bar-animated {
                background: #f0ac19;
              }
              .ivu-tabs-tab {
                &:hover {
                  color: #f0ac19;
                }
              }
              .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused {
                color: #f0ac19;
              }
            }
          }
        }
      }
      .ivu-tabs-content.ivu-tabs-content-animated {
        .ivu-tabs-tabpane {
          .ivu-table-wrapper {
            border: none;
            .ivu-table-body {
              .ivu-table-tbody {
                .ivu-table-row {
                  .ivu-table-cell.ivu-table-cell-ellipsis {
                    .user-face.user-avatar-public {
                      span {
                        background: #f0ac19;
                      }
                    }
                    p a {
                      color: #f0ac19;
                    }
                  }
                }
              }
            }
          }
          .page_change {
            margin: 10px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.tradeCenter button span,
.tradeCenter button a,
.tradeCenter button a:hover {
  display: block;
  color: white;
}

.tradeCenter .ivu-poptip-popper button span {
  display: block;
  color: inherit;
}

#carousel {
  margin-bottom: 40px;
}

#List .nav-right .list-content .list-table .user-name .user-icon span {
  font-size: 22px;
  color: white;
  align-self: center;
}

#List .nav-right .list-content .list-table .user-name .user-info {
  margin-left: 5%;
  width: 100px;
  word-wrap: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#List .nav-right .list-content .list-table .user-name .user-info p {
  height: 16px;
  margin: 0 0 3px;
}
#List .nav-right .list-content .pagelist {
  display: flex;
  justify-content: flex-end;
}

#List .nav-right .list-content .pagelist ul {
  list-style: none;
}

#List .nav-right .list-content .pagelist ul li {
  display: inline-block;
  background-color: #ebeff5;
  height: 32px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px solid #c5cdd7;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 2px;
}

#List .nav-right .list-content .pagelist ul li:hover {
  background-color: #c5cdd7;
}

#List .nav-right .list-content .pagelist ul li a {
  color: #26264c;
}

#List .header-search {
  width: 100%;
}

#List .select-items select {
  width: initial;
}

#List .list-payMethod {
  width: 80%;
  display: inline-block;
  word-break: keep-all;
}

.select-items .form-control {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.nav-pills .dropdown a {
  color: #555555 !important;
}

.has-success .control-label {
  color: #26264c !important;
}

.trade-group {
  margin-bottom: 20px;
  font-size: 14px;
}

.merchant-icon {
  display: inline-block;
  margin-left: 4px;
  background-size: 100% 100%;
}

.merchant-icon.tips {
  width: 4px;
  height: 22px;
  margin-right: 10px;
  background: #03C59E;
}

.merchant-icon.alipay {
  width: 17px;
  height: 17px;
  background-image: url(../../assets/img/alipay.png);
}

.merchant-icon.bankcard {
  width: 17px;
  height: 17px;
  background-image: url(../../assets/img/bankcard.png);
}

.merchant-icon.wechat {
  width: 17px;
  height: 17px;
  background-image: url(../../assets/img/wechat.png);
}

.merchant-icon.westernunion {
  width: 17px;
  height: 17px;
}

.merchant-icon.paytm {
  width: 29px;
  height: 17px;
}

.merchant-icon.m-booth {
  width: 131px;
  height: 94px;
  background-position: 0 -220px;
}

.merchant-icon.m-server {
  width: 158px;
  height: 94px;
  background-position: 0 -335px;
}

.merchant-icon.m-rate {
  width: 125px;
  height: 94px;
  background-position: 0 -110px;
}

.merchant-icon.m-ok {
  width: 23px;
  height: 9px;
  background-position: -100px 0;
}

.merchant-top {
  display: flex;
  align-items: center;
  // background: #fff;
  padding: 0 15px;
  color: #fff;
}

.merchant-top .tips-word {
  flex-grow: 2;
  text-align: left;
}

.merchant-item {
  padding: 20px 15px 20px 15px;
  background: #fff;
  width: 31%;
  float: left;
  margin: 0 1%;
}

.merchant-item.center {
  margin: 0 1.5%;
}

.merchant-item .item-hd {
  /* background: url("../../images/trade/merchant_item_split.png") left bottom no-repeat; */
  padding-bottom: 20px;
  display: flex;
  align-items: center;
}

.merchant-item .item-hd .item-face {
  width: 42px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  border-radius: 42px;
  -webkit-border-radius: 42px;
  color: #fff;
  background: #00b5f6;
}

.merchant-item .item-hd .item-name {
  padding: 0 10px;
}

.merchant-item .item-hd .item-name p {
  margin-bottom: 0;
}

.merchant-item .item-hd .item-name p:first-child {
  color: #fff;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.merchant-item .item-hd .item-name p:last-child {
  color: #5c68a6;
  font-size: 12px;
}

.merchant-item .text-right {
  display: flex;
  justify-content: flex-end;
}

.merchant-item .text-right .online-status-box {
  color: #18b111;
  display: flex;
}

.merchant-item .item-hd .item-pay {
  flex-grow: 2;
  text-align: right;
}

.merchant-item .item-hd .item-pay .states {
  height: 17px;
  width: 67px;
  display: inline-block;
}

.merchant-item .item-hd .item-pay .states.merchant {
  background: url("../../assets/img/renzheng.png") no-repeat;
  background-size: 100% 100%;
}

.merchant-item .item-hd .item-pay p {
  font-size: 12px;
  color: #ed7325;
  margin-bottom: 5px;
}

.merchant-item .item-bd {
  padding-top: 10px;
}

.merchant-item .item-bd .price {
  font-size: 16px;
  color: #3e435e;
  font-weight: bold;
}

.merchant-item .item-bd .price span {
  font-size: 12px;
}

.merchant-item .item-bd .limit {
  color: #636981;
  font-size: 12px;
  padding-bottom: 15px;
}

.merchant-item .item-bd .btn {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #fff;
  padding: 0 12px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
}

.merchant-item .item-bd .btn-buy {
  background: #ed7325;
}

.merchant-item .item-bd .btn-sell {
  background: #0db124;
}

.merchant-items {
  margin-bottom: 40px;
}

.carousel-indicators li {
  width: 30px;
  height: 5px;
  border-radius: 5px;
  -webkit-border-radius: 3px;
  border: none;
  background: #d4d6e1;
}

.carousel-indicators .active {
  width: 30px;
  height: 5px;
  border-radius: 5px;
  -webkit-border-radius: 3px;
  border: none;
  background: #7f8bc6;
  margin: 1px;
}

.carousel-indicators {
  bottom: -30px;
}

.m-intro {
  width: 33.33%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.m-intro p {
  color: #474e72;
  font-weight: bold;
  font-size: 16px;
}

.m-subtitle {
  line-height: 40px;
  padding-left: 20px;
  background: #f7f7fa;
  color: #636981;
  font-size: 12px;
}

.m-data-lf {
  width: 20%;
  float: left;
  display: flex;
  align-items: center;
}

.m-data-cn {
  width: 45%;
  float: left;
  display: flex;
  align-items: center;
}

.m-data-rf {
  width: 35%;
  float: left;
  display: flex;
  align-items: center;
}

.online-status-box {
  height: 20px;
}

.headerimg {
  color: rgb(245, 106, 0);
  background-color: rgb(253, 227, 207);
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  margin-right: 5px;
}

.headerimg ~ p {
  display: inline-block;
}

// .price {
//   font-size: 16px;
//   font-weight: bolder;
//   color: #444f71;
// }

// .price2 {
//   font-size: 12px;
//   color: #8994a3;
//   margin-top: 0;
// }

.renzheng {
  height: 17px;
  width: 67px;
  display: inline-block;
  background: url("../../assets/img/renzheng.png") no-repeat;
  background-size: 100% 100%;
  transform: translateY(-10px);
  display: block;
}

.renzhengA {
  transform: translateY(-10px);
  display: block;
}

.tjbtn {
  width: 80%;
}

.user-avatar-public {
  background: #fff;
  border-radius: 50%;
  height: 45px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
  position: relative;
}

.user-avatar-public > .user-avatar-in {
  background: #03C59E;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.ivu-table-cell .user-avatar-public {
  width: 45px;
  display: inline-block;
  margin: 10px 10px 10px 0;
  vertical-align: middle;
}

.ivu-table-cell .user-avatar-public > .user-avatar-in {
  transform: translate(5px, 5px);
}

.ivu-table-cell .user-avatar-public ~ p {
  /*width: 60%;*/
  display: inline-block;
}

.go_page_btn {
  cursor: pointer;
}
</style>
