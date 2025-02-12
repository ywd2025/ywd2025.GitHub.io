<template>
  <div class="leader_detail">
    <div theme="dark" class="header_part">
      <Breadcrumb class="Breadcrumb">
        <BreadcrumbItem to="/follow">{{
          $t("follow.follower.txt1")
        }}</BreadcrumbItem>
        <BreadcrumbItem>{{ $t("follow.follower.txt2") }}</BreadcrumbItem>
      </Breadcrumb>
      <div class="leader_info">
        <div class="leader_info_content">
          <div class="leader_header">
            <img
              style="width: 100%; height: 100%; border-radius: 100%"
              :src="myFollowInfo.headUrl"
            />
          </div>
          <dl class="leader_other">
            <dt
              style="
                line-height: 30px;
                font-weight: 700;
                font-size: 28px;
                padding-top: 8px;
                margin-bottom: 16px;
              "
            >
              <span>{{ myFollowInfo.username }}</span>
            </dt>
            <dd style="align-items: center; display: flex; color: #99a1a8">
              <!-- UID:<span style="color: #ffffff;margin-left: 4px">16754921</span> -->
            </dd>
          </dl>
        </div>
        <div class="leader_share">
          <!-- <Icon class="icon" size="24" type="ios-share-alt-outline" /> -->
        </div>
      </div>
    </div>
    <div class="header_detail">
      <!-- <div class="header_detail_top">
        <div style="width: 263px;">
          <p>總資產(USDT)</p>
          <div class="header_detail_numPart">
            <span>0.00</span>
            <Button type="text" class="">劃轉</Button>
            <div class="header_detail_symbol">
              =
            </div>
          </div>
        </div>
        <div style="width: 263px;">
          <p>跟單本金</p>
          <div class="header_detail_numPart">
            <span>0.00</span>
            <div class="header_detail_symbol">
              +
            </div>
          </div>
        </div>
        <div style="width: 263px;">
          <p>跟單收益</p>
          <div class="header_detail_numPart">
            <span>0.00</span>
            <div class="header_detail_symbol">
              +
            </div>
          </div>
        </div>
        <div style="width: 263px;">
          <p>當前倉位盈虧</p>
          <div class="header_detail_numPart">
            <span>0.00</span>
          </div>
        </div>
      </div> -->
      <div class="header_detail_bottom">
        <div style="width: 25%">
          <p>{{ $t("follow.index.txt19") }}(USDT)</p>
          <p class="header_detail_numPart">{{ myFollowInfo.syAll }}</p>
        </div>
        <div style="width: 25%">
          <p>{{ $t("follow.follower.txt3") }}</p>
          <div class="header_detail_numPart">{{ myFollowInfo.bjAll }}</div>
        </div>
        <div style="width: 25%">
          <p>{{ $t("follow.follower.txt4") }}</p>
          <div class="header_detail_numPart">{{ myFollowInfo.days }}</div>
        </div>
        <div style="width: 25%">
          <p>{{ $t("follow.follower.txt5") }}</p>
          <div class="header_detail_numPart">{{ myFollowInfo.people }}</div>
        </div>
        <div class="cencal_all">
          <Button type="primary" @click="cencalAllList()">{{
            $t("carouselItem.text204")
          }}</Button>
        </div>
      </div>
      <div class=""></div>
    </div>
    <div class="leader_content">
      <Tabs @on-click="handleTabs" value="0">
        <TabPane :label="$t('follow.follower.txt6')" name="0">
          <Table
            :columns="followerColumns"
            :data="followerList"
            :loading="tableLoading"
            :no-data-text="$t('common.nodata')"
          >
            <template slot-scope="{ row }" slot="headUrl">
              <img
                :src="row.headUrl"
                alt=""
                style="height: 40px; width: 40px"
              />
            </template>
            <template slot-scope="{ row }" slot="operate">
              <Button
                type="warning"
                v-if="row.fellowType == 1"
                @click="handleCancel(row)"
              >
                {{ $t("follow.follower.txt7") }}
              </Button>
            </template>
          </Table>
        </TabPane>
        <TabPane :label="$t('follow.follower.txt8')" name="1">
          <div v-if="followList.length === 0" style="padding-top: 12px">
            <section style="padding: 80px 0">
              <div style="text-align: center">
                {{ $t("follow.follower.txt9") }}
                <!-- 交易員的當前帶單僅對跟隨用戶可見，請先跟隨 -->
              </div>
            </section>
          </div>
          <div v-else style="padding-top: 12px">
            <table class="history_table" style="position: relative">
              <Spin size="large" fix v-if="tableLoading"></Spin>
              <thead>
                <tr
                  style="
                    color: #6f6f6f;
                    font-size: 12px;
                    line-height: 16px;
                    height: 36px;
                  "
                >
                  <th style="padding-left: 0">
                    {{ $t("follow.universal.positions") }}
                  </th>
                  <th>{{ $t("follow.universal.positionsTime") }}</th>
                  <th>
                    {{ $t("exchange.openprice") }} |
                    {{ $t("carouselItem.text57") }}
                  </th>
                  <th>
                    {{ $t("follow.universal.openInterest") }} |
                    {{ $t("follow.universal.earnestMoney") }}
                  </th>
                  <th>{{ $t("follow.universal.earning") }}</th>
                  <th>{{ $t("follow.universal.txt1") }}(USDT)</th>
                  <th>{{ $t("follow.universal.txt2") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in followList" :key="item.id">
                  <td style="padding-left: 0px">
                    <div class="table_coin_name">
                      <p class="flex">
                        <span
                          v-if="item.entrustType == 'OPEN'"
                          :class="[item.direction == 'BUY' ? 'green' : 'red']"
                        >
                          {{
                            item.direction == "BUY"
                              ? $t("swap.up")
                              : $t("swap.down")
                          }}
                        </span>
                        <span
                          v-else
                          :class="[item.direction == 'SELL' ? 'green' : 'red']"
                        >
                          {{
                            item.direction == "SELL"
                              ? $t("swap.up")
                              : $t("swap.down")
                          }}
                        </span>
                        <a
                          style="
                            font-size: 18px;
                            line-height: 20px;
                            color: #1c1c1c;
                          "
                        >
                          {{ item.symbol }}
                        </a>
                      </p>
                      <p style="margin-top: 6px">
                        <span class="lever">{{ item.leverage }}x</span>
                        <span style="color: #6f6f6f">
                          {{ $t("follow.universal.txt3") }}・{{
                            item.patterns === "CROSSED"
                              ? $t("follow.universal.txt4")
                              : $t("follow.universal.txt5")
                          }}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td class="">
                    <div class="whitespace-nowrap">
                      <p class="">{{ dateFormat(item.createTime) }}</p>
                    </div>
                  </td>
                  <td class="">
                    <p class="">
                      <!-- 开仓价格 -->
                      {{ item.openOrderPrice }}
                    </p>
                    <p style="margin-top: 8px; color: #6f6f6f">
                      <!-- 标记价格 -->
                      {{ allList_filter(item.symbol) }}
                    </p>
                  </td>
                  <td class="">
                    <div>
                      <!-- 持仓量(张) -->
                      <p class="">{{ item.volume }}</p>
                      <!-- 保证金 -->
                      <p style="margin-top: 8px; color: #6f6f6f">
                        {{ item.principalAmount }}
                      </p>
                    </div>
                  </td>
                  <td class="">
                    <!-- 收益率 -->
                    <span
                      :style="{
                        color: getYield(item) <= 0 ? '#f15057' : '#00b275',
                      }"
                    >
                      {{ getYield(item) }}%
                    </span>
                  </td>
                  <td class="">
                    <span
                      :style="{
                        color: getIncome(item) <= 0 ? '#f15057' : '#00b275',
                      }"
                    >
                      {{ getIncome(item) }}
                    </span>
                  </td>
                  <td class="">
                    <!-- 预估强评价 -->
                    <span>
                      {{ getForcePrice(item) }}
                    </span>
                  </td>
                  <!-- <td class="first:pl-0 last:pr-1 px-2.5 last:text-right min-w-24">
                    <Icon size="20" type="md-open" />
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane :label="$t('follow.follower.txt10')" name="2">
          <div v-if="followList.length === 0" style="padding-top: 12px">
            <section style="padding: 80px 0">
              <div style="text-align: center">
                {{ $t("follow.follower.txt11") }}
                <!-- 交易員的當前帶單僅對跟隨用戶可見，請先跟隨 -->
              </div>
            </section>
          </div>
          <div v-else style="padding-top: 12px">
            <table class="history_table" style="position: relative">
              <Spin size="large" fix v-if="tableLoading"></Spin>
              <thead>
                <tr
                  style="
                    color: #6f6f6f;
                    font-size: 12px;
                    line-height: 16px;
                    height: 36px;
                  "
                >
                  <th style="padding-left: 0">
                    {{ $t("follow.universal.positions") }}
                  </th>
                  <th>{{ $t("follow.universal.createTime") }}</th>
                  <th>{{ $t("follow.universal.txt6") }}</th>
                  <th>{{ $t("follow.universal.txt7") }}</th>
                  <th>{{ $t("exchange.closeprice") }}</th>
                  <th>{{ $t("swap.pos_pos") }}</th>
                  <th>{{ $t("carouselItem.text239") }}</th>
                  <th>{{ $t("follow.universal.earning") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in followList" :key="item.id">
                  <td style="padding-left: 0px">
                    <div class="table_coin_name">
                      <p class="flex">
                        <span
                          v-if="item.entrustType == 'OPEN'"
                          :class="[item.direction == 'BUY' ? 'green' : 'red']"
                        >
                          {{
                            item.direction == "BUY"
                              ? $t("swap.up")
                              : $t("swap.down")
                          }}
                        </span>
                        <span
                          v-else
                          :class="[item.direction == 'SELL' ? 'green' : 'red']"
                        >
                          {{
                            item.direction == "SELL"
                              ? $t("swap.up")
                              : $t("swap.down")
                          }}
                        </span>
                        <a
                          style="
                            font-size: 18px;
                            line-height: 20px;
                            color: #1c1c1c;
                          "
                        >
                          {{ item.symbol }}
                        </a>
                      </p>
                      <p style="margin-top: 6px">
                        <span class="lever">{{ item.leverage }}x</span>
                        <span style="color: #6f6f6f">
                          {{ $t("follow.universal.txt3") }}・{{
                            item.patterns === "CROSSED"
                              ? $t("follow.universal.txt4")
                              : $t("follow.universal.txt5")
                          }}
                        </span>
                      </p>
                    </div>
                  </td>
                  <td class="">
                    <div class="whitespace-nowrap">
                      <!-- 创建时间 -->
                      <p class="">{{ dateFormat(item.createTime) }}</p>
                    </div>
                  </td>
                  <td class="">
                    <!-- 交易员头像 -->
                    <img
                      :src="item.traderAvatar"
                      style="width: 40px; height: 40px"
                    />
                  </td>
                  <td class="">
                    <!-- 交易员昵称 -->
                    {{ item.traderUsername }}
                  </td>
                  <td class="">
                    <!-- 开仓均价 -->
                    <span>{{ item.tradedPrice }}</span>
                  </td>
                  <td class="">
                    <!-- 持仓量 -->
                    <span> {{ item.volume }}{{ $t("swap.shareNumber") }} </span>
                  </td>
                  <td class="">
                    <!-- 合约面值 -->
                    <span>{{ item.shareNumber }}</span>
                  </td>
                  <td class="">
                    <!-- 收益率 -->
                    <span v-if="item.principalAmount == 0"> 0% </span>
                    <span v-else>
                      <span
                        :style="{
                          color:
                            item.profitAndLoss <= 0 ? '#f15057' : '#00b275',
                        }"
                      >
                        {{
                          (
                            (item.profitAndLoss / item.principalAmount) *
                            100
                          ).toFixed(2) + "%"
                        }}
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
      </Tabs>
      <div style="text-align: center; width: 100%; margin-top: 20px">
        <Page
          class="pages"
          :total="total"
          :current="pageNo"
          :page-size="10"
          @on-change="pageChange"
        />
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
import * as echarts from "echarts";

import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);

var moment = require("moment");

export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      // 分页信息
      total: 0,
      pageNo: 1,
      pageSize: 10,
      currentPage: 1,
      // 加载
      tableLoading: false,
      coinSymboly: [],
      // 我的跟单信息
      myFollowInfo: {},
      // 我的交易员
      followerList: [],
      followerColumns: [
        {
          title: this.$t("follow.follower.txt12"),
          key: "fellowType",
          minWidth: 120,
          render: (h, params) => {
            if (params.row.fellowType == 0) {
              return h("span", {}, this.$t("follow.follower.txt13"));
            } else if (params.row.fellowType == 1) {
              return h("span", {}, this.$t("follow.follower.txt14"));
            }
          },
        },
        {
          title: this.$t("follow.universal.txt9"),
          key: "docBalance",
          minWidth: 300,
        },
        {
          title: this.$t("follow.follower.txt15"),
          key: "syAll",
          minWidth: 120,
        },
        {
          title: this.$t("follow.universal.header"),
          slot: "headUrl",
          minWidth: 120,
        },
        {
          title: this.$t("follow.follower.txt16"),
          key: "username",
          minWidth: 200,
        },
        {
          title: this.$t("buyCoin.universal.operate"),
          slot: "operate",
          fixed: "right",
          minWidth: 280,
        },
      ],
      currentTab: "0",
      // 历史/当前跟单列表
      followList: [],
    };
  },
  inject: ["reload"],
  // created: function() {
  //   this.queryId = this.$route.params.id;

  //   this.init();
  // },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  destroyed() {
    this.stopPolling();
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    langPram() {
      return this.$store.state.lang;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
  },
  mounted() {
    // 获取我的跟单信息
    this.getMyFollowInfo();
    // 获取我的交易员信息
    this.getFollowerList();
    this.startPolling();
  },
  methods: {
    getMyFollowInfo() {
      this.$http
        .get(this.host + this.api.follow.myFollowInfo)
        .then((response) => {
          var res = response.data;
          this.myFollowInfo = res.data;
        });
    },
    // 控制tab页
    handleTabs(value) {
      this.currentTab = value;
      if (this.currentTab === "0") {
        // 获取我的交易员信息
        this.getFollowerList();
      } else if (this.currentTab === "1") {
        // 当前跟单
        this.getCurrentFollow();
      } else {
        // 历史跟单
        this.getHistoryFollow();
      }
    },
    // 当前跟单
    getCurrentFollow() {
      this.tableLoading = true;
      this.$http
        .get(this.host + this.api.follow.currentFollowApi, {
          params: {
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((response) => {
          var res = response.data;
          this.followList = res.data;
          this.total = res.totalPage * 10;
          for (let i = 0; i < this.followList.length; i++) {
            this.$http
              .get(this.host + this.api.swap.coinInfo, {
                params: {
                  symbol: this.followList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.followList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.followList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.followList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.tableLoading = false;
        });
    },
    // 历史跟单
    getHistoryFollow() {
      this.tableLoading = true;
      this.$http
        .get(this.host + this.api.follow.historyFollowApi, {
          params: {
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((response) => {
          var res = response.data;
          this.followList = res.data;
          this.total = res.totalPage * 10;
          for (let i = 0; i < this.followList.length; i++) {
            this.$http
              .get(this.host + this.api.swap.coinInfo, {
                params: {
                  symbol: this.followList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.followList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.followList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.followList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.tableLoading = false;
        });
    },
    // 获取列表信息
    getFollowerList() {
      this.tableLoading = true;
      var params = {};
      // params["pageNo"] = pageNo;
      // params["orderType"] = orderType;
      // params["pageSize"] = 10;
      this.$http
        .get(this.host + this.api.follow.myTraderInfoApi, { params: params })
        .then((response) => {
          var res = response.data;
          this.followerList = res.data;
          this.tableLoading = false;
          if (res.code == 0) {
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: res.message,
            });
            this.tableLoading = false;
          }
        });
    },
    // 取消连续跟随
    handleCancel(row) {
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: this.$t("follow.follower.txt17"),
        okText: this.$t("buyCoin.universal.okText"),
        cancelText: this.$t("buyCoin.universal.cancelText"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.follow.cancelFellowApi, {
              traderId: row.memberId,
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.$Message.success(res.data.message);
                this.getFollowerList(); //1, this.searchData.orderType
              } else {
                this.$Message.error(res.data.message);
              }
            });
        },
        onCancel: () => {},
      });
    },

    // 分页
    pageChange(page) {
      this.pageNo = page;
      if (this.currentTab === "0") {
        // 获取我的交易员信息
        this.getFollowerList();
      } else if (this.currentTab === "1") {
        // 当前跟单
        this.getCurrentFollow();
      } else {
        // 历史跟单
        this.getHistoryFollow();
      }
    },
    // 获取合约不同杠杆下合约最低保证金率
    getRuleList(item) {
      this.$http
        .get(this.host + this.api.finance.getRuleMarginRate, {
          contractId: item,
        })
        .then((res) => {
          return res.data.data;
        });
    },
    allList_filter(item) {
      var a = "";
      this.coinSymboly.map((items) => {
        if (items.symbol == item) {
          a = items.close;
        }
      });
      return a;
    },
    contractCoinId_filter(item) {
      var id = "";
      this.coinSymboly.map((items) => {
        if (items.symbol == item) {
          id = items.contractCoinId;
        }
      });
      return id;
    },
    // 强平价
    getForcePrice(item) {
      var coinId = this.contractCoinId_filter(item.symbol);
      var allList = this.getRuleList(coinId);
      var MarginRate = this.getMaintenanceMarginRate(allList, item.leverage);
      if (item.direction === "BUY") {
        return this.buyForcePrice(
          item.tradedPrice,
          MarginRate,
          item.principalAmount,
          item.openFee,
          item.shareNumber,
          item.volume
        );
      } else {
        return this.sellForcePrice(
          item.tradedPrice,
          MarginRate,
          item.principalAmount,
          item.openFee,
          item.shareNumber,
          item.volume
        );
      }
    },
    // 收益
    getIncome(item) {
      var price = this.allList_filter(item.symbol);
      if (item.direction === "BUY") {
        return this.buyIncome(
          price,
          item.tradedPrice,
          item.shareNumber,
          item.volume
        );
      } else {
        return this.sellIncome(
          price,
          item.tradedPrice,
          item.shareNumber,
          item.volume
        );
      }
    },
    // 收益率
    getYield(item) {
      let price = this.getIncome(item);
      return this.swapYield(price, item.principalAmount);
    },
    startPolling() {
      // 每隔一段时间查询数据
      this.timers = Number(
        setInterval(() => {
          this.getSwapSymbol();
        }, 3000)
      ); // 每 3 秒查询一次
    },
    stopPolling() {
      // 停止轮询
      clearInterval(this.timers);
      this.timers = 0;
    },
    getSwapSymbol() {
      this.$http
        .post(this.host + this.api.markets.swapThumb, {})
        .then((res) => {
          this.coinSymboly = res.data;
        });
    },
    // 取消所有跟单
    cencalAllList() {
      this.$http
        .post(this.host + this.api.follow.deleteAllDoc, {})
        .then((res) => {
          if (res.body.code == 0) {
            this.$Message.success(res.body.message);
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.leader_detail {
  padding-top: 50px;
  flex: 1 1 0%;
  color: #1c1c1c;
  min-width: 1200px;
  .header_part {
    color: #ffffff;
    padding-bottom: 48px;
    background-color: rgb(17, 20, 23);
    height: 300px;
    .Breadcrumb {
      padding-top: 24px;
      align-items: center;
      width: 1200px;
      display: flex;
      margin: 0 auto;
    }
    .leader_info {
      justify-content: space-between;
      align-items: flex-start;
      width: 1200px;
      display: flex;
      margin: 30px auto 0;
      .leader_info_content {
        display: flex;
        flex: 1 1 0%;
        align-items: flex-start;
        .leader_header {
          flex-shrink: 0;
          width: 88px;
          height: 88px;
        }
        .leader_other {
          flex: 1 1 0%;
          margin: 0px 24px;
          .tags {
            line-height: 14px;
            color: #ffaa00;
            font-size: 12px;
            padding: 4px 6px;
            background-color: rgb(41, 37, 21);
            margin-left: 8px;
          }
          .timeAndPeople {
            display: flex;
            align-items: center;
            font-size: 16px;
            line-height: 1;
          }
        }
      }
      .leader_share {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        .icon {
          padding-right: 24px;
          margin-left: 22px;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .header_detail {
    padding-bottom: 30px !important;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 4px;
    width: 1200px;
    margin: -114px auto 0;
    position: relative;
    border: 1px solid #eeeeee;
    .header_detail_top {
      padding-bottom: 22px !important;
      justify-content: space-between;
      display: flex;
      p {
        color: #6f6f6f;
        line-height: 20px;
        font-size: 14px;
      }
      .header_detail_numPart {
        color: #1c1c1c;
        line-height: 30px;
        font-weight: 700;
        font-size: 26px;
        padding-right: 54px;
        align-items: center;
        display: flex;
        margin-top: 12px;
        position: relative;
        .header_detail_symbol {
          color: #c0c0c0;
          line-height: 24px;
          font-size: 20px;
          text-align: center;
          background-color: #f8f8f8;
          border-radius: 9999px;
          width: 24px;
          height: 24px;
          top: 6px;
          right: 26px;
          position: absolute;
        }
      }
    }
    .header_detail_bottom {
      // padding-top: 24px;
      // border-top: 1px solid #eeeeee;
      justify-content: space-between;
      display: flex;
      p {
        color: #6f6f6f;
        line-height: 20px;
        font-size: 14px;
      }
      .header_detail_numPart {
        color: #1c1c1c;
        line-height: 30px;
        font-weight: 700;
        font-size: 26px;
        padding-right: 54px;
        align-items: center;
        display: flex;
        margin-top: 12px;
        position: relative;
        .header_detail_symbol {
          color: #c0c0c0;
          line-height: 24px;
          font-size: 20px;
          text-align: center;
          background-color: #f8f8f8;
          border-radius: 9999px;
          width: 24px;
          height: 24px;
          top: 6px;
          right: 26px;
          position: absolute;
        }
      }
      .cencal_all {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .leader_content {
    width: 1200px;
    margin: 48px auto 0;
    .all_data {
      width: 100%;
      margin-top: 24px;
      margin-bottom: 24px;
      padding: 32px;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      .all_data_content {
        display: flex;
        justify-content: space-between;
        .leader_content_li {
          line-height: 20px;
          flex-direction: column;
          display: flex;
          text-align: right;
          margin-left: 12px;
          .text {
            color: #6f6f6f;
            font-size: 12px;
            line-height: 16px;
          }
          .num {
            font-weight: 500;
            font-size: 18px;
            line-height: 28px;
            margin-top: 8px;
          }
        }
      }
    }
    .follow_user_part {
      padding: 32px;
      border: 1px solid #eeeeee;
      min-height: 520px;
      border-radius: 8px;
      .user_part_title {
        line-height: 28px;
        font-weight: 500;
        font-size: 20px;
        justify-content: space-between;
        display: flex;
        .more {
          color: #6f6f6f;
          font-size: 14px;
          line-height: 20px;
          align-items: center;
          cursor: pointer;
          display: inline-flex;
        }
      }
      .user_part_content {
        display: flex;
        margin-top: 32px;
        justify-content: space-between;
        position: relative;
        .content_num_li {
          display: flex;
          min-width: 208px;
          flex-direction: column;
          .content_num_li_title {
            color: #6f6f6f;
            line-height: 20px;
          }
          .content_num_li_title_num {
            font-size: 24px;
            font-weight: 700;
            line-height: 28px;
            margin-top: 4px;
          }
        }
        .user_ranking {
          width: 528px;
          margin-top: 24px;
          .user_ranking_ul {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .user_ranking_li {
              text-align: center;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              width: 160px;
              display: flex;
              .user_header {
                background-color: #c0c0c0;
                border: 2px solid #03C59E;
                border-radius: 9999px;
                overflow: hidden;
                z-index: 10;
              }
              .user_header_bg {
                border: 20px solid transparent;
                border-bottom-color: #f8f8f8;
                border-bottom-width: 26px;
                width: 100%;
                height: 0px;
                margin-top: -32px;
                z-index: 0;
              }
              .user_detail {
                padding: 12px 0 20px 0;
                margin-top: 2px;
                display: flex;
                height: 178px;
                width: 100%;
                flex-direction: column;
                align-items: center;
                background-image: linear-gradient(
                  to bottom,
                  #f2f2f2,
                  #ffffff00
                );
                img {
                  width: 60px;
                  height: auto;
                }
                .user_id {
                  line-height: 24px;
                  font-weight: 500;
                  font-size: 20px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                dd {
                  line-height: 28px;
                  font-weight: 700;
                  font-size: 24px;
                  margin-top: 4px;
                }
              }
            }
          }
        }
        .user_list_ul {
          width: 430px;
          padding-top: 16px;
          li {
            display: flex;
            align-items: center;
            margin-top: 24px;
            .user_index {
              color: #6f6f6f;
              font-size: 16px;
              line-height: 24px;
            }
            .user_img {
              background-color: #c0c0c0;
              border-radius: 9999px;
              overflow: hidden;
              width: 50px;
              height: 50px;
              margin-left: 32px;
            }
            .user_id {
              font-weight: 500;
              font-size: 16px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1 1 0%;
              margin-left: 16px;
            }
            .user_right {
              text-align: right;
              flex-direction: column;
              display: flex;
              margin-left: 8px;
              .user_right_num {
                color: #ea4337;
                line-height: 24px;
                font-weight: 700;
                font-size: 20px;
                margin-top: 4px;
              }
            }
          }
        }
      }
    }

    .history_table {
      margin-top: 8px;
      height: 100%;
      width: 100%;
      text-align: left;
      font-size: 12px;
      line-height: 16px;
      thead {
        th {
          font-weight: 400;
          padding: 0 10px;
        }
      }
      tbody {
        tr {
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          border-bottom: 1px solid #eeeeee;
          word-break: break-all;
          height: 80px;
          td {
            min-width: 96px;
            padding: 0 10px;
            font-size: 14px;
            color: #1c1c1c;
            .table_coin_name {
              padding-top: 16px;
              padding-left: 12px;
              border-left: 4px solid #03C59E;
              height: 100%;
            }
            .lever {
              height: 20px;
              line-height: 20px;
              font-weight: 500;
              font-size: 12px;
              padding: 0 3px;
              background-color: #e5f9f1;
              color: #03C59E;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
.red {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 10px;
  color: #ea4337;
  background-color: #fff5f4;
  font-size: 12px;
}
.green {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 10px;
  background-color: #e5f9f0;
  color: #03C59E;
  font-size: 12px;
}
</style>
