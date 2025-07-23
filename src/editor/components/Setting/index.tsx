import { useState } from 'react';
import { Segmented } from "antd";
import ComponentEvent from './ComponentEvent.tsx';
import ComponentAttr from './ComponentAttr.tsx';
import ComponentStyle from './ComponentStyle.tsx';

export default function Setting() {
  const [key, setKey] = useState('属性')

  return (
    <div>
      <Segmented value={key} options={['属性', '外观', '事件']} block onChange={(value) => setKey(value)}></Segmented>
      <div style={{ padding: 20 }}>
        {
          key == '属性' && <ComponentAttr />
        }
        {
          key == '外观' && <ComponentStyle />
        }
        {
          key == '事件' && <ComponentEvent />
        }
      </div>
    </div>
  )
}
