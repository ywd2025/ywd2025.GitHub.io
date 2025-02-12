<template>
  <div class="content">
    <Spin size="large" fix v-if="spinShow" style="background-color: #878787;"></Spin>
    <div class="content_all">
      <div class="title1">{{ $t("dolphin.text1") }}</div>
      <div class="money_content">
        <div class="row_one">{{ $t("carouselItem.text148") }}</div>
        <div class="row_box">
          <div class="row_box_one">
            <div>
              {{ $t("uc.finance.record.from") }}
            </div>
            <div>
              <span>{{ $t("dolphin.text4") }}</span>
              <span
                >{{ form.mwBalance }}
                <span style="margin-left: 5px;">{{ form.mvCoin }}</span>
              </span>
            </div>
          </div>
          <div class="row_box_two">
            <input
              v-model="form.inputVal"
              :placeholder="$t('dolphin.text5')"
              class="input_num"
            />
            <div class="img_coin" @click="hand_coin(0)">
              <img
                :src="form.url"
                alt=""
                class="coin_icon"
                style="margin-right: 10px"
              />
              <div>{{ form.mvCoin }}</div>
              <Icon type="ios-arrow-down" size="24" />
            </div>
          </div>
        </div>
        <div class="img_center">
          <img :src="$imgUrl + '/shandui.png'" alt="" class="img_sd" @click="hand_exchange"/>
        </div>
        <div class="row_box">
          <div class="row_box_one">
            <div>
              {{ $t("uc.finance.record.to") }}
            </div>
            <div>
              <span>{{ $t("dolphin.text4") }}</span>
              <span
                >{{ forms.mwBalance }}
                <span style="margin-left: 5px;">{{ forms.mvCoin }}</span>
              </span>
            </div>
          </div>
          <div class="row_box_two">
            <div>{{ inputVals }}</div>
            <div class="img_coin" @click="hand_coin(1)">
              <img
                :src="forms.url"
                alt=""
                class="coin_icon"
                style="margin-right: 10px"
              />
              <div>{{ forms.mvCoin }}</div>
              <Icon type="ios-arrow-down" size="24" />
            </div>
          </div>
        </div>
        <div class="row_two">
          <div>{{ $t("dolphin.text2") }}</div>
          <div>
            1 <span style="margin-left: 5px;">{{ form.mvCoin }}</span> =
            {{ closeCoin }}
            <span style="margin-left: 5px;">{{ forms.mvCoin }}</span>
          </div>
        </div>
        <div class="row_btn" @click="handExchange">
          {{ $t("dolphin.text3") }}
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>
    <!-- 弹出框: 变更仓位模式 -->
    <Modal
      v-model="marginModeModal"
      :title="$t('dolphin.text6')"
      width="609"
      :footer-hide="true"
      class-name="vertical-center-modal"
    >
      <Input
        prefix="md-search"
        v-model="searchValue"
        :placeholder="$t('carouselItem.text205')"
        class="input_select"
        clearable
      />
      <div
        style="width: 569px; height: 500px;overflow-y: scroll;margin-top: 20px;"
      >
        <div
          class="coin_all"
          v-for="(item, index) in encryptionData"
          :key="index"
          @click="hand_coinOne(item)"
        >
          <div class="coin_all_left">
            <img :src="item.url" alt="" class="coin_icon" />
            <div>{{ item.mvCoin }}</div>
          </div>
          <div>{{ item.mwBalance }}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      spinShow: false,
      coinAll: [],
      marginModeModal: false,
      searchValue: "",
      encryptionData: [],
      type: "",
      form: {
        mvCoin: "",
        url: "",
        mwBalance: "",
        inputVal: "",
        close: "",
      },
      forms: {
        mvCoin: "",
        url: "",
        mwBalance: "",
        close: "",
      },
    };
  },
  created: function() {
    this.getCoinList();
  },
  filters: {},
  watch: {
    searchValue(newVal, oldVal) {
      newVal = String(newVal).toLowerCase();
      this.encryptionData = this.coinAll.filter((item) => {
        return item.mvCoin
          .toString()
          .toLowerCase()
          .includes(newVal);
      });
    },
  },
  computed: {
    inputVals() {
      if (this.form.inputVal) {
        return (
          (this.form.inputVal * this.form.close) /
          this.forms.close
        ).toFixed(4);
      } else {
        return "0.00";
      }
    },
    closeCoin() {
      return (this.form.close / this.forms.close).toFixed(4);
    },
  },
  methods: {
    // 获取币种
    getCoinList() {
      this.spinShow = true;
      this.$http.get(this.host + this.api.flashExchange.coin).then((res) => {
        this.encryptionData = res.data.data;
        this.coinAll = res.data.data;
        this.form.url = this.coinAll[0].url;
        this.form.mvCoin = this.coinAll[0].mvCoin;
        this.form.mwBalance = this.coinAll[0].mwBalance;
        this.form.close = this.coinAll[0].close;
        this.forms.url = this.coinAll[0].url;
        this.forms.mvCoin = this.coinAll[0].mvCoin;
        this.forms.mwBalance = this.coinAll[0].mwBalance;
        this.forms.close = this.coinAll[0].close;
        this.spinShow = false;
      });
    },
    // 选择币种
    hand_coin(num) {
      this.marginModeModal = true;
      this.type = num;
    },
    hand_coinOne(item) {
      this.marginModeModal = false;
      if (this.type == 0) {
        this.form.url = item.url;
        this.form.mvCoin = item.mvCoin;
        this.form.mwBalance = item.mwBalance;
        this.form.close = item.close;
      } else if (this.type == 1) {
        this.forms.url = item.url;
        this.forms.mvCoin = item.mvCoin;
        this.forms.mwBalance = item.mwBalance;
        this.forms.close = item.close;
      }
    },
    // 闪兑
    handExchange() {
      if (!this.form.inputVal) {
        this.$Message.info(this.$t("dolphin.text5"));
        return;
      }
      if (this.form.inputVal <= 0) {
        this.$Message.info(this.$t("dolphin.text59"));
        return;
      }
      let params = {
        useCoin: this.form.mvCoin,
        gotCoin: this.forms.mvCoin,
        useAmount: this.form.inputVal,
      };
      this.$http
        .post(this.host + this.api.flashExchange.exchange, params)
        .then((res) => {
          if (res.body.code == 0) {
            this.$Message.info(res.body.message);
            this.form.inputVal = "";
            this.getCoinList();
          } else {
            this.$Message.info(res.body.message);
          }
        });
    },
    // 互换
    hand_exchange() {
      const temp = this.form;
      this.form = this.forms;
      this.forms = temp;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 50px;
  flex: 1 1 0%;
  background-color: #f5f5f5;
  color: #1c1c1c;
  min-width: 1080px;
  .content_all {
    margin: 40px auto;
    padding: 48px 0;
    width: 1080px;
    background-color: #fff;
    .title1 {
      font-weight: 700;
      font-size: 32px;
      color: #3d3d3d;
      padding: 0px 30px 0;
    }
    .money_content {
      margin: 52px auto;
      width: 588px;
      .row_one {
        font-size: 16px;
        color: #3d3d3d;
        margin-bottom: 19px;
      }
      .row_box {
        width: 588px;
        height: 137px;
        border-radius: 10px 10px 10px 10px;
        border: 2px solid #00bf6f;
        padding: 20px 30px 37px;
        box-sizing: border-box;
        .row_box_one {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #3d3d3d;
        }
        .row_box_two {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .input_num {
            width: 200px;
            border: none;
          }
          .coin_icon {
            width: 30px;
            height: 30px;
          }
          .img_coin {
            display: flex;
            align-items: center;
          }
        }
      }
      .img_center {
        width: 60px;
        margin: 50px auto;
      }
      .img_sd {
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
      .row_two {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
      }
      .row_btn {
        width: 588px;
        height: 60px;
        background: #00bf6f;
        border-radius: 10px 10px 10px 10px;
        color: #fff;
        text-align: center;
        line-height: 60px;
        margin-top: 60px;
        cursor: pointer;
      }
    }
  }
}
.coin_all {
  width: 549px;
  height: 61px;
  background: #fff;
  padding: 16px 10px;
  box-sizing: border-box;
  border-radius: 10px 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  .coin_all_left {
    display: flex;
    align-items: center;
    .coin_icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
.coin_all:hover {
  background-color: #ccc;
}
</style>
