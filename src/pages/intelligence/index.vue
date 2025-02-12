<template>
  <div class="help">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <img class="bannerimg" :src="$imgUrl + '/help_banner.jpg'" /> 
    <div class="help_container">
      <h1>{{ $t("dolphin.text151") }}</h1>
      <div class="main">
        <Card dis-hover class="section" v-for="item in currentData" :key="item.id">
          <p slot="title">{{ item.mainHead }}</p>
          <div class="list-wrap">{{ item.content }}</div>
          <div class="time">{{ item.createTime }}</div>
          <!-- <div class="route-wrap">{{ $t("common.more") }}>></div> -->
        </Card>
      </div>
      <div style="text-align: center; width: 100%; margin-top: 20px">
        <Page
          class="pages"
          :total="total"
          :current="pageNo"
          :page-size="10"
          @on-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpList: [],
      // 加载中
      spinShow: false,
      total: 0,
      pageNo: 1,
      pageSize: 10,
    };
  },
  created: function() {
    this.init();
    this.getData();
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    langPram() {
      return this.$store.state.lang;
    },
        // 当前页数据
        currentData() {
      if (!this.helpList) {
        return [];
      }
      const start = (this.pageNo - 1) * this.pageSize;
      const end = this.pageNo * this.pageSize;
      return this.helpList.slice(start, end);
    },
  },
  methods: {
    init() {
    },
    getData() {
      this.spinShow = true;
      this.$http
        .post(this.host + this.api.common.informationCenter, {
          centerType: "0",
          pageNo: this.pageNo,
          pageSize: "9999",
        })
        .then((res) => {
          this.helpList = res.body.data;
          this.total = res.body.data.length;
          this.spinShow = false;
        });
    },
    pageChange(page) {
      this.pageNo = page;
    //   this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.help {
  background: #fff;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  padding-top: 50px;
  color: #fff;
}
.help .bannerimg {
  display: block;
  width: 100%;
}
.help_container {
  padding: 0 12%;
  text-align: center;
  height: 100%;
  min-height: 800px;
  > h1 {
    margin-top: -170px;
    font-size: 32px;
    line-height: 1;
    padding: 50px 0;
  }
}
.help .main {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  .section {
    width: 40%;
    font-size: 14px;
    text-align: left;
    margin: 0 20px;
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 50px;
    .list-wrap {
      width: 100%;
      font-size: 14px;
      text-align: left;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 6;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .time {
      width: 100%;
      font-size: 14px;
      color: #999;
      text-align: right;
      margin-top: 10px;
    }
  }
  .route-wrap {
    position: absolute;
    bottom: 5px;
    right: 10px;
    color: #03C59E;
    cursor: pointer;
  }
}
</style>
