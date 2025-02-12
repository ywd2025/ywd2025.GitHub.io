<template>
  <div>
    <div class="isLogin" v-if="isLogin" style="display: flex">
      <!-- 個人中心 -->
      <Poptip
        style="display: flex; align-items: center"
        trigger="hover"
        width="283"
        placement="bottom-end"
        @on-popper-show="handleuserVerifyStatus"
      >
        <div class="myIcon_style">
          <img :src="$imgUrl + '/newUi/myIcon.png'" alt="" class="myIcon" />
        </div>
        <div class="active_poptip" slot="content">
          <div class="userHeader">
            <div class="userHeader_img">
              <img :src="member.avatar" alt="" class="userHeader_img_img" />
            </div>
            <div>
              <div class="userHeader_username">{{ member.username }}</div>
              <div class="userHeader_Uid">UID: {{ member.id }}</div>
              <div class="userHeader_tab">
                <!-- <div class="userHeader_tab_grey mr_right">{{$t("newUi.text4")}}</div> -->
                <div
                  v-if="userVerifyStatus == 2"
                  class="userHeader_tab_green mr_right"
                >
                  {{ $t("newUi.text2") }}
                </div>
                <div v-else class="userHeader_tab_red">
                  {{ $t("newUi.text3") }}
                </div>
              </div>
            </div>
          </div>
          <div class="userLink">
            <div @click="link_to('/user')" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead1.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("new.app.overview") }}</div>
            </div>
            <div @click="link_to('/orders/spot/open')" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead2.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("new.app.orders") }}</div>
            </div>
            <div @click="link_to('')" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead3.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("newUi.text5") }}</div>
            </div>
            <div @click="link_to()" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead4.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("newUi.text6") }}</div>
            </div>
            <div @click="link_to()" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead5.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("newUi.text7") }}</div>
            </div>
            <div @click="link_to()" class="userLink_to">
              <img
                :src="$imgUrl + '/newUi/userhead6.png'"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("newUi.text8") }}</div>
            </div>
            <div @click="logout" class="userlogin_out">
              {{ $t("new.app.logOut") }}
            </div>
          </div>
        </div>
      </Poptip>
      <!-- 資產 -->
      <Poptip
        @on-popper-show="handlePropertyIn"
        @on-popper-hide="handlePropertyOut"
        style="display: flex; align-items: center"
        trigger="hover"
        width="304"
        placement="bottom-end"
      >
        <div class="watel">
          <router-link to="/finance/all">
            <img :src="$imgUrl + '/newUi/mywatel.png'" alt="" class="mywatel" />
          </router-link>
        </div>
        <div class="property_poptip" slot="content">
          <div class="property_header">
            <div class="property_header_title">
              <span class="header_title_text">{{ $t("newUi.text9") }}</span>
              <Icon
                @click.prevent="numberShow = false"
                v-if="numberShow"
                type="md-eye"
                class="eyesIcon"
              />
              <Icon
                @click.prevent="numberShow = true"
                v-else
                type="md-eye-off"
                class="eyesIcon"
              />
            </div>
            <div class="property_header_coin">
              <span v-if="numberShow">
                {{ parseFloat(allData.all).toFixed(2) }}
                <span class="coinType">USDT</span>
              </span>
              <span v-else> ********** </span>
            </div>
            <div class="property_header_unit">
              <span v-if="numberShow">
                <span> ≈ </span>
                {{ pricingStatus }}
                <span>{{ parseFloat(allData.allCNY).toFixed(2) }}</span>
              </span>
              <span v-else>**********</span>
            </div>
            <div class="property_header_btn">
              <div
                class="property_header_btngreeen"
                @click="link_to('/finance/deposit')"
              >
                <img
                  :src="$imgUrl + '/newUi/greenbtn.png'"
                  alt=""
                  class="colorbtn"
                />
                <div>{{ $t("new.universal.fill") }}</div>
              </div>
              <div
                class="property_header_btnblue"
                @click="link_to('/finance/withdraw')"
              >
                <img
                  :src="$imgUrl + '/newUi/bluebtn.png'"
                  alt=""
                  class="colorbtn"
                />
                <div>{{ $t("new.universal.withdraw") }}</div>
              </div>
            </div>
          </div>
          <div class="userLink">
            <div @click="link_to('/finance/all')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli1.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("new.finance.overview") }}</div>
            </div>
            <div @click="link_to('/finance/property')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli2.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">
                {{ $t("new.finance.assetAccount") }}
              </div>
            </div>
            <div @click="link_to('/finance/spot')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli3.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">
                {{ $t("new.records.cashAccount") }}
              </div>
            </div>
            <div @click="link_to('/finance/futures')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli4.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">
                {{ $t("new.universal.contractAccount") }}
              </div>
            </div>
            <div @click="link_to('/finance/follow')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli5.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("carouselItem.text62") }}</div>
            </div>
            <div @click="link_to('/record/all')" class="userLink_to">
              <img
                src="../../assets/images/newUi/watli6.png"
                alt=""
                class="userLink_img"
              />
              <div class="userLink_name">{{ $t("newUi.text10") }}</div>
            </div>
          </div>
        </div>
      </Poptip>
      <Poptip
        style="display: flex; align-items: center;margin-left: 20px;cursor: pointer;"
        trigger="hover"
        width="304"
        placement="bottom-end"
        @on-popper-show="popper_show"
      >
        <div class="allMessage">
          <img
            :src="$imgUrl + '/newUi/allMessage.png'"
            alt=""
            class="allMessage_img"
          />
        </div>
        <div class="content_poptip" slot="content">
          <div
            class="rowAll scroll-container"
            ref="scrollContainer"
            @scroll="handleScroll"
            v-if="PageMayList.length > 0"
          >
            <div
              v-for="(item, index) in PageMayList"
              :key="index"
              class="rowAll_for"
              @click="go_notice(item)"
            >
              <div class="rowTitle">
                <div v-if="item.readState == 0" class="red_zero"></div>
                <div v-else style="width: 6px;"></div>
                {{ item.title }}
              </div>
              <div class="rowContent">{{ item.content }}</div>
              <div class="rowTime">{{ item.createTime }}</div>
            </div>
            <div class="poptip_mores" v-if="hasMore">
              {{ $t("otc.chatline.loadmore") }}
            </div>
            <div class="poptip_mores" v-if="!hasMore">
              {{ $t("dolphin.text82") }}
            </div>
          </div>
          <div v-else class="nodata">
            {{ $t("dolphin.text60") }}
          </div>
        </div>
      </Poptip>
    </div>
    <div class="login_register" v-else>
      <div @click="goPage('login')" class="login_btn">
        {{ $t("common.login") }}
      </div>
      <div @click="goPage('register')" class="register_btn">
        {{ $t("common.register") }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activesProperty: true, // 資產
      activesNotice: true, // 站内消息
      PageMayList: [], //站内消息
      pageNo: "1",
      hasMore: true,
      numberShow: false, // 小眼睛
      allData: {},
      activesOrder: true, // 訂單
      userVerifyStatus: "", //实名状态
    };
  },
  props: {},
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
  },
  created() {
    this.getReal();
    this.getPageMay();
  },
  methods: {
    handleuserVerifyStatus() {
      this.getReal();
    },
    // 是否实名
    getReal() {
      if (!this.isLogin) {
        return;
      }
      this.$http.post(this.host + this.api.user.real, {}).then((res) => {
        // 0待审核1审核失败2审核成功
        this.userVerifyStatus = res.data.data.auditStatus;
      });
    },
    // 登录注册跳页
    goPage(addr) {
      this.$router.push(`/${addr}`);
    },
    // 資產
    handlePropertyIn() {
      this.$http
        .get(this.host + this.api.finance.allFinance, {
          params: { rateStr: this.$store.state.pricing },
        })
        .then((res) => {
          this.pricingStatus = this.$store.state.pricing;
          var resData = res.data.data;
          this.allData = resData;
        });
      // 更新汇率
      this.$store.dispatch("getAllRateActions");
      this.activesProperty = false;
    },
    handlePropertyOut() {
      this.activesProperty = true;
    },
    // 訂單
    handleOrderIn() {
      this.activesOrder = false;
    },
    handleOrderOut() {
      this.activesOrder = true;
    },
    logout() {
      this.$http
        .post(this.host + this.api.login.loginOut, {})
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(resp.message);
            this.$store.commit("setMember", null);
            this.$store.commit("LOGOUT");
            setTimeout(() => {
              location.href = "/";
              localStorage.removeItem("tradeType");
            }, 1500);
          } else {
            this.$Message.error(resp.message);
          }
        });
    },

    getPageMay() {
      if (!this.isLogin) {
        return;
      }
      if (!this.hasMore) return;
      this.$http
        .get(this.host + this.api.user.pageMy, {
          params: {
            pageNo: this.pageNo,
            pageSize: "10",
            paramLang: "1",
          },
        })
        .then((res) => {
          if (res.data.data.content && res.data.data.content.length > 0) {
            this.PageMayList.push(...res.data.data.content);
            this.pageNo++; // 增加页码
          }
          // 更新是否还有更多数据的状态
          this.hasMore =
            this.pageNo <= Math.ceil(res.data.data.totalElements / 10);
          // 更新加载状态
        });
    },
    go_notice(item) {
      this.$router.push({
        name: "noticeAll",
        params: {
          id: item.id,
        },
      });
    },
    popper_show() {
      this.hand_allList();
    },
    hand_allList() {
      this.PageMayList = [];
      this.pageNo = 1;
      this.hasMore = true;
      this.getPageMay();
    },
    handleScroll() {
      const container = this.$refs.scrollContainer;
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        this.getPageMay();
      }
    },
    // 跳转
    link_to(url) {
      if (url) {
        this.$router.push(url);
      } else {
        this.$Message.error(this.$t("common.expect"));
      }
    },
  },
};
</script>
<style lang="less" scoped>
.isLogin {
  display: flex;
  align-items: center;
}
.login_register {
  display: flex;
  align-items: center;
  padding-right: 20px;
  line-height: 40px;
  .login_btn {
    width: 100px;
    height: 38px;
    text-align: center;
    cursor: pointer;
  }
  .register_btn {
    width: 100px;
    height: 38px;
    background: #35e9c5;
    border-radius: 10px 10px 10px 10px;
    text-align: center;
    cursor: pointer;
  }
}
.myIcon_style {
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}
.myIcon {
  width: 20px;
  height: 20px;
}
.mywatel {
  width: 20px;
  height: 14px;
}
.active_poptip {
  padding: 10px 0;
  .userHeader {
    display: flex;
    align-items: center;
    .userHeader_img {
      width: 63px;
      height: 63px;
      margin-right: 16px;
      .userHeader_img_img {
        width: 63px;
        height: 63px;
        border: 50%;
      }
    }
    .userHeader_username {
      width: 150px;
      font-weight: 500;
      font-size: 15px;
      color: #000000;
      margin-bottom: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .userHeader_Uid {
      font-weight: 400;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.54);
    }
    .userHeader_tab {
      margin-top: 5px;
      display: flex;
      align-items: center;
      .userHeader_tab_grey {
        height: 14px;
        padding: 2px;
        font-weight: 400;
        font-size: 8px;
        color: #202020;
        background: #e5e5e5;
        border-radius: 3px 3px 3px 3px;
      }
      .userHeader_tab_green {
        height: 14px;
        padding: 2px;
        font-weight: 400;
        font-size: 8px;
        color: #00896d;
        background: #dafff7;
        border-radius: 3px 3px 3px 3px;
      }
      .userHeader_tab_red {
        height: 14px;
        padding: 2px;
        font-weight: 400;
        font-size: 8px;
        color: #ff4444;
        background: #ffdcdc;
        border-radius: 3px 3px 3px 3px;
      }
      .mr_right {
        margin-right: 5px;
      }
    }
  }
}
.watel {
  margin: 3px 0 0 20px;
}
.property_poptip {
  padding: 18px 0;
  .property_header {
    padding: 0 20px;
    .property_header_title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .header_title_text {
        font-weight: 400;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.54);
        margin-right: 10px;
      }
    }
    .property_header_coin {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      font-size: 24px;
      color: #000000;
      .coinType {
        font-weight: 400;
        font-size: 11px;
        color: #000000;
        margin-left: 5px;
      }
    }
    .property_header_unit {
      font-weight: 400;
      font-size: 11px;
      color: #000000;
      margin-top: 8px;
    }
    .property_header_btn {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .property_header_btngreeen {
        width: 113px;
        height: 38px;
        background: #2be8c2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        .colorbtn {
          width: 21px;
          height: 21px;
          margin: 0 19px 0 10px;
        }
      }
      .property_header_btnblue {
        width: 113px;
        height: 38px;
        background: #4dbef9;
        border-radius: 10px;
        display: flex;
        align-items: center;
        color: #fff;
        cursor: pointer;
        .colorbtn {
          width: 21px;
          height: 21px;
          margin: 0 19px 0 10px;
        }
      }
    }
  }
}
.allMessage {
  cursor: pointer;
  margin-right: 20px;
  display: flex;
  align-items: center;
  .allMessage_img {
    width: 17px;
    height: 20px;
  }
}

.userLink {
  margin-top: 25px;
  .userLink_to {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 45px;
    padding: 0 20px;
    .userLink_img {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
    .userLink_name {
      font-weight: 500;
      font-size: 15px;
      color: #000000;
    }
  }
  .userLink_to:hover {
    background: #f9f9f9;
  }
  .userlogin_out {
    font-weight: 500;
    font-size: 15px;
    color: #000000;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    height: 40px;
    border-top: 1px solid #f6f6f6;
    cursor: pointer;
  }
}
.content_poptip {
  height: 400px;
  padding: 10px 0 0 10px;
  background-color: #fff;
  border-radius: 50px 50px 50px 50px;
  position: relative;
  .rowAll {
    width: 100%;
    height: 380px;
    color: #333;
    overflow-y: auto;
    .rowAll_for {
      margin-bottom: 10px;
      .rowTitle {
        color: #000;
        font-size: 14px;
        width: 90%;
        white-space: nowrap; /* 文本不会换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        .red_zero {
          background-color: #F6465D;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .rowContent {
        color: #666;
        font-size: 14px;
        width: 90%;
        white-space: nowrap; /* 文本不会换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis;
      }
      .rowTime {
        color: #999;
        font-size: 12px;
      }
    }
    .rowAll_for:hover .rowTitle {
      color: #35DCBB;
    }
  }
  .rowAll::-webkit-scrollbar {
    display: none;
  }
  .nodata {
    width: 100%;
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .poptip_mores {
    width: 100%;
    border-radius: 0 0 5px 5px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #35DCBB;
  }
}
</style>
