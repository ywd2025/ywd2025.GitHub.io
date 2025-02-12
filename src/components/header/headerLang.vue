<template>
  <div>
    <Poptip
      style="display: flex; align-items: center"
      trigger="hover"
      width="379"
      placement="bottom-end"
    >
      <div
        style="
         display: flex;
         align-items: center;
         margin-left: 20px;
         cursor: pointer;
        "
      >
        <Icon type="ios-globe-outline" size="20" color="#000" />
      </div>
      <div class="lang_poptip" slot="content">
        <div class="active_poptip_item">
          <div
            @click="changelanguage('zh_cn')"
            class="active_poptip_item_content"
            :style="{
              background: lang == 'zh_cn' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="lang == 'zh_cn'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">简体中文</div>
          </div>
          <div
            @click="changelanguage('tw_cn')"
            class="active_poptip_item_content"
            :style="{
              background: lang == 'tw_cn' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="lang == 'tw_cn'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">繁體中文</div>
          </div>
          <div
            @click="changelanguage('en_us')"
            class="active_poptip_item_content"
            :style="{
              background: lang == 'en_us' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="lang == 'en_us'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">English</div>
          </div>
          <div
            @click="changelanguage('ko_kr')"
            class="active_poptip_item_content"
            :style="{
              background: lang == 'ko_kr' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="lang == 'ko_kr'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">한국어</div>
          </div>
          <div
            @click="changelanguage('jp_jp')"
            class="active_poptip_item_content"
            :style="{
              background: lang == 'jp_jp' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="lang == 'jp_jp'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">日本語</div>
          </div>
        </div>
        <div class="active_poptip_item">
          <div
            @click="changePricing('CNY')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'CNY' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'CNY'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">CNY</div>
          </div>
          <div
            @click="changePricing('TRY')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'TRY' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'TRY'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">TRY</div>
          </div>
          <div
            @click="changePricing('VND')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'VND' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'VND'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">VND</div>
          </div>
          <div
            @click="changePricing('JPY')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'JPY' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'JPY'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">JPY</div>
          </div>
          <div
            @click="changePricing('RUB')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'RUB' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'RUB'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">RUB</div>
          </div>
          <div
            @click="changePricing('UAH')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'UAH' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'UAH'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">UAH</div>
          </div>
          <div
            @click="changePricing('EUR')"
            class="active_poptip_item_content"
            :style="{
              background: pricing == 'EUR' ? '#F9F9F9' : '',
            }"
          >
            <Icon
              type="md-checkmark"
              v-if="pricing == 'EUR'"
              size="20"
              style="color: #202020;"
            />
            <div class="active_poptip_item_content_text">EUR</div>
          </div>
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actives: true,
    };
  },
  props: {
    openSwap: {
      type: [Number, String],
      default: 1,
    },
    name: {
      type: String,
      default: "nav-swap",
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    pricing() {
      return this.$store.state.pricing;
    },
  },
  methods: {
    changelanguage: function(name) {
      if (
        name != "jp_jp" &&
        name != "ko_kr" &&
        name != "en_us" &&
        name != "tw_cn" &&
        name != "zh_cn"
      ) {
      } else {
        this.$store.commit("setlang", name);
        this.$i18n.locale = name;
      }
    },
    changePricing: function(name) {
      this.$store.commit("setPricing", name);
      this.$store.dispatch("getAllRateActions");
    },
  },
};
</script>
<style lang="less" scoped>
.lang_poptip {
  padding: 10px 0;
  display: flex;
  .active_poptip_item {
    .active_poptip_item_content {
      width: 171px;
      height: 44px;
      border-radius: 10px 10px 10px 10px;
      cursor: pointer;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .active_poptip_item_content_text {
        width: 122px;
        font-weight: 400;
        font-size: 15px;
        color: #000000;
        line-height: 22px;
        text-align: left;
        margin-left: 10px;
      }
    }
    .active_poptip_item_content:hover {
      background: #f9f9f9;
    }
  }
}
</style>
