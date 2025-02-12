<template>
  <div class="extract">
    <div class="center">
      <div @click="go_page()" class="center_title">
        <Icon type="ios-arrow-back" />{{ $t("header.ucenter") }}
      </div>
      <div class="title">{{ $t("carouselItem.text241") }}</div>
      <Table
        :columns="columns"
        :data="ruleList"
        :no-data-text="$t('common.nodata')"
      ></Table>
    </div>
    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "@/components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {
      ruleList: [],
      searchValue: "",
      columns: [
        //   {
        //     title: this.$t("carouselItem.text243"),
        //     key: "equName",
        //     align: "center",
        //   },
        {
          title: this.$t("carouselItem.text244"),
          key: "equipment",
          align: "center",
        },
        {
          title: this.$t("carouselItem.text245"),
          key: "createTime",
          align: "center",
        },
        {
          title: this.$t("carouselItem.text248"),
          key: "recordTitle",
          align: "center",
        },
        {
          title: this.$t("buyCoin.universal.status"),
          key: "state",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: { color: params.row.state == 1 ? "#03C59E" : "#828ea1" },
              },
              params.row.state == 1
                ? this.$t("carouselItem.text247")
                : this.$t("carouselItem.text246")
            );
          },
        },
        {
          title: this.$t("swap.action"),
          key: "active",
          width: 110,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  size: "small",
                  type: "error",
                },
                style: {
                  "line-height": "1.2",
                },
                on: {
                  click: () => {
                    this.colseLogin(params.row.equipment);
                  },
                },
              },
              this.$t("new.universal.delete")
            );
          },
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.post(this.host + this.api.user.findRecord, {}).then((res) => {
        this.ruleList = res.data.data;
      });
    },
    go_page() {
      this.$router.push("user");
    },
    colseLogin(item) {
      this.$http
        .post(this.host + this.api.user.loginOutByEquipment, {
          equipment: item,
        })
        .then((res) => {
          if (res.body.code == 0) {
            this.$Message.success(res.body.message);
          }else{
            this.$Message.error(res.body.message);
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.extract {
  padding-top: 50px;
  background-color: #f8f8f8;
}
.center {
  margin: 0 auto;
  width: 1200px;
  min-height: 500px;
  background-color: #fff;
  padding: 20px;
}
.center_title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.input_select {
  width: 250px;
  height: 35px;
  border-radius: 10px;
  color: #333;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  margin: 20px 0;
}
</style>
