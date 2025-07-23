import { useComponentsStore } from '../../stores/components.tsx'
export default function Setting() {
  const {components} = useComponentsStore()
  return (
    <div>
      <pre>
        {
          JSON.stringify(components, null, 2)
        }
      </pre>
    </div>
  )
}
