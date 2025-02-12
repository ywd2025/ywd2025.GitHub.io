<template>
  <div class="order_content">
    <Layout style="background-color: #ffffff;">
      <Sider
        hide-trigger
        style="background-color: #ffffff;min-height: calc(100vh - 60px);"
      >
        <Menu
          theme="light"
          :active-name="activeMenu"
          width="auto"
          :open-names="openNames"
          accordion
        >
          <Submenu
            :name="subItem.name"
            v-for="subItem in menu"
            :key="subItem.name"
          >
            <template slot="title">
              {{ subItem.label }}
            </template>
            <MenuItem
              v-for="menuItem in subItem.children"
              :name="menuItem.name"
              :to="menuItem.path"
              :key="menuItem.name"
            >
              {{ menuItem.label }}
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </Content>
    </Layout>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      menu: [
        {
          name: "record",
          label: this.$t("new.records.financial"),
          children: [
            {
              name: "all",
              label: this.$t("new.finance.operate.allRecords"),
              path: "/record/all",
            },
            {
              name: "deposit",
              label: this.$t("new.records.moneyFilled"),
              path: "/record/deposit",
            },
            {
              name: "withdraw",
              label: this.$t("new.records.withdrawal"),
              path: "/record/withdraw",
            },
            {
              name: "transfer",
              label: this.$t("new.records.transfer"),
              path: "/record/transfer",
            },
            {
              name: "spot",
              label: this.$t("carouselItem.text152"),
              path: "/record/spot",
            },
            {
              name: "financial",
              label: this.$t("carouselItem.text58"),
              path: "/record/financial",
            },
            {
              name: "premium",
              label: this.$t("carouselItem.text151"),
              path: "/record/premium",
            },
            {
              name: "flash",
              label: this.$t("dolphin.text58"),
              path: "/record/flash",
            },
            {
              name: "subscribe",
              label: this.$t("dolphin.text12"),
              path: "/record/subscribe",
            },
          ],
        },
      ],
      activeMenu: "",
      openNames: [],
    };
  },
  computed: {
    lang() {
      this.updateLangData();
      return this.$store.state.lang;
    },
    langPram() {
      return this.$store.state.lang;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
  },
  created() {
    if (this.isLogin) {
      const routerArr = window.location.hash.split("/");
      this.activeMenu = routerArr[2];
      this.openNames = [`${routerArr[1]}`];
    } else {
      this.$Message.warning(this.$t("common.loginFirst"));
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/common.less");
.order_content {
  padding-top: 50px;
  .ivu-layout-sider-children {
    background-color: aqua;
  }
}
</style>
