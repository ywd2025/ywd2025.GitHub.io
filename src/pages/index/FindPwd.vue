<template>
  <div class="content" style="height: calc(100vh - 90px)">
    <div class="login_left">
      <div style="line-height: 44px; font-weight: 700; font-size: 38px">
        {{ $t("new.login.welcome") }}
      </div>
      <div style="font-size: 18px; font-weight: 500; margin-top: 14px">
        {{ $t("new.register.registerAd3") }}
      </div>
      <img :src="$imgUrl + '/index/login_img.png'" alt="" />
    </div>

    <div class="login_form">
      <div class="login_right">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem style="text-align:center;">
            <ButtonGroup>
              <Button
                style="color: #9b9b9b;"
                v-for="(list, index) in buttonLists"
                :key="list.text"
                :class="{ active: changeActive == index }"
                @click="handleClick(index)"
                >{{ list.text }}</Button
              >
            </ButtonGroup>
          </FormItem>
          <FormItem prop="user">
            <!-- 手機註冊 -->
            <Input
              v-model="formInline.user"
              :placeholder="$t('new.register.phone')"
              v-if="changeActive == 0"
            >
              <Select
                v-model="country"
                slot="prepend"
                style="width: 120px; background-color: #f7f7fb"
              >
                <Option
                  v-for="item in countryList"
                  :value="item.zhName"
                  :key="item.zhName"
                  :label="`+${item.areaCode}`"
                >
                  <img :src="item.image" alt="" />
                  <span style="float: left; color: #1c1c1c">{{
                    item.enName
                  }}</span>
                  <span style="float: right; color: #99a1a8">{{
                    item.areaCode
                  }}</span>
                </Option>
              </Select>
            </Input>
            <!-- 邮箱注册 -->
            <Input
              type="text"
              v-model="formInline.user"
              :placeholder="$t('uc.login.usertip')"
              v-if="changeActive == 1"
            >
            </Input>
          </FormItem>

          <FormItem prop="password" class="password">
            <Input
              :type="showPassword ? 'text' : 'password'"
              v-model="formInline.password"
              :placeholder="$t('uc.forget.newpwd')"
            >
            </Input>
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

          <FormItem prop="repassword" class="password">
            <Input
              :type="showPassword1 ? 'text' : 'password'"
              v-model="formInline.repassword"
              :placeholder="$t('uc.forget.confirmpwd')"
            >
            </Input>
            <Icon
              v-if="showPassword1"
              type="ios-eye-outline"
              @click="handlePassword1"
              size="22"
              class="icon"
            />
            <Icon
              v-else
              @click="handlePassword1"
              type="ios-eye-off-outline"
              size="22"
              class="icon"
            />
          </FormItem>

          <FormItem>
            <Button class="login_btn" @click="handleSubmit('formInline')">{{
              $t("follow.universal.submit")
            }}</Button>
          </FormItem>
        </Form>
      </div>
      <Modal v-model="modal1" :mask-closable="false">
        <p slot="header" style="text-align: center">
          {{ $t("uc.regist.modaltitle") }}
        </p>
        <div style="text-align: center">
          <div>
            <div id="captcha">
              <p id="wait" class="show">
                {{ $t("uc.login.validatecodeload") }}......
              </p>
            </div>
          </div>
          <p id="notice" class="hide">{{ $t("uc.login.validatemsg") }}</p>
        </div>
        <p slot="footer"></p>
      </Modal>
    </div>
  </div>
</template>
<script>
const mobilereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
  emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
import gtInit from "../../assets/js/gt.js";
import $ from "jquery";
export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (this.changeActive == 0) {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (value == "") {
          callback(new Error(this.$t("uc.regist.teltip")));
        } else if (!reg.test(this.formInline.user)) {
          callback(new Error(this.$t("uc.regist.telerr")));
        } else {
          callback();
        }
      } else {
        var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if (value == "") {
          callback(new Error(this.$t("uc.regist.emailtip")));
        } else if (!reg.test(this.formInline.user)) {
          callback(new Error(this.$t("uc.regist.emailerr")));
        } else {
          callback();
        }
      }
    };
    const validateRepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.forget.pwdvalidate1")));
      } else if (value !== this.formInline.password) {
        callback(new Error(this.$t("uc.forget.pwdvalidate2")));
      } else {
        callback();
      }
    };
    return {
      // 國際區號
      countryList: [],
      country: "中国",
      changeActive: 1,
      buttonLists: [
        {
          text: this.$t("uc.forget.resettelpwd"),
        },
        {
          text: this.$t("uc.forget.resetemailpwd"),
        },
      ],

      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      captchaObj: null,
      modal1: false,
      _captchaResult: null,
      countdown: 60,
      formInline: {
        user: "",
        code: "",
        password: "",
        repassword: "",
      },
      showPassword: false,
      showPassword1: false,
      ruleInline: {
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
            message: this.$t("uc.forget.newpwdtip"),
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: this.$t("uc.forget.pwdvalidate3"),
            trigger: "blur",
          },
        ],
        repassword: [
          { validator: validateRepassword, trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: this.$t("uc.forget.pwdvalidate3"),
            trigger: "blur",
          },
        ],
      },
      key: "",
      code: "",
    };
  },
  watch: {
    changeActive: function(val) {
      this.$refs["formInline"].resetFields();
    },
  },
  created: function() {
    // 獲取國際區號
    this.getCountryCode();
    this.init();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 切換註冊方式
    handleClick(index) {
      (this.showPassword = false),
        (this.showPassword1 = false),
        (this.changeActive = index);
    },
    // 獲取國際區號
    getCountryCode() {
      this.$http
        .post(this.host + this.api.login.getCountry, {})
        .then((response) => {
          var res = response.body;
          this.countryList = res.data;
        });
    },

    init() {
      if (this.isLogin) {
        this.$router.push("/");
      } else {
        this.$store.state.HeaderActiveName = "1-4";
      }
    },
    handlerSetCode() {
      this.modal1 = false;
      var params = {};
      params["account"] = this.formInline.user;
      if (this.changeActive == 1) {
        this.$http
          .post(this.host + "/uc/reset/email/code", params, {
            noHeader: true,
          })
          .then((response) => {
            this.countdown = 60;
            var resp = response.body;
            if (resp.code == 0) {
              this.settime();
              this.$Notice.success({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            } else {
              this.$Notice.error({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            }
          });
      } else {
        this.$http
          .post(this.host + "/uc/mobile/reset/code", params)
          .then((response) => {
            var resp = response.body;
            if (resp.code == 0) {
              this.settime();
              this.$Notice.success({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            } else {
              this.$Notice.error({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            }
          });
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.changeActive == 1) {
            var params = {};
            params["account"] = this.formInline.user;
            params["code"] = this.formInline.code;
            params["mode"] = 1;
            params["password"] = this.formInline.password;
            this.$http
              .post(this.host + "/uc/reset/login/password", params)
              .then((response) => {
                this.countdown = 60;
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                  this.$router.push("/login");
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                }
              });
          } else {
            var params = {};
            params["account"] = this.formInline.user;
            params["code"] = this.formInline.code;
            params["mode"] = 0;
            params["password"] = this.formInline.password;
            this.$http
              .post(this.host + "/uc/reset/login/password", params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Notice.success({
                    title: this.$t("common.tip"),
                    desc: this.$t("carouselItem.text118"),
                  });
                  this.$router.push("/login");
                } else {
                  this.$Notice.error({
                    title: this.$t("common.tip"),
                    desc: resp.message,
                  });
                }
              });
          }
        } else {
        }
      });
    },
    settime() {
      this.sendcodeValue = this.countdown;
      this.codedisabled = true;
      let timercode = setInterval(() => {
        this.countdown--;
        this.sendcodeValue = this.countdown;
        if (this.countdown <= 0) {
          clearInterval(timercode);
          this.codedisabled = false;
          this.sendcodeValue = this.$t("uc.regist.sendcode");
          this.countdown = 60;
        }
      }, 1000);
    },
    handlePassword() {
      // 切换密码的显示状态
      this.showPassword = !this.showPassword;
    },
    handlePassword1() {
      // 切换密码的显示状态
      this.showPassword1 = !this.showPassword1;
    },
  },
};
</script>
<style lang="less">
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  padding-right: 10px;
  padding-left: 3px;
}
.ivu-select-single .ivu-select-selection .ivu-select-arrow {
  right: 2px;
}

.ivu-form-item-error .ivu-input-group-append,
.ivu-form-item-error .ivu-input-group-prepend {
  background-color: #17212e;
  border-color: transparent;
}
.ivu-form-item-error .ivu-select-arrow {
  color: #808695;
}
.ivu-btn-group > .ivu-btn.active,
.ivu-btn-group > .ivu-btn:active {
  // border-color: transparent !important;
  color: #03C59E !important;
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

.ivu-select-item span:first-child {
  display: inline-block;
  width: 30px;
  text-align: left;
}
</style>
<style scoped lang="less">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  .login_left {
    text-align: center;
    width: 520px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 80px;
  }
}
/* 验证码 */
.login_form {
  overflow: hidden;
  width: 520px;
  padding: 48px 60px 40px 60px;
  .login_right {
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .login_title {
        height: 70px;
        text-align: left;
      }
      .ivu-form-item {
        .ivu-form-item-content {
          .login_btn.ivu-btn {
            width: 100%;
            height: 48px;
            outline: none;
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
            background-color: #03C59E;
            &:focus {
              -moz-box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
              -webkit-box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
              box-shadow: 0px 0px 0px #fff, 0px 0px 0px #fff;
            }
          }
        }
      }
    }
  }
  .to_register {
    overflow: hidden;
    font-size: 12px;
    span {
      float: left;
    }
    a {
      float: right;
    }
  }
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
.geetest_wait_dot geetest_dot_1 {
  color: #F6465D;
}
.user .ivu-btn,
.ivu-btn:focus {
  // border-color: #d7dde4;
  box-shadow: none;
}
.input_icon {
  position: relative;
}
.icon {
  position: absolute;
  top: 5px;
  right: 10px;
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
.icon {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>
