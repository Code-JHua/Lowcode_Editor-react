import { create } from 'zustand'
import type { CSSProperties } from 'react'

export interface Component {
  id: number,
  name: string,
  props: any,
  desc: string,
  style?: CSSProperties,
  children?: Component[],
  parentId?: number,
}
export interface State {
  components: Component[]
  curComponentId: number | null,
  curComponent: Component | null,
}
export interface Action {
  addComponent: (component: Component, parentId?: number) => void,
  removeComponent: (id: number) => void,
  updateComponentProps: (id: number, props: any) => void
  setCurComponentId: (id: number) => void,
  updateComponentStyle: (id: number, style: CSSProperties) => void,
}

export const useComponentsStore = create<State & Action>((set, get) => ({

  // 数据
  components: [ // 整个项目的 json 树
    {
      id: 1,
      name: 'Page',
      props: {},
      desc: '页面',
      children: [],
    }
  ],
  curComponentId: null,
  curComponent: null,
  // 方法
  addComponent(component, parentId) { // 本质上就是要将一个对象添加到另一个对象中
    set((state) => {
      if (parentId) {
        // 获取到父级对象
        const parent = getComponentById(parentId, state.components)
        if (parent) {
          parent.children ? parent.children.push(component) : parent.children = [component]
        }
        component.parentId = parentId
      }
      return {
        components: [...state.components]
      }
    })
  },
  removeComponent(componentId) { //在整个 json 对象中找到某一个子对象的 id 为 componentId 的对象并删除
    if (!componentId) return
    const component = getComponentById(componentId, get().components)
    if (component?.parentId) { // 有父级
      const parent = getComponentById(component.parentId, get().components)
      if (parent) {
        parent.children = parent.children?.filter((item) => item.id !== componentId)
      }
      return
    }
    set({
      components: [...get().components]
    })
  },
  updateComponentProps(id, props) {
    set((state) => {
      const component = getComponentById(id, state.components)
      if (component) {
        component.props = { ...component.props, ...props }
      }
      return { components: [...state.components] }
    })
  },
  setCurComponentId(id) {
    set({
      curComponentId: id,
      curComponent: getComponentById(id, get().components)
    })
  },
  updateComponentStyle(id, style) {
    set((state) => {
      const component = getComponentById(id, state.components)
      if (component) {
        component.style = { ...component.style, ...style }
      }
      return { components: [...state.components] }
    })
  },
}))


// 辅助方法
export function getComponentById(id: number | null, components: Component[]): Component | null {
  if (!id) return null
  for (const x of components) {
    if (x.id === id) return x
    if (x.children && x.children.length > 0) {
      const child = getComponentById(id, x.children)
      if (child) return child
    }
  }
  return null
}