import React from 'react'
import { useComponentsStore } from '../../stores/components'
import type { Component } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'

export default function Prview() {
  const { components } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  
  function renderProdComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig[component.name]
      if (!config.prod) {
        return null
      }
      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          style: component.style,
          ...config.defaultProps,
          ...component.props,
        },
        renderProdComponents(component.children || [])
      )
    })
  }

  return (
    <div>
      {renderProdComponents(components)}
    </div>
  )
}
