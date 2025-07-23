import { useComponentConfigStore } from '../../stores/component-config'
import { useMemo } from 'react'
import MaterialItem from '../MaterialItem'

export default function Material() {  
  const { componentConfig } = useComponentConfigStore()
  const components = useMemo(() => {
    return Object.values(componentConfig) // [{},{},{}]
  }, [componentConfig])
  
  return (
    <div>
      {
        components.map((item, index) => {
          return <MaterialItem key={item.name + index} name={item.name} />
        })
      }
    </div>
  )
}
