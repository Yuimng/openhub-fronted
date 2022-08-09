<template>
  <ul
    v-infinite-scroll="loadData"
    infinite-scroll-delay="500"
    :infinite-scroll-disabled="isNoData"
    infinite-scroll-immediate="false"
    class="infinite-list"
  >
    <template v-if="ChangeLength == 0">
      <li>
        <div class="custom-card">
          <el-empty
            :image-size="82"
            description="还没有发过动态哦~ 快去发表你的第一条动态吧~"
          />
        </div>
      </li>
    </template>
    <template v-else>
      <li
        v-for="item in MomentUserList"
        :key="item.id"
        class="infinite-list-item"
      >
        <moment-user :item-data="item" @reload-list="ReLoadList"></moment-user>
      </li>
      <div v-if="isNoData" class="data-tip">已经没有数据了喔/(ㄒoㄒ)/~~</div>
      <div v-if="!isNoData" class="data-tip">向下加载数据</div>
    </template>
  </ul>
</template>

<script setup lang="ts">
import MomentUser from '@/components/moment-user'

import { useLoginStoreWithOut } from '@/store/login'
import { useMainStoreWithOut } from '@/store/main'

import { ref, computed, watch } from 'vue'

const LoginStore = useLoginStoreWithOut()
const MainStore = useMainStoreWithOut()

// 获取登录用户
const userId = computed(() => LoginStore.userInfo.id)
// 用于展示的用户数据
const MomentUserList = computed(() => MainStore.MomentUserList)
const ChangeLength = computed(() => MainStore.MomentUserList.length)
// 是否没有数据 true 禁用加载
const isNoData = ref(false)
const count = ref(0)
const loadData = () => {
  MainStore.getMomentUserListAction(userId.value, count.value * 2, 2)
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
  height: 100vh;
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
