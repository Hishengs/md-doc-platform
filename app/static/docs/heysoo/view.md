<p class="tip">
  模板功能默认不开启，你必须显式地在配置文件中开启它。
</p>

## 说明
> 模板使用 [`consolidate`](https://github.com/tj/consolidate.js) 实现，支持多种模板引擎，详见：https://github.com/tj/consolidate.js


以下以 `nunjucks` 为例介绍具体的使用方法。

## 配置
在 `config.js` 中：
```js
module.exports = {
	view: {
		enabled: true,
		engine: 'nunjucks',
	},
}
```

## 使用
在 `controller` 方法中，可以以 `this.ctx.render` 的方式渲染对应的页面。
```js
module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			await this.ctx.render('index.html');
		}

	}
	return new HomeController();
}
```

## 手动配置
有些模板引擎有自己的设置，此时你可以选择手动配置的方式引入配置好的引擎实例(参见 [这里](https://github.com/tj/consolidate.js#template-engine-instances))

首先在配置文件中声明启用手动配置：
```js
module.exports = {
	view: {
		enabled: true,
		engine: 'nunjucks',
		manual: true
	},
}
```
然后，在 app 启动之前
```js
const Heysoo = require('heysoo');

const app = new Heysoo();

app.hook(app => {
	const nunjucks = require('nunjucks');
	app.view.setEngine(nunjucks.configure({
		autoescape: true,
		noCache: true
	}));
});
	
app.start();
```

## 模板变量
框架默认会向模板传入 `ctx` 实例变量。
你可以传入自己的变量到模板中：
```js
this.ctx.render('index.html',{ user: 'Jack' });
```
如何在模板中引用变量请查看相应的模板引擎文档。

## API

### response.render
**简介** 页面输出

**别名** `context.render, context.display, response.display`

**定义** `response.render(viewPath,params)`

**参数** 

`viewPath | String | null | 模板路径`

`params | Object | {} | 模板参数`

**注意** 这是一个异步操作，使用时记得加上 await `await this.ctx.render('index.html')`