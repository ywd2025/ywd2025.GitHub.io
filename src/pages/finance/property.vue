<template>
  <div class="finance_all_content">
    <section
      style="
        display: flex;
        height: 100%;
        flex-direction: column;
        padding-top: 36px;
      "
    >
      <div class="top_title_part">
        <h1 class="mr-4 text-2xl font-semibold leading-10 text-t1">
          {{ $t("new.finance.assetAccount") }}
        </h1>
        <div class="flex">
          <Button @click="goPage('/finance/deposit')" type="success">{{
            $t("new.universal.fill")
          }}</Button>
          <Button
            @click="goPage('/finance/withdraw')"
            type="success"
            style="margin: 0px 14px"
            >{{ $t("new.universal.withdraw") }}</Button
          >
          <Button @click="transferModal = true" type="success">{{
            $t("new.finance.transfer")
          }}</Button>
          <Button
            @click="goPage('/record/deposit')"
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
            style="
              line-height: 38px;
              font-size: 32px;
              margin-right: 8px;
              color: #1c1c1c;
            "
          >
            {{ !numberShow ? "*********" : `${allData.allUse} USDT` }}
          </span>
          <em class="pt-2 text-lg leading-5 text-t2 left-5">
            {{
              !numberShow ? "*********" : ` ≈ ${pricingStatus}${allData.allCNY}`
            }}
          </em>
        </div>
      </div>
      <div class="otherCoins">
        <Tabs value="加密貨幣">
          <TabPane :label="$t('new.universal.assets')" name="加密貨幣">
            <div class="otherCoins_content">
              <div class="filte_all">
                <Checkbox v-model="single" @on-change="handleCheckChange()">{{
                  $t("carouselItem.text206")
                }}</Checkbox>
                <Input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('carouselItem.text205')"
                  class="input_select"
                  clearable
                />
              </div>
              <Table
                :columns="encryptionColumns"
                :data="encryptionData"
                :no-data-text="$t('common.nodata')"
              >
                <template slot-scope="{ row, index }" slot="icon">
                  <Avatar :src="row.icon" />
                </template>
                <template slot-scope="{ row, index }" slot="allUSDT">
                  <span>{{
                    parseFloat(row.useUSDT) + parseFloat(row.frozenUSDT)
                  }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="useUSDT">
                  <span>{{ parseFloat(row.useUSDT) }}</span>
                </template>
                <template slot-scope="{ row, index }" slot="frozenUSDT">
                  <span>{{ parseFloat(row.frozenUSDT) }}</span>
                </template>
                <!-- <template slot-scope="{ row, index }" slot="action">
                  <Button v-if="row.isRecharge == 1" type="primary" size="small" style="margin-right: 5px">充幣</Button>
                  <Button v-if="row.isWithdraw == 1" type="primary" size="small" style="margin-right: 5px">提幣</Button>
                  <Button v-if="row.isTransfer == 1" type="primary" size="small" style="margin-right: 5px">劃轉</Button>
                </template> -->
              </Table>
            </div>
          </TabPane>
          <!-- <TabPane label="流動性資產" name="流動性資產">
            <div class="otherCoins_content">
              <Table :columns="flowColumns" :data="flowData">
                <template slot-scope="{ row }" slot="name">
                  <strong>icon</strong>
                  <strong>TRY</strong>
                  <strong>turkish</strong>
                  <strong>本土</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px"
                    >View</Button
                  >
                  <Button type="error" size="small">Delete</Button>
                </template>
              </Table>
            </div>
          </TabPane> -->
          <!-- <div slot="extra">
            <Checkbox v-model="single">隱藏0資產</Checkbox>
          </div> -->
        </Tabs>
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
      // 检索
      searchValue: "",
      single: false,
      // 總資產 全部數據
      allData: {},
      // 法幣
      // coinColumns: [
      //   {
      //     title: "幣種",
      //     slot: "name",
      //   },
      //   {
      //     title: "全部",
      //     key: "all",
      //   },
      //   {
      //     title: "可用",
      //     key: "can",
      //   },
      //   {
      //     title: "下單凍結",
      //     key: "down",
      //   },
      //   {
      //     title: "操作",
      //     slot: "action",
      //   },
      // ],
      coinData: [{}],
      // 加密貨幣
      encryptionColumns: [
        {
          title: this.$t("carouselItem.text90"),
          slot: "icon",
        },
        {
          title: this.$t("new.universal.currency"),
          key: "unit",
        },
        {
          title: this.$t("new.universal.all"),
          slot: "allUSDT",
        },
        {
          title: this.$t("new.finance.available"),
          slot: "useUSDT",
        },
        {
          title: this.$t("new.finance.freeze"),
          slot: "frozenUSDT",
        },
        // {
        //   title: "操作",
        //   slot: "action",
        // },
      ],
      encryptionData: [{}],
      // 流動性資產
      // flowColumns: [
      //   {
      //     title: "LP",
      //     slot: "LP",
      //   },
      //   {
      //     title: "數量",
      //     key: "num",
      //   },
      //   {
      //     title: "價值",
      //     key: "can",
      //   },
      //   {
      //     title: "幣種1",
      //     key: "down",
      //   },
      //   {
      //     title: "幣種2",
      //     key: "down2",
      //   },
      //   {
      //     title: "操作",
      //     slot: "action",
      //   },
      // ],
      // flowData: [{}],
      // 搜索
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    searchValue(newVal, oldVal) {
      newVal = String(newVal).toLowerCase();
      this.encryptionData = this.allData.data.filter((item) => {
        return item.coinName
          .toString()
          .toLowerCase()
          .includes(newVal);
      });
    },
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
      // 賬戶信息
      this.$http
        .get(this.host + this.api.finance.walletDetail, {
          params: {
            rateStr: this.$store.state.pricing,
            type: "0",
          },
        })
        .then((res) => {
          var resData = res.data.data;
          this.allData = resData;
          this.encryptionData = resData.data;
          this.loading = false;
        });
    },
    handleCheckChange() {
      if (this.single == true) {
        this.encryptionData = this.allData.data.filter(
          (item) => Number(item.useUSDT) != 0
        );
      } else {
        this.encryptionData = this.allData.data;
      }
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
  }
  .otherCoins {
    margin-top: 24px;
    .otherCoins_content {
      padding: 0 24px 0;
    }
  }
}
em {
  font-style: normal;
  padding-top: 8px;
  font-size: 18px;
  line-height: 18px;
}
.input_select {
  width: 250px;
  height: 35px;
  border-radius: 10px;
  text-indent: 1rem;
  color: #333;
}
.filte_all {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
