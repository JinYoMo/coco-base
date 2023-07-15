<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" custom-class="dict-dialog" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="dictForm" label-position="right" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="字典编码" prop="dictCode">
            <el-input v-model.trim="dictForm.dictCode" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model.trim="dictForm.dictName" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-button type="primary" @click="addDetail">
            添加
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="字典描述" prop="tips">
            <el-input v-model.trim="dictForm.dictTips" type="text" placeholder="非必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="divider" />
      <el-row v-for="(detail,index) in details" :key="index" :gutter="10">
        <el-col :span="6">
          <el-form-item :required="true" label="值">
            <el-input v-model="detail.value" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :required="true" label="名称">
            <el-input v-model="detail.name" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :required="true" label="排序">
            <el-input-number v-model.number="detail.num" style="width:100%" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="deleteDetail(index)">
            删除
          </el-button>
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
import { addDict, updateDict } from '@/api/system/dict'

export default {
  name: 'EditDict',
  data() {
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      dictForm: {
        dictId: '',
        dictCode: '',
        dictName: '',
        dictTips: '',
        dictValues: ''
      }, // 表单
      details: [], // 字典详情解构
      textMap: {
        update: '编辑',
        create: '新增'
      }, // 表头显示标题
      btnLoading: false, // 保存按钮的加载中状态
      rules: {
        dictCode: [{ required: true, message: '字典编码不能为空', trigger: ['blur'] }],
        dictName: [{ required: true, message: '字典名称不能为空', trigger: ['blur'] }],
        value: [{ required: true, message: '值不能为空', trigger: ['blur'] }],
        name: [{ required: true, message: '名称不能为空', trigger: ['blur'] }],
        num: [{ required: true, message: '排序不能为空' }, { type: 'number', message: '必须为数字值' }]
      } // 前端校验规则
    }
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      // this.fetchPcode()
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.dictForm = {
          dictId: row.id,
          dictCode: row.code,
          dictName: row.name,
          dictTips: row.tips,
          dictValues: row.detail
        }
        this.stringToArray()
      }
    },
    // 字典详情字符串转数组
    stringToArray() {
      const detailArr = this.dictForm.dictValues.split(';')
      this.details = []
      for (const detail of detailArr) {
        const detailItem = detail.split(':')
        const item = {
          value: detailItem[0],
          name: detailItem[1],
          num: detailItem[2]
        }
        this.details.push(item)
      }
    },
    arrayToString() {
      let detailArray = ''
      const details = this.details
      let passFlag = true
      if (details.length === 0) {
        passFlag = false
        this.$message.warning('至少有一个字典值')
        return passFlag
      }
      details.forEach((detail, index) => {
        if (detail.value === '' || detail.name === '') {
          passFlag = false
        }
        detailArray += detail.value + ':' + detail.name + ':' + detail.num
        if (index !== (details.length - 1)) {
          detailArray += ';'
        }
      })
      if (!passFlag) {
        this.$message.warning('请将字典值和名称都填全后再进行保存')
      }
      this.dictForm.dictValues = detailArray
      return passFlag
    },
    // 重置表单
    resetForm() {
      this.dictForm = {
        dictId: '',
        dictCode: '',
        dictName: '',
        dictTips: '',
        dictValues: ''
      }
      this.details = []
    },
    // 保存数据
    saveData: function() {
      const flag = this.arrayToString()
      if (flag) {
        if (this.dialogStatus === 'update') {
          this.updateData()
        } else if (this.dialogStatus === 'create') {
          this.createData()
        }
      }
    },
    addDetail() {
      this.details.push({
        value: '',
        name: '',
        num: ''
      })
    },
    deleteDetail(index) {
      this.details.splice(index, 1)
    },
    // 新增数据
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        console.log(this.dictForm)
        if (valid) {
          this.btnLoading = true
          addDict(this.dictForm).then(response => {
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
          updateDict(this.dictForm).then(response => {
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

<style rel="stylesheet/scss" lang="scss" >
  .dict-dialog{
    width:900px;
    .divider{
      height: 5px;
      border-bottom: 1px dashed #e7eaec;
      margin-bottom: 15px;
    }
  }
</style>
