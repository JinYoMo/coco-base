<template>
  <el-button class="edit_btn" size="small" @click="downloadTemplate">
    批量导入模板下载
  </el-button>
</template>

<script>
import { downloadTemplate } from '@/api/common'
export default {
  name: 'DownloadTemplate',
  props: {
    filename: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 下载模板
    downloadTemplate() {
      if (this.filename !== '') {
        const filename = this.filename
        // 全屏加载动画
        const loading = this.$loading({
          lock: true,
          text: '数据处理中,请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        downloadTemplate(filename).then(res => {
          loading.close() // 关闭加载动画
          console.log('download===', res)
          const blob = new Blob([res.data])
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = filename // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放blob对象
        }).catch((res) => {
          loading.close()
          this.$message.error(res.message)
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .edit_btn{
    float:right;
    margin:7px 3px;//为了需要居中显示margin-top和bottom要用$tableTitleHeight减去按钮原高度除以2
  }
</style>
