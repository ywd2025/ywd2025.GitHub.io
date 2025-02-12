<template>
  <div class="finance_all_content">
    <section
      style="display: flex;height: 100%;flex-direction: column;padding-top: 36px;"
    >
      <div class="top_title_part">
        <h1 class="mr-4 text-2xl font-semibold leading-10 text-t1">卡券中心</h1>
      </div>
      <div class="top_title_part_detail">
        <div class="flex_center_start">
          <h5 class="text-base font-medium text-t2">體驗金可用</h5>
          <Icon
            @click.prevent="numberShow = false"
            v-if="numberShow"
            type="md-eye"
            class="eyesIcon"
          />
          <Icon
            @click.prevent="numberShow = true"
            v-else
            type="md-eye-off"
            class="eyesIcon"
          />
        </div>
        <div class="top_title_part_detail_num" data-private="">
          <span
            style="line-height: 38px;font-size: 32px;margin-right: 8px;color: #1c1c1c;"
          >
            {{ !numberShow ? "*********" : `${allData.all} USDT` }}
          </span>
          <em class="pt-2 text-lg leading-5 text-t2 left-5">
            {{ !numberShow ? "*********" : ` ≈ ¥${allData.allCNY}` }}
          </em>
        </div>
      </div>

      <div class="flex bottom_part">
        <div style="padding: 40px 24px 0;">
          <RadioGroup v-model="cardType" type="button" button-style="solid">
            <Radio label="1">待使用(0)</Radio>
            <Radio label="2">使用中(0)</Radio>
            <Radio label="3">待解鎖(0)</Radio>
            <Radio label="4">待領取(0)</Radio>
            <Radio label="5">已失效(0)</Radio>
          </RadioGroup>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 小眼睛
      numberShow: false,
      // 卡券類型
      cardType: "1",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
@import url("../../../assets/css/common.less");
.eyesIcon {
  font-size: 16px;
  height: 16px;
  width: 16px;
  line-height: 16px;
  text-align: center;
  display: inline-block;
  position: relative;
  color: #6f6f6f;
  cursor: pointer;
  margin-left: 6px;
}
.finance_all_content {
  min-width: 975px;
  height: 100%;
  .top_title_part {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    h1 {
      color: #1c1c1c;
      line-height: 40px;
      font-weight: 600;
      font-size: 24px;
      margin-right: 16px;
    }
    .flex {
      button {
        height: 40px;
        width: 96px;
      }
    }
  }
  .top_title_part_detail {
    margin-top: 32px;
    padding: 0 24px 40px;
    border-bottom: 1px solid #eeeeee;
    .top_title_part_detail_num {
      display: flex;
      align-items: center;
      margin-top: 16px;
      font-weight: 500;
      color: #6f6f6f;
    }
  }
  .bottom_part {
    h5 {
      padding: 24px 24px 12px;
      color: #1c1c1c;
      line-height: 20px;
      font-weight: 500;
      font-size: 16px;
    }
    .content_number {
      padding: 36px 24px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      h6 {
        color: #6f6f6f;
        line-height: 20px;
        font-weight: 500;
        font-size: 16px;
      }
      .content_number_number {
        display: flex;
        align-items: center;
        margin-top: 20px;
      }
      .content_number_arrow {
        background-color: #f7f7fb;
        cursor: pointer;
        border-radius: 9999px;
        padding-left: 12px;
        width: 44px;
        height: 44px;
        display: flex;
        position: absolute;
        top: 50%;
        right: 24px;
        align-items: center;
      }
    }
  }
}
em {
  font-style: normal;
  padding-top: 8px;
  font-size: 18px;
  line-height: 18px;
}
</style>
