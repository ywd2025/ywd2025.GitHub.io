<template>
  <div>
    <Poptip
      @on-popper-show="handleActivesIn"
      @on-popper-hide="handleActivesOut"
      style="display: flex; align-items: center"
      trigger="hover"
      width="236"
      placement="bottom-start"
    >
      <div style="display: flex; align-items: center">
        <span style="color: #000000;">{{ $t("newUi.text1") }}</span>
        <Icon
          v-if="actives"
          type="md-arrow-dropdown"
          color="#000000"
          size="24"
        />
        <Icon v-else type="md-arrow-dropup" color="#000000" size="24" />
      </div>
      <div class="active_poptip" slot="content">
        <div class="active_poptip_item">
          <div class="link_label" @click="go_pages('/help')">
            <img :src="$imgUrl + '/newUi/icon10.png'" alt="" />
            <div class="link_label_right">
              <div>
                <div class="big_title">
                  {{ $t("header.helpcenter") }}
                </div>
                <div class="small_title">
                  {{ $t("dolphin.text181") }}
                </div>
              </div>
            </div>
          </div>
          <div class="link_label" @click="go_pages('/intelligence')">
            <img :src="$imgUrl + '/newUi/icon9.png'" alt="" />
            <div class="link_label_right">
              <div>
                <div class="big_title">
                  {{ $t("dolphin.text151") }}
                </div>
                <div class="small_title">
                  {{ $t("dolphin.text181") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actives: true,
    };
  },
  props: {
    openSwap: {
      type: [Number, String],
      default: 1,
    },
    name: {
      type: String,
      default: "nav-swap",
    },
  },
  methods: {
    // 活动选项们
    handleActivesIn() {
      this.actives = false;
    },
    handleActivesOut() {
      this.actives = true;
    },
    go_pages(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="less" scoped>
.active_poptip {
  .title {
    color: #6f6f6f;
    line-height: 14px;
    font-size: 18px;
    padding-bottom: 12px;
    padding-left: 12px;
    font-weight: 700;
  }
  .active_list {
    height: 44px;
    margin-left: 0px;
    color: #1c1c1c;
    font-size: 14px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 24px;
    .icon {
      visibility: hidden;
    }
  }
  .active_list:hover {
    background-color: #eeeeee;
    .icon {
      visibility: visible;
    }
  }
  .active_poptip_item {
    .link_label {
      display: flex;
      padding: 10px 20px;
      cursor: pointer;
      img {
        width: 25px;
        height: 25px;
        margin-top: 2px;
      }
      .link_label_right {
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        box-sizing: border-box;
        width: 100%;

        .big_title {
          font-weight: 500;
          font-size: 15px;
          color: #000000;
          text-align: left;
        }
        .small_title {
          font-weight: 400;
          font-size: 14px;
          color: #898c91;
          line-height: 20px;
          text-align: left;
        }
      }
    }
    .link_label:hover {
      background-color: #eeeeee;
      border-radius: 10px;
    }
  }
}
</style>
