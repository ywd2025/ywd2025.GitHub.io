<template>
  <div class="content">
    <div class="content_all">
      <div class="title1_gopage">
        <div class="title1">{{ $t("dolphin.text13") }}</div>
        <img
          :src="$imgUrl + '/lcGo.png'"
          alt=""
          style="width: 36px;height: 36px;margin-right: 54px;"
          @click="go_page()"
        />
      </div>
      <div class="coin_row">
        <div class="allCoinmax">
          <div
            :class="[index == numList ? 'box_two' : 'box_one']"
            class="Coinmax_box"
            v-for="(item, index) in coinAll.item"
            :key="index"
            @click="hand_interest(index, item)"
          >
            <div class="coinday">
              {{ item.needDay }}{{ $t("exchange.dateTimeDay") }}
            </div>
            <div class="coinreal">
              {{ (item.realPercent * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
        <div class="row_two">
          <div class="row_two_title">{{ $t("buyCoin.universal.number") }}</div>
          <div class="row_two_input">
            <Input
              v-model="input_num"
              :placeholder="`${$t('dolphin.text19')}${amount}`"
              class="input_number"
            />
            <div class="row_two_input_right">
              <span class="input_right_coin">{{ allMax }}</span>
              <span class="input_right_btn" @click="hand_max()">{{
                $t("new.finance.operate.biggest")
              }}</span>
            </div>
          </div>
          <div class="row_two_money">
            <span style="margin-right: 30px;">
              {{ $t("option.avaliablebalance") }}：{{
                Number(coinAll.wallet).toFixed(4)
              }}{{ allMax }}
            </span>
            <span>
              {{ $t("dolphin.text17") }}：{{
                $t("new.universal.assetAccounts")
              }}
            </span>
          </div>
        </div>
        <div class="row_three">
          <div class="row_three_title">{{ $t("dolphin.text18") }}</div>
          <div class="row_three_input">
            <div>
              {{ $t("dolphin.text20") }}
            </div>
            <div class="row_three_right">
              <span style="margin-right: 12px;">{{ allCoinMoney }}</span>
              <span class="input_right_coin">{{ allMax }}</span>
            </div>
          </div>
          <div class="row_three_ll">
            {{ $t("dolphin.text21") }}：{{ (interest * 100).toFixed(2) }}%
          </div>
          <div class="row_three_timeClom">
            <div>
              <img
                :src="$imgUrl + '/timeClom.png'"
                alt=""
                style="width: 9px;height: 100px;margin: 10px 20px;"
              />
            </div>
            <div class="row_three_timeClom_right">
              <div class="timeClom_right_all">
                <div class="span_left">{{ $t("dolphin.text22") }}</div>
                <div class="span_right">{{ formattedDate }} 08:00</div>
              </div>
              <div class="timeClom_right_all">
                <div class="span_left">{{ $t("dolphin.text23") }}</div>
                <div class="span_right">{{ formattedDate1 }} 08:00</div>
              </div>
              <div class="timeClom_right_all">
                <div class="span_left">{{ $t("dolphin.text24") }}</div>
                <div class="span_right">{{ formattedDate1 }} 08:00</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_rul">{{ $t("dolphin.text25") }}</div>
        <div class="bottom_rul">{{ $t("dolphin.text26") }}</div>
        <div class="btn_bottom">
          <div>
            <Checkbox v-model="single" @on-change="check_box"> </Checkbox>
            <span>{{ $t("dolphin.text28") }}</span>
            <span
              style="color: #00bf6f;cursor: pointer;"
              @click="hand_rule('coin_cycle_rule')"
              >{{ $t("dolphin.text29") }}</span
            >
          </div>
          <div class="btn_bottom_submit" @click="hand_submit">
            {{ $t("dolphin.text27") }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>
    <Modal v-model="ruleontent">
      <div
        v-html="content"
        style="white-space: normal;word-break: break-all;margin-top: 20px;"
      ></div>
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
      allMax: "",
      numList: 0,
      coinAll: [],
      input_num: "",
      input_money: "",
      coinInterest: [],
      single: false,
      formattedDate: "",
      formattedDate1: "",
      ruleontent: false,
      content: [],
      amount:'',
    };
  },
  created: function() {
    this.allMax = this.$route.query.item;
    this.getCoinList();
  },
  filters: {},
  watch: {},
  computed: {
    interest() {
      return this.coinInterest.realPercent;
    },
    allCoinMoney() {
      if (this.input_num) {
        return (
          ((this.interest * this.input_num) / 30) * this.coinInterest.needDay
        );
      } else {
        return 0;
      }
    },
  },
  methods: {
    hand_interest(num, item) {
      this.numList = num;
      this.coinInterest = item;
      this.amount = item.amount
      this.getdata1(this.coinInterest.needDay);
    },
    getCoinList() {
      this.$http
        .post(this.host + this.api.flashExchange.cycleList, {
          unit: this.allMax,
        })
        .then((res) => {
          this.coinAll = res.data.data[0];
          this.coinInterest = res.data.data[0].item[0];
          this.amount = this.coinInterest.amount
          this.getdata(1);
          this.getdata1(this.coinInterest.needDay);
        });
    },
    hand_max() {
      this.input_num = this.coinAll.wallet;
    },
    check_box(e) {
      this.single = e;
    },
    hand_submit() {
      if (this.input_num < this.amount) {
        this.$Message.info(this.$t("dolphin.text31")  + this.amount);
        return;
      }
      if (!this.single) {
        this.$Message.info(this.$t("dolphin.text30"));
        return;
      }
      this.$http
        .post(this.host + this.api.flashExchange.addCoinList, {
          ccId: this.coinInterest.id,
          buyAmount: this.input_num,
        })
        .then((res) => {
          if (res.body.code == 0) {
            // this.$Message.info(res.body.message);
            this.$router.push({
              path: "/financingUccess",
              query: { item: this.input_num + this.allMax },
            });
          } else {
            this.$Message.info(res.body.message);
          }
        });
    },
    hand_rule(api) {
      this.$http
        .post(this.host + this.api.index.getDictionary, { lable: api })
        .then((res) => {
          this.content = res.data.data.html;
          this.ruleontent = true;
        });
    },
    getdata(num) {
      const currentDate = new Date();
      // 创建一个新的日期对象，基于当前日期
      const nextDate = new Date(currentDate);
      // 将日期加一天
      nextDate.setDate(currentDate.getDate() + num);
      // 格式化日期为 YYYY-MM-DD
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
      const day = String(nextDate.getDate()).padStart(2, "0");
      this.formattedDate = `${year}-${month}-${day}`;
    },
    getdata1(num) {
      const currentDate = new Date();
      // 创建一个新的日期对象，基于当前日期
      const nextDate = new Date(currentDate);
      // 将日期加多天
      nextDate.setDate(currentDate.getDate() + num);
      // 格式化日期为 YYYY-MM-DD
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
      const day = String(nextDate.getDate()).padStart(2, "0");
      this.formattedDate1 = `${year}-${month}-${day}`;
    },
    go_page() {
      this.$router.push({
        path: "/interestNum",
        query: { item: this.allMax },
      });
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
    .title1_gopage {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title1 {
        font-weight: 700;
        font-size: 32px;
        color: #3d3d3d;
        padding: 0px 30px 0;
      }
    }
    .coin_row {
      margin: 52px auto;
      width: 772px;
      .allCoinmax {
        width: 772px;
        height: 170px;
        background: linear-gradient(270deg, #fbf9ed 0%, #eef4fc 100%);
        border-radius: 10px 10px 10px 10px;
        padding: 35px 39px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .Coinmax_box {
          width: 130px;
          height: 100px;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid #e2e0e0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          cursor: pointer;
          .coinday {
            font-weight: 700;
            font-size: 15px;
            color: #3d3d3d;
            margin-bottom: 13px;
          }
          .coinreal {
            font-weight: 700;
            font-size: 20px;
            color: #03C59E;
          }
        }
        .box_one {
          border: 1px solid #e2e0e0;
        }
        .box_two {
          border: 2px solid #03bc70;
        }
        .Coinmax_box:hover {
          border: 2px solid #03bc70;
        }
      }
      .row_two {
        margin-top: 45px;
        width: 772px;
        height: 170px;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #e2e0e0;
        padding: 25px;
        box-sizing: border-box;
        .row_two_title {
          font-weight: 700;
          font-size: 20px;
          color: #3d3d3d;
          margin-bottom: 20px;
        }
        .row_two_input {
          position: relative;
          .input_number {
            width: 722px;
            height: 45px;
          }
          .row_two_input_right {
            position: absolute;
            top: 5px;
            right: 20px;
            .input_right_coin {
              font-weight: 700;
              font-size: 14px;
              color: #000000;
              margin-right: 14px;
            }
            .input_right_btn {
              cursor: pointer;
              font-weight: 700;
              font-size: 14px;
              color: #03bc70;
            }
          }
        }
        .row_two_money {
          padding: 7px 20px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          span {
            font-weight: 400;
            font-size: 14px;
            color: #979797;
          }
        }
      }
      .row_three {
        width: 772px;
        height: 308px;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #e2e0e0;
        padding: 25px;
        box-sizing: border-box;
        margin-top: 41px;
        .row_three_title {
          font-weight: 700;
          font-size: 20px;
          color: #3d3d3d;
          margin-bottom: 20px;
        }
        .row_three_input {
          width: 722px;
          height: 32px;
          background: #f4f4f4;
          border-radius: 6px 6px 6px 6px;
          border: 1px solid #e7e4e4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 20px;
          box-sizing: border-box;
          .row_three_right {
            font-weight: 700;
            font-size: 14px;
            color: #03bc70;
          }
        }
        .row_three_ll {
          padding: 5px 20px;
          box-sizing: border-box;
          font-weight: 400;
          font-size: 14px;
          color: #979797;
        }
        .row_three_timeClom {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .row_three_timeClom_right {
            padding-right: 20px;
            box-sizing: border-box;
            .timeClom_right_all {
              width: 650px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 15px 0 25px;
              .span_left {
                font-weight: 400;
                font-size: 14px;
                color: #6d6d6d;
              }
              .span_right {
                font-weight: 400;
                font-size: 14px;
                color: #000000;
              }
            }
          }
        }
      }
      .bottom_rul {
        font-weight: 500;
        font-size: 14px;
        color: #6d6d6d;
        margin-top: 12px;
      }
      .btn_bottom {
        width: 772px;
        margin-top: 41px;
        padding: 0 92px;
        box-sizing: border-box;
        .btn_bottom_submit {
          width: 588px;
          height: 60px;
          background: #00bf6f;
          border-radius: 10px 10px 10px 10px;
          color: #fff;
          text-align: center;
          line-height: 60px;
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
