<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t('carouselItem.text58') }}</div>
            <h1 class="now_title">{{ $t('carouselItem.text59') }}</h1>
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
                  :value="item.coinUnit"
                  :key="item.coinUnit"
                >
                  {{ item.coinUnit }}
                </Option>
              </Select>
              <Button type="primary" size="small" @click="handleSearch">{{
                $t("new.universal.query")
              }}</Button>
              <Button type="primary" size="small" @click="handleReset">{{
                $t("new.universal.reset")
              }}</Button>
            </div>
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')"></Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- 分页 -->
            <div class="block" style="text-align: center;margin-top: 20px;">
              <Page
                @on-change="handleCurrentChange"
                :page-size="10"
                :current="pageNo"
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
      coinName: "",
      searchData: {
        coinUnit: ""
      },
      searchItems: [
        {
          value: "coinUnit",
          placeholder: this.$t('buyCoin.universal.coinType'),
          itemOption: [],
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
          key: "createTime",
          align:"center",
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.createTime));
          },
        },
        // 当日浮动
        {
          title: this.$t('carouselItem.text60'),
          key: "earningPercent",
          align:"center",
        },
        // 总资产
        {
          title: this.$t('follow.index.txt70'),
          key: "memberBuyAmount",
          align:"center",
        },
        // 币种
        {
          title: this.$t('buyCoin.universal.coinType'),
          key: "coinUnit",
          align:"center",
        },
        // 当日收益
        {
          title: this.$t('carouselItem.text61'),
          key: "earningsAmount",
          align:"center",
        },
        // 方向
        // {
        //   title: this.$t("exchange.direction"),
        //   key: "direction",
        //   render: (h, params) => {
        //     const row = params.row;
        //     const className = row.direction.toLowerCase();
        //     return h(
        //       "span",
        //       {
        //         attrs: {
        //           class: className,
        //         },
        //       },
        //       row.direction == "BUY"
        //         ? this.$t("exchange.buyin")
        //         : this.$t("exchange.sellout")
        //     );
        //   },
        // },
        // 操作
        // {
        //   title: this.$t("exchange.action"),
        //   key: "operate",
        //   render: (h, params) => {
        //     return h(
        //       "Button",
        //       {
        //         props: {
        //           size: "small",
        //         },
        //         style: {
        //           border: "1px solid #f0ac19",
        //           color: "#f1ac19",
        //           "line-height": "1.2",
        //           "border-radius": "10px",
        //         },
        //         on: {
        //           click: () => {
        //             // console.log("======开始撤单")
        //             this.cancel(params.row);
        //           },
        //         },
        //       },
        //       this.$t("exchange.undo")
        //     );
        //   },
        // },
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
      // 查詢
      coinUnit: null,
    };
  },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("MM-DD HH:mm");
    },
  },
  mounted() {
    this.getListData();
    this.getCoins();
  },
  methods: {
    // 获取币种
    getCoins() {
      this.$http
        .get(this.host + this.api.financial.getMemberZJWalletApi, {})
        .then((response) => {
          var res = response.body;
          this.searchItems[0].itemOption = res.data
          this.coinName = res.data[0].coinUnit
        });
    },
    getListData() {
      this.spinShow = true;
      let params = {
        coinUnit: this.searchData.coinUnit,
        pageNo: this.pageNo,
        pageSize: 10,
      };
      this.$http
        .post(this.host + this.api.financialRecords.earningsApi, params)
        .then((res) => {
          this.data = res.data.data.content;
          this.spinShow = false;
          this.total = res.data.data.totalElements;
        });
    },
    // 查詢
    handleSearch() {
      this.getListData();
    },
    // 重置
    handleReset() {
      this.searchData.coinUnit = "";
      this.getListData();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getListData();
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
</style>
