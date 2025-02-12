<template>
  <div>
    <Modal
      v-model="localModalOpen"
      :title="$t('new.swap.close')"
      width="25"
      class-name="vertical-center-modal"
      :mask-closable="false"
      @on-cancel="closeModal"
    >
      <div>
        {{ $t("carouselItem.text260") }}
      </div>
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
      localModalOpen: this.closeQulick,
    };
  },
  props: {
    closeQulick: Boolean,
    rowData: [Object, Array],
  },
  watch: {
    closeQulick(newVal) {
      this.localModalOpen = newVal;
    },
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("profiLoss", false);
    },
    handleClose() {
      this.$Spin.show();
      let params = {
        contractCoinId: this.rowData.contractId, // 合约id
        openType: this.rowData.patterns === "CROSSED" ? "0" : "1",
        direction: this.rowData.direction === "BUY" ? "SELL" : "BUY",
        tradeType: this.rowData.tradeType,
        type: "MARKET_PRICE",
        volume: this.rowData.volume,
        triggerPrice: "",
        entrustPrice: "",
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
