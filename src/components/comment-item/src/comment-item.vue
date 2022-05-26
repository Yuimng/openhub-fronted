<template>
  <div class="comment-item__main">
    <div class="comment-item__avatar">
      <el-avatar
        :size="48"
        class="header-avatar"
        :src="
          itemData.author.avatar_url ??
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        "
      ></el-avatar>
    </div>
    <div class="comment-item__header">
      <div class="comment-title">
        <span class="comment-title__text">{{ itemData.author.name }}</span>
      </div>
      <div class="comment-time">{{ $relativeTime(itemData.updateTime) }}</div>
    </div>
    <div class="comment-item__body">
      <div class="comment-content">
        {{ itemData.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  itemData: any
}

withDefaults(defineProps<Props>(), {
  itemData: () => ({})
})
</script>

<style lang="less" scoped>
.my-mb-10 {
  margin-bottom: 10px;
}

.comment-item__main {
  padding: 0 12px 0 88px;
  position: relative;
  .comment-item__avatar {
    width: 48px;
    height: 48px;
    left: 24px;
    position: absolute;
    top: 24px;
  }

  .comment-item__header {
    height: 53px;
    padding-top: 27px;
    .comment-title {
      height: 24px;
      display: flex;
      align-items: center;
      .comment-title__text {
        font-weight: 600;
      }
    }
    .comment-time {
      padding-top: 4px;
      height: 22px;
      line-height: 18px;
      color: #99a2aa;
      font-size: 12px;
    }
  }

  .comment-item__body {
    padding-right: 7px;
    .comment-content {
      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 22px;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}
</style>
