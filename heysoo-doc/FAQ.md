## 如何 polyfill？
由于 Heysoo 对 Node 版本的要求是 7.6.0+（支持 async/await），所以在此版本以下需要引入 babel 进行 polyfill。

### 1. 安装 babel 及相关依赖
```js
npm i babel babel-core babel-preset-env --save-dev
// 安装 Heysoo
npm i heysoo --save
```

### 2. 在项目根目录下创建 `.babelrc`
```js
{
  "presets": [
    ["env", {
    	"targets": {
    		"node": "6.9.5" // 注意，这里指定为你自己的版本
    	}
  	}]
  ]
}
```

### 3. 修改项目入口文件（index.js）
```js
require('babel-core/register')({
	ignore: /node_modules\/(?!heysoo)/, // 注意，这里是为了让 babel 编译 Heysoo 的代码
});

const Heysoo = require('heysoo');
const app = new Heysoo();

app.use(async ctx => {
  ctx.body = 'hello, world.';
});

app.start();
```

OK 啦，现在启动你的应用看看。