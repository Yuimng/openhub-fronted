<template>
  <div class="container">
    <div class="left-image">
      <img src="@/assets/images/reading-side.svg" alt="laying" />
    </div>
    <div class="content">
      <div class="login-wrapper">
        <div class="login-title">{{ isLogin ? '登录' : '注册' }} OpenHub</div>
        <div class="login-sub-title">欢迎{{ isLogin ? '登录' : '注册' }}</div>
        <transition name="ming" mode="out-in">
          <div v-if="isLogin">
            <login-form ref="loginRef"></login-form>
          </div>
          <div v-else>
            <register-form></register-form>
          </div>
        </transition>
        <el-button type="primary" class="login-btns" @click="handleSubmitClick">
          立即{{ isLogin ? '登录' : '注册' }}
        </el-button>
        <el-button class="login-btns" text @click="isLogin = !isLogin">
          {{ isLogin ? '注册账号' : '登录账号' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'

const isLogin = ref(true)

const loginRef = ref<InstanceType<typeof LoginForm>>()

const handleSubmitClick = () => {
  if (isLogin.value) {
    loginRef.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;
  .left-image {
    display: flex;
    align-items: center;
    background: #f2f3f5;
    img {
      max-width: 700px;
      padding: 70px;
    }
  }

  .content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }
}

.login {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: #000;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: #ccc;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 18px;
  }

  &-btns {
    width: 100%;
    margin-bottom: 18px;
  }
}

.el-button + .el-button {
  margin-left: unset;
}

.ming-enter-from,
.ming-leave-to {
  opacity: 0;
}

.ming-enter-active,
.ming-leave-active {
  transition: opacity 0.5s ease;
}
</style>
