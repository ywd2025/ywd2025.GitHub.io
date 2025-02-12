<template>
  <div class="content">
    <div class="content_all">
      <div class="title1">{{ $t("dolphin.text13") }}</div>
      <div class="all_success">
        <img
          :src="$imgUrl + '/success.png'"
          alt=""
          style="width: 288px;height: 182px;"
        />
        <div class="all_success_title">{{ $t("dolphin.text32") }}</div>
        <div class="all_success_title">{{ number }}</div>
      </div>
      <div class="btn_bottom_submit" @click="go_page">
        {{ $t("common.ok") }}
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
      number: "",
    };
  },
  created: function() {
    this.number = this.$route.query.item;
  },
  filters: {},
  watch: {},
  computed: {},
  methods: {
    // 跳转订单列表
    go_page() {
      this.$router.push("/financing");
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
    .title1 {
      font-weight: 700;
      font-size: 32px;
      color: #3d3d3d;
      padding: 0px 30px 0;
    }
    .all_success {
      width: 722px;
      margin: 101px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .all_success_title {
        font-weight: 600;
        font-size: 20px;
        color: #000000;
        margin: 10px auto;
      }
    }
    .btn_bottom_submit {
      margin: 0px auto;
      width: 588px;
      height: 60px;
      background: #00bf6f;
      border-radius: 10px 10px 10px 10px;
      color: #fff;
      text-align: center;
      line-height: 60px;
      margin-top: 210px;
      cursor: pointer;
    }
  }
}
</style>
