<template>
  <div>
    <div class="toppanel">
      <div class="top_content">
        <div class="top_left">
          <div class="top_title">{{ $t("new.index.indexBannerAd1") }}</div>
          <div class="input_button">
            <Input
              v-if="!isLogin"
              class="input"
              search
              size="large"
              :enter-button="$t('new.index.registerNow')"
              :placeholder="$t('new.index.registerNumber')"
              @on-search="goLoginPage"
            />
            <Button
              v-else
              class="jiaoyiBtn"
              type="success"
              @click="goPage('/exchange')"
              >{{ $t("new.index.tradeNow") }}</Button
            >
          </div>
        </div>
        <div class="top_right">
          <video
            class="video_style"
            src="../../assets/video/video-header1.mp4"
            initial-time="0"
            autoplay="true"
            loop="true"
            muted="false"
            direction="0"
            bindplay=""
            bindpause=""
            bindended=""
            bindtimeupdate=""
            bindwaiting=""
            binderror=""
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.top-panel {
  background-color: #010001;
  background-size: 100% 100%;
  height: 768px;
  .top_content {
    padding-top: 80px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .top_left {
      margin-top: 160px;
      .top_title {
        font-size: 72px;
        color: #07c67b;
        font-weight: 600;
      }
      .input_button {
        font-size: 18px;
        line-height: 20px;
        height: 56px;
        margin: 35px 0;
        .input {
          height: 56px;
          width: 446px;
        }
        .jiaoyiBtn {
          width: 156px;
          height: 56px;
          border-radius: 28px;
          font-size: 16px;
        }
      }
      .top_icons {
        display: flex;
        flex-direction: row;
        div {
          border: 1px solid #eeeeee60;
        }
      }
    }
    .top_right {
      position: relative;
      .btnScoll {
        position: absolute;
        width: 300px;
        height: 200px;
        bottom: -60px;
        right: 200px;
        cursor: pointer;
      }
    }
  }
}
</style>
