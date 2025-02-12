<template>
  <!-- 提幣 -->
  <div class="finance_content">
    <div class="title">
      <Icon
        @click="goBack"
        type="ios-arrow-back"
        style="margin-right: 20px;"
      />{{ $t("dolphin.text84") }}
    </div>
    <div class="finance_operate">
      <div class="finance_operate_left">
        <Steps :current="stepCurrent">
          <Step :title="$t('dolphin.text87')"></Step>
          <Step :title="$t('dolphin.text85')"></Step>
        </Steps>
        <!-- 步骤一 -->
        <div v-if="stepCurrent === 0">
          <Select
            v-model="checkCoin"
            style="width:100%; margin: 20px 0"
            @on-change="seleceChangeCoin"
            :label-in-value="true"
          >
            <Option
              v-for="(item, index) in coinsData"
              :value="item.type"
              :key="index"
              :label="item.name"
            >
              <div style="display: flex;align-items: center;">
                <span style="margin: 0px 12px;">{{ item.name }}</span>
              </div>
            </Option>
          </Select>
          <Button @click="handstep(1)" type="primary" size="large" long>{{
            $t("carouselItem.text81")
          }}</Button>
        </div>
        <!-- 步骤二 -->
        <div v-if="stepCurrent === 1">
          <Form
            style="width:100%; margin: 20px 0"
            ref="formInline"
            :model="formInline"
            inline
          >
            <FormItem prop="apiKey" class="apiKey">
              <Input
                :type="showPassword ? 'text' : 'password'"
                v-model="formInline.apiKey"
                placeholder="API KEY"
              >
                <Button
                  slot="append"
                  v-if="showPassword"
                  @click="handlePassword"
                  icon="ios-eye-outline"
                ></Button>
                <Button
                  slot="append"
                  v-else
                  @click="handlePassword"
                  icon="ios-eye-off-outline"
                ></Button>
              </Input>
            </FormItem>
            <FormItem prop="secretKey" class="apiKey">
              <Input
                :type="showPassword1 ? 'text' : 'password'"
                v-model="formInline.secretKey"
                placeholder="SECRET KEY"
              >
                <Button
                  slot="append"
                  v-if="showPassword1"
                  icon="ios-eye-outline"
                  @click="handlePassword1"
                ></Button>
                <Button
                  slot="append"
                  v-else
                  @click="handlePassword1"
                  icon="ios-eye-off-outline"
                ></Button>
              </Input>
            </FormItem>
            <FormItem prop="password" class="apiKey" v-show="checkCoin == '1'">
              <Input
                :type="showPassword2 ? 'text' : 'password'"
                v-model="formInline.password"
                placeholder="PASSWORD"
              >
                <Button
                  slot="append"
                  v-if="showPassword2"
                  icon="ios-eye-outline"
                  @click="handlePassword2"
                ></Button>
                <Button
                  slot="append"
                  v-else
                  @click="handlePassword2"
                  icon="ios-eye-off-outline"
                >
                </Button>
              </Input>
            </FormItem>
          </Form>
          <Button type="primary" size="large" long @click="hande_add()">{{
            $t("dolphin.text91")
          }}</Button>
          <Button
            type="error"
            size="large"
            long
            style="margin-top: 10px;"
            @click="hand_del()"
            >{{ $t("dolphin.text92") }}</Button
          >
        </div>
        <Button
          v-show="stepCurrent == 1"
          @click="resect()"
          type="warning"
          size="large"
          long
          style="margin-top: 10px;"
          >{{ $t("carouselItem.text89") }}</Button
        >
      </div>

      <div class="finance_operate_right">
        <div style="margin-bottom: 16px;" class="finance_operate_right_title">
          {{ $t("dolphin.text93") }}
        </div>
        <div class="text_sm">{{ $t("dolphin.text94") }}</div>
        <div class="text_sm">{{ $t("dolphin.text95") }}</div>
        <div class="text_sm">{{ $t("dolphin.text96") }}</div>
        <div style="margin: 16px 0;" class="finance_operate_right_title">
          {{ $t("dolphin.text97") }}
        </div>
        <div class="text_sm">{{ $t("dolphin.text98") }}</div>
        <div class="text_sm">{{ $t("dolphin.text99") }}</div>
        <div class="text_sm">{{ $t("dolphin.text100") }}</div>
      </div>
    </div>
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "../../components/footerPart.vue";
import { encodeBase64, decodeBase64 } from "../../utils/base64";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      // 步骤条
      stepCurrent: 0,
      coinsData: [
        { name: this.$t("dolphin.text88"), type: "0" },
        { name: this.$t("dolphin.text89"), type: "1" },
      ],
      checkCoin: "",
      formInline: {
        all: "",
        apiKey: "",
        secretKey: "",
        password: "",
      },
      showPassword: false,
      showPassword1: false,
      showPassword2: false,
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
    };
  },
  created() {},
  computed: {},
  methods: {
    // 选择交易源
    seleceChangeCoin(e) {
      this.checkCoin = e.value;
    },
    seleceChangeKey() {
      this.$http
        .get(this.host + this.api.quantization.keyDetail, {
          params: {
            type: this.checkCoin,
          },
        })
        .then((res) => {
          this.formInline.all = res.body.data;
          this.formInline.apiKey = res.body.data.mkApiKey;
          if (res.body.data.mkApiSec != null) {
            this.formInline.secretKey = decodeBase64(res.body.data.mkApiSec);
            this.formInline.password = decodeBase64(res.body.data.mkPassword);
          }
        });
    },
    // 添加保存
    hande_add() {
      var ak = this.formInline.apiKey;
      var sk = encodeBase64(this.formInline.secretKey).toString();
      var pwd = encodeBase64(this.formInline.password).toString();
      if (!this.formInline.apiKey) {
        this.$Message.error(this.$t("dolphin.text15") + "API KEY");
        return;
      }
      if (!this.formInline.secretKey) {
        this.$Message.error(this.$t("dolphin.text15") + "SECRET KEY");
        return;
      }
      if (this.checkCoin == "1" && !this.formInline.password) {
        this.$Message.error(this.$t("dolphin.text15") + "PASSWORD");
        return;
      }
      if (
        this.formInline.all.mkApiSec != null &&
        this.formInline.all.mkApiSec != ""
      ) {
        var api1 = this.api.quantization.keyUpdate;
      } else {
        var api1 = this.api.quantization.keyAdd;
      }
      if (this.checkCoin == "1") {
        var params = {
          type: "1",
          ak: ak,
          sk: sk,
          pwd: pwd,
        };
      } else {
        var params = {
          type: "0",
          ak: ak,
          sk: sk,
          pwd: encodeBase64("123"),
        };
      }
      this.$http.post(this.host + api1, params).then((res) => {
        if (res.body.code == 0) {
          this.$Message.success(res.body.message);
          this.stepCurrent = 0;
          this.resect();
        } else {
          this.$Message.error(res.body.message);
        }
      });
    },
    // 删除
    hand_del() {
      this.$http
        .post(
          this.host + this.api.quantization.keyDel + `${this.formInline.all.id}`
        )
        .then((res) => {
          if (res.body.code == 0) {
            this.$Message.success(res.body.message);
            this.stepCurrent = 0;
            this.resect();
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
    // 下一步
    handstep(id) {
      if (id == 1) {
        if (this.checkCoin == "") {
          this.$Message.error(this.$t("dolphin.text90"));
        } else {
          this.stepCurrent = id;
          this.seleceChangeKey();
        }
      }
    },
    // 重新填写
    resect() {
      this.stepCurrent = 0;
      for (let a in this.formInline) {
        this.formInline[a] = "";
      }
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 显示隐藏
    handlePassword() {
      // 切换密码的显示状态
      this.showPassword = !this.showPassword;
    },
    // 显示隐藏
    handlePassword1() {
      // 切换密码的显示状态
      this.showPassword1 = !this.showPassword1;
    },
    handlePassword2() {
      // 切换密码的显示状态
      this.showPassword2 = !this.showPassword2;
    },
  },
};
</script>
<style lang="less" scoped>
.finance_content {
  padding-top: 50px;
  background-color: #f8f8f8;
  width: 100%;
  .title {
    padding: 24px 0;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    font-size: 24px;
    line-height: 32px;
  }
  .finance_operate {
    padding: 40px;
    width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    display: grid;
    gap: 120px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    font-size: 14px;
    line-height: 20px;
  }
}
.icon {
  position: absolute;
  top: 5px;
  right: 10px;
}
.finance_operate_right_title {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  .text_sm {
    color: #666;
    font-size: 14px;
  }
}
/deep/.ivu-select-single .ivu-select-selection {
  border: 1px solid #e8eaec;
}
</style>
