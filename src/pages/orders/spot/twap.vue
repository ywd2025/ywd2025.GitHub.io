<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{$t('new.orders.spotOrders')}}</div>
            <h1 class="now_title">{{ $t('carouselItem.text136') }}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="search_part">
            <div class="search_left">
              <Select
                v-for="(searchItem, index) in searchItems"
                v-model="searchData[searchItem.value]"
                :key="index"
                :placeholder="searchItem.placeholder"
                style="width:128px;margin-right: 8px;"
                size="small"
              >
                <Option
                  v-for="item in searchItem.itemOption"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
              <Button type="primary" size="small">{{
                $t("new.universal.reset")
              }}</Button>
            </div>
            <!-- <div class="search_right">
              <Button type="primary" size="small">全部撤單</Button>
            </div> -->
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')"></Table>
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
      searchData: {},
      searchItems: [
        {
          value: "a",
          placeholder: this.$t("new.orders.allTrading"),
          itemOption: [
            {
              value: "1",
              label: this.$t('new.universal.all'),
            },
            {
              value: "2",
              label: "BTC/USDT",
            },
            {
              value: "3",
              label: "USDT/TRY",
            },
            {
              value: "4",
              label: "BTC/TRY",
            },
            {
              value: "5",
              label: "ETC/USDT",
            },
            {
              value: "46",
              label: "ETC/TRY",
            },
          ],
        },
      ],
      columns: [
        {
          title: "交易對",
          key: "交易對",
          align: "left",
        },
        {
          title: "時間",
          key: "時間",
        },
        {
          title: "類型",
          key: "類型",
        },
        {
          title: "方向",
          key: "方向",
        },
        {
          title: "委托數量",
          key: "委托數量",
        },
        {
          title: "成交數量",
          key: "成交數量",
        },
        {
          title: "成交均價",
          key: "成交均價",
        },
        {
          title: "運行時間/總計時間",
          key: "運行時間/總計時間",
        },
        {
          title: "操作",
          key: "操作",
          align: "right",
        },
      ],
      data: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.order_right_content {
  height: 100%;
  position: relative;
  .title_part {
    padding: 24px;
    font-weight: 500;
    border-bottom: 1px solid #eeeeee;
    .now_title {
      font-weight: 400;
    }
  }
  .table_all {
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    overflow-y: scroll;
    .search_part {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 0;
    }
    .table_part {
      margin-top: 8px;
      padding: 0 24px 60px;
    }
  }
}
</style>
