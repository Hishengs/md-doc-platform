<p class="tip">
  一共 *8* 个接口，策略即子账户
</p>

## 获取用户策略列表
请求
```js
url: /account/list-of-user
method: POST
params: {
	userId: Integer
}
```
返回
```json
```

## 获取用户详细策略列表
请求
```js
url: /account/detail-list-of-user
method: POST
params: {
	userId: Integer,
	link: Object
}
```
返回
```json
```

## 通过ID数组获取详细策略列表
请求
```js
url: /account/get-detail-list-by-ids
method: POST
params: {
	accountIds: Array[Integer],
	link: Object
}
```
返回
```json
```

## 获取用户可跟踪策略列表
请求
```js
url: /account/followable-list-of-user
method: POST
params: {
	userId: Integer
}
```
返回
```json
```

## 设置策略公开
请求
```js
url: /account/set-open
method: POST
params: {
	accountId: Integer,
	isOpen: Boolean
}
```
返回
```json
```

## 获取策略净值
<span class="badge badge-primary right">C++</span>
请求
```js
url: /dll/invoke
method: POST
params: {
  "msgType": "IS_GetAccountSettleNetWorth",
	"msgBody": {
		"i64AccountID": Integer,
		"wcBeginTime": String,
		"wcEndTime": String
	},
	"serviceType": "request"
}
```
返回
```json
```

## 跟投
请求
```js
url: /account/follow
method: POST
params: {
	userId: Integer, 
	investAccountId: Integer, 
	objUserId: Integer, 
	strategyId: Integer, 
	followPortion: Integer, 
	followNetValue: Float,
}
```
返回
```json
```

## 撤回
请求
```js
url: /account/withdraw
method: POST
params: {
	userId: Integer, 
	investAccountId: Integer, 
	strategyId: Integer, 
	followPortion: Integer, 
	followNetValue: Float,
}
```
返回
```json
```