<template>
  <!-- 買幣 -->
  <div class="buy">
    <div>
      <!-- 头部 -->
      <div class="head_part">
        <div class="head_content">
          <div class="head_title">
            {{ $t("buyCoin.index.title1") }}
          </div>
          <div class="head_detail">
            {{ $t("buyCoin.index.title2") }}
          </div>
        </div>
      </div>
      <!-- 一些操作 -->
      <div class="operate_part">
        <TopOperates @closeAddOrderModal="closeAddOrderModal"></TopOperates>
      </div>
      <div class="selects_part">
        <div class="select_tabs">
          <div style="margin: 0 auto; width: 1200px">
            <!-- <RadioGroup
              v-model="orderType"
              type="button"
              button-style="solid"
              @on-change="handleOrderType"
            >
              <Radio label="0">{{ $t("buyCoin.universal.buy") }}</Radio>
              <Radio label="1">{{ $t("buyCoin.universal.sell") }}</Radio>
            </RadioGroup> -->
            <Tabs v-model="orderType" @on-click="handleOrderType">
              <TabPane :label="$t('buyCoin.universal.buy')" name="0"></TabPane>
              <TabPane :label="$t('buyCoin.universal.sell')" name="1"></TabPane>
            </Tabs>
            <Select
              v-model="coinName"
              slot="prepend"
              style="width: 120px; background-color: #f7f7fb"
              @on-change="handleCoin"
            >
              <Avatar
                :src="coinIcon"
                slot="prefix"
                size="small"
                style="margin-right: 10px;"
              />
              <Option
                v-for="(item, index) in resData"
                :key="index"
                :value="item.unit"
                :label="item.unit"
                style="display: flex;align-items: center;justify-content: space-between;"
              >
                <img
                  :src="item.icon"
                  alt=""
                  style="width: 25px;height: 25px;"
                />
                <span style=" color: #1c1c1c;">{{ item.unit }}</span>
              </Option>
            </Select>
            <Button
              style="float: right"
              type="primary"
              @click="handleQuick()"
              >{{ $t("buyCoin.index.txt33") }}</Button
            >
          </div>
        </div>
        <!-- <div class="select_filter">
          <div class="select_filter">
          <div class="select_filter_content">
            <div style="display: flex;align-items: center;">
              <Input placeholder="输入金额" style="width: 260px;">
                <span slot="append">CNY</span>
              </Input>
              <Select v-model="payType" style="width:200px;margin-left: 10px">
                <Option value="0">所有支付方式</Option>
                <Option value="1">银行卡</Option>
                <Option value="2">支付宝</Option>
                <Option value="3">微信</Option>
              </Select>
              <Select v-model="payType" style="width:200px;margin-left: 10px">
                <Option value="0">所有地区</Option>
                <Option value="1">安道尔</Option>
                <Option value="2">澳门</Option>
                <Option value="3">台湾</Option>
                <Option value="4">香港</Option>
                <Option value="5">中国</Option>
              </Select>
              <Select v-model="payType" style="width:200px;margin-left: 10px;">
                <Option value="0">价格</Option>
                <Option value="1">成单数</Option>
                <Option value="2">成单率</Option>
              </Select>
            </div>
            <div>
              <Dropdown
                style="margin-left: 20px"
                @on-click="handleIntervalType"
              >
                <Button type="primary">
                  {{ IntervalType }}
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem name="暂不处理">暂不处理</DropdownItem>
                  <DropdownItem name="5秒自动刷新">5秒自动刷新</DropdownItem>
                  <DropdownItem name="10秒自动刷新">10秒自动刷新</DropdownItem>
                  <DropdownItem name="20秒自动刷新">20秒自动刷新</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div> -->
      </div>
      <div class="table_part">
        <Table
          :columns="columns"
          :data="dataList"
          :loading="tableLoading"
          :no-data-text="$t('common.nodata')"
        >
          <template slot-scope="{ row }" slot="coSellerName">
            <div style="display: flex; flex-direction: column">
              <div class="title">{{ row.shop.csName }}</div>
              <div>
                {{ row.shop.csDealNum }} {{ $t("buyCoin.universal.volume") }} |
                {{ (row.shop.csDealRate * 100).toFixed("2") }}%
                {{ $t("buyCoin.universal.closingRate") }}
              </div>
            </div>
          </template>
          <template slot-scope="{ row }" slot="b">
            <div style="font-size: 20px; font-weight: 600">
              {{ row.coCoinPrice + " " }}
              <!-- <span style="font-size: 14px;">CNY</span> -->
            </div>
          </template>
          <template slot-scope="{ row }" slot="c">
            <div style="display: flex; flex-direction: column">
              <div>{{ row.coOrderBalance }} {{ row.coCoin }}</div>
              <div>￥{{ row.coAmountMin }} - ￥{{ row.coAmountMax }}</div>
            </div>
          </template>
          <template slot-scope="{ row }" slot="coPayType">
            <Tag color="warning" v-if="row.coPayType === 3">{{
              $t("buyCoin.universal.bank")
            }}</Tag>
            <Tag color="success" v-if="row.coPayType === 1">{{
              $t("buyCoin.universal.wx")
            }}</Tag>
            <Tag color="primary" v-if="row.coPayType === 2">{{
              $t("buyCoin.universal.alipay")
            }}</Tag>
          </template>
          <template slot-scope="{ row }" slot="e">
            <Button
              v-if="isLogin"
              type="primary"
              @click="handleOrder(row)"
              :disabled="row.shop.csMemberId === userInfo.id"
              >{{
                orderType == 0
                  ? $t("buyCoin.universal.buy")
                  : $t("buyCoin.universal.sell")
              }}{{ row.coCoin }}</Button
            >
            <Button v-else type="primary" @click="go_page()"
              >{{
                orderType == 0
                  ? $t("buyCoin.universal.buy")
                  : $t("buyCoin.universal.sell")
              }}{{ row.coCoin }}</Button
            >
          </template>
        </Table>
        <div style="text-align: center; width: 100%">
          <Page
            class="pages"
            :total="total"
            :current="pageNum"
            :page-size="10"
            @on-change="pageChange"
          />
        </div>
      </div>
    </div>
    <!-- 其他部分 -->
    <div class="others_part">
      <!-- 教程 -->
      <div class="tutorial">
        <div class="tutorial_title">
          <div style="font-size: 28px; line-height: 36px; font-weight: 600">
            {{ $t("buyCoin.index.txt1") }}
          </div>
          <RadioGroup
            v-model="tutorialType"
            type="button"
            size="large"
            button-style="solid"
          >
            <Radio label="0"> {{ $t("buyCoin.index.txt2") }}</Radio>
            <Radio label="1"> {{ $t("buyCoin.index.txt3") }}</Radio>
          </RadioGroup>
        </div>
        <div class="tutorial_detail" v-if="tutorialType == 0">
          <div
            class="tutorial_content"
            v-for="(item, index) in tutorialData1"
            :key="index"
          >
            <img
              style="height: 84px; width: 84px; margin-bottom: 24px"
              :src="item.img"
              alt=""
            />
            <div class="item_title">{{ item.title }}</div>
            <div class="item_detail">
              {{ item.detail }}
            </div>
          </div>
        </div>
        <div class="tutorial_detail" v-else>
          <div
            class="tutorial_content"
            v-for="(item, index) in tutorialData2"
            :key="index"
          >
            <img
              style="height: 84px; width: 84px; margin-bottom: 24px"
              :src="item.img"
              alt=""
            />
            <div class="item_title">{{ item.title }}</div>
            <div class="item_detail">
              {{ item.detail }}
            </div>
          </div>
        </div>
      </div>
      <!-- 热门付款方式 -->
      <div class="pay_part">
        <div class="pay_part_title">{{ $t("buyCoin.index.txt4") }}</div>
        <div class="pay_part_buttons">
          <Button>
            <span class="button_icon" style="border-color: rgb(1, 169, 242)">{{
              $t("buyCoin.universal.alipay")
            }}</span>
          </Button>
          <Button>
            <span class="button_icon" style="border-color: rgb(240, 185, 11)">{{
              $t("buyCoin.universal.bank")
            }}</span>
          </Button>
          <Button>
            <span class="button_icon" style="border-color: rgb(45, 193, 0)">{{
              $t("buyCoin.universal.wx")
            }}</span>
          </Button>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>

    <!-- 购买/出售弹窗 -->
    <Modal
      v-model="operateOrderModal"
      footer-hide
      :title="
        orderType == 0 ? $t('buyCoin.index.txt5') : $t('buyCoin.index.txt6')
      "
    >
      <Form :model="formData" :label-width="100">
        <FormItem
          :label="
            orderType == 0
              ? $t('buyCoin.universal.buy')
              : $t('buyCoin.universal.sell')
          "
        >
          <RadioGroup v-model="formData.type">
            <Radio :label="0" border>{{
              orderType == 0
                ? $t("buyCoin.index.txt7")
                : $t("buyCoin.index.txt8")
            }}</Radio>
            <Radio :label="1" border>{{
              orderType == 0
                ? $t("buyCoin.index.txt9")
                : $t("buyCoin.index.txt11")
            }}</Radio>
          </RadioGroup>
        </FormItem>
        <!-- 出售/购买 金额/数量 -->
        <template v-if="orderType == 0">
          <!-- 购买类型 -->
          <FormItem
            :label="
              formData.type == 0
                ? $t('buyCoin.index.txt12')
                : $t('buyCoin.index.txt13')
            "
          >
            <Input
              v-model="formData.total"
              :placeholder="
                formData.type == 0
                  ? $t('buyCoin.index.txt14')
                  : $t('buyCoin.index.txt15')
              "
            >
            </Input>
          </FormItem>
        </template>
        <template v-else>
          <!-- 出售类型 -->
          <FormItem
            :label="
              formData.type == 1
                ? $t('buyCoin.index.txt16')
                : $t('buyCoin.index.txt17')
            "
          >
            <Input
              v-model="formData.total"
              :placeholder="
                formData.type == 1
                  ? $t('buyCoin.index.txt19')
                  : $t('buyCoin.index.txt18')
              "
            >
            </Input>
          </FormItem>
        </template>
        <!-- 收款方式 coPayType -->
        <FormItem :label="$t('buyCoin.index.txt20')" v-if="orderType == 1">
          <RadioGroup v-model="formData.payType">
            <Radio :label="1" border v-if="userPayType.cptCodeWx">{{
              $t("buyCoin.universal.wx")
            }}</Radio>
            <Radio :label="2" border v-if="userPayType.cptCodeZfb">{{
              $t("buyCoin.universal.alipay")
            }}</Radio>
            <Radio :label="3" border v-if="userPayType.cptBankCode">{{
              $t("buyCoin.universal.bank")
            }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          :label="
            userInfo.email
              ? $t('uc.forget.emailcode')
              : $t('uc.finance.withdraw.smscode')
          "
          v-if="orderType == 1"
        >
          <div class="input_two">
            <Input
              type="text"
              v-model="changeFrom.code"
              :placeholder="$t('uc.forget.smscode')"
            ></Input>
            <input
              @click="handlerUpdatePWSetCode()"
              id="sendCode"
              type="Button"
              :value="sendcodeValue"
              :disabled="codedisabled"
              class="code_css"
            />
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit" long>{{
            $t("buyCoin.universal.submit")
          }}</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- 快捷交易弹窗 -->
    <Modal v-model="quickModal" footer-hide :title="$t('buyCoin.index.txt33')">
      <Form :model="formDataQuick" :label-width="80">
        <FormItem :label="$t('buyCoin.index.txt34')">
          <Select
            v-model="checkValue"
            style="width: 100%"
            @on-change="seleceChange"
            :label-in-value="true"
          >
            <Option
              v-for="(item, index) in resData"
              :value="index"
              :key="item.unit"
              :label="item.unit"
            >
              <div style="display: flex; align-items: center">
                <img style="height: 24px; width: 24px" :src="item.icon" />
                <span style="margin: 0px 12px">{{ item.unit }}</span>
              </div>
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('buyCoin.index.txt45')">
          <RadioGroup
            v-model="formDataQuick.orderType"
            @on-change="handleRadio"
          >
            <Radio :label="1" border>{{ $t("buyCoin.universal.buy") }}</Radio>
            <Radio :label="0" border>{{ $t("buyCoin.universal.sell") }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="$t('buyCoin.index.txt35')">
          <RadioGroup v-model="formDataQuick.type">
            <Radio :label="0" border>{{ $t("buyCoin.index.txt36") }}</Radio>
            <Radio :label="1" border>{{ $t("buyCoin.index.txt37") }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          :label="
            formDataQuick.type === 0
              ? $t('buyCoin.index.txt38')
              : $t('buyCoin.index.txt39')
          "
        >
          <Input v-model="formDataQuick.num" placeholder=""> </Input>
        </FormItem>
        <FormItem>
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <div>{{ $t("buyCoin.index.txt40") }}: {{ avgPrice.avgPrice }}</div>
            <div>
              {{ $t("buyCoin.index.txt41") }}: {{ avgPrice.useBalance }}
            </div>
          </div>
        </FormItem>
        <FormItem
          :label="$t('buyCoin.index.txt20')"
          v-if="formDataQuick.orderType == 0"
        >
          <RadioGroup v-model="formDataQuick.payType">
            <Radio :label="1" border>{{ $t("buyCoin.universal.wx") }}</Radio>
            <Radio :label="2" border>{{
              $t("buyCoin.universal.alipay")
            }}</Radio>
            <Radio :label="3" border>{{ $t("buyCoin.universal.bank") }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button
            :disabled="quickBtnDisabled"
            type="primary"
            @click="handleQuickSubmit"
            long
            >{{ $t("buyCoin.universal.submit") }}</Button
          >
        </FormItem>
      </Form>
      <Spin size="large" fix v-if="spinShowQuick"></Spin>
    </Modal>
  </div>
</template>

<script>
import TopOperates from "./components/TopOperates.vue";
import FooterPart from "@/components/footerPart.vue";
var moment = require("moment");

export default {
  components: {
    TopOperates,
    FooterPart,
  },
  data() {
    return {
      codeTwo4: false,
      changeFrom: {
        code: "",
      },
      countdown: 60,
      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      // 用户支付方式
      userPayType: {},
      // 商家收款方式
      shopPayType: null,
      // 订单详情
      orderDetail: {},
      // 卖币最小值and最大值
      minNum: 0,
      maxNum: 0,
      // 列表加载
      tableLoading: false,
      // 快捷支付弹窗加载
      spinShowQuick: false,
      // 弹窗
      applicationModal: false,
      quickModal: false,
      // 快捷按钮是否禁用
      quickBtnDisabled: false,
      // 分页
      total: 0,
      pageNum: 1,
      // 筛选用
      resData: [], // 币种
      detailData: {}, // 默认币种
      coinName: "", // 默认币种名
      orderType: "0", // 0购买单 1出售单
      checkValue: 0,
      coinIcon: "",
      // 购买/出售订单弹窗
      operateOrderModal: false,
      formData: {
        type: 0,
        total: 0,
        payType: 1,
      },
      // 均价与余额
      avgPrice: {},
      formDataQuick: {
        orderType: 1,
        type: 0,
        num: 0,
        unit: "USDT",
        payType: 1,
      },
      // 所有要用到的数据 做判断
      allListJudge: {
        coOrderBalance: "",
        coAmountMin: "",
        coAmountMax: "",
        coCoinPrice: "",
      },
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),

      // 购买/出售
      orderId: null, // 购买/出售的订单id

      payType: "0",
      tutorialType: "0",
      IntervalType: this.$t("buyCoin.index.txt10"),

      columns: [
        {
          title: this.$t("buyCoin.index.txt21"),
          slot: "coSellerName",
          align: "center",
        },
        {
          title: this.$t("buyCoin.universal.price") + " ¥",
          slot: "b",
          align: "center",
        },
        {
          title: this.$t("buyCoin.index.txt22"),
          slot: "c",
          align: "center",
        },
        {
          title: this.$t("buyCoin.universal.payType"),
          slot: "coPayType",
          align: "center",
        },
        {
          title: this.$t("buyCoin.universal.operate"),
          slot: "e",
          align: "center",
        },
      ],
      dataList: [],

      tutorialData1: [
        {
          img: this.$imgUrl + "/express/1-1.svg",
          title: this.$t("buyCoin.index.txt23"),
          detail: this.$t("buyCoin.index.txt24"),
        },
        {
          img: this.$imgUrl + "/express/1-2.svg",
          title: this.$t("buyCoin.index.txt25"),
          detail: this.$t("buyCoin.index.txt26"),
        },
        {
          img: this.$imgUrl + "/express/1-3.svg",
          title: this.$t("buyCoin.index.txt27"),
          detail: this.$t("buyCoin.index.txt28"),
        },
      ],
      tutorialData2: [
        {
          img: this.$imgUrl + "/express/1-1.svg",
          title: this.$t("buyCoin.index.txt23"),
          detail: this.$t("buyCoin.index.txt24"),
        },
        {
          img: this.$imgUrl + "/express/2-2.svg",
          title: this.$t("buyCoin.index.txt29"),
          detail: this.$t("buyCoin.index.txt30"),
        },
        {
          img: this.$imgUrl + "/express/2-3.svg",
          title: this.$t("buyCoin.index.txt31"),
          detail: this.$t("buyCoin.index.txt32"),
        },
      ],
    };
  },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    fixedScale: function(value, scale) {
      return value.toFixed(scale);
    },
    countDownFormat: function(value) {
      var m = parseInt(value / 60);
      var s = value % 60;
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
  },
  mounted() {
    // 获取币种信息
    this.getCoinData();
    this.timer = setInterval(() => {}, 30000);
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.orderTimer) {
      clearInterval(this.orderTimer);
    }
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
    member: function() {
      return this.$store.getters.member;
    },
  },
  methods: {
    // 快捷交易
    handleQuick() {
      this.quickModal = true;
      // 默认币种
      this.formDataQuick.unit = this.coinName;
      this.getAvgPrice();
    },
    // 快捷交易选择币种
    seleceChange(res) {
      this.formDataQuick.num = 0;
      this.formDataQuick.unit = res.label;
      // 获取均价
      this.getAvgPrice();
    },
    // 选择购买/出售
    handleRadio(num) {
      this.formDataQuick.orderType = num;
      // 获取均价
      this.getAvgPrice();
    },
    // 获取均价
    getAvgPrice() {
      this.spinShowQuick = true;
      var params = {};
      params["unit"] = this.formDataQuick.unit;
      params["orderType"] = this.formDataQuick.orderType;
      this.$http
        .get(this.host + this.api.buy.avgPriceApi, { params: params })
        .then((res) => {
          if (res.data.code === 0) {
            // 成功获取均价
            this.avgPrice = res.data.data;
            this.quickBtnDisabled = false;
            this.spinShowQuick = false;
          } else {
            // 当前市场没有订单
            this.$Message.error(res.data.message);
            this.avgPrice.avgPrice = "none";
            this.avgPrice.useBalance = "none";
            this.quickBtnDisabled = true;
            this.spinShowQuick = false;
          }
        });
    },
    // 快捷交易提交 获取订单号
    handleQuickSubmit() {
      // if()
      var params = {};
      params["orderType"] = this.formDataQuick.orderType;
      params["type"] = this.formDataQuick.type;
      params["num"] = this.formDataQuick.num;
      params["unit"] = this.formDataQuick.unit;
      params["payType"] = this.formDataQuick.payType;
      this.$http
        .get(this.host + this.api.buy.idealOrderApi, { params: params })
        .then((res) => {
          if (res.body.code === 0) {
            // console.log(res.body.data,'3333');
            this.allListJudge.coCoinPrice = res.body.data.coCoinPrice;
            this.allListJudge.coOrderBalance = res.body.data.coOrderBalance;
            this.allListJudge.coAmountMin = res.body.data.coAmountMin;
            this.allListJudge.coAmountMax = res.body.data.coAmountMax;
            this.orderId = res.body.data.coId;
            this.orderType = this.formDataQuick.orderType == 0 ? 1 : 0;
            this.formData.type = this.formDataQuick.type;
            this.formData.total = this.formDataQuick.num;
            this.formData.payType = this.formDataQuick.payType;
            this.quickModal = false;
            this.handleSubmit();
          } else {
            // 当前市场没有合适的订单
            this.$Message.error(res.data.message);
          }
        });
    },

    // 购买/出售订单
    handleOrder(row) {
      this.orderDetail = row;
      // row.coPayType 商家收款方式
      this.shopPayType = row.coPayType;
      this.orderId = row.coId;
      this.allListJudge.coCoinPrice = row.coCoinPrice;
      this.allListJudge.coOrderBalance = row.coOrderBalance;
      this.allListJudge.coAmountMin = row.coAmountMin;
      this.allListJudge.coAmountMax = row.coAmountMax;
      // 获取用户付款方式
      this.getUserPayType();
    },
    // 获取用户付款方式
    getUserPayType() {
      this.$http.get(this.host + this.api.buy.payType).then((response) => {
        var res = response.data;
        this.userPayType = res.data;
        // console.log("用户付款方式", this.userPayType);
        // console.log("商家付款方式", this.shopPayType);
        // console.log("0购买单 1出售单", this.orderDetail.coOrderType);
        // 按钮要反过来
        if (this.orderDetail.coOrderType == 1) {
          // 购买单不判断付款方式
          this.operateOrderModal = true;
        } else {
          // 出售单, 出售方的付款方式要有商家的付款方式
          // 1微信 2支付宝 3银行卡
          if (this.shopPayType === 1) {
            if (this.userPayType.cptCodeWx === null) {
              this.$Message.error(this.$t("buyCoin.index.txt42"));
            } else {
              this.userPayType.cptCodeZfb = null;
              this.userPayType.cptBankCode = null;
              this.operateOrderModal = true;
            }
          } else if (this.shopPayType === 2) {
            if (this.userPayType.cptCodeZfb === null) {
              this.$Message.error(this.$t("buyCoin.index.txt43"));
            } else {
              this.userPayType.cptCodeWx = null;
              this.userPayType.cptBankCode = null;
              this.operateOrderModal = true;
            }
          } else if (this.shopPayType === 3) {
            if (this.userPayType.cptBankCode === null) {
              this.$Message.error(this.$t("buyCoin.index.txt44"));
            } else {
              this.userPayType.cptCodeWx = null;
              this.userPayType.cptCodeZfb = null;
              this.operateOrderModal = true;
            }
          }
        }
      });
    },
    // 提交 购买/出售订单
    handleSubmit() {
      this.formData.orderId = this.orderId;
      if (!this.formData.total) {
        if (this.orderType == 0) {
          this.$Message.error(this.$t("carouselItem.text199"));
          return;
        } else {
          this.$Message.error(this.$t("carouselItem.text200"));
          return;
        }
      }
      // 1购买 0出售
      if (this.orderType == 0) {
        if (this.formData.type == 0) {
          if (this.formData.total > this.allListJudge.coOrderBalance) {
            this.$Message.error(this.$t("carouselItem.text201"));
            return;
          }
          if (
            this.formData.total >
            this.allListJudge.coAmountMax / this.allListJudge.coCoinPrice
          ) {
            this.$Message.error(this.$t("carouselItem.text202"));
            return;
          }
          if (
            this.formData.total <
            this.allListJudge.coAmountMin / this.allListJudge.coCoinPrice
          ) {
            this.$Message.error(this.$t("carouselItem.text203"));
            return;
          }
        } else if (this.formData.type == 1) {
          if (this.formData.total > this.allListJudge.coAmountMax) {
            this.$Message.error(this.$t("carouselItem.text202"));
            return;
          }
          if (this.formData.total < this.allListJudge.coAmountMin) {
            this.$Message.error(this.$t("carouselItem.text203"));
            return;
          }
        }
        // 购买
        this.$http
          .post(this.host + this.api.buy.createBuyOrderApi, this.formData)
          .then((res) => {
            if (res.data.code === 0) {
              this.$Message.success(res.data.message);
              this.operateOrderModal = false;
              // 跳我的订单页面
              this.$router.push("/buyCoin/myOrders");
            } else {
              this.$Message.error(res.data.message);
            }
          });
      } else {
        if (this.formData.type == 0) {
          if (this.formData.total > this.allListJudge.coOrderBalance) {
            this.$Message.error(this.$t("carouselItem.text201"));
            return;
          }
          if (
            this.formData.total >
            this.allListJudge.coAmountMax / this.allListJudge.coCoinPrice
          ) {
            this.$Message.error(this.$t("carouselItem.text202"));
            return;
          }
          if (
            this.formData.total <
            this.allListJudge.coAmountMin / this.allListJudge.coCoinPrice
          ) {
            this.$Message.error(this.$t("carouselItem.text203"));
            return;
          }
        } else if (this.formData.type == 1) {
          if (this.formData.total > this.allListJudge.coAmountMax) {
            this.$Message.error(this.$t("carouselItem.text202"));
            return;
          }
          if (this.formData.total < this.allListJudge.coAmountMin) {
            this.$Message.error(this.$t("carouselItem.text203"));
            return;
          }
        }
        if (!this.changeFrom.code) {
          this.$Message.error(this.$t("uc.forget.smscode"));
          return;
        }
        this.$http
          .get(this.host + this.api.buy.confirmVerifyCode, {
            params: { code: this.changeFrom.code },
          })
          .then((res) => {
            if (res.data.code === 0) {
              this.$http
                .post(
                  this.host + this.api.buy.createSellOrderApi,
                  this.formData
                )
                .then((res) => {
                  if (res.data.code === 0) {
                    this.$Message.success(res.data.message);
                    this.operateOrderModal = false;
                    // 跳我的订单页面
                    this.$router.push("/buyCoin/myOrders");
                  } else {
                    this.$Message.error(res.data.message);
                  }
                });
            } else {
              this.$Message.error(res.data.message);
            }
          });
        // 出售
      }
    },
    handleOrderType(res) {
      this.orderType = res;
      this.getOrderList(1, this.orderType, this.coinName);
    },
    handleCoin(res) {
      this.coinName = res;
      this.getOrderList(1, this.orderType, this.coinName);
      let a = this.resData.find((item) => res == item.unit);
      this.coinIcon = a.icon;
    },
    // 修改更新时间
    handleIntervalType(name) {
      this.IntervalType = name;
    },
    // 获取订单列表数据
    getOrderList(pageNo, orderType, coinName) {
      this.tableLoading = true;
      var params = {};
      params["pageNo"] = pageNo;
      params["orderType"] = orderType == 0 ? 1 : 0;
      params["coin"] = coinName;
      params["pageSize"] = 10;
      this.$http
        .get(this.host + this.api.buy.orderPageApi, { params: params })
        .then((response) => {
          var res = response.data;
          this.tableLoading = false;
          if (res.code == 0) {
            this.dataList = res.data.content;
            this.total = res.data.totalElements;
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: res.message,
            });
          }
        });
    },
    // 监听发布订单弹窗关闭
    closeAddOrderModal() {
      this.getOrderList(1, this.orderType, this.coinName);
    },
    // 订单列表分页
    pageChange(page) {
      this.pageNum = page;
      this.getOrderList(this.pageNum, this.orderType, this.coinName);
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      if (this.isLogin) {
        this.$http
          .get(this.host + `${this.api.FinanceChange.deposit}/5`, params)
          .then((res) => {
            this.resData = res.data.data;
            this.detailData = this.resData[0];
            this.coinName = this.resData[0].unit;
            this.coinIcon = this.resData[0].icon;
            this.loading = false;
            // 获取商家单
            this.getOrderList(1, this.orderType, this.coinName);
          });
      } else {
        this.$http
          .get(this.host + this.api.FinanceChange.getForPc, {
            params: { type: "5" },
          })
          .then((res) => {
            this.resData = res.data.data;
            this.detailData = this.resData[0];
            this.coinName = this.resData[0].unit;
            this.coinIcon = this.resData[0].icon;
            this.loading = false;
            // 获取商家单
            // this.getOrderList(1, this.orderType, this.coinName);
          });
      }
    },
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    go_page() {
      this.$router.push("/login");
    },
    settime() {
      this.sendcodeValue =
        this.$t("uc.regist.resendcode") + this.countdown + ")";
      this.codedisabled = true;
      this.codeTwo4 = false;
      var _this = this;
      let timercode = setInterval(() => {
        _this.countdown--;
        _this.sendcodeValue =
          _this.$t("uc.regist.resendcode") + _this.countdown + ")";
        if (this.countdown <= 0) {
          clearInterval(timercode);
          _this.codedisabled = false;
          _this.sendcodeValue = _this.$t("uc.regist.sendcode");
          _this.countdown = 60;
        }
      }, 1000);
    },
    handlerUpdatePWSetCode() {
      if (this.codeTwo4) {
        return;
      }
      this.codeTwo4 = true;
      this.$http
        // 1手机  2。邮箱
        .get(this.host + this.api.buy.sendVerifyCode, {
          params: {
            type: this.userInfo.email ? "2" : "1",
          },
        })
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.settime();
            this.$Notice.success({
              title: this.$t("common.tip"),
              desc: this.$t("new.universal.success"),
            });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: resp.message,
            });
            this.codeTwo4 = false;
          }
        });
    },
  },
};
</script>
<style scoped lang="less">
@import url("../../assets/css/common.less");
.buy {
  width: 100%;
  .head_part {
    padding-top: 50px;
    width: 100%;
    height: auto;
    background: #1e2329;
    overflow: hidden;
    .head_content {
      height: 160px;
      display: flex;
      flex-direction: column;
      width: 1200px;
      margin: 0 auto;
      padding: 48px 0;
      .head_title {
        display: block;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #ffffff;
        text-align: center;
      }
      .head_detail {
        display: block;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #848e9c;
      }
    }
  }
  .selects_part {
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #ffffff;
    .select_tabs {
      display: flex;
      box-shadow: 0px 0px 1px rgba(24, 26, 32, 0.1),
        0px 3px 6px rgba(71, 77, 87, 0.04), 0px 1px 2px rgba(24, 26, 32, 0.04);
      position: relative;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .select_filter {
      width: 1200px;
      margin: 0 auto;
      padding: 16px 0 17px;
      .select_filter_content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .table_part {
    width: 1200px;
    margin: 20px auto;
    color: rgb(71, 77, 87);
    font-size: 14px;
    .title {
      background: linear-gradient(
        258.37deg,
        rgb(248, 211, 58) -55.42%,
        rgba(208, 152, 11, 0.1) 95.38%
      );
      border-radius: 12px 2px 2px 12px;
      color: rgb(40, 92, 147);
      cursor: pointer;
      font-size: 16px;
    }
    .pages {
      box-sizing: border-box;
      min-width: 0px;
      display: flex;
      -webkit-box-pack: end;
      justify-content: flex-end;
      margin: 24px 0px 24px;
    }
  }
  .others_part {
    width: 100%;
    .tutorial {
      width: 1200px;
      margin: 0 auto;
      padding: 48px 40px;
      background-color: rgb(250, 250, 250);
      border-radius: 32px;
      .tutorial_title {
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .tutorial_detail {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        display: grid;
        .tutorial_content {
          display: flex;
          padding: 40px 16px;
          flex-direction: column;
          align-items: center;
          margin: 0px;
          border: 1px solid rgb(234, 236, 239);
          border-radius: 16px;
          .item_title {
            font-weight: 500;
            font-size: 20px;
            line-height: 28px;
            margin-bottom: 16px;
          }
          .item_detail {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: rgb(112, 122, 138);
            text-align: center;
          }
        }
      }
    }
    .pay_part {
      padding: 64px 48px;
      grid-template-columns: 1fr max-content;
      gap: 24px;
      width: 1200px;
      margin: 40px auto 0;
      background: radial-gradient(
          100% 100% at left top,
          rgb(252, 249, 233) 0%,
          transparent 100%
        ),
        radial-gradient(
          100% 100% at right top,
          rgb(236, 243, 252) 0%,
          transparent 100%
        ),
        radial-gradient(
          100% 100% at left bottom,
          rgb(236, 248, 244) 0%,
          transparent 100%
        ),
        rgb(249, 250, 250);
      border-radius: 8px;
      display: grid;
      .pay_part_title {
        font-size: 28px;
        line-height: 36px;
        font-weight: 600;
        align-self: center;
      }
      .pay_part_buttons {
        grid-template-columns: repeat(3, 1fr);
        display: grid;
        column-gap: 24px;
        row-gap: 20px;
        .button_icon {
          border-left: 4px solid red;
          padding-left: 12px;
        }
      }
    }
  }
}
.operate_part {
  background-color: #1e2329;
  height: 56px;
  width: 100%;
}
.input_two {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}
.code_css {
  height: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 1px;
  right: 5px;
  cursor: pointer;
}
</style>
