import { Tree } from 'antd'
import type { TreeProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useComponentsStore } from '../../stores/components'

// 1. Tree 组件
export default function ViewStructure() {
  const { components, setCurComponentId } = useComponentsStore()

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    setCurComponentId(Number(selectedKeys[0]))
  };

  return (

    <Tree
      fieldNames={{title:'desc', key: 'id'}}
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandAll
      onSelect={onSelect}
      treeData={components as any}
    />
  )
}
