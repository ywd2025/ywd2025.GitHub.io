<template>
  <div
    ref="scrollCon"
    class="tags-outer-scroll-con"
    :style="{ width: dynamic_height + 'px' }"
  >
    <div
      ref="scrollBody"
      class="tags-inner-scroll-body"
      :style="{ left: tagBodyLeft + 'px' }"
    >
      <Tag
        type="dot"
        v-for="(item, index) in pageTagsList"
        :key="index"
        :name="item"
        @on-close="closePage"
        :closable="pageTagsList.length > 1"
        @click.native="linkTo(item)"
        :color="item == currentPageName ? 'success' : ''"
        >{{ item }}</Tag
      >
    </div>
    <!--  -->
    <div
      v-if="showScrollButtons"
      @click="scrollLeft"
      class="scroll-button left"
    >
      <img :src="$imgUrl + '/newUi/iconleft.png'" alt="" class="iconAll" />
    </div>
    <div
      v-if="showScrollButtons"
      @click="scrollRight"
      class="scroll-button right"
    >
      <img :src="$imgUrl + '/newUi/iconright.png'" alt="" class="iconAll" />
    </div>
    <!-- <button
      v-if="showScrollButtons"
      @click="scrollLeft"
     
    >
      <template>&lt;</template>
    </button>
    <button
      v-if="showScrollButtons"
      @click="scrollRight"
      class="scroll-button right"
    >
      >
    </button> -->
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
  props: {
    currentPageName: String,
    dynamic_height: Number,
  },
  watch: {
    pageTagsList: {
      handler() {
        this.updateScrollButtonsVisibility();
      },
    },
  },
  computed: {
    pageTagsList() {
      return this.$store.state.pageTagsList;
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
      this.tagBodyLeft += 155; // Adjust the value as needed
      this.tagBodyLeft = Math.min(0, this.tagBodyLeft); // Prevent scrolling too far left
    },
    scrollRight() {
      const scrollConWidth = this.$refs.scrollCon.offsetWidth;
      const scrollBodyWidth = this.$refs.scrollBody.offsetWidth;
      const maxScrollLeft = scrollBodyWidth - scrollConWidth + 15;
      this.tagBodyLeft -= 155; // Adjust the value as needed
      this.tagBodyLeft = Math.max(this.tagBodyLeft, -maxScrollLeft); // Prevent scrolling too far right
    },
    closePage(event, name) {
      let pageOpenedList = this.$store.state.pageTagsList;
      let lastPageObj = pageOpenedList[0];
      let index = pageOpenedList.findIndex((page) => page === name);
      if (index !== -1) {
        lastPageObj =
          index < pageOpenedList.length - 1
            ? pageOpenedList[index + 1]
            : pageOpenedList[index - 1];
      }
      this.$store.commit("removeTag", name);
      if (this.currentPageName === name) {
        this.$emit("linkTo", lastPageObj);
      }
      this.scrollLeft();
      setTimeout(() => {
        this.updateScrollButtonsVisibility();
      }, 500);
    },
    linkTo(item) {
      this.$emit("linkTo", item);
    },
  },
};
</script>

<style scoped lang="less">
.tags-outer-scroll-con {
  height: 40px;
  position: relative;
  overflow: hidden;
  .tags-inner-scroll-body {
    position: absolute;
    padding: 2px 15px;
    box-sizing: border-box;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
  .scroll-button {
    width: 15px;
    height: 32px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #f2f2f2;
    border: 1px solid #f2f2f2;
    color: #000;
    cursor: pointer;
  }
  .left {
    left: 0px; // Adjust position as needed
  }
  .right {
    right: 0px; // Adjust position as needed
  }
  .iconAll {
    width: 15px;
    height: 15px;
  }
}
</style>
