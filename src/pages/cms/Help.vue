<template>
  <div class="help">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <img class="bannerimg" :src="$imgUrl + '/help_banner.jpg'" />
    <div class="help_container">
      <h1>{{ $t("header.helpcenter") }}</h1>
      <div class="main">
        <Card dis-hover class="section" v-for="item in helpList" :key="item.id">
          <!-- <h3>{{ item.title }}</h3> -->
          <p slot="title">{{ item.title }}</p>
          <div class="list-wrap">
            <router-link
              class="item"
              v-for="(contentItem, index) in item.content"
              :key="index"
              :title="contentItem.title"
              :to="{
                path: 'helpdetail',
                query: {
                  id: item.id,
                },
              }"
            >
              <span class="text">{{ contentItem.title }}</span>
            </router-link>
          </div>
          <div class="route-wrap" v-if="item.content.length > 0">
            <router-link
              :to="{
                path: 'helpdetail',
                query: { id: item.id },
              }"
              >{{ $t("common.more") }}>></router-link
            >
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpData: [],
      helpList: [],
      // 加载中
      spinShow: false,
    };
  },
  created: function() {
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
        .get(this.host + this.api.help.helpCountApi, {
          params: {
            lang: this.langPram,
            content: "",
          },
        })
        .then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            this.$http
              .get(this.host + this.api.help.helpListApi, {
                params: {
                  lang: this.langPram,
                  sysHelpClassification: res.data.data[i],
                },
              })
              .then((listRes) => {
                let helpItem = {};
                helpItem.id = res.data.data[i];
                helpItem.title = Dic[res.data.data[i]];
                helpItem.content = listRes.data.data.slice(0, 4);
                this.helpList.push(helpItem);
                this.spinShow = false;
              });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.help {
  background: #fff;
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-bottom: 50px;
  padding-top: 50px;
  color: #fff;
}
.help .bannerimg {
  display: block;
  width: 100%;
}
.help_container {
  padding: 0 12%;
  text-align: center;
  height: 100%;
  min-height: 800px;
  > h1 {
    margin-top: -170px;
    font-size: 32px;
    line-height: 1;
    padding: 50px 0;
  }
}
.help .main {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  .section {
    width: 40%;
    font-size: 14px;
    text-align: left;
    margin: 0 20px;
    position: relative;
    padding-bottom: 30px;
    margin-bottom: 50px;
    .item {
      display: block;
      position: relative;
      padding: 5px 0;
      line-height: 1;
      color: #464646;
      :hover {
        color: #03C59E;
      }
      .text {
        display: inline-block;
        max-width: calc(100% - 25px);
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .iconimg {
      display: inline-block;
      width: 14px;
      margin-left: 6px;
    }
  }
  .route-wrap {
    position: absolute;
    bottom: 5px;
    right: 10px;
    font-size: 14px;
    a {
      color: #03C59E;
    }
  }
}
</style>
