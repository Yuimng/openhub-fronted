<template>
  <div class="comment-box">
    <div class="comment-header">
      <span class="comment-header_content">评论区</span>
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
    <div class="comment-list">
      <template v-for="comment in commentListData" :key="comment.id">
        <comment-item :item-data="comment"></comment-item>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useMainStoreWithOut } from '@/store/main'
import CommentItem from '@/components/comment-item'

interface Props {
  momentId: number
}

const props = withDefaults(defineProps<Props>(), {
  momentId: 0
})

// 加载获取有评论的动态数据
const MainStore = useMainStoreWithOut()

const doneFlag = MainStore.getMomentCommentAction(props.momentId)

const commentListData = ref()

doneFlag.then(() => {
  // 在数据获取完毕之后再读取对应的评论数据
  const momentDetailArray = MainStore.MomentDetailArray
  commentListData.value = momentDetailArray.find(
    (item) => item.id == props.momentId
  )?.comments
})

console.log(commentListData.value)

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
.comment-box {
  background: #fafafa;
  border-radius: 4px;
  padding: 8px 0;
}

.comment-header {
  height: 48px;
  padding: 0 12px 0 18px;
  .comment-header_content {
    font-weight: 600;
    padding: 8px;
    border-bottom: 2px solid #409eff;
  }
}

.comment-divider {
  padding: 0 12px 0 88px;
}

.comment-area {
  padding: 0 12px 0 18px;
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
