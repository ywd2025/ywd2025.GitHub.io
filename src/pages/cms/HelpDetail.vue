<template>
  <div class="helpdetail">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="route-wrap">
      <router-link to="help">{{ $t("header.helpcenter") }}</router-link>
      <span>></span>
      <span>{{ helpdetail.title }}</span>
    </div>
    <div class="main">
      <div class="menu">
        <p style="color: #74777a;">{{ $t("cms.otherhelp") }}</p>
        <div class="titles">
          <div
            class="route"
            v-for="(item, index) in helpdetail.content"
            @click="clickTitle(item, index)"
            :class="{ active: item.id == article.id }"
          >
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="content-wrap">
        <h3 class="title">{{ article.title }}</h3>
        <p class="time">{{ article.createTime }}</p>
        <div class="content">
          <div v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueQriously from "vue-qriously";
Vue.use(VueQriously);

export default {
  components: {
    VueQriously,
  },
  data() {
    return {
      helpList: [], //文章列表
      helpdetail: {}, //列表下详情
      article: {}, //文章详情

      // 加载中
      spinShow: false,
    };
  },
  created() {
    console.log(this.$router.currentRoute.query.id);
    this.articleId = this.$router.currentRoute.query.id;
    this.init();
    this.getData();
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    langPram() {
      return this.$store.state.lang;
    },
  },
  methods: {
    init() {
    },
    getData() {
      this.spinShow = true;
      const Dic = [
        this.$t("helpPage.helpPage_text1"),
        this.$t("helpPage.helpPage_text2"),
        this.$t("helpPage.helpPage_text3"),
        this.$t("helpPage.helpPage_text4"),
        this.$t("helpPage.helpPage_text5"),
        this.$t("helpPage.helpPage_text6"),
        this.$t("helpPage.helpPage_text7"),
        this.$t("helpPage.helpPage_text8"),
        this.$t("helpPage.helpPage_text9"),
      ];
      this.helpList = [];
      this.$http
        .get(
          this.host +
            this.api.help.helpCountApi, {
              params: {
                lang: this.langPram,
                content:''
              },
            }
        )
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.$http
              .get(
                this.host +
                  this.api.help.helpListApi, {
                    params: {
                      lang: this.langPram,
                      sysHelpClassification: res.data.data[i],
                    },
                  }
              )
              .then((listRes) => {
                let helpItem = {};
                helpItem.id = res.data.data[i];
                helpItem.title = Dic[res.data.data[i]];
                helpItem.content = listRes.data.data.slice(0, 4);
                this.helpList.push(helpItem);
                if (helpItem.id == this.articleId) {
                  this.helpdetail = helpItem;
                  if (helpItem.content.length <= 0) {
                    this.$Message.warning(this.$t('carouselItem.text69'));
                  } else {
                    this.article = helpItem.content[0];
                  }
                  this.spinShow = false;
                }
              });
          }
        });
    },

    clickTitle(item) {
      this.spinShow = true;
      for (let i = 0; i < this.helpdetail.content.length; i++) {
        if (this.helpdetail.content[i].id == item.id) {
          this.article = this.helpdetail.content[i];
          this.spinShow = false;
        }
      }
    },
    // getTop() {
    //   return this.$http.post(this.host + "/uc/ancillary/more/help/page/top", {
    //     cate: this.cate,
    //     lang: this.langPram,
    //   });
    // },
    // getArticle() {
    //   return this.$http.post(this.host + "/uc/ancillary/more/help/detail", {
    //     id: this.id,
    //   });
    // },
    // init() {
    //   Promise.all([this.getTop(), this.getArticle()]).then((arr) => {
    //     if (
    //       arr[0].status == 200 &&
    //       arr[0].body.code == 0 &&
    //       arr[1].status == 200 &&
    //       arr[1].body.code == 0
    //     ) {
    //       let returnTop = arr[0].body.data,
    //         returnArticle = arr[1].body.data,
    //         hsaInTop = false;
    //       returnTop.forEach((v) => {
    //         if (v.id == returnArticle.id) {
    //           hsaInTop = true;
    //         }
    //       });
    //       hsaInTop ? "" : returnTop.unshift(returnArticle);
    //       this.topList = returnTop;
    //       this.article = returnArticle;
    //       window.document.title =
    //         (this.lang == "zh_cn" ? "帮助 - " : "Help - ") +
    //         this.article.title +
    //         " - betbit | Global digital currency trading platform";
    //     } else {
    //       this.$message.error("网络错误");
    //     }
    //   });
    // },
    // getTopList() {
    //   this.$http
    //     .post(this.host + "/uc/ancillary/more/help/page/top", {
    //       cate: this.cate,
    //       lang: this.langPram,
    //     })
    //     .then((res) => {
    //       if (res.status == 200 && res.body.code == 0) {
    //         this.topList = res.body.data;
    //       } else {
    //         this.$Message.error(res.body.message);
    //       }
    //     });
    // },
    // getData(id) {
    //   this.$http
    //     .post(this.host + "/uc/ancillary/more/help/detail", {
    //       id,
    //     })
    //     .then((res) => {
    //       if (res.status == 200 && res.body.code == 0) {
    //         this.article = res.body.data;
    //       } else {
    //         this.$Message.error(res.body.message);
    //       }
    //     });
    // },
  },
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 768px) {
  .main .content-wrap {
    margin-left: 0 !important;
    padding: 50px 20px !important;
  }
  .main .menu {
    display: none;
  }
  .helpdetail {
    position: relative;
    padding: 50px 0px 0px 0px !important;
  }
  .route-wrap {
    display: none;
  }
  .main .content-wrap .title {
    font-size: 20px !important;
    line-height: 36px !important;
    font-weight: normal;
  }
  .main .content-wrap .content {
    padding: 20px 0px 30px 0px !important;
  }
  .show-qrcode {
    display: none;
  }
  .app_bottom {
    display: block !important;
  }
  .footer_content {
    padding: 80px 2% 90px 5%;
  }
}
.helpdetail {
  background: #f2f6fa !important;
  color: #fff;
  width: 100%;
  margin: 0 auto;
  padding: 80px 10%;
  font-size: 14px;
}
.main {
  display: flex;
  .menu {
    flex: 0 0 200px;
    width: 200px;
    > p {
      line-height: 1;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .titles {
      margin-bottom: 20px;
    }
    > a {
      padding: 10px;
      color: #f1ab15;
    }
    .route {
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 10px;
      border-radius: 6px;
      line-height: 1.5;
      color: #fff;
      cursor: pointer;
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #828ea1;
      }
      &.active {
        background-color: #f1ab15;
        color: #fff;
        > span {
          color: #fff;
        }
      }
    }
  }
  .content-wrap {
    flex: 1 1 100%;
    width: 100%;
    margin-left: 35px;
    background: #fff;
    padding: 50px 50px;
    min-height: 800px;
    line-height: 25px;
    .title {
      font-size: 28px;
      line-height: 1;
      margin-bottom: 30px;
      color: #696969;
    }
    .time {
      color: #999;
      line-height: 1;
      margin-bottom: 20px;
      display: none;
    }
    .content {
      border-top: 1px solid #ebebeb;
      padding: 40px 0 10px 0;
      color: #74777a;
      letter-spacing: 1px;
      font-size: 14px;
    }
  }
}

.route-wrap {
  font-size: 14px;
  color: #f1ab15;
  margin-bottom: 40px;
  a {
    color: #f1ab15;
  }
}
</style>
<style lang="less">
.main .content-wrap .content {
  .uploaded-img {
    width: 100% !important;
  }
}
</style>
<style>
.app_bottom {
  display: none;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(242, 246, 250, 1) !important;
}
.app_bottom .left_logo img {
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.app_bottom .right_btn_wrap {
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
}
.app_bottom .right_btn {
  color: #fff;
  border-radius: 3px;
  padding: 0px 10px;
  line-height: 26px;
  height: 26px;
  display: block;
  margin-top: 7px;
  background: linear-gradient(200deg, #ff9900, #ffbe2b, #ffa500);
}
</style>
