<!--登陆主页，虹膜版-->
<template>
  <div :style="{backgroundImage:'url('+bgUrl+')'}" class="login-container">
    <div class="left-div">
      <div>
        <img :src="leftUrl" class="left-img">
      </div>
    </div>
    <div class="login-div">
      <div ref="element" class="right-div">
        <div class="login-body">
          <el-form id="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="right">
            <div class="login-header">
              <img :src="logoUrl" class="login-logo">
              <h5 class="login-subtitle">
                {{ title }}
              </h5>
            </div>
            <!--<div class="login-label">用户名</div>-->
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model.trim="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" />
            </el-form-item>
            <!--<div class="login-label">密码</div>-->
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                v-model.trim="loginForm.password"
                :type="pwdType"
                name="password"
                auto-complete="on"
                placeholder="密码"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <kaptcha-comp v-if="showKaptcha" ref="kaptcha" @passKaptcha="passKaptcha" />

            <el-form-item>
              <el-button :loading="loading" class="login-btn" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="clear-div" />
    </div>
  </div>
</template>

<script>
import { RSAencrypt } from '@/utils/security'
import kaptchaComp from '@/views/login/kaptcha/kaptcha'

export default {
  name: 'Login',
  components: { // 注册组件
    kaptchaComp: kaptchaComp
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateKaptcha = (rule, value, callback) => {
      console.log('验证验证码')
      if (this.showKaptcha) { // 如果开启了验证码判断，否则不判断
        if (value.length < 1) {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      title: this.baseConfig.title,
      loginForm: {
        username: '',
        password: '',
        kaptcha: ''
      },
      loginRules: {
        username: [{ required: true, trigger: ['blur', 'change'], validator: validateUsername }],
        password: [{ required: true, trigger: ['blur', 'change'], validator: validatePass }],
        kaptcha: [{ required: false, trigger: ['blur', 'change'], validator: validateKaptcha }]
      },
      loading: false,
      pwdType: 'password',
      redirect: '/',
      showKaptcha: false, // 是否显示验证码
      bgUrl: require('../../assets/login_images/theme1/background.png'), // 背景图片
      logoUrl: require('../../assets/login_images/theme1/logo.png'), // logo图片
      leftUrl: require('../../assets/login_images/theme1/leftImg.png')
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  beforeCreate: function() { // 从后台获取系统配置，根据配置判断是否加载验证码控件
    this.loading = true
    this.$store.dispatch('GetConfig').then(() => {
      this.showKaptcha = this.$store.getters.kaptcha
      this.loading = false
      this.$message.success('连接服务器成功')
    }).catch((e) => {
      this.$message.error('连接服务器失败')
      this.loading = false
    })
  },
  methods: {
    showPwd() { // 明文显示密码
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    passKaptcha() { // 从子组件获取验证码的数据
      this.loginForm.kaptcha = this.$refs.kaptcha.kaptcha
      console.log(this.loginForm.kaptcha)
    },
    handleLogin() { // 点击登录按钮
      // if (!this.showKaptcha) { // 如果未开启验证码，将验证码字段从提交字段中移除
      //   delete this.loginForm['kaptcha']
      //   delete this.loginRules['kaptcha']
      // }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 密码加密
          const loginForm = {
            sid: this.$store.getters.sid,
            username: this.loginForm.username,
            password: RSAencrypt(this.loginForm.password),
            kaptcha: this.loginForm.kaptcha
          }
          this.$store.dispatch('Login', loginForm).then(() => {
            this.loading = false
            this.$message.success('登录成功')
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            if (this.showKaptcha) {
              this.$refs.kaptcha.refreshCode()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#FFFFFF;
  $light_gray:#ffffff;
  $dark_gray:#889aa4;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 8px 5px 8px 8px;
      color: $dark_gray;
      height: 40px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $light_gray inset !important;
        -webkit-text-fill-color: $dark_gray !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #c5c5c5;
    background: #ffffff;
    border-radius: 5px;
    color: #000000;
    margin-bottom: 35px;
    .el-form-item__error{
      line-height: 2 !important;
    }
  }
  .el-button {
    line-height:1.2;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#FFFFFF;
$dark_gray:#889aa4;
$light_gray:#fff;
$main_color:#142446;
$main_color_hover: #004493;
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #000000;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-color: $bg;
  .system-title{
    font-size: 30px;
    color: white;
    width:240px;
    position: fixed;
    top:40px;
    left:50px;
    .title-img{
      width:200px;
      display: inline-block;
      float: right;
    }
  }
  // 人头图片
  .left-div{
    position:fixed;
    overflow:hidden;
    left:350px;
    top:50%;
    transform: translate(-50%,-50%);
    text-align: center;
    .left-img{
      width:540px;
      height:450px;
    }
  }
  // 登录区域
  .login-div{
    position:fixed;
    overflow:hidden;
    right:0px;
    top:50%;
    transform: translate(-45%,-50%);
    /*margin-top:-220px;*/
    /*border:1px solid #889aa4;*/
    /*border-radius: 3px;*/
    /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
  }

  .title-div{
    margin:20px 30px 30px 30px;
  }
  .title{
    color:$light_gray;
    font-size: 26px;
    font-weight: 400;
  }
  .right-div{
    width:100%;
    padding: 10px 10px;
    float:left;
    .login-body{
      width: 400px;
      height:100%;
      padding: 1px 30px;
      background-color:white;
      border-radius: 5px;
    }
  }
  .clear-div{
    clear:both;
  }
  .login-form {
    max-width: 100%;
    padding: 15px 15px 5px 15px;
    margin: auto;
    overflow:hidden;
    .login-label{
      margin-bottom:9px;
      font-size:15px;
      color: $main_color;
    }
    .el-form-item{
      margin-bottom: 35px;
      .el-form-item__error{
        line-height: 1.5 !important;
      }
    }
    /*border-radius: 3px;*/
    /*box-shadow: 0 5px 8px rgba(0, 0, 0, .12), 0 0 10px rgba(0, 0, 0, .04);*/
  }
  .tips {
    font-size: 14px;
    /*color: #fff;*/
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 0px 3px 0px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .login-header{
    text-align: center;
    .login-logo{
      width:65px;
      height:43px;
    }
    .login-title {
      font-size: 25px;
      font-weight: 500;
      color: #0e3877;
      margin: 10px auto 10px auto;
    }
    .login-subtitle {
      font-size: 18px;
      font-weight: 600;
      color: $main_color;
      margin: 10px auto 30px auto;
    }
  }

  .login-btn {
    background-color: $main_color;
    font-size: 17px;
    border-color: $main_color;
    font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu
  }
  .login-btn:hover {
    background-color: $main_color_hover;
    border-color: $main_color_hover;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
