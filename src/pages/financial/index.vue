<!-- 废弃了   老版本理财   -->
<template>
  <div class="financial_content">
    <div class="header" :style="{ backgroundImage: `url(${banner})` }">
      <!-- <div class="header_content">
      </div> -->
      <div class="bottom">
        <!-- <div class="left">
          <div style="line-height: 22px;font-size: 14px;margin-bottom: 8px;">
            第四期 申購結束倒計時
          </div>
          <dl class="time_out_part">
            <dd class="time_part">
              <div class="time_num">00</div>
              <div class="time_text">天</div>
            </dd>
            <dd>:</dd>
            <dd class="time_part">
              <div class="time_num">00</div>
              <div class="time_text">時</div>
            </dd>
            <dd>:</dd>
            <dd class="time_part">
              <div class="time_num">00</div>
              <div class="time_text">分</div>
            </dd>
            <dd>:</dd>
            <dd class="time_part">
              <div class="time_num">00</div>
              <div class="time_text">秒</div>
            </dd>
          </dl>
        </div> -->
        <div class="right">
          <div style="width: 40%;text-align: left;">
            <span>{{$t('follow.universal.txt10')}}({{ coinName }})</span>
            <p>{{ dataDetail.totalEarning }}</p>
          </div>
          <div style="width: 30%;text-align: left;">
            <span>{{$t('carouselItem.text91')}}({{ coinName }})</span>
            <p>{{ dataDetail.yesterdayEarning }}</p>
          </div>
          <div style="width: 30%;text-align: right;">
            <span>{{$t('option.avaliablebalance')}}({{ coinName }})</span>
            <p>{{ dataDetail.mvUseBalance }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="finance_container">
      <div class="product_part">
        <div class="product_part_title part_title">
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
          <p class="title_text">
            {{$t('carouselItem.text92')}}
          </p>
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
        </div>

        <div class="selects_part">
          <div class="select_tabs">
            <div style="margin: 0 auto;width: 1200px;">
              <RadioGroup
                v-model="coinName"
                type="button"
                @on-change="handleCoin"
              >
                <Radio
                  :label="item.coinUnit"
                  v-for="(item, index) in resData"
                  :key="index"
                  >{{ item.coinUnit }}</Radio
                >
              </RadioGroup>
              <Button style="float: right;" type="primary" @click="goPage()"
                >{{$t('carouselItem.text58')}}</Button
              >
            </div>
          </div>
        </div>

        <!-- {{ dataDetail.newCoinCycleList }} -->
        <div class="product_content part_content">
          <div class="product_content_card" v-for="item in dataDetail.newCoinCycleList">
            <h6 class="flex items-center">
              <span
                style="font-size: 22px;;font-weight: 500;margin-right: 24px;"
                >{{ item.coinUnit }}</span
              >
              <span class="items_type">
                {{$t('carouselItem.text93')}}
              </span>
              <span style="margin-left: 4px;" class="items_type">
                {{$t('carouselItem.text94')}}
              </span>
            </h6>
            <div style="margin-top: 24px;" class="flex">
              <div style="width: 140px;">
                <p class="list_title">{{$t('carouselItem.text95')}}</p>
                <p class="list_number">{{ item.maxPercent }}%</p>
              </div>
              <div style="width: 140px;">
                <p class="list_title">{{$t('carouselItem.text96')}}</p>
                <p class="list_number">{{ item.minPercent }}%</p>
              </div>
              <div style="width: 130px;">
                <p class="list_title">{{$t('carouselItem.text97')}}</p>
                <p class="list_number">{{ item.needDay }} {{$t('activity.lockday')}}</p>
              </div>
              <div style="width: 140px;">
                <p class="list_title">{{$t('carouselItem.text98')}}</p>
                <p class="list_number">{{ item.realPercent }}%</p>
              </div>
              <div style="width: 140px;">
                <p class="list_title">{{$t('carouselItem.text99')}}</p>
                <p class="list_number">1 {{$t('exchange.dateTimeDay')}}</p>
              </div>
            </div>
            <Button class="button" type="success" @click="handlePurchase(item.id)">{{$t('carouselItem.text100')}}</Button>
          </div>

          <!-- <div class="product_content_card" style="margin-top: 20px;">
            <h6 class="flex items-center">
              <div style="height: 36px;width: 36px;margin-right: 16px;">
                <img
                  class=""
                  src="https://static.BIKA.pro/filesUpload/ex1/public/06d7255104cd42838be28a4e7d9c55e5_1659840025369.png"
                  alt="icon"
                  loading="lazy"
                />
              </div>
              <span
                style="font-size: 22px;;font-weight: 500;margin-right: 24px;"
                >USDT 第三期</span
              >
              <span class="items_type">
                定期
              </span>
              <span style="margin-left: 4px;" class="items_type">
                保本型
              </span>
            </h6>
            <div style="margin-top: 24px;" class="flex">
              <div style="width: 140px;">
                <p class="list_title">参考年化</p>
                <p class="list_number" style="color: rgb(119,255,97)">
                  +10.00%
                </p>
              </div>
              <div style="width: 130px;">
                <p class="list_title">期限</p>
                <p class="list_number">16天</p>
              </div>
              <div style="width: 140px;">
                <p class="list_title">申购总量</p>
                <p class="list_number">500,000</p>
              </div>
              <div style="width: 140px;position: relative;">
                <p class="list_title">申购进度</p>
                <p class="list_number">100%</p>
                <Progress
                  class="list_progress"
                  :percent="100"
                  hide-info
                  :stroke-color="['#108ee9', '#87d068']"
                  :stroke-width="2"
                />
              </div>
              <div style="width: 140px;">
                <p class="list_title">剩餘申購量</p>
                <p class="list_number">0</p>
              </div>
              <div style="width: 140px;">
                <p class="list_title">封閉期</p>
                <p class="list_number">04-19 - 05-03</p>
              </div>
            </div>
            <Button class="button" type="success">申購</Button>
          </div> -->
        </div>
      </div>

      <div class="step_part">
        <div class="step_part_title part_title">
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
          <p class="title_text">
            {{$t('carouselItem.text101')}}
          </p>
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
        </div>

        <div class="step_content part_content">
          <div
            style="position: relative;width: 220px;width: 220px;text-align: center;"
          >
            <span class="step_number">1</span>
            <p class="setp_text">{{$t('carouselItem.text102')}}</p>
            <p class="setp_time">2023-05-02 16:00</p>
            <img
              :src="$imgUrl + '/financial/step_icon.svg'"
              class="step_icon"
            />
          </div>
          <div
            style="position: relative;width: 220px;width: 220px;text-align: center;margin-left: 40px;"
          >
            <span class="step_number">1</span>
            <p class="setp_text">{{$t('carouselItem.text103')}}</p>
            <p class="setp_time">2023-05-05 16:00</p>
            <img
              :src="$imgUrl + '/financial/step_icon.svg'"
              class="step_icon"
            />
          </div>
          <div
            style="position: relative;width: 220px;width: 220px;text-align: center;margin-left: 40px;"
          >
            <span class="step_number">1</span>
            <p class="setp_text">{{$t('carouselItem.text104')}}</p>
            <p class="setp_time">2023-05-19 16:00</p>
            <img
              :src="$imgUrl + '/financial/step_icon.svg'"
              class="step_icon"
            />
          </div>
          <div
            style="position: relative;width: 220px;width: 220px;text-align: center;margin-left: 40px;"
          >
            <span class="step_number">1</span>
            <p class="setp_text">{{$t('carouselItem.text105')}}</p>
            <p class="setp_time">2023-05-20 16:00</p>
          </div>
        </div>
      </div>

      <div class="question_part">
        <div class="question_part_title part_title">
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
          <p class="title_text">
            {{$t('helpPage.helpPage_text2')}}
          </p>
          <img :src="$imgUrl + '/financial/title_icon.svg'" />
        </div>

        <div class="question_content part_content">
          <Collapse simple>
            <Panel name="1">
              {{$t('carouselItem.text108')}}
              <p slot="content">
                {{$t('carouselItem.text109')}}
              </p>
            </Panel>
            <Panel name="2">
              {{$t('carouselItem.text110')}}
              <p slot="content">
                {{$t('carouselItem.text111')}}
              </p>
            </Panel>
            <Panel name="3">
              {{$t('carouselItem.text112')}}
              <p slot="content">
                {{$t('carouselItem.text113')}}
              </p>
            </Panel>
            <Panel name="4">
              {{$t('carouselItem.text114')}}
              <p slot="content">
                {{$t('carouselItem.text115')}}
              </p>
            </Panel>
            <Panel name="5">
              {{$t('carouselItem.text116')}}
              <p slot="content">
                {{$t('carouselItem.text117')}}
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <FooterPart></FooterPart>

    <Modal v-model="purchaseModal" footer-hide :title="$t('carouselItem.text100')">
      <Form :model="formData" :label-width="80">
        <FormItem
          :label="$t('carouselItem.text106')"
        >
          <Input v-model="formData.buyAmount" placeholder=""> </Input>
        </FormItem>
        <FormItem>
          <Button
            :disabled="formData.buyAmount <= 0"
            type="primary"
            @click="handlePurchaseSubmit"
            long
            >{{ $t("buyCoin.universal.submit") }}</Button
          >
        </FormItem>
      </Form>
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
      banner: "",
      resData: {},
      coinName: "",
      dataDetail: {},
      formData: {
        ccId: null,
        buyAmount: 0,
      },
      purchaseModal: false,
    };
  },
  computed: {
    lang() {
      this.updateLangData();
      return this.$store.state.lang;
    },
    langPram() {
      return this.$store.state.lang;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取轮播图
      var paramBanner = {};
      (paramBanner["sysAdvertiseLocation"] = "PC_CYCLE"),
        this.$http
          .post(this.host + this.api.index.getBanner, paramBanner)
          .then((response) => {
            var res = response.body;
            this.banner = res.data[0].url;
          });
      this.getMemberZJWallet()
    },
    // 获取主要数据
    getMemberZJWallet() {
      this.$http
        .get(this.host + this.api.financial.getMemberZJWalletApi, {})
        .then((response) => {
          var res = response.body;
          this.resData = res.data
          this.coinName = res.data[0].coinUnit
          this.dataDetail = res.data[0]
        });
    },
    // 切换币种
    handleCoin(res) {
      for (const item of this.resData) {
        if (res === item.coinUnit) {
          this.coinName = item.coinUnit
          this.dataDetail = item
        }
      }
    },
    // 申购
    handlePurchase(id) {
      this.formData.ccId = id
      this.purchaseModal = true
    },
    handlePurchaseSubmit() {
      console.log(this.formData)
      if (this.formData.buyAmount > 0) {
        this.$http
          .post(this.host + this.api.financial.addWalletApi, this.formData)
          .then((response) => {
            var res = response.body;
            console.log(res)
            if (res.code == 0) {
              this.formData.buyAmount = 0
              this.purchaseModal = false
              this.$Message.success(res.message);
            } else {
              this.$Message.error(res.message);
            }
          });
        } else {
          this.$Message.error(this.$t('carouselItem.text107'));
        }
    },
    goPage() {
      this.$router.push("/orders/financial/earnings")
    }
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/common.less");
.financial_content {
  padding-top: 50px;
  background-color: rgb(17, 20, 23);
  color: #fff;
  .header {
    position: relative;
    height: 640px;
    width: 1200px;
    margin: 0 auto;
    // background-image: url("../../assets/images/financial/financial_bg.png");
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100%;
    .header_content {
      width: 1000px;
      margin: 0 auto;
      .top {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 540px;
        height: 332px;
        .header_content_rule {
          font-size: 12px;
          line-height: 16px;
          display: inline-flex;
          color: rgb(118, 155, 143);
          margin-top: 36px;
          .header_content_rule_text {
            color: rgb(118, 155, 143);
          }
        }
      }
    }
  }
  
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      padding: 14px 24px 20px;
      margin-right: 20px;
      width: 329px;
      border-radius: 16px;
      background-color: rgba(88, 124, 84, 0.2);
      color: #fff;
      .time_out_part {
        font-size: 12px;
        line-height: 16px;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        display: flex;
        .time_part {
          color: #000;
          background-repeat: no-repeat;
          background-position: top;
          background-size: contain;
          background-image: url("../../assets/images/financial/132.png");
          border-radius: 6px;
          overflow: hidden;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 50px;
          height: 48px;
          display: flex;
          .time_num {
            font-weight: 700;
            font-size: 22px;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 34px;
            display: flex;
          }
          .time_text {
            height: 14px;
            line-height: 14px;
            font-weight: 500;
            font-size: 12px;
            text-align: center;
            display: flex;
          }
        }
      }
    }
    .right {
      line-height: 22px;
      font-size: 14px;
      margin-bottom: 20px;
      display: flex;
      flex: 1 1 0%;
      align-items: center;
      padding: 25px 40px;
      border-radius: 16px;
      background-color: rgba(88, 124, 84, 0.2);
      color: #fff;
      span {
        line-height: 16px;
        font-size: 14px;
        border-bottom: 1px dashed #fff;
        color: #fff;
      }
      p {
        color: rgb(119, 255, 97);
        line-height: 38px;
        font-weight: 700;
        font-size: 32px;
        margin-top: 8px;
      }
    }
  }
  .finance_container {
    width: 1000px;
    margin: 0 auto;
    .part_title {
      margin-top: 60px;
      margin-bottom: 30px;
      display: flex;
      height: 34px;
      align-items: center;
      justify-content: center;
      .title_text {
        padding: 0 40px;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
      }
      .part_content {
        margin-top: 30px;
      }
    }
    .selects_part {
      box-sizing: border-box;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: #111417;
      .select_tabs {
        display: flex;
        box-shadow: 0px 0px 1px rgba(24, 26, 32, 0.1),
          0px 3px 6px rgba(71, 77, 87, 0.04), 0px 1px 2px rgba(24, 26, 32, 0.04);
        position: relative;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .select_filter {
        width: 1200px;
        margin: 0 auto;
        padding: 16px 0 17px;
        .select_filter_content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
}
.product_part {
  .product_content {
    .product_content_card {
      padding: 32px;
      border: 1px solid rgb(39, 40, 40);
      border-radius: 20px;
      position: relative;
      margin-top: 10px;
      .items_type {
        color: #6f6f6f;
        font-size: 12px;
        line-height: 16px;
        background-color: #99a1a81a;
        border-radius: 26px;
        justify-content: center;
        align-items: center;
        height: 20px;
        display: flex;
        padding: 8px;
      }
      .button {
        position: absolute;
        top: 66px;
        right: 32px;
      }
      .list_title {
        color: rgb(168, 168, 168);
        line-height: 14px;
        font-size: 12px;
      }
      .list_number {
        line-height: 20px;
        font-size: 18px;
        margin-top: 8px;
      }
      .list_progress {
        width: 100px;
        top: 9px;
        left: 0px;
        position: absolute;
      }
    }
  }
}
.step_part {
  .step_content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 62px;
    width: 1000px;
    .step_number {
      color: rgb(8, 23, 58);
      line-height: 48px;
      font-weight: 500;
      font-size: 25px;
      background-color: rgb(138, 255, 97);
      border-radius: 9999px;
      width: 48px;
      height: 48px;
      display: inline-block;
    }
    .setp_text {
      line-height: 20px;
      font-weight: 500;
      font-size: 16px;
      margin-top: 20px;
    }
    .setp_time {
      line-height: 14px;
      font-size: 12px;
      margin-top: 8px;
    }
    .step_icon {
      top: 20px;
      right: -35px;
      position: absolute;
    }
  }
}
.question_content {
  width: 1000px;
  margin: 42px 0 100px;
}
</style>
<style lang="less">
.financial_content {
  .finance_container {
    .selects_part {
      .ivu-radio-wrapper {
        background: #111417;
        color: #ffffff
      }
    }
  }
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #03C59E !important;
}
.question_content {
  .ivu-collapse-simple {
    background-color: #111417;
    border-color: #505050;
    .ivu-collapse-item {
      border-color: #505050;
      .ivu-collapse-header {
        color: #fff;
        height: 81px;
        line-height: 81px;
        font-size: 20px;
      }
      .ivu-collapse-content {
        background-color: #111417;
        color: #99a1a8;
      }
    }
  }
}
</style>
