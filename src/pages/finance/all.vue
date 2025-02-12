<template>
  <div class="finance_all_content">
    <section
      style="display: flex;height: 100%;flex-direction: column;padding-top: 36px;"
    >
      <div class="top_title_part">
        <h1 class="mr-4 text-2xl font-semibold leading-10 text-t1">
          {{ $t("new.finance.overview") }}
        </h1>
        <div class="flex">
          <Button @click="goPage('/finance/deposit')" type="success" class="">{{
            $t("new.universal.fill")
          }}</Button>
          <Button
            @click="goPage('/finance/withdraw')"
            type="success"
            style="margin: 0px 14px"
            >{{ $t("new.universal.withdraw") }}</Button
          >
          <Button @click="transferModal = true" type="success">
            {{ $t("new.finance.transfer") }}</Button
          >
          <Button
            @click="goPage('/record/all')"
            type="success"
            style="margin-left: 14px"
            >{{ $t("new.finance.financialRecords") }}</Button
          >

          <!-- 劃轉對話框 -->
          <Modal
            v-model="transferModal"
            :title="$t('new.finance.transfer')"
            :footer-hide="true"
          >
            <transferModal
              @closeModal="closeModal"
              v-if="transferModal"
            ></transferModal>
          </Modal>
        </div>
      </div>
      <div class="top_title_part_detail">
        <div class="flex_center_start">
          <h5 class="text-base font-medium text-t2">
            {{ $t("new.finance.totalValuation") }}
          </h5>
          <Icon
            @click.prevent="numberShow = false"
            v-if="numberShow"
            type="md-eye"
            class="eyesIcon"
          />
          <Icon
            @click.prevent="numberShow = true"
            v-else
            type="md-eye-off"
            class="eyesIcon"
          />
        </div>
        <div class="top_title_part_detail_num" data-private="">
          <span
            style="line-height: 38px;font-size: 32px;margin-right: 8px;color: #1c1c1c;"
          >
            {{ !numberShow ? "*********" : `${allData.all} USDT` }}
          </span>
          <em class="pt-2 text-lg leading-5 text-t2 left-5">
            {{
              !numberShow ? "*********" : ` ≈ ${pricingStatus}${allData.allCNY}`
            }}
          </em>
        </div>
      </div>

      <div class="flex bottom_part">
        <div style="flex: 1 1 0%;">
          <h5>
            {{ $t("new.finance.myAssets") }}
          </h5>
          <div class="content_number">
            <h6>{{ $t("new.finance.assetAccount") }}</h6>
            <div class="content_number_number">
              <span
                style="color: #1c1c1c;line-height: 28px;font-weight: 500;font-size: 25px;margin-right: 8px;"
              >
                {{
                  !numberShow ? "*********" : `${allData.data[0].allUSDT} USDT`
                }}
              </span>
              <em class="text-base text-t2">{{
                !numberShow
                  ? "*********"
                  : ` ≈ ${pricingStatus}${allData.data[0].allCNY}`
              }}</em>
            </div>
            <router-link to="/finance/property" class="content_number_arrow">
              <Icon color="#c0c0c0" size="24" type="ios-arrow-forward" />
            </router-link>
          </div>
          <div class="content_number">
            <h6>{{ $t("new.universal.cashAccount") }}</h6>
            <div class="content_number_number">
              <span
                style="color: #1c1c1c;line-height: 28px;font-weight: 500;font-size: 25px;margin-right: 8px;"
              >
                {{
                  !numberShow ? "*********" : `${allData.data[1].allUSDT} USDT`
                }}
              </span>
              <em class="text-base text-t2">{{
                !numberShow
                  ? "*********"
                  : ` ≈ ${pricingStatus}${allData.data[1].allCNY}`
              }}</em>
            </div>
            <router-link to="/finance/spot" class="content_number_arrow">
              <Icon color="#c0c0c0" size="24" type="ios-arrow-forward" />
            </router-link>
          </div>
          <div class="content_number">
            <h6>{{ $t("new.universal.contractAccount") }}</h6>
            <div class="content_number_number">
              <span
                style="color: #1c1c1c;line-height: 28px;font-weight: 500;font-size: 25px;margin-right: 8px;"
              >
                {{
                  !numberShow ? "*********" : `${allData.data[2].allUSDT} USDT`
                }}
              </span>
              <em class="text-base text-t2">{{
                !numberShow
                  ? "*********"
                  : ` ≈ ${pricingStatus}${allData.data[2].allCNY}`
              }}</em>
            </div>
            <router-link to="/finance/futures" class="content_number_arrow">
              <Icon color="#c0c0c0" size="24" type="ios-arrow-forward" />
            </router-link>
          </div>
          <div class="content_number">
            <h6>{{ $t("carouselItem.text62") }}</h6>
            <div class="content_number_number">
              <span
                style="color: #1c1c1c;line-height: 28px;font-weight: 500;font-size: 25px;margin-right: 8px;"
              >
                {{
                  !numberShow ? "*********" : `${allData.data[3].allUSDT} USDT`
                }}
              </span>
              <em class="text-base text-t2">{{
                !numberShow
                  ? "*********"
                  : ` ≈ ${pricingStatus}${allData.data[3].allCNY}`
              }}</em>
            </div>
            <router-link to="/finance/follow" class="content_number_arrow">
              <Icon color="#c0c0c0" size="24" type="ios-arrow-forward" />
            </router-link>
          </div>
        </div>

        <!-- <div style="width: 456px;border-left: 1px solid #eeeeee;padding: 24px;">
          <div class="flex_center_between">
            <span class="text-base font-medium">近期充提交易</span>
            <router-link
              to="/record/deposit"
              class="inline-flex items-center text-t2"
            >
              查看全部
              <Icon type="ios-arrow-forward" />
            </router-link>
          </div>
          <div class="flex flex-col items-center justify-center pt-[114px]">
            <Table
              :columns="recordColumns"
              :data="recordData"
              style="margin-top: 10px;"
            >
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small">詳情</Button>
              </template>
            </Table>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import transferModal from "./components/transferModal.vue";

export default {
  components: {
    transferModal,
  },
  data() {
    return {
      // 計價方式
      pricingStatus: localStorage.getItem("pricingStatus"),
      // 小眼睛
      numberShow: false,
      // 劃轉彈窗
      transferModal: false,
      allData: {},
      // recordData: [],
      recordColumns: [
        {
          title: this.$t("new.universal.time"),
          key: "createTime",
        },
        {
          title: this.$t("new.universal.currency"),
          key: "symbol",
        },
        {
          title: this.$t("new.universal.quantity"),
          key: "amount",
        },
      ],
    };
  },
  computed: {
    // 汇率相关
    allRate() {
      return this.$store.state.allRate;
    },
    pricingStatusRate() {
      return this.$store.state.pricingStatusRate;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    // 監聽關閉彈窗
    closeModal() {
      this.transferModal = false;
      this.init();
    },
    goPage(addr) {
      this.$router.push({
        path: addr,
      });
    },
    init() {
      this.loading = true;
      // 資產總覽
      this.$http
        .get(this.host + this.api.finance.allFinance, {
          params: {
            rateStr: localStorage.getItem("pricingStatus"),
          },
        })
        .then((res) => {
          var resData = res.data.data;
          this.allData = resData;
          this.loading = false;
        });
      // 近期充提交易
      // this.$http
      //   .get(this.host + this.api.finance.allFinanceRecord, {})
      //   .then((res) => {
      //     // console.log(res);
      //     var resData = res.data.data.content;
      //     console.log(resData);
      //     this.recordData = resData;
      //     this.loading = false;
      //   });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.eyesIcon {
  font-size: 16px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  text-align: center;
  display: inline-block;
  position: relative;
  color: #6f6f6f;
  cursor: pointer;
  margin-left: 6px;
}
.finance_all_content {
  min-width: 975px;
  height: 100%;
  .top_title_part {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    h1 {
      color: #1c1c1c;
      line-height: 40px;
      font-weight: 600;
      font-size: 24px;
      margin-right: 16px;
    }
    .flex {
      button {
        height: 40px;
        width: 96px;
      }
    }
  }
  .top_title_part_detail {
    margin-top: 32px;
    padding: 0 24px 40px;
    border-bottom: 1px solid #eeeeee;
    .top_title_part_detail_num {
      display: flex;
      align-items: center;
      margin-top: 16px;
      font-weight: 500;
      color: #6f6f6f;
    }
  }
  .bottom_part {
    h5 {
      padding: 24px 24px 12px;
      color: #1c1c1c;
      line-height: 20px;
      font-weight: 500;
      font-size: 16px;
    }
    .content_number {
      padding: 36px 24px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      h6 {
        color: #6f6f6f;
        line-height: 20px;
        font-weight: 500;
        font-size: 16px;
      }
      .content_number_number {
        display: flex;
        align-items: center;
        margin-top: 20px;
      }
      .content_number_arrow {
        background-color: #f7f7fb;
        cursor: pointer;
        border-radius: 9999px;
        padding-left: 12px;
        width: 44px;
        height: 44px;
        display: flex;
        position: absolute;
        top: 50%;
        right: 24px;
        align-items: center;
      }
    }
  }
}
em {
  font-style: normal;
  padding-top: 8px;
  font-size: 18px;
  line-height: 18px;
}
</style>
