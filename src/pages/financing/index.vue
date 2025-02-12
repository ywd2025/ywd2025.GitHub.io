<template>
  <div class="content">
    <Spin size="large" fix v-if="spinShow" style="background-color: #878787;"></Spin>
    <div class="content_all">
      <div class="title1_gopage">
        <div class="title1">{{ $t("dolphin.text13") }}</div>
        <img
          :src="$imgUrl + '/lcGo.png'"
          alt=""
          style="width: 36px;height: 36px;margin-right: 54px;"
          @click="go_page()"
        />
      </div>
      <div class="money_content">
        <div class="select_all">
          <Input
            prefix="md-search"
            v-model="searchValue"
            :placeholder="$t('dolphin.text15')"
            class="input_select"
            clearable
          />
          <div class="select_btn" @click="handSelect()">
            {{ $t("dolphin.text16") }}
          </div>
        </div>
        <div class="historyList">
          <div class="historyList_box_ALL">
            <div
              class="historyList_box"
              v-for="(item, index) in hot_coin"
              :key="index"
              @click="handhisSelect(item)"
            >
              {{ item }}
            </div>
          </div>
          <div>
            <img
              v-if="hot_coin.length != 0"
              :src="$imgUrl + '/delete.png'"
              alt=""
              style="width: 14px;height: 14px;"
              @click="hand_delete"
            />
          </div>
        </div>
        <Carousel
          v-model="value3"
          :autoplay="setting.autoplay"
          :autoplay-speed="setting.autoplaySpeed"
          :dots="setting.dots"
          :radius-dot="setting.radiusDot"
          :trigger="setting.trigger"
          :arrow="setting.arrow"
        >
          <CarouselItem v-for="(item, index) in banner" :key="index">
            <img :src="item.url" alt="" class="banner" />
          </CarouselItem>
        </Carousel>
        <div class="row_one">{{ $t("dolphin.text14") }}</div>
        <div class="row_coin">
          <div
            @click="hand_detail(item)"
            class="row_coin_box"
            v-for="(item, index) in encryptionData"
            :key="index"
          >
            <div class="row_coin_box_left">
              <img :src="item.icon" alt="" class="coin_icon" />
              <span class="coin_name">{{ item.coin }}</span>
            </div>
            <div class="row_coin_box_right">
              {{ (item.min * 100).toFixed(2) }}%~{{ (item.max * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";

export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      spinShow: false,
      searchValue: "",
      coinAll: [],
      encryptionData: [],
      banner: [],
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "outside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover",
      },
      scrollTimer: null,
    };
  },
  created: function() {
    this.getCoinList();
    this.getBanner();
  },
  filters: {},
  watch: {
    searchValue(newVal, oldVal) {
      if (!newVal) {
        this.encryptionData = this.coinAll;
      }
    },
  },
  computed: {
    hot_coin() {
      return this.$store.state.hot_coin;
    },
  },
  methods: {
    // 获取币种
    getCoinList() {
      this.spinShow = true;
      this.$http
        .post(this.host + this.api.flashExchange.cycleList)
        .then((res) => {
          this.encryptionData = res.data.data;
          this.coinAll = res.data.data;
          this.spinShow = false;
        });
    },
    // 获取轮播
    getBanner() {
      var paramBanner = {
        sysAdvertiseLocation: "PC_CYCLE",
      };
      this.$http
        .post(this.host + this.api.index.getBanner, paramBanner)
        .then((res) => {
          this.banner = res.data.data;
        });
    },
    // 币种详情
    hand_detail(items) {
      this.$router.push({
        path: "/financingInfo",
        query: { item: items.coin },
      });
    },
    handSelect() {
      this.$store.commit("get_hot_coin", this.searchValue);
      let newVal = String(this.searchValue).toLowerCase();
      if (this.scrollTimer != null) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        this.encryptionData = this.coinAll.filter((item) => {
          return item.coin
            .toString()
            .toLowerCase()
            .includes(newVal);
        });
      }, 500);
    },
    hand_delete() {
      this.$store.commit("clear_Hot_Coin");
    },
    handhisSelect(item) {
      this.searchValue = item;
      this.handSelect();
    },
    // 跳转订单列表
    go_page() {
      this.$router.push("/record/subscribe");
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 50px;
  flex: 1 1 0%;
  background-color: #f5f5f5;
  color: #1c1c1c;
  min-width: 1080px;
  .content_all {
    margin: 40px auto;
    padding: 48px 0;
    width: 1080px;
    background-color: #fff;
    .title1 {
      font-weight: 700;
      font-size: 32px;
      color: #3d3d3d;
      padding: 0px 30px 0;
    }
    .money_content {
      margin: 52px auto;
      width: 588px;
      .row_one {
        font-weight: 700;
        font-size: 20px;
        color: #3d3d3d;
        margin-top: 34px;
      }
      .row_coin {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .row_coin_box {
          width: 278px;
          height: 50px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #ebebeb;
          padding: 14px 18px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
          cursor: pointer;
          .row_coin_box_left {
            display: flex;
            align-items: center;
            .coin_icon {
              width: 22px;
              height: 22px;
              margin-right: 16px;
            }
            .coin_name {
              font-size: 15px;
              color: #000000;
            }
          }
          .row_coin_box_right {
            font-size: 15px;
            color: #03bc70;
          }
        }
      }
    }
  }
}
.banner {
  width: 588px;
  height: 171px;
  border-radius: 20px;
}
/deep/.ivu-carousel-dots li button {
  width: 14px;
  height: 2px;
  background: #000000;
}
.historyList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 0 20px;
  box-sizing: border-box;
  .historyList_box_ALL {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    .historyList_box {
      border: 1px solid #dcdee2;
      padding: 0 3px;
      border-radius: 3px;
      margin-right: 10px;
      cursor: pointer;
    }
    .historyList_box:hover {
      background-color: #03bc70;
    }
  }
}
.select_all {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .select_btn {
    width: 86px;
    height: 32px;
    background: #03bc70;
    border-radius: 10px 10px 10px 10px;
    cursor: pointer;
    line-height: 32px;
    text-align: center;
    color: #fff;
    margin-left: 20px;
  }
}
.title1_gopage {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
