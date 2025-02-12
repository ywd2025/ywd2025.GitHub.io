<!--
 * @Author: 张慧茜 921879459@qq.com
 * @Date: 2023-10-27 17:39:25
 * @LastEditors: 张慧茜 921879459@qq.com
 * @LastEditTime: 2024-04-09 14:01:06
 * @FilePath: \BIKA\src\pages\finance\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="finance_content">
    <Layout style="background-color: #ffffff;">
      <Sider
        hide-trigger
        style="background-color: #ffffff;min-height: calc(100vh - 60px);"
      >
        <Menu theme="light" :active-name="activeMenu" width="auto">
          <MenuItem name="all" to="/finance/all">
            {{ $t("new.finance.overview") }}
          </MenuItem>
          <MenuItem name="property" to="/finance/property">
            {{ $t("new.finance.assetAccount") }}
          </MenuItem>
          <MenuItem name="spot" to="/finance/spot">
            {{ $t("new.universal.cashAccount") }}
          </MenuItem>
          <MenuItem name="futures" to="/finance/futures">
            {{ $t("new.universal.contractAccount") }}
          </MenuItem>
          <MenuItem name="follow" to="/finance/follow">
            {{ $t("carouselItem.text62") }}
          </MenuItem>
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
  watch: {
    $route(to, from) {
      this.activeMenu = window.location.hash.split("/").pop();
    },
  },
  created() {
    if (this.isLogin) {
      this.activeMenu = window.location.hash.split("/").pop();
    } else {
      this.$Message.warning(this.$t("common.loginFirst"));
      this.$router.push("/login");
    }
  },
  methods: {},
};
</script>
<style lang="less" scoped>
// @import url('../../assets/css/common.less');
.finance_content {
  padding-top: 50px;
  .ivu-layout-sider-children {
    background-color: aqua;
  }
}
</style>
