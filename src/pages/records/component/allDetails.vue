<template>
  <div>
    <Modal
      :mask-closable="false"
      v-model="localModalOpen"
      :title="$t('carouselItem.text74')"
      width="30"
      class-name="vertical-center-modal"
      @on-cancel="closeModal"
    >
      <div v-if="actionType == 0">
        <div class="list_all">
          <div class="list_left">{{ $t("uc.otcorder.money") }}：</div>
          <div class="list_right"><span style="margin-right: 5px;color: #03C59E;">{{ $t('new.universal.success') }}</span>{{ allLists.amount }}<span style="margin-left: 5px;color: #03C59E;">{{ allLists.symbol }}</span> </div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("new.universal.address") }}：</div>
          <div class="list_right">{{ allLists.reAddress }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("new.universal.account") }}：</div>
          <div class="list_right">{{ $t('new.universal.assetAccounts') }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text279") }}：</div>
          <div class="list_right">{{ allLists.createTime }}</div>
        </div>
      </div>
      <div v-if="actionType == 1">
        <div class="list_all">
          <div class="list_left">{{ $t("uc.otcorder.money") }}：</div>
          <div class="list_right">{{ allLists.amount }}<span style="margin-left: 5px;color: #03C59E;">{{ allLists.symbol }}</span> </div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text139") }}：</div>
          <div class="list_right">{{ allLists.witAddress }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text277") }}：</div>
          <div class="list_right">{{ allLists.amount }}<span style="margin-left: 5px;color: #03C59E;">{{ allLists.symbol }}</span></div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("uc.finance.record.status") }}：</div>
          <div class="list_right">{{ allLists.witStatus }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text140") }}：</div>
          <div class="list_right">{{ allLists.witFee }}<span style="margin-left: 5px;color: #03C59E;">{{ allLists.symbol }}</span></div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("new.universal.account") }}：</div>
          <div class="list_right">{{ $t('carouselItem.text282') }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text279") }}：</div>
          <div class="list_right">{{ allLists.createTime }}</div>
        </div>
      </div>
      <div v-if="actionType == 3">
        <div class="list_all">
          <div class="list_left">{{ $t("uc.otcorder.money") }}：</div>
          <div class="list_right"><span style="margin-right: 5px;color: #03C59E;">{{ filter_exDirection(allLists.exDirection) }}</span>{{ allLists.amount }}<span style="margin-left: 5px;color: #03C59E;">{{ allLists.symbol }}</span> </div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("uc.finance.record.status") }}：</div>
          <div class="list_right">{{ filter_status(allLists.exStatus) }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("buyCoin.universal.type") }}：</div>
          <div class="list_right">{{ allLists.exPrice ? $t("exchange.limited_price") : $t("exchange.market_price")}}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("buyCoin.universal.price") }}：</div>
          <div v-if="allLists.exPrice" class="list_right">{{ allLists.exPrice }}<span style="margin-left: 5px;color: #03C59E;">USDT</span></div>
          <div v-else class="list_right">{{ $t('carouselItem.text49') }}</div>
        </div>
        <div class="list_all">
          <div class="list_left">{{ $t("carouselItem.text279") }}：</div>
          <div class="list_right">{{ allLists.createTime }}</div>
        </div>
      </div>
      <div slot="footer">
        <Button type="default" size="large" @click="closeModal()">{{
          $t("common.close")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      localModalOpen: this.closeModals,
    };
  },
  props: {
    closeModals: Boolean,
    actionType: Number,
    allLists: [Array, Object],
  },
  watch: {
    closeModals(newVal) {
      this.localModalOpen = newVal;
    },
  },
  mounted() {},
  methods: {
    closeModal() {
      this.$emit("profiLoss", false);
    },
    filter_type(item) {
      console.log(item,'555555');
      if (item == "LIMIT_PRICE") {
        return this.$t("exchange.limited_price");
      } else {
        return this.$t("exchange.market_price");
      }
    },
    filter_status(item){
      if (item == "TRADING") {
        return this.$t("carouselItem.text159");
      } else if(item == 'COMPLETED') {
        return this.$t("common.paySure.Transactioncompletion");
      }
    },
    filter_exDirection(item){
      if (item == "SELL") {
        return this.$t("carouselItem.text281");
      } else if(item == 'BUY') {
        return this.$t("carouselItem.text280");
      }
    }
  },
};
</script>

<style lang="less" scoped>
.modalFormItemRight {
  width: 100%;
  text-align: right;
}
.list_all {
  margin: 20px 0;
  .list_left {
    font-weight: 700;
    color: #333;
  }
  .list_right {
    color: #666;
    text-indent: 1.5rem;
  }
}
.red{
  color: #E84033;
}
.green{
  color: #03C59E;
}
</style>
