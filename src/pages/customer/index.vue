<template>
  <div class="help">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <img class="bannerimg" :src="$imgUrl + '/cms/help_banner.jpg'" />
    <div class="help_container">
      <div class="title">{{ $t("dolphin.text57") }}</div>
      <div class="content">
        <div class="box" v-for="(item, index) in allList" :key="index">
          <img
            :src="$imgUrl + '/mortgage/head.png'"
            alt=""
            class="head"
          />
          <div class="title_one">
            {{ item }}
            <!-- <img
              :src="$imgUrl + '/mortgage/copy.png'"
              alt=""
              style="width: 32px;height: 32px;"
            />  -->
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
      charityData: [],
      // 加载中
      spinShow: false,
      allList: [],
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
  },
  methods: {
    init() {
    },
    getData() {
      this.spinShow = true;
      this.$http
        .get(this.host + `${this.api.flashExchange.dictionary}${"CUSTO_INFO"}`)
        .then((res) => {
          this.charityData = res.data.data;
          this.allList = this.charityData.split(",");
          this.spinShow = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.help {
  background: #fff;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  padding-top: 50px;
}
.help .bannerimg {
  display: block;
  width: 100%;
}
.help_container {
  padding: 0 12%;
  height: 100%;
  min-height: 800px;
  position: relative;
  .title {
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: -148px;
    left: 355px;
  }
  .content {
    min-width: 1200px;
    height: 100px;
    margin: 80px auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: space-between;
    .box {
      margin-top: 20px;
      width: 300px;
      height: 250px;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #e2e0e0;
      padding: 19px 35px;
      box-sizing: border-box;
      text-align: center;
      margin: 30px;
      .head {
        width: 81px;
        height: 81px;
        margin-top: 30px;
      }
      .title_one {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        font-weight: 600;
        font-size: 24px;
        color: #000000;
      }
    }
  }
}
</style>
