<template>
  <div ref="scrollCon" class="tags-outer-scroll-con">
    <div
      ref="scrollBody"
      class="tags-inner-scroll-body"
      :style="{ left: tagBodyLeft + 'px' }"
    >
      <div
        class="transition_tipa"
        v-for="(item, index) in tableList"
        :key="index"
      >
        <div class="transition_tipa_title">{{ item.symbol }}</div>
        <div
          class="transition_tipa_title"
          :style="{ color: item.change < 0 ? '#ea4337' : '#03C59E' }"
        >
          {{ item.rose }}
        </div>
      </div>
    </div>
    <!--  -->
    <div
      v-if="showScrollButtons"
      @click="scrollLeft"
      class="scroll-button left"
    >
      <img :src="$imgUrl + '/newUi/iconleft.png'" alt="" class="iconAll" />
    </div>
    <div class="scroll-button right">
      <div v-if="showScrollButtons" @click="scrollRight" class="scroll-button">
        <img :src="$imgUrl + '/newUi/iconright.png'" alt="" class="iconAll" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tagBodyLeft: 0,
      showScrollButtons: false,
    };
  },
  watch: {
    // pageTagsList: {
    //   handler() {
    //     this.updateScrollButtonsVisibility();
    //   },
    // },
  },
  computed: {
    // pageTagsList() {
    //   return this.$store.state.pageTagsList;
    // },
    tableList() {
      let a = this.$store.state.newallCoinSwap;
      return a;
    },
  },
  mounted() {
    this.updateScrollButtonsVisibility();
  },
  methods: {
    updateScrollButtonsVisibility() {
      this.$nextTick(() => {
        const scrollConWidth = this.$refs.scrollCon.offsetWidth;
        const scrollBodyWidth = this.$refs.scrollBody.scrollWidth;
        this.showScrollButtons = scrollBodyWidth > scrollConWidth;
        if (this.showScrollButtons) {
          this.scrollRight();
        } else {
          this.scrollLeft();
        }
      });
    },
    scrollLeft() {
      this.tagBodyLeft += 150; // Adjust the value as needed
      this.tagBodyLeft = Math.min(0, this.tagBodyLeft); // Prevent scrolling too far left
    },
    scrollRight() {
      const scrollConWidth = this.$refs.scrollCon.offsetWidth;
      const scrollBodyWidth = this.$refs.scrollBody.offsetWidth;
      const maxScrollLeft = scrollBodyWidth - scrollConWidth + 15;
      this.tagBodyLeft -= 155; // Adjust the value as needed
      this.tagBodyLeft = Math.max(this.tagBodyLeft, -maxScrollLeft); // Prevent scrolling too far right
    },
    // closePage(event, name) {
    //   let pageOpenedList = this.$store.state.pageTagsList;
    //   let lastPageObj = pageOpenedList[0];
    //   let index = pageOpenedList.findIndex((page) => page === name);
    //   if (index !== -1) {
    //     lastPageObj =
    //       index < pageOpenedList.length - 1
    //         ? pageOpenedList[index + 1]
    //         : pageOpenedList[index - 1];
    //   }
    //   this.$store.commit("removeTag", name);
    //   if (this.currentPageName === name) {
    //     this.$emit("linkTo", lastPageObj);
    //   }
    //   this.scrollLeft();
    //   setTimeout(() => {
    //     this.updateScrollButtonsVisibility();
    //   }, 500);
    // },
    // linkTo(item) {
    //   this.$emit("linkTo", item);
    // },
  },
};
</script>

<style scoped lang="less">
.tags-outer-scroll-con {
  height: 39px;
  position: relative;
  overflow: hidden;
  border-bottom: 2px solid #f5f5f5;
  padding: 0px 100px 0 20px;
  .tags-inner-scroll-body {
    padding: 0px 80px 0 20px;
    height: 39px;
    position: absolute;
    box-sizing: border-box;
    overflow: visible;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .scroll-button {
    width: 15px;
    height: 39px;
    position: absolute;
    text-align: center;
    line-height: 39px;
    top: 50%;
    transform: translateY(-50%);
    // background: #f2f2f2;
    // border: 1px solid #f2f2f2;
    color: #000;
    cursor: pointer;
  }
  .left {
    width: 20px;
    background-color: #fff;
    left: 0px; // Adjust position as needed
  }
  .right {
    width: 100px;
    background-color: #fff;
    right: 0px; // Adjust position as needed
  }
}
.transition_tipa {
  height: 24px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  color: #000000;
  margin-right: 18px;
}
.transition_tipa_title {
  margin-right: 5px;
}
.iconAll {
  margin-top: 12px;
  width: 16px;
  height: 16px;
}
</style>
