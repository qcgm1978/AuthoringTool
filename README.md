## AuthoringTool

新版本课件制作工具平台，包含adtools支持1.1版本协议的实现

目录结构

- build 编译打包输出
- doc  文档
- modules 模块、源代码
- pre  预研的目录
- templates  页面模板


### 安装、部署工具使用

- reactjs

1. 安装babel
 > npm install --global babel-cli
2. 启动watcher
 > babel --presets react src --watch --out-dir build

- webpack
1. 即时打包
 > webpack --progress --colors --watch --display-modules
 > 压缩打包 webpack --progress -p

2. 安装reactjs
 > 安装react  npm install --save react 



