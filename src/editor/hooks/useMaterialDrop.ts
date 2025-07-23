import { useDrop } from 'react-dnd'
import { useComponentsStore } from '../stores/components'
import { useComponentConfigStore } from '../stores/component-config'
import { message } from 'antd'

export function useMaterialDrop(accept: string[], id: number) {
  const [messageApi, contextHolder] = message.useMessage()
  
  const { addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const [{ canDrop }, dropRef] = useDrop(() => {
    return {
      accept,
      drop: (item: { type: string }, monitor) => {
        const didDrop = monitor.didDrop() // 是否被动冒泡接受其他组件
        if (didDrop) return
        messageApi.success(item.type)
        // 将这个名字对应的组件对象植入到 json 中
        addComponent({
          id: new Date().getTime(),
          name: item.type,
          props: componentConfig?.[item.type]?.defaultProps,
          desc: componentConfig?.[item.type]?.desc,
          style: {
            
          },
        },id)
      },
      collect: (monitor) => {
        return {
          canDrop: monitor.canDrop(),
        }
      }
    }
  },[id])

  return {
    canDrop,
    dropRef,
    contextHolder
  }
}