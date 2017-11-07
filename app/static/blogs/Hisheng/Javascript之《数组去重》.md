title: Javascript之《数组去重》
date: 2017-09-20 17:54:58
tags:
- javascript
---
介绍 JS 数组去重的常见方法。
<!-- more -->

## 方法一
```js
const arr = [1, 2, 2, 2, 3, NaN, 4, 5, 5, 6, NaN, 7];

function makeArrayUnique(arr){
  let newArr = [], hasNaN = false; // NaN 认为是相同的值，所以要加入判重
  arr.forEach((item) => {
    if(newArr.indexOf(item) === -1 && !(Number.isNaN(item) && hasNaN)){
      newArr.push(item);
      if(!hasNaN)
        hasNaN = Number.isNaN(item);
    }
  });
  return newArr;
}

makeArrayUnique(arr); // [1, 2, 3, 4, 5, 6, 7]
```
变种，使用 slice + splice，此方法不需要新数组用于存储，不过注意此方法会直接改变传入的数组。
```js
const arr = [1, 2, 2, 2, 3, NaN, 4, 5, 5, 6, NaN, 7];

function makeArrayUnique(arr){
  let hasNaN = false; // NaN 认为是相同的值，所以要加入判重
  for(let i=0, ilen=arr.length;i < ilen;i++){
    if(arr.slice(0, i).indexOf(arr[i]) !== -1 || (Number.isNaN(arr[i]) && hasNaN)){
      arr.splice(i, 1);
      --i;
      --ilen;
    }
    if(!hasNaN)
      hasNaN = Number.isNaN(arr[i]);
  }
}

makeArrayUnique(arr);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
```

## 方法二
> 使用 ES6 的 Array.from + Set 实现去重

```js
const arr = [1, 2, 2, 2, 3, NaN, 4, 5, 5, 6, NaN, 7];

function makeArrayUnique(arr){
  return Array.from(new Set(arr));
}

makeArrayUnique(arr); // [1, 2, 3, 4, 5, 6, 7]
```

变种，使用扩展运算符代替 Array.from
```js
const arr = [1, 2, 2, 2, 3, NaN, 4, 5, 5, 6, NaN, 7];

function makeArrayUnique(arr){
  return [...new Set(arr)];
}

makeArrayUnique(arr); // [1, 2, 3, 4, 5, 6, 7]
```

你还有更好的方法吗？
