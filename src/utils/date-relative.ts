import { App } from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import isYesterday from 'dayjs/plugin/isYesterday'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

dayjs.extend(isYesterday)

export default {
  install: (app: App) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$relativeTime = (value: string) => {
      // 获取今年第一天
      const thisYear = `${dayjs().year()}-01-01`
      if (dayjs(value).isBefore(thisYear)) {
        // 一年之前显示 YYYY-MM-DD
        return dayjs(value).format('YYYY-MM-DD')
      } else {
        // 一年之后显示 MM-DD
        if (dayjs(value).isYesterday()) {
          // 昨天
          return '昨天'
        }
        if (dayjs(value).date() == dayjs().date()) {
          // 今天内
          return dayjs(value).from(dayjs())
        }
        return dayjs(value).format('MM-DD')
      }
    }
  }
}
