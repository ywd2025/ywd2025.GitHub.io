<template>
  <div class="helplist">
    <div class="route-wrap">
      <router-link to="help">{{ $t("header.helpcenter") }}</router-link>
      <span>></span>
      <span>{{ $t("common.xinshouzhinan") }}</span>
      <!-- <span>{{cateTitle}}</span> -->
    </div>
    <div class="container">
      <h1>{{ $t("common.xinshouzhinan") }}</h1>
      <!-- <h1>{{cateTitle}}</h1> -->
      <div class="list">
        <router-link
          class="item"
          v-for="(item, index) in list"
          :key="index"
          :to="{
            path: 'helpdetail',
            query: { cate: cate, id: item.id, cateTitle: cateTitle },
          }"
        >
          <span class="text">{{ item.title }}</span>
          <span class="time">
            {{ item.createTime }}
          </span>
        </router-link>
      </div>
      <div class="page">
        <Page
          :total="total"
          :pageSize="pageSize"
          :current="pageNo"
          @on-change="pageChange"
        ></Page>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.helplist {
  width: 100%;
  margin: 0 auto;
  padding: 80px 20%;
  background: #fff;
  color: #000;
  min-height: 800px;
  .container {
    > h1 {
      text-align: center;
      margin: 30px 0 20px 0;
    }
    .page {
      text-align: right;
      margin-top: 10px;
      .ivu-page {
        background: transparent !important;
        .ivu-page-prev,
        .ivu-page-next {
          background-color: transparent !important;
          color: #000;
          border: none;
        }
        .ivu-page-item {
          background-color: transparent !important;
          color: #000;
          border: none;
        }
      }
    }
  }
}
.list {
  font-size: 16px;
  .item {
    color: #464646;
    display: block;
    line-height: 40px;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
    .iconimg {
      width: 14px;
      vertical-align: sub;
      margin-left: 20px;
    }
    .time {
      float: right;
      color: #999;
      font-size: 14px;
    }
    &:hover {
      color: #03C59E;
    }
  }
}
.route-wrap {
  font-size: 14px;
  a {
    color: #f1ab15;
  }
  span {
    color: #f1ab15;
  }
}
</style>
<script>
import Help from "./Help.vue";
export default {
  data() {
    return {
      cate: 0,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      list: [],
    };
  },
  created() {
    const { cate, cateTitle } = this.$route.query;
    this.cate = cate;
    this.cateTitle = cateTitle;
    this.getData();
  },
  computed: {
    lang: function() {
      return this.$store.state.lang;
    },
    langPram: function() {
      return this.$store.state.lang;
    },
  },
  watch: {
    $route(to, from) {
      const { cate, cateTitle } = to.query;
      this.cate = cate;
      this.cateTitle = cateTitle;
      this.getData();
    },
  },
  methods: {
    pageChange(data) {
      this.pageNo = data;
      this.getData();
    },
    getData() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        cate: this.cate,
        lang: this.langPram,
      };
      console.log(this.lang);
      console.log(this.langPram);
      console.log(this.$t("common.xinshouzhinan"));
      this.$http
        .post(this.host + "/uc/ancillary/more/help/page", params)
        .then((res) => {
          if (res.status == 200 && res.body.code == 0) {
            this.list = res.body.data.content;
            this.total = res.body.data.totalElements;
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
  },
};
</script>
