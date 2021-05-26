# API 问题
本地开发使用Node.js的request库做代理，解决跨域问题，文件为proxy.js
为使用npm同时执行两条监听命令，添加依赖concurrently
npm script代码如下：

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --config webpack.config.js",
    "build": "webpack --progress --hide-modules --config webpack.prod.config.js",
    "server": "node proxy.js",
    "start": "concurrently \"npm run server\" \"npm run dev\""
  },
```

# 滚动条问题(未解决)
隐藏滚动条时无法监听scroll事件

