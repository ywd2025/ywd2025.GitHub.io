<template>
  <div class="all" ref="scrollingContainer">
    <div
      class="transition_tipa"
      v-for="(item, index) in tableList"
      :key="index"
    >
      <img
        v-if="item.coinImg"
        :src="item.coinImg"
        alt=""
        style="width:15px;height:15px;border-radius:50%;margin-right:10px;"
      />
      <img
        v-else
        :src="$imgUrl + '/index/10009.png'"
        alt=""
        style="width:15px;height:15px;border-radius:50%;margin-right:10px;"
      />
      <div class="transition_tipa_title">{{ item.coin }}</div>
      <div class="transition_tipa_title">${{ item.close }}</div>
      <div class="transition_tipa_title" style="color: #03C59E;">
        ({{ (((item.high - item.close) / item.open) * 100).toFixed(2) }}%)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableList: {
      type: [Array, Object],
    },
  },
  data() {
    return {
      scrollTimer: null, // 用来存储定时器的变量
      scrollPosition: 0, // 用来存储当前的滚动位置
      screenWidth: window.innerWidth,
    };
  },
  created() {
    // this.getOverviewval();
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
      const scrollStep = 1; // 每次滚动的增量
      const scroll = () => {
        this.scrollPosition += scrollStep;
        if (this.$refs.scrollingContainer) {
          this.$refs.scrollingContainer.scrollLeft += scrollStep;
        }
        if (
          this.scrollPosition >=
          this.tableList.length * 300 - this.screenWidth
        ) {
          this.scrollPosition = 0;
          if (this.$refs.scrollingContainer) {
            this.$refs.scrollingContainer.scrollLeft = 0;
          }
        }
        this.scrollTimer = requestAnimationFrame(scroll); // 使用 requestAnimationFrame
      };
      this.scrollTimer = requestAnimationFrame(scroll); // 启动动画
    },
    stopScrolling() {
      clearInterval(this.scrollTimer);
      this.scrollTimer = null;
    },
    updateScreenSize() {
      this.screenWidth = window.innerWidth;
    },
    // getOverviewval() {
    //   this.$http.post(this.host + this.api.index.getOverview).then((res) => {
    //     this.tableList = res.data.data;
    //   });
    // },
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
  background-color: #fff;
  border: 1px solid #eeeeee;
}

.transition_tipa {
  min-width: 300px;
  height: 24px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #6f6f6f;
}
.transition_tipa_title {
  margin-right: 20px;
}
</style>
