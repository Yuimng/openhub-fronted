<template>
  <el-form ref="loginFormRef" :model="account" :rules="rules">
    <el-form-item prop="name">
      <el-input
        v-model="account.name"
        :prefix-icon="UserIcon"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="account.password"
        :prefix-icon="LockIcon"
        type="password"
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
  </el-form>
  <div class="login-actions">
    <el-checkbox v-model="isKeepPassword" class="remember">
      记住密码
    </el-checkbox>
    <el-link type="primary">忘记密码</el-link>
  </div>
</template>

<script setup lang="ts">
import { User as UserIcon, Lock as LockIcon } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import rules from '../config/account-config'
import localCache from '@/utils/cache'
import { useLoginStoreWithOut } from '@/store/login'

const LoginStore = useLoginStoreWithOut()

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const loginFormRef = ref<FormInstance>()

const isKeepPassword = ref(true)

const loginAction = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否记住密码
      if (isKeepPassword.value) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      // 2.登录验证
      LoginStore.accountLoginAction({ ...account })
    }
  })
}

// setup 将方法暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.login {
  &-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 18px;
    .el-checkbox.remember {
      height: 32px;
    }
  }

  &-btns {
    width: 100%;
    margin-bottom: 18px;
  }
}
</style>
