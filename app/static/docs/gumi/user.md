<p class="tip">
  一共 *8* 个接口
</p>

## 登录
请求
```js
url: /user/login
method: POST
params: {
	account: String // 用户名、手机号
	password: String
}
```
返回
```json
{
  "err": {
    "level": 0,
    "msg": ""
  },
  "data": {
    "investAccounts": [ // 投资账户列表
      {
        "created_at": "2017-08-30",
        "id": 2,
        "name": "策略",
        "initial_money": 100000,
        "available_money": 100000,
        "type": 1,
        "user_id": "35002"
      }
    ],
    "userInfo": { // 用户基本信息
      "iID": "35002",
      "wstrName": "Hisheng",
      "wstrPassword": "96020b766ebfebbb39092ed5a49dbb24",
      "wstrTel": "13728680215",
      "wstrEmail": "x6w8mg@yopmail.com",
      "eRole": "2",
      "icon": "0"
    }
  }
}
```

## 注册
<span class="badge badge-primary right">PHP</span>
请求
```js
url: /api.php
method: JSONP
params: {
  mod: 'gumi', 
  ac: 'register', 
  password: String, 
  mobile: String
}
```
返回
```json
```

## 获取用户基本信息
> 支持批量

### 通过 Node
<span class="badge badge-primary right">Node</span>
请求
```js
url: /user/info
method: POST
params: {
	userId: Interger | Array
}
```
### 通过 C++
<span class="badge badge-primary right">C++</span>
请求
```js
url: /dll/invoke
method: POST
params: {
	msgType: "RawGetUserAccount",
	msgBody: {
		vecUsers: [271]
	},
	serviceType: "request"
}
```
返回
```json
{
  "err": {
      "level": "0",
      "msg": "\u0001"
  },
  "data": [
      {
          "iID": "271",
          "wstrName": "bp002",
          "wstrPassword": "1fdf964b18ed0b7e0eac9d81e60a3dc5",
          "wstrTel": "15201000002",
          "wstrEmail": "bp002@yopmail.com",
          "eRole": "2",
          "icon": "0"
      }
  ]
}
```

## 发送验证码
<span class="badge badge-primary right">PHP</span>
请求
```js
url: /api.php
method: JSONP
params: {
  mod: 'gumi', 
  ac: 'getCode', 
  mobile: String
}
```
返回
```json
```

## 修改用户名
<span class="badge badge-primary right">PHP</span>
请求
```js
url: /api.php
method: JSONP
params: {
  mod: 'gumi', 
  ac: 'updateName',
  uid: Integer,
  username: String
}
```
返回
```json
```


## 修改手机号码
<span class="badge badge-primary right">PHP</span>
请求
```js
url: /api.php
method: JSONP
params: {
  mod: 'gumi', 
  ac: 'setMobile',
  uid: Integer,
  mobile: String
}
```
返回
```json
```

## 获取用户间关系
<span class="badge badge-primary right">C++</span>
请求
```js
url: /dll/invoke
method: POST
params: {
  msgType: "IS_GetUserUserRelation",
  msgBody: {
    i64UserID: Integer,
    vecUsers: Array[Integer]
  },
  serviceType: "request"
}
```
返回
```json
```

## 用户搜索
<span class="badge badge-primary right">C++</span>
请求
```js
url: /dll/invoke
method: POST
params: {
  msgType: "RawSearchUserAcc",
  msgBody: {
    vecUsers: Array[String], // 关键词数组
  },
  serviceType: "request"
}
```
返回
```json
```