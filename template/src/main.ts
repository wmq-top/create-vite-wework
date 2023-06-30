import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import { router } from '~/router'
import { i18n } from '~/i18n'
import '~/theme/dark.less'
import '~/theme/light.less'
import '~/theme/theme.less'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(i18n)
app.mount('#app')
