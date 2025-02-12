<template>
  <div>
    <img
      src="../../../assets/images/newUi/count.png"
      alt=""
      style="width: 13px; height: 12px"
      :class="isLogin ? 'cp' : 'cn'"
      @click="head_oprn"
    />
    <Modal footer-hide v-model="picModal" width="717">
      <Dropdown trigger="click" style="margin-left: 20px">
        <div class="dropdown_list">
          <div class="now_coin">{{ nowCoin }}</div>
          <div class="dropdown_box">{{ $t("swap.swapindex") }}</div>
          <Icon
            v-if="actives"
            type="md-arrow-dropdown"
            color="#000000"
            size="10"
          />
          <Icon v-else type="md-arrow-dropup" color="#000000" size="10" />
        </div>
        <DropdownMenu slot="list" class="dropdown_item" style="width: 200px;">
          <DropdownItem v-for="(item, index) in allCoin" :key="index">
            <span @click="selectItem(item)">{{ item.symbol }}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div class="content">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="entrustOrderType == 'income' + index ? 'activite' : ''"
          @click="changeEntrustOrderType('income' + index)"
          class="all_select"
        >
          {{ item.value }}
        </div>
        <div class="line"></div>
        <div v-if="entrustOrderType == 'income0'" class="content_all">
          <div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{$t('newUi.text74')}}
              </div>
              <div class="two_btn">
                <div
                  @click="changeBtncolor(false)"
                  :class="btn_color ? 'btn_all' : 'btn_green'"
                >
                  {{$t('newUi.text75')}}
                </div>
                <div
                  @click="changeBtncolor(true)"
                  :class="btn_color ? 'btn_red' : 'btn_all'"
                >
                  {{$t('newUi.text76')}}
                </div>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("exchange.openprice") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.price"
                  type="text"
                />
                <span class="unit">USDT</span>
                <span class="new" @click="headNewPrice">{{
                  $t("exchange.lastprice")
                }}</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("exchange.closeprice") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.closePrice"
                  type="text"
                />
                <span class="unit">USDT</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("service.ExchangeNum") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.valom"
                  type="text"
                />
                <span class="unit">{{ $t("swap.shareNumber") }}</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("carouselItem.text226") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.leaver"
                  type="text"
                />
                <span class="unit">x</span>
              </div>
            </div>
            <div class="btn_submit" @click="calculate(0)">
              {{ $t("carouselItem.text227") }}
            </div>
          </div>
          <div class="content_right">
            <div class="content_right_title">
              {{ $t("carouselItem.text228") }}
            </div>
            <div class="content_right_one">
              <div>{{ $t("carouselItem.text229") }}</div>
              <div>
                {{ openAssetsText ? Number(openAssetsText).toFixed(4) : "--" }}
              </div>
            </div>
            <div class="content_right_one">
              <div>{{ $t("swap.pos_Pl") }}</div>
              <div>
                {{ incomeText ? incomeText.toFixed(4) + "USDT" : "--" }}
              </div>
            </div>
            <div class="content_right_one">
              <div>{{ $t("swap.pos_Ratio") }}</div>
              <div>{{ yieldText ? yieldText.toFixed(4) + "%" : "--" }}</div>
            </div>
          </div>
        </div>
        <div v-if="entrustOrderType == 'income1'" class="content_all">
          <div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{$t('newUi.text77')}}
              </div>
              <div class="two_btn">
                <div
                  @click="changeUniversalcolor(false)"
                  :class="universal_color ? 'btn_all' : 'btn_green'"
                >
                  {{ $t("follow.universal.txt4") }}
                </div>
                <div
                  @click="changeUniversalcolor(true)"
                  :class="universal_color ? 'btn_red' : 'btn_all'"
                >
                  {{ $t("follow.universal.txt5") }}
                </div>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{$t('newUi.text74')}}
              </div>
              <div class="two_btn">
                <div
                  @click="changeBtncolor(false)"
                  :class="btn_color ? 'btn_all' : 'btn_green'"
                >
                  {{$t('newUi.text75')}}
                </div>
                <div
                  @click="changeBtncolor(true)"
                  :class="btn_color ? 'btn_red' : 'btn_all'"
                >
                  {{$t('newUi.text76')}}
                </div>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("exchange.openprice") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.price"
                  type="text"
                />
                <span class="unit">USDT</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("service.ExchangeNum") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.valom"
                  type="text"
                />
                <span class="unit">{{ $t("swap.shareNumber") }}</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("carouselItem.text226") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.leaver"
                  type="text"
                />
                <span class="unit">x</span>
              </div>
            </div>
            <div class="btn_submit" @click="calculate(1)">
              {{ $t("carouselItem.text227") }}
            </div>
          </div>
          <div class="content_right">
            <div class="content_right_title">
              {{ $t("carouselItem.text228") }}
            </div>
            <div class="content_right_one">
              <div>{{ $t("carouselItem.text224") }}</div>
              <div>
                {{ qpPriceText ? Number(qpPriceText).toFixed(4) : "--" }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="entrustOrderType == 'income2'" class="content_all">
          <div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{$t('newUi.text74')}} 
              </div>
              <div class="two_btn">
                <div
                  @click="changeBtncolor(false)"
                  :class="btn_color ? 'btn_all' : 'btn_green'"
                >
                  {{$t('newUi.text75')}}
                </div>
                <div
                  @click="changeBtncolor(true)"
                  :class="btn_color ? 'btn_red' : 'btn_all'"
                >
                  {{$t('newUi.text76')}}
                </div>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("carouselItem.text230") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.closePrice"
                  type="text"
                />
                <span class="unit">USDT</span>
              </div>
            </div>
            <div class="rowAll">
              <div class="rowAll_title">
                {{ $t("carouselItem.text226") }}
              </div>
              <div class="input_one">
                <input
                  class="input_one_left"
                  v-model="income.leaver"
                  type="text"
                />
                <span class="unit">x</span>
              </div>
            </div>
            <div class="btn_submit" @click="calculate(2)">
              {{ $t("carouselItem.text227") }}
            </div>
          </div>
          <div class="content_right">
            <div class="content_right_title">
              {{ $t("carouselItem.text228") }}
            </div>
            <div class="content_right_one">
              <div>{{ $t("carouselItem.text225") }}</div>
              <div>
                {{ isOpenText ? Number(isOpenText).toFixed(4) : "--" }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="entrustOrderType == 'income3'">
          <div class="two_btn_long">
            <div
              @click="changeBtncolor(false)"
              :class="btn_color ? 'btn_all1' : 'btn_green1'"
            >
              {{ $t("exchange.buyin") }}
            </div>
            <div
              @click="changeBtncolor(true)"
              :class="btn_color ? 'btn_red1' : 'btn_all1'"
            >
              {{ $t("exchange.sellout") }}
            </div>
          </div>
          <div class="all_content">
            <div class="all_content_title">
              <div>{{ $t("swap.open") }}</div>
              <div>{{ $t("exchange.openprice") }}</div>
              <div>{{ $t("carouselItem.text232") }}</div>
              <div>{{ $t("buyCoin.universal.operate") }}</div>
            </div>
            <div class="all_list_table">
              <div
                class="all_table_content"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="all_table_content_one">{{ index + 1 }}</div>
                <div class="input_table">
                  <input
                    class="input_table_one"
                    v-model="item.traderPrice"
                    type="text"
                  />
                  <span class="table_unit">USDT</span>
                </div>
                <div class="input_table">
                  <input
                    class="input_table_one"
                    v-model="item.volume"
                    type="text"
                  />
                  <span class="table_unit">{{ $t("swap.shareNumber") }}</span>
                </div>
                <div class="all_table_content_four">
                  <img
                    :src="$imgUrl + '/jisuan_five.png'"
                    alt=""
                    style="width: 16px; height: 15px;cursor: pointer;"
                    @click="close_list(index)"
                  />
                </div>
              </div>
            </div>
            <div class="add_list" @click="headPosition">
              +{{ $t("carouselItem.text233") }}
            </div>
          </div>
          <div class="btn_bottom">
            <div class="btn_bottom_left">
              <div>{{ $t("carouselItem.text234") }}</div>
              <div>
                {{
                  traderPriceText ? Number(traderPriceText).toFixed(4) : "--"
                }}
              </div>
            </div>
            <div class="btn_submit_long" @click="calculate(3)">
              {{ $t("carouselItem.text227") }}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLists: [],
      picModal: false,
      entrustOrderType: "income0",
      items: [
        { value: this.$t("follow.universal.txt8") },
        { value: this.$t("carouselItem.text224") },
        { value: this.$t("carouselItem.text225") },
        { value: this.$t("exchange.openprice") },
      ],
      list: [{ traderPrice: "", volume: "" }],
      btn_color: false,
      universal_color: false,
      income: {
        price: "",
        closePrice: "",
        valom: "",
        leaver: "",
      },
      closeFee: "",
      shareNumber: "",
      openAssetsText: "",
      incomeText: "",
      yieldText: "",
      qpPriceText: "",
      isOpenText: "",
      traderPriceText: "",
      actives: true,
      nowCoin: "",
    };
  },
  props: {
    // symbol: String,
    // leaverList: [Object, Array],
    // moneyCoin: [String, Number],
    contractCoinInfo: [Object, Array],
    myBalance: [String, Number],
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    allCoin() {
      if (
        this.$store.state.newallCoinSwap &&
        this.$store.state.newallCoinSwap.length > 0
      ) {
        this.nowCoin = this.$store.state.newallCoinSwap[0].symbol;
      }
      return this.$store.state.newallCoinSwap;
    },
    nowCoinPrice() {
      var allList = this.$store.state.newallCoinSwap;
      allList.map((item, index) => {
        if (this.nowCoin == item.symbol) {
          return item.close;
        }
      });
    },
  },
  created() {
    this.getRuleList();
  },

  mounted() {},
  methods: {
    // 获取合约不同杠杆下合约最低保证金率
    getRuleList() {
      this.$http
        .get(this.host + this.api.finance.getRuleMarginRate, {})
        .then((res) => {
          this.allLists = res.data.data;
        });
    },
    // 下拉选中
    selectItem(item) {
      console.log(item);
      this.nowCoin = item.symbol;
    },
    head_oprn() {
      if (!this.isLogin) {
        return;
      }
      this.picModal = true;
      this.btn_color = false;
      this.universal_color = false;
      for (let key in this.income) {
        this.income[key] = "";
      }
      this.openAssetsText = "";
      this.incomeText = "";
      this.yieldText = "";
      this.qpPriceText = "";
      this.isOpenText = "";
      this.traderPriceText = "";
    },
    changeEntrustOrderType(e) {
      this.entrustOrderType = e;
      for (let key in this.income) {
        this.income[key] = "";
      }
      this.openAssetsText = "";
      this.incomeText = "";
      this.yieldText = "";
      this.qpPriceText = "";
      this.isOpenText = "";
      this.traderPriceText = "";
      this.btn_color = false;
      this.universal_color = false;
    },
    changeBtncolor(e) {
      this.btn_color = e;
    },
    changeUniversalcolor(e) {
      this.universal_color = e;
    },
    headNewPrice() {
      var allList = this.$store.state.newallCoinSwap;
      allList.map((item, index) => {
        if (this.nowCoin == item.symbol) {
          this.income.price = item.close;
        }
      });
    },
    headPosition() {
      this.list.push({ traderPrice: "", volume: "" });
    },
    close_list(index) {
      this.list.splice(index, 1);
    },
    // 计算
    calculate(item) {
      var closePriceTemp = this.nowCoinPrice.closePrice;
      var traderPriceTemp = this.nowCoinPrice.price;
      var volumeTemp = this.nowCoinPrice.valom;
      var leverageTemp = this.nowCoinPrice.leaver;
      var maintenanceMarginRate = this.getMaintenanceMarginRateall(
        this.allLists,
        Number(this.nowCoinPrice.leaver),
        this.nowCoinPrice.contractCoinId
      );
      var allList = this.$store.state.newallCoinSwap;
      allList.map((item, index) => {
        if (this.symbol == item.symbol) {
          this.shareNumber = item.shareNumber;
          this.closeFee = item.closeFee;
        }
      });
      if (item == 0) {
        if (
          !volumeTemp ||
          !closePriceTemp ||
          !leverageTemp ||
          !traderPriceTemp
        ) {
          this.$Message.info(this.$t("carouselItem.text231"));
          return;
        }
        // 担保资产
        this.openAssetsText = this.margin(
          volumeTemp,
          this.shareNumber,
          leverageTemp,
          traderPriceTemp
        );
        // 收益
        this.incomeText =
          this.btn_color === false
            ? this.buyIncome(
                closePriceTemp,
                traderPriceTemp,
                this.shareNumber,
                volumeTemp
              )
            : this.sellIncome(
                closePriceTemp,
                traderPriceTemp,
                this.shareNumber,
                volumeTemp
              );
        // 收益率
        this.yieldText = this.swapYield(this.incomeText, this.openAssetsText);
      } else if (item == 1) {
        if (!volumeTemp || !leverageTemp || !traderPriceTemp) {
          this.$Message.info(this.$t("carouselItem.text231"));
          return;
        }
        this.openAssetsText = this.margin(
          volumeTemp,
          this.shareNumber,
          leverageTemp,
          traderPriceTemp
        );
        var closeFeeNum = this.closingFees(
          this.closeFee,
          traderPriceTemp,
          this.shareNumber,
          volumeTemp
        );
        // 强平价
        if (!universal_color) {
          this.qpPriceText =
            this.btn_color === false
              ? this.buyAllForcePrice(
                  traderPriceTemp,
                  maintenanceMarginRate,
                  this.openAssetsText,
                  myBalance,
                  closeFeeNum,
                  this.shareNumber,
                  volumeTemp
                )
              : this.buyForcePrice(
                  traderPriceTemp,
                  maintenanceMarginRate,
                  this.openAssetsText,
                  myBalance,
                  closeFeeNum,
                  this.shareNumber,
                  volumeTemp
                );
        } else {
          this.qpPriceText =
            this.btn_color === false
              ? this.buyForcePrice(
                  traderPriceTemp,
                  maintenanceMarginRate,
                  this.openAssetsText,
                  closeFeeNum,
                  this.shareNumber,
                  volumeTemp
                )
              : this.sellForcePrice(
                  traderPriceTemp,
                  maintenanceMarginRate,
                  this.openAssetsText,
                  closeFeeNum,
                  this.shareNumber,
                  volumeTemp
                );
        }
      } else if (item == 2) {
        if (!leverageTemp || !closePriceTemp) {
          this.$Message.info(this.$t("carouselItem.text231"));
          return;
        }
        let proportion =
          this.btn_color == false
            ? this.contractCoinInfo.buyProportion
            : this.contractCoinInfo.sellProportion;
        this.isOpenText = this.openSheetNumber(
          leverageTemp,
          closePriceTemp,
          this.shareNumber,
          this.nowCoinPrice,
          proportion
        );
      } else if (item == 3) {
        this.traderPriceText = "";
        let totalPrice = 0;
        let volume = 0;
        let hasValidData = false;
        this.list.forEach((item) => {
          const price = parseFloat(item.traderPrice);
          const vol = parseFloat(item.volume);
          if (!isNaN(price) && !isNaN(vol)) {
            totalPrice += price * vol;
            volume += vol;
            hasValidData = true;
          } else {
            this.$Message.info(this.$t("carouselItem.text231"));
            return;
          }
        });
        if (hasValidData) {
          this.traderPriceText = totalPrice / volume;
        } else {
          this.traderPriceText = 0;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
}
.content {
  margin-top: 20px;
}
.all_select {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #333;
  margin: 0 20px;
  cursor: pointer;
}
.activite {
  height: 30px;
  border-bottom: 2px solid #35e9c5;
  color: #333;
}
.line {
  border-bottom: 1px solid #dcdcdc;
  margin: 10px 0;
}
.content_all {
  display: flex;
}
.rowAll {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.rowAll_title {
  width: 70px;
  font-weight: 400;
  font-size: 14px;
  color: #757575;
}
.two_btn {
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.btn_all {
  width: 120px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #333;
  background-color: #f2f2f2;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.btn_green {
  width: 120px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #fff;
  background-color: #35e9c5;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.btn_red {
  width: 120px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #fff;
  background-color: #f6465d;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.content_right {
  width: 400px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
}
.input_one {
  position: relative;
  margin-right: 5px;
}
.input_one_left {
  width: 250px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  text-indent: 10px;
}

.unit {
  position: absolute;
  top: 5px;
  right: 20px;
  color: #7c7f82;
}
.new {
  position: absolute;
  top: 5px;
  right: 60px;
  color: #35e9c5;
  cursor: pointer;
}
.content_right_title {
  font-size: 14px;
}
.btn_submit {
  width: 323px;
  height: 40px;
  background: #35e9c5;
  border-radius: 5px 5px 5px 5px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  margin-top: 20px;
  margin-left: 20px;
  cursor: pointer;
}
.content_right_one {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  :nth-child(1) {
    color: #7c7f82;
    font-size: 12px;
  }
  :nth-child(2) {
    color: #333;
    font-size: 12px;
  }
}
.two_btn_long {
  display: flex;
  justify-content: space-between;
}
.btn_all1 {
  width: 230px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #333;
  background-color: #f2f2f2;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.btn_green1 {
  width: 230px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #fff;
  background-color: #35e9c5;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.btn_red1 {
  width: 230px;
  height: 30px;
  font-size: 14px;
  border-radius: 3px;
  color: #fff;
  background-color: #f6465d;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.all_content {
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  margin-top: 20px;
  height: 300px;
}
.all_content_title {
  width: 100%;
  height: 30px;
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  :nth-child(1) {
    width: 50px;
    text-align: center;
    line-height: 30px;
  }
  :nth-child(2) {
    width: 300px;
    text-align: center;
    line-height: 30px;
  }
  :nth-child(3) {
    width: 300px;
    text-align: center;
    line-height: 30px;
  }
  :nth-child(4) {
    width: 50px;
    text-align: center;
    line-height: 30px;
  }
}
.all_table_content {
  display: flex;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #dcdcdc;
  .all_table_content_one {
    width: 50px;
    text-align: center;
    line-height: 30px;
  }
  .all_table_content_four {
    width: 50px;
    text-align: center;
    line-height: 30px;
  }
}
.input_table {
  position: relative;
  width: 300px;
  height: 30px;
  padding-top: 2px;
}
.input_table_one {
  width: 280px;
  height: 25px;
  text-indent: 3px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  font-size: 12px;
}
.table_unit {
  position: absolute;
  top: 5px;
  right: 20px;
  color: #7c7f82;
  font-size: 12px;
}
.add_list {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-top: 1px solid #dcdcdc;
}
.all_list_table {
  width: 100%;
  height: 230px;
  overflow: hidden;
  overflow-y: auto;
}
.btn_submit_long {
  width: 303px;
  height: 40px;
  border-radius: 20px;
  background-color: #35e9c5;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;
}
.btn_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.btn_bottom_left {
  height: 40px;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.cp {
  cursor: pointer;
}
.cn {
  cursor: not-allowed;
}
.dropdown_list {
  display: flex;
  align-items: center;
  cursor: pointer;
  .now_coin {
    font-weight: 500;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.87);
  }
  .dropdown_box {
    width: 34px;
    height: 18px;
    background: #f5f5f5;
    border-radius: 3px 3px 3px 3px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.dropdown_item {
  width: 200px;
  height: 300px;
  overflow-y: auto;
  border-radius: 10px;
}
</style>
