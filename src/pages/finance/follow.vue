<template>
  <div class="finance_all_content">
    <section
      style="display: flex;height: 100%;flex-direction: column;padding-top: 36px;"
    >
      <div class="top_title_part">
        <h1 class="mr-4 text-2xl font-semibold leading-10 text-t1">
          {{ $t("carouselItem.text62") }}
        </h1>
        <div class="flex">
          <Button @click="transferModal = true" type="success" class="">{{
            $t("new.finance.transfer")
          }}</Button>
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
            {{ $t("carouselItem.text63") }}
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
            {{ !numberShow ? "*********" : `${allData.allUse} USDT` }}
          </span>
          <em class="pt-2 text-lg leading-5 text-t2 left-5">
            {{
              !numberShow ? "*********" : ` ≈ ${pricingStatus}${allData.allCNY}`
            }}
          </em>
        </div>
      </div>

      <div class="coinList">
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("new.universal.assets") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{ !numberShow ? "*********" : `${allData.all} USDT` }}</span>
          </dd>
          <dd class="coin_cn">
            <span>{{
              !numberShow
                ? "*********"
                : ` ≈ ${pricingStatus} ${allData.allCNY}`
            }}</span>
          </dd>
        </dl>
        <dl class="coinData">
          <dt class="coin_title">
            <span class="">{{ $t("option.avaliablebalance") }}</span>
          </dt>
          <dd class="coin_number">
            <span>{{ !numberShow ? "*********" : `${allData.all} USDT` }}</span>
          </dd>
          <dd class="coin_cn">
            <span>{{
              !numberShow
                ? "*********"
                : ` ≈ ${pricingStatus} ${allData.allCNY}`
            }}</span>
          </dd>
        </dl>
      </div>

      <div class="otherCoins">
        <Tabs @on-click="handleTabs" value="1">
          <TabPane :label="$t('follow.follower.txt2')" name="1">
            <Table
              :columns="encryptionColumn"
              :data="followList"
              :no-data-text="$t('common.nodata')"
            >
              <template slot-scope="{ row, index }" slot="icon">
                <div class="table_coin_name">
                  <p class="flex">
                    <a
                      href="/zh-tw/futures/ETHUSDT"
                      style="font-size: 18px;line-height: 20px;color: #1c1c1c;"
                    >
                      {{ row.symbol }}
                    </a>
                  </p>
                  <p style="margin-top: 6px;">
                    <span class="lever">{{ row.leverage }}x</span>
                    <span style="color: #6f6f6f;">
                      {{ $t("follow.universal.txt3") }}・{{
                        row.patterns === "CROSSED"
                          ? $t("follow.universal.txt4")
                          : $t("follow.universal.txt5")
                      }}
                    </span>
                  </p>
                </div>
              </template>
              <template slot-scope="{ row, index }" slot="allUSDT">
                <span>{{ time_filter(row.createTime) }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="useUSDT">
                <p class="">
                  <!-- 开仓价格 -->
                  {{ row.openOrderPrice }}
                </p>
                <p style="margin-top: 8px;color: #6f6f6f">
                  <!-- 标记价格 -->
                  {{ row.tradedPrice }}
                </p>
              </template>
              <template slot-scope="{ row, index }" slot="useUSDTs">
                <div>
                  <!-- 持仓量(张) -->
                  <p class="">{{ row.volume }}</p>
                  <!-- 保证金 -->
                  <p style="margin-top: 8px;color: #6f6f6f">
                    {{ row.principalAmount }}
                  </p>
                </div>
              </template>
              <template slot-scope="{ row, index }" slot="frozenUSDT">
                <!-- 收益率 -->
                <span v-if="row.direction === 'BUY'">
                  <!-- 买入开多 -->
                  {{
                    (
                      ((row.currentPrice / row.openOrderPrice - 1) *
                        row.volume *
                        row.shareNumber *
                        row.openOrderPrice) /
                      row.principalAmount
                    ).toFixed(2) + "%"
                  }}
                </span>
                <span v-else>
                  <!-- 卖出开空 -->
                  {{
                    (
                      ((1 - row.currentPrice / row.openOrderPrice) *
                        row.volume *
                        row.shareNumber *
                        row.openOrderPrice) /
                      row.principalAmount
                    ).toFixed(2) + "%"
                  }}
                </span>
              </template>
              <template slot-scope="{ row, index }" slot="frozenUSDTs">
                <!-- 未实现盈亏(USDT) => 收益 -->
                <span v-if="row.direction === 'BUY'">
                  <!-- 买入开多 -->
                  <!-- 多仓合约收益=（（当前价格/开仓均价）-1）* 张数 * 合约面值*开仓均价 -->
                  <!-- 多仓合约收益=（（item.currentPrice/item.openOrderPrice-1）* item.volume * item.shareNumber * item.openOrderPrice -->
                  {{
                    (
                      (row.currentPrice / row.openOrderPrice - 1) *
                      row.volume *
                      row.shareNumber *
                      row.openOrderPrice
                    ).toFixed(2)
                  }}
                </span>
                <span v-else>
                  <!-- 卖出开空 -->
                  <!-- 空仓合约收益=（1-（当前价格/开仓均价））* 张数* 合约面值*开仓均价 -->
                  <!-- 空仓合约收益=（1-（item.currentPrice/item.openOrderPrice * item.volume * item.shareNumber * item.openOrderPrice -->
                  {{
                    (
                      (1 - row.currentPrice / row.openOrderPrice) *
                      row.volume *
                      row.shareNumber *
                      row.openOrderPrice
                    ).toFixed(2)
                  }}
                </span>
              </template>
              <template slot-scope="{ row, index }" slot="frozenUSDTss">
                <!-- 跟单开仓 => 手续费 = item.openFee -->
                <!-- 跟单开仓 => 开仓保证金 = 合约最低需要保证金 = item.principalAmount -->
                <!-- 保证金率=（合约收益 + 保证金 - 开仓手续费）/保证金 -->
                <!-- 保证金率=（合约收益 + item.principalAmount - item.openFee)/item.principalAmount -->
                <!-- 预估强评价 -->
                <span v-if="row.direction === 'BUY'">
                  <!-- 买入开多 多仓预估强平价格=开仓价格*（1+[合约最低保证金率*开仓保证金+平仓手续费-保证金]/（合约面值 *张数*开仓价格）) -->
                  <!-- 多仓预估强平价格= item.openOrderPrice *（1+[((((item.currentPrice / item.openOrderPrice - 1) *item.volume *item.shareNumber *item.openOrderPrice) + item.principalAmount - item.openFee)/item.principalAmount)*item.principalAmount+item.openFee-item.principalAmount]/（item.shareNumber * item.volume * item.openOrderPrice）) -->
                  {{
                    (
                      row.openOrderPrice *
                      (1 +
                        [
                          (((1 - row.currentPrice / row.openOrderPrice) *
                            row.volume *
                            row.shareNumber *
                            row.openOrderPrice +
                            row.principalAmount -
                            row.openFee) /
                            row.principalAmount) *
                            row.principalAmount +
                            row.openFee -
                            row.principalAmount,
                        ] /
                          (row.shareNumber * row.volume * row.openOrderPrice))
                    ).toFixed(2)
                  }}
                </span>
                <span v-else>
                  <!-- 卖出开空 空仓预估强平价格=开仓价格*（1-[合约最低保证金率*开仓保证金+平仓手续费-保证金]/（合约面值 *张数*开仓价格）) -->
                  <!--空仓预估强平价格=开仓价格*（1-[合约最低保证金率*开仓保证金+平仓手续费-保证金]/（合约面值 *张数*开仓价格）) -->
                  {{
                    (
                      row.openOrderPrice *
                      (1 -
                        [
                          (((row.currentPrice / row.openOrderPrice - 1) *
                            row.volume *
                            row.shareNumber *
                            row.openOrderPrice +
                            row.principalAmount -
                            row.openFee) /
                            row.principalAmount) *
                            row.principalAmount +
                            row.openFee -
                            row.principalAmount,
                        ] /
                          (row.shareNumber * row.volume * row.openOrderPrice))
                    ).toFixed(2)
                  }}
                </span>
              </template>
            </Table>
          </TabPane>
          <TabPane :label="$t('follow.follower.txt10')" name="2">
            <Table
              :columns="encryptionColumns"
              :data="followList"
              :no-data-text="$t('common.nodata')"
            >
              <template slot-scope="{ row, index }" slot="icon">
                <div class="table_coin_name">
                  <p class="flex">
                    <a
                      href="/zh-tw/futures/ETHUSDT"
                      style="font-size: 18px;line-height: 20px;color: #1c1c1c;"
                    >
                      {{ row.symbol }}
                    </a>
                  </p>
                  <p style="margin-top: 6px;">
                    <span class="lever">{{ row.leverage }}x</span>
                    <span style="color: #6f6f6f;">
                      {{ $t("follow.universal.txt3") }}・{{
                        row.patterns === "CROSSED"
                          ? $t("follow.universal.txt4")
                          : $t("follow.universal.txt5")
                      }}
                    </span>
                  </p>
                </div>
              </template>
              <template slot-scope="{ row, index }" slot="allUSDT">
                <span>{{ time_filter(row.createTime) }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="useUSDT">
                <img
                  :src="row.traderAvatar"
                  style="width: 40px;height: 40px;"
                />
              </template>
              <template slot-scope="{ row, index }" slot="useUSDTs">
                <span>{{ row.traderUsername }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="frozenUSDT">
                <!-- 收益 -->
                <span v-if="row.direction === 'BUY'">
                  <!-- 买入开多 -->
                  {{
                    (
                      (row.currentPrice / row.tradedPrice - 1) *
                      row.volume *
                      row.shareNumber *
                      row.tradedPrice
                    ).toFixed(2)
                  }}
                </span>
                <span v-else>
                  <!-- 卖出开空 -->
                  {{
                    (
                      (1 - row.currentPrice / row.tradedPrice) *
                      row.volume *
                      row.shareNumber *
                      row.tradedPrice
                    ).toFixed(2)
                  }}
                </span>
              </template>
              <template slot-scope="{ row, index }" slot="frozenUSDTs">
                <!-- 收益率 -->
                <span v-if="row.principalAmount == 0">
                  0%
                </span>
                <span v-else>
                  <span v-if="row.direction === 'BUY'">
                    <!-- 买入开多 -->
                    {{
                      (
                        ((row.currentPrice / row.tradedPrice - 1) *
                          row.volume *
                          row.shareNumber *
                          row.tradedPrice) /
                        row.principalAmount
                      ).toFixed(2) + "%"
                    }}
                  </span>
                  <span v-else>
                    <!-- 卖出开空 -->
                    {{
                      (
                        ((1 - row.currentPrice / row.tradedPrice) *
                          row.volume *
                          row.shareNumber *
                          row.tradedPrice) /
                        row.principalAmount
                      ).toFixed(2) + "%"
                    }}
                  </span>
                </span>
              </template>
            </Table>
          </TabPane>
        </Tabs>
        <div style="text-align: center; width: 100%; margin-top: 20px;">
          <Page
            class="pages"
            :total="total"
            :current="pageNo"
            :page-size="10"
            @on-change="pageChange"
          />
        </div>
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
      // 分页信息
      total: 0,
      pageNo: 1,
      pageSize: 10,
      currentPage: 1,

      // 計價方式
      pricingStatus: localStorage.getItem("pricingStatus"),
      // 小眼睛
      numberShow: false,
      // 劃轉彈窗
      transferModal: false,
      // 表格type
      type: 0,
      // 總值
      allData: {},
      // 表格數據
      dataList: [],
      // 倉位
      // 历史/当前跟单列表
      followList: [],
      encryptionColumns: [
        {
          title: this.$t("follow.universal.positions"),
          slot: "icon",
        },
        {
          title: this.$t("follow.universal.createTime"),
          slot: "allUSDT",
        },
        {
          title: this.$t("follow.universal.txt6"),
          slot: "useUSDT",
        },
        {
          title: this.$t("follow.universal.txt7"),
          slot: "useUSDTs",
        },
        {
          title: this.$t("follow.universal.txt8"),
          slot: "frozenUSDT",
        },
        {
          title: this.$t("follow.universal.earning"),
          slot: "frozenUSDTs",
        },
      ],
      encryptionColumn: [
        {
          title: this.$t("follow.universal.positions"),
          slot: "icon",
        },
        {
          title: this.$t("follow.universal.positionsTime"),
          slot: "allUSDT",
        },
        {
          title:
            this.$t("exchange.openprice") +
            "|" +
            this.$t("carouselItem.text57"),
          slot: "useUSDT",
        },
        {
          title:
            this.$t("follow.universal.openInterest") +
            "|" +
            this.$t("follow.universal.earnestMoney"),
          slot: "useUSDTs",
        },
        {
          title: this.$t("follow.universal.earning"),
          slot: "frozenUSDT",
        },
        {
          title: this.$t("follow.universal.txt1") + "(USDT)",
          slot: "frozenUSDTs",
        },
        {
          title: this.$t("follow.universal.txt2"),
          slot: "frozenUSDTss",
        },
      ],
      currentTab: "0",
    };
  },
  mounted() {
    this.init();
    // this.getTableDate()
  },
  methods: {
    // 頁面跳轉
    goPage() {
      this.$router.push("/orders/follow/transaction");
    },
    // 監聽關閉彈窗
    closeModal() {
      this.transferModal = false;
      this.init();
    },
    handleTabsType(name) {
      this.type = name;
      this.type = name;
      if (this.type == 0) {
        // 倉位
      } else {
        // 資產
        this.dataList = this.allData.data;
      }
    },
    init() {
      this.loading = true;
      this.$http
        .get(this.host + this.api.finance.walletDetail, {
          params: {
            rateStr: localStorage.getItem("pricingStatus"),
            type: "9",
          },
        })
        .then((res) => {
          this.allData = res.data.data;
          this.loading = false;
        });
      // 当前跟单
      this.getCurrentFollow();
    },
    // 控制tab页
    handleTabs(value) {
      this.currentTab = value;
      if (this.currentTab === "1") {
        // 当前跟单
        this.getCurrentFollow();
      } else {
        // 历史跟单
        this.getHistoryFollow();
      }
    },
    // 当前跟单
    getCurrentFollow() {
      this.tableLoading = true;
      this.$http
        .get(this.host + this.api.follow.currentFollowApi, {
          params: {
            pageNo: this.pageNo,
            pageSize: 10,
          },
        })
        .then((response) => {
          var res = response.data;
          this.followList = res.data;
          this.total = res.data.totalPage * 10;
          for (let i = 0; i < this.followList.length; i++) {
            this.$http
              .get(this.host + this.api.follow.coinInfo, {
                params: {
                  symbol: this.followList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.followList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.followList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.followList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.tableLoading = false;
        });
    },
    // 历史跟单
    getHistoryFollow() {
      this.tableLoading = true;
      this.$http
        .get(this.host + this.api.follow.historyFollowApi, {
          params: { pageNo: this.pageNo, pageSize: 10 },
        })
        .then((response) => {
          var res = response.data;
          this.followList = res.data;
          this.total = res.data.totalPage * 10;
          for (let i = 0; i < this.followList.length; i++) {
            this.$http
              .get(this.host + this.api.follow.coinInfo, {
                params: {
                  symbol: this.followList[i].symbol,
                },
              })
              .then((res) => {
                // 面值
                this.followList[i].shareNumber = res.data.data.shareNumber;
                // 合约最低保证金率
                this.followList[i].maintenanceMarginRate =
                  res.data.data.maintenanceMarginRate;
                // 当前价格
                this.followList[i].currentPrice = res.data.data.currentPrice;
              });
          }
          this.tableLoading = false;
        });
    },

    // 分页
    pageChange(page) {
      this.pageNo = page;
      if (this.currentTab === "1") {
        // 当前跟单
        this.getCurrentFollow();
      } else {
        // 历史跟单
        this.getHistoryFollow();
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
  .coinList {
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eeeeee;
    .coinData {
      width: 25%;
      padding: 40px 8px 40px;
      .coin_title {
        line-height: 20px;
      }
      .coin_number {
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        margin: 4px 0;
      }
      .coin_cn {
        color: #6f6f6f;
        line-height: 16px;
      }
    }
  }

  .otherCoins {
    margin-top: 36px;
    .otherCoins_content {
      padding: 4px 24px 0;
    }
  }
}
em {
  font-style: normal;
  padding-top: 8px;
  font-size: 18px;
  line-height: 18px;
}
.tr {
  width: 200px;
}
</style>
