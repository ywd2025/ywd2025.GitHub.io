<template>
  <!-- 地址簿 -->
  <div class="finance_content">
    <div class="address_content">
      <div class="title">
        <Icon
          @click="goBack"
          type="ios-arrow-back"
          style="margin-right: 20px;"
        />{{ $t("new.universal.withdraw") }}
      </div>
      <div class="addressTitle">
        <h2 style="font-size: 24px;line-height: 32px;">
          {{ $t("new.finance.operate.addressManagement") }}
        </h2>
        <Button @click="handleAddModal" type="primary" class="primary !h-8">{{
          $t("new.finance.operate.addWithdrawalAddress")
        }}</Button>
      </div>

      <div class="address_table_part">
        <Select
          v-model="unit"
          style="width:200px"
          @on-change="handleCoinChange"
        >
          <Option v-for="item in coinsData" :value="item.unit" :key="item.unit">
            {{ item.unit }}
          </Option>
        </Select>

        <Table
          :no-data-text="$t('common.nodata')"
          :data="addressList"
          :columns="columns"
          :loading="loading"
          class="table_content"
        >
          <template slot-scope="{ row, index }" slot="unit">
            {{ row.coin.name }}
          </template>
          <template slot-scope="{ row, index }" slot="operate">
            <span
              @click="deleteAddress(row.id)"
              style="color: #03C59E;cursor: pointer;"
              >{{ $t("new.universal.delete") }}</span
            >
          </template>
        </Table>
      </div>
    </div>

    <FooterPart></FooterPart>

    <!-- 添加地址對話框 -->
    <Modal
      v-model="addModal"
      :title="$t('new.finance.operate.addWithdrawalAddress')"
      :loading="submitBtnLoading"
      @on-ok="addSubmit"
      @on-cancel="cancel"
      :ok-text="$t('common.ok')"
      :cancel-text="$t('common.close')"

    >
      <div style="display: flex;flex-direction: column;align-items: center;">
        <Form
          :model="formItem"
          :label-width="80"
          style="width:100%"
          :rules="ruleValidate"
          ref="formItem"
        >
          <FormItem :label="$t('new.universal.currency')" prop="unit">
            <Select v-model="formItem.unit" placeholder="$t('common.pleaseselect')">
              <Option
                v-for="item in coinsData"
                :value="item.unit"
                :key="item.unit"
              >
                {{ item.unit }}
              </Option>
            </Select>
          </FormItem>
          <FormItem
            :label="$t('new.finance.operate.withdrawalAddress')"
            prop="address"
          >
            <Input
              v-model="formItem.address"
              :placeholder="$t('new.finance.operate.inputWithdrawalAddr')"
            ></Input>
          </FormItem>
          <FormItem :label="$t('new.finance.operate.note')">
            <Input
              v-model="formItem.content"
              :placeholder="$t('new.finance.operate.inputNote')"
            ></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      // 表單
      formItem: {
        unit: "",
        address: "",
        content: "",
      },
      loading: false,
      submitBtnLoading: true,
      addModal: false,
      // 幣種名字
      unit: null,
      // 幣種們
      coinsData: [],
      // 地址們
      addressList: [],
      columns: [
        {
          title: this.$t("new.universal.currency"),
          slot: "unit",
          align: "center",
        },
        {
          title: this.$t("new.finance.operate.withdrawalAddress"),
          key: "address",
          align: "center",
        },
        {
          title: this.$t("new.finance.operate.remarks"),
          key: "remark",
          align: "center",
        },
        {
          title: this.$t("new.universal.operation"),
          slot: "operate",
          align: "center",
        },
      ],
      ruleValidate: {
        unit: [
          {
            required: true,
            message: this.$t("new.finance.operate.selectCurrency"),
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: this.$t("new.finance.operate.inputWithdrawalAddr"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.unit = window.location.href.split("=")[1];
    this.getAddress();
    this.getCoinData();
  },
  methods: {
    // 打開添加辭職彈窗
    handleAddModal() {
      this.addModal = true;
      this.formItem = {
        unit: "",
        address: "",
        content: "",
      };
    },
    // 刪除地址
    deleteAddress(id) {
      this.$http
        .post(this.host + `${this.api.FinanceChange.delAddress}/${id}`, {})
        .then((res) => {
          this.$Notice.success({
            title: this.$t("new.finance.operate.deleteSuccess"),
          });
          this.getAddress();
        });
    },
    // 選擇幣種查看地址
    handleCoinChange(res) {
      this.unit = res;
      this.getAddress();
    },
    // 添加提交
    addSubmit() {
      setTimeout(() => {
        this.submitBtnLoading = false;
        this.$nextTick(() => {
          this.submitBtnLoading = true;
        });
      }, 500);
      this.$refs["formItem"].validate((valid) => {
        if (valid) {
          var params = this.formItem;
          this.$http
            .post(this.host + this.api.FinanceChange.addAddress, params)
            .then((res) => {
              this.addModal = false;
              this.getAddress();
            });
        } else {
        }
      });
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      // params['type'] = '0'
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/1`, params)
        .then((res) => {
          this.coinsData = res.data.data;
          console.log(res);
          this.loading = false;
        });
    },
    // 通過幣種查詢地址
    getAddress() {
      this.loading = true;
      this.$http
        .get(this.host + this.api.FinanceChange.getAddress, {
          params: {
            unit: this.unit,
          },
        })
        .then((res) => {
          this.addressList = res.data.data;
          this.loading = false;
        });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    cancel() {
      this.addModal = false;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../../../assets/css/common.less");
.finance_content {
  background-color: #f8f8f8;
  width: 100%;
  padding-top: 84px;
  .address_content {
    width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 4px;
    .title {
      color: #6f6f6f;
      padding: 24px 24px 0 24px;
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 16px;
    }
    .addressTitle {
      padding: 20px 24px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .address_table_part {
      padding: 24px;
      .table_content {
        margin-top: 10px;
      }
    }
  }
}
</style>
