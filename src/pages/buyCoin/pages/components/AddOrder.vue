<!--
 * @Author: 张慧茜 921879459@qq.com
 * @Date: 2024-03-18 14:13:20
 * @LastEditors: 张慧茜 921879459@qq.com
 * @LastEditTime: 2024-04-10 16:19:25
 * @FilePath: \天晟交易所\src\pages\buyCoin\pages\components\AddOrder.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="AddOrder_page">
    <Form :model="formData" :label-width="80">
      <!-- 订单类型 coOrderType 1出售/0购买 -->
      <FormItem :label="$t('buyCoin.orders.txt14')">
        <RadioGroup v-model="formData.coOrderType">
          <Radio :label="0" border>{{ $t("buyCoin.orders.txt24") }}</Radio>
          <Radio :label="1" border>{{ $t("buyCoin.orders.txt25") }}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 购买类型 type 0数量/1金额 -->
      <FormItem
        :label="
          formData.coOrderType == 0
            ? $t('buyCoin.orders.components.txt1')
            : $t('buyCoin.orders.components.txt2')
        "
      >
        <RadioGroup v-model="formData.type">
          <Radio :label="0" border>{{
            formData.coOrderType == 0
              ? $t("buyCoin.orders.components.txt3")
              : $t("buyCoin.orders.components.txt4")
          }}</Radio>
          <Radio :label="1" border>{{
            formData.coOrderType == 0
              ? $t("buyCoin.orders.components.txt5")
              : $t("buyCoin.orders.components.txt6")
          }}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 选择币种 formData.coCoin -->
      <FormItem :label="$t('new.finance.operate.ChooseCurrency')">
        <Select
          v-model="checkValue"
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
              <img style="height: 24px;width: 24px;" :src="item.icon" alt="" />
              <span style="margin: 0px 12px;">{{ item.unit }}</span>
            </div>
          </Option>
        </Select>
      </FormItem>
      <!-- 出售/购买 金额/数量 -->
      <template v-if="formData.coOrderType == 0">
        <!-- 购买类型 -->
        <FormItem
          :label="
            formData.type == 0
              ? $t('buyCoin.orders.components.txt7')
              : $t('buyCoin.orders.components.txt8')
          "
        >
          <Input
            v-model="formData.total"
            :placeholder="
              formData.type == 0
                ? $t('buyCoin.orders.components.txt9')
                : $t('buyCoin.orders.components.txt10')
            "
          >
          </Input>
        </FormItem>
      </template>
      <template v-else>
        <!-- 出售类型 -->
        <FormItem
          :label="
            formData.type == 1
              ? $t('buyCoin.orders.components.txt11')
              : $t('buyCoin.orders.components.txt12')
          "
        >
          <Input
            v-model="formData.total"
            :placeholder="
              formData.type == 1
                ? $t('buyCoin.orders.components.txt14')
                : $t('buyCoin.orders.components.txt13')
            "
          >
          </Input>
        </FormItem>
      </template>
      <!-- 用户限额 -->
      <FormItem :label="$t('buyCoin.orders.components.txt15')">
        <div style="display: flex; align-items: center;">
          <Input
            v-model="formData.coAmountMin"
            :placeholder="$t('buyCoin.orders.components.txt16')"
            style="width: 45%"
          >
            <span slot="append">¥</span>
          </Input>
          <span style="margin: 0 10px;">--</span>
          <Input
            v-model="formData.coAmountMax"
            :placeholder="$t('buyCoin.orders.components.txt17')"
            style="width: 45%"
          >
            <span slot="append">¥</span>
          </Input>
        </div>
      </FormItem>
      <!-- 发布汇率 -->
      <FormItem :label="$t('buyCoin.orders.components.txt18')">
        <div style="display: flex; align-items: center;">
          <InputNumber
            v-model="formData.coCoinPrice"
            controls-outside
            :step="0.01"
            :min="0.01"
          ></InputNumber>
          <span style="font-size: 20px;margin-left: 10px;">¥</span>
        </div>
      </FormItem>
      <!-- 收款方式 coPayType -->
      <FormItem :label="$t('buyCoin.index.txt20')">
        <RadioGroup v-model="formData.coPayType">
          <Radio :label="1" border>{{ $t("buyCoin.universal.wx") }}</Radio>
          <Radio :label="2" border>{{ $t("buyCoin.universal.alipay") }}</Radio>
          <Radio :label="3" border>{{ $t("buyCoin.universal.bank") }}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 留言 -->
      <!-- <FormItem :label="$t('buyCoin.orders.txt31')">
        <Input
          v-model="formData.coMessage"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          :placeholder="$t('buyCoin.orders.components.txt19')"
        ></Input>
      </FormItem> -->
      <FormItem>
        <Button type="primary" @click="handleSubmit" long>{{
          $t("buyCoin.universal.submit")
        }}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("MEMBER")),
      resData: [], // 币种
      // 幣種
      checkValue: 0,
      formData: {
        coOrderType: 0,
        type: 0,
        coCoin: 0,
        coCoinPrice: 6.85,
        coPayType: 1,
      },
    };
  },
  created() {
    this.getCoinData();
  },
  methods: {
    // 选择币种
    seleceChange(res) {
      this.detailData = this.resData[res.value];
      this.formData.coCoin = this.resData[res.value].unit;
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/5`, params)
        .then((res) => {
          this.resData = res.data.data;
          this.detailData = this.resData[0];
          this.formData.coCoin = this.resData[0].unit;
          this.loading = false;
        });
    },
    // 提交表单
    handleSubmit() {
      const reg = /^\d+(\.\d+)?$/;
      if (!reg.test(this.formData.total)) {
        this.$Message.error("请输入正确的购买数量/购买金额");
        return;
      }
      if (!reg.test(this.formData.coAmountMin)) {
        this.$Message.error("请输入正确的用户最低限额");
        return;
      }
      if (!reg.test(this.formData.coAmountMax)) {
        this.$Message.error("请输入正确的用户最高限额");
        return;
      }
      const postData = {
        coSellerId: this.userInfo.csId, //商户id
        coOrderType: this.formData.coOrderType, // 订单类型:0购买单  1出售单
        type: this.formData.type, // 0:按照数量 1:按照金额
        coCoin: this.formData.coCoin, // 币种
        total: this.formData.total, // 数量
        coAmountMin: this.formData.coAmountMin, // 限额
        coAmountMax: this.formData.coAmountMax, // 限额
        coCoinPrice: this.formData.coCoinPrice, // 单价 汇率
        coPayType: this.formData.coPayType, // 支付方式:1 是微信  2 是支付宝 3银行卡
        // coMessage: this.formData.coMessage, // 留言
      };
      console.log(postData);
      this.$http
        .post(this.host + this.api.buy.createOrderApi, postData)
        .then((res) => {
          if (res.data.code === 0) {
            this.$Message.success(res.data.message);
            this.$emit("closeModal",false);
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../../assets/css/common.less");
.AddOrder_page {
}
</style>
