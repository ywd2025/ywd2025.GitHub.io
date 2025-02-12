<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.records.financial") }}</div>
            <h1 class="now_title">{{ $t("new.records.other") }}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')">
              <template slot-scope="{ row, index }" slot="source">
                {{ statusFormatter(row.source) }}
              </template>
            </Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- 分页 -->
            <div class="block" style="text-align: center;margin-top: 20px;">
              <Page
                @on-change="handleCurrentChange"
                :page-size="10"
                :current="currentPage"
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
export default {
  data() {
    return {
      searchData: {},
      columns: [
        {
          title: this.$t("new.universal.time"),
          key: "createTime",
          align: "left",
        },
        {
          title: this.$t("new.universal.currency"),
          key: "symbol",
        },
        {
          title: this.$t("new.universal.quantity"),
          key: "amount",
        },
        {
          title: this.$t("new.universal.account"),
          slot: "source",
        },
      ],
      data: [],
      //加载中按钮
      spinShow: false,
      //分頁
      //当前页
      pageNo: 1,
      //每页信息个数
      pageSize: 10,
      //总信息数
      total: 0,
      //调转页码
      currentPage: 1,
    };
  },
  computed: {
    statusFormatter() {
      return (status) => {
        switch (status) {
          case "ZJ":
            return this.$t("new.records.assetManagement");
          case "XH":
            return this.$t("new.records.cashAccount");
          case "HY":
            return this.$t("new.records.contract");
          case "DOC":
            return this.$t("new.records.documentary");
          default:
            break;
        }
      };
    },
  },
  filters: {
    dateFormat: function(tick) {
      return moment(tick).format("MM-DD HH:mm");
    },
  },
  mounted() {
    this.getOtherRecord(1);
  },
  methods: {
    getOtherRecord(pageNo) {
      this.spinShow = true;
      let params = {
        pageNo,
        pageSize: 10,
      };
      this.$http
        .post(this.host + this.api.record.otherRecord, params)
        .then((response) => {
          const res = response.data.data;
          this.data = res.content;
          this.spinShow = false;
          if (pageNo == 1) {
            this.pageSize = res.size;
            this.total = res.totalElements;
          }
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOtherRecord(this.currentPage);
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
