import { Form, Input, Select } from 'antd';

import { useComponentConfigStore } from '../../stores/component-config.tsx'
import { useComponentsStore } from '../../stores/components.tsx'
import { useEffect } from 'react';
import type { ComponentSetter } from '../../stores/component-config.tsx'

export default function ComponentAttr() {
  const [form] = Form.useForm();
  const { curComponent, curComponentId } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  
  // 回显
  useEffect(() => {
    if(!curComponent || !curComponentId) return;
    const data = form.getFieldsValue()
    form.setFieldsValue({...data, ...curComponent?.props})
  }, [curComponent, curComponentId])
  
  if(!curComponent || !curComponentId) {
    return null
  }


  const renderFormElememt = (item: ComponentSetter) => {
    const {  type, options } = item
    switch(type) {
      case 'input':
        return <Input />
      case 'select':
        return <Select options={options} />
      default:
        return <Input />
    }
  }

  const valueChange = (values: any) => {
    console.log(values)
  }

  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="组件id">
        <Input disabled value={curComponentId} />
      </Form.Item>

      <Form.Item label="组件名称">
        <Input disabled value={curComponent.name} />
      </Form.Item>

      <Form.Item label="组件类型">
        <Input disabled value={curComponent.desc} />
      </Form.Item>

      {/* 当前组件允许修改的属性 */}
      {
        componentConfig[curComponent.name].setter?.map((item) => (
          <Form.Item name={item.name} label={item.label} key={item.name}>
            {renderFormElememt(item)}
          </Form.Item>
        ))
      }
    </Form>
  )
}
