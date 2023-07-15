<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body>
    <el-form ref="dataForm" :rules="rules" :model="areaForm" label-position="right" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="区域名称" prop="areaName">
            <el-input v-model.trim="areaForm.areaName" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="区域简称" prop="simplename">
            <el-input v-model.trim="areaForm.simplename" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="区域编码" prop="id">
            <el-input v-model.trim="areaForm.id" :disabled="isEditMode" type="text" placeholder="必填" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级区域" prop="pName">
            <el-input :value="areaForm.pName" type="text" placeholder="必选" @focus="openAreaSelect" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="区域等级" prop="level">
            <el-select v-model="areaForm.level" placeholder="必选">
              <el-option
                v-for="item in areaLevelList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="num">
            <el-input-number v-model.number="areaForm.num" style="width:100%" placeholder="必填" />
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
    <area-select-tree ref="areaSelect" @selectDone="changeParent" />
  </el-dialog>
</template>

<script>
import { toTreeList } from '@/utils/structure'
import { getAreaType, addArea, updateArea } from '@/api/system/area'
import AreaSelectTree from './areaSelectTree'

export default {
  name: 'EditArea',
  components: { AreaSelectTree },
  data() {
    return {
      dialogFormVisible: false, // 对话框是否显示
      dialogStatus: '', // 对话框类型：create,update
      isEditMode: true,
      areaForm: {
        id: '', // 编号
        pid: '', // 父级编号
        pName: '', // 父级名称
        areaName: '', // 区域名
        simplename: '', // 别名，
        level: '',
        num: 99 // 排序
      }, // 表单
      areaSelectShow: false,
      areaLevelList: [], // 区域树列表数据
      textMap: {
        update: '编辑',
        create: '新增'
      }, // 表头显示标题
      btnLoading: false, // 保存按钮的加载中状态
      rules: {
        id: [{ required: true, message: '区域编号不能为空', trigger: ['blur', 'change'] }],
        areaName: [{ required: true, message: '区域名称不能为空', trigger: ['blur', 'change'] }],
        simplename: [{ required: true, message: '区域简称不能为空', trigger: ['blur', 'change'] }],
        pName: [{ required: true, message: '上级区域必选', trigger: ['blur', 'change'] }],
        level: [{ required: true, message: '区域等级必选', trigger: ['blur', 'change'] }],
        num: [{ required: true, message: '排序必填' }, { type: 'number', message: '必须为数字值' }]
      } // 前端校验规则
    }
  },
  computed: {
    areaTree: function() {
      const tree = toTreeList(this.areaTreeList)
      console.log(tree)
      return tree
    }
  },
  created() {
    this.fetchAreaType()
  },
  methods: {
    // 初始化对话框
    initDialog: function(dialogStatus, row = null) {
      this.dialogStatus = dialogStatus
      this.dialogFormVisible = true
      this.btnLoading = false
      if (dialogStatus === 'create') { // 如果是新增，清除验证
        this.resetForm()
        this.isEditMode = false
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      } else if (dialogStatus === 'update') { // 如果是修改，将row中数据填写到输入框中
        this.areaForm = {
          id: row.id, // 编号
          pid: row.pid, // 父级编号
          pName: row.pName, // 父级编号
          areaName: row.name, // 区域名
          simplename: row.simplename, // 别名，
          level: '' + row.level,
          num: row.num // 排序
        }
        this.isEditMode = true
      }
    },
    // 获取区域类型
    fetchAreaType() {
      getAreaType().then(response => {
        this.areaLevelList = response.data
      })
    },
    // 打开区域选择弹窗
    openAreaSelect() {
      this.areaSelectShow = true
      setTimeout(this.$refs.areaSelect.initDialog(), 200)
    },
    // 修改pid
    changeParent(node) {
      this.areaForm.pid = node.id
      this.areaForm.pName = node.name
    },
    // 重置表单
    resetForm() {
      this.areaForm = {
        id: '', // 编号
        pid: '', // 父级编号
        pName: '', // 父级名称
        areaName: '', // 区域名
        simplename: '', // 别名，
        level: '',
        num: 99 // 排序
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
        console.log(this.areaForm)
        if (valid) {
          this.btnLoading = true
          addArea(this.areaForm).then(response => {
            if (response.code === 200) {
              this.$confirm('新增成功，是否继续新增?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'info'
              }).then(() => { // 选是
                this.resetForm()
                this.btnLoading = false
                this.$nextTick(() => {
                  this.$refs['dataForm'].clearValidate()
                })
              }).catch(() => { // 选否,关闭窗口，并刷新页面
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
          updateArea(this.areaForm).then(response => {
            if (response.code === 200) {
              this.$message.success('修改成功')
              this.$refs['dataForm'].clearValidate()
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
      // this.$emit('watchChild')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-dialog{
    width:700px
  }
  .el-select{
    width: 100%;
  }
</style>
