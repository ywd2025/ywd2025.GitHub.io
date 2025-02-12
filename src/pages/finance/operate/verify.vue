<template>
  <div class="finance_content">
    <div class="title">
      <span>
        <Icon
          @click="goBack"
          type="ios-arrow-back"
          style="margin-right: 20px;"
        />{{ $t("new.finance.operate.audit") }}
      </span>
    </div>
    <div class="finance_operate">
      <Form
        ref="formData"
        :model="formData"
        :rules="ruleValidate"
        label-position="top"
      >
        <FormItem :label="$t('new.finance.operate.ChooseCurrency')" prop="unit">
          <Select
            v-model="formData.unit"
            style="width:100%"
            @on-change="seleceChange"
            :label-in-value="true"
          >
            <Option
              v-for="(item, index) in resData"
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
        </FormItem>

        <FormItem :label="$t('new.finance.operate.topAmount')" prop="amount">
          <Input
            v-model="formData.amount"
            :placeholder="$t('new.finance.operate.inputAmount')"
          ></Input>
        </FormItem>
        <FormItem
          :label="$t('new.finance.operate.paymentAddress')"
          prop="address"
        >
          <Input
            v-model="formData.address"
            :placeholder="$t('new.finance.operate.inputAddress')"
          ></Input>
        </FormItem>
        <FormItem :label="$t('new.finance.operate.hashValue')" prop="txid">
          <Input
            v-model="formData.txid"
            :placeholder="$t('new.finance.operate.inputHash')"
          ></Input>
        </FormItem>
        <FormItem
          :label="$t('new.finance.operate.tradingVouchers')"
          prop="transProof"
        >
          <picUpload
            :picUrl="transProof"
            @getPicUrl="getPicUrl"
            :action="action"
          ></picUpload>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="submitVerify('formValidate')">{{
            $t("new.universal.submit")
          }}</Button>
        </FormItem>
      </Form>

      <div>
        <div style="margin-bottom: 16px;">
          {{ $t("new.finance.operate.tips4") }}
        </div>
        <div class="text-sm">{{ $t("new.finance.operate.tips5") }}</div>
        <ul style="list-style-type: disc;list-style-position: outside;">
          <li>
            <span class="text-t1">{{ $t("new.finance.operate.tips6") }}</span>
          </li>
          <li>
            <span class="text-t1">{{ $t("new.finance.operate.tips7") }}</span>
          </li>
          <li>
            <span class="text-t1">{{ $t("new.finance.operate.tips8") }}</span>
          </li>
        </ul>
        <div style="margin: 60px 0 24px;font-weight: 600;">FAQ</div>
        <ul style="gap: 20px;padding-left: 0px;">
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips9")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips10")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips11")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips12")
            }}</router-link>
          </li>
          <li>
            <router-link style="color: #1c1c1c" to="/help">{{
              $t("new.finance.operate.tips13")
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>

    <FooterPart></FooterPart>
  </div>
</template>

<script>
import Vue from "vue";
import FooterPart from "../../../components/footerPart.vue";
import picUpload from "../../../components/picUpload.vue";
export default {
  components: {
    FooterPart,
    picUpload,
  },
  data() {
    return {
      resData: [],
      checkValue: 0,
      detailData: {},
      data: [],
      // 表格用數據
      formData: {},
      ruleValidate: {
        unit: [
          {
            required: true,
            type: "number",
            message: this.$t("new.finance.operate.selectCurrency"),
            trigger: "blur",
          },
        ],
        amount: [
          {
            required: true,
            type: "string",
            message: this.$t("new.finance.operate.inputAmount"),
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            type: "string",
            message: this.$t("new.finance.operate.inputAddress"),
            trigger: "blur",
          },
        ],
        txid: [
          {
            required: true,
            type: "string",
            message: this.$t("new.finance.operate.inputHash"),
            trigger: "blur",
          },
        ],
        transProof: [
          {
            required: true,
            type: "string",
            message: this.$t("new.finance.operate.tradingVouchers"),
            trigger: "blur",
          },
        ],
      },
      // 上傳圖片用
      action: this.imageUrl,
      transProof: "",
    };
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
  },
  created() {
    this.getCoinData();
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    // 上傳圖片用
    getPicUrl(res) {
      console.log(res);
      this.transProof = res;
      this.formData.transProof = res;
    },

    // 跳轉全部記錄
    goPage(url) {
      this.$router.push({
        path: url,
      });
    },
    // 选择币种
    seleceChange(res) {
      this.detailData = this.resData[res.value];
      this.formData.unit = res.value;
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      // params['type'] = '0'
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/0`, params)
        .then((res) => {
          this.resData = res.data.data;
          this.detailData = this.resData[0];
          this.loading = false;
        });
    },
    // 提交充幣申請
    submitVerify() {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          var params = {};
          params["status"] = "0";
          params["amount"] = this.formData.amount;
          params["unit"] = this.resData[this.formData.unit].unit;
          // params['unitId'] = this.formData.unitId
          params["txid"] = this.formData.txid;
          params["address"] = this.formData.address;
          params["transProof"] = this.formData.transProof;
          this.$http
            .post(this.host + this.api.finance.submitVerify, params)
            .then((res) => {
              console.log(res);
              if (res.data.code === 0) {
                this.$Message.success(res.data.message);
                this.$router.push("/finance/all");
              } else {
                this.$Message.error(res.data.message);
              }
            });
        }
      });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
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
    justify-content: space-between;
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
    .address_part {
      padding: 0 20px;
      border: 1px solid #eeeeee;
      border-radius: 4px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .number_part {
      margin-top: 24px;
    }
    .tips_part {
      margin: 40px 0 16px;
      color: #1c1c1c;
      line-height: 16px;
      font-size: 16px;
      padding-left: 16px;
      display: grid;
      gap: 12px;
      list-style-type: disc;
      list-style-position: outside;
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

ul {
  line-height: 16px;
  padding-left: 16px;
  display: grid;
  gap: 12px;
  margin-top: 24px;
}

// 上傳圖片用
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
