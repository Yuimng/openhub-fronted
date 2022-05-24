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
        <el-button class="post-btn" type="primary" @click="onSubmit">
          发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  content: ''
})

const emits = defineEmits(['submitContent'])

const onSubmit = () => {
  emits('submitContent', form.content)
}

const clearContent = () => {
  form.content = ''
}

defineExpose({ clearContent })
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
    justify-content: right;
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
