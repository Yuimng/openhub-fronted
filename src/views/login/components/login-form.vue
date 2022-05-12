<template>
  <el-form :model="form">
    <el-form-item>
      <el-input
        v-model="form.username"
        :prefix-icon="UserIcon"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="form.password"
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
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  password: ''
})

const isKeepPassword = ref(true)
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
