<template>
  <div>
    <div class="center_top">
      <!-- 盘口：卖 -->
      <div class="sell">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div class="handlers">
            <span
              @click="changePlate('all')"
              class="handler handler-all"
              :class="{ active: selectedPlate == 'all' }"
            ></span>
            <span
              @click="changePlate('buy')"
              class="handler handler-green"
              :class="{ active: selectedPlate == 'buy' }"
            ></span>
            <span
              @click="changePlate('sell')"
              class="handler handler-red"
              :class="{ active: selectedPlate == 'sell' }"
            ></span>
          </div>
          <Select v-model="select_deepval" size="small" style="width:100px;margin-right: 10px">
            <Option
              v-for="(item, index) in select_type"
              :key="index"
              :value="item"
              >{{ item }}</Option
            >
          </Select>
        </div>
      </div>
      <!-- 盘口：买 -->
      <div class="buy">
        <Table
          v-show="selectedPlate != 'buy'"
          @on-current-change="buyPlate"
          disabled-hover
          ref="currentRowTable"
          class="sell_table"
          :columns="plate.columns"
          :data="dataList0"
          :no-data-text="$t('common.nodata')"
        ></Table>
        <div class="plate-nowprice">
          <!-- 第二个当前价格 -->
          <span
            class="price"
            :class="{
              buy: baseTitle.change > 0,
              sell: baseTitle.change < 0,
            }"
            >{{ getFixed(baseTitle.price) }}</span
          >
          <span v-if="baseTitle.change > 0" class="buy">↑</span>
          <span v-else-if="baseTitle.change < 0" class="sell">↓</span>
          <span class="price-cny">
            ≈ {{ pricingStatus
            }}{{ (baseTitle.price * CNYRate) | toFixed(2) }}</span
          >
        </div>
        <Table
          v-show="selectedPlate != 'sell'"
          @on-current-change="sellPlate"
          disabled-hover
          class="buy_table"
          :class="{ hidden: selectedPlate === 'all' }"
          :columns="plate.columns"
          :data="dataList1"
          :no-data-text="$t('common.nodata')"
        ></Table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 计价方式
      pricingStatus: localStorage.getItem("pricingStatus"),
      form: {
        trigglePrice: "",
        entrustPrice: "",
        volume: "",
        triggerPrice: 0,
      },
      select_deepval: "",
      plate: {
        maxPostion: 7,
        columns: [
          {
            title: this.$t("swap.price"),
            key: "price",
            render: (h, params) => {
              let str = "";
              let price = "";
              const className = params.row.direction.toLowerCase();
              params.row.price == 0 && (str = h("span", {}, "--"));
              params.row.price != 0 &&
                (price = params.row.price.toFixed(this.select_deep)) &&
                (str = h(
                  "span",
                  {
                    attrs: {
                      class: className,
                    },
                    style: { fontSize: "12px" },
                  },
                  price
                ));
              return str;
            },
            renderHeader: (h, params) => {
              const title =
                this.$t("swap.price") + "(" + this.baseTitle.base + ")";
              return h(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    fontWeigh: "400",
                    color: "rgba(0,0,0,0.54)",
                  },
                },
                title
              );
            },
          },
          {
            title: this.$t("swap.num"),
            key: "amount",
            render: (h, params) => {
              let str = "";
              params.row.amount == 0 && (str = h("span", {}, "--"));
              params.row.amount != 0 &&
                (str = h(
                  "span",
                  {
                    style: {
                      fontSize: "12px",
                      color: "rgba(0,0,0,0.87)",
                      fontWeight: "700",
                    },
                  },
                  params.row.amount.toFixed(4)
                ));
              return str;
            },
            renderHeader: (h, params) => {
              const title =
                this.$t("swap.num") + "(" + this.baseTitle.coin + ")";
              return h(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    fontWeigh: "400",
                    color: "rgba(0,0,0,0.54)",
                  },
                },
                title
              );
            },
          },
          {
            title: this.$t("swap.total"),
            key: "totalAmount",
            render: (h, params) => {
              if (params.row.price == 0 || params.row.totalAmount == 0) {
                return h("span", { style: { fontSize: "12px" } }, "--");
              } else {
                return h(
                  "span",
                  {
                    style: {
                      fontSize: "12px",
                      color: "rgba(0,0,0,0.87)",
                      fontWeight: "700",
                    },
                  },
                  params.row.totalAmount.toFixed(4)
                );
              }
            },
            renderHeader: (h, params) => {
              const title =
                this.$t("swap.total") + "(" + this.baseTitle.coin + ")";
              return h(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    fontWeigh: "400",
                    color: "rgba(0,0,0,0.54)",
                  },
                },
                title
              );
            },
          },
          {
            className: "percenttd",
            width: 1,
            render: (h, params) => {
              let width = "0",
                backgroundColor =
                  params.row.direction === "BUY" ? "#82e7d3" : "#f18190",
                totle =
                  params.row.direction === "BUY"
                    ? this.bidTotle
                    : this.askTotle;
              width = params.row.totalAmount
                ? `${((params.row.totalAmount / totle) * 100).toFixed(2)}%`
                : "0%";
              return h(
                "div",
                {
                  style: {
                    width,
                    backgroundColor,
                    transition: "width 0.5s ease-in-out",
                    fontSize: "12px",
                    height: "100%",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    opacity: 0.3,
                  },
                  attrs: {
                    class: "percentdiv",
                  },
                },
                " "
              );
            },
          },
        ],
      },
    };
  },
  props: {
    dataList0: [Object, Array],
    dataList1: [Object, Array],
    baseTitle: [Object, Array],
    CNYRate: Number,
    selectedPlate: String,
    bidTotle: Number,
    askTotle: Number,
    select_type: Array,
  },
  watch: {
    select_type(newval) {
      this.select_deepval = newval[0];
    },
  },
  computed: {
    select_deep() {
      return this.countDecimalPlaces(this.select_deepval);
    },
  },
  mounted() {},
  methods: {
    changePlate(str) {
      this.$emit("changePlate", str);
    },
    buyPlate(currentRow) {
      this.form.entrustPrice = currentRow.price;
    },
    sellPlate(currentRow) {
      this.form.entrustPrice = currentRow.price;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../../assets/css/swap.css";
.center_top {
  height: 383px;
  background-color: #ffffff;
  color: #7a98f7;
  .sell {
    .handlers {
      font-size: 0;
      padding: 10px 8px;
      background-color: #ffffff;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      .handler {
        display: inline-block;
        margin-right: 10px;
        width: 17px;
        height: 16px;
        background-size: 100% 100%;
        cursor: pointer;
        &.handler-all {
          background-image: url("../../../assets/images/exchange/plate_all.png");
          opacity: 0.3;
          &.active {
            opacity: 1;
          }
        }
        &.handler-green {
          background-image: url("../../../assets/images/exchange/plate_green.png");
          opacity: 0.3;
          &.active {
            opacity: 1;
          }
        }
        &.handler-red {
          background-image: url("../../../assets/images/exchange/plate_red.png");
          opacity: 0.3;
          &.active {
            opacity: 1;
          }
        }
      }
    }
  }
  .buy {
    .plate-nowprice {
      background-color: #ffffff;
      line-height: 1;
      display: flex;
      align-items: center;
      height: 40px;
      margin-left: 16px;
      font-weight: 700;
      font-size: 18px;
      .price {
        font-size: 18px;
        margin-right: 10px;
        font-weight: 400;
      }
      .price-cny {
        margin-left: 10px;
        font-weight: 700;
        font-size: 9px;
        color: rgba(0, 0, 0, 0.54);
      }
    }
  }
}
.select_deep {
  width: 62px;
  height: 20px;
  border-radius: 3px 3px 3px 3px;
  border: 1px solid #f8f8f8;
  margin-right: 10px;
}
</style>
