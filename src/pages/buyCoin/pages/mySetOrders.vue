<template>
  <!-- c2c 我的订单 -->
  <div class="myAds">
    <div style="min-height: calc(100vh - 423px);">
      <!-- 操作 -->
      <div class="operate_part">
        <TopOperates></TopOperates>
      </div>

      <div class="myAds_content">
        <div class="myAds_title">{{ $t("buyCoin.orders.mySetOrder") }}</div>
        <!-- 列表 -->
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
              <!-- <Button type="primary" size="small" @click="handleReset">{{
                $t("new.universal.reset")
              }}</Button> -->
            </div>
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="orderList" :loading="tableLoading" :no-data-text="$t('common.nodata')">
              <template slot-scope="{ row }" slot="coPayType">
                <Tag color="warning" v-if="row.coPayType == 3">{{
                  $t("buyCoin.universal.bank")
                }}</Tag>
                <Tag color="success" v-if="row.coPayType == 1">{{
                  $t("buyCoin.universal.wx")
                }}</Tag>
                <Tag color="primary" v-if="row.coPayType == 2">{{
                  $t("buyCoin.universal.alipay")
                }}</Tag>
              </template>
              <template slot-scope="{ row }" slot="operate">
                <Button
                  type="warning"
                  :disabled="row.coState != 0"
                  @click="handleCancel(row)"
                >
                  {{ $t("buyCoin.orders.cancelOrder") }}
                </Button>
                <Button type="primary" @click="handleLineOrder(row)">
                  {{ $t("buyCoin.orders.linkOrders") }}
                </Button>
              </template>
            </Table>
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

    <!-- 底部 -->
    <FooterPart></FooterPart>

    <!-- 抽屉 -->
    <Drawer
      :title="$t('buyCoin.orders.txt3') + ':' + orderDetail.coOrderNum"
      :closable="false"
      v-model="linkOrderDrawer"
      width="70%"
    >
      <LinkOrder v-if="linkOrderDrawer" :orderId="orderDetail.coId"></LinkOrder>
    </Drawer>
  </div>
</template>

<script>
import TopOperates from "../components/TopOperates.vue";
import LinkOrder from "./components/LinkOrder.vue";
import FooterPart from "@/components/footerPart.vue";
var moment = require("moment");

export default {
  components: {
    TopOperates,
    LinkOrder,
    FooterPart,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
      // 分页
      total: 0,
      pageSize: 10,
      currentPage: 1,

      // 抽屉
      linkOrderDrawer: false,

      // 列表加载
      tableLoading: false,
      orderList: [],
      columns: [],
      columnsChange: [
        {
          title: this.$t("buyCoin.orders.txt3"),
          key: "coOrderNum",
          minWidth: 300,
        },
        {
          title: this.$t("buyCoin.orders.txt4"),
          key: "coCoin",
          minWidth: 100,
        },
        {
          title: this.$t("buyCoin.orders.txt20") + " (¥)",
          key: "coAmountMin",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt21") + " (¥)",
          key: "coAmountMax",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt5") + " (¥)",
          key: "coCoinPrice",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt22"),
          key: "coOrderTotal",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt23"),
          key: "coOrderBalance",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt14"),
          key: "coOrderType",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.coOrderType == 0) {
              return h("span", {}, this.$t("buyCoin.orders.txt24"));
            } else if (params.row.coOrderType == 1) {
              return h("span", {}, this.$t("buyCoin.orders.txt25"));
            }
          },
        },
        {
          title: this.$t("buyCoin.orders.txt2"),
          key: "coState",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.coState == 0) {
              return h("span", {}, this.$t("buyCoin.orders.txt26"));
            } else if (params.row.coState == 1) {
              return h("span", {}, this.$t("buyCoin.orders.txt27"));
            } else if (params.row.coState == 2) {
              return h("span", {}, this.$t("buyCoin.orders.txt28"));
            } else if (params.row.coState == 3) {
              return h("span", {}, this.$t("buyCoin.orders.txt29"));
            }
          },
        },
        {
          title: this.$t("buyCoin.orders.txt30") + " (¥)",
          key: "coOrderTotalPrice",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.universal.payType"),
          slot: "coPayType",
          minWidth: 100,
        },
        {
          title: this.$t("buyCoin.orders.txt31"),
          key: "coMessage",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt6"),
          key: "coOrderStartTime",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt32"),
          key: "coOrderEndTime",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.universal.operate"),
          slot: "operate",
          fixed: "right",
          minWidth: 260,
        },
      ],
      searchItems: [
        {
          value: "orderType",
          placeholder: this.$t("buyCoin.orders.txt14"),
          itemOption: [
            {
              value: 1,
              label: this.$t("buyCoin.orders.txt15"),
            },
            {
              value: 2,
              label: this.$t("buyCoin.orders.txt16"),
            },
          ],
        },
      ],
      searchData: {
        orderType: 1,
      },
      message: "",
      orderDetail: {},
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
    this.columns = this.columnsChange;
    this.getOrderList(1, 0);
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
  },
  methods: {
    handleLineOrder(row) {
      this.orderDetail = row;
      this.linkOrderDrawer = true;
    },
    // 取消订单
    handleCancel(row) {
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: "是否确认取消订单",
        okText: this.$t("buyCoin.universal.okText"),
        cancelText: this.$t("buyCoin.universal.cancelText"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.buy.cancelOrderApi, {
              orderId: row.coId,
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.$Message.success(res.data.message);
                this.getOrderList(1, this.searchData.orderType);
              } else {
                this.$Message.error(res.data.message);
              }
            });
        },
        onCancel: () => {},
      });
    },
    // 获取列表信息
    getOrderList(pageNo, orderType) {
      this.tableLoading = true;
      var params = {};
      params["pageNo"] = pageNo;
      params["orderType"] = orderType;
      params["shopId"] = this.userInfo.csId; // 商户id
      params["pageSize"] = 10;
      this.$http
        .get(this.host + this.api.buy.getOrderPageByShopIdApi, {
          params: params,
        })
        .then((response) => {
          var res = response.data;
          this.tableLoading = false;
          if (res.code == 0) {
            this.orderList = res.data.content;
            // console.log(this.orderList);
            this.total = res.data.totalElements;
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: res.message,
            });
          }
        });
    },
    // 查詢
    handleSearch() {
      this.getOrderList(1, this.searchData.orderType);
    },
    // 重置
    handleReset() {
      this.searchData = {};
      this.getOrderList(1);
    },
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList(this.currentPage, this.searchData.orderType);
    },
  },
};
</script>
<style scoped lang="less">
@import url("../../../assets/css/common.less");
.myAds {
  width: 100%;
  padding-top: 50px;
  .operate_part {
    background-color: #1e2329;
    height: 56px;
    width: 100%;
    .operate_content {
      width: 1200px;
      margin: 0 auto;
      color: #ffffff;
      .operate_left {
        width: 250px;
        float: right;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
      }
    }
  }
  .operate_order_pop {
    background-color: rgb(255, 255, 255);
    max-height: 640px;
    color: rgb(71, 77, 87);
    .operate_order_pop_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px;
      border-bottom: 1px solid rgb(234, 236, 239);
      padding: 16px;
    }
    .operate_order_pop_content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0px;
      padding: 30px 0px;
    }
  }
  .operate_order_btns {
    cursor: pointer;
  }
  .operate_order_btns:hover {
    color: #03C59E !important;
  }
  .myAds_content {
    width: 1200px;
    margin: 0 auto;
  }
  .myAds_title {
    margin: 24px 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }

  .table_all {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
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
