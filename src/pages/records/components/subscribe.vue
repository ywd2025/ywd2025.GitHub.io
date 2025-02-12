<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.records.financial") }}</div>
            <h1 class="now_title">{{ $t("dolphin.text12") }}</h1>
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
              <Button type="primary" size="small" @click="searchClear">{{
                $t("new.universal.reset")
              }}</Button>
            </div>
          </div>
          <div class="table_part">
            <Table
              :columns="columns"
              :data="data"
              :no-data-text="$t('common.nodata')"
            >
              <template slot-scope="{ row }" slot="earingTotal">
                <div>
                  {{ (((row.realPercent * row.buyAmount) / 30) * row.haveDate).toFixed(2) }}
                </div>
              </template>
              <template slot-scope="{ row }" slot="realPercent">
                <div>{{ row.realPercent * 100 }}%</div>
              </template>
              <template slot-scope="{ row }" slot="a">
                <div>
                  {{ $t("carouselItem.text147") }}
                </div>
              </template>
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
        buyTime: null,
        endTime: null,
        pageSize: 10,
      },
      columns: [
        {
          title: "#",
          key: "memberId",
          align: "left",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text37"),
          key: "coinUnit",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text38"),
          slot: "realPercent",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text39"),
          key: "buyAmount",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text40"),
          key: "createTime",
          width: 170,
        },
        {
          title: this.$t("dolphin.text41"),
          key: "buyTime",
          width: 170,
        },
        {
          title: this.$t("dolphin.text42"),
          key: "endTime",
          width: 170,
        },
        {
          title: this.$t("dolphin.text43"),
          key: "haveDate",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text44"),
          slot: "earingTotal",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text45"),
          key: "realCycle",
          minWidth: 120,
        },
        {
          title: this.$t("dolphin.text46"),
          key: "endTime",
          width: 170,
        },
        {
          title: this.$t("dolphin.text47"),
          slot: "a",
          minWidth: 120,
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
      value3: "",
    };
  },
  computed: {},
  mounted() {
    this.getDepositRecord(1);
  },
  methods: {
    tradeType(type) {
      return tradeTypeFormatter(type);
    },
    handleSearch(date) {
      this.value3 = date;
      this.searchData.buyTime = date[0] + " 00:00:00";
      this.searchData.endTime = date[1] + " 23:23:59";
      this.getDepositRecord();
    },
    searchClear() {
      this.value3 = "";
      this.searchData.buyTime = null;
      this.searchData.endTime = null;
      this.getDepositRecord();
    },
    getDepositRecord() {
      this.spinShow = true;
      var alllist = {
        pageNo: this.searchData.pageNo,
        buyTimeStr: this.searchData.buyTime,
        endTimeStr: this.searchData.endTime,
        pageSize: this.searchData.pageSize,
      };
      this.$http
        .post(this.host + this.api.flashExchange.membercycleList, alllist)
        .then((response) => {
          const res = response.data.data;
          this.total = response.data.data.totalElements;
          this.data = res.content;
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
