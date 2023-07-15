<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="userForm" label-position="right" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="账号" prop="account">
            <el-input v-model.trim="userForm.account" :disabled="dialogStatus=='update'" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="userForm.name" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="userForm.sex" placeholder="请选择">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="userForm.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="dialogStatus=='create'" :gutter="20">
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model.trim="userForm.password" type="password" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复密码" prop="rePassword">
            <el-input v-model.trim="userForm.rePassword" type="password" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item v-if="dialogStatus=='create'" label="角色" prop="roleid">
            <select-tree v-model="userForm.roleid" :default-expanded-keys="[userForm.roleid]" :options="roleTreeList" :props="roleProps" />
          </el-form-item>
          <el-form-item v-else label="角色">
            <el-input v-model="roleName" :disabled="dialogStatus=='update'" type="text" placeholder="无" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构" prop="deptId">
            <dept-select v-model="userForm.deptId" :dept-show="true" :default-expanded-keys="[userForm.roleid]" placeholder="请选择组织机构" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="userForm.email" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model.trim="userForm.phone" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="btnLoading" type="primary" @click="saveData">
        保存
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { toTreeList } from '@/utils/structure'
import SelectTree from '@/components/SelectTree/singleSelect'
import DeptSelect from '@/components/DeptSelect'
import { regularReg } from '@/utils/validate'
import { getRoleTreeList } from '@/api/system/role'
import { addUser, updateUser } from '@/api/system/user'
import { RSAencrypt } from '@/utils/security'

export default {
  name: 'EditUser',
  components: { SelectTree, DeptSelect },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (this.userForm.rePassword !== '') {
          this.$refs.dataForm.validateField('rePassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
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
        id: '', // 编号
        account: '', // 账号
        name: '', // 姓名
        email: '', // 邮箱，
        phone: '', // 手机号，
        deptId: '', // 组织机构编号
        roleid: '', // 角色
        password: '', // 密码
        rePassword: '', // 重复密码
        birthday: ''
      }, // 表单
      deptProps: { parent: 'pid', value: 'id', label: 'name', children: 'children' },
      roleProps: { parent: 'pid', value: 'id', label: 'name', children: 'children' },
      roleTreeList: null, // 角色树列表数据
      sexList: this.$store.getters.sexList, // 性别选项
      textMap: {
        update: '编辑用户',
        create: '新增用户'
      }, // 表头显示标题
      rules: {
        account: [{ required: true, message: '账号不能为空', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: '姓名不能为空', trigger: ['blur', 'change'] }],
        password: [{ required: true, validator: validatePass, trigger: ['blur', 'change'] }],
        rePassword: [{ required: true, validator: validatePass2, trigger: ['blur', 'change'] }],
        deptId: [{ required: true, message: '组织机构必选', trigger: ['blur', 'change'] }],
        roleid: [{ required: true, message: '角色必选', trigger: ['blur', 'change'] }],
        email: [{ required: false, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
        phone: [{ required: false, pattern: regularReg.mobile, message: '请输入正确的手机号', trigger: ['blur', 'change'] }]
      }, // 前端校验规则
      roleName: '', // 角色名，展示用
      btnLoading: false // 保存按钮的加载中状态
    }
  },
  created() {
    this.fetchRoleTree()
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.userForm = {
          id: row.id, // 编号
          account: row.account, // 账号
          name: row.name, // 姓名
          email: row.email, // 邮箱，
          phone: row.phone, // 手机号，
          deptId: row.deptId, // 组织机构编号
          roleid: row.roleid, // 角色
          birthday: row.birthday, // 生日
          sex: row.sex // 性别
        }
        this.roleName = row.roleName
        delete this.userForm['password']
        delete this.userForm['rePassword']
      }
    },
    // 加载角色树形下拉菜单
    fetchRoleTree: function() {
      getRoleTreeList(this.listQuery).then(response => {
        console.log(response.data)
        if (response.data.list) { // 将列表转树结构
          this.roleTreeList = toTreeList(response.data.list, '0', true)
        }
      })
    },
    // 重置表单
    resetForm() {
      this.userForm = {
        id: '', // 编号
        account: '', // 账号
        name: '', // 姓名
        email: '', // 邮箱，
        phone: '', // 手机号，
        deptId: '', // 组织机构编号
        roleid: '', // 角色
        password: '', // 密码
        rePassword: '' // 重复密码
      }
    },
    // 保存数据
    saveData: function() {
      if (this.dialogStatus === 'update') {
        this.updateData()
      } else if (this.dialogStatus === 'create') {
        this.createData()
      }
    },
    // 新增数据
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.userForm)
        const userForm = JSON.parse(JSON.stringify(this.userForm))
        userForm.password = RSAencrypt(userForm.password)
        userForm.rePassword = RSAencrypt(userForm.rePassword)
        if (valid) {
          this.btnLoading = true
          addUser(userForm).then(response => {
            if (response.code === 200) {
              this.$confirm('新增成功，是否继续新增?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'info'
              }).then(() => {
                this.btnLoading = false
                this.resetForm()
                this.$nextTick(() => {
                  this.$refs['dataForm'].clearValidate()
                })
              }).catch(() => {
                this.$emit('watchChild')
                this.dialogFormVisible = false
              })
            }
          }).catch(_ => { // 异常情况，loading置为false
            this.btnLoading = false
          })
        }
      })
    },
    // 修改数据
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateUser(this.userForm).then(response => {
            if (response.code === 200) {
              this.$message.success('修改成功')
              this.$emit('watchChild')
              this.dialogFormVisible = false
            }
          }).catch(_ => { // 异常情况，loading置为false
            this.btnLoading = false
          })
        }
      })
    },
    cancel: function() {
      this.dialogFormVisible = false
      this.$emit('watchChild')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-select{
    width: 100%;
  }
</style>
