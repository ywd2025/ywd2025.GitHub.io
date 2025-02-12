<template>
  <!-- 提幣 -->
  <div class="finance_content">
    <div class="title">
      <Icon
        @click="goBack"
        type="ios-arrow-back"
        style="margin-right: 20px;"
      />{{ $t("new.universal.withdraw") }}
    </div>
    <div class="finance_operate">
      <div class="finance_operate_left">
        <Steps :current="stepCurrent">
          <Step :title="$t('buyCoin.index.txt34')"></Step>
          <Step :title="$t('carouselItem.text79')"></Step>
          <Step :title="$t('carouselItem.text80')"></Step>
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
              :value="index"
              :key="item.unit"
              :label="item.unit"
            >
              <div style="display: flex;align-items: center;">
                <img
                  style="height: 24px;width: 24px;"
                  :src="item.icon"
                  alt=""
                />
                <span style="margin: 0px 12px;">{{ item.unit }}</span>
              </div>
            </Option>
          </Select>
          <Button @click="stepCurrent = 1" type="primary" size="large" long>{{
            $t("carouselItem.text81")
          }}</Button>
        </div>
        <!-- 步骤二 -->
        <div v-if="stepCurrent === 1">
          <div>
            <div style="margin:20px 0 10px;">
              {{ $t("carouselItem.text82") }}
            </div>
            <RadioGroup v-model="withdrawType">
              <Radio :label="0"> {{ $t("carouselItem.text83") }}</Radio>
              <Radio :label="1"> {{ $t("carouselItem.text84") }}</Radio>
            </RadioGroup>
          </div>
          <!-- 通过区块链转账 -->
          <div v-if="withdrawType === 0">
            <div style="margin:20px 0 10px;">
              {{ $t("new.finance.operate.withdrawalAddress") }}
              <div
                class="flex items-center"
                @click="handleAddressModal"
                style="float: right;margin-top: 4px;cursor: pointer;color: #1c1c1c;"
              >
                {{ $t("new.finance.operate.addressBook") }} >
              </div>
            </div>
            <div>
              <Input
                v-model="withdrawAddress"
                :placeholder="$t('new.finance.operate.inputWithdrawalAddr')"
                style="width: 100%"
              />
            </div>
            <div>
              <div style="margin:20px 0 10px;">
                {{ $t("new.finance.operate.moneyTransferNetwork") }}
              </div>
              <Select
                v-model="checkLine"
                style="width:100%"
                @on-change="seleceLine"
                :label-in-value="true"
              >
                <Option
                  v-for="(item, index) in lineList"
                  :value="index"
                  :key="item.id"
                  :label="item.linkName"
                >
                  <div style="display: flex;align-items: center;">
                    <span style="margin: 0px 12px;">{{ item.linkName }}</span>
                    <span style="margin: 0px 12px;">{{
                      item.udunSubCode
                    }}</span>
                  </div>
                </Option>
              </Select>
            </div>
            <Button
              @click="stepCurrent = 2"
              type="primary"
              size="large"
              long
              style="margin-top: 20px;"
              :disabled="withdrawAddress === null"
              >{{ $t("carouselItem.text81") }}</Button
            >
          </div>
          <!-- 通过手机号/ID/邮箱转账 -->
          <div v-if="withdrawType === 1">
            <div>
              <div style="margin:20px 0 10px;">
                {{ $t("carouselItem.text85") }}
              </div>
              <RadioGroup v-model="withdrawAccountType">
                <Radio :label="0">{{ $t("uc.forget.email") }}</Radio>
                <Radio :label="1">{{ $t("uc.forget.telno") }}</Radio>
                <Radio :label="2">UID</Radio>
              </RadioGroup>
              <div style="margin:20px 0 10px;">
                {{ $t("uc.forget.email") }}/{{ $t("uc.forget.telno") }}/UID
              </div>
              <Input
                v-model="alia"
                :placeholder="$t('carouselItem.text86')"
                style="width: 100%"
              />
            </div>
            <Button
              @click="stepCurrent = 2"
              type="primary"
              size="large"
              long
              style="margin-top: 20px;"
              :disabled="alia === null"
              >{{ $t("carouselItem.text81") }}</Button
            >
          </div>
        </div>
        <!-- 步骤三 -->
        <div v-if="stepCurrent === 2">
          <!-- 链转账 -->
          <div class="withdrawNumberInput" v-if="withdrawType === 0">
            <!-- 选中的链信息: {{ checkedLineData }} 选中的币种信息:
            {{ coinDetailData }}
            选中的填写数量的方式: {{ withdrawType }} -->
            <div style="margin: 20px 0 12px;">
              {{ $t("new.universal.quantity") }}
              <a
                class="flex items-center"
                style="float: right;margin-top: 4px;cursor: pointer;color: #1c1c1c;"
              >
                {{ $t("new.finance.operate.withdrawable") }}
                {{
                  coinDetailData.mvUseBalance - fee < 0
                    ? 0
                    : coinDetailData.mvUseBalance - fee
                }}
                {{ coinDetailData.unit }}
              </a>
            </div>
            <InputNumber
              v-model="withdrawNumber"
              :min="checkedLineData.minWithdrawAmount"
              :max="checkedLineData.maxWithdrawAmount"
              :placeholder="
                `${checkedLineData.minWithdrawAmount} ~ ${checkedLineData.maxWithdrawAmount}`
              "
              style="width: 100%"
            >
              <!-- <span slot="append">
                <span style="margin-right: 24px;">{{
                  coinDetailData.unit
                }}</span>
                <span
                  style="color: #00c070;cursor: pointer;"
                  @click="handleMax(coinDetailData.mvUseBalance)"
                >
                  {{ $t("new.finance.operate.biggest") }}</span
                >
              </span> -->
            </InputNumber>

            <ul class="number_part">
              <li class="flex items-center justify-between">
                <div>{{ $t("new.finance.operate.withdrawalFees") }}</div>
                <div class="text-t1 flex items-center">
                  <Slider
                    v-if="checkedLineData.minTxFee != checkedLineData.maxTxFee"
                    v-model="fee"
                    style="width: 200px;"
                    :min="checkedLineData.minTxFee"
                    :max="checkedLineData.maxTxFee"
                    :marks="sliderMarks"
                    :step="steplength"
                  >
                  </Slider>
                  <div style="width: 100px;margin-left: 10px;">
                    {{
                      checkedLineData.minTxFee === checkedLineData.maxTxFeefee
                        ? checkedLineData.minTxFee
                        : fee
                    }}
                  </div>

                  {{ coinDetailData.unit }}
                </div>
              </li>
            </ul>

            <div style="margin: 24px 0;">
              {{ $t("new.finance.operate.arrival") }}
              <span
                style="color: #1c1c1c;font-size: 20px;line-height: 28px;float: right;"
              >
                {{ withdrawNumber - fee < 0 ? 0 : withdrawNumber - fee }}
                {{ coinDetailData.unit }}
              </span>
            </div>
            <Button
              @click="btn_submit()"
              type="primary"
              size="large"
              long
              style="margin-top: 10px;"
              >{{ $t("new.finance.operate.takeOut") }}</Button
            >
          </div>
          <!-- 通过账号内转 -->
          <div class="withdrawNumberInput" v-if="withdrawType === 1">
            <!-- 选中的链信息: {{ checkedLineData }} 选中的币种信息:
            {{ coinDetailData }}
            选中的填写数量的方式: {{ withdrawType }} -->
            <div style="margin: 20px 0 12px;">
              {{ $t("new.universal.quantity") }}
              <a
                class="flex items-center"
                style="float: right;margin-top: 4px;cursor: pointer;color: #1c1c1c;"
              >
                {{ $t("carouselItem.text87") }}
                {{ coinDetailData.mvUseBalance }}
                {{ coinDetailData.unit }}
              </a>
            </div>
            <InputNumber
              v-model="withdrawNumber"
              :min="0"
              :max="coinDetailData.mvUseBalance"
              :placeholder="$t('otc.tradeinfo.numtip')"
              style="width: 100%"
            >
            </InputNumber>
            <Button
              @click="handleWithdrawAccount()"
              type="primary"
              size="large"
              long
              style="margin-top: 10px;"
              >{{ $t("carouselItem.text88") }}</Button
            >
          </div>
        </div>
        <Button
          @click="resect()"
          type="warning"
          size="large"
          long
          style="margin-top: 10px;"
          >{{ $t("carouselItem.text89") }}</Button
        >
      </div>

      <div class="finance_operate_right">
        <div style="margin-bottom: 16px;">
          {{ $t("new.finance.operate.tips14") }}
        </div>
        <div class="text-sm">{{ $t("new.finance.operate.tips15") }}</div>
        <!-- <ul style="list-style-type: disc;list-style-position: outside;">
          <li>
            <span class="text-t1">充值長時間未到賬</span>
          </li>
          <li>
            <span class="text-t1">未正確輸入標籤</span>
          </li>
          <li>
            <span class="text-t1">充值幣種未上線</span>
          </li>
        </ul> -->
        <div style="margin: 60px 0 24px;font-weight: 600;">FAQ</div>
        <ul style="gap: 20px;padding-left: 0px;">
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips16")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips17")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips18")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips19")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips20")
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="recentRecord">
      <div class="recentRecord_title">
        <div class="recentRecord_left">
          <div style="font-size: 16px;">
            {{ $t("new.finance.operate.recentWithdrawals") }}
          </div>
        </div>
        <div class="recentRecord_right">
          <Button type="text" size="small" @click="goPageRecords">{{
            $t("new.finance.operate.allRecords")
          }}</Button>
        </div>
      </div>
      <div class="table_part">
        <Table
          :columns="columns"
          :data="data"
          :no-data-text="$t('common.nodata')"
        >
          <template slot-scope="{ row, index }" slot="unit">
            {{ row.coin.unit }}
          </template>
          <template slot-scope="{ row, index }" slot="address">
            {{ lengFilters(row.address) }}
            <Icon
              type="md-albums"
              style="cursor: pointer;"
              @click="copyLink(row.address)"
            />
          </template>
          <template slot-scope="{ row, index }" slot="hash">
            {{
              row.transactionNumber
                ? row.transactionNumber
                : $t("new.finance.operate.notYet")
            }}
          </template>
          <template slot-scope="{ row, index }" slot="status">
            {{ statusFormatter(row.status) }}
          </template>
        </Table>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </div>
    </div>

    <!-- 地址簿對話框 -->
    <Modal
      v-model="addressModal"
      :title="$t('new.finance.operate.selectAddress')"
      :footer-hide="true"
    >
      <div
        v-if="addressList.length === 0"
        style="display: flex;flex-direction: column;align-items: center;"
      >
        <div style="text-align: center;">
          {{ $t("new.finance.operate.addressBookTip") }}
        </div>
        <Button @click="goPage()" type="primary" style="margin-top: 24px;">{{
          $t("new.finance.operate.addWithdrawalAddress")
        }}</Button>
      </div>
      <div v-if="addressList.length != 0">
        <div class="modalAddressList">
          <div
            class="modalAddress"
            v-for="item in addressList"
            @click="checkAddress(item.address)"
          >
            <div style="margin-top: 8px;">
              <span class="" style="margin-right: 8px;color: #6f6f6f;">{{
                $t("new.finance.operate.withdrawalAddress")
              }}</span>
              <span class="">{{ item.address }}</span>
            </div>
            <div>
              <span class="" style="margin-right: 8px;color: #6f6f6f;">{{
                $t("new.finance.operate.moneyTransferNetwork")
              }}</span>
              <span class="">{{ item.coin.unit }}</span>
            </div>
          </div>
        </div>
        <Button
          @click="goPage()"
          type="primary"
          size="large"
          long
          style="margin-top: 10px;"
          >{{ $t("new.finance.operate.addNewAddress") }}</Button
        >
      </div>
    </Modal>
    <!-- 發送驗證碼 -->
    <Modal
      v-model="emailVerifyModal"
      :title="$t('new.user.capTCHA')"
      :footer-hide="true"
      width="400"
    >
      <div>
        <div>
          <div v-if="userInfo.email">{{ userInfo.email }}</div>
          <div v-else>{{ userInfo.mobilePhone }}</div>
        </div>
        <div class="input_two">
          <Input
            style="margin: 20px 0;width: 350px"
            v-model="emailCode"
            :placeholder="$t('uc.forget.smscode')"
          >
            <!-- <span @click="handlerSetCode" style="cursor: pointer" slot="append">{{
            sendcodeValue
          }}</span> -->
          </Input>
          <input
            @click="handlerSetCode"
            id="sendCode"
            type="Button"
            :value="sendcodeValue"
            :disabled="codedisabled"
            class="code_css"
          />
        </div>
        <div
          style="display: flex;justify-content: flex-end;align-items: center;"
        >
          <Button type="primary" @click="handleWithdraw">{{
            $t("new.universal.submit")
          }}</Button>
        </div>
      </div>
    </Modal>
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import Vue from "vue";
import FooterPart from "../../../components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      // 步骤条
      stepCurrent: 0,
      // 步骤一
      // 币种
      coinsData: [],
      // select选中的币种
      checkCoin: 0,
      // select选中的链
      checkLine: 0,
      // 默认显示用币种名与币种信息
      coinName: "",
      coinDetailData: {},
      // 步骤二
      // 转账方式
      withdrawType: 0,
      // 链信息
      lineList: [],
      // 所选中的链
      checkedLineData: {},
      // 选择的网络(链) 链信息id
      coinWithLinkInfoId: null,
      // 提币地址
      withdrawAddress: null,
      // 账号转账账号类型
      withdrawAccountType: 0,
      // id/手机号/邮箱
      alia: null,
      // 步骤三
      // 选择的手续费
      // 转账数量
      withdrawNumber: null,
      fee: 0,
      addressModal: false,
      addressList: [],
      // 通过账号转账 账号
      withdrawAccount: "",
      emailVerifyModal: false,
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
      // 驗證碼
      codedisabled: false,
      sendcodeValue: this.$t("uc.regist.sendcode"),
      countdown: 60,
      emailCode: "",
      twocode: false,
      columns: [
        {
          title: this.$t("new.universal.time"),
          key: "createTime",
          align: "left",
          width: 180,
        },
        {
          title: this.$t("new.universal.currency"),
          slot: "unit",
          width: 100,
        },
        {
          title: this.$t("new.universal.quantity"),
          key: "arrivedAmount",
          width: 80,
        },
        {
          title: this.$t("new.universal.address"),
          slot: "address",
        },
        {
          title: "hash",
          slot: "hash",
        },
        {
          title: this.$t("new.universal.state"),
          slot: "status",
          width: 80,
        },
      ],
      data: [],
      //加载中按钮
      spinShow: false,
    };
  },
  created() {
    // 进门, 获取币种, 获取提币记录
    this.getCoinData();
    this.getWithdrawRecord(1);
  },
  computed: {
    statusFormatter() {
      return (status) => {
        switch (status) {
          case 0:
            return this.$t("new.universal.beConfirmed");
          // case 1:
          //   return this.$t('new.universal.waitingDeposit')
          case 2:
            return this.$t("new.universal.failure");
          case 3:
            return this.$t("new.universal.success");
          default:
            break;
        }
      };
    },
    lengFilters() {
      return (value) => {
        let len = value.length;
        if (!value) return "";
        if (value.length > 20) {
          return (
            value.substring(0, 8) + "......" + value.substring(len - 8, len)
          );
        }
        return value;
      };
    },
    sliderMarks() {
      const { minTxFee, maxTxFee } = this.checkedLineData;
      return {
        [minTxFee]: minTxFee.toString(),
        [maxTxFee]: maxTxFee.toString(),
      };
    },
    steplength() {
      const str = this.checkedLineData.minTxFee.toString();
      const decimalIndex = str.indexOf(".");
      if (decimalIndex === -1) {
        return 1; // 没有小数点，表示小数点后位数为0
      } else {
        let a = str.length - decimalIndex;
        return Math.pow(10, -a);
      }
    },
  },
  methods: {
    // 获取币种信息
    getCoinData() {
      var params = {};
      // params['type'] = '0'
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/1`, params)
        .then((res) => {
          this.coinsData = res.data.data;
          this.coinDetailData = this.coinsData[0];
          this.coinName = this.coinsData[0].unit;
          // 链信息
          // this.getDepositAddress();
          // 链信息
          this.lineList = this.coinsData[0].coinWithLinkInfoList;
          // 默认选中的链信息
          this.checkedLineData = this.lineList[0];
          // 默认选中的链id
          this.coinWithLinkInfoId = this.lineList[0].id;
          this.fee = this.checkedLineData.minTxFee;
          this.loading = false;
        });
    },
    // 选择币种
    seleceChangeCoin(res) {
      this.coinDetailData = this.coinsData[res.value];
      this.coinName = this.coinsData[res.value].unit;
      // 链信息
      this.lineList = this.coinsData[res.value].coinWithLinkInfoList;
      this.coinWithLinkInfoId = this.lineList[0].id;
      this.checkedLineData = this.lineList[0];
      this.fee = this.checkedLineData.minTxFee;
    },
    // 选择链信息
    seleceLine(res) {
      this.coinWithLinkInfoId = this.lineList[res.value].id;
      // 所选中的链的数据
      this.checkedLineData = this.lineList[res.value];
      this.fee = this.checkedLineData.minTxFee;
    },
    // 查询手续费, 查链信息也在这里, 数量也在这里
    // getDepositAddress() {
    //   this.$http
    //     .get(
    //       this.host +
    //         `${this.api.FinanceChange.depositAddress}${this.coinName}`,
    //       {}
    //     )
    //     .then((res) => {
    //       // 最小手续费
    //       this.minerFee = res.data.data[0].minerFee;
    //       // 最大手续费
    //       this.maxFee = res.data.data[0].maxFee;
    //       // 链信息
    //       this.lineList = res.data.data;
    //     });
    // },

    // 提币记录
    getWithdrawRecord(pageNo) {
      this.spinShow = true;
      let params = {
        pageNo,
        pageSize: 3,
      };
      this.$http
        .post(this.host + this.api.record.withdrawRecord, params)
        .then((response) => {
          const res = response.data.data;
          this.data = res.content;
          this.spinShow = false;
        });
    },
    // 提交按钮
    btn_submit() {
      console.log(this.withdrawNumber);
      if (this.withdrawNumber) {
        this.emailVerifyModal = true;
      } else {
        this.$Notice.error({
          title: this.$t("carouselItem.text278"),
        });
      }
    },
    // 获取验证码
    handlerSetCode() {
      if (this.twocode) {
        return;
      }
      this.twocode = true;
      this.$http
        .post(this.host + this.api.user.commitCoinValidate, {})
        .then((response) => {
          var resp = response.body;
          resp.code == 0 && this.settime();
          this.twocode = false;
        });
    },
    // 提领
    handleWithdraw() {
      if (!this.emailCode) {
        this.$Notice.error({
          title: this.$t("uc.forget.smscode"),
        });
        return;
      }
      var params = {};
      params["unit"] = this.coinDetailData.name;
      params["amount"] = this.withdrawNumber; // 數量
      params["fee"] = this.fee; // 手續費
      params["address"] = this.withdrawAddress; // 提幣地址
      params["coinWithLinkInfoId"] = this.coinWithLinkInfoId; // 链信息id
      params["code"] = this.emailCode;
      this.$http
        .post(this.host + this.api.FinanceChange.submitWithdraw, params)
        .then((res) => {
          if (res.data.code == 0) {
            this.$Notice.success({
              title: res.data.message,
            });
            this.emailVerifyModal = false;
            setTimeout(() => {
              this.$router.push("/finance/all");
            }, 1000);
          } else {
            this.emailVerifyModal = false;
            this.$Notice.error({
              title: res.data.message,
            });
          }
        });
    },
    // 平台内提领
    handleWithdrawAccount() {
      var params = {};
      params["unit"] = this.coinDetailData.name;
      params["amount"] = this.withdrawNumber; // 數量
      params["alia"] = this.alia; // 账号
      params["type"] = this.withdrawAccountType; // 账号类型
      this.$http
        .post(this.host + this.api.FinanceChange.outInPlateApi, params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            this.$Notice.success({
              title: res.data.message,
            });
            setTimeout(() => {
              this.$router.push("/finance/all");
            }, 1000);
          } else {
            this.$Notice.error({
              title: res.data.message,
            });
          }
        });
    },

    // 跳轉全部記錄
    goPageRecords() {
      this.$router.push({
        path: "/record/withdraw",
      });
    },
    // 选中地址簿地址
    checkAddress(addr) {
      console.log(addr);
      this.withdrawAddress = addr;
      this.addressModal = false;
    },
    // 打開提幣地址簿
    handleAddressModal() {
      this.getAddress();
      setTimeout(() => {
        this.addressModal = true;
      }, 500);
    },
    // 通过币种查询地址 地址簿地址
    getAddress() {
      this.$http
        .get(this.host + this.api.FinanceChange.getAddress, {
          params: {
            unit: this.coinDetailData.name,
          },
        })
        .then((res) => {
          this.addressList = res.data.data;
        });
    },
    // 跳转地址簿
    goPage() {
      this.$router.push({
        path: `/finance/address?unit=${this.coinDetailData.name}`,
      });
    },
    // 最大
    handleMax(num) {
      this.withdrawNumber = num;
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
    // 重新填写
    resect() {
      this.stepCurrent = 0;
      this.checkLine = 0;
      this.coinWithLinkInfoId = null;
      this.alia = null;
      this.fee = 0;
      this.withdrawAddress = null;
      this.withdrawNumber = null;
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
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
  },
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/common.less");
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
    .number_part {
      margin-top: 24px;
      display: grid;
      gap: 16px;
      border-radius: 4px;
      padding: 16px;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
// 表格
.recentRecord {
  width: 1200px;
  margin: 28px auto;
  background-color: #ffffff;
  .recentRecord_title {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    border-bottom: 1px solid #eeeeee;
    font-weight: 800;
  }
  .table_part {
    margin-top: 8px;
    padding: 0 24px 60px;
  }
}
.modalAddressList {
  overflow-y: scroll;
  max-height: 468px;
  .modalAddress {
    padding: 16px 0 20px 0;
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
    font-size: 12px;
    line-height: 22px;
  }
}
ul {
  line-height: 16px;
  padding-left: 16px;
  display: grid;
  gap: 12px;
  margin-top: 24px;
}
.input_two {
  display: flex;
  align-items: center;
  position: relative;
}
.code_css {
  height: 30px;
  border: none;
  background-color: #fff;
  position: absolute;
  top: 21px;
  right: 25px;
  cursor: pointer;
}
</style>
