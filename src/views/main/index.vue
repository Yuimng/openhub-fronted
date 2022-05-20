<template>
  <div class="header">
    <nav-header></nav-header>
  </div>
  <div class="main">
    <div class="main-column">
      <router-view></router-view>
    </div>
    <div class="aside-column">
      <el-affix :offset="10">
        <user-info></user-info>
      </el-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavHeader from '@/components/nav-header'
import UserInfo from '@/components/user-info'
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  border-bottom: solid 1px #dcdfe6;
  min-width: 1030px;
}

.main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  width: 1000px;
  padding: 0 16px;
  margin: 10px auto;
  .main-column {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 10px;
    margin-bottom: 0;
    width: 694px;
  }
  .aside-column {
    -webkit-box-flex: 1;
    -ms-flex: 1 1;
    flex: 1 1;
    font-size: 14px;
  }
}
</style>
