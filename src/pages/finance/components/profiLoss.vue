<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="localModalOpen"
      :title="$t('carouselItem.text28')"
      width="30"
      class-name="vertical-center-modal"
      @on-cancel="closeModal"
    >
      <Form
        ref="openOrCloseFormData"
        :model="openOrCloseFormData"
        :label-width="120"
        label-position="left"
      >
        <FormItem :label="$t('swap.contract')">
          <div class="modalFormItemRight">
            {{ rowData.symbol }}{{ $t("swap.swapindex") }} •
            {{ rowData.leverage }}X
          </div>
        </FormItem>
        <FormItem :label="$t('carouselItem.text29')">
          <div class="modalFormItemRight">
            <span v-if="openMerge == 1">
              {{
                rowData.patterns === "CROSSED"
                  ? $t("new.swap.fullPosition") +
                    "·" +
                    (rowData.jointType == 0
                      ? this.$t("dolphin.text184")
                      : this.$t("dolphin.text185"))
                  : this.$t("swap.marginMode1") +
                    "·" +
                    (rowData.jointType == 0
                      ? this.$t("dolphin.text184")
                      : this.$t("dolphin.text185"))
              }}
            </span>
            <span v-else>
              {{
                rowData.patterns === "CROSSED"
                  ? $t("new.swap.fullPosition")
                  : $t("new.swap.takePosition")
              }}
            </span>
          </div>
        </FormItem>
        <FormItem :label="$t('exchange.direction')">
          <div class="modalFormItemRight">
            {{
              rowData.direction === "BUY"
                ? $t("new.swap.buy")
                : $t("new.swap.sell")
            }}
          </div>
        </FormItem>
        <!-- 开仓均价 = 标记价格 = 开仓价格 -->
        <FormItem :label="$t('carouselItem.text30')">
          <div class="modalFormItemRight">{{ rowData.tradedPrice }}</div>
        </FormItem>
        <FormItem :label="$t('carouselItem.text34')">
          <div class="modalFormItemRight">{{ price }}</div>
        </FormItem>
        <FormItem :label="$t('new.swap.profitPrice')" prop="win">
          <InputNumber
            style="width: 100%"
            v-model="openOrCloseFormData.win"
          ></InputNumber>
          {{ $t("carouselItem.text31")
          }}<span>{{ $t("carouselItem.text32") }}</span
          >{{ $t("carouselItem.text33")
          }}<span>{{
            openOrCloseFormData.win === null ? "0.00" : openOrCloseFormData.win
          }}</span
          >{{ $t("carouselItem.text35") }}
          <span>
            <span>{{ calculatedLoss1 }}</span>
            USDT
          </span>
        </FormItem>
        <FormItem :label="$t('new.swap.lossPrice')" prop="lose">
          <InputNumber
            style="width: 100%"
            v-model="openOrCloseFormData.lose"
          ></InputNumber>
          {{ $t("carouselItem.text31")
          }}<span>{{ $t("carouselItem.text32") }}</span>
          {{ $t("carouselItem.text33")
          }}<span>
            {{
              openOrCloseFormData.lose === null
                ? "0.00"
                : openOrCloseFormData.lose
            }}
          </span>
          {{ $t("carouselItem.text36") }}
          <span>
            <span>{{ calculatedLoss }}</span>
            USDT
          </span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" size="large" @click="closeModal">{{
          $t("common.close")
        }}</Button>
        <Button
          type="primary"
          size="large"
          @click="handleOpenOrCloseSubmit()"
          >{{ $t("common.ok") }}</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openOrCloseFormData: {
        win: null,
        lose: null,
      },
      localModalOpen: this.openOrCloseModal,
      calculatedLoss1: "0.00",
      calculatedLoss: "0.00",
    };
  },
  props: {
    openOrCloseModal: Boolean,
    rowData: [Object, Array],
    price: [Number, String],
    openMerge: [Number, String],
  },
  watch: {
    openOrCloseModal(newVal) {
      this.localModalOpen = newVal;
    },
    "openOrCloseFormData.lose": {
      handler(newVal, oldVal) {
        this.calculatedLoss =
          newVal === null ? "0.00" : this.getMoney(this.rowData);
      },
      deep: false,
      immediate: false,
    },
    "openOrCloseFormData.win": {
      handler(newVal, oldVal) {
        this.calculatedLoss1 =
          newVal === null ? "0.00" : this.getMoney1(this.rowData);
      },
      deep: false,
      immediate: false,
    },
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("profiLoss", false);
    },
    // 当前持仓 操作3 逐仓订单止盈止损
    handleOpenOrCloseSubmit() {
      if (
        this.openOrCloseFormData.win === null ||
        this.openOrCloseFormData.lose === null
      ) {
        this.$Notice.error({
          title: this.$t("swap.tip"),
          desc: this.$t("carouselItem.text41"),
        });
        return;
      }
      if (this.rowData.direction === "BUY") {
        // 多仓止盈(this.openOrCloseFormData.win)价格大于开仓价格, 止损价(this.openOrCloseFormData.lose)小于开仓价格(this.rowData.currentPrice)
        if (this.openOrCloseFormData.win <= this.rowData.tradedPrice) {
          this.$Notice.error({
            title: this.$t("swap.tip"),
            desc: this.$t("carouselItem.text42"),
          });
          return;
        }
        if (this.openOrCloseFormData.lose >= this.rowData.tradedPrice) {
          this.$Notice.error({
            title: this.$t("swap.tip"),
            desc: this.$t("carouselItem.text43"),
          });
          return;
        }
      } else {
        // 空仓止盈价格(this.openOrCloseFormData.win)小于开仓价格(this.rowData.currentPrice), 止损价(this.openOrCloseFormData.lose)大于开仓价格
        if (this.openOrCloseFormData.win >= this.rowData.tradedPrice) {
          this.$Notice.error({
            title: this.$t("swap.tip"),
            desc: this.$t("carouselItem.text44"),
          });
          return;
        }
        if (this.openOrCloseFormData.lose <= this.rowData.tradedPrice) {
          this.$Notice.error({
            title: this.$t("swap.tip"),
            desc: this.$t("carouselItem.text45"),
          });
          return;
        }
      }
      this.$Spin.show();
      if (this.rowData.patterns == "FIXED") {
        let params = {
          // orderId: this.rowData.openOrderId, // 合约id
          symbol: this.rowData.symbol,
          walletId: this.rowData.walletInfoId,
          win: this.openOrCloseFormData.win,
          lose: this.openOrCloseFormData.lose,
          direction: this.rowData.direction,
        };
        this.$http
          .post(this.host + this.api.swap.addOpenOrClose, params)
          .then((response) => {
            this.$Spin.hide();
            this.$emit("successprofiLoss", false);
            var resp = response.body;
            if (resp.code == 0) {
              this.$Notice.success({
                title: this.$t("swap.tip"),
                desc: this.$t("swap.success"),
              });
            } else {
              this.$Notice.error({
                title: this.$t("swap.tip"),
                desc: resp.message,
              });
            }
          });
      } else {
        let params = {
          // orderId: this.rowData.openOrderId,
          walletId: this.rowData.walletInfoId, // 合约id
          symbol: this.rowData.symbol,
          direction: this.rowData.direction,
          win: this.openOrCloseFormData.win,
          lose: this.openOrCloseFormData.lose,
        };
        this.$http
          .post(this.host + this.api.swap.addOpenOrClose, params)
          .then((response) => {
            this.$Spin.hide();
            this.$emit("successprofiLoss", false);
            var resp = response.body;
            if (resp.code == 0) {
              this.$Notice.success({
                title: this.$t("swap.tip"),
                desc: this.$t("swap.success"),
              });
              // setTimeout(() => {
              //   this.getMemberContractWallet();
              // }, 1000);
            } else {
              this.$Notice.error({
                title: this.$t("swap.tip"),
                desc: resp.message,
              });
            }
          });
      }
    },
    // 收益
    getMoney(row) {
      var price = this.openOrCloseFormData.lose;
      var tradedPrice = row.tradedPrice;
      var shareNumber = row.shareNumber;
      var volume = row.volume;
      if (row.direction === "BUY") {
        return this.buyIncome(price, tradedPrice, shareNumber, volume);
      } else {
        return this.sellIncome(price, tradedPrice, shareNumber, volume);
      }
    },
    getMoney1(row) {
      var price = this.openOrCloseFormData.win;
      var tradedPrice = row.tradedPrice;
      var shareNumber = row.shareNumber;
      var volume = row.volume;
      if (row.direction === "BUY") {
        return this.buyIncome(price, tradedPrice, shareNumber, volume);
      } else {
        return this.sellIncome(price, tradedPrice, shareNumber, volume);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.modalFormItemRight {
  width: 100%;
  text-align: right;
}
</style>
