<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="
          display: flex;
          height: 100%;
          flex-grow: 1;
          flex-direction: column;
        "
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.records.financial") }}</div>
            <h1 class="now_title">
              {{ $t("new.finance.operate.allRecords") }}
            </h1>
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
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')">
              <template slot-scope="{ row, index }" slot="type">
                {{ row.typeString }}
              </template>
              <template slot-scope="{ row, index }" slot="status">
                {{ statusFormatter(row.status) }}
              </template>
            </Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- 分页 -->
            <div class="block" style="text-align: center; margin-top: 20px">
              <Page
                @on-change="handleCurrentChange"
                :page-size="searchData.pageSize"
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
    <allDetails @profiLoss="profiLoss" :closeModals="closeModals" :actionType="actionType" :allLists="allLists"></allDetails>
  </div>
</template>

<script>
import tradeTypeFormatter from "@/assets/js/tradeType.js";
import allDetails from "../component/allDetails.vue";
export default {
  components: {
    allDetails
  },
  data() {
    return {
      searchData: {
        pageNo: 1,
        begin: null,
        end: null,
        type: 0,
        pageSize: 10,
      },
      closeModals: false,
      actionType: 0,
      allLists:[],
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
          title: this.$t("buyCoin.universal.type"),
          key: "typeString",
          // slot: "type",
        },
        {
          title: this.$t("uc.extension.amount"),
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
          title: this.$t("buyCoin.universal.operate"),
          key: "action",
          render: (h, params) => {
            return [ (params.row.type == 0 || params.row.type == 1 || params.row.type == 3) ? h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "success",
                    disabled: params.row.caBePass != null,
                  },
                  on: {
                    click: () => {
                      this.closeModals = true
                      this.actionType = params.row.type
                      this.allLists = params.row
                    },
                  },
                },
                this.$t("carouselItem.text74")
              ) :h(
                "Button",
                {
                  props: {
                    size: "small",
                    disabled: true,
                  },
                },
                this.$t("carouselItem.text74")
              )]
          },
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
      value3:''
    };
  },
  computed: {
    statusFormatter() {
      return (status) => {
        switch (status) {
          case "0":
            return this.$t("new.universal.beConfirmed");
          case "1":
            return this.$t("new.universal.success");
          case "2":
            return this.$t("new.universal.failure");
          case "4":
            return this.$t("carouselItem.text75");
          case "5":
            return this.$t("carouselItem.text76");
          case "6":
            return this.$t("carouselItem.text77");
          default:
            break;
        }
      };
    },
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
  filters: {
    dateFormat: function (tick) {
      return moment(tick).format("MM-DD HH:mm");
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
      this.value3 = date
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
          this.data = res;
          this.spinShow = false;
          this.total = Number(response.data.message) * 10;
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.searchData.pageNo = val;
      this.getDepositRecord();
    },
    profiLoss(Boolean){
      this.closeModals = Boolean
    }
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
