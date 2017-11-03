<p class="tip">
  数据库功能默认不开启，你必须显式地在配置文件中开启它。
</p>

## 说明
> Heysoo 并没有自己重新造轮子实现数据库功能，而是引入优秀的第三方 ORM 框架。
目前 Heysoo 支持 [`Sequelize`](http://docs.sequelizejs.com) 和 [`Bookshelf`](http://bookshelfjs.org) 两个第三方 ORM 框架。

<p class="tip">
  在使用第三方库时，请参照相应第三方库使用文档并安装相应依赖。
</p>

以下以 mysql 数据库为例，介绍具体的使用方法。

## 配置
在 `config.js` 中：
```js
module.exports = {
	database: {
		enabled: true, 		 // 默认不开启数据库功能
		orm: 'sequelize',  // 默认 sequelize，可选：sequelize, bookshelf
		type: 'mysql', 		 // 数据库类型，支持的类型参照相应 ORM 库文档
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: 'password',
		dbname: 'heysoo',
	},
}
```

## Sequelize

### 安装依赖
`npm i --save mysql2`

`npm i --save sequelize`

### 定义 Model
在 `/app/model` 下定义你自己的 model 文件，例如 `user.js`：
```js
module.exports = (sequelize, DataTypes) => {

	const userModel = sequelize.define('user',{
		user_id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},{
		tableName: 'user'
	});

	return userModel;

}
```

### 使用
在 `controller` 或者 `service` 方法中，可以以 `this.ctx.model.user` 的方式引用 model
```js
this.ctx.model.user.findOne({
	where: {
		name: 'heysoo'
	}
});
```

## Bookshelf

### 安装依赖
`npm i --save mysql2`

`npm i --save knex`

`npm i --save bookshelf`


### 定义 Model
在 `/app/model` 下定义你自己的 model 文件，例如 `user.js`：
```js
module.exports = bookshelf => {

	const userModel = bookshelf.Model.extend({
		tableName: 'user'
	});

	return userModel;

}
```

### 使用
在 `controller` 或者 `service` 方法中，可以以 `this.ctx.model.user` 的方式引用 model
```js
this.ctx.model.user.fetch().then(function(model) {
  // outputs 'Slaughterhouse Five'
  console.log(model.get('title'));
});
```
