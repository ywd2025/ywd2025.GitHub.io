<template>
  <div class="finance_all_content">
    <section
      style="
        display: flex;
        height: 100%;
        flex-direction: column;
        padding-top: 36px;
      "
    >
      <div class="top_title_part">
        <h1 class="mr-4 text-2xl font-semibold leading-10 text-t1">
          {{ $t("new.universal.contractAccount") }}
        </h1>
        <div class="flex">
          <Button @click="transferModal = true" type="success" class="">{{
            $t("new.finance.transfer")
          }}</Button>
          <!-- 劃轉對話框 -->
          <Modal
            v-model="transferModal"
            :title="$t('new.finance.transfer')"
            :footer-hide="true"
          >
            <transferModal
              @closeModal="closeModal1"
              v-if="transferModal"
            ></transferModal>
          </Modal>
        </div>
      </div>
      <div class="top_title_part_detail">
        <div class="flex_center_start">
          <h5 class="text-base font-medium text-t2">
            {{ $t("new.finance.contractValuation") }}
          </h5>
          <Icon
            @click.prevent="numberShow = false"
            v-if="numberShow"
            type="md-eye"
            class="eyesIcon"
          />
          <Icon
            @click.prevent="numberShow = true"
            v-else
            type="md-eye-off"
            class="eyesIcon"
          />
        </div>
        <div class="top_title_part_detail_num" data-private="">
          <span
            style="
              line-height: 38px;
              font-size: 32px;
              margin-right: 8px;
              color: #1c1c1c;
            "
          >
            {{ !numberShow ? "*********" : `${allData.allUse} USDT` }}
          </span>
          <em class="pt-2 text-lg leading-5 text-t2 left-5">
            {{
              !numberShow ? "*********" : ` ≈ ${pricingStatus}${allData.allCNY}`
            }}
          </em>
        </div>
      </div>

      <div class="coinList">
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("new.finance.walletBalance") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{
              !numberShow
                ? "*********"
                : `${allData.all - allData.giveBalance} USDT`
            }}</span>
          </dd>
          <dd class="coin_cn">
            <span>{{
              !numberShow
                ? "*********"
                : ` ≈ ${pricingStatus}${pricingStatusRate *
                    (allData.all - allData.giveBalance)}`
            }}</span>
          </dd>
        </dl>
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("dolphin.text80") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{
              !numberShow ? "*********" : `${allData.giveBalance} USDT`
            }}</span>
          </dd>
        </dl>
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("follow.universal.txt1") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{ !numberShow ? "*********" : `${allGet} USDT` }}</span>
          </dd>
        </dl>
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("dolphin.text81") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{
              !numberShow ? "*********" : `${allData.giveBalanceLose} USDT`
            }}</span>
          </dd>
        </dl>
      </div>

      <div class="otherCoins">
        <Tabs v-model="type" @on-click="handleTabsType">
          <TabPane :label="$t('new.finance.cryptocurrency')" name="0">
            <!-- <div class="swapUnit">
              <Dropdown @on-click="handleSwapUnit">
                {{ $t("carouselItem.text21") }}: {{ swapUnit }}
                <Icon type="ios-arrow-down"></Icon>
                <DropdownMenu slot="list">
                  <DropdownItem :name="$t('swap.shareNumber')">{{
                    $t("swap.shareNumber")
                  }}</DropdownItem>
                  <DropdownItem name="USDT">USDT</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div> -->
            <div class="otherCoins_content">
              <!-- 合約 当前持仓 -->
              <Table
                height="380"
                :columns="currentPositionColumns"
                :data="dataList"
                :no-data-text="$t('common.nodata')"
              >
                <!-- 類型 -->
                <template slot-scope="{ row }" slot="patterns">
                  <span>
                    {{
                      row.patterns === "CROSSED"
                        ? $t("new.swap.fullPosition")
                        : $t("new.swap.takePosition")
                    }}
                  </span>
                  <span v-if="openMerge == 1"
                    >·{{
                      row.jointType == 0
                        ? $t("dolphin.text184")
                        : $t("dolphin.text185")
                    }}</span
                  >
                </template>
                <!-- 合約倍數 -->
                <template slot-scope="{ row }" slot="leverage">
                  {{ row.leverage }}
                </template>
                <!-- 方向 -->
                <template slot-scope="{ row }" slot="direction">
                  {{
                    row.direction === "BUY"
                      ? $t("new.swap.buy")
                      : $t("new.swap.sell")
                  }}
                </template>
                <!-- 止盈 -->
                <template slot-scope="{ row }" slot="triggerPriceWin">
                  {{ !row.triggerPriceWin ? "-" : row.triggerPriceWin }}
                </template>
                <!-- 止損 -->
                <template slot-scope="{ row }" slot="triggerPriceLose">
                  {{ !row.triggerPriceLose ? "-" : row.triggerPriceLose }}
                </template>
                <!-- 收益 -->
                <template slot-scope="{ row }" slot="pl">
                  <span :class="[getIncome(row) > 0 ? 'green' : 'red']">
                    <!-- 开多收益 (当前价格/成交均价 -1)*合约面值*张数 -->
                    {{ getIncome(row) }}
                  </span>
                </template>
                <!-- 收益率 -->
                <template slot-scope="{ row }" slot="plRatio">
                  <span :class="[getYield(row) > 0 ? 'green' : 'red']">
                    <!-- 开多收益 (当前价格/成交均价 -1)*合约面值*张数/保證金 -->
                    {{ getYield(row) }}%
                  </span>
                </template>
                <!-- 持倉量 -->
                <template slot-scope="{ row }" slot="position">
                  {{
                    swapUnit === "USDT"
                      ? (
                          row.volume *
                          row.shareNumber *
                          allList_filter(row.symbol)
                        ).toFixed(4)
                      : row.volume
                  }}
                </template>
                <!-- 可平量 -->
                <template slot-scope="{ row }" slot="avaPosition">
                  {{
                    swapUnit === "USDT"
                      ? (
                          row.volume *
                          row.shareNumber *
                          allList_filter(row.symbol)
                        ).toFixed(4)
                      : row.volume
                  }}
                </template>
                <!-- 開倉均價 -->
                <template slot-scope="{ row }" slot="openPrice">
                  {{ Number(row.tradedPrice).toFixed(4) }}
                </template>
                <!-- 當前保證金 -->
                <template slot-scope="{ row }" slot="margin">
                  {{ Number(row.principalAmount).toFixed(4) }}
                </template>
                <!-- 手续费 -->
                <template slot-scope="{ row }" slot="openFee">
                  {{ Number(row.openFee).toFixed(5) }}
                </template>
                <!-- 預估強平價 -->
                <template slot-scope="{ row }" slot="mRatio">
                  <span v-if="parrentBuySell && row.patterns === 'CROSSED'"
                    >--</span
                  >
                  <span v-else>
                    <!-- 开多收益(多倉) = 开仓价*(1+(合约最低保证金率*保证金+平仓手续费-保证金)/(面值*张数))  平仓手续费=手續費率*張數*面值 -->
                    {{ getForcePrice(row) < 0 ? "--" : getForcePrice(row) }}
                  </span>
                </template>
                <!-- 操作 -->
                <template slot-scope="{ row }" slot="operate">
                  <Dropdown>
                    <span style="cursor: pointer; color: #03C59E">
                      {{ $t("carouselItem.text251") }}
                      <Icon type="ios-arrow-down"></Icon>
                    </span>
                    <DropdownMenu slot="list">
                      <DropdownItem v-if="row.tradeType == 0"
                        ><span
                          style="color: #03C59E"
                          @click="handleTurn(row)"
                          >{{ $t("new.swap.reverse") }}</span
                        ></DropdownItem
                      >
                      <DropdownItem v-if="row.tradeType == 0">
                        <span
                          style="color: #03C59E"
                          @click="handleCloseModal(row)"
                          >{{ $t("carouselItem.text16") }}</span
                        ></DropdownItem
                      >
                      <DropdownItem v-if="row.tradeType == 0"
                        ><span
                          style="color: #03C59E"
                          @click="handleOpenOrCloseModal(row)"
                          >{{ $t("new.swap.profitLoss") }}</span
                        ></DropdownItem
                      >
                      <DropdownItem v-if="row.tradeType != 2"
                        ><span
                          @click="handleAddPrincipalAmount(row)"
                          style="color: #03C59E"
                          >{{ $t("carouselItem.text15") }}</span
                        ></DropdownItem
                      >
                      <DropdownItem v-if="row.tradeType != 0">
                        <span
                          style="color: #03C59E"
                          @click="handleCloseQulick(row)"
                          >{{ $t("new.swap.close") }}</span
                        >
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </Table>
            </div>
          </TabPane>
          <TabPane :label="$t('new.universal.assets')" name="1">
            <div class="otherCoins_content">
              <div class="filte_all">
                <Checkbox v-model="single" @on-change="handleCheckChange()">{{
                  $t("carouselItem.text206")
                }}</Checkbox>
                <Input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('carouselItem.text205')"
                  class="input_select"
                  clearable
                />
              </div>
              <Table
                :columns="propertyColumns"
                :data="dataList"
                :no-data-text="$t('common.nodata')"
              >
                <template slot-scope="{ row, index }" slot="icon">
                  <Avatar :src="row.icon" />
                </template>
                <template slot-scope="{ row }" slot="allUSDT">
                  <span>{{
                    parseFloat(row.useUSDT) + parseFloat(row.frozenUSDT)
                  }}</span>
                </template>
                <template slot-scope="{ row }" slot="useUSDT">
                  <span>{{ parseFloat(row.useUSDT) }}</span>
                </template>
                <template slot-scope="{ row }" slot="frozenUSDT">
                  <span>{{ parseFloat(row.frozenUSDT) }}</span>
                </template>
              </Table>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </section>
    <profiLoss
      @profiLoss="profiLoss"
      @successprofiLoss="successprofiLoss"
      :price="price"
      :openOrCloseModal="openOrCloseModal"
      :rowData="rowData"
    ></profiLoss>
    <closeModal
      @profiLoss="profiLoss"
      :closeModals="closeModals"
      @successprofiLoss="successprofiLoss"
      :rowData="rowData"
      :income="income"
      :Yield="Yield"
      :price="price"
      :swapUnit="swapUnit"
    ></closeModal>
    <!-- <addmoney
      @profiLoss="profiLoss"
      :addPrincipalAmountModal="addPrincipalAmountModal"
      @successprofiLoss="successprofiLoss"
      :rowData="rowData"
    ></addmoney> -->
    <!-- 弹出框: 闪电平仓-->
    <qulickClose
      :rowData="rowData"
      :closeQulick="closeQulick"
      @profiLoss="profiLoss"
      @successprofiLoss="successprofiLoss"
    ></qulickClose>
  </div>
</template>

<script>
import transferModal from "./components/transferModal.vue";
import profiLoss from "./components/profiLoss.vue";
import closeModal from "./components/closeModal.vue";
import addmoney from "./components/addmoney.vue";
import qulickClose from "../swap/component/qulickClose.vue";
import $ from "@js/jquery.min.js";
export default {
  components: {
    transferModal,
    profiLoss,
    closeModal,
    addmoney,
    qulickClose,
  },
  data() {
    return {
      // 計價方式
      pricingStatus: localStorage.getItem("pricingStatus"),
      // 小眼睛
      numberShow: false,
      // 劃轉彈窗
      transferModal: false,
      // 表格type
      type: 0,
      // 總值
      allData: {},
      // 检索
      searchValue: "",
      // 表格數據
      dataList: [],
      dataList1: [],
      single: false,
      openOrCloseModal: false, //止盈止损
      closeModals: false, //平仓
      // addPrincipalAmountModal: false, //保证金
      closeQulick: false, //保证金
      rowData: [],
      price: "",
      income: "",
      Yield: "",
      pageInfo: {},
      swapUnit: this.$t("swap.shareNumber"),
      allList: [],
      openMerge: 0,
      // 倉位
      currentPositionColumns: [
        //倉位類型
        {
          title: this.$t("new.swap.type"),
          slot: "patterns",
          align: "center",
          width: "120",
        },
        //合約倍數
        {
          title: this.$t("swap.pos_leverage"),
          slot: "leverage",
          align: "center",
          width: "100",
        },
        //交易對
        {
          title: this.$t("exchange.symbol"),
          key: "symbol",
          align: "center",
        },
        //方向
        {
          title: this.$t("swap.ent_direction"),
          slot: "direction",
          align: "center",
        },
        //止盈
        {
          title: this.$t("new.swap.earning"),
          slot: "triggerPriceWin",
          align: "center",
        },
        //止損
        {
          title: this.$t("new.swap.loss"),
          slot: "triggerPriceLose",
          align: "center",
        },
        //收益
        {
          title: this.$t("swap.pos_Pl"),
          slot: "pl",
          align: "center",
        },
        //收益率
        {
          title: this.$t("swap.pos_Ratio"),
          slot: "plRatio",
          align: "center",
          width: "120",
        },
        //持倉量
        {
          title: this.$t("swap.pos_pos"),
          slot: "position",
          align: "center",
        },
        //可平量
        {
          title: this.$t("swap.pos_canClose"),
          slot: "avaPosition",
          align: "center",
        },
        // 開倉均價
        {
          title: this.$t("swap.pos_openPrice"),
          slot: "openPrice",
          align: "center",
        },
        // 當前保證金
        {
          title: this.$t("swap.pos_margin"),
          slot: "margin",
          align: "center",
        },
        {
          title: this.$t("uc.otcorder.fee"),
          slot: "openFee",
          align: "center",
        },
        // 預估強平價
        {
          title: this.$t("new.swap.strongPrice"),
          slot: "mRatio",
          align: "center",
          width: "140",
        },
        //操作
        {
          title: this.$t("buyCoin.universal.operate"),
          slot: "operate",
          width: "140",
          align: "center",
        },
      ],
      // 資產
      propertyColumns: [
        {
          title: this.$t("carouselItem.text90"),
          slot: "icon",
        },
        {
          title: this.$t("new.universal.currency"),
          key: "unit",
        },
        {
          title: this.$t("new.universal.all"),
          slot: "allUSDT",
        },
        {
          title: this.$t("new.finance.available"),
          slot: "useUSDT",
        },
        {
          title: this.$t("new.finance.freeze"),
          slot: "frozenUSDT",
        },
      ],
      currentCoin: [],
      timer: null,
      coinSymboly: [], //币种最新价格
      RuleList: [], //合约最低保证金率
      columnsTitle8: "",
      columnsTitle9: "",
    };
  },
  watch: {
    searchValue(newVal, oldVal) {
      newVal = String(newVal).toLowerCase();
      this.dataList = this.allData.data.filter((item) => {
        return item.coinName
          .toString()
          .toLowerCase()
          .includes(newVal);
      });
    },
  },
  computed: {
    allGet() {
      return this.dataList1.reduce((total, item) => {
        return total + this.getIncome(item);
      }, 0);
    },
    pricingStatusRate() {
      return this.$store.state.pricingStatusRate;
    },
    member: function() {
      return this.$store.getters.member;
    },
    parrentBuySell() {
      let a = this.dataList.filter((item) => item.patterns === "CROSSED");
      let hasBuyAndSell =
        a.some((item) => item.direction === "BUY") &&
        a.some((item) => item.direction === "SELL");
      return hasBuyAndSell;
    },
  },
  destroyed() {
    this.stopPolling();
  },
  created() {
    this.columnsTitle8 = this.currentPositionColumns[8].title;
    this.columnsTitle9 = this.currentPositionColumns[9].title;
    this.currentPositionColumns[8].title =
      this.columnsTitle8 + "(" + this.swapUnit + ")";
    this.currentPositionColumns[9].title =
      this.columnsTitle9 + "(" + this.swapUnit + ")";
  },
  mounted() {
    this.getSwapSymbol();
    this.startPolling();
    this.getAuto();
    this.init();
    this.getRuleList();
    // this.initMqtt();
    this.getPositionData();
    // 獲取倉位 持倉信息
    if (this.$store.state.newallCoinSwap) {
      this.currentCoin = this.$store.state.newallCoinSwap;
      for (let i = 0; i < this.currentCoin.length; i++) {
        const symbol = this.currentCoin[i].symbol;
        //获取精度
        this.$http
          .post(this.host + this.api.swap.symbolInfo, {
            symbol: symbol,
          })
          .then((response) => {
            var maintenanceMarginRate = response.body.maintenanceMarginRate;
            // 交易對信息
            this.currentCoin[i].maintenanceMarginRate = maintenanceMarginRate;
            return;
          });
      }
    }
  },
  methods: {
    // 頁面跳轉
    goPage() {
      this.$router.push("/orders/futures/transaction");
    },
    // 監聽關閉彈窗
    closeModal1() {
      this.transferModal = false;
      this.init();
    },
    handleTabsType(name) {
      this.type = name;
      if (this.type == 0) {
        this.dataList = [];
        this.getPositionData();
      } else {
        // 資產
        this.dataList = [];
        this.dataList = this.allData.data;
      }
    },
    init() {
      this.loading = true;
      // 賬戶信息
      this.$http
        .get(this.host + this.api.finance.walletDetail, {
          params: {
            rateStr: localStorage.getItem("pricingStatus"),
            type: "2",
          },
        })
        .then((res) => {
          var resData = res.data.data;
          this.allData = resData;
          this.loading = false;
        });
    },
    // 獲取持倉信息
    getPositionData() {
      var params = {};
      params["isDoc"] = "0";
      // params["walletInfoId"] = this.member.walletInfoId;    // 持仓id
      //获取精度 當前用戶跟單
      this.$http
        .post(this.host + this.api.swap.getTakePosition, params)
        .then((res) => {
          this.dataList = res.data.data;
          this.dataList1 = res.data.data;
        });
    },
    // 合約與跟單的表格
    getTableDate() {
      var params = {};
      params["walletType"] = "0";
      params["type"] = this.type;
      this.$http
        .post(this.host + this.api.finance.contractDetail, params)
        .then((res) => {
          // console.log(res);
          this.dataList = res.data.data;
          this.loading = false;
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
    // 获取合约  当前价格
    getSwapSymbol() {
      this.$http
        .post(this.host + this.api.markets.swapThumb, {})
        .then((res) => {
          this.coinSymboly = res.data;
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
        if (item.patterns == "CROSSED") {
          return this.buyAllForcePrice(
            item.tradedPrice,
            MarginRate,
            item.principalAmount,
            Number(this.allData.allUse),
            // this.allGet,
            item.openFee,
            item.shareNumber,
            item.volume
          );
        } else if (item.patterns == "FIXED") {
          return this.buyForcePrice(
            item.tradedPrice,
            MarginRate,
            item.principalAmount,
            item.openFee,
            item.shareNumber,
            item.volume
          );
        }
      } else {
        if (item.patterns == "CROSSED") {
          return this.sellAllForcePrice(
            item.tradedPrice,
            MarginRate,
            item.principalAmount,
            Number(this.allData.allUse),
            // this.allGet,
            item.openFee,
            item.shareNumber,
            item.volume
          );
        } else if (item.patterns == "FIXED") {
          return this.sellForcePrice(
            item.tradedPrice,
            MarginRate,
            item.principalAmount,
            item.openFee,
            item.shareNumber,
            item.volume
          );
        }
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
    handleCheckChange() {
      if (this.single == true) {
        this.dataList = this.allData.data.filter(
          (item) => Number(item.useUSDT) != 0
        );
      } else {
        this.dataList = this.allData.data;
      }
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
    // 止盈止损
    handleOpenOrCloseModal(row) {
      this.openOrCloseModal = true;
      this.rowData = row;
      this.price = this.allList_filter(row.symbol);
    },
    // 平仓
    handleCloseModal(row) {
      this.closeModals = true;
      this.rowData = row;
      this.income = this.getIncome(row);
      this.Yield = this.getYield(row);
      this.price = this.allList_filter(row.symbol);
    },
    //  追加保证金
    // handleAddPrincipalAmount(row) {
    //   this.rowData = row;
    //   this.addPrincipalAmountModal = true;
    // },
    // 更改单位
    handleSwapUnit(name) {
      // console.log(name);
      this.swapUnit = name;
      this.currentPositionColumns[8].title =
        this.columnsTitle8 + "(" + this.swapUnit + ")";
      this.currentPositionColumns[9].title =
        this.columnsTitle9 + "(" + this.swapUnit + ")";
    },
    profiLoss(e) {
      this.openOrCloseModal = e;
      this.closeModals = e;
      // this.addPrincipalAmountModal = e;
      this.closeQulick = e;
    },
    successprofiLoss(e) {
      this.openOrCloseModal = e;
      this.closeModals = e;
      // this.addPrincipalAmountModal = e;
      this.closeQulick = e;
      this.getSwapSymbol();
      this.startPolling();
      this.getPositionData();
    },
    // 闪电平仓
    handleCloseQulick(row) {
      this.rowData = row;
      this.closeQulick = true;
    },
    // 反向
    handleTurn(row) {
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: this.$t("carouselItem.text167"),
        okText: this.$t("common.ok"), // 确定按钮的多语言文本
        cancelText: this.$t("common.close"),
        onOk: () => {
          this.$Spin.show();
          let params = {
            contractCoinId: row.contractId, // 合约id
            volume: row.volume, //委托数量 開倉數量
            triggerPriceType: 0, // 止盈价格
            tradeType: row.tradeType,
            entrustPrice: row.currentPrice,
            leverageSell: row.leverage,
            leverageBuy: row.leverage,
            direction: row.direction === "BUY" ? "SELL" : "BUY",
            openType: row.patterns === "CROSSED" ? "0" : "1",
            // crossed(全倉) 就是市價 如果是F(逐倉)就是 限价
            type: row.patterns === "CROSSED" ? "MARKET_PRICE" : row.type, // 价格类型 MARKET_PRICE:市价  LIMIT_PRICE:限价
            btype: "-1",
          };
          this.$http
            .post(this.host + this.api.swap.open, params)
            .then((response) => {
              this.$Spin.hide();
              var resp = response.body;
              if (resp.code == 0) {
                this.$Notice.success({
                  title: this.$t("swap.tip"),
                  desc: this.$t("swap.success"),
                });
                setTimeout(() => {
                  this.getSwapSymbol();
                  this.startPolling();
                  this.getPositionData();
                }, 1000);
              } else {
                this.$Notice.error({
                  title: this.$t("swap.tip"),
                  desc: resp.message,
                });
              }
            });
        },
      });
    },
    // initMqtt() {
    //   this.$mqttService.initMqtts().then((client) => {
    //     let that = this;
    //     client.subscribe(
    //       "contract-takeposition/" + that.member.id + "/" + "#",
    //       // that.currentCoin.symbol.replace("/", "-"),
    //       function(err, message) {
    //         if (!err) {
    //           client.on("message", (topic, message) => {
    //             let parts = topic.split("/");
    //             let firstPart = parts.shift();
    //             if (firstPart == "contract-takeposition") {
    //               // console.log(that.currentCoin.symbol == JSON.parse(message)[0].symbol);
    //               var resp = JSON.parse(message);
    //               // console.log(resp);
    //               that.dataList = resp;
    //               that.dataList1 = resp;
    //             }
    //           });
    //         }
    //       }
    //     );
    //   });
    // },
    // 判断权限
    getAuto() {
      this.$http
        .post(this.host + this.api.login.configQuery, {})
        .then((res) => {
          this.v_auto = res.body.data[0];
          this.v_auto.forEach((item) => {
            if (item.alia == "IS_merge") {
              this.openMerge = item.val;
            }
          });
        });
    },
  },
  beforeDestroy() {
    //断开连接
    this.$mqttService.disconnect();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.eyesIcon {
  font-size: 16px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  text-align: center;
  display: inline-block;
  position: relative;
  color: #6f6f6f;
  cursor: pointer;
  margin-left: 6px;
}
.finance_all_content {
  min-width: 975px;
  height: 100%;
  .top_title_part {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    h1 {
      color: #1c1c1c;
      line-height: 40px;
      font-weight: 600;
      font-size: 24px;
      margin-right: 16px;
    }
    .flex {
      button {
        height: 40px;
        width: 96px;
      }
    }
  }
  .top_title_part_detail {
    margin-top: 32px;
    padding: 0 24px 40px;
    border-bottom: 1px solid #eeeeee;
    .top_title_part_detail_num {
      display: flex;
      align-items: center;
      margin-top: 16px;
      font-weight: 500;
      color: #6f6f6f;
    }
  }
  .coinList {
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eeeeee;
    .coinData {
      width: 25%;
      padding: 40px 8px 40px;
      .coin_title {
        line-height: 20px;
      }
      .coin_number {
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        margin: 4px 0;
      }
      .coin_cn {
        color: #6f6f6f;
        line-height: 16px;
      }
    }
  }

  .otherCoins {
    margin-top: 36px;
    .otherCoins_content {
      padding: 4px 0px 0;
    }
  }
}
em {
  font-style: normal;
  padding-top: 8px;
  font-size: 18px;
  line-height: 18px;
}
.input_select {
  width: 250px;
  height: 35px;
  border-radius: 10px;
  text-indent: 1rem;
  color: #333;
}
.filte_all {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
}
.red {
  color: #F6465D;
}
.green {
  color: #03C59E;
}
.swapUnit {
  margin: 10px 30px;
  color: #03C59E;
  display: flex;
  justify-content: flex-end;
}
</style>
