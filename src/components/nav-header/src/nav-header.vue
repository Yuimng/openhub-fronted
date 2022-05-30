<template>
  <div class="nav-header">
    <div class="nav-header-left">
      <div class="nav-logo">
        <div class="nav-logo_img"></div>
        <h1 class="nav-logo_title">OPENHUB</h1>
      </div>
      <el-menu
        :default-active="defaultValue"
        mode="horizontal"
        router
        class="custom-memu"
      >
        <el-menu-item index="/main/discover">发现</el-menu-item>
        <el-menu-item index="/main/workspace">工作台</el-menu-item>
      </el-menu>
    </div>
    <div class="nav-header-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :src="
              avatar_url ??
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          ></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><span @click="handleExitClick">退出登录</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import localCache from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useLoginStoreWithOut } from '@/store/login'

const userLoginStore = useLoginStoreWithOut()
const avatar_url = computed(() => userLoginStore.userInfo.avatar_url)

const router = useRouter()

// 刷新页面可获取当前路径
const currentPath = useRoute().path
const defaultValue = ref(currentPath)

const handleExitClick = () => {
  localCache.deleteCache('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  width: auto;
  max-width: 1156px;
  min-width: 1000px;
  margin: 0 auto;
  .nav-header-left {
    display: flex;
    .nav-logo {
      margin-right: 40px;
      display: flex;
      .nav-logo_img {
        background-image: url('@/assets/images/Watermelon_Outline.svg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        width: 80px;
      }
      h1.nav-logo_title {
        margin: 0;
        line-height: 59px;
        font-size: 18px;
      }
    }
    .custom-memu {
      width: 200px;
      font-weight: 600;
    }

    .el-menu-item {
      font-size: 15px;
    }
  }

  .nav-header-right {
    .el-dropdown-link {
      height: 59px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.el-menu--horizontal.custom-memu {
  border-bottom: none;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #fff;
  color: #303133;
}
</style>
