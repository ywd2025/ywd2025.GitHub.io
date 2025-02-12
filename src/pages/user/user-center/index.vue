<template>
  <div class="finance_content">
    <Layout style="background-color: #ffffff;">
      <Sider
        hide-trigger
        style="background-color: #ffffff;min-height: calc(100vh - 60px);"
      >
        <Menu theme="light" :active-name="activeMenu" width="auto">
          <MenuItem name="bonus-card" to="/user-center/bonus-card">
            卡券中心
          </MenuItem>
          <!-- <MenuItem name="property" to="/finance/property">
            資產賬戶
          </MenuItem>
          <MenuItem name="spot" to="/finance/spot">
            現貨賬戶
          </MenuItem>
          <MenuItem name="futures" to="/finance/futures">
            合約賬戶
          </MenuItem>
          <MenuItem name="follow" to="/finance/follow">
            跟單賬戶
          </MenuItem> -->
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
      activeMenu: "",
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
      this.activeMenu = window.location.hash.split("/").pop();
      console.log(this.activeMenu);
    } else {
      this.$Message.warning(this.$t("common.loginFirst"));
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
// @import url('../../../assets/css/common.less');
.finance_content {
  padding-top: 50px;
  .ivu-layout-sider-children {
    background-color: aqua;
  }
}
</style>
