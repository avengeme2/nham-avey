import { ThemeState } from '../redux/slice/theme-slice'

export const APP_NAME = 'Nham Avey BO'
export const APP_PREFIX_PATH = 'app'
export const AUTH_PREFIX_PATH = 'auth'

export const THEME_CONFIG: ThemeState = {
  navCollapsed: false,
  locale: 'en',
  mobileNav: false,
  currentTheme: 'light',
}
