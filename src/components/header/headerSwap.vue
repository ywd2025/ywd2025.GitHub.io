<template>
  <div>
    <Poptip
      @on-popper-show="handleActivesIn"
      @on-popper-hide="handleActivesOut"
      style="display: flex; align-items: center"
      trigger="hover"
      width="274"
      placement="bottom-start"
    >
      <div style="display: flex; align-items: center" v-if="openSwap == 1">
        <router-link :to="toUrl">
          <span style="color: #000000;">{{ name }}</span>
        </router-link>
        <Icon
          v-if="actives"
          type="md-arrow-dropdown"
          color="#000000"
          size="24"
        />
        <Icon v-else type="md-arrow-dropup" color="#000000" size="24" />
      </div>
      <div class="active_poptip" slot="content">
        <div class="title">{{ $t("newUi.text20") }}</div>
        <div class="active_list_box">
          <div
            class="active_list"
            v-for="(item, index) in allCoin"
            :key="index"
            @click="go_pages(item.symbol)"
          >
            <div class="icon">
              <img :src="item.coinImg" alt="" class="icon_img" />
            </div>
            <div class="name">
              <div class="name_top">
                <div>{{ item.symbol }}</div>
                <div :style="{ color: item.change < 0 ? '#ea4337' : '#03C59E' }">
                  {{ item.rose }}
                </div>
              </div>
              <div class="name_bottom">${{ getFixed(item.close) }}</div>
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
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    allCoin: function() {
      if (this.toUrl == "/swap") {
        return this.$store.state.newallCoinSwap;
      } else {
        return this.$store.state.newallCoinExchange;
      }
    },
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
    toUrl: {
      type: String,
      default: "/swap",
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
    go_pages(symbol) {
      if (this.toUrl == "/swap") {
        if (this.$store.state.swapCoin) {
          let arr = [
            "contract-trade-pc/" +
              this.$store.state.swapCoin.toUpperCase().replace("_", "-"),
            "contract-plate/" +
              this.$store.state.swapCoin.toUpperCase().replace("_", "-"),
          ];
          if (this.isLogin) {
            arr.push(
              "contract-takeposition-doc/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.swapCoin.toUpperCase().replace("_", "-"),
              "contract-takeposition/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.swapCoin.toUpperCase().replace("_", "-"),
              "contract-spot/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.swapCoin.toUpperCase().replace("_", "-"),
              "current-contract-order/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.swapCoin.toUpperCase().replace("_", "-")
            );
          }
          this.$mqttService.unsubscribe(arr, function() {});
        }
      } else {
        if (this.$store.state.exchangeCoin && this.isLogin) {
          let arr = [
            "exchange-trade-pc/" +
              this.$store.state.exchangeCoin.toUpperCase().replace("_", "-"),
            "exchange-plate/" +
              this.$store.state.exchangeCoin.toUpperCase().replace("_", "-"),
          ];
          if (this.isLogin) {
            arr.push(
              "exchange-spot/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.exchangeCoin.toUpperCase().replace("_", "-"),
              "current-exchange-order/" +
                this.$store.getters.member.id +
                "/" +
                this.$store.state.exchangeCoin.toUpperCase().replace("_", "-")
            );
          }
          this.$mqttService
            .unsubscribe(arr)
            .then(() => {})
            .catch((error) => {
              console.error("Failed to unsubscribe:", error);
            });
        }
      }
      let url = `${this.toUrl}/${(symbol.split("/")[0] || "").toLowerCase()}_${(
        symbol.split("/")[1] || ""
      ).toLowerCase()}`;
      this.$router.push(url);
    },
    // getDataList() {
    //   if (this.toUrl == "/swap") {
    //     this.$http
    //       .post(this.host + this.api.markets.swapThumb, {})
    //       .then((res) => {
    //         this.allCoin = res.data;
    //       });
    //   } else {
    //     this.$http
    //       .post(this.host + this.api.markets.marketThumb, {})
    //       .then((res) => {
    //         this.allCoin = res.data.data;
    //       });
    //   }
    // },
  },
};
</script>
<style lang="less" scoped>
.active_poptip {
  .title {
    font-weight: 400;
    font-size: 15px;
    color: #000000;
    line-height: 22px;
    text-align: left;
    padding-left: 5px;
  }
  .title::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 15px;
    width: 3px;
    height: 16px;
    background: #21e7bf;
    border-radius: 0px 0px 0px 0px;
  }
  .active_list_box {
    max-height: 493px;
    overflow-y: auto;
    border-top: 1px solid #f9f9f9;
    margin-top: 10px;
    .active_list {
      height: 58px;
      border-radius: 10px 10px 10px 10px;
      display: flex;
      padding: 6px 10px;
      .icon {
        width: 28px;
        display: flex;
        justify-content: center;
        margin-top: 5px;
        margin-right: 11px;
        .icon_img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }
      .name {
        width: 190px;
        .name_top {
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          font-size: 15px;
          color: #000000;
        }
        .name_bottom {
          text-align: left;
          font-weight: 400;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }

    .active_list:hover {
      background-color: #f9f9f9;
    }
  }
  .active_list_box::-webkit-scrollbar {
    display: none;
  }
}
</style>
