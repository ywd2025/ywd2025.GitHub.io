<template>
  <footer class="footer_part">
    <div class="footer_content">
      <div class="right">
        <div class="right_lists" v-for="(topItem, index) in lists" :key="index">
          <span class="right_title">{{ topItem.title }}</span>
          <div
            class="right_list"
            v-for="(listItem, index) in topItem.listItems"
            :key="index"
          >
            <span
              @click="goPage(listItem.url)"
              v-if="listItem.type === 'router'"
              class="right_content_title"
            >
              {{ listItem.title }}
            </span>
            <span
              @click="openModel(listItem.url)"
              v-else-if="listItem.type === 'modal'"
              class="right_content_title"
            >
              {{ listItem.title }}
            </span>
            <a
              v-else
              :href="listItem.url"
              class="right_content_title"
              target="_blank"
            >
              {{ listItem.title }}
            </a>
          </div>
        </div>
        <div class="left">
          <div class="left_title">社区</div>
          <ul class="left_lists">
            <li
              v-for="item in friendlyLink"
              :key="item.id"
              style="width: 32px;height: 32px;margin: 0 20px 16px 0;"
            >
              <a
                class="block text-black hover:opacity-100"
                :href="item.url"
                target="_blank"
              >
                <img style="width: 32px; height: 32px;" :src="item.picture" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer_bottom">© 2024 SE All Rights Reserved</div>
    <Modal v-model="textModel" :footer-hide="true">
      <div
        v-html="content"
        style="white-space: normal;word-break: break-all;margin-top: 20px;"
      ></div>
    </Modal>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      textModel: false,
      friendlyLink: [],
      lists: [
        {
          title: this.$t("new.footer.aboutUs"),
          listItems: [
            // {
            //   url: "about_us",
            //   title: this.$t("new.footer.aboutUs"),
            //   type: "modal",
            // },
            {
              url: "service",
              title: this.$t("new.footer.serviceAgreement"),
              type: "modal",
            },
            {
              url: "private",
              title: this.$t("new.footer.privacyPolicy"),
              type: "modal",
            },
            // {
            //   url: "",
            //   title: this.$t("carouselItem.text272"),
            //   type: "href",
            // },
            // {
            //   url: "",
            //   title: this.$t("carouselItem.text273"),
            //   type: "href",
            // },
          ],
        },
        {
          title: "产品",
          listItems: [
            {
              url: "/exchange",
              title: "现货",
              type: "router",
            },
            {
              url: "/swap",
              title: "合约",
              type: "router",
            },
            {
              url: "/financing",
              title: "理财",
              type: "router",
            },
            {
              url: "/flashExchange",
              title: "闪兑",
              type: "router",
            },
          ],
        },
        {
          title: "活动",
          listItems: [
            {
              url: "/intelligence",
              title: "情报中心",
              type: "router",
            },
            {
              url: "",
              title: "合约大赛",
              type: "router",
            },
            {
              url: "",
              title: "IEO",
              type: "router",
            },
          ],
        },
        {
          title: "用户支持",
          listItems: [
            {
              url: "",
              title: "7*24H" + this.$t("new.footer.customerService"),
              type: "href",
            },
            {
              url: "/help",
              title: this.$t("new.footer.guide"),
              type: "router",
            },
            {
              url: "/feedback",
              title: this.$t("carouselItem.text207"),
              type: "router",
            },
            {
              url: "/help",
              title: this.$t("new.footer.helpCenter"),
              type: "router",
            },
            // {
            //   url: "/notice",
            //   title: this.$t("new.footer.announcement"),
            //   type: "router",
            // },
          ],
        },
      ],
      lang: this.$store.state.lang,
      isLogin: null,
      content: null,
    };
  },
  mounted() {
    this.isLogin = this.$store.getters.isLogin;
    this.getFriendlyLink();
  },
  methods: {
    getFriendlyLink() {
      // 获取友情链接
      var paramFriendlyLink = {};
      (paramFriendlyLink["type"] = 1),
        this.$http
          .post(this.host + this.api.index.getFriendlyLinkList, {})
          .then((res) => {
            this.friendlyLink = res.data.data;
          });
    },
    goPage(url) {
      // console.log(url);
      if (this.isLogin) {
        this.$router.push(url);
      } else {
        this.$Message.info(this.$t("new.footer.loginFirst"));
      }
    },
    openModel(api) {
      // 获取字典数据
      this.$http
        .get(this.host + `${this.api.index.getDictionary}${api}`, {})
        .then((res) => {
          this.content = res.data.data;
          this.textModel = true;
        });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../assets/css/common.less");
.footer_part {
  margin-top: 80px;
  .right {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .right_lists {
      line-height: 26px;
      .right_title {
        font-weight: 700;
        font-size: 20px;
        color: #212121;
      }
      .right_list {
        font-size: 16px;
        margin-top: 16px;
        .right_content_title {
          cursor: pointer;
          font-weight: 500;
          font-size: 16px;
          color: #212121;
        }
      }
    }
    .left {
      .left_title {
        font-weight: 700;
        font-size: 20px;
        color: #212121;
      }
      .left_lists {
        margin-top: 24px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px 0;
      }
    }
  }

  .footer_bottom {
    margin: 50px auto 0;
    width: 1200px;
    border-top: 1px solid #e5e5e5;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #212121;
  }
}
</style>
