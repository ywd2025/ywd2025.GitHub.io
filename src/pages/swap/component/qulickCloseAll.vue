<template>
  <div>
    <Modal
      v-model="localModalOpen"
      :title="$t('carouselItem.text37')"
      width="25"
      class-name="vertical-center-modal"
      :mask-closable="false"
      @on-cancel="closeModal"
    >
      <div>
        {{ $t("carouselItem.text38") }}
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="closeModal()">{{
          $t("common.close")
        }}</Button>
        <Button type="primary" size="large" @click="handswapOrdercloseAll()">{{
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
      localModalOpen: this.closeAll,
    };
  },
  props: {
    closeAll: Boolean,
    contractCoinInfo: [Number, String],
  },
  watch: {
    closeAll(newVal) {
      this.localModalOpen = newVal;
    },
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("profiLoss", false);
    },
    handswapOrdercloseAll() {
      this.$http
        .post(this.host + this.api.swap.getCloseAll, {
          contractCoinId: this.contractCoinInfo,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$emit("successprofiLoss", false);
            this.$Notice.success({
              title: this.$t("swap.tip"),
              desc: res.data.message,
            });
          } else {
            this.$Notice.error({
              title: this.$t("swap.tip"),
              desc: res.data.message,
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
