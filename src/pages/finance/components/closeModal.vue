<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="localModalOpen"
      :title="$t('new.swap.closing')"
      width="30"
      class-name="vertical-center-modal"
      @on-cancel="closeModal"
    >
      <Form
        ref="closeFormData"
        :model="closeFormData"
        :label-width="120"
        label-position="left"
      >
        <FormItem :label="$t('new.universal.contract')">
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
        <FormItem :label="$t('swap.direction')">
          <div class="modalFormItemRight">
            {{
              rowData.direction === "BUY"
                ? $t("new.swap.buy")
                : $t("new.swap.sell")
            }}
          </div>
        </FormItem>
        <FormItem :label="$t('carouselItem.text30')">
          <div class="modalFormItemRight">{{ rowData.tradedPrice }}</div>
        </FormItem>
        <FormItem :label="$t('carouselItem.text34')">
          <div class="modalFormItemRight">{{ price }}</div>
        </FormItem>
        <FormItem :label="$t('follow.universal.earning')">
          <div class="modalFormItemRight">
            <span :class="[Yield > 0 ? 'green' : 'red']"> {{ Yield }}% </span>
          </div>
        </FormItem>
        <FormItem :label="$t('new.swap.type')">
          <RadioGroup v-model="closeFormData.type">
            <Radio label="0">{{ $t("new.swap.marketValue") }}</Radio>
            <Radio label="1">{{ $t("new.swap.priceLimit") }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          :label="$t('new.swap.commissionPrice')"
          prop="entrustPrice"
          v-show="closeFormData.type === '1'"
        >
          <Input
            v-model="closeFormData.entrustPrice"
            style="width: 100%"
          ></Input>
        </FormItem>
        <FormItem :label="$t('new.swap.ordersNumber')" prop="volume">
          <span
            v-if="swapUnit == $t('swap.shareNumber')"
            style="
              position: absolute;
              top: 2px;
              right: 15px;
              color: #7c7f82;
              z-index: 99;
            "
            >{{ $t("swap.shareNumber") }}</span
          >
          <span
            v-if="swapUnit == 'USDT'"
            style="
              position: absolute;
              top: 2px;
              right: 15px;
              color: #7c7f82;
              z-index: 99;
            "
            >USDT</span
          >
          <span
            v-if="swapUnit == unitSymbol"
            style="
              position: absolute;
              top: 2px;
              right: 15px;
              color: #7c7f82;
              z-index: 99;
            "
            >{{ unitSymbol }}</span
          >
          <Input
            v-model="closeFormData.volume"
            v-if="swapUnit == $t('swap.shareNumber')"
            :max="rowData.volume"
            style="width: 100%"
            :precision="0"
            :placeholder="$t('otc.tradeinfo.numtip')"
          ></Input>
          <Input
            v-model="closeFormData.volume"
            :precision="10"
            v-if="swapUnit == 'USDT'"
            style="width: 100%"
            :placeholder="$t('otc.tradeinfo.numtip')"
          ></Input>
          <Input
            v-model="closeFormData.volume"
            :precision="10"
            v-if="swapUnit == unitSymbol"
            style="width: 100%"
            :placeholder="$t('otc.tradeinfo.numtip')"
          ></Input>
        </FormItem>
        <FormItem :label="$t('carouselItem.text26')">
          <div class="modalFormItemRight">
            <!-- 如果是usdt, 张数X面值X当前币价 -->
            {{
              swapUnit === "USDT"
                ? rowData.volume * rowData.shareNumber * price
                : swapUnit === unitSymbol
                ? rowData.volume * rowData.shareNumber
                : rowData.volume
            }}
            {{ swapUnit }}
          </div>
        </FormItem>
        <FormItem :label="$t('carouselItem.text27')">
          <div class="modalFormItemRight">
            <span>
              <span :class="[income > 0 ? 'green' : 'red']">
                {{ income }}
              </span>
            </span>
            USDT
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="default" size="large" @click="closeModal()">{{
          $t("common.close")
        }}</Button>
        <Button type="primary" size="large" @click="handleClose()">{{
          $t("common.ok")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      closeFormData: {
        type: "0",
        volume: "",
        entrustPrice: this.price,
      },
      localModalOpen: this.closeModals,
    };
  },
  props: {
    closeModals: Boolean,
    rowData: [Object, Array],
    income: [Number, String],
    Yield: [Number, String],
    price: [Number, String],
    swapUnit: String,
    unitSymbol: String,
    openMerge: [Number, String],
  },
  watch: {
    closeModals(newVal) {
      this.localModalOpen = newVal;
    },
    price(newVal) {
      this.closeFormData.entrustPrice = newVal;
    },
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("profiLoss", false);
    },
    handleClose() {
      this.$Spin.show();
      let temVolume = null;
      if (this.swapUnit === "USDT") {
        temVolume = (
          this.closeFormData.volume /
          this.rowData.shareNumber /
          this.price
        )
          .toFixed(5)
          .split(".")[0];
      } else if (this.swapUnit === this.unitSymbol) {
        temVolume = (this.closeFormData.volume / this.rowData.shareNumber)
          .toFixed(5)
          .split(".")[0];
      } else {
        temVolume = this.closeFormData.volume;
      }
      if (!temVolume) {
        this.$Notice.error({
          title: this.$t("swap.tip"),
          desc: this.$t("carouselItem.text268"),
        });
        this.$Spin.hide();
        return;
      }
      let params = {
        contractCoinId: this.rowData.contractId, // 合约id
        openType: this.rowData.patterns === "CROSSED" ? "0" : "1",
        direction: this.rowData.direction === "BUY" ? "SELL" : "BUY",
        tradeType: this.rowData.tradeType === "1" ? "2" : "0",
        type: this.closeFormData.type,
        volume: temVolume,
        entrustPrice:
          this.closeFormData.type == "1"
            ? this.closeFormData.entrustPrice
            : this.price,
        walletInfoId: this.rowData.walletInfoId, // 持仓id
      };
      if (this.rowData.patterns === "CROSSED") {
        this.$http
          .post(this.host + this.api.swap.close, params)
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
      } else if (this.rowData.patterns === "FIXED") {
        // 开仓订单id 逐仓必传
        params.openOrderId = this.rowData.openOrderId;
        // 逐仓
        this.$http
          .post(this.host + this.api.swap.closeFix, params)
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
