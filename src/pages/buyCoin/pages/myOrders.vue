<template>
  <!-- c2c 我的订单 -->
  <div class="myAds">
    <div style="min-height: calc(100vh - 423px);">
      <!-- 操作 -->
      <div class="operate_part">
        <TopOperates></TopOperates>
      </div>

      <div class="myAds_content">
        <div class="myAds_title">{{ $t("buyCoin.orders.myOrder") }}</div>
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
            <div>
              <h4 style="color: #F6465D;">
                {{ $t("buyCoin.orders.tips") }}
              </h4>
            </div>
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="orderList" :loading="tableLoading" :no-data-text="$t('common.nodata')">
              <template slot-scope="{ row }" slot="coiPayType">
                <Tag color="warning" v-if="row.coiPayType == 3">{{
                  $t("buyCoin.universal.bank")
                }}</Tag>
                <Tag color="success" v-if="row.coiPayType == 1">{{
                  $t("buyCoin.universal.wx")
                }}</Tag>
                <Tag color="primary" v-if="row.coiPayType == 2">{{
                  $t("buyCoin.universal.alipay")
                }}</Tag>
              </template>
              <template
                slot-scope="{ row }"
                slot="operate"
                v-if="searchData.orderType === 0"
              >
                <Button
                  type="warning"
                  @click="handleCancel(row)"
                  v-if="row.coiMemberId == userInfo.id"
                  :disabled="row.coiType != 0"
                >
                  {{ $t("buyCoin.orders.cancelOrder") }}
                </Button>
                <!-- coiMemberId 买方id coiShopMemberId 卖方id userInfo.id 自己id -->
                <Button
                  type="primary"
                  @click="handlePay(row)"
                  v-if="row.coiMemberId == userInfo.id"
                  :disabled="row.coiType != 0"
                >
                  {{ $t("buyCoin.orders.surePay") }}
                </Button>
                <Button
                  type="primary"
                  @click="handleCollect(row)"
                  v-if="row.coiShopMemberId == userInfo.id"
                  :disabled="row.coiType != 2"
                >
                  {{ $t("buyCoin.orders.sureCollect") }}
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

    <Modal v-model="paySureModal" title="付款">
      <!-- 1 微信 2 支付宝 3 银行借记卡 -->
      <div
        v-if="payType == 1"
        style="display: flex; flex-direction: column;align-items: center;"
      >
        <h2>{{$t('carouselItem.text65')}}</h2>
        <div style="margin: 20px 0 10px;">
          <span>{{ $t('new.universal.account') }}: </span>{{ payTypeData.cptAccountWx }}
        </div>
        <div>
          <img
            style="width: 350px;height: auto;"
            :src="payTypeData.cptCodeWx"
          />
        </div>
      </div>
      <div
        v-if="payType == 2"
        style="display: flex; flex-direction: column;align-items: center;"
      >
        <h2>{{$t('carouselItem.text65')}}</h2>
        <div style="margin: 20px 0 10px;">
          <span>{{ $t('new.universal.account') }}: </span>{{ payTypeData.cptAccountZfb }}
        </div>
        <div>
          <img
            style="width: 350px;height: auto;"
            :src="payTypeData.cptCodeZfb"
          />
        </div>
      </div>
      <div v-if="payType == 3">
        <div><span>{{$t('buyCoin.pages.userCenter.PayType.txt9')}}: </span>{{ payTypeData.cptBankName }}</div>
        <div><span>{{$t('buyCoin.pages.userCenter.PayType.txt11')}}: </span>{{ payTypeData.cptBankAddress }}</div>
        <div><span>{{$t('buyCoin.pages.userCenter.PayType.txt13')}}: </span>{{ payTypeData.cptBankCode }}</div>
      </div>
      <div slot="footer">
        <Button type="text" @click="handlePayCancel">{{$t('buyCoin.universal.cancelText')}}</Button>
        <Button type="primary" @click="handleSurePay">{{$t('carouselItem.text66')}}</Button>
      </div>
    </Modal>

    <!-- 取消订单弹窗 -->
    <Modal v-model="cancelOrderModal" :title="$t('carouselItem.text67')">
      <Select
        v-model="cancelMessage"
        :placeholder="$t('carouselItem.text68')"
        style="width: 100%;margin-right: 8px;"
      >
        <Option
          v-for="item in cancelMessageList"
          :value="item.value"
          :key="item.value"
        >
          {{ item.value }}
        </Option>
      </Select>
      <div slot="footer">
        <Button type="text" @click="handlePayCancel">{{$t('buyCoin.universal.cancelText')}}</Button>
        <Button type="primary" @click="handleSureCancel">{{$t('buyCoin.universal.okText')}}</Button>
      </div>
    </Modal>

    <!-- 底部 -->
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import TopOperates from "../components/TopOperates.vue";
import FooterPart from "@/components/footerPart.vue";
var moment = require("moment");

export default {
  components: {
    TopOperates,
    FooterPart,
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
      // 分页
      total: 0,
      pageSize: 10,
      currentPage: 1,

      // 列表加载
      tableLoading: false,
      // 确认付款弹窗
      paySureModal: false,
      payType: 0,
      payTypeData: {},
      // 取消订单弹窗
      cancelOrderModal: false,
      cancelMessage: null,
      cancelMessageList: [],

      orderInfoId: null,
      orderList: [],
      columns: [],
      columnsChange: [
        {
          title: this.$t("buyCoin.orders.txt1"),
          key: "coiOrderType",
          minWidth: 120,
          render: (h, params) => {
            if (params.row.coiMemberId == this.userInfo.id) {
              return h("span", {}, this.$t("buyCoin.universal.buyCoin"));
            } else if (params.row.coiShopMemberId == this.userInfo.id) {
              return h("span", {}, this.$t("buyCoin.universal.sellCoin"));
            }
          },
        },
        {
          title: this.$t("buyCoin.orders.txt2"),
          key: "coiType",
          minWidth: 120,
          render: (h, params) => {
            if (params.row.coiMessage == "订单超时自动取消") {
              return h("span", {}, "超时取消");
            } else if (params.row.coiType == 0) {
              return h("span", {}, this.$t("buyCoin.universal.txt1"));
            } else if (params.row.coiType == 1) {
              return h("span", {}, this.$t("buyCoin.universal.txt2"));
            } else if (params.row.coiType == 2) {
              return h("span", {}, this.$t("buyCoin.universal.txt3"));
            } else if (params.row.coiType == 3) {
              return h("span", {}, this.$t("buyCoin.universal.txt5"));
            } else if (params.row.coiType == 4) {
              return h("span", {}, this.$t("buyCoin.universal.txt5"));
            }
          },
        },
        {
          title: this.$t("buyCoin.index.txt21"),
          key: "busername",
          minWidth: 200,
        },
        {
          title: this.$t("buyCoin.orders.txt3"),
          key: "coiOrderNum",
          minWidth: 300,
        },
        {
          title: this.$t("buyCoin.orders.txt4"),
          key: "coiCoin",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt5") + " (¥)",
          key: "coiCoinPrice",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt6"),
          key: "coiCreateTime",
          minWidth: 200,
        },
        {
          title: this.$t("buyCoin.orders.txt7"),
          key: "coiPayTime",
          minWidth: 200,
        },
        {
          title: this.$t("buyCoin.orders.txt8"),
          key: "coiDropcoinTime",
          minWidth: 200,
        },
        {
          title: this.$t("buyCoin.orders.txt9"),
          key: "coiNum",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt10") + " (¥)",
          key: "coiOrderPrice",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.orders.txt13"),
          slot: "coiPayType",
          minWidth: 120,
        },
        {
          title: this.$t("buyCoin.universal.operate"),
          slot: "operate",
          fixed: "right",
          minWidth: 280,
        },
      ],
      searchItems: [
        {
          value: "orderType",
          placeholder: this.$t("buyCoin.orders.txt14"),
          itemOption: [
            {
              value: 0,
              label: this.$t("buyCoin.orders.txt15"),
            },
            {
              value: 1,
              label: this.$t("buyCoin.orders.txt16"),
            },
          ],
        },
      ],
      searchData: {
        orderType: 0,
      },
      message: "",
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
    // 确认付款
    handlePay(row) {
      // 1 微信 2 支付宝 3 银行借记卡
      this.payType = row.coiPayType;
      this.orderInfoId = row.coiId;
      // 展示二维码
      this.$http
        .get(this.host + this.api.buy.getPayType , {
          params: {
            orderInfoId: row.coiId,
          }
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 500) {
            this.$Message.error("该用户已删除此支付方式, 请更换商家重新下单");
          } else {
            this.payTypeData = res.data.data;
            this.paySureModal = true;
          }
        });
    },
    // 取消付款
    handlePayCancel() {
      this.paySureModal = false;
      this.cancelOrderModal = false;
    },
    // 确认付款已完成
    handleSurePay() {
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: this.$t("buyCoin.orders.txt17"),
        okText: this.$t("buyCoin.universal.okText"),
        cancelText: this.$t("buyCoin.universal.cancelText"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.buy.paymentApi, {
              orderInfoId: this.orderInfoId,
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.$Message.success(res.data.message);
                this.paySureModal = false;
                this.getOrderList(1, this.searchData.orderType);
              } else {
                this.$Message.error(res.data.message);
              }
            });
        },
        onCancel: () => {},
      });
    },

    // 确认放币已完成
    handleCollect(row) {
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: this.$t("buyCoin.orders.txt18"),
        okText: this.$t("buyCoin.universal.okText"),
        cancelText: this.$t("buyCoin.universal.cancelText"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.buy.collectApi, {
              orderInfoId: row.coiId,
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
    // 取消订单
    handleCancel(row) {
      this.$http.get(this.host + this.api.buy.getCancelCauseApi).then((res) => {
        // console.log(res.data.data);
        this.orderInfoId = row.coiId;
        this.cancelMessageList = res.data.data;
        this.cancelOrderModal = true;
      });
    },
    handleSureCancel() {
      if (this.cancelMessage === null) {
        this.$Message.error("请选择取消原因");
        return;
      }
      this.$http
        .post(this.host + this.api.buy.cancelOrderInfoApi, {
          orderInfoId: this.orderInfoId,
          message: this.cancelMessage,
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
    // 获取列表信息
    getOrderList(pageNo, orderType) {
      this.tableLoading = true;
      var params = {};
      params["pageNo"] = pageNo;
      params["orderType"] = orderType;
      params["pageSize"] = 10;
      this.$http
        .get(this.host + this.api.buy.userOrderListApi, { params: params })
        .then((response) => {
          var res = response.data;
          this.tableLoading = false;
          if (res.code == 0) {
            this.orderList = res.data.content;
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
      // console.log(this.searchData);
      if (this.searchData.orderType === 0) {
        //未完成订单
        this.columns = this.columnsChange;
      } else {
        // 已完成订单
        this.columns = this.columnsChange.slice(0, -1);
      }
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
