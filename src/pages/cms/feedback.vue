<template>
  <div class="extract">
    <div class="head">
      <div class="head_h1">
        <div class="head_left">
          <div>{{ $t("carouselItem.text213") }}</div>
          <div>{{ $t("carouselItem.text214") }}</div>
        </div>
        <div class="head_right">
          <img
            :src="$imgUrl + '/cms/question.png'"
            alt=""
            style="width: 412px; height: 360px"
          />
        </div>
      </div>
    </div>
    <div class="cotents">
      <div class="title_top">{{ $t("carouselItem.text208") }}</div>
      <div class="cotent">
        <div class="text">{{ $t("carouselItem.text215") }}</div>
        <div class="text_area">
          <textarea
            v-model="feedback.remark"
            name=""
            id=""
            cols="90"
            rows="10"
            style="width: 478px; height: 153px; resize: none; border: none"
            :placeholder="$t('carouselItem.text209')"
            placeholder-style="color: #ACB2BF; font-size: 24rpx;"
          ></textarea>
        </div>
      </div>
      <div class="cotent">
        <div class="text1">{{ $t("carouselItem.text210") }}</div>
        <Select v-model="feedback.backType" style="width: 500px">
          <Option
            v-for="item in limitPrice"
            :value="item.id"
            :key="item.id"
            >{{ item.question }}</Option
          >
        </Select>
      </div>
      <div class="photo">
        <div class="text1">{{ $t("carouselItem.text211") }}</div>
        <Upload
          :headers="{ 'access-auth-token': token,'equipment': 'PC' }"
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg', 'png', 'gif']"
          type="drag"
          :action="action"
          class="feedback_Upload"
        >
          <div style="width: 490px; height: 146px">
            <img
              v-if="feedback.backImg"
              :src="feedback.backImg"
              alt=""
              style="width: 500px; height: 150px"
            />
            <div class="title_Upload" v-else>
              {{ $t("carouselItem.text221") }}
            </div>
          </div>
        </Upload>
      </div>
      <div class="cotent">
        <div class="input_title">{{ $t("carouselItem.text212") }}</div>
        <input
        v-model="feedback.contractEmail"
          class="input_text"
          type="text"
          :placeholder="$t('carouselItem.text212')"
          placeholder-style="color: #acb2bf; font-size: 24rpx;"
        />
      </div>
      <div class="btn_bottoms" @click="hand_submit()">
        {{ $t("carouselItem.text220") }}
      </div>
    </div>
    <div style="height: 100px"></div>
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
export default {
  components: {
    FooterPart
  },
  data() {
    return {
      token: localStorage.getItem("TOKEN"),
      action: this.imageUrl,
      feedback: {
        remark: "",
        backImg: "",
        contractEmail: "",
        backType: "",
      },
      limitPrice: [],
    };
  },
  created(){
    this.getQuestion()
  },
  methods: {
    getQuestion(){
      this.$http
        .get(this.host + this.api.common.questions)
        .then((res) => {
          this.limitPrice = res.body.data
        });
    },
    hand_submit() {
      if(!this.feedback.remark){
        this.$Message.info(this.$t("carouselItem.text208"));
        return
      }
      if(!this.feedback.backImg){
        this.$Message.info(this.$t("carouselItem.text221"));
        return
      }
      if(!this.feedback.contractEmail){
        this.$Message.info(this.$t("carouselItem.text222"));
        return
      }
      if(!Number(this.feedback.backType)){
        this.$Message.info(this.$t("carouselItem.text210"));
        return
      }
      const foundItem = this.limitPrice.find((item) => item.id == this.feedback.backType); 
      let paramBanner = {
        detail: this.feedback.remark,
        url: this.feedback.backImg,
        email: this.feedback.contractEmail,
        questionId: this.feedback.backType,
        question: foundItem.question,
      };
      this.$http
        .post(this.host + this.api.common.feedback, paramBanner)
        .then((response) => {
          var resp = response.body;
          console.log(resp);
          if(resp.code == 0){
            this.$router.push('/index');
            this.$Message.success(resp.message);
          }else{
            this.$Message.info(resp.message);
          }
        });
    },
    handleSuccess(res, file) {
      console.log(res.data);
      this.feedback.backImg = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.extract {
  padding-top: 50px;
}
.head {
  width: 100%;
  height: 360px;
  background-color: #000000;
}
.head_h1 {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.head_left {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  :nth-child(1) {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
  }
  :nth-child(2) {
    font-size: 14px;
    color: #fff;
    margin-top: 20px;
  }
}
.head_right {
  width: 50%;
}
.cotents {
  width: 1000px;
  margin: 0 auto;
}
.title_top {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 20px;
}

.text {
  font-size: 12px;
  color: #acb2bf;
  margin-bottom: 10px;
}
.text1 {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}
.input_all {
  width: 500px;
  height: 40px;
  line-height: 20px;
  font-size: 12px;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.text_area {
  width: 500px;
  height: 175px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px solid #acb2bf;
}
.select_all {
  width: 500px;
  height: 40px;
  font-size: 12px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 15px;
}
.photo {
  width: 500px;
  height: 150px;
  margin-top: 10px;
  margin-bottom: 50px;
}
.feedback_Upload {
  width: 100%;
  height: 150px;
  border: 1px solid #acb2bf;
}
.input_text {
  border: 1px solid #acb2bf;
  width: 500px;
  height: 40px;
  border-radius: 3px;
  text-indent: 10px;
  margin-top: 10px;
}
.title_Upload {
  font-size: 30px;
  color: #acb2bf;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.btn_bottoms {
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-top: 20px;
  background-color: #2cca67;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}
</style>
