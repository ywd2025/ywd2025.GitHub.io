<template>
  <div class="order_right_content">
    <div style="height: 100%">
      <div
        style="display: flex;height: 100%;flex-grow: 1;flex-direction: column;"
      >
        <div class="title_part">
          <div>
            <div class="father_title">{{ $t("new.records.financial") }}</div>
            <h1 class="now_title">{{ $t('carouselItem.text152')}}</h1>
          </div>
        </div>
        <div class="table_all">
          <div class="search_part">
            <div class="search_left">
              <!-- <Select
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
              </Select> -->
              <DatePicker
                type="daterange"
                :placeholder="$t('carouselItem.text276')"
                :value="value3"
                style="width: 200px"
                @on-change="handleSearch"
                :clearable="false"
              ></DatePicker>
              <Button type="primary" size="small" @click="searchClear"
                >{{ $t("new.universal.reset") }}</Button
              >
            </div>
          </div>
          <div class="table_part">
            <Table :columns="columns" :data="data" :no-data-text="$t('common.nodata')">
              <!-- <template slot-scope="{ row, index }" slot="type">
                {{ tradeType(row.type) }}
              </template> -->
              <template slot-scope="{ row, index }" slot="exType">
                {{ exTypeFormatter(row.exType) }}
              </template>
              <template slot-scope="{ row, index }" slot="exStatus">
                {{ exStatusFormatter(row.exStatus) }}
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
        begin: null,
        end: null,
        type: 4,
        pageSize: 10,
      },
      value3:'',
      searchItems: [
        {
          value: "a",
          placeholder: this.$t('carouselItem.text137'),
          itemOption: [
            {
              value: "1",
              label: this.$t('new.universal.all'),
            },
            {
              value: "2",
              label: "BTC/USDT",
            },
          ],
        },
        {
          value: "d",
          placeholder: this.$t('carouselItem.text129'),
          itemOption: [
            {
              value: "1",
              label: this.$t('carouselItem.text130'),
            },
          ],
        },
      ],
      columns: [
        {
          title: this.$t('carouselItem.text153'),
          key: "exCompletedTime",
          align: "left",
          render: (h, params) => {
              return h("span", {}, this.time_filter(params.row.exCompletedTime));
            },
        },
        {
          title: this.$t('carouselItem.text154'),
          key: "symbol",
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
          title: this.$t("buyCoin.orders.txt14"),
          slot: "exType",
        },
        {
          title: this.$t("carouselItem.text155"),
          key: "exAmount",
        },
        {
          title: this.$t("new.orders.direction"),
          key: "exDirection",
          render: (h, params) => {
                if (params.row.exDirection == "BUY") {
                  return h(
                    "span",
                    { style: { color: "#42b983" } },
                    this.$t("exchange.buyin")
                  );
                } else {
                  return h(
                    "span",
                    { style: { color: "#FF0000" } },
                    this.$t("exchange.sellout")
                  );
                }
            },
        },
        {
          title: this.$t("carouselItem.text156"),
          key: "exPrice",
        },
        {
          title:  this.$t("buyCoin.orders.txt2"),
          slot: "exStatus",
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
    };
  },
  computed: {
    exTypeFormatter() {
      return (status) => {
        switch (status) {
          case "MARKET_PRICE":
            return this.$t('new.swap.marketValue');
          case "LIMIT_PRICE":
            return this.$t('new.swap.priceLimit');
          case "MARKET_SPOT_PRICE":
            return this.$t('carouselItem.text157');
          case "LIMIT_SPOT_PRICE":
            return this.$t('carouselItem.text158');
          default:
            break;
        }
      };
    },
    exStatusFormatter() {
      return (status) => {
        switch (status) {
          case "TRADING":
            return this.$t('carouselItem.text159');
          case "COMPLETED":
            return this.$t('exchange.finished');
          case "CANCELED":
            return this.$t('exchange.canceled');
          case "OVERTIMED":
            return this.$t('carouselItem.text160');
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
      this.searchData.begin = null;
      this.searchData.end = null;
      this.value3 = ''
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
    // 复制地址
    copyLink(val) {
      // 复制链接
      let url = val;
      // 后台接口返回的链接地址
      let inputNode = document.createElement("input");
      // 创建input
      inputNode.value = url;
      // 赋值给 input 值
      document.body.appendChild(inputNode);
      // 插入进去
      inputNode.select();
      // 选择对象
      document.execCommand("Copy");
      // 原生调用执行浏览器复制命令
      inputNode.className = "oInput";
      inputNode.style.display = "none";
      this.$Notice.success({
        title: this.$t("new.universal.copySuccess"),
      });
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
