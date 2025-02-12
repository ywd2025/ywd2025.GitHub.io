<template>
  <div class="no-datda">
    <img class="img" :src="$imgUrl + '/newUi/noData.svg'" alt="" />
    <div class="title">{{ $t("dolphin.text60") }}</div>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.no-datda {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img {
    width: 150px;
    height: 150px;
  }
  
  .title {
    font-weight: 400;
    color: #999;
    font-size: 16px;
  }
}
</style>
