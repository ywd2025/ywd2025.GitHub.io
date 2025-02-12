<template>
  <div class="content" style="height: calc(100vh - 90px)">
    <div class="login_left">
      <div style="line-height: 44px; font-weight: 700; font-size: 38px">
        {{ $t("new.login.welcome") }}
      </div>
      <div style="font-size: 18px; font-weight: 500; margin-top: 14px">
        {{ $t("new.login.loginAd") }}
        <span style="color: #03C59E">{{ $t("new.login.trader") }}</span
        >!
      </div>
      <img :src="$imgUrl + '/index/login_img.png'" alt="" />  
    </div>
    <div class="login_form">
      <div class="login_right">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="login_title">{{ $t("uc.login.login") }}</div>
          <FormItem prop="user">
            <Input
              name="user"
              type="text"
              v-model="formInline.user"
              :placeholder="$t('carouselItem.text263')"
              class="user"
            >
            </Input>
          </FormItem>
          <FormItem prop="password" class="password">
            <Input
            class="input_icon"
              v-model="formInline.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('uc.login.pwdtip')"
              @on-keyup="onKeyup"
            />
            <Icon v-if="showPassword" type="ios-eye-outline" @click="handlePassword" size="22" class="icon" />
            <Icon v-else @click="handlePassword" type="ios-eye-off-outline" size="22" class="icon" />
          </FormItem>
          <p id="notice" class="hide">{{ $t("uc.login.validatemsg") }}</p>
          <p style="height: 30px">
            <router-link to="/findPwd" style="color:#979797;float:right;padding-right:10px;font-size:12px;">
              {{ $t('uc.login.forget') }}
            </router-link>
          </p>
          <FormItem style="margin-bottom: 15px">
            <Button
              type="success"
              class="login_btn"
              @click="handleLogin('formInline')"
              >{{ $t("uc.login.login") }}</Button
            >
          </FormItem>
          <div class="to_register">
            <span>{{ $t("uc.login.noaccount") }}</span>
            <router-link to="/register">{{
              $t("uc.login.goregister")
            }}</router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import gtInit from "../../assets/js/gt.js";
import $ from "jquery";
export default {
  data() {
    return {
      country: "+86",
      captchaObj: null,
      _captchaResult: null,
      formInline: {
        user: "",
        password: "",
        equipment: "PC",
      },
      showPassword: false,
      ruleInline: {
        user: [
          {
            required: true,
            message: this.$t("uc.login.loginvalidate"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("uc.login.pwdvalidate1"),
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: this.$t("uc.login.pwdvalidate2"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  created: function () {
    this.init();
    // 更新汇率
    this.$store.dispatch("getAllRateActions");
  },
  computed: {
    isLogin: function () {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 登录
    handleLogin(name) {
      // 不带验证
      this.$refs[name].validate((valid) => {
        if (valid) {
          var params = {};
          params["username"] = this.formInline.user;
          params["password"] = this.formInline.password;
          params["equipment"] = this.formInline.equipment;
          this.$http
            .post(this.host + this.api.login.login, params)
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(this.$t("uc.login.success"));
                this.$store.commit("setMember", response.body.data);
                if (
                  this.$route.query.key != null &&
                  this.$route.query.key != ""
                ) {
                  localStorage.setItem("USERKEY", this.$route.query.key);
                }
                localStorage.setItem("TOKEN", response.body.data.token);
                localStorage.setItem('salt', response.body.data.salt)
                this.$router.push("/index");
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
        }
      });
      /* 带验证*/
      // var result = this._captchaResult
      // if (!result) {
      //   $('#notice').show()
      //   setTimeout(function() {
      //     $('#notice').hide()
      //   }, 2000)
      // } else {
      //   this.$refs[name].validate(valid => {
      //     if (valid) {
      //       var params = {}
      //       params['username'] = this.formInline.user
      //       params['password'] = this.formInline.password
      //       this.$http.post(this.host + this.api.uc.login, params).then(response => {
      //         var resp = response.body
      //         if (resp.code == 0) {
      //           this.$Message.success(this.$t('uc.login.success'))
      //           this.$store.commit('setMember', response.body.data)
      //           if (this.$route.query.key != null && this.$route.query.key != '') {
      //             localStorage.setItem('USERKEY', this.$route.query.key)
      //           }
      //           this.$router.push('/uc/safe')
      //         } else {
      //           this.$Message.error(resp.message)
      //         }
      //       })
      //     } else {
      //     }
      //   })
      // }
    },

    init() {
      this.$store.state.HeaderActiveName = "0";
    },
    onKeyup(ev) {
      if (ev.keyCode == 13) {
        this.handleLogin();
      }
    },
    handlePassword() {  
      // 切换密码的显示状态  
      this.showPassword = !this.showPassword;  
    },
    // initGtCaptcha() {
    // var that = this
    // this.$http.get(this.host + this.api.uc.captcha).then(function(res) {
    //   window.initGeetest(
    //     {
    //       // 以下配置参数来自服务端 SDK
    //       gt: res.body.gt,
    //       challenge: res.body.challenge,
    //       offline: !res.body.success, //表示用户后台检测极验服务器是否宕机
    //       new_captcha: res.body.new_captcha, //用于宕机时表示是新验证码的宕机
    //       product: 'bind',
    //       width: '100%',
    //     },
    //     this.handler
    //   )
    // })
    // },
    // handler(captchaObj) {
    //   captchaObj
    //     .onReady(() => {
    //       $('#wait').hide()
    //     })
    //     .onSuccess(() => {
    //       let result = (this._captchaResult = captchaObj.getValidate())
    //       if (!result) {
    //         this.$Message.error('请完成验证')
    //       } else {
    //         this.handleSubmit('formInline')
    //       }
    //     })
    //   $('.login_btn').click(() => {
    // let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    // tel = this.formInline.user,
    //     let flagtel = this.formInline.user.length >= 4 ? true : false,
    //     flagpass = this.formInline.password.length >= 6 ? true : false
    //     flagtel && flagpass // && captchaObj.verify();
    //     ;(!flagtel || !flagpass) && this.$Message.error(this.$t('common.fillComplete'))
    //     this.handleSubmit('formInline') // 屏蔽了验证
    //   })
    // },
    logout() {
      this.$http.post(this.host + "/uc/logout", {}).then((response) => {
        var resp = response.body;
        if (resp.code == 0) {
          localStorage.setItem("MEMBER", JSON.stringify(null));
          localStorage.setItem("TOKEN", null);
          localStorage.removeItem("USERKEY", null);
        } else {
        }
      });
    },
    handleSubmit(name) {
      // 不带验证
      this.$refs[name].validate((valid) => {
        if (valid) {
          var params = {};
          params["username"] = this.formInline.user;
          params["password"] = this.formInline.password;
          params["equipment"] = this.formInline.equipment;
          this.$http
            .post(this.host + this.api.uc.login, params)
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(this.$t("uc.login.success"));
                this.$store.commit("setMember", response.body.data);
                if (
                  this.$route.query.key != null &&
                  this.$route.query.key != ""
                ) {
                  localStorage.setItem("USERKEY", this.$route.query.key);
                }
                this.$router.push("/uc/safe");
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
        }
      });
      /* 带验证*/
      var result = this._captchaResult;
      if (!result) {
        $("#notice").show();
        setTimeout(function () {
          $("#notice").hide();
        }, 2000);
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            var params = {};
            params["username"] = this.formInline.user;
            params["password"] = this.formInline.password;
            params["equipment"] = this.formInline.equipment;
            this.$http
              .post(this.host + this.api.uc.login, params)
              .then((response) => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(this.$t("uc.login.success"));
                  this.$store.commit("setMember", response.body.data);
                  if (
                    this.$route.query.key != null &&
                    this.$route.query.key != ""
                  ) {
                    localStorage.setItem("USERKEY", this.$route.query.key);
                  }
                  this.$router.push("/uc/safe");
                } else {
                  this.$Message.error(resp.message);
                }
              });
          } else {
          }
        });
      }
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
            outline: none;
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
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
.ivu-btn:active,
.ivu-btn:focus {
  border-color: #d7dde4;
  box-shadow: none;
}
.input_icon{
  position: relative;
}
.icon{
  position: absolute;
  top: 5px;
  right: 10px;
}
/*  */
.login_right .ivu-select-dropdown {
  background: #fff;
}

.ivu-form-inline .ivu-form-item {
  display: block;
  margin-right: 0;
}
</style>