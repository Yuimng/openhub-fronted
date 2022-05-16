<template>
  <div>
    <div class="info-card">
      <div class="info-card__header">
        <div class="info-card_header_img"></div>
        <div class="info-card_header_avatar">
          <el-avatar
            size="large"
            :src="
              avatar_url ??
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          ></el-avatar>
        </div>
      </div>
      <div class="info-card__content">
        <div class="info-card__name">{{ username }}</div>
        <div class="info-card__status">
          <a href="/main/workspace" class="info-card__status_a">
            <span class="info-card__status__moment">动态</span>
            <span class="info-card__status__count">{{ momentCount }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLoginStoreWithOut } from '@/store/login'

const userLoginStore = useLoginStoreWithOut()
const avatar_url = computed(() => userLoginStore.userInfo.avatar_url)
const username = computed(() => userLoginStore.userInfo.name)
const momentCount = computed(() => userLoginStore.userInfo.momentCount)
</script>

<style lang="less" scoped>
.info-card {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  height: 228px;
}

.info-card__header {
  position: relative;
  height: 128px;
  width: 100%;
  .info-card_header_img {
    background-image: url('@/assets/images/Watermelon_Isometric.svg');
    background-position: 50% 40%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
  }
  .info-card_header_avatar {
    position: absolute;
    bottom: -28px;
    left: 120px;
  }
}

.info-card__content {
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 128px);
  position: relative;
  padding: 32px 0 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .info-card__name,
  .info-card__status {
    margin: 0 auto;
  }

  .info-card__status_a {
    text-decoration: none;
    color: #121212;
    .info-card__status__moment {
      padding-right: 4px;
    }
  }
  .info-card__status_a:hover {
    color: #409eff;
  }
}
</style>
