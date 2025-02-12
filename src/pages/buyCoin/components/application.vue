<template>
  <div>
    <div class="withdrawNumberInput">
      <h4>
        {{ $t("buyCoin.application.txt1") }}
      </h4>
      <div class="application_condition">
        <div class="application_condition_title">
          {{ $t("buyCoin.application.txt2") }}
        </div>
        <div class="conditions">
          <!-- <div class="condition">
            <div class="condition_left">
              <img :src="$imgUrl + '/common_icons/right.png'" alt="" />
              <div class="css-wc6ilo">完成手机号及邮箱绑定</div>
            </div>
            <div class="css-1nm8qxc">
              <Button type="primary" class="condition_button">去绑定</Button>
            </div>
          </div> -->
          <div class="condition">
            <div class="condition_left">
              <img
                v-if="userVerifyStatus == 2"
                :src="$imgUrl + '/common_icons/right.png'"
                alt=""
              />
              <img v-else :src="$imgUrl + '/common_icons/wrong.png'" alt="" />
              <div class="css-wc6ilo">{{ $t("buyCoin.application.txt3") }}</div>
            </div>
            <div class="css-1nm8qxc">
              <Button
                type="primary"
                :disabled="userVerifyStatus != null"
                class="condition_button"
                @click="goPage('/user')"
                >{{ $t("buyCoin.application.txt4") }}</Button
              >
            </div>
          </div>
          <div class="condition">
            <div class="condition_left">
              <img
                v-if="myDeposit >= deposit"
                :src="$imgUrl + '/common_icons/right.png'"
                alt=""
              />
              <img v-else :src="$imgUrl + '/common_icons/wrong.png'" alt="" />
              <div v-if="myDeposit < deposit" class="css-wc6ilo">
                {{ $t("carouselItem.text257") }} {{ deposit }} USDT
              </div>
              <div v-else class="css-wc6ilo">
                {{ $t("carouselItem.text258") }} {{ deposit }} USDT
              </div>
            </div>
            <div class="css-1nm8qxc">
              <Button
                type="primary"
                class="condition_button"
                :disabled="myDeposit >= deposit"
                @click="submit"
                >{{ $t("carouselItem.text259") }}</Button
              >
            </div>
          </div>
        </div>
      </div>
      <!-- <Input
        v-model="shopName"
        :placeholder="$t('buyCoin.application.txt7')"
        style="width: 100%"
      ></Input> -->
    </div>
    <Button type="primary" long @click="submit" style="margin-top: 40px;">{{
      $t("buyCoin.universal.submit")
    }}</Button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopName: "",
      userVerifyStatus: null,
      deposit: null,
      myDeposit: null,
    };
  },
  computed: {
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
    // 获取用户身份信息
    this.getReal();
    // 获取押金
    this.getDeposit();
  },
  methods: {
    // 獲取實名狀態
    getReal() {
      this.$http.post(this.host + this.api.user.real, {}).then((res) => {
        // 0待审核1审核失败2审核成功
        this.userVerifyStatus = res.data.data.auditStatus;
      });
    },
    getDeposit() {
      this.$http.get(this.host + this.api.buy.getDepositApi, {}).then((res) => {
        this.deposit = res.data.data;
      });
      this.$http
        .get(this.host + this.api.buy.getMyDepositApi, {})
        .then((res) => {
          this.myDeposit = res.data.data;
        });
    },
    // 提交
    submit() {
      var params = {};
      // params["shopName"] = this.shopName;
      this.$http
        .post(this.host + this.api.buy.payDepositApi, {})
        .then((response) => {
          const res = response.data;
          if (res.code == 0) {
            this.$Notice.success({
              title: this.$t("buyCoin.application.txt8"),
            });
            this.$emit("closeModal");
          } else {
            this.$Notice.error({
              title: res.message,
            });
          }
        });
    },
    goPage(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
.application_condition {
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  border-radius: 10px;
  flex: 1 1 0%;
  border: 1px solid rgb(192, 192, 192);
  padding: 14px;
  flex-direction: column;
  text-align: left;
  margin: 10px 0 20px 0;
  .application_condition_title {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
  }
  .conditions {
    box-sizing: border-box;
    margin: 8px 0px 0px;
    min-width: 0px;
    display: flex;
    flex-direction: column;
    .condition {
      box-sizing: border-box;
      margin: 2px 0;
      min-width: 0px;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      flex-wrap: wrap;
      -webkit-box-align: center;
      align-items: center;
      .condition_left {
        display: flex;
        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
      }
      .condition_button {
        height: 24px;
      }
    }
  }
}
</style>
