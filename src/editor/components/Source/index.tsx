import { useComponentsStore } from '../../stores/components'
import MonacoEditor from '@monaco-editor/react'

export default function Source() {
  const components = useComponentsStore((state) => state.components)
  return (
    <MonacoEditor
      height="100%"
      language="json"
      path='components.json'
      value={JSON.stringify(components, null, 2) + ''}
    />
  )
}
