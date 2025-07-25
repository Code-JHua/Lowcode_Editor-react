import { create } from 'zustand'
import ContainerDev from '../materials/Container/dev'
import ContainerProd from '../materials/Container/prod' 
import ButtonDev from '../materials/Button/dev'
import ButtonProd from '../materials/Button/prod'
import PageDev from '../materials/Page/dev.tsx'
import PageProd from '../materials/Page/prod.tsx'

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>
  // component: any;
  desc: string;
  setter?: ComponentSetter[];
  styleSetter?: ComponentSetter[];
  dev: any;  // 开发模式下的组件
  prod: any, // 预览模式下的组件
}

export interface State {
  componentConfig: { [key: string]: ComponentConfig }
}

export interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

// 每一个名字对应的组件具体是哪一个
export const useComponentConfigStore = create<State & Action>(
  (set) => ({
    componentConfig: {
      Page: {
        name: 'Page',
        defaultProps: {},
        dev: PageDev,
        prod: PageProd,
        desc: '页面',
      },
      Container: {
        name: 'Container',
        defaultProps: {

        },
        dev: ContainerDev,
        prod: ContainerProd,
        desc: '容器',
      },
      Button: {
        name: 'Button',
        defaultProps: {
          type: 'primary',
          text: '按钮'
        },
        dev: ButtonDev,
        prod: ButtonProd,
        desc: '按钮',
        setter: [
          {
            name: 'type',
            label: '按钮类型',
            type: 'select',
            options: [
              {
                label: '主要按钮',
                value: 'primary',
              },
              {
                label: '默认按钮',
                value: 'default',
              },
            ]
          },
          {
            name: 'text',
            label: '按钮文本',
            type: 'input',
          }
        ],
        styleSetter: [
          {
            name: 'width',
            label: '宽度',
            type: 'inputNumber',
          },
          {
            name: 'height',
            label: '高度',
            type: 'inputNumber',
          }
        ]
      },
    },
      
      registerComponent: (name, componentConfig) => {
        set((state) => ({
          componentConfig: {
            ...state.componentConfig,
            [name]: componentConfig
          }
        }))
      }

    })
)