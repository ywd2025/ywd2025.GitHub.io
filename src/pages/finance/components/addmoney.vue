<template>
    <div>
    <Modal
      v-model="localModalOpen"
      :title="$t('carouselItem.text15')"
      width="25"
      class-name="vertical-center-modal"
      :mask-closable="false"
      @on-cancel="closeModal"
    >
      <InputNumber style="width: 300px;" v-model="addPrincipalAmount"></InputNumber>
      <div slot="footer">
        <Button
          type="default"
          size="large"
          @click="closeModal()"
          >{{ $t("common.close") }}</Button
        >
        <Button
          type="primary"
          size="large"
          @click="handleAddPrincipalAmountSubmit()"
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
        addPrincipalAmount: 0, // 追加保证金
        localModalOpen: this.addPrincipalAmountModal,
      };
    },
    props: {
    addPrincipalAmountModal: Boolean,
    rowData: [Object, Array],
    },
    watch: {
        addPrincipalAmountModal(newVal) {
        this.localModalOpen = newVal;
      },
    },
    mounted() {},
    methods: {
      closeModal() {
        this.$emit("profiLoss", false);
      },
      handleAddPrincipalAmountSubmit(row) {
      let params = {
        symbol: this.rowData.symbol, // 合约id
        pattern: this.rowData.patterns === "CROSSED" ? "0" : "1", // "FIXED"逐仓1 crossed(全倉)0
        openOrderId:
          this.rowData.patterns === "FIXED" ? this.rowData.openOrderId : "", // "FIXED"逐仓1 crossed(全倉)0
        direction: this.rowData.direction === "BUY" ? "0" : "1",
        amount: this.addPrincipalAmount,
      };
      this.$http
        .post(this.host + this.api.swap.addPrincipalAmountApi, params)
        .then((response) => {
          this.$Spin.hide();
          var resp = response.body;
          if (resp.code == 0) {
            this.$emit("successprofiLoss", false);
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
  