<template>
  <div class="all" ref="scrollingContainer">
    <div
      class="transition_tipa"
      v-for="(item, index) in tableList"
      :key="index"
    >
      <img
        :src="item.coinImg"
        alt=""
        style="width:32px;height:32px;border-radius:50%;margin-right:10px;"
      />
      <div class="transition_tipa_title">{{ item.symbol }}</div>
      <div class="transition_tipa_title">${{ item.open }}</div>
      <div class="transition_tipa_title">({{(((item.high - item.close) / item.open) * 100).toFixed(2)}}%)</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [],
      scrollTimer: null, // 用来存储定时器的变量
      scrollPosition: 0, // 用来存储当前的滚动位置
      screenWidth: window.innerWidth,
    };
  },
  created() {
    this.getOverviewval();
  },
  mounted() {
    this.startScrolling();
    window.addEventListener("resize", this.updateScreenSize);
  },
  beforeDestroy() {
    this.stopScrolling();
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {
    startScrolling() {
      this.scrollTimer = setInterval(() => {
        this.scrollPosition += 1;
        this.$refs.scrollingContainer.scrollLeft = this.scrollPosition;
        if (
          this.scrollPosition >=
          this.tableList.length * 500 - this.screenWidth
        ) {
          this.scrollPosition = 0;
          this.scrollTimer;
        }
      }, 50);
    },
    stopScrolling() {
      clearInterval(this.scrollTimer);
      this.scrollTimer = null;
    },
    updateScreenSize() {
      this.screenWidth = window.innerWidth;
    },
    getOverviewval() {
      this.$http.post(this.host + this.api.index.getOverview).then((res) => {
        this.tableList = res.data.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
.all {
  display: flex;
  align-items: center;
  overflow-x: auto;
  width: 100%;
  overflow: hidden;
}

.transition_tipa {
  min-width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #fff;
}
.transition_tipa_title{
    margin-right: 20px;
}
</style>
