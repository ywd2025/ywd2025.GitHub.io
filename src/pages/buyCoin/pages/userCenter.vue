<template>
  <!-- 買幣 -->
  <div class="userCenter">
    <div>
      <!-- 操作 -->
      <div class="operate_part">
        <TopOperates @closeAddOrderModal="closeAddOrderModal"></TopOperates>
      </div>
    </div>
    <div class="user_data">
      <div class="user_data_content">
        <div class="user_data_main">
          <div class="user_data_main_left">
            <div class="user_left_account">
              <!-- <div class="user_header"><div class="css-1iqopz0">1</div></div> -->
              <div class="user_account">
                <div class="account">{{ MEMBER.username }}</div>
                <div class="user_account_verify">
                  <div class="css-qb32c7">
                    {{ $t("buyCoin.pages.userCenter.txt1") }}
                    <Icon
                      v-if="MEMBER.email"
                      type="md-checkmark-circle"
                      color="rgb(14, 203, 129)"
                    />
                    <Icon
                      v-else
                      type="md-close-circle"
                      color="rgb(207, 48, 74)"
                    />
                  </div>
                  <div class="css-qb32c7">
                    {{ $t("buyCoin.pages.userCenter.txt2") }}
                    <Icon
                      v-if="MEMBER.mobilePhone"
                      type="md-checkmark-circle"
                      color="rgb(14, 203, 129)"
                    />
                    <Icon
                      v-else
                      type="md-close-circle"
                      color="rgb(207, 48, 74)"
                    />
                  </div>
                  <div class="css-qb32c7">
                    {{ $t("buyCoin.pages.userCenter.txt3") }}
                    <Icon
                      type="md-checkmark-circle"
                      color="rgb(14, 203, 129)"
                      v-if="userVerifyStatus == 2"
                    />
                    <Icon
                      v-else
                      type="md-close-circle"
                      color="rgb(207, 48, 74)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="user_left_property">
              <div style="margin-bottom: 4px;">
                C2C 账户总估值
              </div>
              <div style="cursor: pointer;">
                <span
                  style="font-size: 20px;font-weight: 600;color: rgb(30, 35, 41);"
                >
                  0.00000000BTC
                </span>
                <span>
                  ≈ $0.00
                </span>
              </div>
            </div> -->
          </div>
          <div class="user_data_main_right" style="justify-content: flex-end">
            <Button
              @click="handleAddOrder"
              type="primary"
              style="height: 40px"
              v-if="userInfo.shopState == 1"
            >
              {{ $t("buyCoin.pages.userCenter.txt4") }}
            </Button>
            <Button
              @click="goSelect('section')"
              type="primary"
              style="height: 40px"
              v-if="userInfo.shopState == 2"
            >
              {{ $t("dolphin.text164") }}
            </Button>
          </div>
        </div>
        <div class="user_data_cards">
          <div class="user_data_card">
            <div class="card_title">
              {{ $t("buyCoin.pages.userCenter.txt14") }}
            </div>
            <div class="card_num">
              <span style="font-size: 20px">{{
                businessInfo.orderInfoNum
              }}</span>
              <!-- <span style="font-size: 16px">{{
                $t("buyCoin.pages.userCenter.txt17")
              }}</span> -->
            </div>
          </div>
          <div class="user_data_card">
            <div class="card_title">
              {{ $t("buyCoin.pages.userCenter.txt15") }}
            </div>
            <div class="card_num">
              <span style="font-size: 20px">{{
                businessInfo.orderInfoSucceedNum
              }}</span>
              <!-- <span style="font-size: 16px">{{
                $t("buyCoin.pages.userCenter.txt17")
              }}</span> -->
            </div>
          </div>
          <div class="user_data_card">
            <div class="card_title">
              {{ $t("buyCoin.pages.userCenter.txt16") }}
            </div>
            <div class="card_num">
              <span style="font-size: 20px">{{
                businessInfo.orderInfoNum === 0
                  ? "0%"
                  : (
                      (businessInfo.orderInfoSucceedNum /
                        businessInfo.orderInfoNum) *
                      100
                    ).toFixed("2") + "%"
              }}</span>
              <!-- <span style="font-size: 16px">{{
                $t("buyCoin.pages.userCenter.txt17")
              }}</span> -->
            </div>
          </div>
          <div class="user_data_card">
            <div class="card_title">
              {{ $t("buyCoin.pages.userCenter.txt8") }}
            </div>
            <div class="card_num">
              <span style="font-size: 20px">{{
                businessInfo.releaseTime
              }}</span>
            </div>
          </div>
          <div class="user_data_card">
            <div class="card_title">
              {{ $t("buyCoin.pages.userCenter.txt9") }}
            </div>
            <div class="card_num">
              <span style="font-size: 20px">{{
                businessInfo.paymentTime
              }}</span>
            </div>
          </div>
          <div class="card_more">
            <Icon
              @click="businessInfoMore"
              type="ios-more"
              style="color: #03C59E; cursor: pointer"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="user_other_data">
      <PayType></PayType>
    </div>
    <div
      class="other_data"
      v-if="
        userInfo.shopState == 1 ||
          userInfo.shopState == 4 ||
          userInfo.shopState == 6
      "
    >
      <div class="other_title">{{ $t("dolphin.text155") }}</div>
      <div class="other_center">
        <div class="other_tips">
          <div class="other_tips_all">{{ $t("dolphin.text156") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text157") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text158") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text159") }}</div>
        </div>
        <div
          class="other_btn"
          @click="hand_shop(0)"
          v-if="userInfo.shopState == 1 || userInfo.shopState == 6"
        >
          {{ $t("dolphin.text155") }}
        </div>
        <div
          class="other_btn"
          @click="hand_stop"
          v-if="userInfo.shopState == 4"
        >
          {{ $t("dolphin.text161") }}
        </div>
      </div>
    </div>
    <div
      id="section"
      class="other_data"
      v-if="
        userInfo.shopState == 2 ||
          userInfo.shopState == 5 ||
          userInfo.shopState == 3
      "
    >
      <div class="other_title">{{ $t("dolphin.text165") }}</div>
      <div class="other_center">
        <div class="other_tips">
          <div class="other_tips_all">{{ $t("dolphin.text156") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text157") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text158") }}</div>
          <div class="other_tips_all">{{ $t("dolphin.text159") }}</div>
        </div>
        <div>
          <Button
            @click="thawModal = true"
            type="primary"
            style="height: 40px"
            :disabled="userInfo.shopState == 5"
            v-if="userInfo.shopState == 2 || userInfo.shopState == 5"
          >
            {{ $t("dolphin.text166") }}
          </Button>
          <Button
            @click="thawModal = true"
            type="primary"
            style="height: 40px"
            :disabled="userInfo.shopState == 3"
            v-if="userInfo.shopState == 3"
          >
            {{ $t("dolphin.text171") }}
          </Button>
          <Button
            @click="hand_shop(1)"
            type="primary"
            style="height: 40px"
            :disabled="userInfo.shopState == 3"
            v-if="userInfo.shopState == 2 || userInfo.shopState == 3"
          >
            {{ $t("dolphin.text167") }}
          </Button>
          <Button
            v-if="userInfo.shopState == 5"
            type="primary"
            style="height: 40px"
            :disabled="userInfo.shopState == 5"
          >
            {{ $t("uc.finance.withdraw.status_1") }}
          </Button>
        </div>
      </div>
    </div>
    <!-- 解冻申诉 -->
    <Modal v-model="thawModal" footer-hide :title="$t('dolphin.text169')">
      <div>
        <Input
          v-model="msg"
          type="textarea"
          :placeholder="$t('dolphin.text170')"
          style="width: 470px;"
        />
      </div>
      <div class="submit" @click="hand_submit">
        {{ $t("follow.universal.submit") }}
      </div>
    </Modal>
    <!-- 发布订单弹窗 -->
    <Modal
      v-model="addOrderModal"
      footer-hide
      :title="$t('buyCoin.pages.userCenter.txt4')"
    >
      <AddOrder @closeModal="closeModal" v-if="addOrderModal"></AddOrder>
    </Modal>
    <!-- 商户信息弹窗 -->
    <Modal
      v-model="businessInfoMoreModal"
      footer-hide
      :title="$t('buyCoin.pages.userCenter.txt10')"
    >
      <List>
        <ListItem
          >{{ $t("buyCoin.pages.userCenter.txt14") }}:
          {{ businessInfo.orderInfoNum }}</ListItem
        >
        <ListItem
          >{{ $t("buyCoin.pages.userCenter.txt15") }}:
          {{ businessInfo.orderInfoSucceedNum }}</ListItem
        >
        <ListItem
          >{{ $t("buyCoin.pages.userCenter.txt16") }}:
          {{
            businessInfo.orderInfoNum === 0
              ? "0%"
              : (
                  (businessInfo.orderInfoSucceedNum /
                    businessInfo.orderInfoNum) *
                  100
                ).toFixed("2") + "%"
          }}</ListItem
        >
        <ListItem
          >{{ $t("buyCoin.pages.userCenter.txt8") }}:
          {{ businessInfo.releaseTime }}</ListItem
        >
        <ListItem
          >{{ $t("buyCoin.pages.userCenter.txt9") }}:
          {{ businessInfo.paymentTime }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt5") }}:
          {{ businessInfo.orderNum30 }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt11") }}:
          {{ businessInfo.orderSucceedNum30 }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt7") }}:
          {{ businessInfo.orderBuyNum30 }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt12") }}:
          {{ businessInfo.orderSellNum30 }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt18") }}:
          {{
            businessInfo.orderBuyNumRate30 === 0
              ? "0%"
              : businessInfo.orderBuyNumRate30 * 100 + "%"
          }}</ListItem
        >
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt13") }}:
          {{
            businessInfo.orderSellNumRate30 === 0
              ? "0%"
              : businessInfo.orderSellNumRate30 * 100 + "%"
          }}
        </ListItem>
        <ListItem v-if="businessInfo.shopState == 1"
          >{{ $t("buyCoin.pages.userCenter.txt6") }}:
          {{ businessInfo.handNum30 }}</ListItem
        >
      </List>
    </Modal>
    <!-- 底部 -->
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
import TopOperates from "../components/TopOperates.vue";
import AddOrder from "./components/AddOrder.vue";
import PayType from "./components/PayType.vue";
import application from "../components/application.vue";
var moment = require("moment");

export default {
  components: {
    TopOperates,
    FooterPart,
    AddOrder,
    PayType,
    application,
  },
  data() {
    return {
      msg: "",
      thawModal: false,
      // 弹窗
      applicationModal: false,

      // 用户信息
      userInfo: {},

      MEMBER: {},
      businessInfo: {},
      userVerifyStatus: 0, // 是否实名
      businessInfoMoreModal: false, // 更多信息弹窗
      addOrderModal: false, // 发布订单弹窗

      buyOrSell: "0",
      coinType: "USDT",
      payType: "0",
      tutorialType: "0",
      allorderBuyNumRate: "", //
      allorderBuyNumRate30: "", //
    };
  },
  created: function() {},
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
    // this.timer = setInterval(() => {}, 30000);
    this.MEMBER = JSON.parse(localStorage.getItem("MEMBER"));

    // 获取用户的商家信息
    this.getMemberInformation();
    // 获取实名状态
    this.getReal();
    // 获取用户信息
    this.getUserInfo();
  },
  beforeDestroy: function() {
    // if (this.timer) {
    //   clearInterval(this.timer);
    // }
    // if (this.orderTimer) {
    //   clearInterval(this.orderTimer);
    // }
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
    totalBuyMoney() {
      return (this.buyPrice * this.buyAmount).toFixed(2);
    },
    totalSellMoney() {
      return (this.sellPrice * this.sellAmount).toFixed(2);
    },
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$http.post(this.host + this.api.user.userInfo, {}).then((res) => {
        this.userInfo = res.data.data;
        this.$store.commit("setMember", res.body.data);
      });
    },
    // 用户信息
    getMemberInformation() {
      this.$http
        .get(this.host + this.api.buy.getMemberInformationApi, {
          params: {
            memberId: this.MEMBER.id,
          },
        })
        .then((response) => {
          var res = response.data;
          this.businessInfo = res.data;
        });
    },
    // 獲取實名狀態
    getReal() {
      this.$http.post(this.host + this.api.user.real, {}).then((res) => {
        // 0待审核1审核失败2审核成功
        this.userVerifyStatus = res.data.data.auditStatus;
      });
    },
    // 更多商户信息
    businessInfoMore() {
      this.businessInfoMoreModal = true;
    },
    // 发布订单
    handleAddOrder() {
      this.addOrderModal = true;
    },
    // 监听发布订单弹窗关闭
    closeAddOrderModal() {
      // console.log("用户中心页貌似不用刷新页面");
    },
    // 修改更新时间
    handleIntervalType(name) {
      this.IntervalType = name;
    },

    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    // 关闭
    closeModal(e) {
      this.addOrderModal = false;
    },
    // 申请解除
    hand_shop(num) {
      this.$Modal.confirm({
        title:
          num == 0 ? this.$t("dolphin.text155") : this.$t("dolphin.text167"),
        content:
          num == 0 ? this.$t("dolphin.text160") : this.$t("dolphin.text168"),
        okText: this.$t("common.ok"), // 确定按钮的多语言文本
        cancelText: this.$t("common.close"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.buy.shoprefund, {})
            .then((res) => {
              this.$Notice.info({
                title: this.$t("swap.tip"),
                desc: res.body.message,
              });
              this.getUserInfo();
            });
        },
      });
    },
    // 取消申请
    hand_stop() {
      this.$Modal.confirm({
        title: this.$t("dolphin.text162"),
        content: this.$t("dolphin.text163"),
        okText: this.$t("common.ok"), // 确定按钮的多语言文本
        cancelText: this.$t("common.close"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.buy.shopapplication, {})
            .then((res) => {
              this.$Notice.info({
                title: this.$t("swap.tip"),
                desc: res.body.message,
              });
              this.getUserInfo();
            });
        },
      });
    },
    goSelect(section) {
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
    hand_submit() {
      this.$http.post(this.host + this.api.buy.shopthaw, {}).then((res) => {
        this.$Notice.info({
          title: this.$t("swap.tip"),
          desc: res.body.message,
        });
        if (res.body.code == 0) {
          this.thawModal = false;
          this.getUserInfo();
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
@import url("../../../assets/css/common.less");
.userCenter {
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
  .user_data {
    padding: 36px 24px 40px;
    // opacity: 0.5;
    background: linear-gradient(
        rgba(166, 255, 250, 0.1) 0%,
        rgba(166, 255, 250, 0) 100%
      ),
      radial-gradient(
        20.83% 135.34% at 72.57% 33.99%,
        rgba(189, 239, 83, 0.12) 0%,
        rgba(189, 239, 83, 0) 100%
      ),
      radial-gradient(
        20% 128.06% at 26.77% 87.3%,
        rgba(192, 62, 253, 0.06) 0%,
        rgba(139, 75, 243, 0) 100%
      ),
      linear-gradient(
        90deg,
        rgb(241, 246, 250) 17.64%,
        rgba(241, 246, 250, 0) 34.76%
      ),
      linear-gradient(0deg, rgb(250, 250, 250), rgb(250, 250, 250));
    .user_data_content {
      width: 1200px;
      margin: 0 auto;
    }
    .user_data_main {
      margin-bottom: 24px;
      grid-template-columns: 1fr max-content;
      gap: 36px;
      display: grid;
      .user_data_main_left {
        flex-direction: row;
        align-items: flex-end;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        margin: 0px;
        gap: 22px;
        .user_left_account {
          .user_account {
            color: #212833;
            font-size: 14px;
            .account {
              font-weight: 600;
              font-size: 20px;
              line-height: 24px;
            }
            .user_account_verify {
              margin-top: 10px;
              display: flex;
              gap: 16px;
              div {
                margin-right: 10px;
              }
            }
          }
        }
        .user_left_property {
          color: rgb(112, 122, 138);
          font-size: 14px;
        }
      }
      .user_data_main_right {
        align-items: flex-end;
        grid-template-columns: repeat(5, 1fr) 40px;
        display: flex;
      }
    }
    .user_data_cards {
      grid-template-columns: repeat(5, 1fr) 40px;
      gap: 12px;
      display: grid;
      .user_data_card {
        border: 1px solid rgb(234, 236, 239);
        padding: 24px;
        border-radius: 8px;
        height: 132px;
        display: flex;
        justify-content: start;
        flex-direction: column;
        .card_title {
          font-size: 14px;
          color: rgb(71, 77, 87);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card_num {
          justify-content: center;
          display: flex;
          width: 100%;
          align-items: center;
          color: rgb(30, 35, 41);
          font-weight: 400;
        }
      }
      .card_more {
        justify-content: center;
        padding-top: 0px;
        border-radius: 0px 8px 8px 0px;
        min-height: 132px;
        flex-flow: column;
        border: 1px solid rgb(234, 236, 239);
        gap: 20px;
        display: flex;
        align-items: center;
      }
    }
    .user_other_data {
      display: grid;
      gap: 12px;
    }
  }
}
.other_data {
  margin: 20px auto;
  width: 1200px;
  .other_title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .other_center {
    display: flex;
    justify-content: space-between;
    .other_tips {
      .other_tips_all {
        font-size: 14px;
        line-height: 20px;
        color: rgb(112, 122, 138);
        position: relative;
        padding-left: 15px;
        margin-top: 10px;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #d9d9d9;
        }
      }
    }
    .other_btn {
      background-color: #03C59E;
      width: 120px;
      color: #fff;
      height: 40px;
      cursor: pointer;
      border-radius: 5px;
      text-align: center;
      line-height: 40px;
    }
  }
}
.submit {
  margin: 30px auto;
  cursor: pointer;
  width: 200px;
  background-color: #03C59E;
  color: #fff;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
}
</style>
