<template>
  <div class="user_content">
    <div class="main_content">
      <section class="title_content">
        <div class="header_part">
          <Upload
            :headers="{ 'access-auth-token': token, equipment: 'PC' }"
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg', 'png', 'gif']"
            type="drag"
            :action="action"
            style="
              display: inline-block;
              width: 56px;
              height: 56px;
              border: none;
            "
          >
            <div class="changeHeader">
              <span class="changeHeader_txt">{{
                $t("carouselItem.text171")
              }}</span>
            </div>
            <img
              v-if="userInfo.avatar"
              class="title_header"
              :src="userInfo.avatar"
              alt=""
            />
            <img
              v-else
              class="title_header"
              :src="$imgUrl + '/my.png'"  
              alt=""
            />
          </Upload>
        </div>
        <div>
          <p class="title_main">
            <strong class="title_user_account">{{ userInfo.username }}</strong>
            <span class="title_user_id">UID: {{ userInfo.id }}</span>
            <!-- <span class="title_user_id vip">費率等級: VIP 0</span>
						<span href="" target="_blank" class="title_user_tips">費率說明</span> -->
          </p>
          <p class="title_other">
            <!-- <span >最后登錄時間: 10:24:42 2023-09-28</span>
						<span class="title_ip">IP: 3.113.250.49</span> -->
            <span class="title_user_tips" @click="changeNickNameModal = true">{{
              $t("carouselItem.text172")
            }}</span>
          </p>
        </div>
      </section>

      <section class="verify_content another">
        <div class="">
          <h2 class="text-lg text-t1">{{ $t("new.user.authentication") }}</h2>
          <p class="mt-2 text-xs text-t2">
            {{ $t("new.user.authenticationTip1") }}
          </p>
        </div>
        <div class="verify_tips">
          <!-- 0待审核1审核失败2审核成功 -->
          <span>{{ $t("new.user.authenticationTip2") }}</span>
          <Button
            type="primary"
            v-if="userVerifyStatus == null"
            @click="handleRealModal"
            >{{ $t("new.user.deCertification") }}</Button
          >
          <Button
            type="primary"
            v-if="userVerifyStatus == 0"
            :disabled="true"
            >{{ $t("new.user.certification") }}</Button
          >
          <Button
            type="primary"
            v-if="userVerifyStatus == 1"
            @click="handleRealModal"
            >{{ $t("new.user.certificationFailed") }}</Button
          >
          <Button
            type="primary"
            v-if="userVerifyStatus == 2"
            :disabled="true"
            >{{ $t("new.user.certified") }}</Button
          >
        </div>
      </section>

      <section class="verify_content acitves">
        <h2>{{ $t("new.user.twoAuthentication") }}</h2>
        <List class="list">
          <ListItem>
            <ListItemMeta
              :title="grade"
              :description="$t('carouselItem.text174')"
            />
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('uc.safe.email')"
              :description="$t('new.user.authenticationTip3')"
            />
            <template slot="action">
              <li>{{ userInfo.email }}</li>
              <!-- <li>
                <Button type="text">{{ $t("carouselItem.text169") }}</Button>
              </li> -->
              <li>
                <Button
                  v-if="userInfo.email"
                  type="text"
                  @click="changeEmile(userInfo.email, 'newEmail1')"
                  >{{ $t("carouselItem.text170") }}</Button
                >
                <Button
                  v-else
                  type="text"
                  @click="changeEmile(userInfo.email, 'newEmail0')"
                  >{{ $t("uc.safe.bind") }}</Button
                >
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('uc.safe.phone')"
              :description="$t('new.user.authenticationTip3')"
            />
            <template slot="action">
              <li>{{ userInfo.mobilePhone }}</li>
              <li>
                <Button
                  v-if="userInfo.mobilePhone"
                  type="text"
                  @click="changePhone(userInfo.mobilePhone, 'newMobile1')"
                  >{{ $t("carouselItem.text250") }}</Button
                >
                <Button
                  v-else
                  type="text"
                  @click="changePhone(userInfo.mobilePhone, 'newMobile0')"
                  >{{ $t("uc.safe.bind") }}</Button
                >
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('new.user.googleValidator')"
              :description="$t('new.user.authenticationTip3')"
            />
            <template slot="action">
              <li>
                <i-switch
                  size="large"
                  v-model="userInfo.googleFlag"
                  @on-change="changeGoogleStatus"
                  :true-value="1"
                  :false-value="0"
                  v-if="userInfo.googleState != '0'"
                >
                  <span slot="open">{{ $t("otc.publishad.open") }}</span>
                  <span slot="close">{{ $t("otc.publishad.close") }}</span>
                </i-switch>
                <Button
                  v-if="userInfo.googleState == '0'"
                  type="text"
                  @click="handleGoogle"
                  >{{ $t("new.user.bindingValidator") }}</Button
                >
                <Button
                  v-if="userInfo.googleState != '0'"
                  type="text"
                  @click="handleGoogle"
                  >{{ $t("carouselItem.text267") }}</Button
                >
              </li>
            </template>
          </ListItem>
        </List>
      </section>

      <section class="verify_content acitves">
        <h2>{{ $t("new.user.securityManagement") }}</h2>
        <List class="list">
          <ListItem>
            <ListItemMeta
              :title="$t('new.user.loginPassword')"
              :description="$t('new.user.keepAccountSafe')"
            />
            <template slot="action">
              <li>
                <Button type="text" @click="handleChangePW">{{
                  $t("new.user.modify")
                }}</Button>
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('new.user.pricingMethod')"
              :description="$t('new.user.authenticationTip4')"
            />
            <template slot="action">
              <li>
                <Dropdown @on-click="handlePricing">
                  <a href="javascript:void(0)">
                    {{ pricingStatus }}
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="CNY">CNY</DropdownItem>
                    <DropdownItem name="TRY">TRY</DropdownItem>
                    <DropdownItem name="VND">VND</DropdownItem>
                    <DropdownItem name="JPY">JPY</DropdownItem>
                    <DropdownItem name="RUB">RUB</DropdownItem>
                    <DropdownItem name="UAH">UAH</DropdownItem>
                    <DropdownItem name="EUR">EUR</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('carouselItem.text241')"
              :description="$t('carouselItem.text242')"
            />
            <template slot="action">
              <li>
                <Button type="text" @click="go_page()">{{
                  $t("new.user.modify")
                }}</Button>
              </li>
            </template>
          </ListItem>
          <ListItem>
            <ListItemMeta
              :title="$t('dolphin.text84')"
              :description="$t('dolphin.text85')"
            />
            <template slot="action">
              <li>
                <Button type="text" @click="go_page('apiManage')">{{
                  $t("dolphin.text86")
                }}</Button>
              </li>
            </template>
          </ListItem>
        </List>
      </section>
    </div>

    <FooterPart></FooterPart>

    <!-- 實名認證 -->
    <Modal
      v-model="realModal"
      :title="$t('new.user.realNameAuthentication')"
      :footer-hide="true"
      width="800"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="120"
      >
        <FormItem :label="$t('new.user.country')" prop="country">
          <Select
            v-model="formValidate.country"
            :placeholder="$t('new.user.inputCountry')"
          >
            <Option
              :value="item.enName"
              v-for="item in countryList"
              :key="item.areaCode"
            >
              {{ langtrue == "0" ? item.zhName : item.enName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem :label="$t('new.user.lastName')" prop="firstName">
          <Input
            v-model="formValidate.firstName"
            :placeholder="$t('new.user.inputLastName')"
          ></Input>
        </FormItem>
        <FormItem :label="$t('new.user.Name')" prop="lastName">
          <Input
            v-model="formValidate.lastName"
            :placeholder="$t('new.user.inputFirstName')"
          ></Input>
        </FormItem>
        <FormItem :label="$t('new.user.documentTypes')">
          <RadioGroup v-model="formValidate.certiTyp">
            <Radio label="1">{{ $t("new.user.IDCard") }}</Radio>
            <Radio label="2">{{ $t("new.user.drivingLicense") }}</Radio>
            <Radio label="3">{{ $t("new.user.passport") }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="$t('new.user.IDFrontPic')" prop="idCardFront">
          <picUpload
            :picUrl="idCardFront"
            @getPicUrl="getPicUrlFront"
            :action="action"
          ></picUpload>
        </FormItem>
        <FormItem :label="$t('new.user.IDBackPic')" prop="idCardBack">
          <picUpload
            :picUrl="idCardBack"
            @getPicUrl="getPicUrlBack"
            :action="action"
          ></picUpload>
        </FormItem>
        <FormItem :label="$t('new.user.IDNumber')" prop="handHeldIdCard">
          <picUpload
            :picUrl="handHeldIdCard"
            @getPicUrl="getPicUrlHeldIdCard"
            :action="action"
          ></picUpload>
        </FormItem>
        <FormItem :label="$t('new.user.inputIDNumber')" prop="idCard">
          <Input
            v-model="formValidate.idCard"
            :placeholder="$t('new.user.inputIDNumber')"
          ></Input>
        </FormItem>
        <FormItem :label="$t('new.user.birthDate')" prop="birth">
          <DatePicker
            type="date"
            :placeholder="$t('new.user.inputBirthDate')"
            @on-change="handleBirth"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">{{
            $t("new.universal.submit")
          }}</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- 綁定google -->
    <Modal v-model="googleVerifyModal" :footer-hide="true" width="400">
      <div style="display: flex; flex-direction: column; align-items: center">
        <div style="margin: 20px 0; background-color: #fdc753; padding: 8px">
          <Icon type="md-alert" />{{ $t("new.user.authenticationTip5") }}
        </div>
        <div>
          <h3>{{ $t("new.user.authenticationTip6") }}</h3>
        </div>
        <qriously
          style="margin: 20px 0"
          :value="qrcode.value"
          :size="qrcode.size"
          foreground="#000"
        />
        <div style="display: flex; flex-direction: row; align-items: center">
          {{ $t("new.user.secretKey") }}：
          <Input style="width: 300px" v-model="secretKey" :readonly="true">
            <span slot="append">
              <Icon
                type="md-albums"
                style="cursor: pointer"
                @click="copyLink(secretKey)"
              />
            </span>
          </Input>
        </div>
        <div style="margin: 20px 0">
          {{ $t("new.user.capTCHA") }}：
          <Input
            style="width: 300px"
            v-model="googleCode"
            :placeholder="$t('new.user.inputGoogleCapTCHA')"
          />
        </div>
        <Button type="primary" @click="handleNext">{{
          $t("carouselItem.text81")
        }}</Button>
      </div>
    </Modal>

    <!-- 發送驗證碼 -->
    <Modal v-model="emailVerifyModal" :footer-hide="true" width="400">
      <div
        style="
          padding-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <Form :model="userInfo" :label-width="80">
          <FormItem
            :label="
              userInfo.email
                ? $t('new.user.email')
                : $t('uc.finance.withdraw.telno')
            "
          >
            <Input
              v-if="userInfo.email"
              style="width: 300px"
              v-model="userInfo.email"
              :readonly="true"
            ></Input>
            <Input
              v-else
              style="width: 300px"
              v-model="userInfo.mobilePhone"
              :readonly="true"
            ></Input
          ></FormItem>
          <FormItem :label="$t('new.user.capTCHA')">
            <div class="input_two">
              <Input
                style="width: 300px;"
                type="text"
                v-model="emailCode"
                :placeholder="$t('uc.forget.smscode')"
              ></Input>
              <input
                @click="handlerSetCode()"
                id="sendCode"
                type="Button"
                :value="sendcodeValue"
                :disabled="codedisabled"
                class="code_css"
              />
            </div>
          </FormItem>
        </Form>
        <Button type="primary" @click="handleBind">{{
          $t("new.universal.submit")
        }}</Button>
      </div>
    </Modal>

    <!-- 修改密碼-->
    <Modal v-model="changePWModal" :footer-hide="true" width="400">
      <div
        style="
          padding-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <Form :model="userInfo" :label-width="80">
          <FormItem
            :label="
              userInfo.email
                ? $t('new.user.email')
                : $t('uc.finance.withdraw.telno')
            "
          >
            <Input
              style="width: 300px"
              v-model="userInfo.email"
              :readonly="true"
            ></Input>
          </FormItem>
          <FormItem :label="$t('new.user.capTCHA')">
            <div class="input_two">
              <Input
                type="text"
                v-model="changeFrom.code"
                :placeholder="$t('uc.forget.smscode')"
              ></Input>
              <input
                @click="handlerUpdatePWSetCode()"
                id="sendCode"
                type="Button"
                :value="sendcodeValue"
                :disabled="codedisabled"
                class="code_css"
              />
            </div>
          </FormItem>
          <FormItem
            :label="$t('dolphin.text152')"
            v-if="userInfo.googleFlag == 1"
          >
            <Input
              v-model="googleCode"
              :placeholder="$t('new.user.inputGoogleCapTCHA')"
            />
          </FormItem>
          <FormItem :label="$t('dolphin.text153')">
            <Input
              v-model="changeFrom.oldPassword"
              :placeholder="$t('new.user.inputOldPW')"
            ></Input>
          </FormItem>
          <FormItem :label="$t('dolphin.text154')">
            <Input
              v-model="changeFrom.password"
              :placeholder="$t('new.user.inputNewPW')"
            ></Input>
          </FormItem>
        </Form>
        <Button type="primary" @click="handleUpdate">{{
          $t("new.universal.submit")
        }}</Button>
      </div>
    </Modal>

    <!-- 修改昵称-->
    <Modal v-model="changeNickNameModal" :footer-hide="true" width="400">
      <div
        style="
          padding-top: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <Input
          v-model="nickName"
          :placeholder="$t('carouselItem.text173')"
        ></Input>
        <Button
          style="margin-top: 20px"
          type="primary"
          @click="handleUpdateNickname"
          >{{ $t("new.universal.submit") }}</Button
        >
      </div>
    </Modal>
    <!-- 修改手机号 -->
    <newEmail
      @profiLoss="profiLoss"
      @successprofiLoss="successprofiLoss"
      :changeEmileNumber="changeEmileNumber"
      :EmileNumber="EmileNumber"
      :typeNumber="typeNumber"
    ></newEmail>
  </div>
</template>

<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);
import FooterPart from "../../components/footerPart.vue";
import picUpload from "../../components/picUpload.vue";
import newEmail from "./components/newEmail.vue";
export default {
  components: {
    FooterPart,
    picUpload,
    VueQriously,
    newEmail,
  },
  data() {
    return {
      timercode: null,
      nickName: "", // 修改昵称
      token: localStorage.getItem("TOKEN"),
      // 修改密碼
      changeFrom: {},
      // 二維碼
      qrcode: {
        value: "",
        size: 150,
      },
      // 驗證碼
      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      countdown: 60,
      emailCode: "",
      switch1: false,
      pricingStatus: "",
      // 國家列表
      countryList: [],
      userVerifyStatus: "",
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
      realModal: false,
      googleVerifyModal: false,
      emailVerifyModal: false,
      changePWModal: false,
      changeNickNameModal: false,
      changePhoneNumber: false,
      changeEmileNumber: false,
      // 上傳圖片用
      action: this.imageUrl,
      formValidate: {
        certiTyp: "1",
        country: null,
        firstName: "",
        lastName: "",
        idCardFront: "",
        idCardBack: "",
        handHeldIdCard: "",
        idCard: "",
        birth: "",
      },
      EmileNumber: "",
      typeNumber: "",
      grade: "",
      codeTwo4: false,
      ruleValidate: {
        country: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputCountry"),
            trigger: "blur",
          },
        ],
        firstName: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputLastName"),
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputFirstName"),
            trigger: "blur",
          },
        ],
        idCardFront: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputFacePic"),
            trigger: "blur",
          },
        ],
        idCardBack: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputReversePic"),
            trigger: "blur",
          },
        ],
        handHeldIdCard: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputHandheldPic"),
            trigger: "blur",
          },
        ],
        idCard: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputIDNumber"),
            trigger: "blur",
          },
        ],
        birth: [
          {
            required: true,
            type: "string",
            message: this.$t("new.user.inputBirthday"),
            trigger: "blur",
          },
        ],
      },
      idCardFront: "",
      idCardBack: "",
      handHeldIdCard: "",
      secretKey: "",
      googleCode: "",
    };
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    langtrue() {
      if (this.lang == "zh_cn") {
        return "0";
      } else if (this.lang == "tw_cn") {
        return "0";
      } else {
        return "1";
      }
    },
  },

  mounted() {
    // 读取计价方式
    this.pricingStatus = localStorage.getItem("pricingStatus")
      ? localStorage.getItem("pricingStatus")
      : "TRY";
    this.getReal();
    this.getCountry();
    // 獲取用戶信息
    this.getUserInfo();
  },
  methods: {
    // 修改头像
    handleSuccess(res, file) {
      var params = {};
      params["avatar"] = res.data;
      this.$http
        .post(this.host + this.api.user.updateMember, params)
        .then((res) => {
          if (res.body.code == 0) {
            this.$Message.info(res.data.message);
            this.getUserInfo();
          } else {
            this.$Message.error(this.$t("carouselItem.text249"));
          }
        });
    },
    // 修改昵称
    handleUpdateNickname() {
      var params = {};
      params["username"] = this.nickName;
      this.$http
        .post(this.host + this.api.user.updateMember, params)
        .then((res) => {
          this.$Message.info(res.data.message);
          this.getUserInfo();
          this.changeNickNameModal = false;
        });
    },
    // 保存計價方式
    handlePricing(name) {
      this.pricingStatus = name;
      localStorage.setItem("pricingStatus", name);
      // 更新汇率
      this.$store.dispatch("getAllRateActions");
    },
    // 修改密碼相關
    handleChangePW() {
      this.changePWModal = true;
      this.getnewData();
    },
    // 修改密碼發送郵箱驗證碼
    handlerUpdatePWSetCode() {
      var params = {};
      if (this.codeTwo4) {
        return;
      }
      this.codeTwo4 = true;
      params["account"] = this.userInfo.email;
      this.$http
        .post(this.host + this.api.user.setEmailCode, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.settime();
            this.codeTwo4 = false;
            this.$Notice.success({
              title: this.$t("common.tip"),
              desc: this.$t("new.universal.success"),
            });
          } else {
            this.$Notice.error({
              title: this.$t("common.tip"),
              desc: resp.message,
            });
            this.codeTwo4 = false;
          }
        });
    },
    // 修改密碼提交
    handleUpdate() {
      var params = {};
      params["mode"] = 1;
      params["code"] = this.changeFrom.code;
      params["oldPassword"] = this.changeFrom.oldPassword;
      params["password"] = this.changeFrom.password;
      this.$http
        .post(this.host + this.api.user.updatePassword, params)
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.success(res.data.message);
            this.$store.commit("setMember", null);
            setTimeout(() => {
              location.href = "/";
            }, 1500);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    // 是否開啟谷歌驗證器
    changeGoogleStatus() {
      this.$http
        .post(this.host + this.api.user.updateGoogleFlag, {})
        .then((res) => {
          if (res.data.code == 0) {
            this.$Message.success(res.data.message);
            this.getUserInfo();
          } else {
            this.$Message.error(res.data.message);
            this.getUserInfo();
          }
        });
    },
    // 谷歌驗證相關
    handleGoogle() {
      // this.$Message.info(this.$t("new.user.notEnabled"));
      this.googleVerifyModal = true;
      this.$http.get(this.host + this.api.user.getSecretKey, {}).then((res) => {
        this.secretKey = res.data.data;
        this.qrcode.value =
          "otpauth://totp/" +
          this.userInfo.username +
          "?secret=" +
          this.secretKey;
      });
    },
    handleNext() {
      //验证谷歌验证码是否合法
      this.$http
        .post(this.host + this.api.user.checkValidCode, {
          code: this.googleCode,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.googleVerifyModal = false;
            this.emailVerifyModal = true;
            this.getnewData();
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    //發送郵箱驗證碼
    handlerSetCode() {
      var params = {};
      if (this.codeTwo4) {
        return;
      }
      this.codeTwo4 = true;
      if (this.userInfo.email) {
        params["account"] = this.userInfo.email;
        this.$http
          .post(this.host + this.api.user.googleSetCode, params)
          .then((response) => {
            var resp = response.body;
            resp.code == 0 && this.settime();
            this.codeTwo4 = false;
          });
      } else {
        params["account"] = this.userInfo.mobilePhone;
        this.$http
          .post(this.host + this.api.user.commitCoinValidate, params)
          .then((response) => {
            var resp = response.body;
            resp.code == 0 && this.settime();
            this.codeTwo4 = false;
          });
      }
    },
    // 綁定谷歌驗證器
    handleBind() {
      var params = {};
      if (this.userInfo.email) {
        params["account"] = this.userInfo.email;
        params["code"] = this.emailCode;
        this.$http
          .post(this.host + this.api.user.bindGoogle, params)
          .then((res) => {
            if (res.data.code == 0) {
              this.$Message.success(res.data.message);
              this.emailVerifyModal = false;
              this.getUserInfo();
            } else {
              this.$Message.error(res.data.message);
            }
          });
      } else {
        params["code"] = this.emailCode;
        this.$http
          .post(this.host + this.api.user.phoneOrEmail, params)
          .then((res) => {
            if (res.data.code == 0) {
              this.$Message.success(res.data.message);
              this.emailVerifyModal = false;
              this.getUserInfo();
            } else {
              this.$Message.error(res.data.message);
            }
          });
      }
    },

    // 獲取用戶信息
    getUserInfo() {
      this.$http.post(this.host + this.api.user.userInfo, {}).then((res) => {
        this.userInfo = res.data.data;
        if (
          this.userInfo.email &&
          this.userInfo.mobilePhone &&
          this.userInfo.googleState
        ) {
          this.grade = this.$t("uc.safe.safelevel_high");
        } else if (
          (this.userInfo.email && this.userInfo.mobilePhone) ||
          (this.userInfo.mobilePhone && this.userInfo.googleState) ||
          (this.userInfo.email && this.userInfo.googleState)
        ) {
          this.grade = this.$t("uc.safe.safelevel_medium");
        } else {
          this.grade = this.$t("uc.safe.safelevel_low");
        }
        this.$store.commit("setMember", res.body.data);
      });
    },
    // 選擇日期
    handleBirth(date) {
      this.formValidate.birth = date;
    },
    // 上傳圖片用
    getPicUrlFront(res) {
      this.idCardFront = res;
      this.formValidate.idCardFront = res;
    },
    getPicUrlBack(res) {
      this.idCardBack = res;
      this.formValidate.idCardBack = res;
    },
    getPicUrlHeldIdCard(res) {
      this.handHeldIdCard = res;
      this.formValidate.handHeldIdCard = res;
    },

    handleRealModal() {
      this.realModal = true;
    },

    handleSubmit() {
      console.log(this.formValidate);
      this.$refs.formValidate.validate(async (valid) => {
        if (valid) {
          var params = {};
          params["firstName"] = this.formValidate.firstName;
          params["lastName"] = this.formValidate.lastName;
          params["country"] = this.formValidate.country;
          params["idCard"] = this.formValidate.idCard;
          params["certiTyp"] = this.formValidate.certiTyp;
          params["idCardFront"] = this.idCardFront;
          params["idCardBack"] = this.idCardBack;
          params["handHeldIdCard"] = this.handHeldIdCard;
          params["birth"] = this.formValidate.birth;
          this.$http
            .post(this.host + this.api.user.submitReal, params)
            .then((res) => {
              this.$Message.info(res.data.message);
              if (res.data.code == 0) {
                this.realModal = false;
                // 重置實名狀態
                this.getReal();
              }
            });
        }
      });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 獲取國家
    getCountry() {
      this.$http.post(this.host + this.api.user.country, {}).then((res) => {
        this.countryList = res.data.data;
      });
    },
    // 获取实名状态
    getReal() {
      this.$http.post(this.host + this.api.user.real, {}).then((res) => {
        // 0待审核1审核失败2审核成功
        this.userVerifyStatus = res.data.data.auditStatus;
      });
    },
    // 复制地址
    copyLink(val) {
      // 复制链接
      let url = val;
      // 后台接口返回的链接地址
      let inputNode = document.createElement("input");
      // 创建input
      inputNode.value = url;
      // 赋值给 input 值
      document.body.appendChild(inputNode);
      // 插入进去
      inputNode.select();
      // 选择对象
      document.execCommand("Copy");
      // 原生调用执行浏览器复制命令
      inputNode.className = "oInput";
      inputNode.style.display = "none";
      this.$Notice.success({
        title: this.$t("new.universal.copySuccess"),
      });
    },
    // 管理设备
    go_page() {
      this.$router.push("equipment");
    },
    settime() {
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
    },
    // 更改邮箱
    changeEmile(item, type) {
      this.changeEmileNumber = true;
      this.EmileNumber = item;
      this.typeNumber = type;
    },
    successprofiLoss(e) {
      this.changeEmileNumber = e;
      this.getUserInfo();
    },
    profiLoss(e) {
      this.changeEmileNumber = e;
    },
    // 更改手机
    changePhone(item, type) {
      this.changeEmileNumber = true;
      this.EmileNumber = item;
      this.typeNumber = type;
    },
    getnewData() {
      this.countdown = 60;
      clearInterval(this.timercode);
      this.sendcodeValue = this.$t("uc.regist.sendcode");
      this.codeTwo4 = false;
      this.codedisabled = false;
    },
  },
};
</script>

<style lang="less">
.title_content {
  .ivu-upload-drag {
    height: 56px;
    width: 56px;
    border: none;
  }
}
</style>
<style lang="less" scoped>
@import url(../../assets/css/swap.css);

.user_content {
  padding-top: 50px;
  background: #f7f7fb;
  .main_content {
    width: 1200px;
    margin: 0 auto 112px;
    .title_content {
      margin-top: 20px;
      padding: 32px 24px;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      .header_part {
        margin-right: 16px;
        height: 56px;
        width: 56px;
        position: relative;
        cursor: pointer;
        .title_header {
          height: 100%;
          width: 100%;
          border-radius: 9999px;
        }
        .changeHeader {
          position: absolute;
          display: none;
          height: 100%;
          width: 100%;
          background-color: #6f6f6f95;
          border-radius: 5px;
          .changeHeader_txt {
            position: absolute;
            display: block;
            bottom: 2px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            width: 100%;
          }
        }
      }
      .header_part:hover .changeHeader {
        display: block;
      }
      .title_main {
        .title_user_account {
          font-size: 24px;
          line-height: 32px;
          margin-right: 14px;
        }
        .title_user_id {
          font-size: 12px;
          line-height: 16px;
          background-color: #f7f7fb;
          padding: 4px 8px;
        }
        .vip {
          margin-left: 8px;
        }
      }
      .title_other {
        color: #6f6f6f;
        font-size: 12px;
        line-height: 16px;
        margin-top: 8px;
        .title_ip {
          margin-left: 16px;
        }
      }
      .title_user_tips {
        color: #03C59E;
        cursor: pointer;
      }
    }
    .verify_content {
      background-color: #ffffff;
      border-radius: 4px;
      margin-top: 20px;
      .level {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        div {
          margin-right: 20px;
        }
      }
      .verify_tips {
        margin-top: 16px;
        padding: 8px 16px;
        height: 48px;
        line-height: 14px;
        font-size: 14px;
        background-color: #f7f7fb;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .verify_table {
        font-size: 12px;
        line-height: 16px;
        margin-top: 24px;
        border-left: 1px solid #eee;
        border-top: 1px solid #eee;
        .ivu-col {
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 16px 24px;
          height: 57px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }
    .acitves {
      h2 {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        border: 1px solid #eeeeee;
        padding: 16px 24px;
      }
      .list {
        padding: 0 24px;
      }
    }

    .another {
      padding: 24px;
    }
  }
}
.input_all {
  margin-bottom: 20px;
}
.Modal_all {
  padding: 30px;
}
.input_two {
  display: flex;
  align-items: center;
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
</style>
