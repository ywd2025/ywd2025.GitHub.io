<template>
  <div class="header_search">
    <img :src="$imgUrl + '/newUi/select.png'" alt="" class="select_img" />
    <input
      v-model="value"           
      :placeholder="$t('otc.publishad.inputtip1')"
      class="input_none"
      @blur="hideSelectList"
      @focus="getSelectList"
    />
    <div class="select_list" v-if="show">
      <div v-if="!value">
        <div class="select_title">{{ $t("newUi.text70") }}</div>
        <div
          class="select_item"
          v-for="(item, index) in listNewCoinListL"
          :key="index"
          @click="go_page(item.tourl)"
        >
          <img :src="item.coinImg" alt="" class="coin_img" />
          <div class="item_right">
            <div>
              <div>{{ item.symbol }}</div>
              <div>{{ $t("follow.universal.txt3") }}</div>
            </div>
            <div class="item_close">{{ getFixed(item.close) }}</div>
            <div
              :class="parseFloat(item.rose) > 0 ? 'item_rose' : 'item_rose1'"
            >
              {{ item.rose }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="select_title">{{ $t("ctc.trade") }}</div>
        <div
          class="select_item"
          v-for="(item, index) in selectCoin"
          :key="index"
          @click="go_page(item.tourl)"
          v-show="selectCoin.length > 0"
        >
          <img :src="item.coinImg" alt="" class="coin_img" />
          <div class="item_right">
            <div>
              <div>{{ item.symbol }}</div>
              <div>
                {{
                  item.tourl.includes("swap")
                    ? $t("new.universal.contract")
                    : $t("new.universal.spot")
                }}
              </div>
            </div>
            <div class="item_close">{{ getFixed(item.close) }}</div>
            <div
              :class="parseFloat(item.rose) > 0 ? 'item_rose' : 'item_rose1'"
            >
              {{ item.rose }}
            </div>
          </div>
        </div>
        <div v-show="selectCoin.length === 0" class="no_data">
          <no-data></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import noData from "./noData.vue";
export default {
  components: {
    noData,
  },
  data() {
    return {
      value: "",
      show: false,
      selectCoin: [],
    };
  },
  created() {
  },
  watch: {
    value(newVal) {
      newVal = String(newVal).toLowerCase();
      this.selectCoin = this.waitlist.filter((item) => {
        return item.symbol
          .toString()
          .toLowerCase()
          .includes(newVal);
      });
    },
  },
  computed: {
    listNewCoinListL() {
      return this.$store.state.newallCoinSwap.slice(0, 10);
    },
    waitlist() {
      let a = this.$store.state.newallCoinSwap;
      let b = this.$store.state.newallCoinExchange;
      b.forEach((element) => {
        a.push(element);
      });
      return a;
    },
  },
  methods: {
    // 获取焦点显示
    getSelectList() {
      this.show = true;
    },
    // 失焦隐藏
    hideSelectList() {
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
    //跳转页面
    go_page(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style scoped lang="less">
.header_search {
  display: flex;
  align-items: center;
  padding: 7px 11px;
  width: 206px;
  height: 38px;
  background: #f3f4f6;
  border-radius: 25px;
  .input_none {
    width: 150px;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
  }
  .select_img {
    width: 23px;
    height: 23px;
    margin-right: 8px;
  }
}
@media (max-width: 1200px) {
  .header_search {
    display: none;
  }
}
.select_list {
  width: 400px;
  height: 630px;
  position: absolute;
  top: 60px;
  right: 270px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  .select_title {
    margin-left: 10px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 5px;
  }
  .select_item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    padding: 5px 10px;
    .coin_img {
      width: 26px;
      height: 26px;
      margin-right: 10px;
    }
    .item_right {
      width: 340px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 36px;
      line-height: 18px;
      margin-bottom: 6px;
      div {
        flex: 1;
      }
      .item_close {
        font-size: 14px;
        text-align: right;
      }
      .item_rose1 {
        font-size: 14px;
        text-align: right;
        color: #F6465D;
      }
      .item_rose {
        font-size: 14px;
        text-align: right;
        color: #03C59E;
      }
    }
  }
  .select_item:hover {
    background: #f5f5f5;
  }
}
.select_list::-webkit-scrollbar {
  display: none;
}
.no_data {
  width: 400px;
  height: 630px;
}
</style>
