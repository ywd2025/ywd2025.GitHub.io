<template>
  <div class="follow_content">
    <Spin
      size="large"
      fix
      v-if="spinShow"
      style="background-color: #878787;"
    ></Spin>
    <div class="follow_header">
      <div class="follow_header_content">
        <div class="content_pic">
          <img
            :src="$imgUrl + '/follow/follower-bg-Pl-DzCxu.png'"
            style="width: 466px; height: 456px"
            alt=""
          />
        </div>
        <div class="content_title">
          {{ $t("follow.index.txt1") }}
        </div>
        <div class="content_detail">{{ $t("follow.index.txt2") }}</div>
        <div v-if="isLogin" class="login_buttons">
          <Button
            v-if="userTraderType === '0' && userTraderInfoVerify !== '0'"
            @click="handleBecomeLeader"
          >
            {{
              userTraderInfoVerify === "2"
                ? $t("follow.index.txt3")
                : $t("follow.index.txt4")
            }}
            <Icon type="ios-arrow-forward" />
          </Button>
          <Button
            v-if="userTraderType === '0' && userTraderInfoVerify === '0'"
            disabled
          >
            {{ $t("follow.index.txt5") }}
          </Button>
          <Button @click="handleFollowDetail" style="margin-left: 16px">
            {{ $t("follow.index.txt6") }}
            <Icon type="ios-arrow-forward" />
          </Button>
        </div>
        <Button
          v-else
          class="content_btn"
          type="success"
          @click="goPage('/login')"
          >{{ $t("follow.index.txt7") }}</Button
        >
      </div>
    </div>

    <div v-if="isLogin" class="user_part">
      <div class="user_part_content">
        <div class="user_detail">
          <img class="user_header" :src="MEMBER.avatar" />
          <dl style="width: 295px; margin-left: 24px">
            <dt class="user_account">
              {{ MEMBER.username }}
            </dt>
            <dd style="margin-bottom: 12px">
              UID:<span style="color: #ffffff; margin-left: 4px">{{
                MEMBER.id
              }}</span
              ><!---->
            </dd>
          </dl>
        </div>
        <div class="line"></div>
        <div class="user_nums">
          <dl>
            <dt class="user_num_title">
              <!---->
              {{ $t("follow.universal.txt10") }} (USDT)
            </dt>
            <dd class="user_num_num">
              {{
                userInfo.earnings ? Number(userInfo.earnings).toFixed("4") : "0"
              }}
            </dd>
          </dl>
          <dl>
            <dt class="user_num_title">
              <!---->
              {{ $t("follow.index.txt70") }} (USDT)
            </dt>
            <dd class="user_num_num">
              {{ userInfo.totalPrAmount ? Number(userInfo.totalPrAmount).toFixed("4") : "0" }}
            </dd>
          </dl>
          <div>
            <Button type="primary" @click="myFollow">{{
              $t("follow.follower.txt2")
            }}</Button>
            <Button
              type="primary"
              v-if="userTraderType === '1'"
              @click="setFollowOrder"
              >{{ $t("follow.index.txt71") }}</Button
            >
            <Button type="primary" @click="goPage('/finance/follow')">{{
              $t("new.finance.transfer")
            }}</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="follow_containter">
      <div class="top_title">{{ $t("follow.index.txt8") }}</div>
      <div class="top_content">
        <Card v-for="(item, index) in traderListByEarnings" :key="index">
          <div @click="leaderDetail(item)" class="top_card">
            <div class="card_content">
              <div class="user_info">
                <div style="align-items: center; display: flex">
                  <div class="user_header">
                    <img class="h-full text-transparent" :src="item.headUrl" />
                  </div>
                  <div style="margin-left: 16px">
                    <div class="user_name">
                      <div class="truncate max-w-fit">{{ item.nickName }}</div>
                    </div>
                    <div class="user_tips">
                      <div class="people_num common_padding">
                        <Icon type="ios-contact" />
                        {{ item.followCount }}
                      </div>
                      <div
                        v-if="item.isFellow != 0"
                        class="common_padding orange_color"
                      >
                        {{ $t("follow.index.txt9") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="user_income">
                <dl>
                  <dt
                    style="color: #99a1a8; line-height: 16px; font-size: 12px"
                  >
                    {{ $t("carouselItem.text9") }}
                  </dt>
                  <dd
                    :style="{
                      color: item.ninetyEarningPer <= 0 ? '#f15057' : '#00b275',
                      fontWeight: '700',
                      fontSize: '30px',
                    }"
                  >
                    {{ (item.ninetyEarningPer * 100).toFixed("2") + "%" }}
                  </dd>
                  <dd style="line-height: 16px">
                    <span style="color: #99a1a8; font-size: 12px">{{
                      $t("follow.index.txt11")
                    }}</span>
                    <span
                      style="color: #1c1c1c; font-size: 14px; margin-left: 8px"
                    >
                      {{
                        item.ddTraderTotalPrincipal === 0
                          ? 0
                          : (
                              (item.ddSyAllUsdt / item.ddTraderTotalPrincipal) *
                              100
                            ).toFixed("2") + "%"
                      }}</span
                    >
                  </dd>
                </dl>
                <!-- 小型折线图 -->
                <div class="">
                  <div
                    :key="index"
                    :id="'chartTop' + index"
                    :style="{ height: '83px', width: '140px' }"
                  ></div>
                </div>
              </div>
              <dl class="num_detail">
                <dd style="text-align: left" class="dd_part">
                  <span class="dd_text">{{ $t("follow.index.txt12") }}</span>
                  <span>${{ item.ddTraderTotalPrincipal }}</span>
                </dd>
                <dd
                  style="text-align: center; margin-left: 12px"
                  class="dd_part"
                >
                  <span class="dd_text">{{ $t("follow.index.txt13") }}</span>
                  <span
                    >{{
                      item.ddTrans == 0
                        ? "0"
                        : ((item.ddYl / item.ddTrans) * 100).toFixed("2")
                    }}%</span
                  >
                </dd>
                <dd
                  style="text-align: right; margin-left: 12px"
                  class="dd_part"
                >
                  <span class="dd_text">{{ $t("follow.index.txt14") }}</span>
                  <span>{{ item.ddTraderNearPrincipal }}</span>
                </dd>
              </dl>
              <Button
                @click.stop="handleFollow(item)"
                type="success"
                class="user_btn"
                >{{ $t("follow.index.txt15") }}</Button
              >
            </div>
          </div>
        </Card>
      </div>

      <!-- 全部交易员 -->
      <div class="top_title">{{ $t("follow.index.txt16") }}</div>
      <div class="all_operate">
        <div class="left_operate">
          <RadioGroup
            v-model="type"
            type="button"
            button-style="solid"
            @on-change="handleRadio"
          >
            <Radio label="0">{{ $t("follow.index.txt17") }}</Radio>
            <Radio label="1">{{ $t("follow.index.txt18") }}</Radio>
            <Radio label="2">{{ $t("follow.index.txt19") }}</Radio>
            <Radio label="3">{{ $t("follow.index.txt20") }}</Radio>
          </RadioGroup>
          <Dropdown
            @on-click="handleRadio"
            style="margin-left: 20px; cursor: pointer"
          >
            {{ $t("common.more") }}
            <Icon type="ios-arrow-down"></Icon>
            <DropdownMenu slot="list" style="cursor: pointer; width: 200px">
              <DropdownItem
                name="4"
                :style="type == 4 ? 'color:#03C59E' : 'color:#333'"
                >{{ $t("follow.index.txt21") }}</DropdownItem
              >
              <DropdownItem
                name="5"
                :style="type == 5 ? 'color:#03C59E' : 'color:#333'"
                >{{ $t("follow.index.txt22") }}</DropdownItem
              >
              <DropdownItem
                name="6"
                :style="type == 6 ? 'color:#03C59E' : 'color:#333'"
                >{{ $t("follow.index.txt23") }}</DropdownItem
              >
              <DropdownItem
                name="7"
                :style="type == 7 ? 'color:#03C59E' : 'color:#333'"
                >{{ $t("follow.index.txt24") }}</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="follower_search" style="margin-right: 8px">
          <Input
            type="text"
            v-model="searchValue"
            :placeholder="$t('carouselItem.text205')"
            class="input_select"
            clearable
          />
        </div>
        <div class="pick_type">
          <Select
            v-model="sortType"
            style="width: 260px"
            :placeholder="$t('carouselItem.text53')"
            @on-change="handleSortSelect"
          >
            <Option
              v-for="item in typeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
      </div>
      <div class="top_content all_content">
        <Card
          class="top_card"
          v-for="(item, index) in currentData"
          :key="index"
        >
          <div class="card_content" @click="leaderDetail(item)">
            <div class="user_info">
              <div style="align-items: center; display: flex">
                <div class="user_header">
                  <img class="h-full text-transparent" :src="item.headUrl" />
                </div>
                <div style="margin-left: 16px">
                  <div class="user_name">
                    <div class="truncate max-w-fit">{{ item.nickName }}</div>
                  </div>
                  <div class="user_tips">
                    <div class="people_num common_padding">
                      <Icon type="ios-contact" />
                      {{ item.followCount }}
                    </div>
                    <div
                      v-if="item.isFellow != 0"
                      class="common_padding orange_color"
                    >
                      {{ $t("follow.index.txt9") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="user_income">
              <dl>
                <dt style="color: #99a1a8; line-height: 16px; font-size: 12px">
                  {{ $t("carouselItem.text9") }}
                </dt>
                <dd
                  :style="{
                    color: item.ninetyEarningPer <= 0 ? '#f15057' : '#00b275',
                    fontWeight: '700',
                    fontSize: '30px',
                  }"
                >
                  {{ (item.ninetyEarningPer * 100).toFixed("2") + "%" }}
                </dd>
                <dd style="line-height: 16px">
                  <span style="color: #99a1a8; font-size: 12px">{{
                    $t("follow.index.txt11")
                  }}</span>
                  <span
                    style="color: #1c1c1c; font-size: 14px; margin-left: 8px"
                  >
                    {{
                      item.ddTraderTotalPrincipal === 0
                        ? 0
                        : (
                            (item.ddSyAllUsdt / item.ddTraderTotalPrincipal) *
                            100
                          ).toFixed("2") + "%"
                    }}
                  </span>
                </dd>
              </dl>
              <!-- 小型折线图 -->
              <div class="">
                <div
                  :key="index"
                  :id="'chart' + index"
                  :style="{ height: '83px', width: '140px' }"
                ></div>
              </div>
            </div>
            <dl class="num_detail">
              <dd style="text-align: left" class="dd_part">
                <span class="dd_text">{{ $t("follow.index.txt12") }}</span>
                <span>${{ item.ddTraderTotalPrincipal }}</span>
              </dd>
              <dd style="text-align: center; margin-left: 12px" class="dd_part">
                <span class="dd_text">{{ $t("follow.index.txt13") }}</span>
                <span>
                  {{
                    item.ddTrans == 0
                      ? "0"
                      : ((item.ddYl / item.ddTrans) * 100).toFixed("2")
                  }}%
                </span>
              </dd>
              <dd style="text-align: right; margin-left: 12px" class="dd_part">
                <span class="dd_text">{{ $t("follow.index.txt14") }}</span>
                <span>{{ item.ddTraderNearPrincipal }}</span>
              </dd>
            </dl>
            <Button
              type="success"
              class="user_btn"
              @click.stop="handleFollow(item)"
              >{{ $t("follow.index.txt15") }}</Button
            >
          </div>
        </Card>
      </div>
      <div style="text-align: center; width: 100%; margin-top: 20px">
        <Page
          class="pages"
          :total="total"
          :current="pageNo"
          :page-size="9"
          @on-change="pageChange"
        />
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>

    <!-- 申请成为交易员弹窗 -->
    <Modal
      v-model="becomeLeaderModal"
      :title="$t('follow.index.txt4')"
      footer-hide
    >
      <Form :model="submitFrom" label-position="top">
        <FormItem :label="$t('follow.index.txt25')">
          <Input readonly v-model="MEMBER.username"></Input>
        </FormItem>
        <FormItem :label="$t('follow.index.txt26')">
          <Input v-model="submitFrom.phone"></Input>
        </FormItem>
      </Form>
      <div>{{ $t("follow.index.txt27") }}</div>
      <div>
        {{ $t("follow.index.txt28") }}
      </div>
      <div>{{ $t("follow.index.txt29") }}</div>
      <div style="margin-top: 8px">{{ $t("follow.index.txt30") }}</div>
      <div style="margin-top: 8px">{{ $t("follow.index.txt31") }}</div>
      <div style="width: 100%; text-align: right">
        <Button
          @click="handleSubmit()"
          style="margin-top: 24px"
          type="primary"
          >{{ $t("follow.universal.submit") }}</Button
        >
      </div>
    </Modal>
    <!-- 跟单说明  -->
    <Modal
      v-model="followDetailModal"
      :title="$t('follow.index.txt6')"
      footer-hide
      class="models"
    >
      <div class="title">{{ $t("follow.index.txt32") }}</div>
      <div class="detail">
        {{ $t("follow.index.txt33") }}
      </div>
      <div class="title">{{ $t("follow.index.txt34") }}</div>
      <div class="detail">
        {{ $t("follow.index.txt35") }}
      </div>
      <div class="title">{{ $t("follow.index.txt36") }}</div>
      <div class="detail">{{ $t("follow.index.txt37") }}</div>
      <div class="title">{{ $t("follow.index.txt38") }}</div>
      <div class="detail">
        <ul>
          <li v-for="item in exchangeCoinList" :key="item.id">
            {{ item.symbol }}
          </li>
        </ul>
      </div>
    </Modal>
    <!-- 跟单弹窗 -->
    <Modal v-model="followModal" footer-hide class="follow_model" width="828px">
      <div class="follow_model_left">
        <img
          class="follow_model_left_userHeader"
          :src="followerDetail.avatar"
        />
        <div class="follow_model_left_userName">
          {{ followerDetail.username }}
        </div>
        <div class="follow_model_left_peopleNumber">
          {{ $t("follow.index.txt39") }}: {{ followerDetail.curFellow }}/{{
            $t("follow.index.txt40")
          }}:
          {{ followerDetail.totalFellow }}
        </div>
        <!---->
        <p style="height: 32px; margin-top: 12px"></p>
        <!---->
        <div class="percent_num">
          {{ Number(ninetyEarningPer * 100).toFixed(2) + "%" }}
        </div>
        <div class="percent_text">{{ $t("follow.index.txt41") }}</div>
        <div class="property_part">
          <ul style="align-items: flex-end; display: flex">
            <li class="property_part_li">
              <span class="property_part_li_text">{{
                $t("follow.index.txt42")
              }}</span>
              <span class="property_part_li_num">{{
                followerDetail.totalPrAmount
              }}</span>
            </li>
            <li class="property_part_li" style="margin-left: 12px">
              <span class="property_part_li_text">{{
                $t("follow.index.txt43")
              }}</span>
              <span class="property_part_li_num">{{
                Number(followerDetail.totalEarnings).toFixed(4)
              }}</span>
            </li>
          </ul>
        </div>
        <ul class="property_part_detail">
          <li class="flex items-center justify-between leading-5">
            <span class="text-t2">{{ $t("follow.index.txt23") }}</span>
            <span
              >{{
                Number(followerDetail.totalEarningsPer * 100).toFixed(2)
              }}%</span
            >
          </li>
          <li class="flex items-center justify-between leading-5">
            <span class="text-t2">{{ $t("follow.index.txt24") }}</span>
            <span
              >{{
                Number(followerDetail.threeWeekWinPer * 100).toFixed(2)
              }}%</span
            >
          </li>
          <li class="flex items-center justify-between leading-5">
            <span class="text-t2">{{ $t("follow.index.txt20") }}</span>
            <span>{{ followerDetail.totalTransCount }}</span>
          </li>
          <li class="flex items-center justify-between leading-5">
            <span class="text-t2">{{ $t("follow.index.txt45") }}</span>
            <span>{{ followerDetail.totalWinCount }}</span>
          </li>
        </ul>
      </div>
      <div class="follow_model_right">
        <div class="right_title">
          <span>{{ $t("follow.index.txt46") }} </span>
        </div>
        <Form :model="followForm">
          <FormItem :label="$t('follow.index.txt50')">
            <RadioGroup v-model="followForm.leverType">
              <Radio label="0">{{ $t("follow.index.txt51") }}</Radio>
              <Radio label="1">{{ $t("follow.index.txt52") }}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            :label="$t('follow.index.txt54')"
            v-if="followForm.leverType == 1"
          >
            <Select
              v-model="followForm.dcMultiple"
              :max-tag-count="2"
              :placeholder="$t('carouselItem.text52')"
            >
              <Option
                v-for="item in leverData"
                :value="item.value"
                :key="item.value"
                >{{ item.text }}</Option
              >
            </Select>
          </FormItem>
          <FormItem
            :label="$t('follow.index.txt56')"
            v-if="followForm.leverType == 1"
          >
            <Select
              v-model="followForm.kcMultiple"
              :max-tag-count="2"
              :placeholder="$t('carouselItem.text52')"
            >
              <Option
                v-for="item in leverData"
                :value="item.value"
                :key="item.value"
                >{{ item.text }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label="$t('follow.index.txt58')">
            <Input
              type="number"
              style="width: 100%"
              v-model="followForm.fixSheets"
              :placeholder="$t('carouselItem.text269')"
            >
            </Input>
            <span
              style="position: absolute; top: 38px; right: 30px; color: #7c7f82"
              >{{ $t("swap.shareNumber") }}</span
            >
          </FormItem>
          <FormItem :label="$t('follow.index.txt60')">
            <Input
              type="number"
              style="width: 100%"
              v-model="followForm.fixBl"
              :placeholder="$t('carouselItem.text270')"
            >
            </Input>
            <span
              style="position: absolute; top: 38px; right: 30px; color: #7c7f82"
              >{{ $t("activity.times") }}</span
            >
          </FormItem>
          <FormItem :label="$t('follow.index.txt62')">
            <RadioGroup v-model="followForm.mdFellowDirect">
              <Radio label="1">{{ $t("follow.index.txt64") }}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem :label="$t('follow.index.txt65')">
            <RadioGroup v-model="followForm.fellowType">
              <Radio label="0">{{ $t("follow.index.txt66") }}</Radio>
              <Radio label="1">{{ $t("follow.index.txt67") }}</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <div class="right_buttom_part">
          <Button type="primary" class="right_button" @click="followSubmit">{{
            $t("follow.universal.submit")
          }}</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
import * as echarts from "echarts";
var moment = require("moment");
export default {
  components: {
    FooterPart,
  },

  data() {
    return {
      spinShow: false,
      // 全部交易员
      traderList: [],
      allData: [],
      // 分页信息
      total: 0,
      pageNo: 1,
      pageSize: 9,
      // 收益最高的交易员
      traderListByEarnings: [],
      // 用户信息
      MEMBER: {},
      // 用户总收益与资产
      userInfo: {},
      // 所有交易对
      exchangeCoinList: [],
      // 申请成为交易员
      submitFrom: {
        phone: "",
      },
      // 是否是交易员
      userTraderType: "",
      // 交易员审核状态
      userTraderInfoVerify: "",
      // 交易员详情
      followerDetail: {},
      // 90ri
      ninetyEarningPer: "",
      // 检索
      searchValue: "",
      // 筛选
      typeList: [
        {
          value: "1",
          label: this.$t("follow.index.txt68"),
        },
        {
          value: "2",
          label: this.$t("follow.index.txt69"),
        },
      ],
      leverData: [
        { text: "5X", value: 5 },
        { text: "10X", value: 10 },
        { text: "20X", value: 20 },
        { text: "30X", value: 30 },
        { text: "40X", value: 40 },
        { text: "50X", value: 50 },
        { text: "60X", value: 60 },
        { text: "70X", value: 70 },
        { text: "80X", value: 80 },
        { text: "90X", value: 90 },
        { text: "100X", value: 100 },
      ],
      leverageAdjustVal: 5,
      leverageAdjustVals: 5,
      // 筛选 排序
      sortType: "1",
      type: "0",

      becomeLeaderModal: false,
      followDetailModal: false,
      followModal: false,
      followForm: {
        // stopLose: -1,
        // stopWin: 1,
        leverType: "0",
        dcMultiple: 5,
        kcMultiple: 5,
        fixSheets: "",
        fixBl: "",
        mdFellowDirect: "1",
        fellowType: "0",
      },
      traderId: "",
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
    };
  },
  created: function() {
    this.getUserInfo();
    // 修改标题栏
    // this.getData();
    if (this.isLogin) {
      this.MEMBER = JSON.parse(localStorage.getItem("MEMBER"));
    }
    // 获取跟单用户收益最高的交易员列表
    this.getTraderListByEarnings();
    // 获取所有交易员列表
    this.getTraderList();
    // 获取所有交易对
    this.getExchangeCoinList();
  },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    fixedScale: function(value, scale) {
      return value.toFixed(scale);
    },
  },
  watch: {
    searchValue(newVal, oldVal) {
      newVal = String(newVal).toLowerCase();
      this.traderList = this.allData.data.filter((item) => {
        return item.nickName
          .toString()
          .toLowerCase()
          .includes(newVal);
      });
      this.pageNo = 1;
      this.total = this.traderList.length;
    },
    followForm: {
      handler(newVal, oldVal) {
        if (newVal.fixSheets != "") {
          this.$nextTick(() => {
            this.followForm.fixBl = "";
          });
        }
        if (Number(newVal.fixSheets) > 1000) {
          this.$nextTick(() => {
            this.followForm.fixSheets = 1000;
          });
        }
        if (newVal.fixBl != "") {
          this.$nextTick(() => {
            this.followForm.fixSheets = "";
          });
        }
        if (Number(newVal.fixBl) > 5) {
          this.$nextTick(() => {
            this.followForm.fixBl = 5;
          });
        }
        if (newVal.fixSheets) {
          this.validatePositiveInteger(newVal.fixSheets, "fixSheets");
        }
        if (newVal.fixBl) {
          this.validatePositiveInteger(newVal.fixBl, "fixBl");
        }
      },
      deep: true,
      immediate: true,
    },
  },
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
    // 当前页数据
    currentData() {
      if (!this.traderList) {
        return [];
      }
      const start = (this.pageNo - 1) * this.pageSize;
      const end = this.pageNo * this.pageSize;
      return this.traderList.slice(start, end);
    },
  },
  methods: {
    validatePositiveInteger(value, fieldName) {
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
        this.followForm[fieldName] = "";
        this.$Message.error(this.$t("carouselItem.text271"));
      }
    },
    // 发起带单
    setFollowOrder() {
      localStorage.setItem("tradeType", 1);
      this.$router.push("/swap");
    },
    // 申请成为交易员弹窗
    handleBecomeLeader() {
      this.submitFrom = {};
      if (this.isLogin) {
        this.becomeLeaderModal = true;
      }
    },
    // 申请交易员提交
    handleSubmit() {
      if (!this.submitFrom.phone) {
        this.$Message.error(this.$t("new.register.phone"));
        return;
      }
      this.$http
        .post(this.host + this.api.follow.traderVerify, {
          phone: this.submitFrom.phone,
        })
        .then((response) => {
          var res = response.data;
          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("common.tip"),
              desc: res.message,
            });
            this.becomeLeaderModal = false;
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: res.message,
            });
          }
        });
    },
    // 获取所有交易对
    getExchangeCoinList() {
      if (this.isLogin) {
        this.$http
          .get(this.host + this.api.follow.exchangeCoinList, {
            params: {
              type: 1,
            },
          })
          .then((response) => {
            var res = response.data;
            this.exchangeCoinList = res.data;
          });
      }
    },
    // 用户收益率和总资产
    getUserInfo() {
      if (this.isLogin) {
        this.spinShow = true;
        this.$http
          .get(this.host + this.api.follow.memberInfo)
          .then((response) => {
            var res = response.data;
            this.userInfo = res.data;
          });
        // 查询用户是否是交易员
        this.$http
          .post(this.host + this.api.user.userInfo, {})
          .then((response) => {
            var res = response.data;
            this.userTraderType = res.data.traderType;
            if (this.userTraderType === "0") {
              // 如果不是交易员, 查询状态
              this.getTraderInfoVerify();
            }
            this.spinShow = false;
          });
      }
    },
    // 获取交易员审核状态
    getTraderInfoVerify() {
      this.$http
        .get(this.host + this.api.follow.traderInfoVerify)
        .then((response) => {
          var res = response.data;
          // 0:待审核 1：通过 2：拒绝 -1暂未提交
          this.userTraderInfoVerify = res.data.mdvVerify;
        });
    },
    // 所有交易员列表
    getTraderList() {
      var params = {};
      if (this.isLogin) {
        params["loginMemberId"] = this.MEMBER.id;
      }
      params["type"] = this.type;
      params["sortType"] = this.sortType;
      params["pageNo"] = "1";
      params["pageSize"] = "9999";
      this.$http
        .get(this.host + this.api.follow.traderList, { params: params })
        .then((response) => {
          var res = response.data;
          this.allData = res;
          this.traderList = res.data;
          (this.total = this.traderList.length),
            this.traderList.map((item, index) => {
              if (index < 9) {
                this.$nextTick(() => {
                  this.drawLines(item, index);
                });
              }
            });
        });
    },
    // 跟单用户收益率最高的交易员列表
    getTraderListByEarnings() {
      // if (this.isLogin) {
      this.$http
        .get(this.host + this.api.follow.traderList, {
          params: {
            loginMemberId: this.MEMBER.id || "",
            type: 2,
          },
        })
        .then((response) => {
          var res = response.data;
          this.traderListByEarnings = res.data.slice(0, 3);
          this.traderListByEarnings.map((item, index) => {
            if (index < 3) {
              this.$nextTick(() => {
                this.drawLinesByEarnings(item, index);
              });
            }
          });
        });
      // }
    },
    // 生成折线图1
    drawLines(chartData, index) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("chart" + index));
      this.chartConfig.series[0].data = chartData.syPer;
      // 绘制图表
      myChart.setOption(this.chartConfig);
    },
    // 生成折线图2
    drawLinesByEarnings(chartData, index) {
      // 基于准备好的dom，初始化echarts实例
      let myChartTop = echarts.init(
        document.getElementById("chartTop" + index)
      );
      this.chartConfig.series[0].data = chartData.syPer;
      // 绘制图表
      myChartTop.setOption(this.chartConfig);
    },

    goPage(url) {
      this.$router.push(url);
    },
    // 我的跟单
    myFollow(id) {
      this.$router.push(`/follow/follower`);
    },
    // 跟单员详情
    leaderDetail(item) {
      // 存曲线图
      localStorage.setItem("followerDetailPer", JSON.stringify(item.syPer));
      this.$router.push(
        `/follow/leaderDetail?id=${item.memberId}&nine=${item.ninetyEarningPer}`
      );
    },
    // 立即跟单按钮
    handleFollow(item) {
      this.ninetyEarningPer = item.ninetyEarningPer;
      this.traderId = item.memberId;
      // 存曲线图
      this.$http
        .get(this.host + this.api.follow.getTraderInfo, {
          params: {
            traderId: item.memberId,
            loginMemberId: this.MEMBER.id,
          },
        })
        .then((response) => {
          var res = response.data;
          this.followerDetail = res.data.data;
          this.followModal = true;
        });
    },
    // 立即跟单提交按钮
    followSubmit() {
      this.followForm.traderId = this.traderId;
      this.$http
        .post(this.host + this.api.follow.followSettingApi, this.followForm)
        .then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            this.followModal = false;
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    // 跟单说明
    handleFollowDetail() {
      this.followDetailModal = true;
    },
    // 筛选排序
    handleRadio(value) {
      this.type = value;
      this.getTraderList();
    },
    // 正序倒序
    handleSortSelect(value) {
      this.sortType = value;
      this.getTraderList();
    },

    detail(aId) {
      this.$router.push("/lab/detail/" + aId);
    },
    // 分页
    pageChange(page) {
      this.pageNo = page;
      this.currentData.map((item, index) => {
        this.$nextTick(() => {
          this.drawLines(item, index);
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
img {
  height: 100%;
  width: 100%;
}
.follow_content {
  padding-top: 50px;
  flex: 1 1 0%;
  background-color: #ffffff;
  color: #1c1c1c;
  min-width: 1200px;
  .follow_header {
    padding-top: 60px;
    background-color: rgb(17, 20, 23);
    width: 100%;
    height: 282px;
    overflow: hidden;
    .follow_header_content {
      flex-direction: column;
      width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      position: relative;
      .content_pic {
        right: 12px;
        top: -116px;
        position: absolute;
        height: 456px;
        width: 466px;
      }
      .content_title {
        color: #07c67b;
        line-height: 52px;
        font-weight: 600;
        font-size: 44px;
        width: 800px;
      }
      .content_detail {
        margin: 16px 0 24px 0;
        font-size: 18px;
        line-height: 28px;
        color: #99a1a8;
      }
      .content_btn {
        width: 96px;
        height: 44px;
      }
    }
  }
  .follow_containter {
    width: 1200px;
    margin: 0 auto;
    .top_title {
      line-height: 44px;
      font-weight: 600;
      font-size: 28px;
      margin-top: 60px;
      margin-bottom: 30px;
    }
    .top_content {
      gap: 16px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      display: grid;
      .top_card {
        cursor: pointer;
        .level_pic {
          position: absolute;
          max-width: 100%;
          height: auto;
          right: 8px;
          top: 8px;
        }
        .card_content {
          padding: 14px;
          border-radius: 4px;
          .user_info {
            display: flex;
            margin-bottom: 18px;
            align-items: center;
            justify-content: space-between;
            .user_header {
              height: 56px;
              width: 56px;
              overflow: hidden;
              border-radius: 9999px;
              background-color: #c0c0c0;
            }
            .user_name {
              line-height: 24px;
              font-weight: 500;
              font-size: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 224px;
            }
            .user_tips {
              display: flex;
              align-items: center;
              .people_num {
                background-color: #f8f8f8;
                align-items: center;
                display: inline-flex;
              }
              .common_padding {
                padding: 4px 6px;
                margin-top: 6px;
                line-height: 14px;
                font-size: 12px;
              }
              .orange_color {
                margin-left: 8px;
                color: #ffaa00;
                background-color: #ffaa0020;
              }
            }
          }
          .user_income {
            padding-bottom: 24px;
            margin-bottom: 22px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            border-bottom: 1px dashed #e0e0e0;
          }
          .num_detail {
            line-height: 16px;
            font-weight: 500;
            font-size: 14px;
            justify-content: space-between;
            display: flex;
            .dd_part {
              display: flex;
              flex-direction: column;
              .dd_text {
                color: #99a1a8;
                margin-bottom: 8px;
              }
            }
          }
          .user_btn {
            margin-top: 24px;
            width: 100%;
            height: 44px;
          }
        }
      }
    }
  }
  .all_operate {
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;
    align-items: center;
    .left_operate {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1 1 0%;
    }
  }
  .all_content {
  }
  .page_part {
    justify-content: center;
    align-items: center;
    height: 20px;
    display: flex;
    margin-top: 40px;
  }
}

.login_buttons {
  button {
    color: #07c67b;
    font-size: 16px;
    line-height: 24px;
    padding: 0 16px;
    background: rgb(32, 32, 32);
    border-radius: 4px;
    align-items: center;
    border: none;
    height: 44px;
  }
  :hover {
    background: rgb(41, 41, 41);
  }
}
.models {
  .title {
    font-weight: 500;
  }
  .detail {
    color: #6f6f6f;
    margin: 5px 0 24px;
    ul {
      align-items: center;
      gap: 16px;
      display: grid;
      margin-top: 16px;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      li {
        line-height: 16px;
        border: 1px solid #e0e0e0;
        padding: 10px 12px;
      }
    }
  }
}
.user_part {
  width: 100%;
  height: 112px;
  background-color: rgb(31, 35, 40);
  color: #ffffff;
  .user_part_content {
    align-items: center;
    width: 1200px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    .user_detail {
      width: 383px;
      display: flex;
      .user_header {
        background-color: #575c61;
        border-radius: 9999px;
        overflow: hidden;
        height: 64px;
        width: 64px;
      }
      .user_account {
        line-height: 28px;
        font-weight: 700;
        font-size: 24px;
        align-items: center;
        display: flex;
        margin-bottom: 12px;
      }
    }
    .line {
      border-right: 1px solid #3d4249;
      width: 0px;
      height: 68px;
      margin: 0 64px 0 16px;
    }
    .user_nums {
      display: flex;
      flex: 1 1 0%;
      align-items: center;
      justify-content: space-between;
      .user_num_title {
        line-height: 20px;
        margin-bottom: 12px;
      }
      .user_num_num {
        line-height: 36px;
        font-weight: 700;
        font-size: 26px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.follow_model {
  .follow_model_left {
    color: #ffffff;
    padding: 40px 32px 0 32px;
    background-color: rgb(29, 34, 38);
    width: 348px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .follow_model_left_userHeader {
      border-radius: 9999px;
      overflow: hidden;
      background-color: rgb(29, 34, 38);
      width: 114px;
      height: 114px;
    }
    .follow_model_left_userName {
      line-height: 32px;
      font-weight: 500;
      font-size: 28px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      margin-top: 8px;
    }
    .follow_model_left_peopleNumber {
      color: #99a1a8;
      line-height: 14px;
      align-items: center;
      display: inline-flex;
      margin-top: 8px;
    }
    .percent_num {
      line-height: 48px;
      font-weight: 500;
      font-size: 40px;
      margin-top: 24px;
    }
    .percent_text {
      color: #99a1a8;
      line-height: 16px;
      margin-top: 4px;
    }
    .property_part {
      justify-content: flex-end;
      flex-direction: column;
      height: 100px;
      display: flex;
      margin-top: 8px;
      .property_part_li {
        padding: 16px 10px;
        background-color: rgb(38, 42, 46);
        align-items: center;
        border-radius: 6px;
        justify-content: flex-end;
        flex-direction: column;
        width: 136px;
        height: 100%;
        display: flex;
        .property_part_li_text {
          color: #99a1a8;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
        }
        .property_part_li_num {
          margin-top: 8px;
          line-height: 20px;
          font-size: 18px;
        }
      }
    }
    .property_part_detail {
      width: 286px;
      margin-top: 24px;
      li {
        margin-top: 8px;
        justify-content: space-between;
        align-items: center;
        display: flex;
      }
    }
  }
  .follow_model_right {
    padding: 24px;
    background: #ffffff;
    width: 480px;
    .right_title {
      font-size: 20px;
      line-height: 28px;
      justify-content: space-between;
      align-items: center;
      display: flex;
      margin-bottom: 20px;
    }
    .right_buttom_part {
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 480px;
      padding: 24px;
      .right_button {
        height: 48px;
        width: 100%;
      }
    }
  }
}

.activity .ivu-tabs-bar {
  border-bottom: 1px solid #dcdee2;
}
.activity .ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #03C59E;
}
.activity .ivu-tabs-nav .ivu-tabs-tab:hover,
.activity .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #03C59E;
}
.activity .ivu-tabs-ink-bar {
  background-color: #03C59E;
}
.app_bottom {
  display: none;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(242, 246, 250, 1) !important;
}
.app_bottom .left_logo img {
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.app_bottom .right_btn_wrap {
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
}
.app_bottom .right_btn {
  color: #fff;
  border-radius: 3px;
  padding: 0px 10px;
  line-height: 26px;
  height: 26px;
  display: block;
  margin-top: 7px;
  background: linear-gradient(200deg, #ff9900, #ffbe2b, #ffa500);
}
@media screen and (max-width: 768px) {
  .activity {
    padding-top: 45px !important;
  }
  .activity_container {
    padding: 0 2% !important;
  }
  .activity .main {
    margin-top: 70px !important;
  }
  .progress-time {
    text-align: left !important;
    padding-right: 0px !important;
    margin-top: 10px !important;
  }
  .activity-item .title {
    text-align: left !important;
  }
  .activity-item .title div {
    display: none !important;
  }
  .activity-item .activity-type {
    display: none !important;
  }
  .banner-pc {
    display: none !important;
  }
  .banner-mobile {
    display: block !important;
  }
  .activity_container > h1 {
    font-size: 20px !important;
    margin-top: -170px !important;
  }
  .activity-item img {
    width: 100px !important;
    height: 100px !important;
  }
  .activity-item .title span {
    font-size: 18px !important;
  }
  .app_bottom {
    display: block !important;
  }
  .bottom-panel .bottom {
    display: none !important;
  }
  .bottom-panel .bottom-mobile {
    display: block !important;
  }
  .bottom-panel .bottom-mobile p {
    margin: 10px 0 10px 0;
  }
  .bottom-panel .bottom-mobile p span {
    font-size: 12px;
    color: #a7a7a7;
    margin-top: 15px;
  }
}
.banner-pc {
  display: block;
}
.banner-mobile {
  display: none;
}
</style>
<style lang="less" scoped>
.activity {
  background: rgba(242, 246, 250, 1) !important;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  padding-top: 60px;
  color: #fff;
}
.activity .bannerimg {
  width: 100%;
}
.activity_container {
  padding: 0 12%;
  text-align: center;
  height: 100%;
  min-height: 600px;
  > h1 {
    margin-top: -200px;
    font-size: 32px;
    line-height: 1;
    padding: 50px 0 20px 0;
    letter-spacing: 3px;
  }
}
.activity .main {
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.activity-container {
  min-height: 200px;
}
.tips-line {
  height: 100px;
  line-height: 100px;
  text-align: center;
  position: relative;
  display: inline-block;
  img {
    width: 100px;
    margin-top: 50px;
  }
  .ivu-spin {
    margin-top: 50px;
  }
}
.activity-item {
  position: relative;
  overflow: hidden;
  padding: 15px 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 98%;
  margin-left: 1%;
  min-height: 20px;
  background: #fff;
  border-radius: 5px;
  transition: transform 0.2s ease;
  &:hover {
    box-shadow: 0 0 25px #ddd;
    transform: scale(1.01, 1.01);
  }
  .activity-type {
    position: absolute;
    width: 140px;
    height: 25px;
    line-height: 25px;
    background-color: #000;
    color: white;
    text-align: center;
    transform: rotate(-40deg);
    top: 23px;
    left: -30px;
    z-index: 99;
    box-shadow: 1px 1px 4px #000;
    z-index: 99;
  }
  .title {
    width: 100%;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    span {
      font-size: 22px;
      color: rgba(49, 54, 62, 1) !important;
    }
    div {
      height: 30px;
      line-height: 30px;
      padding: 0 15px 0 25px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      position: relative;
      &:before {
        content: "●";
        position: absolute;
        top: -1px;
        left: 5px;
      }
    }
    div.step0 {
      margin-left: 15px;
      color: #fff;
      border: 1px solid #fff;
      background: #5bacff;
      background-image: repeating-linear-gradient(
        60deg,
        hsla(0, 0%, 100%, 0.1),
        hsla(0, 0%, 100%, 0.1) 10px,
        transparent 0,
        transparent 20px
      );
    }
    div.step1 {
      margin-left: 15px;
      color: #ffffff;
      border: 1px solid #ffffff;
      background: #19be6b;
      background-image: repeating-linear-gradient(
        60deg,
        hsla(0, 0%, 100%, 0.1),
        hsla(0, 0%, 100%, 0.1) 10px,
        transparent 0,
        transparent 20px
      );
    }
    div.step2 {
      margin-left: 15px;
      color: #ffffff;
      border: 1px solid #ffffff;
      background: #f90;
      background-image: repeating-linear-gradient(
        60deg,
        hsla(0, 0%, 100%, 0.1),
        hsla(0, 0%, 100%, 0.1) 10px,
        transparent 0,
        transparent 20px
      );
    }
    div.step3 {
      margin-left: 15px;
      color: #ffffff;
      border: 1px solid #ffffff;
      background: #828282;
      background-image: repeating-linear-gradient(
        60deg,
        hsla(0, 0%, 100%, 0.1),
        hsla(0, 0%, 100%, 0.1) 10px,
        transparent 0,
        transparent 20px
      );
    }
  }
  img {
    width: 160px;
    height: 160px;
  }
}
.progress-text {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    font-size: 12px;
  }
}
.bottom-panel {
  border-top: 1px solid rgb(237, 237, 237);
  margin-top: 15px;
  .bottom-mobile {
    display: none;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #a7a7a7;
      margin-top: 15px;
    }
    button,
    a {
      margin-top: 11px;
    }
    a.ivu-btn-primary {
      background: #0095ff;
    }
    a.ivu-btn-primary:hover {
      background: #2ba7ff;
    }
  }
}
.progress-time {
  font-size: 13px;
  letter-spacing: 1px;
  text-align: right;
  padding-right: 80px;
}
.right {
  float: right;
}
.left {
  float: left;
}
.gray {
  color: #a7a7a7;
}
.input_select {
  background-color: #fff;
}
</style>
