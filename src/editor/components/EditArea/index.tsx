import React,{ useState } from 'react'
import { useComponentsStore } from '../../stores/components'
import type { Component } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import HoverMask from '../HoverMask'
import SelectedMask from '../SelectedMask'

export default function EditArea() {
  const { components, curComponentId,setCurComponentId } = useComponentsStore()
  const {  componentConfig } = useComponentConfigStore()
  
  const [hoverComponentId, setHoverComponentId] = useState<number>()
  // useEffect(() => {
  //   addComponent({
  //     id: 2,
  //     name: 'Container',
  //     props: {},
  //     desc: '页面的容器',
  //     children: [],
  //     parentId: 1,
  //   }, 1)
  //   addComponent({
  //     id: 3,
  //     name: 'Button',
  //     props: {
  //       text: '提交',
  //     },
  //     desc: '按钮',
  //     children: [],
  //     parentId: 2,
  //   }, 2)
  // }, [])

  // setTimeout(() => {
  //  removeComponent(2)
  // }, 3000)
  // setTimeout(() => {
  //   updateComponentProps(1, { style: { width: '100%' } })

  // }, 4000)

  function renderComponents(components: Component[]):React.ReactNode {
    return components.map((component) => {
      const config = componentConfig?.[component.name]
      if (!config?.component) { // 没有对应的组件, 比如: 'page'
        return null
      }
      // 渲染组件
      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || []), // 递归渲染整个 json 树
      )
    })
  }

  const handleMouseOver: React.MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement
      const componentId = ele.dataset.componentId
      if (componentId) {
        setHoverComponentId(+componentId)
        return
      }
    }
    setHoverComponentId(undefined)
  }

  // 借助冒泡机制, 点击页面上的任何组件,点击行为都会冒泡到这里
  const handleClick: React.MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()
    for (let i = 0; i < path.length; i++) {
      const ele = path[i] as HTMLElement
      const componentId = ele.dataset.componentId
      if (componentId) {
        setCurComponentId(+componentId)
        return
      }
    }
  }

  return (
    <div className='h-[100%] edit-area portal-wrapper' onMouseOver={handleMouseOver} onMouseLeave={() => setHoverComponentId(undefined)} onClick={handleClick}>

      {renderComponents(components)}

      {hoverComponentId && <HoverMask componentId={hoverComponentId} containerClassName='edit-area' portalWrapperClassName='portal-wrapper' />}
      
      {curComponentId && (<SelectedMask componentId={curComponentId} containerClassName='edit-area' portalWrapperClassName='portal-wrapper' />)}

    </div>
  )
}
