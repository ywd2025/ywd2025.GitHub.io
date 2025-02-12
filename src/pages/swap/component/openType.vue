<template>
  <!-- 弹出框: 变更仓位模式 -->
  <Modal
    v-model="marginModeModal"
    :title="'调整交易模式'"
    :closable="false"
    width="411"
  >
    <div class="tabs_group">
      <div
        class="tabs_group_btn"
        :class="sonOpenType == 0 ? 'tabActive' : ''"
        @click="changeMarginMode('0')"
      >
        {{ $t("swap.marginMode2") }}
      </div>
      <div
        class="tabs_group_btn"
        :class="sonOpenType == 1 ? 'tabActive' : ''"
        @click="changeMarginMode('1')"
      >
        {{ $t("swap.marginMode1") }}
      </div>
    </div>
    <div class="tips">
      {{$t('newUi.text81')}}
    </div>
    <div class="tabs_group">
      <div
        class="tabs_group_btn"
        :class="sonOpenType1 == 0 ? 'tabActive' : ''"
        @click="changeMarginMode1('0')"
      >
        {{ $t("dolphin.text184") }}
      </div>
      <div
        class="tabs_group_btn"
        :class="sonOpenType1 == 1 ? 'tabActive' : ''"
        @click="changeMarginMode1('1')"
      >
        {{ $t("dolphin.text185") }}
      </div>
    </div>
    <div class="tips">
      {{$t('newUi.text82')}}
    </div>
    <!-- <div class="m_t20">{{ $t("carouselItem.text25") }}：</div>
      <div class="m_t20">
        <Select
          v-model="leverageAdjustVal"
          :max-tag-count="2"
          :placeholder="$t('carouselItem.text52')"
        >
          <Option v-for="item in leverageList" :value="item" :key="item"
            >{{ item }}x</Option
          >
        </Select>
      </div> -->
    <div slot="footer" class="footer_btn">
      <div class="btn_cencal" @click="cancel()">{{ $t("common.paySure.cancel") }}</div>
      <div class="btn_sure" @click="submit()">{{ $t("common.ok") }}</div>
    </div>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      sonOpenType1: "",
      sonOpenType: "",
    };
  },
  props: {
    marginModeModal: Boolean,
    openType1: String,
    openType: String,
    openMerge: [String, Number],
  },
  watch: {
    openType1(newVal) {
      this.sonOpenType1 = newVal;
    },
    openType(newVal) {
      this.sonOpenType = newVal;
    },
  },
  computed: {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit("openTypeCancel", false);
      this.sonOpenType1 = this.openType1;
      this.sonOpenType = this.openType;
    },
    submit() {
      this.$emit("openTypeSubmit", false, this.sonOpenType1, this.sonOpenType);
    },
    changeMarginMode(val) {
      this.sonOpenType = val;
    },
    // 和分仓选择
    changeMarginMode1(val) {
      this.sonOpenType1 = val;
    },
  },
};
</script>
<style lang="less">
.footer_btn {
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn_cencal {
    width: 125px;
    height: 27px;
    background: #f7f3f3;
    border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #a5a5a5;
    cursor: pointer;
  }
  .btn_sure {
    width: 125px;
    height: 27px;
    background: #35e9c5;
    border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.87);
    cursor: pointer;
  }
}
.tabs_group {
  margin: 0 auto;
  width: 324px;
  height: 34px;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #e9e8e8;
  display: flex;
  align-items: center;
  cursor: pointer;
  .tabs_group_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 161px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
  }
  .tabActive {
    width: 161px;
    height: 34px;
    background: #e9e8e8;
    border-radius: 5px 5px 5px 5px;
  }
}
.tips {
  width: 324px;
  margin: 11px auto 24px;
  font-weight: 500;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.87);
}
</style>
