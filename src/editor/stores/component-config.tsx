import { create } from 'zustand'
import Container from '../materials/Container'
import Button from '../materials/Button'
import Page from '../materials/Page'

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>
  component: any;
  desc: string;
  setter?: ComponentSetter[];
  styleSetter?: ComponentSetter[];
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
        component: Page,
        desc: '页面',
      },
      Container: {
        name: 'Container',
        defaultProps: {

        },
        component: Container,
        desc: '容器',
      },
      Button: {
        name: 'Button',
        defaultProps: {
          type: 'primary',
          text: '按钮'
        },
        component: Button,
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