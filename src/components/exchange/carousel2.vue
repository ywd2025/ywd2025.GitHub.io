<template>
  <div class="all" ref="scrollingContainer">
    <div
      class="transition_tipa"
      v-for="(item, index) in tableList"
      :key="index"
    >
      <img :src="item" style="width: auto;height:100%;margin-right:10px;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
        `${this.$imgUrl}/index/10006.png`,
        `${this.$imgUrl}/index/10007.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10009.png`,
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
        `${this.$imgUrl}/index/10006.png`,
        `${this.$imgUrl}/index/10007.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10009.png`,
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
        `${this.$imgUrl}/index/10006.png`,
        `${this.$imgUrl}/index/10007.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10009.png`,
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
        `${this.$imgUrl}/index/10006.png`,
        `${this.$imgUrl}/index/10007.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10009.png`,
        `${this.$imgUrl}/index/10001.png`,
        `${this.$imgUrl}/index/10008.png`,
        `${this.$imgUrl}/index/10002.png`,
        `${this.$imgUrl}/index/10003.png`,
        `${this.$imgUrl}/index/10004.png`,
        `${this.$imgUrl}/index/10005.png`,
      ],
      scrollTimer: null, // 用来存储定时器的变量
      scrollPosition: 0, // 用来存储当前的滚动位置
      screenWidth: window.innerWidth,
    };
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
          this.tableList.length * 250 - this.screenWidth
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
  height: 166px;
  background: linear-gradient(270deg, rgba(33, 231, 191, 0) 0%, #21e7bf 100%);
  overflow: hidden;
  white-space: nowrap;
  transition: scroll-left 0.5s ease;
}

.transition_tipa {
  min-width: 250px;
  height: 50px;
}
.transition_tipa_title {
  margin-right: 20px;
}
</style>
