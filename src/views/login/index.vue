<!--登陆主页,默认-->
<template>
  <div :style="{backgroundImage:'url('+bgUrl+')'}" class="login-container">
    <div class="login-div">
      <div id="left-div" :style="{backgroundImage:'url('+leftUrl+')'}" class="left-div">
        <div class="logo-div">
          <img>
        </div>
        <div class="title-div">
          <h3 class="title">
            {{ title }}
          </h3>
        </div>
      </div>
      <div ref="element" class="right-div">
        <el-form id="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="right">
          <h5 class="login-title">
            登录
          </h5>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model.trim="loginForm.username" name="username" type="text" auto-complete="on" placeholder="用户名" />
          </el-form-item>
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
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
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
      }, // 登录表单
      loginRules: {
        username: [{ required: true, trigger: ['blur', 'change'], validator: validateUsername }],
        password: [{ required: true, trigger: ['blur', 'change'], validator: validatePass }],
        kaptcha: [{ required: false, trigger: ['blur', 'change'], validator: validateKaptcha }]
      }, // 登录规则
      loading: false, // 加载动画
      pwdType: 'password', // 密码状态password和空
      redirect: '/', // 重定向路径
      showKaptcha: false, // 是否显示验证码
      bgUrl: require('../../assets/login_images/theme0/bg.png'), // 背景图片
      leftUrl: require('../../assets/login_images/theme0/left.jpg')// 左边图片
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
      if (this.showKaptcha) {
        var rightHeight = window.getComputedStyle(this.$refs.element).height
        rightHeight = parseFloat(rightHeight.substring(0, rightHeight.length - 2))
        document.getElementById('left-div').style.height = (rightHeight + 64.897) + 'px'
      }
    }).catch(() => {
      this.$message.error('连接服务器失败')
      this.loading = false
    })
  },
  mounted: function() {
    // 自适应图片高度
    var rightHeight = window.getComputedStyle(this.$refs.element).height
    document.getElementById('left-div').style.height = rightHeight
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
            // this.$message.error(error)
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
  .login-container {
    position: relative;
    height: 100%;
    width: 100%;
    /*background: #000000 url("/static/images/login_images/bg.png") no-repeat;*/
    background-color: #000000;
    background-repeat: no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-color: $bg;
    .login-div{
      /*height:385px;*/
      width:800px;
      position:absolute;
      overflow:hidden;
      left:50%;
      top:50%;
      margin-left:-400px;
      margin-top:-220px;
      border:1px solid #889aa4;
      border-radius: 3px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .left-div{
      width:60%;
      float:left;
      /*background: url("/static/images/login_images/left.jpg");*/
      background-color: #ffffffff;
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
      width:40%;
      float:left;
      background-color:white
    }
    .clear-div{
      clear:both;
    }
    .login-form {
      max-width: 100%;
      padding: 15px 15px 5px 15px;
      margin: auto;
      overflow:hidden;
      border-radius: 3px;
      box-shadow: 0 5px 8px rgba(0, 0, 0, .12), 0 0 10px rgba(0, 0, 0, .04);
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
    .login-title {
      font-size: 18px;
      font-weight: 400;
      color: #000;
      margin: 10px auto 30px auto;
      text-align: center;
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
