## 前言
我们知道，一个完整的项目上至比较复杂的中大型应用，仅仅只有 `MVC` 是远远不够的，在开发过程中，我们的需求往往殊途同归，总结下来，主要是以下一些应用场景。但是如果交由我们自己去实现，去配置，容易使项目变得越来越复杂，状态变得不可预测，代码零散各处不易调试更不易维护。因此，我们遵循插件的理念，不对业务代码做过多的入侵，一个插件只是简单的做一件事就够了。

**注意** 以下大多数功能 Heysoo 并没有内置，因为我们希望框架本身尽可能地简单，只是举例说明如何将这些功能集成到框架中来，投入到你的实际项目使用中去。

## cookie
使用 Koa 提供的 cookies API 就可以很方便地对 cookie 进行操作。详见 [Koa](http://koajs.com/#context) 文档。
```js
ctx.cookies.get(name, [options]);

ctx.cookies.set(name, value, [options])
```

## csrf
**状态** <span class="badge badge-primary">working</span>

默认不启用，如果要使用，请在配置文件中加入以下配置：
```json
{
	csrf: {
		enabled: true,
		type: 'form' // options: form, header
	}
}
```
如果选择 `type: form`，请在你的模板表单中加入：
```js
<form method="POST" action="/cart">
  {{ csrf_field() }}
  ...
</form>
```
Heysoo 框架会在每次 POST 请求中检查该字段，如果不存在或不符合会返回 403。

如果选择 `type: header`，请在你的 HTTP 请求库中加入全局 HEADER 设置：
```js
{
	'CSRF-Field': value
}
```

## hook / 钩子
**状态** <span class="badge badge-primary">working</span>
### app.beforeStart
### app.hook
等同于 `app.beforeStart`
### app.beforeRouterStart

## httpClient
框架本身不内置此功能，你可以通过插件的形式选择自己喜欢的 http 请求库(例如 [axios](https://github.com/mzabriskie/axios))集成到框架中来，用以例如向第三方站点发起认证请求或资源请求。
```js
const http = require('axios');
app.hook(app => {
	app.context.http = http;
});
// 使用
this.ctx.http.post(url,postData);
```

## i18n
**状态** <span class="badge badge-primary">working</span>

## jsonp
**状态** <span class="badge badge-primary">working</span>

## master/worker
**状态** <span class="badge badge-primary">working</span>

## middleware / 中间件
完全兼容 Koa 的中间件用法，你可以在应用启动之前加载你自己的中间件：
```js
const Heysoo = require('../index.js');

const app = new Heysoo();

app.use(async (ctx,next) => {
	console.log('middleware test.');
	await next();
});

app.start();
```
Heysoo 提供了简便的方法来更好的组织你的中间件：

首先在配置文件中声明中间件目录：
```js
module.exports = {
	folder: {
		middleware: 'mw' // 如果不指定默认是 middleware
	},
	// 中间件配置
	middleware: {
		use: ['mw1','mw2'], // 指定所有要加载的中间件，加载顺序按排列顺序
		options: {} // 一些通用的配置，可以通过 app.config.middleware.options 获取
	}
}
```
你的中间件目录：
```js
	mw
	 ├── mw1.js
	 ├── mw2.js
```
mw1.js
```js
module.exports = app => {
	app.use(async (ctx,next) => {
		console.log('This is mw1');
		await next();
	});
}
```
mw2.js
```js
module.exports = app => {
	app.use(async (ctx,next) => {
		console.log('This is mw2');
		await next();
	});
}
```
框架会检测是否存在中间件目录，然后按指定中间件及顺序执行所有的中间件。

## mock
如果你的团队采用前后端分离的技术框架，那么 mock 数据模拟是很常见的应用。这样只要事先前后端约定好接口和数据格式，后端无需等接口完成，只需简单地模拟一些假数据给前端调试即可。

框架本身不内置此功能，你可以通过插件的形式将这一功能集成到框架中来，以 [mockjs](https://github.com/nuysoft/Mock) 为例：
```js
const Mock = require('mockjs');
app.hook(app => {
	app.context.Mock = Mock;
});
// 产生一个 1-100 的随机数
const randomInt = this.ctx.Mock.mock('@integer(0, 100);
```

## redis
**状态** <span class="badge badge-primary">working</span>

## session
**状态** <span class="badge badge-primary">working</span>

## validator
**状态** <span class="badge badge-primary">working</span>