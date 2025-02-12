<template>
  <div class="AddOrder_page">
    <div class="operate_content">
      <div class="operate_left">
        <div class="operate_order" v-if="isLogin">
          <div>
            <Poptip
              trigger="hover"
              placement="bottom"
              width="500"
              @on-popper-show="popperShow"
            >
              <span class="operate_order_btns">
                <Icon type="ios-copy" style="margin-right: 4px" />{{
                  $t("buyCoin.universal.order")
                }}
              </span>
              <div class="operate_order_pop" slot="content">
                <div class="operate_order_pop_title">
                  <div class="css-1jq4ozh">
                    {{ $t("buyCoin.TopOperates.txt1") }}
                  </div>
                  <div
                    style="cursor: pointer"
                    @click="goOrderPage('/buyCoin/myOrders')"
                  >
                    {{ $t("buyCoin.TopOperates.all") }}
                  </div>
                </div>
                <div
                  class="operate_order_pop_content"
                  v-if="orderList.length === 0"
                >
                  <img
                    :src="$imgUrl + '/buyCoin/noOrder.png'"
                    style="margin-bottom: 40px; width: 80px; height: 80px"
                  />
                  <div class="css-za607b">
                    {{ $t("buyCoin.TopOperates.noOrder") }}
                  </div>
                </div>
                <div
                  class="operate_order_pop_content"
                  style="padding-top: 5px"
                  v-else
                >
                  <Table
                    :columns="columns"
                    :data="orderList"
                    :loading="tableLoading"
                    :no-data-text="$t('common.nodata')"
                  ></Table>
                </div>
              </div>
            </Poptip>
          </div>
        </div>
        <div
          class="operate_order"
          @click="goPage()"
          v-else
          style="cursor: pointer"
        >
          <Icon type="ios-copy" style="margin-right: 4px" />
          {{ $t("buyCoin.universal.order") }}
        </div>
        <div class="operate_userCenter">
          <div
            @click="goPage('/buyCoin/userCenter')"
            class="operate_order_btns"
          >
            <Icon type="ios-contacts" style="margin-right: 4px" />{{
              $t("buyCoin.TopOperates.txt2")
            }}
          </div>
        </div>
        <div class="operate_more" v-if="isLogin">
          <Dropdown @on-click="handleOperateMore">
            <div class="operate_order_btns">
              {{ $t("buyCoin.universal.more") }}
              <Icon type="md-arrow-dropdown" />
            </div>
            <DropdownMenu slot="list">
              <DropdownItem name="0">{{
                $t("buyCoin.TopOperates.txt3")
              }}</DropdownItem>
              <DropdownItem name="1">{{
                $t("buyCoin.TopOperates.txt4")
              }}</DropdownItem>
              <DropdownItem name="2">{{
                $t("buyCoin.TopOperates.txt5")
              }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div
          @click="goPage()"
          class="operate_more"
          v-else
          style="cursor: pointer"
        >
          {{ $t("buyCoin.universal.more") }}
          <Icon type="md-arrow-dropdown" />
        </div>
      </div>
    </div>

    <!-- 发布订单弹窗 -->
    <Modal
      v-model="addOrderModal"
      footer-hide
      :title="$t('buyCoin.TopOperates.txt6')"
    >
      <AddOrder
        @closeModal="closeAddOrderModal"
        v-if="addOrderModal"
      ></AddOrder>
    </Modal>
    <!-- 申请成为商家對話框 -->
    <Modal
      v-model="applicationModal"
      :title="$t('buyCoin.TopOperates.txt7')"
      :footer-hide="true"
    >
      <application
        @closeModal="closeApplicationModal"
        v-if="applicationModal"
      ></application>
    </Modal>
  </div>
</template>

<script>
import application from "./application.vue";
import AddOrder from "../pages/components/AddOrder.vue";
export default {
  components: {
    application,
    AddOrder,
  },
  data() {
    return {
      profile: JSON.parse(localStorage.getItem("MEMBER")),
      // 弹窗
      applicationModal: false,
      // 用户信息
      userInfo: {},
      addOrderModal: false, // 发布订单弹窗
      orderList: [],
      allList: [],
      columns: [
        {
          title: this.$t("buyCoin.universal.type"),
          key: "coiOrderType",
          minWidth: 70,
          render: (h, params) => {
            if (params.row.coiMemberId == this.userInfo.id) {
              return h("span", {}, this.$t("buyCoin.universal.buyCoin"));
            } else if (params.row.coiShopMemberId == this.userInfo.id) {
              return h("span", {}, this.$t("buyCoin.universal.sellCoin"));
            }
          },
        },
        {
          title: this.$t("buyCoin.universal.status"),
          key: "coiType",
          minWidth: 80,
          render: (h, params) => {
            if (params.row.coiType == 0) {
              return h("span", {}, this.$t("buyCoin.universal.txt1"));
            } else if (params.row.coiType == 1) {
              return h("span", {}, this.$t("buyCoin.TopOperates.txt9"));
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
          title: this.$t("buyCoin.universal.coinType"),
          key: "coiCoin",
          minWidth: 70,
        },
        {
          title: this.$t("buyCoin.universal.number"),
          key: "coiNum",
          minWidth: 70,
        },
        {
          title: this.$t("buyCoin.universal.price"),
          key: "coiOrderPrice",
          minWidth: 70,
          render: (h, params) => {
            return h("span", {}, params.row.coiOrderPrice + "¥");
          },
        },
      ],
    };
  },
  mounted() {
    // 获取用户信息
    this.getUserInfo();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 更多订单气泡显示
    popperShow() {
      this.tableLoading = true;
      var params = {};
      params["pageNo"] = 1;
      params["orderType"] = 0;
      params["pageSize"] = 10;
      this.$http
        .get(this.host + this.api.buy.userOrderListApi, { params: params })
        .then((response) => {
          var res = response.data;
          this.tableLoading = false;
          if (res.code == 0) {
            this.orderList = res.data.content.slice(0, 5);
          }
        });
    },
    goPage(url) {
      // if (this.userInfo.shopState === 0) {
      //   // 不是商户
      //   this.applicationModal = true;
      // } else {
      //   // 是商户
      if (this.isLogin) {
        this.$router.push(url);
      } else {
        this.$router.push("/login");
      }
      // }
    },
    goOrderPage(url) {
      this.$router.push(url);
    },

    // 发布订单/我的订单
    handleOperateMore(val) {
      if (val === "0") {
        this.$router.push("/buyCoin/userCenter");
      } else {
        if (this.allList.shopState == 0) {
          // 不是商户
          this.applicationModal = true;
        } else if (this.allList.shopState == 1) {
          if (val === "1") {
            // 发布新订单 打开弹窗
            this.addOrderModal = true;
          } else {
            // 我发布的订单
            this.$router.push("/buyCoin/mySetOrders");
          }
        }
      }
    },
    // 监听发布订单弹窗关闭
    closeAddOrderModal() {
      this.addOrderModal = false;
      this.$emit("closeAddOrderModal");
    },
    // 獲取用戶信息
    getUserInfo() {
      if (this.isLogin) {
        this.$http.post(this.host + this.api.user.userInfo, {}).then((res) => {
          this.userInfo = res.data.data;
          this.$store.commit("setMember", res.body.data);
        });
        this.$http
          .get(this.host + this.api.buy.getMemberInformationApi, {
            params: {
              memberId: this.profile.id,
            },
          })
          .then((res) => {
            this.allList = res.data.data;
          });
      }
    },

    // 监听申请商家弹窗关闭
    closeApplicationModal() {
      this.applicationModal = false;
      this.getUserInfo();
    },
  },
};
</script>
<style lang="less">
.operate_order_pop_content {
  .ivu-table-wrapper {
    width: 100%;
  }
}
</style>
<style lang="less" scoped>
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
</style>
