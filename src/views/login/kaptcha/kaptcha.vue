<template>
  <el-form-item prop="kaptcha">
    <el-input v-model="kaptcha" class="kaptcha-el" name="kaptcha" type="text" placeholder="验证码" @input="passKaptcha" />
    <img :src="kaptcha_src" class="kaptcha" alt="验证码" @click="refreshCode">
  </el-form-item>
</template>

<script>
import { getKaptcha } from '@/api/login'
export default {
  name: 'Kaptcha',
  // props: {
  //   kaptcha: {// 验证码默认值为空
  //     type: String,
  //     default: () => ''
  //   }
  // },
  data() {
    return {
      kaptcha: '',
      kaptcha_src: '/../../../static/images/kaptcha.png'
    }
  },
  mounted: function() {
    this.refreshCode()
  },
  methods: {
    refreshCode() {
      getKaptcha(this.$store.getters.sid).then(response => {
        console.log('kaptcha:' + response.data.kaptcha)
        this.kaptcha_src = response.data.kaptcha
      }).catch(error => {
        this.$message.error(error)
      })
    },
    passKaptcha() {
      this.$emit('passKaptcha')
    }
  }
}
</script>

<style scoped>
  .kaptcha-el{
    float:left;
    width:65% !important;
  }
  .kaptcha-el input{
    float:left;
    width:65%
  }
  .kaptcha{
    height:40px;
    width:80px;
    float:right;
  }
</style>
