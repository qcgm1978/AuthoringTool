## AuthoringTool

新版本课件制作工具平台，包含adtools支持1.1版本协议的实现

目录结构

- ui： UI交互组件
- components： Activity组件
- common: 通用类
- pre ： 学习、预研和原型系统相关
- doc： 相关文档
- resource: 引用的开源库版本及源代码
- electron: 打包本地的nodejs/electron 本地程序


### 安装、部署工具使用

- reactjs

1. 安装babel
 > npm install --global babel-cli
 > npm install babel-preset-react
2. 启动watcher
 > babel --presets react src --watch --out-dir build


