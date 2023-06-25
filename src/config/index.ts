import { antdConfig } from './antd-vue'
import { elementConfig } from './element-plus'
import { devuiConfig } from './devui-vue'

const configList = {
  'antd-vue': antdConfig,
  'element-plus': elementConfig,
  'devui-vue': devuiConfig
} as const

export { configList }