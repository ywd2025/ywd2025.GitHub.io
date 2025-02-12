<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="
          display: flex;
          height: 100%;
          flex-grow: 1;
          flex-direction: column;
        "
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.orders.spotOrders") }}</div>
            <h1 class="now_title">{{ $t("new.orders.historicalMandates") }}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="search_part">
            <div class="search_left">
              <Select
                v-for="(searchItem, index) in searchItems"
                v-model="searchData[searchItem.value]"
                :key="index"
                :placeholder="searchItem.placeholder"
                style="width: 128px; margin-right: 8px"
                size="small"
              >
                <Option
                  v-for="item in searchItem.itemOption"
                  :value="item.label"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
              <Button type="primary" size="small" @click="handleSearch">{{
                $t("new.universal.query")
              }}</Button>
              <Button type="primary" size="small" @click="handleReset">{{
                $t("new.universal.reset")
              }}</Button>
            </div>
            <!-- <div class="search_right">
              <Button type="primary" size="small">全部撤單</Button>
            </div> -->
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')"></Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- 分页 -->
            <div class="block" style="text-align: center; margin-top: 20px">
              <Page
                @on-change="handleCurrentChange"
                :page-size="10"
                :current="currentPage"
                :total="total"
                size="small"
              >
              </Page>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {},
      searchItems: [
        {
          value: "symbol",
          placeholder: this.$t("new.orders.allTrading"),
          itemOption: [],
        },
      ],
      columns: [
        // #
        {
          type: "index",
          width: 50,
          align: "center",
          render: (h, params) => {
            return h(expandRow, {
              props: {
                skin: params.row.skin,
                rows: params.row.detail,
              },
            });
          },
        },
        // 時間
        {
          title: this.$t("exchange.time"),
          key: "time",
          align: "center",
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.time));
          },
        },
        // 交易對
        {
          title: this.$t("exchange.symbol"),
          key: "symbol",
          align: "center",
        },
        // 類型
        {
          title: this.$t("exchange.type"),
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.row.type === "LIMIT_PRICE"
                ? this.$t("exchange.limited_price")
                : this.$t("exchange.market_price")
            );
          },
        },
        // 方向
        {
          title: this.$t("exchange.direction"),
          key: "direction",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const className = row.direction == "BUY" ? "green" : "red";
            return h(
              "span",
              {
                attrs: {
                  class: className,
                },
              },
              row.direction == "BUY"
                ? this.$t("exchange.buyin")
                : this.$t("exchange.sellout")
            );
          },
        },
        // 價格
        {
          title: this.$t("exchange.price"),
          key: "price",
          align: "center",
          render: (h, params) => {
            const status = params.row.status;
            if (params.row.price != 0) {
              return h("span", this.toFloor(params.row.price.toFixed(4)));
            } else {
              return h("span", this.$t("carouselItem.text49"));
            }
          },
        },
        // 數量
        {
          title: this.$t("exchange.num") + "/" + this.$t("exchange.amount"),
          key: "amount",
          align: "center",
          render: (h, params) => {
            if (params.row.type === "MARKET_PRICE" && params.row.direction == "BUY") {
              return [
                h("span", this.toFloor(params.row.amount)),
                h(
                  "span",
                  {
                    style: {
                      color: "#03C59E",
                      marginLeft: "5px",
                    },
                  },
                  "USDT"
                ),
              ];
            } else {
              return [
                h("span", this.toFloor(params.row.amount)),
                h(
                  "span",
                  {
                    style: {
                      color: "#03C59E",
                      marginLeft: "5px",
                    },
                  },
                  params.row.coinSymbol
                ),
              ];
            }
          },
        },
        // 已成交
        {
          title: this.$t("exchange.done"),
          key: "tradedAmount",
          align: "center",
          render: (h, params) => {
            if (params.row.tradedAmount > 0) {
              return h("span", this.toFloor(params.row.tradedAmount));
            } else if(params.row.status == "CANCELED" && params.row.tradedAmount == 0) {
              return h(
                "span",
                {
                  style: {
                    color: "#FF0000",
                  },
                },
                this.$t("exchange.canceled")
              );
            }else{
              return h(
                "span",
                {
                  style: {
                    color: "#03C59E",
                  },
                },
                this.$t("carouselItem.text159")
              );
            }
          },
        },
        // 成交金額
        {
          title: this.$t("exchange.dealamount") + "(USDT)",
          key: "turnover",
          align: "center",
          render: (h, params) => {
            if (params.row.turnover > 0) {
              return h("span", this.toFloor(params.row.turnover));
            }else if(params.row.status == "CANCELED" && params.row.turnover == 0) {
              return h(
                "span",
                this.$t("exchange.canceled")
              );
            } else {
              return h("span", this.$t("carouselItem.text159"));
            }
          },
        },
        // 狀態
        {
          title: this.$t("exchange.status"),
          key: "status",
          align: "center",
          render: (h, params) => {
            const status = params.row.status;
            if (status == "COMPLETED") {
              return h(
                "span",
                {
                  style: {
                    color: "#03C59E",
                  },
                },
                this.$t("exchange.finished")
              );
            } else if (status == "CANCELED") {
              return h(
                "span",
                {
                  style: {
                    color: "#FF0000",
                  },
                },
                this.$t("exchange.canceled")
              );
            } else {
              return h("span",this.$t("carouselItem.text159"));
            }
          },
        },
      ],
      data: [],
      //加载中按钮
      spinShow: false,
      //分頁
      //当前页
      pageNo: 1,
      //每页信息个数
      pageSize: 10,
      //总信息数
      total: 0,
      //调转页码
      currentPage: 1,
      // 查詢
      symbol: null,
    };
  },
  filters: {
    dateFormat: function (tick) {
      return moment(tick).format("MM-DD HH:mm");
    },
  },
  mounted() {
    this.getCoins();
    this.getHistoryOrder(1);
  },
  methods: {
    getCoins() {
      this.$http.post(this.host + this.api.swap.thumb, {}).then((res) => {
        res.data.forEach((item) => {
          const searchObj = {};
          searchObj.value = item.symbol;
          searchObj.label = item.symbol;
          this.searchItems[0].itemOption.push(searchObj);
        });
      });
    },
    getHistoryOrder(pageNo, symbol = "") {
      this.spinShow = true;
      let params = {
        pageNo,
        symbol,
        pageSize: 10,
      };
      this.$http
        .post(this.host + this.api.exchange.history, params)
        .then((response) => {
          const res = response.data;
          this.data = res.content;
          this.spinShow = false;
          if (pageNo == 1) {
            this.pageSize = res.size;
            this.total = res.totalElements;
          }
        });
    },
    // 查詢
    handleSearch() {
      console.log(this.searchData);
      this.getHistoryOrder(1, this.searchData.symbol);
    },
    // 重置
    handleReset() {
      this.searchData = {};
      this.getHistoryOrder(1);
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHistoryOrder(this.currentPage, this.searchData.symbol);
    },
  },
};
</script>

<style lang="less" scoped>
.order_right_content {
  height: 100%;
  position: relative;
  .title_part {
    padding: 24px;
    font-weight: 500;
    border-bottom: 1px solid #eeeeee;
    .now_title {
      font-weight: 400;
    }
  }
  .table_all {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    overflow-y: scroll;
    .search_part {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 0;
    }
    .table_part {
      margin-top: 8px;
      padding: 0 24px 60px;
    }
  }
}
/deep/ .red {
  color: #F6465D;
}
/deep/ .green {
  color: #03C59E;
}
</style>
