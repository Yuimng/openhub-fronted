<template>
  <ul
    v-infinite-scroll="load"
    infinite-scroll-delay="500"
    :infinite-scroll-disabled="isDisabledLoad"
    class="infinite-list"
  >
    <li v-for="item in MomentList" :key="item.id" class="infinite-list-item">
      <moment-item :item-data="item"></moment-item>
    </li>
    <div v-if="isDisabledLoad" class="no-data">已经没有数据了喔/(ㄒoㄒ)/~~</div>
  </ul>
</template>

<script setup lang="ts">
import MomentItem from '@/components/moment-item'
import { useMainStoreWithOut } from '@/store/main'
import { ref, computed } from 'vue'

const MainStore = useMainStoreWithOut()

const MomentList = computed(() => MainStore.MomentList.flat())

// 从第 0 开始的数据默认加载函数的时候 logics/initAppConfig.ts 加载2条数据
const count = ref(1)
// 初始不禁用加载
const isDisabledLoad = ref(false)

const load = () => {
  const isMore = MainStore.getMomentListAction(count.value * 2)
  isMore.then((val) => {
    if (val) {
      // 如果为真 继续加1
      count.value += 1
    }
    // 如果为真 继续可加载 如果为假 禁用加载
    isDisabledLoad.value = !val
  })
}
</script>

<style lang="less" scoped>
li {
  text-decoration: none;
}

.infinite-list {
  height: 680px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.no-data {
  text-align: center;
  color: #b1b3b8;
  padding-bottom: 20px;
}
</style>
