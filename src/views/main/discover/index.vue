<template>
  <post-area @after-post="ReLoadList"></post-area>
  <ul
    v-infinite-scroll="loadData"
    infinite-scroll-delay="500"
    :infinite-scroll-disabled="isNoData"
    infinite-scroll-immediate="false"
    infinite-scroll-distance="300"
    class="infinite-list"
  >
    <li v-for="item in MomentList" :key="item.id" class="infinite-list-item">
      <moment-item :item-data="item"></moment-item>
    </li>
    <li v-if="isNoData" class="data-tip">已经没有数据了喔/(ㄒoㄒ)/~~</li>
    <li v-if="!isNoData" class="data-tip">向下加载数据</li>
  </ul>
</template>

<script setup lang="ts">
import MomentItem from '@/components/moment-item'
import { useMainStoreWithOut } from '@/store/main'
import { ref, computed, watch } from 'vue'
import PostArea from '@/components/post-area'

const MainStore = useMainStoreWithOut()

const MomentList = computed(() => MainStore.MomentList)

const ChangeLength = computed(() => MainStore.MomentList.length)
// 是否没有数据 true 禁用加载
const isNoData = ref(false)

const count = ref(0)

const loadData = () => {
  MainStore.getMomentListAction(count.value * 10, 10)
  count.value += 1
  // 每次加载设置为true watch监听数据 MomentUserList 是否有变化 有变化则变为 false
  isNoData.value = true
}

// 加载数据前清空
MainStore.clearList()
// 默认加载数据
loadData()

// 监听数据数量有变化 置为 false 可继续加载  直至无变化 设置为 true
watch(ChangeLength, (nval, oldval) => {
  isNoData.value = nval == oldval ? true : false
})

// 重载数据
const ReLoadList = () => {
  count.value = 0
  isNoData.value = false
  MainStore.clearList()
  loadData()
}
</script>

<style lang="less" scoped>
.infinite-list {
  height: 300vh;
  padding: 0;
  margin: 0;
  list-style: none;
}

.data-tip {
  text-align: center;
  color: #b1b3b8;
  padding-bottom: 20px;
}
</style>
