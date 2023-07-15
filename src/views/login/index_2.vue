<!--登陆主页，城管版-->
<template>
  <div :style="{backgroundImage:'url('+bgUrl+')'}" class="login-container">
    <div class="login-div">
      <div ref="element" class="right-div">
        <el-form id="login-form" ref="loginForm" :model="loginForm" size="large" :rules="loginRules" class="login-form" autocomplete="on" label-position="right">
          <h5 class="login-title">
            用户登录
          </h5>
          <h5 class="login-subtitle">
            USER LOGIN
          </h5>
          <el-form-item prop="username">
            <el-input v-model.trim="loginForm.username" name="username" type="text" autocomplete="on" placeholder="用户名">
              <span slot="prefix" class="input-prefix-icon">
                <svg-icon icon-class="user" />
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              :type="pwdType"
              name="password"
              auto-complete="on"
              placeholder="密码"
              @keyup.enter.native="handleLogin"
            >
              <span slot="prefix" class="input-prefix-icon">
                <svg-icon icon-class="password" />
              </span>
              <span slot="suffix" class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-input>
          </el-form-item>

          <kaptcha-comp v-if="showKaptcha" ref="kaptcha" @passKaptcha="passKaptcha" />

          <el-form-item>
            <el-button :loading="loading" class="login-btn" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="clear-div" />
    </div>
    <div class="system-title">
      <!--logo-img-->
      <svg-icon icon-class="logo" />
      <!--title-img-->
      <div class="title-img-div">
        <img :src="titleUrl" class="title-img" fit="scale-down">
      </div>
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
      titleUrl: require('../../assets/login_images/theme1/leftImg.png') // 背景图片
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
      this.loading = false
      this.$message.success('连接服务器成功')
      this.showKaptcha = this.$store.getters.kaptcha
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
    // 点击登录按钮
    handleLogin() {
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
            this.$router.push({ path: '/' }, () => {})
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
  // fjk-
  // .el-form-item {
  //   /*border: 1px solid #c5c5c5;*/
  //   background: #ffffff;
  //   border-radius: 5px;
  //   /*color: #000000;*/
  //   margin-bottom: 35px;
  //   .el-form-item__content{
  //     line-height: 47px;
  //   }
  //   .el-input__inner{
  //     /*padding-top: 5px;*/
  //     /*padding-bottom:5px;*/
  //     height: 48px;
  //   }
  // }
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
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-color: $bg;
  .system-title{
    font-size: 30px;
    color: white;
    position: absolute;
    top:2rem;
    left:4rem;
    height:3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title-img-div{
      position:relative;
      height: 100%;
      min-width: 200px;
      .title-img{
        height:100%;
      }
      /*width: 200px;*/
    }
  }
  /*登录div*/
  .login-div{
    width:500px;
    position:absolute;
    overflow:hidden;
    left:60%;
    top:50%;
    margin-top:-220px;
    .right-div{
      width:100%;
      padding: 20px 50px;
      float:left;
      .login-form {
        max-width: 100%;
        padding: 15px 15px 5px 15px;
        margin: auto;
        overflow:hidden;
        /*输入框前图标*/
        .input-prefix-icon {
          padding: 0px 6px;
          color: $dark_gray;
        }
        /*显示密码图标*/
        .show-pwd {
          font-size: 16px;
          padding:0 6px;
          color: $dark_gray;
          cursor: pointer;
          user-select: none;
        }
        /*用户登录*/
        .login-title {
          font-size: 25px;
          font-weight: 500;
          // color: #0e3877;
          color: #fff;
          margin: 10px auto 10px auto;
        }
        /*登录英文*/
        .login-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: #9c9c9c;
          margin: 10px auto 30px auto;
        }
        /*登录按钮*/
        .login-btn {
          background-color: #3948d5;
          font-size: 17px;
          border-color: #3948d5;
          color:#fff;
          line-height: 1.2;
          padding: 12px 20px;
        }
        .login-btn:hover {
          background-color: #5863f6;
          border-color: #5863f6;
        }
      }
      .clear-div{
        clear:both;
      }
    }
  }
}
</style>
