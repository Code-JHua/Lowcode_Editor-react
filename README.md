# 低代码平台
- 物料区
- 画布区
- 组件右侧的属性区

1. 将物料区的组件拖拽到画布区即可, 其实就是维护一个 json 对象, 用户执行拖拽, 我们将组件对象添加到 json 的某一层中
2. 在右侧编辑某组件的属性, 其实就是在改组件的对象中增加属性值
3. 将 json 展示成树状图

# tailwindcss
- 原子化css, 只需要写类名, 不需要写 css, 尤其在低代码平台需要
npm install tailwindcss@3 postcss
npm install autoprefixer
npx tailwindcss init -p   初始化了一个 tailwindcss 配置文件和 postcss 的配置文件

# 准备
npm install allotment --save  拖动改变容器大小

# zustand 仓库
1. npm install zustand --save

# 项目梳理
1. 创建了 componentsStore 仓库, 存放整个 json 对象 (components数组), 定义了如何往该 json 对象中植入子对象 (组件) 的函数, 和移除子对象,更新子对象内部户属性的函数

2. 创建了 componentConfigStore 仓库, 存放一个对象, 该对象用来记录每一个 json 中的组件名, 对应的真实组件的代码

3. 定义了 renderComponents 函数用来将 整个 json 渲染成真实的 html 结构, 这里面借助 React.createElement 函数, 递归渲染整个 json 树

4. 实现 物料区组件 拖拽到 画布区
    1. react-dnd  跨组件传递数据
    react-dnd-html5-backend  拖拽组件到画布区

    2. 真的拖拽了一个组件名到 EditArea, 就要将这个名字对应的组件对象植入到 json 中

    3. 借助 react-dnd 中的 useDrop 来接收组件

    4. 抽离 useDrop 代码, 封装成一个 hook

    5. 当中间画布展示好了组件之后, 我们封装了一个 HoverMask 组件, 为了实现用户鼠标移入哪一个组件上, 该组件被选中的效果
     - HoverMask: 接收一个组件类名, 通过 js 获取到该容器的几何属性, 动态的将 mask 容器也设置成相同的大小并覆盖到组件容器上

5. 点击展示组件的编辑框,并可以移除组件, 和 hover 不一样, 点击还要在右侧展示对应的组件属性
    - selectedMask: 当用户点击画布中的某个组件时, 我们实现跟 hoverMask 一样的蒙层效果, 并提供删除按钮. 此时点击带来的蒙层和 hoverMask 带来的蒙层重叠, 需要做一个取舍

6. 点击选中画布区的组件, 右侧 setting 展示且能编辑该组件的属性
    1. 为每一个组件对象增加了 setter 属性, 是一个数组, 该数组中存放组件所有可以被修改的属性
    2. 往每一个对象中增加了一个 styleSetter 数组, 用来装用户自定义的样式,自定义的样式被 style-to-object 转换成了 obj 对象,植入到了仓库的 components 中

7. 实现大纲 (组件, 视图结构, 源码) 的功能
    1. 组件 -- 目前只有默认的 container, button
    2. 视图结构 -- 借助 antd 的 Tree 组件, 将仓库中的 json 数据展示成树状图
    3. 源码 -- 借助 @monaco-editor/react 创建一个编辑器, 展示 json 数据在编辑器中

8. 实现预览功能
    1. 预览 -- 跟画布区一样,都是递归渲染页面, 不一样的是, 编辑模式下组件上的事件是不触发的, 预览模式下组件上的事件时触发的
        
    2. 退出预览 -- 点击退出预览按钮, 退出预览模式
