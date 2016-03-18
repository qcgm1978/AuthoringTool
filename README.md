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
 > 安装babel loader: npm install babel-loader babel-core babel-preset-es2015 babelify --save-dev
 > 安装react  npm install --save react react-dom babel-loader babel-preset-react
 
## Debug
### node debug

```
node-debug webpack.config.js
```

### webapck watch

```
webpack -d --progress --colors --watch
```

### Generating new components
    
```
yo react-webpack:component my/namespaced/components/name
```

### Livereload the page
Add this code in the page:

```js
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
```

and execute the command on the terminal:

```
livereload [path]
```

or config webpack.config.js(  -d: shortcut for --debug --devtool sourcemap --output-pathinfo; --watch: LiveReload when running webpack --watch)

```js
plugins: [
        new LiveReloadPlugin({
            appendScriptTag:true,
            port: 35728//port - (Default: 35729) The desired port for the livereload server, config when multiple instance executed
        })
    ]
```

### compile jsx to js with source map for debuging

```
babel --presets react comments-box/src/components/ --watch --out-dir comments-box/public/scripts/ -s
```

### execute tests:

```
npm test
```


