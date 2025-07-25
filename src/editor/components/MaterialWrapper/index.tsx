import { Segmented } from "antd";
import { useState } from "react";
import Material from "../Material";
import ViewStructure from "../ViewStructure";
import Source from "../Source";

export default function MaterialWrapper() {
  const [key, setKey] = useState('物料')
  return (
    <div style={{height: '100%'}}>
      <Segmented options={['物料', '视图结构', '源码']} value={key} onChange={setKey} block />
      <div style={{height: '100%'}}>
        {
          key === '物料' && <Material></Material>
        }
        {
          key === '视图结构' && <ViewStructure></ViewStructure>
        }
        {
          key === '源码' && <Source></Source>
        }
      </div>
    </div>
  )
}
