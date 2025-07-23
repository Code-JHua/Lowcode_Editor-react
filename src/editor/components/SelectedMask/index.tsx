import  { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Space, Popconfirm } from 'antd'
import { useComponentsStore } from '../../stores/components'
import {DeleteOutlined} from '@ant-design/icons'

interface SelectedMaskProps {
  containerClassName: string
  portalWrapperClassName: string
  componentId: number
}

export default function SelectedMask(props: SelectedMaskProps) {
  const { containerClassName, portalWrapperClassName, componentId } = props
  const { curComponentId, curComponent } = useComponentsStore()

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    updatePosition()
  }, [componentId])
  
  function updatePosition() {
    if (!componentId) {
      return
    }
    // 获取整个中间画布区域的 div 结构
    const container = document.querySelector(`.${containerClassName}`)
    if (!container) return
    // 获取到被点击的组件的 div 结构
    const node = document.querySelector(`[data-component-id="${componentId}"]`)
    if (!node) return
    // 获取到 node 的几何属性
    const { top, left, width, height } = node.getBoundingClientRect()
    // 获取到整个中间画布区域的几何属性
    const { top: containerTop, left: containerLeft } = container.getBoundingClientRect()
    // 计算出 node 相对于整个中间画布区域的位置

    setPosition({
      top: top - containerTop + container.scrollTop, 
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
    })
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`) || document.createElement('div')
  }, [portalWrapperClassName])

  const handleDelete = () => {

  }
  return createPortal((
    <>
      <div style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        border: '1px dashed blue',
        boxSizing: 'border-box',
        zIndex: 14,
        pointerEvents: 'none',
      }}></div>
      <div style={{
          position: 'absolute',
          top: position.top + 21,
          left: position.left + position.width,
          fontSize: 14,
          zIndex: 15,
          display: (!position.width || position.width < 10) ? 'none' : 'inline',
          transform: 'translate(-100%, -100%)',
        }}>
        <Space>
          <div style={{
            padding: '0 8px',
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: 4,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          >
            {curComponent?.name}
          </div>
          {
            curComponentId !== 1 && (
              <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                <Popconfirm
                  title="确认删除？"
                  onConfirm={handleDelete}
                  okText="确认"
                  cancelText="取消"
                >
                  <DeleteOutlined style={{ color: 'white' }} />
                </Popconfirm>
              </div>
            )
          }
        </Space>
      </div>
    </>
  ), el)
}
