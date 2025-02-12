<template>
  <div class="helpdetail">
    <div class="box">
      <div class="box_title">{{ foundItem.title }}</div>
      <div class="box_content">{{ foundItem.content }}</div>
      <div class="box_time">{{ foundItem.createTime }}</div>
    </div>
    <FooterPart></FooterPart>
  </div>
</template>
<script>
import FooterPart from "../../components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      dataList: [],
      PageMayList: [],
      foundItem: [],
    };
  },
  watch: {
    $route(to, from) {
      let a = this.getId();
      Promise.all([a]).then(() => {
        this.getOneliCkRead();
      });
    },
  },
  created() {
    let a = this.getId();
    Promise.all([a]).then(() => {
      this.getOneliCkRead();
      // this.getDataList();
    });
  },
  computed: {},
  methods: {
    getId() {
      this.dataList = this.$route.params.id;
    },
    getDataList() {
      this.$http
        .get(this.host + this.api.user.pageMy, {
          params: {
            pageNo: "1",
            pageSize: "10000",
            paramLang: "1",
          },
        })
        .then((res) => {
          this.PageMayList = res.data.data.content;
          this.foundItem = this.PageMayList.find(
            (item) => this.dataList == item.id
          );
        });
    },
    getOneliCkRead() {
      this.$http
        .get(this.host + this.api.user.oneliCkRead, {
          params: {
            id: this.dataList,
          },
        })
        .then((res) => {
          this.getDataList();
        });
    },
  },
};
</script>
<style>
.helpdetail {
  background: #fff;
  background-size: cover;
  position: relative;
  overflow: hidden;
  padding-top: 50px;
  color: #333;
  min-width: 1080px;
  height: 100%;
  box-sizing: border-box;
}
.box {
  margin: 0 auto;
  width: 1080px;
  min-height: 480px;
}
.box_title {
  margin-top: 40px;
  font-size: 24px;
  color: #000;
}
.box_content {
  margin-top: 20px;
  text-indent: 2rem;
  font-size: 18px;
  color: #333;
}
.box_time {
  text-align: right;
  font-size: 14px;
  color: #999;
  margin-top: 20px;
}
</style>
