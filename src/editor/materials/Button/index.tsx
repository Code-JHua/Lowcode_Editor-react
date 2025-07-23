import { Button as AntdButton } from 'antd'
import type { CommonComponentProps } from '../../interface'

export default function Button({ id, type, text }: CommonComponentProps) {
  return (
    <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
  )
}
