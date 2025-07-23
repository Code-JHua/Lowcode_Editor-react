import { message } from 'antd'
import type { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

export default function Container({ id, name, children }: CommonComponentProps) {
  // const [contextHolder] = message.useMessage()
  // const { addComponent } = useComponentsStore()
  // const {componentConfig} = useComponentConfigStore()

  const {canDrop, dropRef, contextHolder} = useMaterialDrop(['Button', 'Container'], id)

  // const [{ canDrop }, dropRef] = useDrop(() => ({
  //   accept: ['Button', 'Container'],
  //   drop(item: { type: string },monitor) {
  //     const didDrop = monitor.didDrop() // 是否被动冒泡接受其他组件
  //     if(didDrop) return
  //     messageApi.success(item.type)
  //     // 将这个名字对应的组件对象植入到 json 中
  //     const props = componentConfig?.[item.type]?.defaultProps
  //     addComponent({
  //       id: new Date().getTime(),
  //       name: item.type,
  //       props: props,
  //     },id)
  //   },
  //   collect: (monitor) => ({ // 接收
  //     canDrop: monitor.canDrop(),
  //   }),                               
  // }))

  return (
    <>
      {contextHolder}
      <div data-component-id={ id} ref={dropRef} className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-black'}`}>
        {children}
      </div>
    </>
  )
}
