import { Button as AntdButton } from 'antd'
import type { CommonComponentProps } from '../../interface'

export default function Button({ id, type, text, style }: CommonComponentProps) {
  return (
    <AntdButton data-component-id={id} type={type} style={style}>{text}</AntdButton>
  )
}
