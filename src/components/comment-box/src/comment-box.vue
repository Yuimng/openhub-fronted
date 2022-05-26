<template>
  <div class="comment-divider">
    <el-divider />
  </div>
  <div class="comment-area">
    <el-form :model="form" class="comment-text">
      <el-form-item>
        <el-input
          v-model="form.content"
          type="textarea"
          placeholder="留下你的精彩评论吧( •̀ ω •́ )✧"
          rows="3"
          autoszie
        />
      </el-form-item>
    </el-form>
    <div class="comment-action">
      <el-button class="comment-btn" type="primary" @click="onSubmit">
        发表评论
      </el-button>
    </div>
  </div>
  <div class="comment-list">1</div>
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
.comment-divider {
  padding: 0 12px 0 88px;
}

.comment-area {
  padding: 0 12px 0 88px;
  display: flex;
  .el-form {
    width: 100%;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .comment-action {
    margin-left: 10px;
    .comment-btn.el-button {
      height: 100%;
      white-space: unset;
      padding: 8px 20px;
      line-height: 1.5;
    }
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
