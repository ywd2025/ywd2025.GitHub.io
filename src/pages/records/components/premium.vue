<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.records.financial") }}</div>
            <h1 class="now_title">{{ $t("carouselItem.text151")}}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="search_part">
            <div class="search_left">
              <DatePicker
                type="daterange"
                :placeholder="$t('carouselItem.text276')"
                style="width: 200px"
                @on-change="handleSearch"
                :clearable="false"
                :value="value3"
              ></DatePicker>
              <Button type="primary" size="small" @click="searchClear"
                >{{ $t("new.universal.reset") }}</Button
              >
            </div>
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')">
            </Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- 分页 -->
            <div class="block" style="text-align: center;margin-top: 20px;">
              <Page
                @on-change="pageChange"
                :page-size="10"
                :current="searchData.pageNo"
                :total="total"
                size="small"
              >
              </Page>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tradeTypeFormatter from "@/assets/js/tradeType.js";
export default {
  data() {
    return {
      searchData: {
        pageNo: 1,
        begin: null,
        end: null,
        type: 7,
        pageSize: 10,
      },
      columns: [
        {
          title: this.$t("new.universal.time"),
          key: "createTime",
          align: "left",
        },
        {
          title: this.$t("uc.otcorder.money"),
          key: "amount",
          render: (h, params) => {
            return h(
              "span",
              {
                style: { color: params.row.amount < 0 ? "#ea4337" : "#03C59E" },
              },
              params.row.amount
            );
          },
        },
        {
          title: this.$t('buyCoin.universal.coinType'),
          key: "symbol",
        },
        {
          title: this.$t("buyCoin.universal.type"),
          key: "typeString",
          // slot: "type",
        },
      ],
      data: [],
      //加载中按钮
      spinShow: false,
      //分頁
      //每页信息个数
      pageSize: 10,
      //总信息数
      total: 0,
      value3:''
    };
  },
  computed: {
    lengFilters() {
      return (value) => {
        let len = value.length;
        if (!value) return "";
        if (value.length > 20) {
          return (
            value.substring(0, 8) + "......" + value.substring(len - 8, len)
          );
        }
        return value;
      };
    },
  },
  mounted() {
    this.getDepositRecord(1);
  },
  methods: {
    tradeType(type) {
      return tradeTypeFormatter(type);
    },
    handleSearch(date) {
      this.value3 =date
      this.searchData.begin = new Date(date[0]).getTime();
      this.searchData.end = new Date(date[1]).getTime();
      this.getDepositRecord();
    },
    searchClear() {
      this.value3 = ''
      this.searchData.begin = null;
      this.searchData.end = null;
      this.getDepositRecord();
    },
    getDepositRecord() {
      this.spinShow = true;
      this.$http
        .get(this.host + this.api.record.getRecordApi, {
          params: this.searchData,
          headers: {
            lang: this.$store.state.lang,
            equipment: 'PC',
          },
        })
        .then((response) => {
          const res = response.data.data;
          this.total = response.data.message * 10;
          this.data = res;
          this.spinShow = false;
        });
    },
    // 分页
    pageChange(page) {
      this.pageNo = page;
      this.searchData.pageNo = page;
      this.getDepositRecord();
    },
  },
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
