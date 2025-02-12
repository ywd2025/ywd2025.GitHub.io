<template>
  <div class="content">
    <div class="login_left">
      <div
        style="
          line-height: 64px;
          font-weight: 600;
          font-size: 54px;
          padding-top: 40px;
        "
      >
        {{ $t("new.register.registerAd1") }}
      </div>
      <div
        style="
          line-height: 30px;
          font-weight: 400;
          font-size: 22px;
          margin-top: 12px;
        "
      >
        {{ $t("new.register.registerAd2") }}
      </div>
      <div
        style="
          line-height: 46px;
          font-weight: 400;
          font-size: 22px;
          margin-top: 24px;
          padding: 0 28px;
          border-radius: 60px;
          background-color: #03C59E;
          color: #fff;
        "
      >
        {{ $t("new.register.registerAd3") }}
      </div>
      <img
        style="margin-top: 74px"
        :src="$imgUrl + '/index/register_img.png'"
        alt=""
      />
    </div>
    <div class="login_form">
      <div class="login_right">
        <Form
          v-if="allowRegister"
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          inline
        >
          <!-- 註冊方式 -->
          <FormItem style="text-align: center">
            <ButtonGroup>
              <Button
                v-if="openphone == 1"
                style="color: #9b9b9b"
                :class="{ active: changeActive == 0 }"
                @click="handleClick(0)"
                >{{ $t("uc.regist.telregist") }}</Button
              >
              <Button
                v-if="openemail == 1"
                style="color: #9b9b9b"
                :class="{ active: changeActive == 1 }"
                @click="handleClick(1)"
                >{{ $t("uc.regist.emailregist") }}</Button
              >
            </ButtonGroup>
          </FormItem>
          <!-- 用戶暱稱 不要了 -->
          <FormItem prop="user">
            <!-- 手機註冊 -->
            <div v-if="changeActive == 0" class="select_two">
              <Select
                v-model="country"
                slot="prepend"
                class="select_left"
                :placeholder="$t('common.pleaseselect')"
              >
                <Option
                  v-for="item in countryList"
                  :value="item.zhName"
                  :key="item.zhName"
                  :label="`+${item.areaCode}`"
                  class="select_left_option"
                >
                  <img :src="item.image" alt="" style="width: 16px; height: 16px" />
                  <div style="color: #1c1c1c;text-align: left;width: 80px">{{
                    item.enName
                  }}</div>
                  <div style="color: #99a1a8;text-align: right;width: 30px">{{
                    item.areaCode
                  }}</div>
                </Option>
              </Select>
              <Input
                type="text"
                v-model="formInline.user"
                :placeholder="$t('new.register.phone')"
              >
              </Input>
            </div>
            <!-- 邮箱注册 -->
            <Input
              type="text"
              v-model="formInline.user"
              :placeholder="$t('new.register.account')"
              v-if="changeActive == 1"
            >
            </Input>
          </FormItem>

          <FormItem prop="password" class="password">
            <Input
              :type="showPassword ? 'text' : 'password'"
              v-model="formInline.password"
              :placeholder="$t('new.register.password')"
            />
            <Icon
              v-if="showPassword"
              type="ios-eye-outline"
              @click="handlePassword"
              size="22"
              class="icon"
            />
            <Icon
              v-else
              @click="handlePassword"
              type="ios-eye-off-outline"
              size="22"
              class="icon"
            />
          </FormItem>

          <FormItem prop="code">
            <Input
              type="text"
              v-model="formInline.code"
              :placeholder="$t('uc.forget.smscode')"
            >
            </Input>
            <input
              @click="handlerSetCode"
              id="sendCode"
              type="Button"
              :value="sendcodeValue"
              :disabled="codedisabled"
            />
          </FormItem>
          <FormItem prop="promotion">
            <Input type="text" v-model="formInline.promotion">
              <span slot="prepend" style="margin-left: 7px"
                >{{ $t("uc.regist.promotion") }} :</span
              >
            </Input>
          </FormItem>
          <div class="check-agree" style="">
            <label>
              <Checkbox v-model="agree">{{
                $t("uc.regist.agreement")
              }}</Checkbox>
            </label>
            <span
              @click="openModel('service')"
              style="cursor: pointer; color: #03C59E"
            >
              《{{ $t("uc.regist.userprotocol") }}》
            </span>
          </div>
          <FormItem>
            <Button
              class="register_btn"
              @click="handleSubmit('formInline')"
              :disabled="registing"
              >{{ $t("uc.regist.regist") }}</Button
            >
          </FormItem>
        </Form>
        <Alert v-else type="warning">
          Coming soon!
          <template slot="desc"> EPBTC.PRO will open register soon </template>
        </Alert>
      </div>
    </div>

    <Modal v-model="textModel" :footer-hide="true">
      <div
        style="white-space: normal; word-break: break-all; margin-top: 20px"
        v-html="content.html"
      ></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (this.changeActive == 0) {
        callback();
      } else {
        if (value == "") {
          callback(new Error(this.$t("uc.login.loginvalidate")));
        } else {
          callback();
        }
      }
    };
    const validateRepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.regist.confirmpwdtip")));
      } else if (value !== this.formInline.password) {
        callback(new Error(this.$t("uc.regist.confirmpwderr")));
      } else {
        callback();
      }
    };
    return {
      openphone: "",
      openemail: "",
      v_auto: [],
      textModel: false,
      showPassword: false,
      // 國際區號
      countryList: [],
      country: this.$t("uc.regist.china"),
      changeActive: 1,
      code: "CS98",
      user_numberId: "",
      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      ticket: "",
      randStr: "",
      registing: false,
      content: [],
      modal1: false,
      _captchaResult: null,
      agree: true,
      allowRegister: true,
      areas: [],
      showCode: true,
      countdown: 60,
      formInline: {
        username: "",
        // country: "",
        user: "",
        code: "",
        areaCode: "",
        password: "",
        repassword: "",
        promotion: "",
      },
      ruleInline: {
        user: [{ validator: validateUser, trigger: "blur" }],
        code: [
          {
            required: true,
            message: this.$t("uc.forget.smscode"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("uc.regist.pwdtip"),
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: this.$t("uc.regist.pwdmsg"),
            trigger: "blur",
          },
        ],
        repassword: [{ validator: validateRepassword, trigger: "blur" }],
      },
      key: "",
      code: "",
    };
  },
  watch: {},
  computed: {
    // lang: function() {
    //   return this.$store.state.lang;
    // },
    // buttonLists: function() {
    //   return [
    //     this.openphone == 0
    //       ? {
    //           text: this.$t("uc.regist.telregist"),
    //         }
    //       : "",
    //     this.openemail == 1
    //       ? {
    //           text: this.$t("uc.regist.emailregist"),
    //         }
    //       : "",
    //   ];
    // },
  },
  created() {
    // 為什麼要滾啊
    window.scrollTo(0, 0);
    this.init();
    this.actives(this.changeActive);
    if (
      this.$route.query.code != undefined &&
      this.$route.query.code != "" &&
      this.$route.query.code != null
    ) {
      this.formInline.promotion = this.$route.query.code;
    } else {
      this.formInline.promotion = "";
    }
    this.getCountryCode();
  },
  mounted() {
    this.user_numberId = this.$route.query.user;
    if (this.user_numberId && this.user_numberId.includes("@")) {
      this.changeActive = 1;
      this.formInline.user = this.user_numberId;
    } else if (this.user_numberId) {
      this.changeActive = 0;
      this.formInline.user = this.user_numberId;
    }
  },
  methods: {
    openModel(api) {
      // 获取字典数据
      this.$http
        .post(this.host + this.api.index.getDictionary, { lable: api })
        .then((res) => {
          this.content = res.data.data;
          this.textModel = true;
        });
    },
    // 切換註冊方式
    handleClick(index) {
      this.showPassword = false;
      this.changeActive = index;
      this.$refs["formInline"].resetFields();
    },
    // 獲取國際區號
    getCountryCode() {
      this.$http.post(this.host + this.api.uc.country, {}).then((response) => {
        var res = response.body;
        this.countryList = res.data;
      });
    },

    // updateLangData() {
    //   this.buttonLists = [
    //     {
    //       text: this.$t("uc.regist.telregist"),
    //     },
    //     {
    //       text: this.$t("uc.regist.emailregist"),
    //     },
    //   ];

    //   if (this.changeActive == 0) {
    //     this.key = this.$t("uc.regist.telno");
    //   } else {
    //     this.key = this.$t("uc.regist.email");
    //   }
    // },
    init() {
      this.$store.state.HeaderActiveName = "0";
      this.getAuto();
    },
    handlerSetCode() {
      if (this.changeActive == 0) {
        // 手機發送驗證碼
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var params = {};
        params["phone"] = this.formInline.user;
        params["country"] = this.country;
        if (!params["phone"]) {
          return;
        }
        if (reg.test(params["phone"])) {
          this.$http
            .post(this.host + this.api.login.setPhoneCode, params)
            .then((response) => {
              var resp = response.body;
              resp.code == 0 &&
                this.$Notice.success({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
              resp.code == 0 && this.settime();
              resp.code != 0 &&
                this.$Notice.error({
                  title: this.$t("common.tip"),
                  desc: resp.message,
                });
            });
        } else {
          this.$Notice.error({
            title: this.$t("uc.finance.regist.telerr"),
            desc: resp.message,
          });
        }
      } else {
        // 郵箱發送驗證碼
        var params = {};
        params["email"] = this.formInline.user;
        if (!params["email"]) {
          return;
        }
        this.$http
          .post(this.host + "/uc/reg/email/code", params)
          .then((response) => {
            var resp = response.body;
            resp.code == 0 &&
              this.$Notice.success({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            resp.code == 0 && this.settime();
            resp.code != 0 &&
              this.$Notice.error({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
          });
      }
    },
    actives(index) {
      this.changeActive = index;
      if (this.changeActive == 0) {
        this.showCode = true;
        this.key = this.$t("uc.regist.telno");
        this.ruleInline.code = [
          {
            required: true,
            message: this.$t("uc.regist.smscodetip"),
            trigger: "blur",
          },
        ];
      } else {
        this.showCode = false;
        this.key = this.$t("uc.regist.email");
        this.ruleInline.code = [];
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.agree == true) {
            // 郵箱註冊
            if (this.changeActive == 1) {
              this.registing = true;
              var params = {};
              params["email"] = this.formInline.user;
              params["username"] =
                this.formInline.username + this.formInline.user;
              params["password"] = this.formInline.password;
              params["promotion"] = this.formInline.promotion; // 邀请码
              params["country"] = this.country; //"中国";
              params["superPartner"] = ""; //this.formInline.superType;
              params["code"] = this.formInline.code;
              params["visitCode"] = this.formInline.visitPassword;

              this.$http
                .post(this.host + "/uc/register/email", params, {
                  timeout: 400000,
                })
                .then((response) => {
                  this.registing = false;
                  var resp = response.body;
                  if (resp.code == 0) {
                    if (
                      this.formInline.superType == "1" ||
                      this.formInline.superType == "2"
                    ) {
                      this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: this.$t("new.register.successfully"),
                      });
                      var that = this;
                      setTimeout(() => {
                        that.$router.push("/");
                      }, 3000);
                    } else {
                      this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: resp.message,
                      });
                      var that = this;
                      setTimeout(() => {
                        that.$router.push("/login");
                      }, 3000);
                    }
                  } else {
                    this.$Notice.error({
                      title: this.$t("common.tip"),
                      desc: resp.message,
                    });
                  }
                });
            } else {
              this.registing = true;
              var params = {};
              params["phone"] = this.formInline.user;
              params["username"] =
                this.formInline.username + this.formInline.user;
              params["password"] = this.formInline.password;
              params["promotion"] = this.formInline.promotion; // 邀请码
              params["code"] = this.formInline.code;
              params["country"] = this.country; //"中国";
              params["superPartner"] = ""; //this.formInline.superType;
              params["ticket"] = this.ticket;
              params["randStr"] = this.randStr;

              this.$http
                .post(this.host + "/uc/register/phone", params)
                .then((response) => {
                  this.registing = false;
                  var resp = response.body;
                  if (resp.code == 0) {
                    if (
                      this.formInline.superType == "1" ||
                      this.formInline.superType == "2"
                    ) {
                      this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: "Success!",
                      });
                      var that = this;
                      setTimeout(() => {
                        that.$router.push("/");
                      }, 3000);
                    } else {
                      this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: resp.message,
                      });
                      var that = this;
                      setTimeout(() => {
                        that.$router.push("/login");
                      }, 3000);
                    }
                  } else {
                    this.$Notice.error({
                      title: this.$t("common.tip"),
                      desc: resp.message,
                    });
                  }
                });
            }
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: this.$t("uc.regist.agreementtip"),
            });
          }
        }
      });
    },
    settime() {
      this.sendcodeValue =
        this.$t("uc.regist.resendcode") + this.countdown + ")";
      this.codedisabled = true;
      var _this = this;
      let timercode = setInterval(() => {
        _this.countdown--;
        _this.sendcodeValue =
          _this.$t("uc.regist.resendcode") + _this.countdown + ")";
        if (this.countdown <= 0) {
          clearInterval(timercode);
          _this.codedisabled = false;
          _this.sendcodeValue = _this.$t("uc.regist.sendcode");
          _this.countdown = 60;
        }
      }, 1000);
    },
    handlePassword() {
      // 切换密码的显示状态
      this.showPassword = !this.showPassword;
    },
    // 判断权限
    getAuto() {
      this.$http
        .post(this.host + this.api.login.configQuery, {})
        .then((res) => {
          this.v_auto = res.body.data[0];
          this.v_auto.forEach((item) => {
            if (item.alia == "reg_mobile") {
              this.openphone = item.val;
            }
            if (item.alia == "reg_email") {
              this.openemail = item.val;
              if (this.openemail == 1) {
                this.changeActive = 1;
              } else {
                this.changeActive = 0;
              }
            }
          });
        });
    },
  },
};
</script>
<style lang="less">
.login_form {
  .login_right {
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      text-align: center;
      .check-agree {
        .ivu-checkbox-wrapper {
          .ivu-checkbox-input {
            &:focus {
              border: none;
              outline: none;
              -moz-box-shadow: 2px 2px 5px transparent,
                -2px -2px 4px transparent;
              -webkit-box-shadow: 2px 2px 5px transparent,
                -2px -2px 4px transparent;
              box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
            }
          }
        }
        .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked {
          .ivu-checkbox.ivu-checkbox-checked {
            .ivu-checkbox-inner {
              border: 1px solid #03C59E;
              background-color: #03C59E;
            }
          }
        }
        .ivu-checkbox-wrapper.ivu-checkbox-default {
          .ivu-checkbox {
            .ivu-checkbox-inner {
              background: transparent;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  padding-right: 20px;
}
.ivu-select-arrow {
  right: 4px;
}
.ivu-input {
  font-size: 14px;
  background: #f7f7fb;
  border-radius: 0;
}
.ivu-input-default {
  font-size: 14px;
  background: #f7f7fb;
  border-radius: 0;
}
.ivu-form-item-error .ivu-input-group-append,
.ivu-form-item-error .ivu-input-group-prepend,
.ivu-input-group-append,
.ivu-input-group-prepend {
  background-color: #ffffff;
  border-bottom: 1px solid #ffffff;
  border-top: none;
  border-left: none;
  border-right: none;
}

.ivu-select-item span:first-child {
  display: inline-block;
  width: 30px;
  text-align: left;
}
.ivu-btn-group > .ivu-btn.ivu-btn-default {
  background: transparent !important;
  color: #828ea1;
}
/* .ivu-btn-group > .ivu-btn.active,
.ivu-btn-group > .ivu-btn:active,
.ivu-btn-group > .ivu-btn:hover {
  border-color: transparent !important;
  color: #03C59E !important;
} */
.ivu-btn-group > .ivu-btn:focus {
  box-shadow: none !important;
}
.ivu-btn-group > .ivu-btn {
  font-size: 16px;
}
.ivu-input-group-append,
.ivu-input-group-prepend {
  padding: 0 0 !important;
}
</style>
<style scoped lang="less">
.content {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  .login_left {
    text-align: center;
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    background-color: #e0effa;
    height: 100%;
  }
}
.login_form {
  // width: 55%;
  // height: 760px;
  justify-content: center;
  align-items: center;
  flex: 1 1 0%;
  display: flex;
  .login_right {
    width: 520px;
    padding: 48px 60px 40px 60px;
    .tel-title {
      color: #fff;
    }
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .ivu-form-item {
        .ivu-form-item-content {
          .register_btn.ivu-btn {
            width: 100%;
            outline: none;
            color: #fff;
            background-color: #03C59E;
            height: 48px;
            border-radius: 5px;
            font-size: 18px;
            margin-top: 20px;
            &:focus {
              -moz-box-shadow: 2px 2px 5px transparent,
                -2px -2px 4px transparent;
              -webkit-box-shadow: 2px 2px 5px transparent,
                -2px -2px 4px transparent;
              box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
            }
          }
          .ivu-input-wrapper.ivu-input-type {
            .ivu-input {
              border: 1px solid red;
            }
          }
          #sendCode {
            position: absolute;
            border: 1px solid #03C59E;
            background: #fff;
            top: 1px;
            outline: none;
            right: 0;
            width: 30%;
            color: #03C59E;
            height: 32px;
            line-height: 30px;
            cursor: pointer;
          }
        }
      }
      .check-agree {
        color: #979797;
        display: inline-block;
        line-height: 30px;
        font-size: 12px;
        cursor: default;
        a {
          color: #03C59E;
          margin-left: -10px;
        }
        .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked {
          .ivu-checkbox.ivu-checkbox-checked {
            .ivu-checkbox-inner {
              border: 1px solid #03C59E;
              background-color: #03C59E;
            }
          }
        }
      }
    }
  }
}

.login_title {
  text-align: center;
  height: 80px;
  font-size: 25px;
}

#captcha {
  width: 100%;
  display: inline-block;
}
.show {
  display: block;
}
.hide {
  display: none;
}
#notice {
  color: #F6465D;
}
#wait {
  text-align: left;
  color: #666;
  margin: 0;
}
.tel-title {
  font-size: 25px;
}
.login_left {
  display: none;
}
.input_icon {
  position: relative;
}
.icon {
  position: absolute;
  top: 5px;
  right: 10px;
}
.select_two {
  display: flex;
  height: 32px;
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 20px;
}
.select_left {
  height: 30px;
  background-color: #fff;
  width: 100px;
}
.select_left_option{
  width: 200px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login_right .ivu-select-dropdown {
  background: #fff;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}
</style>
