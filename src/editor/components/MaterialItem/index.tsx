import React from 'react'
import { useDrag } from 'react-dnd'


export interface MaterialItemProps {
  name: string
}

export default function MaterialItem(props: MaterialItemProps) {
  const [_, dragRef] = useDrag(() => ({
    type: props.name, 
    item: { // 被拖动的内容
      type: props.name
    }
  }))
  return (
      <div ref={dragRef} className='border-[1px] border-dashed border-black py-2 px-2 inline-block bg-white m-[10px] hover:bg-[#ccc]'>{props.name}</div>
  )
}
