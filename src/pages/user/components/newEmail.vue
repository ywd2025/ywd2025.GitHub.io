<template>
  <div>
    <Modal
      v-model="localModalOpen"
      :footer-hide="true"
      :mask-closable="false"
      width="400"
      :title="
        typeNumber == 'newEmail0'
          ? $t('uc.safe.bindemail')
          : typeNumber == 'newEmail1'
          ? $t('carouselItem.text170')
          : typeNumber == 'newMobile0'
          ? $t('uc.safe.bindphone')
          : typeNumber == 'newMobile1'
          ? $t('carouselItem.text250')
          : ''
      "
      @on-cancel="closeModal"
    >
      <div
        class="Modal_all"
        v-if="typeNumber == 'newEmail1' || typeNumber == 'newMobile1'"
      >
        <Input
          class="input_all"
          v-model="updateNewEmail.odlEmail"
          :placeholder="$t('uc.login.usertip')"
          :disabled="true"
        >
        </Input>
        <div class="input_two">
          <Input
            type="text"
            v-model="updateNewEmail.oldCode"
            :placeholder="$t('uc.forget.smscode')"
          ></Input>
          <input
            @click="handlerSetCode(0)"
            id="sendCode"
            type="Button"
            :value="sendcodeValue"
            :disabled="codedisabled"
            class="code_css"
          />
        </div>
        <div v-if="typeNumber == 'newMobile1'" class="select_two">
          <Select v-model="countryListName" class="select_left">
            <Option
              v-for="item in countryList"
              :value="item.zhName"
              :key="item.areaCode"
              >+{{ item.areaCode }}</Option
            >
          </Select>
          <Input
            class="input_right"
            v-model="updateNewEmail.newEmail"
            :placeholder="$t('carouselItem.text255')"
            :border="false"
          ></Input>
        </div>
        <Input
          v-else
          class="input_all"
          v-model="updateNewEmail.newEmail"
          :placeholder="$t('carouselItem.text256')"
        ></Input>
        <div class="input_two">
          <Input
            type="text"
            v-model="updateNewEmail.newCode"
            :placeholder="$t('uc.forget.smscode')"
          >
          </Input>
          <input
            @click="handlerSetCode(1)"
            id="sendCode"
            type="Button"
            :value="sendcodeValue1"
            :disabled="codedisabled1"
            class="code_css"
          />
        </div>
      </div>
      <div
        class="Modal_all"
        v-if="typeNumber == 'newMobile0' || typeNumber == 'newEmail0'"
      >
      <div v-if="typeNumber == 'newMobile0'" class="select_two">
          <Select v-model="countryListName" class="select_left">
            <Option
              v-for="item in countryList"
              :value="item.zhName"
              :key="item.areaCode"
              >+{{ item.areaCode }}</Option
            >
          </Select>
          <Input
            class="input_right"
            v-model="updateNewEmail.newEmail"
            :placeholder="$t('carouselItem.text255')"
            :border="false"
          ></Input>
        </div>
        <Input
        v-else
          class="input_all"
          v-model="updateNewEmail.newEmail"
          :placeholder="
            typeNumber == 'newEmail0'
              ? $t('uc.login.usertip')
              : $t('uc.safe.telnotip')
          "
        ></Input>
        <div class="input_two">
          <Input
            type="text"
            v-model="updateNewEmail.newCode"
            :placeholder="$t('uc.forget.smscode')"
          >
          </Input>
          <input
            @click="handlerSetCode(1)"
            id="sendCode"
            type="Button"
            :value="sendcodeValue1"
            :disabled="codedisabled1"
            class="code_css"
          />
        </div>
      </div>
      <div class="footer_two">
        <Button style="margin-right: 20px" @click="closeModal()">{{
          $t("buyCoin.universal.cancelText")
        }}</Button>
        <Button type="primary" @click="handleUpdateNewEmail">{{
          $t("new.universal.submit")
        }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      codedisabled1: false,
      countdown: 60,
      countdown1: 60,
      sendcodeValue1: this.$t("uc.regist.sendcode"),
      localModalOpen: this.changeEmileNumber,
      // 邮箱修改绑定
      updateNewEmail: {
        odlEmail: this.EmileNumber,
        newEmail: "",
        oldCode: "",
        newCode: "",
      },
      countryList: [],
      countryListName: "中国",
      codeTwo0: false,
      codeTwo1: false,
      codeTwo2: false,
      codeTwo3: false,
      codeTwo4: false,
      codeTwo5: false,
      timercode1:'',
      timercode:'',
    };
  },
  watch: {
    changeEmileNumber(newVal,oldVal) {
      this.localModalOpen = newVal;
    },
    EmileNumber(newVal) {
      this.updateNewEmail.odlEmail = newVal;
    },
    typeNumber(newVal,oldVal){
      if (newVal !== oldVal) {  
        this.getnewData();  
      }  
    }
  },
  props: {
    changeEmileNumber: Boolean,
    EmileNumber: String,
    typeNumber: String,
  },
  mounted() {},
  created() {
    this.getCountry();
  },
  methods: {
    getCountry() {
      this.$http.post(this.host + this.api.uc.country, {}).then((res) => {
        this.countryList = res.body.data;
      });
    },
    closeModal() {
      this.$emit("profiLoss", false);
    },
    handlerSetCode(id) {
      if (id == 0) {
        var params = {};
        if (this.typeNumber == "newEmail1") {
          if (this.codeTwo0) {
            return;
          }
          this.codeTwo0 = true;
          params["email"] = this.updateNewEmail.odlEmail;
          this.$http
            .post(this.host + this.api.user.oldEmailCode, params)
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo0 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo0 = false;
                }
            });
        } else if (this.typeNumber == "newMobile1") {
          if (this.codeTwo2) {
            return;
          }
          this.codeTwo2 = true;
          params["phone"] = this.updateNewEmail.odlEmail;
          this.$http
            .post(this.host + this.api.user.mobileOldCode, params)
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo2 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo2 = false;
                }
            });
        }
      } else if (id == 1) {
        // 郵箱發送驗證碼
        var params = {};
        if (this.typeNumber == "newEmail1") {
          var reg =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          params["email"] = this.updateNewEmail.newEmail;
          if (params["email"] && reg.test(params["email"])) {
            if (this.codeTwo1) {
              return;
            }
            this.codeTwo1 = true;
            this.$http
              .post(this.host + this.api.user.EmailNewCode, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo1 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo1 = false;
                }
              });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.login.usertip"),
            });
          }
        } else if (this.typeNumber == "newMobile1") {
          params["phone"] = this.updateNewEmail.newEmail;
          params["country"] = this.countryListName;
          if (params["phone"]) {
            if (this.codeTwo3) {
              return;
            }
            this.codeTwo3 = true;
            this.$http
              .post(this.host + this.api.user.mobileNewCode, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo3 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo3 = false;
                }
              });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.forget.teltip"),
            });
          }
        } else if (this.typeNumber == "newMobile0") {
          params["phone"] = this.updateNewEmail.newEmail;
          params["country"] = this.countryListName;
          if (params["phone"]) {
            if (this.codeTwo4) {
              return;
            }
            this.codeTwo4 = true;
            this.$http
              .post(this.host + this.api.user.bindmobilecode, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo4 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo4 = false;
                }
              });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.forget.teltip"),
            });
          }
        } else if (this.typeNumber == "newEmail0") {
          var reg =
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          params["email"] = this.updateNewEmail.newEmail;
          if (params["email"] && reg.test(params["email"])) {
            if (this.codeTwo5) {
              return;
            }
            this.codeTwo5 = true;
            this.$http
              .post(this.host + this.api.user.bindemailcode, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.settime(id);
                  this.codeTwo5 = false;
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.codeTwo5 = false;
                }
              });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.login.usertip"),
            });
          }
        }
      }
    },
    // 倒計時
    settime(id) {
      if (id == 0) {
        this.sendcodeValue =
          this.$t("uc.regist.resendcode") + this.countdown + ")";
        this.codedisabled = true;
        var _this = this;
        this.timercode = setInterval(() => {
          _this.countdown--;
          _this.sendcodeValue =
            _this.$t("uc.regist.resendcode") + _this.countdown + ")";
          if (this.countdown <= 0) {
            clearInterval(this.timercode);
            _this.codedisabled = false;
            _this.sendcodeValue = _this.$t("uc.regist.sendcode");
            _this.countdown = 60;
          }
        }, 1000);
      } else if (id == 1) {
        this.sendcodeValue1 =
          this.$t("uc.regist.resendcode") + this.countdown1 + ")";
        this.codedisabled1 = true;
        var _this = this;
        this.timercode1 = setInterval(() => {
          _this.countdown1--;
          _this.sendcodeValue1 =
            _this.$t("uc.regist.resendcode") + _this.countdown1 + ")";
          if (this.countdown1 <= 0) {
            clearInterval(this.timercode1);
            _this.codedisabled1 = false;
            _this.sendcodeValue1 = _this.$t("uc.regist.sendcode");
            _this.countdown1 = 60;
          }
        }, 1000);
      }
    },
    handleUpdateNewEmail() {
      var params = {};
      if (this.typeNumber == "newEmail1") {
        params["email"] = this.updateNewEmail.odlEmail;
        params["code"] = this.updateNewEmail.oldCode;
        params["newEmail"] = this.updateNewEmail.newEmail;
        params["newCode"] = this.updateNewEmail.newCode;
        if (
          params["email"] &&
          params["code"] &&
          params["newEmail"] &&
          params["newCode"]
        ) {
          this.$http
            .post(this.host + this.api.user.newEmail, params)
            .then((res) => {
              var resp = res.body;
              if (resp.code == 0) {
                this.$emit("successprofiLoss", false);
                this.$Notice.success({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
                this.getnewData()
              } else {
                // this.$emit("successprofiLoss", false);
                this.$Notice.error({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });

              }
            });
        } else {
          this.$Notice.error({
            title: this.$t("common.tip"),
            desc: this.$t("carouselItem.text231"),
          });
        }
      } else if (this.typeNumber == "newMobile1") {
        params["phone"] = this.updateNewEmail.odlEmail;
        params["code"] = this.updateNewEmail.oldCode;
        params["newPhone"] = this.updateNewEmail.newEmail;
        params["newCode"] = this.updateNewEmail.newCode;
        if (
          params["phone"] &&
          params["code"] &&
          params["newPhone"] &&
          params["newCode"]
        ) {
          this.$http
            .post(this.host + this.api.user.newPhone, params)
            .then((res) => {
              var resp = res.body;
              if (resp.code == 0) {
                this.$emit("successprofiLoss", false);
                this.$Notice.success({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
                this.getnewData()
              } else {
                // this.$emit("successprofiLoss", false);
                this.$Notice.error({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
              }
            });
        } else {
          this.$Notice.error({
            title: this.$t("common.tip"),
            desc: this.$t("carouselItem.text231"),
          });
        }
      } else if (this.typeNumber == "newMobile0") {
        params["phone"] = this.updateNewEmail.newEmail;
        params["code"] = this.updateNewEmail.newCode;
        if (params["phone"] && params["code"]) {
          this.$http
            .post(this.host + this.api.user.phone, params)
            .then((res) => {
              var resp = res.body;
              if (resp.code == 0) {
                this.$emit("successprofiLoss", false);
                this.$Notice.success({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
                this.getnewData()
              } else {
                // this.$emit("successprofiLoss", false);
                this.$Notice.error({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
              }
            });
        } else {
          this.$Notice.error({
            title: this.$t("common.tip"),
            desc: this.$t("carouselItem.text231"),
          });
        }
      } else if (this.typeNumber == "newEmail0") {
        params["email"] = this.updateNewEmail.newEmail;
        params["code"] = this.updateNewEmail.newCode;
        if (params["email"] && params["code"]) {
          this.$http
            .post(this.host + this.api.user.email, params)
            .then((res) => {
              var resp = res.body;
              if (resp.code == 0) {
                this.$emit("successprofiLoss", false);
                this.$Notice.success({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
                this.getnewData()
              } else {
                // this.$emit("successprofiLoss", false);
                this.$Notice.error({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
              }
            });
        } else {
          this.$Notice.error({
            title: this.$t("common.tip"),
            desc: this.$t("carouselItem.text231"),
          });
        }
      }
    },
    getnewData(){
      this.updateNewEmail.oldCode = ""
      this.updateNewEmail.newEmail = ""
      this.updateNewEmail.newCode = ""
      this.countdown1 = 60;
      this.countdown = 60;
      clearInterval(this.timercode);
      clearInterval(this.timercode1);
      this.sendcodeValue = this.$t("uc.regist.sendcode")
      this.sendcodeValue1 = this.$t("uc.regist.sendcode")
      this.codeTwo0 = false
      this.codeTwo1 = false
      this.codeTwo2 = false
      this.codeTwo3 = false
      this.codeTwo4 = false
      this.codeTwo5 = false
      this.countryListName = '中国'
      this.codedisabled = false
      this.codedisabled1 = false
    },
  },
  beforeDestroy() {  
    this.getnewData()
  }, 
};
</script>

<style lang="less" scoped>
.input_all {
  margin-bottom: 20px;
}
.Modal_all {
  padding: 30px;
}
.input_two {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}
.footer_two {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 30px;
}
.code_css {
  height: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 1px;
  right: 5px;
  cursor: pointer;
}
.select_two {
  display: flex;
  width: 308px;
  height: 32px;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 20px;
  // position: relative;
}
.select_left {
  height: 30px;
  // border: none;
  background-color: #fff;
  width: 100px;
  // position: absolute;
  // top: 1px;
  // left: 5px;
}
.input_right {
}
</style>
