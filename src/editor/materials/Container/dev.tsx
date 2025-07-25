import type { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

export default function Container({ id,children, style }: CommonComponentProps) {


  const {canDrop, dropRef, contextHolder} = useMaterialDrop(['Button', 'Container'], id)


  return (
    <>
      {contextHolder}
      <div style={style} data-component-id={ id} ref={dropRef as any} className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-black'}`}>

        {children}
      </div>
    </>
  )
}
