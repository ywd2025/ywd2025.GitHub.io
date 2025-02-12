<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.orders.spotOrders") }}</div>
            <h1 class="now_title">{{ $t("new.orders.currentMandate") }}</h1>
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
                style="width:128px;margin-right: 8px;"
                size="small"
              >
                <Option
                  v-for="item in searchItem.itemOption"
                  :value="item.value"
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
            <div class="block" style="text-align: center;margin-top: 20px;">
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
        {
          value: "direction",
          placeholder: this.$t("new.orders.direction"),
          itemOption: [
            {
              value: "BUY",
              label: this.$t("new.orders.buy"),
            },
            {
              value: "SELL",
              label: this.$t("new.orders.sell"),
            },
          ],
        },
      ],
      columns: [
        // #
        {
          type: "index",
          width: 50,
          align:"center",
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
          align:"center",
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.time));
          },
        },
        // 交易對
        {
          title: this.$t("exchange.symbol"),
          key: "symbol",
          align:"center",
        },
        // 類型
        {
          title: this.$t("exchange.type"),
          align:"center",
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
          align:"center",
          render: (h, params) => {
            const row = params.row;
            const className = row.direction == "BUY" ? 'green' : 'red';
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
          align:"center",
          render: (h, params) => {
            if (params.row.type == "MARKET_PRICE") {
                return h("span", {}, this.$t("carouselItem.text49"));
              } else {
                return h("span", {}, this.toFloor(params.row.price));
              }
          },
        },
        // 數量
        {
          title: this.$t("exchange.delegationnum"),
          key: "amount",
          align:"center",
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
          title: this.$t("exchange.traded"),
          key: "tradedAmount",
          align:"center",
          render: (h, params) => {
            return h("span", this.toFloor(params.row.tradedAmount));
          },
        },
        // 成交金額
        {
          title: this.$t("exchange.dealamount"),
          key: "turnover",
          align:"center",
          render: (h, params) => {
            return h("span", this.toFloor(params.row.turnover));
          },
        },
        // 操作
        {
          title: this.$t("exchange.action"),
          key: "operate",
          align:"center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  size: "small",
                },
                style: {
                  border: "1px solid #f0ac19",
                  color: "#f1ac19",
                  "line-height": "1.2",
                  "border-radius": "10px",
                },
                on: {
                  click: () => {
                    // console.log("======开始撤单")
                    this.cancel(params.row);
                  },
                },
              },
              this.$t("exchange.undo")
            );
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
    dateFormat: function(tick) {
      return moment(tick).format("MM-DD HH:mm");
    },
  },
  mounted() {
    this.getCurrentOrder(1);
    this.getCoins();
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
    getCurrentOrder(pageNo, symbol = "", direction = "") {
      this.spinShow = true;
      let params = {
        pageNo,
        symbol,
        direction,
        pageSize: 10,
      };
      this.$http
        .post(this.host + this.api.exchange.current, params)
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
      this.getCurrentOrder(
        1,
        this.searchData.symbol,
        this.searchData.direction
      );
    },
    // 重置
    handleReset() {
      this.searchData = {};
      this.getCurrentOrder(1);
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCurrentOrder(
        this.currentPage,
        this.searchData.symbol,
        this.searchData.direction
      );
    },
    // 撤單
    cancel(row) {
      this.$Modal.confirm({
        title: this.$t("new.orders.withdrawalTips"),
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            .post(
              this.host + this.api.exchange.orderCancel + "/" + row.orderId,
              {}
            )
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                this.getCurrentOrder(
                  1,
                  this.searchData.symbol,
                  this.searchData.direction
                );
                this.$Notice.success({
                  title: this.$t("exchange.tip"),
                  desc: this.$t("exchange.cancelsuccess"),
                });
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message,
                });
              }
            });
        },
      });
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
  color: #FF0000;
}
</style>
