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
    <el-form-item>
      <el-input
        v-model="form.password_2nd"
        :prefix-icon="LockIcon"
        type="password"
        show-password
        placeholder="请再次输入密码"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { User as UserIcon, Lock as LockIcon } from '@element-plus/icons-vue'
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: '',
  password_2nd: ''
})
</script>

<style lang="less" scoped>
.login {
  &-btns {
    width: 100%;
    margin-bottom: 18px;
  }
}
</style>
