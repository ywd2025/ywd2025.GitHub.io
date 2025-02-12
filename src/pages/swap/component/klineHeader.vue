<template>
  <div>
    <div class="symbol_header">
      <div
        class="item"
        style="
              margin-left: 10px;
              display: flex;
              align-items: center;
              cursor: pointer;
            "
      >
        <div @click="currentCoinFavorChange">
          <Icon
            v-if="currentCoinIsFavor"
            type="ios-star"
            color="#C0C0C0"
            size="24"
          />
          <Icon v-else type="ios-star-outline" color="#C0C0C0" size="24" />
        </div>
        <span
          @click="show_list()"
          class="coin"
          style="margin-left: 10px; font-size: 20px;color: #000000;"
          >{{ currentCoin.symbol }}
          <span style="font-size: 12px; margin-left: 5px;color:#3D3D3D;">{{
            $t("swap.swapindex")
          }}</span>
        </span>
        <Icon
          @click="show_list()"
          type="md-arrow-dropup"
          color="#3D3D3D"
          size="24"
          v-if="list_show"
        />
        <Icon
          @click="show_list()"
          type="md-arrow-dropdown"
          color="#3D3D3D"
          size="24"
          v-else
        />
      </div>
      <div style="height: 40px; border-right: 1px solid #EEEEEE"></div>
      <div class="item">
        <div class="item_price">
          {{ getFixed(currentCoin.price) }}
        </div>
        <div
          class="num"
          :class="{
            buy: currentCoin.change > 0,
            sell: currentCoin.change < 0,
          }"
        >
          <span style="margin-right: 2px;">
            {{ getFixed(currentCoin.change) }}</span
          >
          {{ currentCoin.rose }}
        </div>
      </div>
      <div class="item" v-if="pageInfo.feePercent">
        <span class="text"
          >{{ $t("carouselItem.text13") }}/{{ $t("newUi.text71") }}</span
        >
        <span class="num">
          <span class="yellow"> {{ Number(pageInfo.feePercent) * 100 }}%</span
          >/{{ all_time_interval }}
        </span>
      </div>
      <div class="item">
        <span class="text">{{ $t("service.high") }}</span>
        <span class="num">{{ currentCoin.high }}</span>
      </div>
      <div class="item">
        <span class="text">{{ $t("service.low") }}</span>
        <span class="num">{{ currentCoin.low }}</span>
      </div>
      <div class="item">
        <span class="text"
          >{{ $t("new.markets.volume") }}({{ currentCoin.coin }})</span
        >
        <span class="num">{{ currentCoin.volume }}</span>
      </div>
      <div class="item">
        <span class="text">{{ $t("new.markets.volume") }}(USDT)</span>
        <span class="num">{{ currentCoin.turnover }}</span>
      </div>
    </div>
    <div class="coin_list" v-show="list_show">
      <div class="search_all">
        <img :src="$imgUrl + '/newUi/select.png'" alt="" class="select_img" />
        <input
          search
          :placeholder="$t('common.searchplaceholderswap')"
          @on-change="seachInputChange"
          v-model="searchKey"
          class="input_none"
        />
      </div>
      <div class="coin_tabs">
        <div
          :class="coinType == 'favor' ? 'tabActive' : 'tab'"
          @click="changeBaseCion('favor')"
        >
          {{ $t("service.CUSTOM") }}
        </div>
        <div
          :class="coinType == 'usdt' ? 'tabActive' : 'tab'"
          @click="changeBaseCion('usdt')"
        >
          {{ $t("newUi.text73") }}
        </div>
      </div>
      <div class="center_all">
        <div class="center_header">
          <div>{{ $t("new.universal.contract") }}</div>
          <div>{{ $t("swap.lastprice") }}</div>
          <div @click="handleFillter()">
            {{ $t("newUi.text72") }}
            <img
              class="fillterIcon"
              src="@/assets/images/newUi/filternone.png"
              alt=""
              v-if="flippedArray"
            />
            <img
              class="fillterIcon"
              v-else
              src="@/assets/images/newUi/fillter.png"
              alt=""
              :class="{ fillterIcon: true, flipped: isFlippedArray }"
            />
          </div>
          <div>{{ $t("carouselItem.text13") }}</div>
        </div>
        <div class="center_list">
          <div
            class="center_item"
            v-for="(item, index) in lineCurrentCoin"
            :key="index"
            @click.stop="gohref(item)"
          >
            <div class="center_item_one">
              <Icon
                type="ios-star-outline"
                :color="item.isFavor ? '#F0B90B' : '#C0C0C0'"
                size="14"
                class="item_one_icon"
                @click.stop="changeFavor(item)"
              />
              <div class="item_one">
                <div class="item_one_top">
                  <div class="coin_name">{{ item.symbol }}</div>
                  <div class="coin_type">{{ $t("swap.swapindex") }}</div>
                </div>
                <div class="item_one_bottom">
                  {{ $t("swap.volume") }} {{ getNewUnit(item.volume) }}
                </div>
              </div>
            </div>
            <div class="center_item_two">
              {{ getFixed(item.close) }}
            </div>
            <div
              class="center_item_three"
              :class="{
                buy: item.change > 0,
                sell: item.change < 0,
              }"
            >
              {{ item.rose }}
            </div>
            <div class="center_item_four">
              {{ item.feePercent }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list_show: false,
      all_time_interval: null,
      all_time: "", //倒计时
      searchKey: "",
      flippedArray: true, //涨跌图排序字段
      isFlippedArray: false,
      intervalId: null, //定时器
      dataIndex: [],
    };
  },
  props: {
    nowsymbol: {
      type: String,
      default: () => {},
    },
    coinType: {
      type: String,
      default: "usdt",
    },
    currentCoinIsFavor: {
      type: Boolean,
      default: false,
    },
    pageInfo: {
      type: Object,
      default: () => {},
    },
    lineCurrentCoin: {
      type: [Object, Array],
      default: () => {},
    },
    currentCoin: {
      type: [Object, Array],
      default: () => {},
    },
  },
  watch: {},
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    dataList() {
      if (this.coinType == "favor") {
        return this.lineCurrentCoin;
      } else if (this.coinType == "usdt") {
        return this.lineCurrentCoin;
      }
    },
  },
  mounted() {
    this.getNowdata(); // 组件挂载后立即获取数据
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  methods: {
    currentCoinFavorChange() {
      this.$emit("currentCoinFavorChange");
    },
    changeFavor(type) {
      this.$emit("changeFavor", type);
    },
    // 倒计时
    getNowdata() {
      let now = new Date();
      let hours = String(now.getHours()).padStart(2, "0");
      let minutes = String(now.getMinutes()).padStart(2, "0");
      let seconds = String(now.getSeconds()).padStart(2, "0");
      if (hours < 8) {
        let hours_time = (8 - hours) * 3600;
        let minutes_time = minutes * 60;
        this.all_time = hours_time - minutes_time - seconds;
      } else if (hours < 16) {
        let hours_time = (16 - hours) * 3600;
        let minutes_time = minutes * 60;
        this.all_time = hours_time - minutes_time - seconds;
      } else if (hours < 24) {
        let hours_time = (24 - hours) * 3600;
        let minutes_time = minutes * 60;
        this.all_time = hours_time - minutes_time - seconds;
      }
      if (this.all_time <= 0) {
        clearInterval(this.intervalId);
        this.getNowdata();
      }
      if (this.all_time > 0) {
        this.intervalId = setInterval(() => {
          if (this.all_time > 0) {
            this.all_time--; // 每秒减一
            let a = this.getTime(this.all_time);
            this.all_time_interval = a[0] + ":" + a[1] + ":" + a[2];
          } else {
            clearInterval(this.intervalId); // 倒计时结束后清除定时器
            this.intervalId = null;
            this.getNowdata();
          }
        }, 1000);
      }
    },
    getTime(time) {
      // 转换为式分秒
      let h = parseInt((time / 60 / 60) % 24);
      h = h < 10 ? "0" + h : h;
      let m = parseInt((time / 60) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(time % 60);
      s = s < 10 ? "0" + s : s;
      // 作为返回值返回
      return [h, m, s];
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.getNowdata(); // 如果页面可见，则重新获取数据并可能启动定时器
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null; // 清除定时器
        }
      }
    },
    // 显示隐藏 币种的下拉
    show_list() {
      this.list_show = !this.list_show;
    },
    seachInputChange() {
      this.searchKey = this.searchKey.toUpperCase();
      this.dataIndex = this.lineCurrentCoin.filter((item) =>
        item.item.symbol
          .toString()
          .toLowerCase()
          .includes(this.searchKey)
      );
    },
    // 切换tabs
    changeBaseCion(str) {
      this.$emit("changeBaseCion", str);
    },
    // 排序
    handleFillter() {
      if (this.flippedArray == true) {
        this.flippedArray = false;
      } else if (this.flippedArray == false && this.isFlippedArray == false) {
        this.isFlippedArray = !this.isFlippedArray; // 更新对应筛选项的翻转状态
      } else if (this.flippedArray == false && this.isFlippedArray == true) {
        this.flippedArray = true;
        this.isFlippedArray = false;
      }
    },
    // 点击切币种
    gohref(item) {
      this.list_show = false;
      this.$emit("gohref", item);
    },
  },
  beforeDestroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },
};
</script>

<style scoped lang="less">
.symbol_header {
  width: 100%;
  height: 59px;
  display: flex;
  align-items: center;
  padding: 0px 19px;
  .item {
    margin: 0 13px;
    .yellow {
      font-size: 12px;
      color: #ffae00;
    }
    .item_price {
      font-size: 18px;
      font-weight: 500;
    }
    .price-cny {
      font-size: 9px;
      color: #000000;
    }

    .coin {
      display: flex;
      align-items: center;
      font-size: 20px;
    }

    .text {
      font-family: Source Han Sans, Source Han Sans;
      width: 100%;
      display: block;
      font-weight: 400;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      line-height: 13px;
      margin-bottom: 5px;
    }

    .num {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.87);
    }

    > img {
      display: block;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
.coin_list {
  position: absolute;
  top: 195px;
  left: 0px;
  width: 471px;
  height: 602px;
  background: #ffffff;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
  z-index: 997;
  .search_all {
    margin: 17px auto 10px;
    width: 442px;
    height: 40px;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid #e2e1e1;
    display: flex;
    align-items: center;
    padding: 8px;
    .select_img {
      width: 23px;
      height: 23px;
    }
    .input_none {
      width: 400px;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
    }
  }
  .coin_tabs {
    padding: 0 18px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e1e1;
    .tab {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 700;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      margin-right: 26px;
      height: 25px;
      line-height: 17px;
      cursor: pointer;
    }
    .tabActive {
      font-weight: 700;
      font-size: 12px;
      color: #03c59e;
      line-height: 17px;
      margin-right: 26px;
      height: 23px;
      border-bottom: 2px solid #03c59e;
      cursor: pointer;
    }
  }
  .center_all {
    margin-top: 14px;
    .center_header {
      display: flex;
      align-items: center;
      padding: 0 18px;
      div {
        flex: 1;
        font-weight: 400;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
      }
      div:nth-child(1) {
        flex: 1.5;
        text-align: left;
      }
      div:nth-child(2) {
        text-align: center;
      }
      div:nth-child(3) {
        flex: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 7px;
          height: 10px;
          cursor: pointer;
        }
      }
      div:nth-child(4) {
        text-align: right;
      }
    }
    .center_list {
      height: 475px;
      overflow-y: auto;
      .center_item {
        padding: 0 18px;
        cursor: pointer;
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        .center_item_one {
          flex: 1.5;
          display: flex;
          .item_one_icon {
            margin-top: 3px;
          }
          .item_one {
            margin-left: 5px;
            .item_one_top {
              display: flex;
              align-items: center;
              .coin_name {
                font-weight: 400;
                font-size: 12px;
                color: #202020;
              }
              .coin_type {
                width: 34px;
                height: 18px;
                background: #f5f5f5;
                border-radius: 3px 3px 3px 3px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .item_one_bottom {
              font-weight: 400;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.54);
            }
          }
        }
        .center_item_two {
          flex: 1;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
          color: #202020;
        }
        .center_item_three {
          flex: 0.8;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
          color: #202020;
        }
        .center_item_four {
          flex: 1;
          text-align: right;
          font-weight: 400;
          font-size: 14px;
          color: #202020;
        }
      }
      .center_item:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
.fillterIcon {
  transition: transform 0.3s ease-in-out; /* 添加过渡效果 */
}

.flipped {
  transform: rotateX(180deg); /* 沿 X 轴翻转 180 度 */
}
</style>
