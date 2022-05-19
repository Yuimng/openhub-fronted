<template>
  <div class="custom-card my-mb-10">
    <div class="moment-item__main">
      <div class="moment-item__avatar">
        <el-avatar
          :size="48"
          class="header-avatar"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
      </div>
      <div class="moment-item__header">
        <div class="moment-title">
          <span class="moment-title__text">一只小九九丫</span>
        </div>
        <div class="moment-time">2小时前</div>
      </div>
      <div class="moment-item__body">
        <div class="moment-content">
          孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”
          “什么清白？我前天亲眼见你偷了何家的书，吊着打。”
          孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，
          “窃书不能算偷……窃书！……读书人的事，能算偷么？”
          接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来。
        </div>
        <el-space wrap class="moment-album">
          <div v-for="i in srcList" :key="i">
            <el-image
              style="width: 100px; height: 100px"
              :src="i"
              :preview-src-list="srcList"
              :initial-index="4"
              fit="cover"
            />
          </div>
        </el-space>
      </div>
      <div class="moment-item__footer">
        <div class="comment-action">
          <ChatDotSquare class="comment-action__icon" />
          <span class="comment-action__count">17</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatDotSquare } from '@element-plus/icons-vue'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
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
        padding-left: 4px;
      }
    }
    .comment-action:hover {
      color: #f4f4f5;
      background-color: #b1b3b8;
    }
  }
}
</style>
