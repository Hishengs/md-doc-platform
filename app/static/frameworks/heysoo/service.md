## 定义
> service 指的是提供一些基础通用的服务供 controller 以及其他模块( 包括 service 之间 )调用，提供底层的逻辑和数据处理， 例如认证服务，数据获取服务，参数验证服务等；service 目录下每一个文件就是一个基础服务模块。

```js
── service
	 ├── user.js
	 ├── account.js
	 ├── auth.js
	 ├── data.js

```

## 应用场景
1. 为 controller 提供基础的服务接口。
2. 结合 ORM 进行提供数据服务。

## 调用方式
通过 `this.ctx.service.user` 可以调用相应的控制器及其方法。

## 示例
