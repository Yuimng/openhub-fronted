<template>
  <div class="custom-card my-mb-10">
    <div class="post-area">
      <el-form :model="form" class="post-text">
        <el-form-item>
          <el-input
            v-model="form.content"
            type="textarea"
            placeholder="快来发表你此刻的想法吧~"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </el-form-item>
      </el-form>
      <div class="post-action">
        <el-popover :visible="popVisible" placement="bottom-start" :width="332">
          <template #reference>
            <div class="action-box" @click="popVisible = true">
              <Picture class="action__icon" />
            </div>
          </template>
          <div class="upload-header">
            <div class="upload-header_text">
              <span>图片上传</span>
              <span class="images-count">{{ form.files.length }} / 9</span>
            </div>
            <CloseBold class="upload-header_icon" @click="closeTip" />
          </div>
          <div style="padding-left: 8px">
            <upload-images
              ref="uploadImagesRef"
              @submit-files="submitFiles"
            ></upload-images>
          </div>
        </el-popover>
        <el-button
          class="post-btn"
          type="primary"
          :disabled="disabledPost"
          @click="onSubmit"
        >
          发布动态
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Picture, CloseBold } from '@element-plus/icons-vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

import UploadImages from '@/components/upload-images'
import { reactive, ref, watch } from 'vue'
import { UploadFiles } from 'element-plus/lib/components'
import { postMomentWithPic } from '@/service/main'

const popVisible = ref(false)
const disabledPost = ref(true)

const form = reactive<{
  content: string
  files: UploadFiles
}>({
  content: '',
  files: []
})

const uploadImagesRef = ref<InstanceType<typeof UploadImages>>()

const submitFiles = (filesArr: UploadFiles) => {
  form.files = filesArr
}

const emits = defineEmits(['afterPost'])

const onSubmit = async () => {
  const data = new FormData()
  data.append('content', form.content)
  form.files.forEach((item) => data.append('picture', item.raw!))
  const res = await postMomentWithPic(data)
  if (res.code == 200) {
    ElMessage.success(res.msg)
    // 清除提交数据
    clearData()
    // 触发刷新列表
    emits('afterPost')
  }
}

watch(form, (newValue) => {
  const hasFiles = newValue.files.length !== 0 ? true : false
  if (hasFiles) {
    disabledPost.value = false
  } else {
    newValue.content.trim() != ''
      ? (disabledPost.value = false)
      : (disabledPost.value = true)
  }
})

const closeTip = () => {
  if (form.files.length != 0) {
    ElMessageBox.confirm('关闭将清除所有已添加图片，请确认', '图片上传', {
      confirmButtonText: '清除图片',
      cancelButtonText: '点错了~',
      type: 'warning',
      center: true
    })
      .then(() => {
        // 触发清除图片
        uploadImagesRef.value?.removeAll()
        form.files = []
        popVisible.value = false
      })
      .catch(() => {
        return
      })
  } else {
    popVisible.value = false
  }
}

// 提交后清除数据 并关闭弹出框
const clearData = () => {
  uploadImagesRef.value?.removeAll()
  form.files = []
  form.content = ''
  popVisible.value = false
}

defineExpose({ clearData })
</script>

<style lang="less" scoped>
.my-mb-10 {
  margin-bottom: 10px;
}

.post-area {
  padding: 4px;
  .el-form-item {
    margin-bottom: 10px;
  }
  .post-action {
    display: flex;
    justify-content: space-between;
    .action-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      border-radius: 4px;
      color: #b1b3b8;
      background-color: #f4f4f5;
      cursor: pointer;
      .action__icon {
        width: 16px;
        height: 16px;
        font-weight: 600;
      }
    }
    .post-btn {
      padding: 0 16px;
    }
  }
}

.upload-header {
  display: flex;
  justify-content: space-between;
  padding: 0 8px 8px;
  .upload-header_text {
    .images-count {
      color: silver;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .upload-header_icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}

:deep(.el-textarea__inner) {
  resize: none;
}

:deep(.el-textarea) {
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a9a9a933;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    width: 8px;
    border-radius: 10px;
  }
}
</style>
