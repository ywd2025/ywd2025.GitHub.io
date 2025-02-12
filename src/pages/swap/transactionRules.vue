<template>
  <div class="extract">
    <div class="center">
      <div @click="go_page()" class="center_title">
        <Icon type="ios-arrow-back" />{{ $t("new.universal.contractTrading") }}
      </div>
      <Input
        type="text"
        v-model="searchValue"
        :placeholder="$t('carouselItem.text205')"
        class="input_select"
        clearable
      />
      <Table
        :columns="columns"
        :data="ruleList"
        :no-data-text="$t('common.nodata')"
      ></Table>
    </div>
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
      ruleList: [],
      allruleList: [],
      searchValue: "",
      columns: [
        {
          title: this.$t("new.universal.contract"),
          key: "symbol",
          align: "center",
        },
        {
          title: this.$t("carouselItem.text236"),
          key: "minShare",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.minShare + this.$t("swap.shareNumber")
            );
          },
        },
        {
          title: this.$t("carouselItem.text237"),
          key: "maxShare",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {},
              params.row.maxShare + this.$t("swap.shareNumber")
            );
          },
        },
        {
          title: this.$t("carouselItem.text238"),
          key: "closeFee",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.closeFee * 100 + "%");
          },
        },
        {
          title: this.$t("carouselItem.text239"),
          key: "closeFee",
          align: "center",
          render: (h, params) => {
            return h("span", {}, Number(params.row.shareNumber).toFixed(4));
          },
        },
        {
          title: this.$t("carouselItem.text240"),
          key: "openFee",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.openFee * 100 + "%");
          },
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  watch: {
    searchValue(newVal, oldVal) {
      newVal = String(newVal).toLowerCase();
      this.ruleList = this.allruleList.filter((item) => {
        return item.symbol.toString().toLowerCase().includes(newVal);
      });
    },
  },
  methods: {
    getList() {
      this.$http
        .post(this.host + this.api.markets.swapThumb, {})
        .then((res) => {
          this.allruleList = res.data;
          this.ruleList = res.data;
        });
    },
    go_page() {
      this.$router.push("swap");
    },
  },
};
</script>
<style lang="less" scoped>
.extract {
  padding-top: 50px;
  background-color: #f8f8f8;
}
.center {
  margin: 0 auto;
  width: 1200px;
  background-color: #fff;
  padding: 20px;
}
.center_title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.input_select {
  width: 250px;
  height: 35px;
  border-radius: 10px;
//   text-indent: 1rem;
  color: #333;
  margin-bottom: 20px;
}
</style>
