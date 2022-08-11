# OpenHub

### 前言

自己一直想做一个前后端的项目，了解和熟悉一个网站从构建到部署的整个流程。学习了node+koa来开发后端接口，也学习了vue3+typescript开发前端页面，所以就有了这么一个项目。

OpenHub是一个能让用户能够随时发表图文动态的平台，而且用户之间可以相互评论内容等。

**预览地址**：[预览地址](http://119.3.19.117) 

### 1.  项目截图

 ![1](https://raw.githubusercontent.com/QuanMiny/Images/main/openhub_images/1.jpg) 

 ![2](https://raw.githubusercontent.com/QuanMiny/Images/main/openhub_images/2.jpg) 

 ![3](https://raw.githubusercontent.com/QuanMiny/Images/main/openhub_images/3.jpg) 

 ![4](https://raw.githubusercontent.com/QuanMiny/Images/main/openhub_images/4.jpg) 

### 2.  项目功能
- ✅ 用户注册
- ✅ 用户登录
- ✅ 上传头像
- ✅ 发表图文动态
- ✅ 动态列表滚动加载
- ✅ 动态评论

### 3. 前端

#### 3.1 项目规范
- **editorconfig配置**： 编辑器规范
- **prettier工具**：代码格式化
- **eslint工具**：代码格式化
- **git Husky**：git commit 规范

#### 3.2 技术栈
**Vue 3 + TypeScript + Vite + Vue-router + Pinia + Axios + Element-Plus + Less**

- 采用 Vue3 的组合式 API (Composition API)开发模式
- 采用 TypeScript 开发语言来规范类型，可在开发过程中进行代码检测
- 采用 Vite 构建工具快速构建项目，配置接口请求代理等
- 采用 Vue-router 进行页面路由配置，包括登录验证
- 采用 Pinia 进行数据状态管理
- 采用 Axios 封装统一接口请求处理，包括token拦截等
- 采用 Element-Plus UI组件库封装组件，如动态多图上传组件等
- 采用 Less 来书写界面样式
- 采用 dayjs 全局注册中文时间格式化显示方法

#### 3.3 优化

- 图片懒加载
- 图片默认展示缩略图，详情大图
- 列表滚动触底触发数据加载

###  4. 后端

项目后端接口采用 node+koa+mysql 制作

**项目地址**：[项目地址](https://github.com/QuanMiny/openhub) 

**接口返回规范**:

```json
{
    "code": 200,
    "msg": "",
    "data": null
}
```

### 5.部署

vite工具打包前端项目，在云服务器上安装和使用nginx进行接口请求代理，发布。