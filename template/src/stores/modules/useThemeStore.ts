import { defineStore } from 'pinia'
import { reactive } from 'vue'

type ThemeModeType = 'light' | 'dark'
const useThemeStore = defineStore('theme', () => {
  const state = reactive({
    mode: 'light' as ThemeModeType,
  })

  function changeThemeMode(theme: ThemeModeType) {
    state.mode = theme
  }

  return {
    state,
    changeThemeMode,
  }
})

export { useThemeStore }
export default useThemeStore
