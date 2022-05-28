<template>
  <div class="custom-card my-mb-10">
    <div class="moment-item__main">
      <div class="moment-item__avatar">
        <el-avatar
          :size="48"
          class="header-avatar"
          :src="
            itemData.author.avatar_url ??
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
      </div>
      <div class="moment-item__header">
        <div class="moment-title">
          <span class="moment-title__text">{{ itemData.author.name }}</span>
        </div>
        <div class="moment-time">{{ $relativeTime(itemData.updateTime) }}</div>
      </div>
      <div class="moment-item__body">
        <div class="moment-content">
          {{ itemData.content }}
        </div>
        <el-space wrap class="moment-album">
          <div v-for="i in itemData.images" :key="i">
            <el-image
              style="width: 100px; height: 100px"
              :src="i"
              :preview-src-list="itemData.images"
              :initial-index="1"
              fit="cover"
            />
          </div>
        </el-space>
      </div>
      <div class="moment-item__footer">
        <div class="comment-action" @click="openComment = !openComment">
          <ChatDotSquare class="comment-action__icon" />
          <span class="comment-action__count">{{ itemData.commentCount }}</span>
        </div>
      </div>
    </div>
    <div v-if="openComment" class="comment-box">
      <comment-box :moment-id="itemData.id"></comment-box>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentBox from '@/components/comment-box'
import { ChatDotSquare } from '@element-plus/icons-vue'
import { ref } from 'vue'

interface Props {
  itemData: any
}

withDefaults(defineProps<Props>(), {
  itemData: () => ({})
})

const openComment = ref(false)
</script>

<style lang="less" scoped>
.my-mb-10 {
  margin-bottom: 10px;
}

.moment-item__main {
  padding: 0 12px 0 88px;
  position: relative;
  .moment-item__avatar {
    width: 48px;
    height: 48px;
    left: 24px;
    position: absolute;
    top: 24px;
  }

  .moment-item__header {
    height: 53px;
    padding-top: 27px;
    .moment-title {
      height: 24px;
      display: flex;
      align-items: center;
      .moment-title__text {
        font-weight: 600;
      }
    }
    .moment-time {
      padding-top: 4px;
      height: 22px;
      line-height: 18px;
      color: #99a2aa;
      font-size: 12px;
    }
  }

  .moment-item__body {
    padding-right: 7px;
    .moment-content {
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 22px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .moment-album {
      padding-top: 10px;
      width: 340px;
      .el-image {
        border-radius: 4px;
      }
    }
  }

  .moment-item__footer {
    height: 28px;
    margin: 8px 0;
    display: flex;
    flex-direction: row-reverse;
    .comment-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      border-radius: 4px;
      color: #b1b3b8;
      background-color: #f4f4f5;
      cursor: pointer;
      .comment-action__icon {
        width: 16px;
        height: 16px;
        font-weight: 600;
      }
      .comment-action__count {
        padding-left: 8px;
      }
    }
    .comment-action:hover {
      color: #f4f4f5;
      background-color: #b1b3b8;
    }
  }
}
</style>
