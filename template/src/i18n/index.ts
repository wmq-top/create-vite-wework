import { createI18n } from 'vue-i18n'
import raw from './raw'

const { search } = location

type LangType = keyof typeof raw

const langRgx = /[?&]lang=(?<lang>[a-zA-z-_]+)/

const langMap = {
  en: 'en-US',
  zh: 'zh-CN',
}

const urlLang = search.match(langRgx)?.groups?.lang?.split('-')[0] as LangType

const lang = Object.keys(langMap).includes(urlLang)
  ? urlLang
  : window.localStorage.getItem('lang')?.split('-')[0] as LangType
  || navigator.language.split('-')[0]

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: 'en',
  messages: raw,
})

export type { LangType }
export { langMap, i18n }
export default i18n
