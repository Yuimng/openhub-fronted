<template>
  <div class="upload-images">
    <el-upload
      action="#"
      list-type="picture-card"
      name="picture"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :file-list="fileList"
      :auto-upload="false"
      :disabled="isDisabled"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file, uploadFiles }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-delete"
              @click="singleRemove(file, uploadFiles)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { ref } from 'vue'

const isDisabled = ref(false)

const fileList = ref<UploadUserFile[]>([])

// 1. 上传前文件类型和大小处理
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isImage =
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/jpeg'
  const isLt5M = rawFile.size < 1024 * 1024 * 5
  if (!isImage) {
    ElMessage.error('图片格式只能为 png jpg jpeg 格式!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不超过5M!')
    return false
  }
  return true
}

const singleRemove: UploadProps['onRemove'] = (uploadFile) => {
  const delIndex = fileList.value.findIndex(
    (item) => item.url == uploadFile.url
  )
  fileList.value.splice(delIndex, 1)
  isDisabled.value = false
}

const emits = defineEmits(['submitFiles'])

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFiles.length == 9) {
    isDisabled.value = true
  }
  // 回传文件数据
  emits('submitFiles', uploadFiles)
}

const removeAll = () => {
  fileList.value = []
  isDisabled.value = false
}

defineExpose({ removeAll })
</script>

<style lang="less" scoped>
:deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 100px;
}

:deep(.el-upload--picture-card) {
  --el-upload-picture-card-size: 100px;
  margin-bottom: 8px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  border: 0;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

:deep(.is-disabled .el-upload--picture-card) {
  display: none;
}
</style>
