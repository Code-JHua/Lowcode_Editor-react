import { Form, InputNumber, Select } from "antd";
import { useComponentConfigStore, type ComponentSetter } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { useEffect, useState, type CSSProperties } from "react";
import styleToObject from 'style-to-object';


import CssEditor from "./CssEditor";
import { debounce } from "lodash-es";

export default function ComponentStyle() {
  const { curComponentId, curComponent, updateComponentStyle } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  const [form] = Form.useForm();
  const [css, setCss] = useState(`.comp{\n\n}`);

  // 回显
  useEffect(() => {
    if(!curComponent || !curComponentId) return;
    const data = form.getFieldsValue()
    form.setFieldsValue({...data, ...curComponent?.style})
  }, [curComponent, curComponentId])

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (let key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
        value += 'px';
      }

      str += `\t${key}: ${value};\n`
    }
    str += `}`;
    return str;
  }

  if(!curComponent || !curComponentId) {
    return null
  }

  function renderFormElememt(item: ComponentSetter) {
    const {  type, options } = item
    switch(type) {
      case 'input':
        return <InputNumber />
      case 'select':
        return <Select options={options} />
      default:
        return <InputNumber />
    }
  }


  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyle(curComponentId, changeValues);
    }
  }

  const handleCssChange = debounce((value) => {
    setCss(value);

    let css: Record<string, any> = {};

    try {
      const cssStr = value.replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', '');// 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))] = value;
      });

      updateComponentStyle(curComponentId, { ...form.getFieldsValue(), ...css });
    } catch (e) { }
  }, 500);

  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      {
        componentConfig[curComponent.name].styleSetter?.map((item) => (
          <Form.Item name={item.name} label={item.label} key={item.name}>
            {renderFormElememt(item)}
          </Form.Item>
        ))
      }
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={`.comp{\n\n}`} onChange={handleCssChange} />
      </div>
    </Form>
  )
}
