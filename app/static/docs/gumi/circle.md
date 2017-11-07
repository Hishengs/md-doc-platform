<p class="tip">
  一共 *15* 个接口
</p>

## 获取用户圈子列表
请求
```js
url: /circle/list-of-user
method: POST
params: {
	userId: Interger
}
```
返回
```json
{
    "err": {
        "level": 0,
        "msg": ""
    },
    "data": [
        {
            "i64CircleID": "147", // 圈子基本信息
            "i64ManagerID": "147",
            "wcCircleName": "147的圈子",
            "bAutoLetOthersIn": "false",
            "bOpenCircleForOther": "true",
            "members": [ // 圈子成员列表
                {
                    "iID": "147",
                    "wstrName": "ben123",
                    "wstrPassword": "8a8cd57be98b5a382938eabe109d49f3",
                    "wstrTel": "13500000000",
                    "wstrEmail": "lwvqnuhf@yopmail.com",
                    "eRole": "2",
                    "icon": "0"
                },
                {
                    "iID": "169",
                    "wstrName": "testatrader",
                    "wstrPassword": "976925ca8cdfdfd553025b75384e1faf",
                    "wstrTel": "13210500000",
                    "wstrEmail": "testatrader@yopmail.com",
                    "eRole": "2",
                    "icon": "0"
                }
            ],
            "master": { // 圈子管理者信息
                "iID": "147",
                "wstrName": "ben123",
                "wstrPassword": "8a8cd57be98b5a382938eabe109d49f3",
                "wstrTel": "13500000000",
                "wstrEmail": "lwvqnuhf@yopmail.com",
                "eRole": "2",
                "icon": "0"
            }
        }
    ]
}
```

## 获取圈子成员列表
请求
```js
url: /circle/member/list
method: POST
params: {
	circleId: Interger
}
```
返回
```json
{
    "err": {
        "level": 0,
        "msg": ""
    },
    "data": [
        {
            "iID": "147",
            "wstrName": "ben123",
            "wstrPassword": "8a8cd57be98b5a382938eabe109d49f3",
            "wstrTel": "13500000000",
            "wstrEmail": "lwvqnuhf@yopmail.com",
            "eRole": "2",
            "icon": "0"
        },
        {
            "iID": "169",
            "wstrName": "testatrader",
            "wstrPassword": "976925ca8cdfdfd553025b75384e1faf",
            "wstrTel": "13210500000",
            "wstrEmail": "testatrader@yopmail.com",
            "eRole": "2",
            "icon": "0"
        }
    ]
}
```


## 获取圈子消息列表
请求
```js
url: /circle/notice/list
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 获取圈子未读消息数目
请求
```js
url: /circle/notice/unread-num
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 设置圈子消息已读
请求
```js
url: /circle/notice/set-unread
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 删除圈子消息
请求
```js
url: /circle/notice/delete
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 申请加入圈子
请求
```js
url: /circle/join-in/apply
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 接受入圈申请
请求
```js
url: /circle/join-in/accept
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 拒绝入圈申请
请求
```js
url: /circle/join-in/reject
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 移除圈子成员
请求
```js
url: /circle/member/remove
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 退出圈子
请求
```js
url: /circle/member/quit
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 获取热门圈子列表
请求
```js
url: /circle/hot-list
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 圈子搜索
请求
```js
url: /circle/search
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 设置圈子名称
请求
```js
url: /circle/set-name
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```

## 设置圈子是否公开
请求
```js
url: /circle/set-open
method: POST
params: {
	circleId: Interger
}
```
返回
```json
```
