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
            <div class="father_title">{{ $t("carouselItem.text265") }}</div>
            <h1 class="now_title">{{ $t("swap.hisdelegation") }}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="search_part">
            <div class="search_left">
              <Select
                v-model="searchData"
                :placeholder="$t('carouselItem.text126')"
                style="width: 128px; margin-right: 8px"
                size="small"
              >
                <Option
                  v-for="item in itemOption"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.symbol }}
                </Option>
              </Select>
              <Button type="primary" size="small" @click="searchAll()">{{
                $t("uc.finance.record.search")
              }}</Button>
            </div>
          </div>
          <div class="table_part">
            <Table
              :columns="columns"
              :data="allList"
              :no-data-text="$t('common.nodata')"
            ></Table>
            <!-- 分页 -->
            <div class="block" style="text-align: center; margin-top: 20px">
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
      searchData: "",
      itemOption: [],
      allList: [],
      //当前页
      pageNo: 1,
      //每页信息个数
      pageSize: 10,
      //总信息数
      total: 0,
      //调转页码
      currentPage: 1,
      columns: [
        {
          title: this.$t("ctc.tradetime"),
          key: "createTime",
          align: "center",
          width:'180',
          render: (h, params) => {
            return h("span", {}, this.time_filter(params.row.createTime));
          },
        },
        // 交易對
        {
          title: this.$t("exchange.symbol"),
          key: "symbol",
          align: "center",
        },
        // 杠杆倍数
        {
          title: this.$t("carouselItem.text39"),
          key: "leverage",
          align: "center",
        },
        {
          title: this.$t("carouselItem.text40"),
          key: "patterns",
          align: "center",
          render: (h, params) => {
            if (params.row.patterns == "FIXED") {
              return h("span", {}, this.$t("swap.marginMode1"));
            } else {
              return h("span", {}, this.$t("swap.marginMode2"));
            }
          },
        },
        {
          title: this.$t("swap.ent_entrustType"),
          key: "entrustType",
          align: "center",
          render: (h, params) => {
            if (params.row.entrustType == "OPEN") {
              return h("span", {}, this.$t("swap.open"));
            } else {
              return h("span", {}, this.$t("swap.close"));
            }
          },
        },
        {
          title: this.$t("swap.ent_direction"),
          key: "direction",
          align: "center",
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
          key: "type",
          align: "center",
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
          title: this.$t("swap.ent_entrustPrice"),
          key: "entrustPrice",
          align: "center",
          render: (h, params) => {
            if (params.row.type == "LIMIT_PRICE") {
              return h("span", {}, params.row.entrustPrice.toFixed(2));
            } else {
              return h("span", {}, params.row.tradedPrice.toFixed(2));
            }
          },
        },
        {
          title: this.$t("exchange.closeprice"),
          key: "tradedPrice",
          align: "center",
          render: (h, params) => {
            if(params.row.entrustType == "OPEN"){
              return h(
              "span",
              {},
              '--'
            );
            }else{
              return h(
              "span",
              {},
              this.fixed_filter(params.row.tradedPrice)
            );
            }    
          },
        },
        {
          title: this.$t("swap.ent_volume"),
          key: "volume",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.volume + this.$t("swap.shareNumber")
            );
          },
        },
        {
          title: this.$t("swap.ent_fee"),
          key: "openFee",
          align: "center",
          render: (h, params) => {
            if (params.row.status != "ENTRUST_CANCEL") {
              if (params.row.entrustType == "OPEN") {
                return h("span", {}, this.fixed_filter(params.row.openFee));
              }
              if (params.row.entrustType == "CLOSE") {
                return h("span", {}, this.fixed_filter(params.row.closeFee));
              }
            } else {
              return h("span", {}, "--");
            }
          },
        },
        {
          title: this.$t("swap.ent_pl"),
          key: "profitAndLoss",
          align: "center",
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
          title: this.$t("swap.ent_status"),
          key: "volume",
          align: "center",
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
    };
  },
  created() {
    this.getAllCoin();
  },
  mounted() {},
  methods: {
    getAllCoin() {
      this.$http
        .get(this.host + this.api.follow.exchangeCoinList, {
          params: {
            type: "1",
          },
        })
        .then((res) => {
          this.itemOption = res.body.data;
          // this.searchData = res.body.data[0].id;
          this.getFollowList(this.pageNo, this.searchData);
        });
    },
    getFollowList(pageNo, searchData) {
      this.$http
        .get(
          this.host +
            this.api.swap.getHistoryEntrustList,
          {
            params: {
              contractCoinId: searchData,
              tradeType: "2",
              pageNo: pageNo,
              pageSize: "10",
            },
          }
        )
        .then((res) => {
          this.allList = res.body.content;
          this.total = res.body.totalElements
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getFollowList(this.pageNo, this.searchData);
    },
    // 切换币种
    searchAll(){
      this.getFollowList(1, this.searchData);
    }
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
