// 从 CSS 变量读颜色（"H S% L%"）包成 hsl()，供 Recharts 等需要具体色值（非 class）的场景用。
// 在组件渲染时读取，故能反映当前明暗主题；主题切换后于下次渲染更新。
export function cssHsl(name: string, fallback = '#888') {
  if (typeof document === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()
  return v ? `hsl(${v})` : fallback
}
