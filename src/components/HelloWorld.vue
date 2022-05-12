<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
    <div>pinia:{{ AppStore.counter }}</div>
    <div>pinia:{{ AppStore.doubleCount }}</div>
    <button type="button" @click="AppStore.increment()">pinia-button</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAppStoreWithOut } from '@/store/app'
const AppStore = useAppStoreWithOut()

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped lang="less">
.hello {
  h1 {
    color: aqua;
  }
}
</style>
