<template>
  <!-- 弹出框: 变更仓位模式 -->
  <Modal
    v-model="leverageModal"
    :title="$t('newUi.text78')"
    :closable="false"
    width="511"
  >
    <div class="my_step">
      <div class="step_btn" @click="btn_reduce">-</div>
      <div class="step_input">{{ marks[sliderLeverage] }}</div>
      <div class="step_btn" @click="btn_add">+</div>
    </div>
    <div class="slider_box">
      <Slider
        class="silder-buy"
        :step="steps"
        :marks="marks"
        show-tip="never"
        v-model="sliderLeverage"
        @on-input="changeValue"
      ></Slider>
    </div>
    <div class="slider_box_text">
      {{ $t("newUi.text79") }}
    </div>
    <div class="slider_box_text">
      {{ $t("newUi.text80") }}
    </div>
    <div slot="footer" class="footer_btn">
      <div class="btn_cencal" @click="cancel()">
        {{ $t("common.paySure.cancel") }}
      </div>
      <div class="btn_sure" @click="submit()">{{ $t("common.ok") }}</div>
    </div>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      marks: {
        0: "",
        25: "",
        50: "",
        75: "",
        100: "",
      },
      steps: 1,
      sliderLeverage: null,
      leverageNumbers: 0,
    };
  },
  props: {
    leverageNumber: Number,
    leverageModal: Boolean,
    leverageList: [Array, Object],
  },
  watch: {
    leverageList(newVal) {
      const step = 100 / (newVal.length - 1);
      this.steps = step;
      this.marks = newVal.reduce((acc, curr, index) => {
        acc[Math.round(step * index)] = curr + "x";
        return acc;
      }, {});
    },
    leverageNumber(newVal) {
      this.leverageNumbers = newVal;
      this.sliderLeverage = Math.round(newVal * this.steps);
    },
  },
  computed: {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit("leverageCancel", false);
      this.leverageNumbers = this.leverageNumber;
      this.sliderLeverage = Math.round(this.leverageNumber * this.steps);
    },
    submit() {
      this.$emit("leverageSubmit", false, this.leverageNumbers);
    },
    changeValue(value) {
      if (value) {
        this.leverageNumbers = Math.round(value / this.steps);
      } else {
        this.leverageNumbers = 0;
      }
      this.sliderLeverage = Math.round(value);
    },
    btn_reduce() {
      if (this.leverageNumbers > 0) {
        this.leverageNumbers = this.leverageNumbers - 1;
        this.sliderLeverage = Math.round(this.leverageNumbers * this.steps);
      } else {
        return;
      }
    },
    btn_add() {
      if (this.leverageNumbers < this.leverageList.length - 1) {
        this.leverageNumbers = this.leverageNumbers + 1;
        this.sliderLeverage = Math.round(this.leverageNumbers * this.steps);
      } else {
        return;
      }
    },
  },
};
</script>
<style lang="less">
.my_step {
  margin: 10px auto;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .step_btn {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #e2e1e1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #666;
    user-select: none; /* 标准语法 */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none;
  }
  .step_input {
    width: 225px;
    height: 40px;
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #e2e1e1;
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
    line-height: 40px;
  }
}
.slider_box {
  width: 451px;
  margin: 30px auto 50px;
}
.slider_box_text {
  width: 411px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
  margin: 10px auto;
}

.footer_btn {
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn_cencal {
    width: 125px;
    height: 27px;
    background: #f7f3f3;
    border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: #a5a5a5;
    cursor: pointer;
  }
  .btn_sure {
    width: 125px;
    height: 27px;
    background: #35e9c5;
    border-radius: 5px 5px 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.87);
    cursor: pointer;
  }
}
</style>
