enum MenuType {
  Menu,  // 菜单
  Mkdir, // 目录
  Button // 按钮
}

export type MenuData = {
  path: string
  redirect?: string
  component?: string
  name?: string
  meta?: {
    type?: MenuType
    title?: string
    icon?: string
    affix?: 0 | 1
  },
  children?: MenuData[]
}
