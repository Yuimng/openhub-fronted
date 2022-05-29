<template>
  <div class="comment-box">
    <div class="comment-header">
      <span class="comment-header_content">评论区</span>
    </div>
    <div v-if="props.isDiscover" class="comment-area">
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
import { reactive, ref, computed } from 'vue'
import { useMainStoreWithOut } from '@/store/main'
import CommentItem from '@/components/comment-item'

import { postComment } from '@/service/main'

import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'

interface Props {
  isDiscover: boolean
  momentId: number
}

const props = withDefaults(defineProps<Props>(), {
  isDiscover: true,
  momentId: 0
})

// 加载获取有评论的动态数据
const MainStore = useMainStoreWithOut()

const commentListData = ref()

const LoadCommentData = (isPost: boolean) => {
  const doneFlag = MainStore.getMomentCommentAction(props.momentId, isPost)

  doneFlag.then(() => {
    // 在数据获取完毕之后再读取对应的评论数据
    const momentDetailArray = computed(() => MainStore.MomentDetailArray)
    commentListData.value = momentDetailArray.value.find(
      (item) => item.id == props.momentId
    )?.comments
  })
}

// 加载评论数据
LoadCommentData(false)

// 发表评论功能
const form = reactive({
  content: ''
})

const onSubmit = async () => {
  if (form.content.trim() != '') {
    const result = await postComment({
      momentId: props.momentId,
      content: form.content
    })
    if (result.code == 200) {
      // 清除文本
      form.content = ''
      // 重新载入评论数据
      LoadCommentData(true)
    } else {
      ElMessage({
        message: result.msg,
        type: 'error'
      })
    }
  } else {
    ElMessage({
      message: '(～￣▽￣)～内容不能为空喔',
      type: 'error'
    })
  }
}
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
