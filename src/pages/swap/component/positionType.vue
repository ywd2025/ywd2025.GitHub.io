<template>
  <div>
    <Modal
      v-model="marginModeModal"
      :title="$t('swap.modifyMarginModeTitle')"
      width="20"
      class-name="vertical-center-modal"
    >
      <div>{{ $t("carouselItem.text24") }}：</div>
      <div class="m_t20" style="text-align: center; width: 100%">
        <ButtonGroup style="width: 100%; text-align: center">
          <Button style="width: 50%" v-if="openType === '0'" type="primary">{{
            $t("swap.marginMode2")
          }}</Button>
          <Button style="width: 50%" v-else @click="changeMarginMode('0')">{{
            $t("swap.marginMode2")
          }}</Button>
          <Button style="width: 50%" v-if="openType === '1'" type="primary">{{
            $t("swap.marginMode1")
          }}</Button>
          <Button style="width: 50%" v-else @click="changeMarginMode('1')">{{
            $t("swap.marginMode1")
          }}</Button>
        </ButtonGroup>
      </div>
      <div
        class="m_t20"
        style="text-align: center; width: 100%"
        v-if="openMerge == 1"
      >
        <ButtonGroup style="width: 100%; text-align: center">
          <Button style="width: 50%" v-if="openType1 === '0'" type="primary">{{
            $t("dolphin.text184")
          }}</Button>
          <Button style="width: 50%" v-else @click="changeMarginMode1('0')">{{
            $t("dolphin.text184")
          }}</Button>
          <Button style="width: 50%" v-if="openType1 === '1'" type="primary">{{
            $t("dolphin.text185")
          }}</Button>
          <Button style="width: 50%" v-else @click="changeMarginMode1('1')">{{
            $t("dolphin.text185")
          }}</Button>
        </ButtonGroup>
      </div>
      <div class="m_t20">{{ $t("carouselItem.text25") }}：</div>
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
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="marginModeModal = false">{{
          $t("common.close")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    marginModeModal: Boolean,
    leverageList: [Object, Array],
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
<style>
.m_t20 {
  margin-top: 20px;
}
</style>
