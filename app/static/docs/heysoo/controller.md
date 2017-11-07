## 定义
> 控制器主要用于处理路由请求，结合 service 调用相关的基础服务接口处理业务逻辑。控制器目录下每一个文件就是一个控制器模块。

```js
── controller
	 ├── user.js
	 ├── account.js
```

## 调用方式
通过 `this.ctx.controller.user` 可以调用相应的控制器及其方法。

## 示例
user.js
```js
module.exports = app => {
	class UserController extends app.Controller {

		constructor (){
			super();
		}

		async getDetail (){
			const userId = this.ctx.request.body.userId;
			const accounts = await this.ctx.controller.account.getAccounts(userId);
			const info = {
				basic: await this.getBasicInfo(userId),
				accounts,
			};
			this.done(info);
		}

		async getBasicInfo (userId){
			return {
				name: 'heysoo',
				email: 'demo@heysoo.com'
			};
		}

	}
	return new UserController();
}
```
account.js
```js
module.exports = app => {
	class AccountController extends app.Controller {

		constructor (){
			super();
		}

		async getAccounts (userId){
			return [];
		}

	}
	return new AccountController();
}
```
