<template>
  <div class="upload-images">
    <div class="upload-images_header">
      <div class="upload-title">动态配图</div>
      <el-button
        text
        type="primary"
        class="upload-btn"
        :disabled="props.pictureCount >= 9 ? true : false"
        @click="submitUpload"
      >
        上传图片
      </el-button>
    </div>
    <el-upload
      ref="uploadImagesRef"
      :action="uploadImagesUrl"
      list-type="picture-card"
      :headers="headersConfig"
      name="picture"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
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
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file, uploadFiles)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <div v-if="isDisabled" class="upload-images_footer">
      已满 9 张图，不可继续添加图片
    </div>
  </div>

  <el-dialog v-model="dialogVisible">
    <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile, UploadInstance } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { inject, ref } from 'vue'

import localCache from '@/utils/cache'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const isDisabled = ref(false)

interface Props {
  momentId: number
  pictureCount: number
}

const props = withDefaults(defineProps<Props>(), {
  momentId: 0,
  pictureCount: 0
})

// 判定9图
if (props.pictureCount >= 9) {
  isDisabled.value = true
}

// 1.设置上传请求头
const headersConfig = ref()
const token = localCache.getCache('token')
if (token) {
  headersConfig.value = {
    Authorization: `Bearer ${token}`
  }
}

// 2.上传路径
const uploadImagesUrl = `/api/upload/picture?momentId=${props.momentId}`

const fileList = ref<UploadUserFile[]>([])

// 3. 上传前文件类型和大小处理
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

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  const delIndex = fileList.value.findIndex(
    (item) => item.url == uploadFile.url
  )
  fileList.value.splice(delIndex, 1)
  isDisabled.value = false
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFiles.length >= 9 - props.pictureCount) {
    isDisabled.value = true
  }
}

const uploadImagesRef = ref<UploadInstance>()

// 4. 提交上传 弹窗确认触发
const submitUpload = () => {
  if (fileList.value.length == 0) {
    ElMessage.error('请先选择要上传的图片!')
  } else {
    uploadImagesRef.value!.submit()
  }
}

// 爷孙级传递
const ReLoadList: any = inject('ReLoadList')

// 5. 上传提交结果处理
const handleSuccess: UploadProps['onSuccess'] = (response) => {
  if (response.code == 200) {
    ElMessage.success('上传成功!')
    // 刷新页面
    ReLoadList()
  } else {
    ElMessage.error('上传失败！')
  }
}

// 查看图
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style lang="less" scoped>
.upload-images {
  width: 324px;
  font-size: 14px;
  .upload-images_header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    .upload-title {
      height: 32px;
      line-height: 32px;
    }
  }
}

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
</style>
