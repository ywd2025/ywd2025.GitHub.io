<template>
  <div style="text-align:left">
    <div v-if="picUrl" class="demo-upload-list">
      <template>
        <img :src="picUrl">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(picUrl)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(picUrl)"></Icon>
        </div>
      </template>
    </div>
    <Upload
      v-else
      ref="upload"
      :headers="{ 'access-auth-token': token,'equipment': 'PC' }"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'png', 'gif']"
      multiple
      type="drag"
      :action="action"
      style="margin-right:32px; display: inline-block;width:108px;">
      <div style="width: 108px;height:108px;line-height: 122px;">
        <Icon type="md-add" size="40"></Icon>
      </div>
    </Upload>
    <Modal footer-hide v-model="picModal">
      <h2>{{$t('new.finance.operate.picPreview')}}</h2>
      <img :src="picUrl" v-if="picModal" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'picUpload',
  data() {
    return {
      picModal: false,
      token: localStorage.getItem("TOKEN"),
    }
  },
  props: {
    action: String,
    picUrl: String,
  },
  mounted() {
  },
  methods: {
    handleView () {
      this.picModal = true;
    },
    handleRemove (res) {
      console.log(res)
      this.$emit('getPicUrl', '')
    },
    handleSuccess (res, file) {
      console.log(res)
      this.$emit('getPicUrl', res.data)
    },
  }
}
</script>

<style lang="less" scoped>
.demo-upload-list{
	display: inline-block;
	width: 108px;
	height: 108px;
	text-align: center;
	line-height: 108px;
	border: 1px solid transparent;
	border-radius: 4px;
	overflow: hidden;
	background: #fff;
	position: relative;
	box-shadow: 0 1px 1px rgba(0,0,0,.2);
	margin-right: 32px;
}
.demo-upload-list img{
	width: 100%;
	height: 100%;
}
.demo-upload-list-cover{
	display: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
	display: block;
}
.demo-upload-list-cover i{
	color: #fff;
	font-size: 40px;
	cursor: pointer;
	margin: 0 2px;
}
</style>