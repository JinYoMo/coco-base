<template>
  <el-dialog :visible.sync="dialogFormVisible" title="修改密码" width="350px" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="userForm" label-position="right" label-width="80px">
      <el-form-item label="原密码" prop="oldpassword">
        <el-input v-model.trim="userForm.oldpassword" type="password" placeholder="必填" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="userForm.password" type="password" placeholder="必填" />
      </el-form-item>
      <el-form-item label="重复密码" prop="repassword">
        <el-input v-model.trim="userForm.repassword" type="password" placeholder="必填" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveData">
        保存
      </el-button>
      <el-button @click="dialogFormVisible = false">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { changePwd } from '../../../api/system/user'
import { RSAencrypt } from '../../../utils/security'

export default {
  name: 'ResetPwd',
  data() {
    const validateOldPass = (rule, value, callback) => {
      console.log('验证旧密码')
      if (value === '') {
        callback(new Error('旧密码不能为空'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      console.log('验证密码')
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
        if (value.match(reg)) { // 样式匹配
          if (value.length < 8 || value.length > 16) {
            callback(new Error('密码长度必须在8到16位之间'))
          } else {
            if (this.userForm.repassword !== '') {
              this.$refs.dataForm.validateField('repassword')
            }
          }
        } else {
          callback(new Error('必须由数字、字母、字符中至少两种组成'))
        }

        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log('验证重复密码')
      if (value === '') {
        callback(new Error('重复密码不能为空'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      userForm: {
        oldpassword: '', // 原密码
        password: '', // 密码
        repassword: '' // 重复密码
      }, // 表单
      rules: {
        oldpassword: [{ required: true, validator: validateOldPass, trigger: ['blur', 'change'] }],
        password: [{ required: true, validator: validatePass, trigger: ['blur', 'change'] }],
        repassword: [{ required: true, validator: validatePass2, trigger: ['blur', 'change'] }]
      } // 前端校验规则
    }
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogFormVisible) {
      this.dialogFormVisible = dialogFormVisible
      this.resetForm()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 重置表单
    resetForm() {
      this.userForm = {
        oldpassword: '',
        password: '', // 密码
        repassword: '' // 重复密码
      }
    },
    // 保存数据
    saveData: function() {
      this.$refs['dataForm'].validate((valid) => {
        const userForm = {
          oldPwd: this.userForm.oldpassword,
          newPwd: this.userForm.password
        }
        userForm.oldPwd = RSAencrypt(userForm.oldPwd)
        userForm.newPwd = RSAencrypt(userForm.newPwd)
        if (valid) {
          changePwd(userForm).then(response => {
            if (response.code === 200) {
              this.$message.success('修改密码成功')
              this.dialogFormVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-dialog{
    width:400px
  }
  .el-select{
    width: 100%;
  }
</style>
