<template>
  <div>
    <div class="bottom">
      <div class="order" style="background: #999">
        <div class="order-handler">
          <span
            @click="changeOrder('currentPositions')"
            :class="{ active: selectedOrder === 'currentPositions' }"
            >{{ $t("swap.currentposition") }}</span
          >
          <span
            @click="changeOrder('followPositions')"
            :class="{ active: selectedOrder === 'followPositions' }"
            >{{ $t("carouselItem.text50") }}</span
          >
          <span
            @click="changeOrder('currentEntrustOrders')"
            :class="{
              active: selectedOrder === 'currentEntrustOrders',
            }"
            >{{ $t("swap.curdelegation") }}</span
          >
          <span
            @click="changeOrder('planDelegationOrders')"
            :class="{
              active: selectedOrder === 'planDelegationOrders',
            }"
            >{{ $t("carouselItem.text17") }}</span
          >
          <span
            @click="changeOrder('historyEntrustOrders')"
            :class="{
              active: selectedOrder === 'historyEntrustOrders',
            }"
            >{{ $t("swap.hisdelegation") }}</span
          >
          <span
            style="float: right; color: #03C59E;cursor: pointer"
            @click="swapOrdercloseAll()"
            v-if="selectedOrder === 'followPositions'"
          >
            {{ $t("carouselItem.text168") }}
          </span>
          <span
            style="float: right; color: #03C59E;cursor: pointer"
            @click="swapOrdercloseAll()"
            v-if="selectedOrder === 'currentPositions'"
          >
            {{ $t("carouselItem.text168") }}
          </span>
          <span
            style="float: right; color: #03C59E;cursor: pointer"
            @click="changeTypeModal(true)"
            v-if="selectedOrder === 'currentPositions'"
          >
            {{ $t("dolphin.text186") }}
          </span>
        </div>
        <!-- 当前持仓 跟单持仓 當前委托 歷史委託 -->
        <div class="table">
          <!-- 重寫 當前非跟单持倉 -->
          <Table
            height="500"
            v-if="selectedOrder === 'currentPositions'"
            :columns="currentPosition.columns"
            :data="positionData"
            :no-data-text="$t('common.nodata')"
          >
            <!-- 類型 -->
            <template slot-scope="{ row }" slot="patterns">
              <span>
                {{
                  row.patterns === "CROSSED"
                    ? $t("new.swap.fullPosition")
                    : $t("new.swap.takePosition")
                }}</span
              >
              <span v-if="openMerge == 1"
                >·{{
                  row.jointType == 0
                    ? $t("dolphin.text184")
                    : $t("dolphin.text185")
                }}
              </span>
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
                {{ getIncome(row) }}
              </span>
            </template>
            <!-- 收益率 -->
            <template slot-scope="{ row }" slot="plRatio">
              <span :class="[getYield(row) > 0 ? 'green' : 'red']">
                {{ getYield(row).toFixed(2) }}%
              </span>
            </template>
            <!-- 持仓量 -->
            <template slot-scope="{ row }" slot="position">
              {{
                swapUnit === "USDT"
                  ? (row.volume * row.shareNumber * currentCoin.price).toFixed(
                      4
                    )
                  : swapUnit === unitSymbol
                  ? (row.volume * row.shareNumber).toFixed(4)
                  : row.volume
              }}
            </template>
            <!-- 可平量 -->
            <template slot-scope="{ row }" slot="avaPosition">
              {{
                swapUnit === "USDT"
                  ? (row.volume * row.shareNumber * currentCoin.price).toFixed(
                      4
                    )
                  : swapUnit === unitSymbol
                  ? (row.volume * row.shareNumber).toFixed(4)
                  : row.volume
              }}
            </template>
            <!-- 开仓均价 -->
            <template slot-scope="{ row }" slot="tradedPrice">
              {{ row.tradedPrice.toFixed(4) }}
            </template>
            <!-- 當前保證金 -->
            <template slot-scope="{ row }" slot="margin">
              {{ row.principalAmount.toFixed(4) }}
            </template>
            <!-- 手续费 -->
            <template slot-scope="{ row }" slot="openFee">
              {{ row.openFee.toFixed(5) }}
            </template>
            <!-- 預估強平價 -->
            <template slot-scope="{ row }" slot="mRatio">
              <span v-if="parrentBuySell0 && row.patterns === 'CROSSED'"
                >--</span
              >
              <span v-else>
                {{
                  getForcePrice(row) < 0 || !getForcePrice(row)
                    ? "--"
                    : getForcePrice(row)
                }}
              </span>
            </template>
            <!-- 操作 -->
            <template slot-scope="{ row, index }" slot="operate">
              <!-- 普通持倉 -->
              <Dropdown>
                <span style="cursor: pointer; color: #03C59E">
                  {{ $t("carouselItem.text251") }}
                  <Icon type="ios-arrow-down"></Icon>
                </span>
                <DropdownMenu slot="list">
                  <DropdownItem v-if="row.tradeType == 0"
                    ><span style="color: #03C59E" @click="handleTurn(row)">{{
                      $t("new.swap.reverse")
                    }}</span></DropdownItem
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
                  <!-- <DropdownItem v-if="row.tradeType != 2"
                          ><span
                            @click="handleAddPrincipalAmount(row)"
                            style="color: #03C59E"
                            >{{ $t("carouselItem.text15") }}</span
                          ></DropdownItem
                        > -->
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
          <!-- 跟单持仓 -->
          <Table
            height="500"
            v-if="selectedOrder === 'followPositions'"
            :columns="currentPosition.columns"
            :data="followPositionData"
            :no-data-text="$t('common.nodata')"
          >
            <!-- 類型 -->
            <template slot-scope="{ row, index }" slot="patterns">
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
            <template slot-scope="{ row, index }" slot="leverage">
              {{ row.leverage }}
            </template>
            <!-- 方向 -->
            <template slot-scope="{ row, index }" slot="direction">
              {{
                row.direction === "BUY"
                  ? $t("new.swap.buy")
                  : $t("new.swap.sell")
              }}
            </template>
            <!-- 止盈 -->
            <template slot-scope="{ row, index }" slot="triggerPriceWin">
              {{ row.triggerPriceWin === null ? "-" : row.triggerPriceWin }}
            </template>
            <!-- 止損 -->
            <template slot-scope="{ row, index }" slot="triggerPriceLose">
              {{ row.triggerPriceLose === null ? "-" : row.triggerPriceLose }}
            </template>
            <!-- 收益 -->
            <template slot-scope="{ row, index }" slot="pl">
              <span :class="[getIncome(row) > 0 ? 'green' : 'red']">
                <!-- 开多收益 (当前价格/成交均价 -1)*合约面值*张数*成交均价 -->
                {{ getIncome(row) }}
              </span>
            </template>
            <!-- 收益率 -->
            <template slot-scope="{ row, index }" slot="plRatio">
              <span :class="[getYield(row) > 0 ? 'green' : 'red']">
                <!-- 开多收益 (当前价格/成交均价 -1)*合约面值*张数*成交均价/保證金 -->
                {{ getYield(row) }}%
              </span>
            </template>
            <!-- 持仓量 -->
            <template slot-scope="{ row, index }" slot="position">
              <!-- 如果是usdt, 张数X面值X当前币价 -->
              {{
                swapUnit === "USDT"
                  ? (row.volume * row.shareNumber * currentCoin.price).toFixed(
                      4
                    )
                  : swapUnit === unitSymbol
                  ? (row.volume * row.shareNumber).toFixed(4)
                  : row.volume
              }}
            </template>
            <!-- 可平量 -->
            <template slot-scope="{ row, index }" slot="avaPosition">
              <!-- 如果是usdt, 张数X面值X当前币价 -->
              {{
                swapUnit === "USDT"
                  ? (row.volume * row.shareNumber * currentCoin.price).toFixed(
                      4
                    )
                  : swapUnit === unitSymbol
                  ? (row.volume * row.shareNumber).toFixed(4)
                  : row.volume
              }}
            </template>
            <!-- 开仓均价 -->
            <template slot-scope="{ row, index }" slot="tradedPrice">
              {{ row.tradedPrice }}
            </template>
            <!-- 當前保證金 -->
            <template slot-scope="{ row, index }" slot="margin">
              {{ row.principalAmount }}
            </template>
            <!-- 手续费 -->
            <template slot-scope="{ row, index }" slot="openFee">
              {{ row.openFee.toFixed(5) }}
            </template>
            <!-- 預估強平價 -->
            <template slot-scope="{ row, index }" slot="mRatio">
              <span v-if="parrentBuySell && row.patterns === 'CROSSED'"
                >--</span
              >
              <span v-else>
                <!-- 开多收益(多倉) = 开仓价*(1+(合约最低保证金率*保证金+平仓手续费-保证金)/(面值*张数))  平仓手续费=手續費率*張數*面值 -->
                {{
                  getForcePrice(row) < 0 || !getForcePrice(row)
                    ? "--"
                    : getForcePrice(row)
                }}
              </span>
            </template>
            <!-- 操作 -->
            <template slot-scope="{ row, index }" slot="operate">
              <Button
                size="small"
                type="text"
                style="color: #03C59E"
                @click="handleCloseQulick(row)"
                >{{ $t("new.swap.close") }}</Button
              >
            </template>
          </Table>
          <!-- 當前委托 -->
          <Table
            height="500"
            v-if="selectedOrder === 'currentEntrustOrders'"
            :columns="currentOrder.columns"
            :no-data-text="$t('common.nodata')"
            :data="currentEntrustOrderList"
          ></Table>
          <!-- 计划委托 -->
          <Table
            height="500"
            v-if="selectedOrder === 'planDelegationOrders'"
            :columns="spotOrder.columns"
            :no-data-text="$t('common.nodata')"
            :data="planDelegationList"
          ></Table>
          <!-- 歷史委託 -->
          <Table
            height="500"
            v-if="selectedOrder === 'historyEntrustOrders'"
            :columns="historyOrder.columns"
            :no-data-text="$t('common.nodata')"
            :data="historyEntrustOrderList"
          ></Table>
        </div>
        <div
          v-if="selectedOrder == 'historyEntrustOrders' && total > 10"
          style="text-align: center; width: 100%; padding:0 0 20px;background-color: #fff;"
        >
          <Page
            class="pages"
            :total="total"
            :current="pageNo"
            :page-size="pageSize"
            @on-change="pageChange"
          />
        </div>
      </div>
    </div>
    <!-- 弹出框: 設置止盈止損 -->
    <keep-alive>
      <profiLoss
        @profiLoss="profiLoss"
        @successprofiLoss="successprofiLoss"
        :price="price"
        :openOrCloseModal="openOrCloseModal"
        :rowData="rowData"
        :openMerge="openMerge"
      ></profiLoss>
    </keep-alive>
    <!-- 弹出框: 平倉 -->
    <keep-alive>
      <closeModal
        @profiLoss="profiLoss"
        :closeModals="closeModals"
        @successprofiLoss="successprofiLoss"
        :rowData="rowData"
        :income="income"
        :Yield="Yield"
        :price="price"
        :swapUnit="swapUnit"
        :unitSymbol="unitSymbol"
        :openMerge="openMerge"
      ></closeModal>
    </keep-alive>
    <!-- 弹出框: 追加保证金 -->
    <!-- <addmoney
      @profiLoss="profiLoss"
      :addPrincipalAmountModal="addPrincipalAmountModal"
      @successprofiLoss="successprofiLoss"
      :rowData="rowData"
    ></addmoney> -->
    <!-- 弹出框: 一件全平-->
    <keep-alive>
      <qulickCloseAll
        :contractCoinInfo="contractCoinInfo.id"
        :closeAll="closeAll"
        @profiLoss="profiLoss"
        @successprofiLoss="successprofiLoss"
      ></qulickCloseAll>
    </keep-alive>
    <!-- 弹出框: 闪电平仓-->
    <keep-alive>
      <qulickClose
        :rowData="rowData"
        :closeQulick="closeQulick"
        @profiLoss="profiLoss"
        @successprofiLoss="successprofiLoss"
      ></qulickClose>
    </keep-alive>
    <!-- 仓位合并弹窗 -->
    <keep-alive>
      <addtype
        :typeModal="typeModal"
        :currentList="joinPositionData"
        @changeTypeModal="changeTypeModal"
      ></addtype>
    </keep-alive>
  </div>
</template>
<script>
import qulickClose from "./qulickClose.vue";
import qulickCloseAll from "./qulickCloseAll.vue";
import profiLoss from "../../finance/components/profiLoss.vue";
import closeModal from "../../finance/components/closeModal.vue";
import addtype from ".//addtype.vue";
// import addmoney from "../finance/components/addmoney.vue";
var moment = require("moment");
export default {
  components: {
    qulickClose,
    qulickCloseAll,
    profiLoss,
    closeModal,
    addtype,
  },
  data() {
    let self = this;
    return {
      typeModal: false, //仓位合并
      historyEntrustOrderList: [],
      rowData: {}, // 当前条数据
      selectedOrder: "currentPositions", //当前显示的委托记录
      price: "", //价格
      income: "", //收益
      Yield: "", //收益率
      openOrCloseModal: false, //弹窗开关
      closeModals: false,
      closeAll: false, //一件全平
      closeQulick: false, //闪电平仓
      total: 0, //历史委托
      pageNo: 1,
      pageSize: 10,
      // 当前持仓 table 表頭
      currentPosition: {
        columns: [
          //倉位類型
          {
            title: self.$t("new.swap.type"),
            slot: "patterns",
          },
          //合約倍數
          {
            title: self.$t("swap.pos_leverage"),
            slot: "leverage",
          },
          //交易對
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          //方向
          {
            title: self.$t("swap.ent_direction"),
            slot: "direction",
          },
          //止盈
          {
            title: self.$t("new.swap.earning"),
            slot: "triggerPriceWin",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text283"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("new.swap.earning")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          //止損
          {
            title: self.$t("new.swap.loss"),
            slot: "triggerPriceLose",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text284"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("new.swap.loss")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          //收益
          {
            title: self.$t("swap.pos_Pl"),
            slot: "pl",
          },
          //收益率
          {
            title: self.$t("swap.pos_Ratio"),
            slot: "plRatio",
          },
          //持仓量
          {
            title: self.$t("swap.pos_pos"),
            slot: "position",
            minWidth: 40,
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text285"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("swap.pos_pos") + "(" + self.swapUnit + ")"
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          //可平量
          {
            title: self.$t("swap.pos_canClose"),
            slot: "avaPosition",
            minWidth: 40,
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text286"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("swap.pos_canClose") + "(" + self.swapUnit + ")"
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          // 開倉均價
          {
            title: self.$t("swap.pos_openPrice"),
            slot: "tradedPrice",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text287"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("swap.pos_openPrice")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          // 當前保證金
          {
            title: self.$t("swap.pos_margin"),
            slot: "margin",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text288"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("swap.pos_margin")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          {
            title: self.$t("uc.otcorder.fee"),
            slot: "openFee",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text289"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("uc.otcorder.fee")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          // 預估強平價
          {
            title: self.$t("new.swap.strongPrice"),
            slot: "mRatio",
            renderHeader: (h) => {
              return h(
                "Tooltip",
                {
                  props: {
                    content: self.$t("carouselItem.text290"),
                    placement: "top",
                    transfer: true,
                    maxWidth: 500,
                    style: {
                      zIndex: 1000,
                    },
                  },
                },
                [
                  h(
                    "span",
                    { style: { cursor: "pointer" } },
                    self.$t("new.swap.strongPrice")
                  ),
                  h("div", {
                    style: {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.54)", // 虚线样式
                      marginTop: "-5px", // 与文本的间距
                    },
                  }),
                ]
              );
            },
          },
          // 操作
          {
            title: self.$t("swap.action"),
            slot: "operate",
            align: "right",
            width: "140",
          },
        ],
      },
      currentOrder: {
        columns: [
          {
            title: self.$t("swap.time"),
            key: "createTime",
            render: (h, params) => {
              return h("span", {}, this.dateFormat(params.row.createTime));
            },
          },
          // 交易對
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          // 杠杆倍数
          {
            title: self.$t("new.swap.Leverage"),
            key: "leverage",
          },
          {
            title: self.$t("new.orders.positions"),
            key: "patterns",
            render: (h, params) => {
              if (params.row.patterns == "FIXED") {
                return h(
                  "span",
                  {},
                  this.openMerge == 1
                    ? this.$t("swap.marginMode1") +
                        "·" +
                        (params.row.jointType == 0
                          ? this.$t("dolphin.text184")
                          : this.$t("dolphin.text185"))
                    : this.$t("swap.marginMode1")
                );
              } else {
                return h(
                  "span",
                  {},
                  this.openMerge == 1
                    ? this.$t("swap.marginMode2") +
                        "·" +
                        (params.row.jointType == 0
                          ? this.$t("dolphin.text184")
                          : this.$t("dolphin.text185"))
                    : this.$t("swap.marginMode2")
                );
              }
            },
          },
          {
            title: self.$t("swap.ent_entrustType"),
            key: "entrustType",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                return h("span", {}, this.$t("swap.open"));
              } else {
                return h("span", {}, this.$t("swap.close"));
              }
            },
          },
          {
            title: self.$t("swap.ent_direction"),
            key: "direction",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.openup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.opendown")
                  );
                }
              } else {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.closeup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.closedown")
                  );
                }
              }
            },
          },
          {
            title: self.$t("swap.ent_type"),
            key: "type",
            render: (h, params) => {
              if (params.row.type == "LIMIT_PRICE") {
                return h("span", {}, this.$t("swap.limited_price"));
              } else if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("swap.market_price"));
              } else {
                return h("span", {}, this.$t("swap.spot_price"));
              }
            },
          },
          {
            title: self.$t("swap.ent_trigglePrice"),
            key: "trigglePrice",
            render: (h, params) => {
              if (params.row.triggerPrice) {
                return h("span", {}, params.row.triggerPrice.toFixed(2));
              } else {
                return h("span", {}, "--");
              }
            },
          },
          {
            title: self.$t("swap.ent_entrustPrice"),
            key: "entrustPrice",
            render: (h, params) => {
              if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("carouselItem.text49"));
              } else {
                return h("span", {}, params.row.entrustPrice.toFixed(2));
              }
            },
          },
          {
            title: self.$t("swap.ent_tradedPrice"),
            key: "tradedPrice",
            render: (h, params) => {
              return h("span", {}, params.row.tradedPrice);
            },
          },
          {
            title: self.$t("swap.ent_margin"),
            key: "principalAmount",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.principalAmount.toFixed(2) + "USDT"
              );
            },
          },
          {
            title: self.$t("swap.ent_volume"),
            key: "volume",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.volume + this.$t("swap.shareNumber")
              );
            },
          },
          {
            title: self.$t("swap.ent_status"),
            key: "status",
            render: (h, params) => {
              if (params.row.status == "ENTRUST_ING") {
                return h("span", {}, this.$t("swap.ent_status1"));
              } else if (params.row.status == "ENTRUST_CANCEL") {
                return h("span", {}, this.$t("swap.ent_status2"));
              } else if (params.row.status == "ENTRUST_FAILURE") {
                return h("span", {}, this.$t("swap.ent_status3"));
              } else if (params.row.status == "ENTRUST_SUCCESS") {
                return h("span", {}, this.$t("swap.ent_status4"));
              } else {
              }
            },
          },
          {
            title: self.$t("swap.action"),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    size: "small",
                  },
                  style: {
                    color: "#f1ac19",
                    "line-height": "1.2",
                    backgroundColor: "transparent",
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.id, "0");
                    },
                  },
                },
                self.$t("swap.undo")
              );
            },
          },
        ],
        rows: [],
      },
      spotOrder: {
        columns: [
          {
            title: self.$t("swap.time"),
            key: "createTime",
            render: (h, params) => {
              return h("span", {}, this.dateFormat(params.row.createTime));
            },
          },
          // 交易對
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          // 杠杆倍数
          {
            title: self.$t("new.swap.Leverage"),
            key: "leverage",
          },
          {
            title: self.$t("new.orders.positions"),
            key: "patterns",
            render: (h, params) => {
              if (params.row.patterns == "FIXED") {
                return h(
                  "span",
                  {},
                  this.openMerge == 1
                    ? this.$t("swap.marginMode1") +
                        "·" +
                        (params.row.jointType == 0
                          ? this.$t("dolphin.text184")
                          : this.$t("dolphin.text185"))
                    : this.$t("swap.marginMode1")
                );
              } else {
                return h(
                  "span",
                  {},
                  this.openMerge == 1
                    ? this.$t("swap.marginMode2") +
                        "·" +
                        (params.row.jointType == 0
                          ? this.$t("dolphin.text184")
                          : this.$t("dolphin.text185"))
                    : this.$t("swap.marginMode2")
                );
              }
            },
          },
          {
            title: self.$t("swap.ent_entrustType"),
            key: "entrustType",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                return h("span", {}, this.$t("swap.open"));
              } else {
                return h("span", {}, this.$t("swap.close"));
              }
            },
          },
          {
            title: self.$t("swap.ent_direction"),
            key: "direction",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.openup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.opendown")
                  );
                }
              } else {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.closeup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.closedown")
                  );
                }
              }
            },
          },
          {
            title: self.$t("carouselItem.text262"),
            key: "type",
            render: (h, params) => {
              if (params.row.type == "LIMIT_SPOT_LIMIT") {
                return h("span", {}, this.$t("exchange.limited_price"));
              } else {
                return h("span", {}, this.$t("exchange.market_price"));
              }
            },
          },
          {
            title: self.$t("swap.ent_trigglePrice"),
            key: "triggerPrice",
          },
          {
            title: self.$t("swap.ent_entrustPrice"),
            key: "entrustPrice",
            render: (h, params) => {
              if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("carouselItem.text49"));
              } else {
                return h("span", {}, params.row.entrustPrice.toFixed(2));
              }
            },
          },
          {
            title: self.$t("swap.ent_tradedPrice"),
            key: "tradedPrice",
            render: (h, params) => {
              return h("span", {}, params.row.tradedPrice);
            },
          },
          {
            title: self.$t("swap.ent_margin"),
            key: "principalAmount",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.principalAmount.toFixed(2) + "USDT"
              );
            },
          },
          {
            title: self.$t("swap.ent_volume"),
            key: "volume",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.volume + this.$t("swap.shareNumber")
              );
            },
          },
          {
            title: self.$t("swap.ent_status"),
            key: "status",
            render: (h, params) => {
              if (params.row.status == "ENTRUST_ING") {
                return h("span", {}, this.$t("swap.ent_status1"));
              } else if (params.row.status == "ENTRUST_CANCEL") {
                return h("span", {}, this.$t("swap.ent_status2"));
              } else if (params.row.status == "ENTRUST_FAILURE") {
                return h("span", {}, this.$t("swap.ent_status3"));
              } else if (params.row.status == "ENTRUST_SUCCESS") {
                return h("span", {}, this.$t("swap.ent_status4"));
              } else {
              }
            },
          },
          {
            title: self.$t("swap.action"),
            key: "operate",
            width: 110,
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    size: "small",
                  },
                  style: {
                    color: "#f1ac19",
                    "line-height": "1.2",
                    backgroundColor: "transparent",
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row.id, "1");
                    },
                  },
                },
                self.$t("swap.undo")
              );
            },
          },
        ],
        rows: [],
      },
      historyOrder: {
        columns: [
          {
            title: self.$t("swap.time"),
            key: "createTime",
            render: (h, params) => {
              return h("span", {}, this.dateFormat(params.row.createTime));
            },
          },
          // 交易對
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          // 杠杆倍数
          {
            title: self.$t("carouselItem.text39"),
            key: "leverage",
          },
          {
            title: self.$t("carouselItem.text40"),
            key: "patterns",
            render: (h, params) => {
              if (params.row.patterns == "FIXED") {
                return h(
                  "span",
                  {},
                  self.openMerge == 1
                    ? self.$t("swap.marginMode1") +
                        "·" +
                        (params.row.jointType == 0
                          ? self.$t("dolphin.text184")
                          : self.$t("dolphin.text185"))
                    : self.$t("swap.marginMode1")
                );
              } else {
                return h(
                  "span",
                  {},
                  self.openMerge == 1
                    ? self.$t("swap.marginMode2") +
                        "·" +
                        (params.row.jointType == 0
                          ? self.$t("dolphin.text184")
                          : self.$t("dolphin.text185"))
                    : self.$t("swap.marginMode2")
                );
              }
            },
          },
          {
            title: self.$t("swap.ent_entrustType"),
            key: "entrustType",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                return h("span", {}, this.$t("swap.open"));
              } else {
                return h("span", {}, this.$t("swap.close"));
              }
            },
          },
          {
            title: self.$t("swap.ent_direction"),
            key: "direction",
            render: (h, params) => {
              if (params.row.entrustType == "OPEN") {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.openup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.opendown")
                  );
                }
              } else {
                if (params.row.direction == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("swap.closeup")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("swap.closedown")
                  );
                }
              }
            },
          },
          {
            title: self.$t("swap.ent_type"),
            key: "type",
            render: (h, params) => {
              if (params.row.isFromSpot == 1) {
                return h("span", {}, this.$t("swap.spot_price"));
              }
              if (params.row.type == "LIMIT_PRICE") {
                return h("span", {}, this.$t("swap.limited_price"));
              } else if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("swap.market_price"));
              } else if (params.row.type == "MARKET_SPOT_LIMIT") {
                return h("span", {}, this.$t("swap.market_price"));
              } else if (params.row.type == "LIMIT_SPOT_LIMIT") {
                return h("span", {}, this.$t("swap.limited_price"));
              }
            },
          },
          {
            title: self.$t("swap.ent_trigglePrice"),
            key: "trigglePrice",
            render: (h, params) => {
              if (params.row.isFromSpot == 1) {
                return h("span", {}, params.row.triggerPrice.toFixed(2));
              }
              if (params.row.triggerPrice > 0) {
                return h("span", {}, params.row.triggerPrice.toFixed(2));
              } else {
                return h("span", {}, "--");
              }
            },
          },
          {
            title: self.$t("swap.ent_entrustPrice"),
            key: "entrustPrice",
            render: (h, params) => {
              if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("carouselItem.text49"));
              } else if (params.row.type == "MARKET_SPOT_LIMIT") {
                return h("span", {}, this.$t("carouselItem.text49"));
              } else {
                return h("span", {}, params.row.entrustPrice.toFixed(2));
              }
            },
          },
          {
            title: self.$t("swap.ent_tradedPrice"),
            key: "tradedPrice",
            render: (h, params) => {
              return h("span", {}, params.row.tradedPrice.toFixed(2));
            },
          },
          {
            title: self.$t("swap.ent_margin"),
            key: "principalAmount",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.principalAmount.toFixed(2) + "USDT"
              );
            },
          },
          {
            title: self.$t("swap.ent_volume"),
            key: "volume",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.volume + this.$t("swap.shareNumber")
              );
            },
          },
          {
            title: self.$t("swap.ent_fee"),
            key: "volume",
            render: (h, params) => {
              if (params.row.status != "ENTRUST_CANCEL") {
                if (params.row.entrustType == "OPEN") {
                  return h("span", {}, params.row.openFee.toFixed(5));
                }
                if (params.row.entrustType == "CLOSE") {
                  return h("span", {}, params.row.closeFee.toFixed(5));
                }
              } else {
                return h("span", {}, "--");
              }
            },
          },
          {
            title: self.$t("swap.ent_pl"),
            key: "profitAndLoss",
            render: (h, params) => {
              if (params.row.entrustType == "CLOSE") {
                if (params.row.profitAndLoss < 0) {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    params.row.profitAndLoss.toFixed(4)
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    params.row.profitAndLoss.toFixed(4)
                  );
                }
              } else {
                return h("span", {}, "--");
              }
            },
          },
          {
            title: self.$t("swap.ent_status"),
            key: "volume",
            render: (h, params) => {
              if (params.row.isBlast == 1) {
                return h("span", {}, this.$t("swap.ent_statusblast"));
              }
              if (params.row.status == "ENTRUST_CANCEL") {
                return h("span", {}, this.$t("swap.ent_status2"));
              } else if (params.row.status == "ENTRUST_FAILURE") {
                return h("span", {}, this.$t("swap.ent_status3"));
              } else if (params.row.status == "ENTRUST_SUCCESS") {
                return h("span", {}, this.$t("swap.ent_status4"));
              }
            },
          },
        ],
        rows: [],
      },
    };
  },
  props: {
    positionData: [Object, Array],
    followPositionData: [Object, Array],
    currentEntrustOrderList: [Object, Array],
    planDelegationList: [Object, Array],
    contractCoinInfo: [Object, Array],
    joinPositionData: [Object, Array],
    openMerge: [Number, String],
    swapUnit: String,
    unitSymbol: String,
    allLists: [Object, Array],
    pageInfo: [Object, Array],
    currentCoin: [Object, Array],
    parrentBuySell0: Boolean,
    parrentBuySell: Boolean,
    openType1: String,
    openType: String,
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    // 未实现盈亏
    profitAndLoss: function() {
      if (!this.isLogin || this.contractWalletInfo == null) {
        return 0;
      }
      let a = 0;
      if (this.positionData.length != 0) {
        this.positionData.map((item, index) => {
          a += this.getIncome(item);
        });
        return a;
      } else {
        return 0;
      }
    },
    // 和分仓
    is_open() {
      return this.joinPositionData.some((item) => item.jointType == 1);
    },
  },
  watch: {
    lang: function() {
      this.updateLangData();
    },
  },
  // created: function() {
  //   this.init();
  // },
  methods: {
    // init() {
    //   this.getRuleList();
    // },
    changeOrder(str) {
      this.selectedOrder = str;
      this.total = 0;
      this.pageNo = 1;
      this.pageSize = 10;
      if (str === "historyEntrustOrders") {
        this.getHistoryEntrustOrders();
      }
    },
    updateLangData() {
      this.trade.columns[0].title = this.$t("swap.num");
      this.trade.columns[1].title = this.$t("swap.price");
      this.trade.columns[2].title = this.$t("swap.time");

      this.plate.columns[0].title = this.$t("swap.stall");
      this.plate.columns[1].title = this.$t("swap.price");
      this.plate.columns[2].title = this.$t("swap.num");
      this.plate.columns[3].title = this.$t("swap.total");

      this.currentOrder.columns[1].title = this.$t("swap.time");
      this.currentOrder.columns[2].title = this.$t("swap.symbol");
      this.currentOrder.columns[3].title = this.$t("swap.type");
      this.currentOrder.columns[4].title = this.$t("swap.direction");
      this.currentOrder.columns[5].title = this.$t("swap.price");
      this.currentOrder.columns[6].title = this.$t("swap.num");
      this.currentOrder.columns[7].title = this.$t("swap.traded");
      this.currentOrder.columns[8].title = this.$t("swap.dealamount");
      this.currentOrder.columns[9].title = this.$t("swap.action");

      this.historyOrder.columns[1].title = this.$t("swap.time");
      this.historyOrder.columns[2].title = this.$t("swap.symbol");
      this.historyOrder.columns[3].title = this.$t("swap.type");
      this.historyOrder.columns[4].title = this.$t("swap.direction");
      this.historyOrder.columns[5].title = this.$t("swap.price");
      this.historyOrder.columns[6].title = this.$t("swap.num");
      this.historyOrder.columns[7].title = this.$t("swap.done");
      this.historyOrder.columns[8].title = this.$t("swap.dealamount");
      this.historyOrder.columns[9].title = this.$t("swap.status");
    },
    // 获取合约不同杠杆下合约最低保证金率
    // getRuleList() {
    //   this.$http
    //     .get(this.host + this.api.finance.getRuleMarginRate, {
    //       params: {
    //         contractId: this.contractCoinInfo.id,
    //       },
    //     })
    //     .then((res) => {
    //       this.allList = res.data.data;
    //     });
    // },
    // 强平价
    getForcePrice(item) {
      var MarginRate = this.getMaintenanceMarginRate(
        this.allLists,
        item.leverage
      );
      if (item.direction === "BUY") {
        // if(patterns == "FIXED") 逐仓那个
        // if(patterns == "CROSSED") 全仓那个
        if (item.patterns == "CROSSED") {
          return this.buyAllForcePrice(
            item.tradedPrice,
            MarginRate,
            item.principalAmount,
            this.pageInfo.usdtBalance,
            // this.profitAndLoss,
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
            this.pageInfo.usdtBalance,
            // this.profitAndLoss,
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
      var price = this.currentCoin.price;
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
    // 一键全平
    swapOrdercloseAll() {
      this.closeAll = true;
    },
    // 闪电平仓
    handleCloseQulick(row) {
      this.rowData = row;
      this.closeQulick = true;
    },
    // 关闭弹窗
    profiLoss(e) {
      this.closeAll = e;
      this.closeQulick = e;
      this.closeModals = e;
      this.openOrCloseModal = e;
    },
    // 成功回调
    successprofiLoss(e) {
      this.closeAll = e;
      this.closeQulick = e;
      this.closeModals = e;
      this.openOrCloseModal = e;
      // this.getMemberContractWallet();
    },
    // 当前持仓 操作2 打開平倉彈窗
    handleCloseModal(row) {
      this.rowData = row;
      this.income = this.getIncome(row);
      this.Yield = this.getYield(row);
      this.price = this.currentCoin.price;
      this.closeModals = true;
    },
    // 当前持仓 操作3 打開置逐仓订单止盈止损弹窗
    handleOpenOrCloseModal(row) {
      this.rowData = row;
      this.openOrCloseModal = true;
      this.price = this.currentCoin.price;
    },
    // 当前持仓 操作1 一鍵反向
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
            entrustPrice: row.currentPrice || "",
            leverageSell: row.leverage,
            leverageBuy: row.leverage,
            direction: row.direction === "BUY" ? "SELL" : "BUY",
            openType: row.patterns === "CROSSED" ? "0" : "1",
            // crossed(全倉) 就是市價 如果是F(逐倉)就是 限价
            type: row.patterns === "CROSSED" ? "MARKET_PRICE" : row.type, // 价格类型 MARKET_PRICE:市价  LIMIT_PRICE:限价
            // btype: "-1",
            // jointType: 0：合仓 1：分成
            jointType: this.openMerge == 1 ? this.openType1 : this.openType,
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
                // setTimeout(() => {
                //   this.getMemberContractWallet();
                // }, 1000);
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
    // 历史委托
    getHistoryEntrustOrders() {
      if (!this.isLogin) return;
      let params = {
        contractCoinId: this.contractCoinInfo.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      this.$http
        .post(this.host + this.api.swap.getHistoryEntrustList, params)
        .then((response) => {
          var resp = response.body;
          if (this.selectedOrder == "historyEntrustOrders") {
            this.total = resp.totalElements;
          }
          this.historyEntrustOrderList = resp.content;
        });
    },
    // 撤单
    cancel(eid, num) {
      var that = this;
      this.$Modal.confirm({
        title: this.$t("carouselItem.text46"),
        content: this.$t("swap.undotip"),
        okText: this.$t("common.ok"), // 确定按钮的多语言文本
        cancelText: this.$t("common.close"),
        onOk: () => {
          if (num == "0") {
            let params = {
              entrustId: eid,
            };
            this.$http
              .post(this.host + this.api.swap.cancel, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("swap.tip"),
                    desc: this.$t("swap.cancelsuccess"),
                  });
                  // if ((this.pageNo - 1) * 10 + 1 == this.total) {
                  //   this.pageNo -= 1;
                  //   this.getMemberContractWallet();
                  // } else {
                  //   setTimeout(function() {
                  //     that.getMemberContractWallet();
                  //   }, 1000);
                  // }
                } else {
                  this.$Notice.error({
                    title: this.$t("swap.tip"),
                    desc: resp.message,
                  });
                }
              });
          } else if (num == "1") {
            let params = {
              orderId: eid,
            };
            this.$http
              .post(this.host + this.api.swap.cancelSpotOrder, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("swap.tip"),
                    desc: this.$t("swap.cancelsuccess"),
                  });
                  // if ((this.pageNo - 1) * 10 + 1 == this.total) {
                  //   this.pageNo -= 1;
                  //   this.getMemberContractWallet();
                  // } else {
                  //   setTimeout(function() {
                  //     that.getMemberContractWallet();
                  //   }, 1000);
                  // }
                } else {
                  this.$Notice.error({
                    title: this.$t("swap.tip"),
                    desc: resp.message,
                  });
                }
              });
          }
        },
      });
    },
    // 仓位合并弹窗
    changeTypeModal(e) {
      if (this.is_open) {
        this.typeModal = e;
      } else {
        this.$Notice.error({
          title: this.$t("swap.tip"),
          desc: "暂无可合并仓位",
        });
      }
    },
    // 分页
    pageChange(page) {
      this.pageNo = page;
      if (this.selectedOrder == "historyEntrustOrders") {
        this.getHistoryEntrustOrders();
      }
    },
    timeFormat: function(tick) {
      return moment(tick).format("HH:mm:ss");
    },
    dateFormat: function(tick) {
      return moment(tick).format("MM-DD HH:mm:ss");
    },
  },
};
</script>
<style lang="less">
.order {
  margin-top: 3px;
  margin-right: 2px;
  min-height: 532px;
  color: #666666;
  overflow: hidden;
  background-color: #fff;
  .order-handler {
    background-color: #fff;
    font-size: 0;
    z-index: 9;
    > span {
      padding: 0 20px;
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      line-height: 30px;
      color: #1d1c1c;
      background-color: #ffffff;

      &.active {
        color: #03c59e;
        background-color: #ffffff;
        border-bottom: 2px solid #03c59e;
      }

      &:first-child {
        border-top-left-radius: 0px;
      }

      &:last-child {
        border-top-right-radius: 0px;
      }
    }
  }

  .table_box {
    width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 20%;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }

    .table {
      width: 200%;
    }
  }
}
</style>
