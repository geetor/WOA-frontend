import { ref } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

export default function useAppCustomizer() {
  // Customizer
  const isCustomizerOpen = ref(false)

  // Skin
  const skinOptions = [
    { text: '浅色', value: 'light' },
    { text: '扁平', value: 'bordered' },
    { text: '暗黑', value: 'dark' },
    { text: '微暗', value: 'semi-dark' },
  ]

  // Router Transition
  const routerTransitionOptions = [
    { title: '平滑', value: 'zoom-fade' },
    { title: '淡入', value: 'fade' },
    { title: '上下', value: 'fade-bottom' },
    { title: '左右', value: 'slide-fade' },
    { title: '飞出', value: 'zoom-out' },
    { title: '无', value: 'none' },
  ]

  // Router Transition
  const layoutTypeOptions = [
    { text: '侧栏', value: 'vertical' },
    { text: '顶栏', value: 'horizontal' },
  ]

  // Navbar
  const navbarColors = ['', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']

  // Navbar Types
  const navbarTypes = [
    { text: '漂浮', value: 'floating' },
    { text: '固定', value: 'sticky' },
    { text: '静态', value: 'static' },
    { text: '隐藏', value: 'hidden' },
  ]

  // Footer Types
  const footerTypes = [
    { text: '固定', value: 'sticky' },
    { text: '静态', value: 'static' },
    { text: '隐藏', value: 'hidden' },
  ]

  // eslint-disable-next-line object-curly-newline
  const {
    isRTL,
    skin,
    routerTransition,
    layoutType,
    isNavMenuHidden,
    isVerticalMenuCollapsed,
    navbarBackgroundColor,
    navbarType,
    footerType,
  } = useAppConfig()

  return {
    // Customizer
    isCustomizerOpen,

    // Vertical Menu
    isVerticalMenuCollapsed,

    // Skin
    skin,
    skinOptions,

    // RTL
    isRTL,

    // routerTransition
    routerTransition,
    routerTransitionOptions,

    // Layout Type
    layoutType,
    layoutTypeOptions,

    // NavMenu Hidden
    isNavMenuHidden,

    // Navbar
    navbarColors,
    navbarTypes,
    navbarBackgroundColor,
    navbarType,

    // Footer
    footerTypes,
    footerType,
  }
}
