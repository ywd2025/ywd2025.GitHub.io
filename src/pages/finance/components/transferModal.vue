<template>
  <div>
    <!-- 幣種 -->
    <div style="margin-bottom: 12px;">{{ $t("buyCoin.index.txt34") }}</div>
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
    <div class="selects_part" style="margin: 20px 0 12px;">
      <div class="selects">
        <div class="select_line">
          <span>{{ $t("uc.finance.record.from") }}</span>
          <Select
            v-model="fromType"
            style="width:100%"
            @on-open-change="handleFromOpen()"
            @on-change="handleFromChange"
            :label-in-value="true"
            :placeholder="$t('common.pleaseselect')"
          >
            <Option
              v-for="item in fromColumns"
              :label="statusFormatter(item.type)"
              :value="parseInt(item.type)"
              :key="item.type"
              >{{ statusFormatter(item.type) }}</Option
            >
          </Select>
        </div>
        <div class="select_line" style="margin-top: 10px;">
          <span>{{ $t("uc.finance.record.to") }}</span>
          <Select
            v-model="toType"
            style="width:100%"
            @on-open-change="handleToOpen()"
            @on-change="handleToChange"
            :label-in-value="true"
            :placeholder="$t('common.pleaseselect')"
          >
            <Option
              v-for="item in toColumns"
              :label="statusFormatter(item.type)"
              :value="parseInt(item.type)"
              :key="item.type"
              >{{ statusFormatter(item.type) }}</Option
            >
          </Select>
        </div>
      </div>
      <div class="exchange">
        <Icon @click="handleExchange" class="icon" size="30" type="md-swap" />
      </div>
    </div>
    <!-- 數量 -->
    <div style="margin: 20px 0 12px;">
      {{ $t("uc.finance.record.num") }}
      <a
        class="flex items-center"
        style="float: right;margin-top: 4px;cursor: pointer;color: #1c1c1c;"
      >
        {{ $t("new.finance.operate.transferable") }}:
        {{ parseInt(useUSDT).toFixed(2) }} {{ unit }}
      </a>
    </div>
    <div class="withdrawNumberInput">
      <Input
        v-model="price"
        :placeholder="$t('new.finance.operate.enterTransferred')"
        style="width: 100%"
      >
        <span slot="append">
          <span style="margin-right: 24px;">{{ unit }}</span>
          <span
            style="color: #03C59E;cursor: pointer;"
            @click="handleMax(parseInt(useUSDT).toFixed(2))"
            >{{ $t("activity.all") }}</span
          >
        </span>
      </Input>
    </div>
    <Button type="primary" long @click="submit" style="margin-top: 40px;">{{
      $t("follow.universal.submit")
    }}</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromType: null,
      toType: null,
      price: null,
      unit: null,
      // 可轉金額来源
      canExchange: [],
      useUSDT: "0",
      selectAll: [],
      fromColumns: [],
      toColumns: [],
      checkValue: 0,
      resData: [],
      detailData: {},
    };
  },
  computed: {
    statusFormatter() {
      return (status) => {
        switch (status) {
          case 1:
            return this.$t("new.universal.cashAccount");
          case 2:
            return this.$t("new.universal.contractAccount");
          case 6:
            return this.$t("new.universal.assetAccounts");
          case 9:
            return this.$t("new.universal.documentaryPrincipal");
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
  },
  mounted() {
    this.fromColumns = this.selectAll;
    this.toColumns = this.selectAll;

    this.getCoinData();
  },
  methods: {
    // 提交
    submit() {
      var params = {};
      params["fromType"] = this.fromType;
      params["toType"] = this.toType;
      params["price"] = this.price;
      params["unit"] = this.unit;
      params["symbol"] = "null";
      this.$http
        .post(this.host + this.api.FinanceChange.transferSubmit, params)
        .then((response) => {
          const res = response.data;
          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("new.finance.operate.transferSuccess"),
            });
            this.$emit("closeModal");
          } else {
            this.$Notice.error({
              title: res.message,
            });
          }
        });
    },
    // 最大
    handleMax(num) {
      // this.withdrawNumber = num
      this.price = num;
    },
    handleFromOpen() {
      this.fromColumns = this.selectAll.filter((item) => {
        return item.type != this.toType;
      });
    },
    handleToOpen() {
      this.toColumns = this.selectAll.filter((item) => {
        return item.type != this.fromType;
      });
    },
    // 上下交換
    handleExchange() {
      let exchangeTo = this.toType;
      let exchangeFrom = this.fromType;
      this.fromColumns = this.selectAll;
      this.toColumns = this.selectAll;
      this.fromType = exchangeTo;
      this.toType = exchangeFrom;

      (this.price = null),
        (this.canExchange = this.selectAll.filter((item) => {
          return item.type == this.fromType;
        }));
      this.useUSDT = this.canExchange[0].useUSDT;
    },
    // 选择币种
    handleFromChange(res) {
      if (this.fromType != null) {
        this.canExchange = this.selectAll.filter((item) => {
          return item.type == this.fromType;
        });
        this.useUSDT = this.canExchange[0].useUSDT;
      }
    },
    handleToChange(res) {
      //   this.toType = res.value
      //   console.log(this.toType)
    },
    // 獲取幣種可劃轉賬戶
    getCanTransferAccount() {
      this.$http
        .get(this.host + this.api.finance.canTransferAccount, {
          params: {
            unit: this.unit,
          }
        })
        .then((res) => {
          this.selectAll = res.data.data;
        });
    },
    // 选择币种
    seleceChange(res) {
      this.fromColumns = null;
      this.toColumns = null;
      (this.fromType = null),
        (this.toType = null),
        (this.price = null),
        (this.useUSDT = "0");
      this.unit = res.label;
      this.getCanTransferAccount();
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      // params['type'] = '0'
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/2`, params)
        .then((res) => {
          this.resData = res.data.data;
          this.detailData = this.resData[0];
          this.unit = this.resData[0].unit;
          this.loading = false;
          // 獲取幣種可劃轉賬戶
          this.getCanTransferAccount();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.selects_part {
  display: flex;
  align-items: center;
  .selects {
    flex: 0.9;
    .select_line {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
  }
  .exchange {
    flex: 0.1;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      transform: rotate(90deg);
      cursor: pointer;
    }
  }
}
</style>
