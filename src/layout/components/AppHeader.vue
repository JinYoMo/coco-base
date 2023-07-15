<template>
  <el-header class="app-header">
    <h3>{{ title }}</h3>
    <!--子系统选项-->
    <el-dropdown v-if="showChangeSys" class="systemSelect" size="medium" @command="handleCommand">
      <span class="el-dropdown-link">{{ currentSystem.name }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="system in systems" :key="system.id" :command="system">
          {{ system.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="dropdown-container" trigger="click">
      <div class="dropdown-wrapper">
        <span style="line-height:50px;">欢迎您，{{ name }}</span>
        <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
        <i class="el-icon-arrow-down" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item v-if="!baseConfig.singleSys">
          <span style="display:block;" @click="backToIndex">回首页</span>
        </el-dropdown-item>
        <el-dropdown-item :divided="!baseConfig.singleSys">
          <span style="display:block;" @click="resetPwd">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <reset-pwd v-show="showSetPwd" ref="retPwd" />
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import ResetPwd from '@/views/system/user/resetPwd'

export default {
  name: 'AppHeader',
  components: { ResetPwd },
  data() {
    return {
      title: this.baseConfig.title, // 标题
      showChangeSys: !this.baseConfig.singleSys, // 是否显示切换系统菜单
      name: this.$store.getters.name, // 用户姓名
      showSetPwd: false // 是否显示修改密码按钮
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'currentSystem',
      'systems'
    ])
  },
  created() {
    if (!this.baseConfig.singleSys) {
      this.getSystems()
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    resetPwd() {
      this.showSetPwd = true
      this.$refs.retPwd.initDialog(true)
    },
    backToIndex() {
      const url = this.baseConfig.mainPage
      window.location.href = url
    },
    // 切换子系统
    handleCommand(command) {
      console.log('切换子系统:' + command.name)
      const params1 = `?token=${this.$store.getters.token}`
      const params = `?sys=${command.name}&url=${command.url}&code=${command.code}&token=${this.$store.getters.token}`
      // 判断系统是不是http的，如果是则打开新窗口
      if (command.url.indexOf('http') > -1) {
      // 取token
        if (this.baseConfig.sameWindow) {
          window.location.href = command.url + params1
        } else {
          window.open(command.url + params1, '_blank')
        }
      } else {
      // 取token
        if (this.baseConfig.sameWindow) {
          window.location.href = this.baseConfig.mainPage + command.url + params
        } else {
          window.open(this.baseConfig.mainPage + command.url + params, '_blank')
        }
      }
    },
    // 获取子系统
    getSystems() {
      this.$store.dispatch('GetSystems').then(() => {
        console.log('获取子系统列表成功-appHeader')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  h3{
    margin-left:24px;
    display: inline-block;
    float:left;
  }
  .dropdown-container {
    /*height: 50px;*/
    display: inline-block;
    float: right;
    z-index:500;
    position: fixed;
    top:0px;
    right: 35px;
    .dropdown-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }
  }
  .systemSelect{
    height: 56px;
    display: inline-block;
    float: left;
    z-index:500;
    position: fixed;
    margin-left:60px;
    top:5px;
    color:#fff;
    line-height: 56px;
  }
</style>
