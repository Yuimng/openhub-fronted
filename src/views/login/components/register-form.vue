<template>
  <el-form ref="registerFormRef" :model="registerAccount" :rules="rules">
    <el-form-item prop="name">
      <el-input
        v-model="registerAccount.name"
        :prefix-icon="UserIcon"
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="registerAccount.password"
        :prefix-icon="LockIcon"
        type="password"
        show-password
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="registerAccount.confirmPassword"
        :prefix-icon="MoreIcon"
        type="password"
        show-password
        placeholder="请再次输入密码"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  User as UserIcon,
  Lock as LockIcon,
  More as MoreIcon
} from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { useLoginStoreWithOut } from '@/store/login'

const LoginStore = useLoginStoreWithOut()
const registerFormRef = ref<FormInstance>()

const registerAccount = reactive({
  name: '',
  password: '',
  confirmPassword: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerAccount.confirmPassword !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerAccount.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  name: [
    { required: true, message: '请输入账号名称', trigger: 'blur' },
    { min: 2, max: 10, message: '账号名称长度为2-10个字符', trigger: 'blur' }
  ],
  password: [
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或数字',
      trigger: 'blur'
    },
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
})

const emits = defineEmits(['goLogin'])

const registerAction = () => {
  registerFormRef.value?.validate((valid) => {
    if (valid) {
      // 1.注册
      const registerFlag = LoginStore.accountRegisterAction({
        name: registerAccount.name,
        password: registerAccount.password
      })
      // 注册成功切换登录页面
      registerFlag.then((val) => {
        if (val) {
          emits('goLogin', val)
        }
      })
    }
  })
}

// setup 将方法暴露出去
defineExpose({
  registerAction
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
