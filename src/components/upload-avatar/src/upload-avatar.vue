<template>
  <div class="avatar-uploader-box">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :headers="headersConfig"
      name="avatar"
      action="/api/upload/avatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="handleChange"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadInstance } from 'element-plus'

// 1.设置上传请求头
import localCache from '@/utils/cache'
const headersConfig = ref()
const token = localCache.getCache('token')
if (token) {
  headersConfig.value = {
    Authorization: `Bearer ${token}`
  }
}

// 图片显示地址
const imageUrl = ref('')

// 2. 上传前文件类型和大小处理
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isImage =
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/jpeg'
  const isLt2M = rawFile.size < 1024 * 1024 * 2
  if (!isImage) {
    ElMessage.error('头像图片格式只能为 png jpg jpeg 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('头像图片大小不超过2M!')
    return false
  }
  return true
}

// 3. 上传中
const handleChange: UploadProps['onChange'] = (uploadFile) => {
  // 先展示头像 并未上传
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const uploadRef = ref<UploadInstance>()

// 4. 提交上传 弹窗确认触发
const submitUpload = () => {
  if (imageUrl.value == '') {
    ElMessage.error('请先选择要上传头像!')
  } else {
    uploadRef.value!.submit()
  }
}

defineExpose({ submitUpload })

const emits = defineEmits(['uploadSuccess'])

// 5. 上传提交结果处理
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  if (response.code == 200) {
    // 上传成功
    emits('uploadSuccess')
  }
}
</script>

<style scoped>
.avatar-uploader-box {
  display: flex;
  justify-content: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
