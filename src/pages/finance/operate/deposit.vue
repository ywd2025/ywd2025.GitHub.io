<template>
  <div class="finance_content">
    <div class="title">
      <span>
        <Icon
          @click="goBack()"
          type="ios-arrow-back"
          style="margin-right: 20px;"
        />{{ $t("new.universal.fill") }}
      </span>
      <!-- <Button type="primary" @click="goPage('/finance/verify')">{{
        $t("new.finance.operate.topAudit")
      }}</Button> -->
    </div>
    <div class="finance_operate">
      <div>
        <div style="margin-bottom: 16px;">
          {{ $t("new.finance.operate.ChooseCurrency") }}
        </div>
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
        <div style="margin: 20px 0 12px;">
          {{ $t("new.finance.operate.address") }}
        </div>
        <div
          class="address_part"
          v-for="(item, index) in coldWalletAddress"
          :key="index"
        >
          <span class="font-medium">
            <span style="margin-right: 2px;" v-if="item.ciName != null">
              {{ item.ciName }}: </span
            >{{ item.address }}
          </span>
          <div class="flex items-center">
            <Icon
              type="md-albums"
              style="cursor: pointer;"
              @click="copyLink(item.address)"
            />
          </div>
        </div>
        <div class="number_part">
          <div class="mt-5 text-t1">
            <div style="font-size: 14px;line-height: 20px;color: #6f6f6f;">
              {{ $t("new.finance.operate.minimumAmount") }}
            </div>
            <div
              style="margin-top: 10px;line-height: 24px;color: #1c1c1c;font-size: 16px;"
            >
              {{ detailData.minRechargeAmount }} {{ detailData.unit }}
            </div>
          </div>
        </div>
        <ul class="tips_part">
          <li>
            <span>{{ $t("new.finance.operate.tips1") }}</span>
          </li>
          <li>
            <span>
              {{ $t("new.finance.operate.tips2") }}
            </span>
          </li>
          <li>
            <span>
              {{ $t("new.finance.operate.tips3") }}
            </span>
          </li>
        </ul>
      </div>

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

    <div class="recentRecord">
      <div class="recentRecord_title">
        <div class="recentRecord_left">
          <div style="font-size: 16px;">
            {{ $t("new.finance.operate.recentChargeRecord") }}
          </div>
        </div>
        <div class="recentRecord_right">
          <Button type="text" size="small" @click="goPage('/record/deposit')">{{
            $t("new.finance.operate.allRecords")
          }}</Button>
        </div>
      </div>
      <div class="table_part">
        <Table :columns="columns" :data="recordsList" :no-data-text="$t('common.nodata')">
          <template slot-scope="{ row, index }" slot="address">
            {{ lengFilters(row.address) }}
            <Icon
              type="md-albums"
              style="cursor: pointer;"
              @click="copyLink(row.address)"
            />
          </template>
          <template slot-scope="{ row, index }" slot="txid">
            {{ lengFilters(row.txid) }}
            <Icon
              type="md-albums"
              style="cursor: pointer;"
              @click="copyLink(row.txid)"
            />
          </template>
          <template slot-scope="{ row, index }" slot="status">
            {{ statusFormatter(row.status) }}
          </template>
          <template slot-scope="{ row, index }" slot="detail">
            <Button type="text" @click="handleDetailModal(row)">{{
              $t("new.universal.moreDetails")
            }}</Button>
          </template>
        </Table>
      </div>
    </div>

    <Modal v-model="detailModal" width="360">
      <p slot="header" style="text-align:left">
        <span>{{ $t("new.universal.chargeDetails") }}</span>
      </p>
      <List :border="false" size="small">
        <ListItem>
          <ListItemMeta :title="$t('new.universal.state')" />
          <template slot="extra">
            {{ statusFormatter(rowData.status) }}
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta :title="$t('new.universal.time')" />
          <template slot="extra">
            {{ rowData.createTime }}
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta :title="$t('new.universal.currency')" />
          <template slot="extra">
            {{ rowData.unit }}
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta :title="$t('uc.finance.recharge.amount')" />
          <template slot="extra">
            {{ rowData.amount }}
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta :title="$t('new.universal.address')" />
          <template slot="extra">
            <div class="text_break" style="width: 230px;">
              {{ rowData.address }}
              <Icon
                type="md-albums"
                style="cursor: pointer;"
                @click="copyLink(rowData.address)"
              />
            </div>
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta title="TxID" />
          <template slot="extra">
            <div class="text_break" style="width: 230px;">
              {{ rowData.txid }}
              <Icon
                type="md-albums"
                style="cursor: pointer;"
                @click="copyLink(rowData.TxID)"
              />
            </div>
          </template>
        </ListItem>
        <ListItem>
          <ListItemMeta :title="$t('carouselItem.text71')" />
          <template slot="extra">
            {{ rowData.walletBalance }}
          </template>
        </ListItem>
        <!-- <ListItem style="display: flex;justify-content: space-between;">
          <div>{{$t('carouselItem.text72')}}</div>
          <div style="text-align: right;">{{ rowData.auditResult }}</div>
        </ListItem> -->
      </List>
      <div slot="footer">
        <Button
          v-if="rowData.status === '0'"
          type="primary"
          size="large"
          long
          @click="sumitVerify"
          >{{$t('uc.identity.review')}}</Button
        >
        <Button
          v-else-if="rowData.status === '1'"
          type="primary"
          size="large"
          long
          @click="detailModal = false"
          >{{$t('uc.otcorder.finished')}}</Button
        >
        <Button
          v-else-if="rowData.status === '2'"
          type="primary"
          size="large"
          long
          @click="sumitVerify"
          >{{$t('carouselItem.text73')}}</Button
        >
        <Button
          v-else
          type="primary"
          size="large"
          long
          @click="detailModal = false"
          >{{ rowData.status }}{{$t('uc.safe.binding')}}</Button
        >
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
      resData: [],
      // 充幣記錄
      recordsList: [],
      checkValue: 0,
      detailData: {},
      columns: [
        {
          title: this.$t("new.universal.time"),
          key: "createTime",
          align: "left",
        },
        {
          title: this.$t("new.universal.currency"),
          key: "unit",
          width: 80,
        },
        {
          title: this.$t("new.universal.quantity"),
          key: "amount",
          width: 80,
        },
        {
          title: this.$t("new.universal.address"),
          slot: "address",
          minWidth: 120,
        },
        {
          title: "TxID",
          slot: "txid",
          minWidth: 120,
        },
        {
          title: this.$t("new.universal.state"),
          slot: "status",
          width: 80,
        },
        {
          title: this.$t("carouselItem.text74"),
          slot: "detail",
          align: "center",
          minWidth: 100,
        },
      ],
      // 詳情彈窗
      detailModal: false,
      // 詳情數據
      rowData: {},
      // 充幣地址
      coldWalletAddress: [],
      // 幣種名
      coinName: "",
    };
  },
  created() {
    // 判断是否实名, 没实名去实名
    this.getUserVerifyStatus();
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    statusFormatter() {
      return (status) => {
        switch (status) {
          case "0":
            return this.$t("new.universal.beConfirmed");
          case "1":
            return this.$t("new.universal.success");
          case "2":
            return this.$t("new.universal.failure");
          case "4":
            return this.$t("carouselItem.text75");
          case "5":
            return this.$t("carouselItem.text76");
          case "6":
            return this.$t("carouselItem.text77");
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
  },
  methods: {
    // 获取实名状态
    getUserVerifyStatus() {
      this.$http.post(this.host + this.api.user.real, {}).then((res) => {
        // console.log(111111, res);
        var userVerifyStatus = res.data.data.auditStatus;
        // console.log(111111, userVerifyStatus);
        // 0待审核1审核失败2审核成功
        if (userVerifyStatus == 2) {
          this.getCoinData();
          this.getDepositRecordsList();
        } else {
          this.$Message.error({
            content: this.$t("carouselItem.text78"),
            duration: 3,
          });
          setTimeout(() => {
            this.$router.push("/user");
          }, 3000);
        }
      });
    },

    // 提交審核
    sumitVerify() {},
    // 詳情彈窗
    handleDetailModal(rowData) {
      this.rowData = rowData;
      this.detailModal = true;
    },
    // 跳轉全部記錄
    goPage(url) {
      this.$router.push({
        path: url,
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
    // 选择币种
    seleceChange(res) {
      this.detailData = this.resData[res.value];
      this.coinName = this.resData[res.value].unit;
      // 獲取鏈地址
      this.getDepositAddress();
    },
    // 獲取幣種信息
    getCoinData() {
      var params = {};
      this.$http
        .get(this.host + `${this.api.FinanceChange.deposit}/0`, params)
        .then((res) => {
          this.resData = res.data.data;
          this.detailData = this.resData[0];

          this.coinName = this.resData[0].unit;
          // 獲取鏈地址
          this.getDepositAddress();

          this.loading = false;
        });
    },
    // 獲取鏈地址
    getDepositAddress() {
      this.$http
        .get(
          this.host +
            `${this.api.FinanceChange.depositAddress}${this.coinName}`,
          {}
        )
        .then((res) => {
          console.log(res);
          this.coldWalletAddress = res.data.data;
          if (this.coldWalletAddress[0].address === null) {
            this.resetAddress();
            setTimeout(() => {
              this.getDepositAddress();
            }, 3000);
          }
        });
    },
    //  地址獲取為空重置地址
    resetAddress() {
      this.$http
        .get(this.host + `${this.api.FinanceChange.resetAddress}`, {})
        .then((res) => {});
    },
    // 獲取充幣記錄
    getDepositRecordsList() {
      let params = {
        pageNo: 1,
        pageSize: 3,
        status: "",
      };
      this.$http
        .post(this.host + this.api.record.depositRecord, params)
        .then((res) => {
          this.recordsList = res.body.data.content.slice(0, 3);
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
</style>
