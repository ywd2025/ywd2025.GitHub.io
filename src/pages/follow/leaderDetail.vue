<template>
  <div class="leader_detail">
    <div theme="dark" class="header_part">
      <Breadcrumb class="Breadcrumb">
        <BreadcrumbItem to="/follow">{{
          $t("follow.follower.txt1")
        }}</BreadcrumbItem>
        <BreadcrumbItem>{{ $t("follow.leaderDetail.txt1") }}</BreadcrumbItem>
      </Breadcrumb>
      <div class="leader_info">
        <div class="leader_info_content">
          <div class="leader_header" v-if="leaderData.headUrl">
            <img
              style="width: 100%; height: 100%; border-radius: 100%"
              :src="leaderData.headUrl"
            />
          </div>
          <dl class="leader_other">
            <dt
              style="
                line-height: 30px;
                font-weight: 700;
                font-size: 28px;
                padding-top: 8px;
                align-items: center;
                display: flex;
                margin-bottom: 16px;
              "
            >
              <span>{{ leaderData.nickName }}</span>
              <!-- <span class="tags">短線</span>
              <span class="tags">穩健</span> -->
            </dt>
            <dd style="align-items: center; display: flex">
              <div class="timeAndPeople">
                <Icon type="ios-calendar-outline" />
                <span style="margin-left: 8px">{{
                  leaderData.registerTime
                }}</span>
                <span style="margin-left: 8px; color: #575c61">{{
                  $t("carouselItem.text54")
                }}</span>
              </div>
              <div class="timeAndPeople" style="margin-left: 32px">
                <!-- <div class="timeAndPeople"> -->
                <Icon type="ios-contact" />
                <span style="margin-left: 8px">{{
                  leaderData.followCount
                }}</span>
                <span style="margin-left: 8px; color: #575c61">{{
                  $t("follow.leaderDetail.txt2")
                }}</span>
              </div>
            </dd>
          </dl>
        </div>
        <div class="leader_share">
          <!-- <Icon class="icon" size="24" type="ios-share-alt-outline" /> -->
        </div>
      </div>
    </div>
    <div class="leader_content">
      <Tabs @on-click="handleTabs" :value="currentTab">
        <TabPane :label="$t('follow.leaderDetail.txt3')" name="0">
          <div class="all_data">
            <div class="all_data_content" style="position: relative">
              <Spin size="large" fix v-if="listLoading"></Spin>
              <div>
                <div
                  style="font-size: 20px; font-weight: 500; line-height: 28px"
                >
                  {{ $t("follow.leaderDetail.txt4") }}
                </div>
                <ul style="display: flex; margin-top: 16px">
                  <li
                    style="
                      display: flex;
                      min-width: 208px;
                      flex-direction: column;
                    "
                  >
                    <span style="color: #6f6f6f; line-height: 20px">
                      {{ $t("follow.leaderDetail.txt5") }}</span
                    >
                    <span
                      :style="{
                        color: ninetyEarningPer <= 0 ? '#f15057' : '#00b275',
                        fontWeight: '700',
                        fontSize: '30px',
                      }"
                    >
                      {{ Number(ninetyEarningPer * 100).toFixed(2) }}%
                    </span>
                  </li>
                </ul>
              </div>
              <ul
                style="
                  display: flex;
                  min-width: 458px;
                  justify-content: space-between;
                "
              >
                <li
                  class="leader_content_li"
                  style="text-align: left; margin-left: 0px"
                >
                  <span class="text">{{ $t("follow.leaderDetail.txt6") }}</span>
                  <span class="num">{{
                    leaderData.ddTraderTotalPrincipal
                  }}</span>
                </li>
                <li class="leader_content_li">
                  <span class="text">{{ $t("follow.leaderDetail.txt7") }}</span>
                  <span class="num">{{ leaderData.ddTrans }}</span>
                </li>
                <li class="leader_content_li">
                  <span class="text"
                    >{{ $t("follow.leaderDetail.txt8") }}（USDT）</span
                  >
                  <span class="num">{{ leaderData.ddFrAll }}</span>
                </li>
                <li class="leader_content_li">
                  <span class="text">{{ $t("follow.leaderDetail.txt9") }}</span>
                  <span class="num">{{ leaderData.ddYl }}</span>
                </li>
                <li class="leader_content_li">
                  <span class="text">{{
                    $t("follow.leaderDetail.txt10")
                  }}</span>
                  <span class="num">{{ leaderData.ddKs }}</span>
                </li>
              </ul>
            </div>
            <div
              id="chart"
              ref="myChart"
              style="width: 100%; height: 300px"
            ></div>
          </div>
          <div class="follow_user_part">
            <div class="user_part_title">
              {{ $t("carouselItem.text55") }}
              <span @click="handleMoreFollower" class="more">
                {{ $t("otc.index.viewmore") }}
                <Icon type="ios-arrow-forward" />
              </span>
            </div>
            <div class="user_part_content">
              <div>
                <ul style="padding-bottom: 8px; display: flex">
                  <li class="content_num_li">
                    <span class="content_num_li_title"
                      >{{ $t("follow.universal.txt10") }}(USDT)</span
                    >
                    <span class="content_num_li_title_num">{{
                      rankingData.allSy
                    }}</span>
                  </li>
                  <li class="content_num_li">
                    <span class="content_num_li_title">{{
                      $t("follow.index.txt40")
                    }}</span>
                    <span class="content_num_li_title_num">{{
                      rankingData.allFollow
                    }}</span>
                  </li>
                </ul>
                <div class="user_ranking">
                  <ul class="user_ranking_ul">
                    <li class="user_ranking_li">
                      <div
                        class="user_header"
                        style="width: 70px; height: 70px"
                      >
                        <img
                          style="height: 100%; width: 100%"
                          :src="rankingList1.headUrl"
                        />
                      </div>
                      <div class="user_header_bg"></div>
                      <div class="user_detail">
                        <div
                          class="user_id"
                          v-if="
                            rankingList1.username &&
                              rankingList1.username.length >= 5
                          "
                        >
                          {{ rankingList1.username.substr(0, 2) }}***{{
                            rankingList1.username.substr(-3)
                          }}
                        </div>
                        <div class="user_id" v-else>
                          {{ rankingList1.username }}
                        </div>
                        <div style="flex: 1 1 0%">
                          <img :src="$imgUrl + '/follow/22.png'" />
                        </div>
                        <dl>
                          <dt style="color: #6f6f6f">
                            {{ $t("carouselItem.text56") }}
                          </dt>
                          <dd style="color: #ea4337">
                            {{ rankingList1.allSy }}
                          </dd>
                        </dl>
                      </div>
                    </li>
                    <li class="user_ranking_li">
                      <div
                        class="user_header"
                        style="width: 88px; height: 88px"
                      >
                        <img
                          style="height: 100%; width: 100%"
                          :src="rankingList0.headUrl"
                        />
                      </div>
                      <div class="user_header_bg"></div>
                      <div class="user_detail" style="height: 208px">
                        <div
                          class="user_id"
                          v-if="
                            rankingList0.username &&
                              rankingList0.username.length >= 5
                          "
                        >
                          {{ rankingList0.username.substr(0, 2) }}***{{
                            rankingList0.username.substr(-3)
                          }}
                        </div>
                        <div class="user_id" v-else>
                          {{ rankingList0.username }}
                        </div>
                        <div style="flex: 1 1 0%">
                          <img :src="$imgUrl + '/follow/11.png'" />   
                        </div>
                        <dl>
                          <dt style="color: #6f6f6f">
                            {{ $t("carouselItem.text56") }}
                          </dt>
                          <dd style="color: #03C59E">
                            {{ rankingList0.allSy }}
                          </dd>
                        </dl>
                      </div>
                    </li>
                    <li class="user_ranking_li">
                      <div
                        class="user_header"
                        style="width: 70px; height: 70px"
                      >
                        <img
                          style="height: 100%; width: 100%"
                          :src="rankingList2.headUrl"
                        />
                      </div>
                      <div class="user_header_bg"></div>
                      <div class="user_detail">
                        <div
                          class="user_id"
                          v-if="
                            rankingList2.username &&
                              rankingList2.username.length >= 5
                          "
                        >
                          {{ rankingList2.username.substr(0, 2) }}***{{
                            rankingList2.username.substr(-3)
                          }}
                        </div>
                        <div class="user_id" v-else>
                          {{ rankingList2.username }}
                        </div>
                        <div style="flex: 1 1 0%">
                          <img :src="$imgUrl + '/follow/33.png'" /> 
                        </div>
                        <dl>
                          <dt style="color: #6f6f6f">
                            {{ $t("carouselItem.text56") }}
                          </dt>
                          <dd style="color: #ea4337">
                            {{ rankingList2.allSy }}
                          </dd>
                        </dl>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <ul class="user_list_ul">
                <li
                  class="flex items-center"
                  v-for="(item, index) in rankingList.slice(3, 9)"
                  :key="index"
                >
                  <div class="user_index">{{ index + 4 }}</div>
                  <img class="user_img" :src="item.headUrl" />
                  <div class="user_id">{{ item.username }}</div>
                  <div class="user_right">
                    <span style="color: #6f6f6f; line-height: 20px">{{
                      $t("carouselItem.text56")
                    }}</span>
                    <span class="user_right_num">{{ item.allSy }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabPane>
        <TabPane :label="$t('follow.leaderDetail.txt11')" name="1">
          <!-- <div style="padding-top: 12px;">
            <section style="padding-top: 80px;">
              <div style="text-align: center;">
                交易員的當前帶單僅對跟隨用戶可見，請先跟隨
              </div>
            </section>
          </div> -->
          <div v-if="dataList.length === 0" style="padding-top: 12px">
            <section style="padding-top: 80px">
              <div style="text-align: center">
                {{ $t("follow.leaderDetail.txt12") }}
              </div>
            </section>
          </div>
          <div v-else style="padding-top: 12px">
            <table class="history_table" style="position: relative">
              <Spin size="large" fix v-if="listLoading"></Spin>
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
                <tr v-for="item in dataList" :key="item.id">
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
                        <!--  href="/zh-tw/futures/ETHUSDT" -->
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
                      <!-- <p style="margin-top: 8px;color: #6f6f6f">
                        00:41:54 2023-12-18
                      </p> -->
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
                    <span>
                      {{ getForcePrice(item) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabPane>
        <TabPane :label="$t('follow.leaderDetail.txt13')" name="2">
          <div v-if="dataList.length === 0" style="padding-top: 12px">
            <section style="padding-top: 80px">
              <div style="text-align: center">
                {{ $t("follow.leaderDetail.txt14") }}
                <!-- 交易員的當前帶單僅對跟隨用戶可見，請先跟隨 -->
              </div>
            </section>
          </div>
          <div v-else style="padding-top: 12px">
            <table class="history_table" style="position: relative">
              <Spin size="large" fix v-if="listLoading"></Spin>
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
                    {{ $t("new.universal.position") }}
                  </th>
                  <th>{{ $t("option.col_createTime") }}</th>
                  <th>{{ $t("follow.universal.txt6") }}</th>
                  <th>{{ $t("follow.universal.txt7") }}</th>
                  <th>{{ $t("swap.pos_openPrice") }}</th>
                  <th>{{ $t("swap.pos_pos") }}</th>
                  <th>{{ $t("carouselItem.text239") }}</th>
                  <th>{{ $t("swap.pos_Ratio") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in dataList" :key="item.id">
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
                        <!-- href="/zh-tw/futures/ETHUSDT" -->
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
        <TabPane :label="$t('follow.leaderDetail.txt15')" name="3">
          <div style="padding-top: 12px">
            <table class="history_table" style="position: relative">
              <Spin size="large" fix v-if="listLoading"></Spin>
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
                    {{ $t("follow.leaderDetail.txt16") }}
                  </th>
                  <th>{{ $t("follow.universal.header") }}</th>
                  <th>{{ $t("follow.universal.txt9") }}(USDT)</th>
                  <th style="text-align: right">
                    {{ $t("follow.universal.txt10") }}(USDT)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style="height: 64px" v-for="item in followerListAll">
                  <td style="padding-left: 0px">
                    {{ item.username }}
                  </td>
                  <td>
                    <img
                      :src="item.headUrl"
                      style="height: 40px; width: 40px"
                      alt=""
                    />
                  </td>
                  <td class="">
                    {{ item.principalAmount }}
                  </td>
                  <td style="text-align: right">
                    {{ item.allSy }}
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
      allList: [],
      // 分页信息
      total: 0,
      pageNo: 1,
      pageSize: 10,
      currentPage: 1,
      // 加载
      listLoading: false,

      currentTab: "0",
      traderId: null,
      leaderData: {},
      dataList: [],
      followerListAll: [], // 全部跟随者数据
      rankingData: {}, //排行榜信息
      rankingList: [], //排行榜信息
      rankingList1: {
        allSy: null,
        headUrl: null,
        memberId: null,
        principalAmount: null,
        username: null,
      }, //排行榜信息
      rankingList0: {
        allSy: null,
        headUrl: null,
        memberId: null,
        principalAmount: null,
        username: null,
      }, //排行榜信息
      rankingList2: {
        allSy: null,
        headUrl: null,
        memberId: null,
        principalAmount: null,
        username: null,
      }, //排行榜信息
      ninetyEarningPer: null,
      coinSymboly: [], //币种最新价格
    };
  },
  inject: ["reload"],
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    fixedScale: function(value, scale) {
      if (value != undefined && value != null && value != "") {
        return value.toFixed(scale);
      }
      return 0;
    },
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
  destroyed() {
    this.stopPolling();
  },
  mounted() {
    this.getRuleList();
    this.getSwapSymbol();
    this.startPolling();
    var arr = [];
    arr = JSON.parse(localStorage.getItem("followerDetailPer"));
    this.traderId = this.$route.query.id;
    this.ninetyEarningPer = this.$route.query.nine;
    this.getLeaderData();
    this.getRanking();
    var myChart = echarts.init(this.$refs.myChart);
    myChart.setOption({
      color: [
        "#03C59E",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "auto",
            formatter: {},
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
      },
      yAxis: {
        type: "value",
        boundaryGap: ["0%", "10%"],
      },
      series: [
        {
          data: arr,
          type: "line",
          smooth: true,
          symbol: "none",
          // 显示最大值
          // markPoint: {
          //   symbol: "pin",
          //   data: [{ type: "max" }],
          // },
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
    });
  },
  methods: {
    // 更多跟单用户
    handleMoreFollower() {
      this.currentTab = "3";
      this.handleTabs("3");
      document.documentElement.scrollTop = 0;
    },
    // 控制tab页
    handleTabs(value) {
      this.currentTab = value;
      if (this.currentTab === "0") {
        // 带单数据 / 交易员详情
        this.getLeaderData();
      } else if (this.currentTab === "1") {
        // 当前带单
        this.getCurrentLeader();
      } else if (this.currentTab === "2") {
        // 历史带单
        this.getHistoryLeader();
      } else {
        // 跟随者
        this.getFollowers();
      }
    },
    // 获取带单数据 / 交易员详情
    getLeaderData() {
      this.listLoading = true;
      this.$http
        .get(this.host + this.api.follow.followerDetailApi, {
          params: {
            traderId: this.traderId,
          },
        })
        .then((res) => {
          this.leaderData = res.data.data;
          this.listLoading = false;
        });
    },
    // 获取排行版数据
    getRanking() {
      this.listLoading = true;
      this.$http
        .get(this.host + this.api.follow.rankingApi, {
          params: {
            traderId: this.traderId,
            type: 0,
          },
        })
        .then((res) => {
          this.rankingData = res.data.data;
          const fillArr = Array.from(
            { length: 10 - res.data.data.rankingList.length },
            () => ({
              allSy: "0.0000",
              headUrl: this.$imgUrl + '/my.png',
              memberId: "0",
              username: this.$t("new.universal.notYet"),
            })
          );
          this.rankingList = res.data.data.rankingList.concat(fillArr);
          this.rankingList1 = this.rankingList[1];
          this.rankingList0 = this.rankingList[0];
          this.rankingList2 = this.rankingList[2];
        });
    },
    // 获取当前带单数据
    getCurrentLeader() {
      this.listLoading = true;
      this.$http
        .get(this.host + this.api.follow.leaderCurrentApi, {
          params: {
            traderId: this.traderId,
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.dataList = res.data.data;
          this.total = res.data.totalPage * 10;
          for (let i = 0; i < this.dataList.length; i++) {
            this.$http
              .get(this.host + this.api.swap.coinInfo, {
                params: {
                  symbol: this.dataList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.dataList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.dataList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.dataList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.listLoading = false;
        });
    },
    // 获历史带单数据
    getHistoryLeader() {
      this.listLoading = true;
      this.$http
        .get(this.host + this.api.follow.leaderHistoryApi, {
          params: {
            traderId: this.traderId,
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.dataList = res.data.data;
          this.total = res.data.totalPage * 10;
          for (let i = 0; i < this.dataList.length; i++) {
            this.$http
              .get(this.host + this.api.swap.coinInfo, {
                params: {
                  symbol: this.dataList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.dataList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.dataList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.dataList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.listLoading = false;
        });
    },
    // 获跟随者数据
    getFollowers() {
      this.listLoading = true;
      this.$http
        .get(this.host + this.api.follow.leaderFollowersApi, {
          params: {
            traderId: this.traderId,
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((res) => {
          this.followerListAll = res.data.data;
          this.total = 1;
          console.log(this.total);
          this.listLoading = false;
        });
    },

    // 分页
    pageChange(page) {
      this.pageNo = page;
      if (this.currentTab === "0") {
        // 带单数据 / 交易员详情
        this.getLeaderData();
      } else if (this.currentTab === "1") {
        // 当前带单
        this.getCurrentLeader();
      } else if (this.currentTab === "2") {
        // 历史带单
        this.getHistoryLeader();
      } else {
        // 跟随者
        this.getFollowers();
      }
    },

    getData() {
      let param = {};
      param["id"] = this.$route.params.id;
      this.$http.post(this.host + "/uc/activity/detail", param).then((res) => {
        if (res.body.code == 0) {
        } else {
          this.$Message.error(res.body.message);
        }
      });
    },
    getSwapSymbol() {
      this.$http
        .post(this.host + this.api.markets.swapThumb, {})
        .then((res) => {
          this.coinSymboly = res.data;
        });
    },
    // 获取合约不同杠杆下合约最低保证金率
    getRuleList() {
      this.$http
        .get(this.host + this.api.finance.getRuleMarginRate, {})
        .then((res) => {
          this.allList = res.data.data;
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
      var MarginRate = this.getMaintenanceMarginRateall(
        this.allList,
        item.leverage,
        coinId
      );
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
                background: linear-gradient(#f2f2f2, #ffffff);
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
