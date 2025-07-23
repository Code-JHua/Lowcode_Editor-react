import { useComponentConfigStore } from '../../stores/component-config'
import { useMemo } from 'react'
import MaterialItem from '../MaterialItem'
import {useComponentsStore} from '../../stores/components'

export default function Material() {  
  const { componentConfig } = useComponentConfigStore()
  const {components: componentList} = useComponentsStore()

  const components = useMemo(() => {
    return Object.values(componentConfig).filter((item) => item.name !== 'Page') // [{},{},{}]
  }, [componentConfig])
  
  return (
    <div>
      {
        components.map((item, index) => {
          return <MaterialItem key={item.name + index} name={item.name} />
        })
      }
      <pre>
        {
          JSON.stringify(componentList, null, 2)
        }
      </pre>
    </div>
  )
}
