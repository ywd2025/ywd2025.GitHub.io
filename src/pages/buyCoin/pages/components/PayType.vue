<!--
 * @Author: 张慧茜 921879459@qq.com
 * @Date: 2024-03-18 14:59:58
 * @LastEditors: 张慧茜 921879459@qq.com
 * @LastEditTime: 2024-04-02 15:19:04
 * @FilePath: \天晟交易所\src\pages\buyCoin\pages\components\PayType.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="PayType_page">
    <div class="user_other_title">
      {{ $t("buyCoin.pages.userCenter.PayType.txt1") }}
    </div>
    <div class="user_other_tips">
      <div class="tip">
        {{ $t("buyCoin.pages.userCenter.PayType.txt2") }}
      </div>
      <Button
        type="primary"
        @click="handleAddPayType"
        :disabled="
          userPayType.cptAccountZfb != null &&
            userPayType.cptAccountWx != null &&
            userPayType.cptBankCode != null
        "
        >{{ $t("buyCoin.pages.userCenter.PayType.txt3") }}</Button
      >
    </div>
    <div class="list_part">
      <div
        class="no_type"
        v-if="
          userPayType.cptAccountZfb == null &&
            userPayType.cptAccountWx == null &&
            userPayType.cptBankCode == null
        "
      >
        {{ $t("buyCoin.pages.userCenter.PayType.txt4") }}
      </div>
      <div
        v-else
        style="display: grid;grid-template-columns: repeat(3, 33%); grid-gap: 20px;margin-top: 20px;"
      >
        <Card v-if="userPayType.cptAccountZfb != null">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{ $t("buyCoin.universal.alipay") }}
          </p>
          <div slot="extra">
            <span
              style="color: rgb(255,153,0); cursor: pointer;"
              @click.prevent="handleChange('zfb')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt5") }}</span
            >
            <span
              style="color: rgb(237,64,20);cursor: pointer;"
              @click="handleDel('zfb')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt6") }}</span
            >
          </div>
          <div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt7") }}: </span
              >{{ userPayType.cptAccountZfb }}
            </div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt18") }}: </span
              ><img
                style="width: 50px;height: 50px;"
                :src="userPayType.cptCodeZfb"
              />
            </div>
          </div>
        </Card>
        <Card v-if="userPayType.cptAccountWx != null">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{ $t("buyCoin.universal.wx") }}
          </p>
          <div slot="extra">
            <span
              style="color: rgb(255,153,0); cursor: pointer;"
              @click.prevent="handleChange('wx')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt5") }}</span
            >
            <span
              style="color: rgb(237,64,20);cursor: pointer;"
              @click="handleDel('wx')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt6") }}</span
            >
          </div>
          <div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt7") }}: </span
              >{{ userPayType.cptAccountWx }}
            </div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt18") }}: </span
              ><img
                style="width: 50px;height: 50px;"
                :src="userPayType.cptCodeWx"
              />
            </div>
          </div>
        </Card>
        <Card v-if="userPayType.cptBankCode != null">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{ $t("buyCoin.universal.bank") }}
          </p>
          <div slot="extra">
            <span
              style="color: rgb(255,153,0); cursor: pointer;"
              @click.prevent="handleChange('bank')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt5") }}</span
            >
            <span
              style="color: rgb(237,64,20);cursor: pointer;"
              @click="handleDel('bank')"
              >{{ $t("buyCoin.pages.userCenter.PayType.txt6") }}</span
            >
          </div>
          <div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt9") }}: </span
              >{{ userPayType.cptBankName }}
            </div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt11") }}: </span
              >{{ userPayType.cptBankAddress }}
            </div>
            <div>
              <span>{{ $t("buyCoin.pages.userCenter.PayType.txt13") }}: </span
              >{{ userPayType.cptBankCode }}
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- 新增支付方式弹窗 -->
    <Modal
      v-model="addPayTypeModal"
      footer-hide
      :title="$t('buyCoin.pages.userCenter.PayType.txt1')"
    >
      <div v-if="payType === null">
        <h4 style="margin-bottom: 10px;">
          {{ $t("buyCoin.pages.userCenter.PayType.txt15") }}
        </h4>
        <div class="pay_part_buttons">
          <Button
            @click="payType = 'zfb'"
            v-if="userPayType.cptAccountZfb == null"
          >
            <span class="button_icon" style="border-color: rgb(1, 169, 242);">{{
              $t("buyCoin.universal.alipay")
            }}</span>
          </Button>
          <Button
            @click="payType = 'wx'"
            v-if="userPayType.cptAccountWx == null"
          >
            <span class="button_icon" style="border-color: rgb(45, 193, 0);">{{
              $t("buyCoin.universal.wx")
            }}</span>
          </Button>
          <Button
            @click="payType = 'bank'"
            v-if="userPayType.cptBankCode == null"
          >
            <span
              class="button_icon"
              style="border-color: rgb(240, 185, 11);"
              >{{ $t("buyCoin.universal.bank") }}</span
            >
          </Button>
        </div>
      </div>
      <div v-else>
        <Form :model="formData" :label-width="120">
          <div v-if="payType === 'bank'">
            <FormItem :label="$t('buyCoin.pages.userCenter.PayType.txt9')">
              <Input
                v-model="formData.bankName"
                :placeholder="$t('buyCoin.pages.userCenter.PayType.txt10')"
              ></Input>
            </FormItem>
            <FormItem :label="$t('buyCoin.pages.userCenter.PayType.txt11')">
              <Input
                v-model="formData.bankAddress"
                :placeholder="$t('buyCoin.pages.userCenter.PayType.txt12')"
              ></Input>
            </FormItem>
            <FormItem :label="$t('buyCoin.pages.userCenter.PayType.txt13')">
              <Input
                v-model="formData.code"
                :placeholder="$t('buyCoin.pages.userCenter.PayType.txt14')"
              ></Input>
            </FormItem>
          </div>
          <div v-else>
            <FormItem :label="$t('buyCoin.pages.userCenter.PayType.txt7')">
              <Input
                v-model="formData.account"
                :placeholder="$t('buyCoin.pages.userCenter.PayType.txt8')"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('buyCoin.pages.userCenter.PayType.txt16')"
              prop="code"
            >
              <picUpload
                :picUrl="codeUrl"
                @getPicUrl="getPicUrlFront"
                :action="action"
              ></picUpload>
            </FormItem>
          </div>
          <FormItem> </FormItem>
        </Form>
        <Button type="primary" long @click="handleSubmit">{{
          $t("buyCoin.universal.submit")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import picUpload from "@/components/picUpload.vue";
export default {
  components: {
    picUpload,
  },
  data() {
    return {
      // 上傳圖片用
      action: this.imageUrl,
      codeUrl: "",
      userPayType: {},
      addPayTypeModal: false,
      payType: null,
      formData: {},
    };
  },
  mounted() {
    // 获取用户付款方式
    this.getUserPayType();
    this.payType = null;
    this.formData = {};
  },
  methods: {
    // 获取用户付款方式
    getUserPayType() {
      this.$http.get(this.host + this.api.buy.payType).then((response) => {
        var res = response.data;
        this.userPayType = res.data;
      });
    },
    // 修改收款方式
    handleChange(type) {
      console.log(type);
      this.payType = null;
      this.payType = type;
      if (type === "bank") {
        this.formData.code = this.userPayType.cptBankCode;
        this.formData.bankName = this.userPayType.cptBankName;
        this.formData.bankAddress = this.userPayType.cptBankAddress;
      } else if (type === "wx") {
        this.formData.account = this.userPayType.cptAccountWx;
        this.formData.codeUrl = this.userPayType.cptCodeWx;
        this.codeUrl = this.userPayType.cptCodeWx;
      } else {
        this.formData.account = this.userPayType.cptAccountZfb;
        this.formData.codeUrl = this.userPayType.cptCodeZfb;
        this.codeUrl = this.userPayType.cptCodeZfb;
      }
      console.log(1111, this.formData);
      console.log(2222, this.userPayType);
      this.addPayTypeModal = true;
    },
    // 添加收款方式
    handleAddPayType() {
      this.payType = null;
      this.formData = {};
      this.codeUrl = "";
      this.addPayTypeModal = true;
    },

    // 上傳圖片用
    getPicUrlFront(res) {
      this.codeUrl = res;
      this.formData.codeUrl = res;
    },
    // 提交
    handleSubmit() {
      console.log(this.formData);
      if (this.payType === "bank") {
        // 添加的是银行卡
        this.$http
          .post(this.host + this.api.buy.addPayBank, this.formData)
          .then((res) => {
            if (res.data.code === 0) {
              this.$Message.success(res.data.message);
              this.addPayTypeModal = false;
              this.getUserPayType();
              this.formData = {};
              this.codeUrl = "";
            } else {
              this.$Message.error(res.data.message);
            }
          });
      } else {
        const postData = {
          payType: this.payType === "wx" ? 1 : 2,
          account: this.formData.account,
          code: this.formData.codeUrl,
        };
        this.$http
          .post(this.host + this.api.buy.addPayYD, postData)
          .then((res) => {
            if (res.data.code === 0) {
              this.$Message.success(res.data.message);
              this.addPayTypeModal = false;
              this.getUserPayType();
              this.formData = {};
              this.codeUrl = "";
            } else {
              this.$Message.error(res.data.message);
            }
          });
      }
    },
    handleDel(type) {
      console.log(type);
      this.payType = type;
      this.$Modal.confirm({
        title: this.$t("buyCoin.universal.tipTitle"),
        content: this.$t("buyCoin.pages.userCenter.PayType.txt17"),
        okText: this.$t("buyCoin.universal.okText"),
        cancelText: this.$t("buyCoin.universal.cancelText"),
        onOk: () => {
          if (this.payType === "bank") {
            // 删除的是银行卡
            this.$http.post(this.host + this.api.buy.delPayBank).then((res) => {
              if (res.data.code === 0) {
                this.$Message.success(res.data.message);
                this.getUserPayType();
              } else {
                this.$Message.error(res.data.message);
              }
            });
          } else {
            const postData = {
              payType: this.payType === "wx" ? 1 : 2,
            };
            this.$http
              .post(this.host + this.api.buy.delPayYD, postData)
              .then((res) => {
                if (res.data.code === 0) {
                  this.$Message.success(res.data.message);
                  this.getUserPayType();
                } else {
                  this.$Message.error(res.data.message);
                }
              });
          }
        },
        onCancel: () => {},
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../../assets/css/common.less");
.PayType_page {
  width: 1200px;
  margin: 32px auto 0;
  .user_other_title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .user_other_tips {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .tip {
      font-size: 14px;
      line-height: 20px;
      color: rgb(112, 122, 138);
      max-width: 748px;
      margin-right: 24px;
    }
  }
  .list_part {
    .no_type {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 72px 0px 0px;
    }
  }
}

.pay_part_buttons {
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  column-gap: 24px;
  row-gap: 20px;
  .button_icon {
    border-left: 4px solid red;
    padding-left: 12px;
  }
}
</style>
