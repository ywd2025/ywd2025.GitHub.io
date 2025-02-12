<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.orders.contractOrder") }}</div>
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
            <Table
              :columns="columns"
              :data="data"
              :no-data-text="$t('common.nodata')"
            ></Table>
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
          value: "contractCoinId",
          placeholder: this.$t("new.orders.allTrading"),
          itemOption: [],
        },
      ],
      columns: [
        {
          title: this.$t("swap.time"),
          // title: '時間',
          key: "createTime",
          align: "left",
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.createTime));
          },
        },
        // 交易對
        {
          title: this.$t("exchange.symbol"),
          key: "symbol",
        },
        // 杠杆倍数
        {
          title: this.$t("new.orders.leverage"),
          key: "leverage",
        },
        {
          title: this.$t("swap.ent_entrustType"),
          // title: '開倉/平倉',
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
          title: this.$t("new.orders.positions"),
          key: "patterns",
          render: (h, params) => {
            if (params.row.patterns == "FIXED") {
              // return h("span", {}, this.$t("swap.marginMode1"));
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
              // return h("span", {}, this.$t("swap.marginMode2"));
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
          title: this.$t("swap.ent_direction"),
          // title: '方向',
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
          title: this.$t("swap.ent_type"),
          // title: '委託類型',
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
          title: this.$t("swap.ent_entrustPrice"),
          // title: '委托價',
          key: "entrustPrice",
          render: (h, params) => {
            return h("span", {}, params.row.entrustPrice.toFixed(2));
          },
        },
        {
          title: this.$t("swap.ent_tradedPrice"),
          // title: '成交價',
          key: "tradedPrice",
          render: (h, params) => {
            return h("span", {}, params.row.tradedPrice.toFixed(2));
          },
        },
        {
          title: this.$t("swap.ent_margin"),
          // title: '保證金',
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
          title: this.$t("swap.ent_volume"),
          // title: '委託數量',
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
          // title: '委託狀態',
          title: this.$t("swap.ent_status"),
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
          // title: '操作',
          title: this.$t("swap.action"),
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
                    this.cancel(params.row.id);
                  },
                },
              },
              this.$t("swap.undo")
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
      contractCoinId: null,
      openMerge: 0, //是否开放和分仓
    };
  },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("MM-DD HH:mm");
    },
  },
  mounted() {
    this.getCurrentEntrustOrders(1);
    this.getCoins();
    this.getAuto()
  },
  methods: {
    getCoins() {
      this.$http.post(this.host + this.api.swap.thumb, {}).then((res) => {
        res.data.forEach((item) => {
          const searchObj = {};
          searchObj.value = item.contractCoinId;
          searchObj.label = item.symbol;
          this.searchItems[0].itemOption.push(searchObj);
        });
      });
    },
    getCurrentEntrustOrders(pageNo, contractCoinId = "") {
      this.spinShow = true;
      let params = {
        pageNo,
        contractCoinId,
        pageSize: 10,
      };
      this.$http
        .post(this.host + this.api.swap.getEntrustList, params)
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
      this.getCurrentEntrustOrders(1, this.searchData.contractCoinId);
    },
    // 重置
    handleReset() {
      this.searchData = {};
      this.getCurrentEntrustOrders(1);
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCurrentEntrustOrders(
        this.currentPage,
        this.searchData.contractCoinId
      );
    },
    // 撤單
    cancel(eid) {
      var that = this;
      this.$Modal.confirm({
        title: this.$t("new.orders.withdrawalTips"),
        content: this.$t("swap.undotip"),
        onOk: () => {
          let params = {
            entrustId: eid,
          };
          this.$http
            .post(this.host + this.api.swap.cancel, params)
            .then((response) => {
              var resp = response.body;
              console.log(resp);
              if (resp.code == 0) {
                this.$Notice.success({
                  title: this.$t("swap.tip"),
                  desc: this.$t("swap.cancelsuccess"),
                });
                that.getCurrentEntrustOrders(1, this.searchData.contractCoinId);
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
</style>
