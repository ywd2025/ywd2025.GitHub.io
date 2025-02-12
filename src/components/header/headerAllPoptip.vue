<template>
  <div>
    <Poptip
      @on-popper-show="handleActivesIn"
      @on-popper-hide="handleActivesOut"
      style="display: flex; align-items: center"
      trigger="hover"
      width="650"
      placement="bottom-start"
      class="active_poptip_poptip"
    >
      <div class="active_poptip_title">
        <Icon type="ios-apps" color="#000000" size="18" />
        <Icon
          v-if="actives"
          type="md-arrow-dropdown"
          color="#000000"
          size="24"
        />
        <Icon v-else type="md-arrow-dropup" color="#000000" size="24" />
      </div>
      <div class="active_poptip" slot="content">
        <div class="active_poptip_content">
          <div class="active_poptip_item">
            <div
              class="link_label"
              @click="go_pages('/flashExchange')"
              v-if="openFlash == 1"
            >
              <img :src="$imgUrl + '/newUi/icon2.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("dolphin.text1") }}
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text11") }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="link_label"
              @click="go_pages('/financing')"
              v-if="openCycle == 1"
            >
              <img :src="$imgUrl + '/newUi/icon1.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("dolphin.text13") }}
                  </div>
                  <div class="small_title">
                    {{ $t("dolphin.text181") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="link_label" @click="go_pages('/nopage')">
              <img :src="$imgUrl + '/newUi/icon6.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("newUi.text12") }}
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text13") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="link_label" @click="go_pages('/nopage')">
              <img :src="$imgUrl + '/newUi/icon7.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("newUi.text14") }}
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text15") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="active_poptip_item">
            <div
              class="link_label"
              @click="go_pages('/buyCoin')"
              v-if="openC2c == 1"
            >
              <img :src="$imgUrl + '/newUi/icon8.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("newUi.text16") }}
                  </div>
                  <div class="small_title">
                    {{ $t("dolphin.text179") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="link_label" @click="go_pages('/nopage')">
              <img :src="$imgUrl + '/newUi/icon2.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    IEO
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text17") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="link_label" @click="go_pages('/nopage')">
              <img :src="$imgUrl + '/newUi/icon4.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("newUi.text18") }}
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text18") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="link_label" @click="go_pages('/apiManage')">
              <img :src="$imgUrl + '/newUi/icon3.png'" alt="" />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("dolphin.text84") }}
                  </div>
                  <div class="small_title">
                    {{ $t("newUi.text19") }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="active_poptip_item">
            <p class="title">
              {{ $t("header.helpcenter") }}
            </p>
            <div class="link_label" @click="go_pages('/help')">
              <div class="big_title">
                {{ $t("new.app.guidance") }}
              </div>
            </div>
            <div class="link_label" @click="go_pages('/swap')">
              <div class="big_title">
                {{ $t("new.universal.contractTrading") }}
              </div>
            </div>
            <div class="link_label" @click="go_pages('/exchange')">
              <div class="big_title">
                {{ $t("new.universal.spotTrading") }}
              </div>
            </div>
            <div class="link_label" @click="go_pages('/intelligence')">
              <div class="big_title">
                {{ $t("dolphin.text151") }}
              </div>
            </div>
            <div class="link_label" @click="go_pages('/follow')">
              <div class="big_title">
                {{ $t("new.header.follow") }}
              </div>
            </div>
            <!-- <div class="link_label" @click="go_pages('/notice')">
              <Icon
                type="md-megaphone"
                color="#03C59E"
                size="20"
                style="margin-top: 2px;"
              />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("new.app.announcement") }}
                  </div>
                  <div class="small_title">
                    {{ $t("dolphin.text175") }}
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="link_label" @click="go_pages('/finance/all')">
              <Icon
                type="md-switch"
                color="#03C59E"
                size="20"
                style="margin-top: 2px;"
              />
              <div class="link_label_right">
                <div>
                  <div class="big_title">
                    {{ $t("carouselItem.text194") }}
                  </div>
                  <div class="small_title">
                    {{ $t("dolphin.text174") }}
                  </div>
                </div>
              </div>
            </div> -->
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
    openCycle: {
      type: [Number, String],
      default: 1,
    },
    openC2c: {
      type: [Number, String],
      default: 1,
    },
    openFlash: {
      type: [Number, String],
      default: 1,
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
      if (url == "/nopage") {
        this.$Message.error(this.$t("common.expect"));
      } else {
        this.$router.push(url);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.active_poptip_title {
  display: flex;
  align-items: center;
}
.active_poptip {
  .active_poptip_content {
    display: flex;
    justify-content: space-between;
    padding: 24px 10px;
    .active_poptip_item:nth-child(1) {
      width: 245px;
    }
    .active_poptip_item:nth-child(2) {
      width: 245px;
      border-right: 1px solid #eeeeee;
    }
    .active_poptip_item:nth-child(3) {
      width: 150px;
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
          }
          .small_title {
            font-weight: 400;
            font-size: 14px;
            color: #898c91;
            line-height: 20px;
          }
        }
      }
      .link_label:hover {
        background-color: #eeeeee;
      }
    }
    .title {
      color: #000;
      line-height: 14px;
      font-size: 15px;
      padding-bottom: 12px;
      padding-left: 20px;
      font-weight: 500;
      margin-bottom: 15px;
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
  }
}
</style>
