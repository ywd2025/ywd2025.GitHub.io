<template>
  <div class="notice">
    <div class="banner">
      <!-- <img class="bannerimg" :src="$imgUrl + '/cms/help_banner.png'" /> -->
      <span>{{ $t("header.service") }}</span>
    </div>
    <div class="main">
      <div class="list">
        <div class="item" v-for="item in FAQList" @click="noticedeail(item.id)">
          <div style="display: flex;align-items: center;">
            <img
              v-show="item.isTop == 0"
              class="iconimg"
              :src="$imgUrl + '/cms/icon-top.png'"
              alt=""
            />
            <span class="text">{{ item.title }}</span>
          </div>
          <span class="time">
            {{ item.createTime }}
          </span>
        </div>
      </div>
      <div class="page">
        <Page
          :total="totalNum"
          :pageSize="pageSize"
          :current="pageNo"
          @on-change="loadDataPage"
        ></Page>
      </div>
    </div>
    <!-- <div class="help_container">
          <div style="line-height: 40px;font-size:16px;"><router-link to="/help" style="color:#03C59E;">{{$t('cms.servicecenter')}}</router-link>->{{$t('cms.notice')}}</div>

            <Col span="24" style="padding:0 2%;color:#000;font-size:18px;background:#fff">
                <div class="faqlist">
                    <div v-for="item,index in FAQList" class="faqitem" @click="noticedeail(item.id)" v-if="titleLang(item.title)===lang">{{item.title}}
                        <span style="float:right">{{item.createTime}}</span>
                    </div>
                </div>
            </Col>

        </div>
        <Col span="24" style="padding:100px 0;">


         </Col> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalNum: 0,
      FAQList: [],
    };
  },
  created: function() {
    this.init();
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
      this.$store.state.HeaderActiveName = "1-7";
      this.loadDataPage(this.pageNo);
    },
    loadDataPage(pageIndex) {
      var param = {};
      (param["pageNo"] = pageIndex),
        (param["pageSize"] = this.pageSize),
        (param["lang"] = this.langPram),
        this.$http
          .post(this.host + this.api.uc.announcement, param)
          .then((response) => {
            // console.log(response);
            var resp = response.body;
            if (resp.code == 0) {
              if (resp.data.content.length == 0) return;
              this.FAQList = resp.data.content;
              this.totalNum = resp.data.totalElements;
            } else {
              this.$Notice.error({
                title: this.$t("common.tip"),
                desc: resp.message,
              });
            }
          });
    },
    noticedeail(id) {
      this.$router.push({
        path: `/announcement/${id}`,
      });
    },
    titleLang(str) {
      const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(str)) {
        return "简体中文";
      } else {
        return "English";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.notice {
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    background: linear-gradient(to right, #001a40, #000109);
    background-size: 100% 100%;
    color: #fff;
    font-size: 40px;
  }
  .main {
    width: 70%;
    margin: 0 auto;
    background-color: #ffffff;
    color: #636363;
    // box-shadow: 0 0 2px #ccc;
    margin-top: -50px;
    border-radius: 6px;
    padding: 50px 100px;
    margin-bottom: 50px;
    border: 1px solid #eeeeee;
    .list {
      font-size: 14px;
      .item {
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .iconimg {
          width: 35px;
          margin-right: 20px;
        }
        .time {
          float: right;
          color: #999;
          font-size: 14px;
        }
        .text {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 77%;
          &:hover {
            color: #03C59E;
          }
        }
      }
    }
    .page {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>
