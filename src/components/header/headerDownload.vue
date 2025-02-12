<template>
  <div>
    <Poptip
      style="display: flex; align-items: center"
      trigger="hover"
      width="300"
      placement="bottom-end"
    >
      <div
        style="
                      display: flex;
                      align-items: center;
                    "
      >
        <img
          :src="$imgUrl + '/newUi/downloadIcon.png'"
          alt=""
          class="downloadIcon"
        />
        <!-- <Icon type="ios-cloud-download" size="20" color="#000" /> -->
      </div>
      <div class="downLode_poptip" slot="content">
        <div class="poptip_img_name">
          <img
            :src="$imgUrl + '/newUi/downloadApp.png'"
            alt=""
            class="downLode_poptip_img"
          />
        </div>
        <div class="poptip_img_name">{{ $t("dolphin.text182") }}</div>
      </div>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
  .downloadIcon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
.downLode_poptip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .downLode_poptip_img {
    width: 206px;
    height: 206px;
  }
  .poptip_img_name {
    font-weight: 400;
    font-size: 15px;
    color: #000000;
    margin-top: 10px;
  }
}
</style>
