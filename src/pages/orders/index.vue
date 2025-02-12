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
          name: "spot",
          label: this.$t("new.orders.spotOrders"),
          children: [
            {
              name: "spot/open",
              label: this.$t("new.orders.currentMandate"),
              path: "/orders/spot/open",
            },
            {
              name: "spot/close",
              label: this.$t("new.orders.historicalMandates"),
              path: "/orders/spot/close",
            },
            // {
            //   name: 'spot/match',
            //   label: '歷史成交',
            //   path: '/orders/spot/match'
            // },
            // {
            //   name: 'spot/documentary',
            //   label: this.$t("carouselItem.text265"),
            //   path: '/orders/spot/documentary'
            // },
          ],
        },
        {
          name: "futures",
          label: this.$t("new.orders.contractOrder"),
          children: [
            {
              name: "futures/open",
              label: this.$t("new.orders.currentMandate"),
              path: "/orders/futures/open",
            },
            {
              name: "futures/close",
              label: this.$t("new.orders.historicalMandates"),
              path: "/orders/futures/close",
            },
            {
              name: 'futures/match',
              label: this.$t('carouselItem.text266'),
              path: '/orders/futures/match'
            },
          ],
        },
        {
          name: "financial",
          label: this.$t("carouselItem.text58"),
          children: [
            {
              name: "financial/earnings",
              label: this.$t("carouselItem.text59"),
              path: "/orders/financial/earnings",
            },
            {
              name: "financial/purchase",
              label: this.$t("carouselItem.text119"),
              path: "/orders/financial/purchase",
            },
            {
              name: "financial/redeem",
              label: this.$t("carouselItem.text124"),
              path: "/orders/financial/redeem",
            },
          ],
        },
        {
          name: 'follow',
          label: this.$t("carouselItem.text265"),
          children: [
            {
              name: 'follow/close',
              label: this.$t('swap.hisdelegation'),
              path: '/orders/follow/close'
            },
            {
              name: 'follow/match',
              label: this.$t('carouselItem.text266'),
              path: '/orders/follow/match'
            },
          ]
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
      this.activeMenu = `${routerArr[2]}/${routerArr[3]}`;
      this.openNames = [`${routerArr[2]}`];
      // console.log(this.activeMenu, this.openNames);
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
