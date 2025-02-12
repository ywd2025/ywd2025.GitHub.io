<template>
  <div class="content">
    <div class="content_all">
      <div class="title1_gopage">
        <div class="title1">{{ $t("dolphin.text13") }}</div>
        <div class="back_btn" @click="go_page()">
          {{ $t("dolphin.text33") }}
        </div>
      </div>
      <div v-for="(item, index) in allList" :key="index" class="allbox">
        <div class="left_all">
          <div class="coinBox">
            <img :src="item.icon" alt="" style="width: 24px;height: 24px;" />
            <span class="coin_name">{{ item.coinUnit }}</span>
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
        <div class="coin_number">
          {{ $t("dolphin.text34") }}{{ Number(item.earningsAmount).toFixed(4) }}
        </div>
      </div>
      <div style="text-align: center; width: 100%; margin-top: 20px">
        <Page
          class="pages"
          :total="total"
          :current="pageNo"
          :page-size="pageSize"
          @on-change="pageChange"
        />
      </div>
    </div>
    <!-- 底部 -->
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
      allMax: "",
      pageNo: 1,
      pageSize: 10,
      allList: [],
      total: 0,
    };
  },
  created: function() {
    this.allMax = this.$route.query.item;
    this.getCoinList();
  },
  filters: {},
  watch: {},
  computed: {},
  methods: {
    getCoinList() {
      this.$http
        .post(this.host + this.api.flashExchange.dayListByPage, {
          coinUnit: this.allMax,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.allList = res.data.data.content;
          this.total = res.data.data.totalElements;
        });
    },
    go_page() {
      this.$router.push({
        path: "/financingInfo",
        query: { item: this.allMax },
      });
    },
    pageChange(page) {
      this.pageNo = page;
      this.getCoinList();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding-top: 50px;
  flex: 1 1 0%;
  background-color: #f5f5f5;
  color: #1c1c1c;
  min-width: 1080px;
  .content_all {
    margin: 40px auto;
    padding: 48px 0;
    width: 1080px;
    background-color: #fff;
    .title1_gopage {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title1 {
        font-weight: 700;
        font-size: 32px;
        color: #3d3d3d;
        padding: 0px 30px 0;
      }
      .back_btn {
        width: 64px;
        height: 32px;
        background: #e5f8f0;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid #03bc70;
        text-align: center;
        line-height: 32px;
        margin-right: 39px;
        cursor: pointer;
      }
    }
    .allbox {
      margin: 30px auto;
      width: 746px;
      height: 60px;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #e2e0e0;
      display: flex;
      align-items: center;
      padding: 6px 34px 6px 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_all {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        .coinBox {
          width: 145px;
          height: 48px;
          background: rgba(3, 188, 112, 0.1);
          border-radius: 4px 4px 4px 4px;
          display: flex;
          padding: 12px 16px;
          box-sizing: border-box;
          .coin_name {
            font-weight: 700;
            font-size: 16px;
            color: #000000;
            margin-left: 24px;
          }
        }
        .time {
          font-size: 14px;
          color: #6d6d6d;
          margin-left: 44px;
        }
      }

      .coin_number {
        margin-right: 20px;
      }
    }
  }
}
</style>
