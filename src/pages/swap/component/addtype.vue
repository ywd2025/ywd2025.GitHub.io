<template>
  <div>
    <Modal
      footer-hide
      v-model="typeModal"
      @on-cancel="handleCancel"
      :title="$t('dolphin.text186')"
      width="609"
      :closable="false"
      class-name="vertical-center-modal"
    >
      <div class="type_modal_content">
        <CheckboxGroup
          v-model="social"
          @on-change="handleChange"
          style="margin-top: 20px;"
          class="check_group"
        >
          <Checkbox
            :label="item.walletInfoId"
            v-for="item in currentList"
            :key="item.id"
            class="check_box"
          >
            <div class="check_box_content">
              <div>
                <span>
                  {{
                    item.patterns === "CROSSED"
                      ? $t("new.swap.fullPosition")
                      : $t("new.swap.takePosition")
                  }}</span
                >
                <span
                  :style="{
                    color: item.direction === 'BUY' ? '#03C59E' : '#F6465D',
                  }"
                  >{{
                    item.direction === "BUY"
                      ? $t("new.swap.buy")
                      : $t("new.swap.sell")
                  }}</span
                >
              </div>
              <div>
                <span>{{ $t("follow.universal.openInterest") }}:</span>
                <span>{{ item.volume }}</span>
              </div>
              <div>
                <span>{{ $t("swap.pos_openPrice") }}(USDT):</span>
                <span>{{ item.tradedPrice.toFixed(4) }}</span>
              </div>
            </div>
          </Checkbox>
        </CheckboxGroup>
      </div>

      <div class="btn_box">
        <Button type="primary" @click="handleSubmit">{{
          $t("common.ok")
        }}</Button>
        <Button @click="handleCancel">{{ $t("common.close") }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      social: [],
    };
  },
  props: {
    typeModal: Boolean,
    currentList: [Object, Array],
  },
  mounted() {},
  watch: {
    typeModal(newVal) {
      this.social = [];
    },
  },
  computed: {
    direction() {
      return this.currentList.find(
        (item) => item.walletInfoId === this.social[0]
      ).direction;
    },
    patterns() {
      return this.currentList.find(
        (item) => item.walletInfoId === this.social[0]
      ).patterns;
    },
    contractCoinId() {
      return this.currentList.find(
        (item) => item.walletInfoId === this.social[0]
      ).contractId;
    },
  },
  methods: {
    handleCancel() {
      this.$emit("changeTypeModal", false);
    },
    handleSubmit() {
      this.$http
        .post(this.host + this.api.swap.orderMerge, {
          walletInfoIds: this.social.join(","),
          direction: this.direction == "BUY" ? "0" : "1",
          contractCoinId: this.contractCoinId,
        })
        .then((res) => {
          this.$Notice.success({
            title: this.$t("swap.tip"),
            desc: res.body.message,
          });
          this.$emit("changeTypeModal", false);
        });
    },
    handleChange(e) {
      if (e.length > 1) {
        this.currentList.forEach((item) => {
          if (item.walletInfoId == e[e.length - 1]) {
            if (item.direction != this.direction || item.patterns != this.patterns ) {
              this.social.splice(this.social.length - 1, 1);
              if(item.patterns === "FIXED" && this.patterns === "CROSSED"){
                this.$Message.error(
                  this.direction == "BUY"
                    ? this.$t("dolphin.text187")
                    : this.$t("dolphin.text188")
                );
              }else{
                this.$Message.error(
                  this.direction == "BUY"
                    ? this.$t("dolphin.text189")
                    : this.$t("dolphin.text190")
                );
              }
              return;
            } else {
              this.social = e;
            }
          }
        });
      } else {
        this.social = e;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn_box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
  .ivu-btn {
    margin-left: 10px;
  }
}
.type_modal_content {
  overflow-y: scroll;
  max-height: 500px;
}
.type_modal_content::-webkit-scrollbar{
  display: none;
}
.check_group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-sizing: border-box;
  margin-top: 20px;
  .check_box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    width: 240px;
    border-radius: 10px;
    border: 1px solid #f5f5f5;
    .check_box_content {
      margin-left: 10px;
    }
  }
}
.check_group :hover {
  background-color: #f5f5f5;
}
</style>
