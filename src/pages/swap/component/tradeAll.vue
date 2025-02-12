<template>
  <div>
    <!-- 成交记录 最新交易 -->
    <!-- <div class="center plate-wrap" style="position: relative">
      <div
        style="
          background-color: #fbfcfd;
          height: 39px;
          line-height: 39px;
          padding-left: 5px;
          color: #000000;
          font-size: 12px;
        "
      >
        <span>{{ $t("swap.latestdeal") }}</span>
      </div> -->
      <div class="trade-wrap">
        <Table
          height="170"
          :columns="trade.columns"
          :data="dataList"
          :no-data-text="$t('common.nodata')"
        ></Table>
      </div>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      trade: {
        rows: [],
        columns: [
          {
            title: this.$t("swap.price"),
            key: "price",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction == "BUY" ? "buy" : "sell";

              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                  style: { fontSize: "12px" },
                },
                params.row.price.toFixed(4)
              );
            },
            renderHeader: (h, params) => {
              const title =
              this.$t("swap.price") + "(" + this.baseTitle.base + ")";
              return h(
                "span",
                {
                  style: { fontSize: "12px",color: "rgba(0,0,0,0.54)" },
                },
                title
              );
            },
          },
          {
            title: this.$t("swap.num"),
            key: "amount",
            render: (h, params) => {
              return h(
                "span",
                { style: { fontSize: "12px",color: "rgba(0,0,0,0.87)" } },
                params.row.amount.toFixed(4)
              );
            },
            renderHeader: (h, params) => {
              const title =
              this.$t("swap.num") + "(" + this.baseTitle.coin + ")";
              return h("span", { style: { fontSize: "12px",color: "rgba(0,0,0,0.54)" } }, title);
            },
          },
          {
            title: this.$t("swap.time"),
            key: "time",
            render: (h, params) => {
              return h(
                "span",
                { style: { fontSize: "12px",color: "rgba(0,0,0,0.87)" } },
                this.timeFormat(params.row.time)
              );
            },
            renderHeader: (h, params) => {
              const title =
              this.$t("swap.time");
              return h("span", { style: { fontSize: "12px",color: "rgba(0,0,0,0.54)" } }, title);
            },
          },
        ],
      },
    };
  },
  props: {
    dataList: [Object, Array],
    baseTitle: [Object, Array],
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>

</style>
