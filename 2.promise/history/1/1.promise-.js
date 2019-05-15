
let Promise = require('./promise-1');
let fs = require('fs');

// 1) 循环引用 保证返回的promise不是当前then返回的promise 否则就变成了自己等待自己完成
/*let p1 = new Promise((resolve,reject)=>{
  reject(100);
});
let promise2 = p1.then(()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(new Promise((resolve,reject)=>{
        setTimeout(()=>{
          reject(10000)
        },1000)
      }));
    },1000)
  })
});*/

//有第二个then ,then从promise来，那么在源码里面就必须添加递归调用promise的对象
//那么上一个then是如何将值转递到下一个then中呢，那么就需要resole来转递
/*promise2.then((data)=>{
  console.log(data);
}).catch(function (err) {
  console.log(err)
})*/

/*
var promise = new Promise((resolve, reject) => {
  reject(1000);
});
*/



/*
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
});
let p = new Promise((resolve,reject)=>{
  resolve(1000);
})

let p2 = p.then((resolve,reject)=>{
    throw new Error("错了")
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
});*/


/*let p1 = new Promise((resolve, reject) => {
  reject('success')
}).then(data=>{
  reject(data);
},err=>{
  console.log(err);
}).finally(data=>{
  console.log(111)
},err=>{
  console.log(err)
});*/


//延时对象 defer
/*
function red(url) {
   let  dfd = Promise.defer();
   fs.readFile(url,"utf8",(err,data)=>{
     if(err) dfd.reject(err);
     dfd.resolve(data);
   })

  return dfd.promise;
}

red("name.txt").then(y => {
  console.log(y);
});*/
//reduce

var number = [65, 44, 12, 4];

function getSum(total, number) {
   return total + num;
}

//total 计算后的返回值
//currentValue 当前元素
//当前元素的索引
//当前元素所属的数组元素

/*
let num = number.reduce(function (total,currentValue,currentIndex,arr) {
  return total + currentValue
});
console.log(num);*/

/*//计算数组中对象的和,必须提供初始值
var initialValue = 0;

var sum = [{x:1},{x:2},{x: 44},{x: 4}].reduce((accumulator,currentValue) => accumulator + currentValue.x,initialValue);

console.log(sum);*/

/*//将二维数组合拼一维
var flat = [[0,1],[2,3],[4,5]].reduce(function (a,b) {
  return a.concat(b);
});

console.log(flat);*/
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++
  }else {
    allNames[name] = 1
  }
  return allNames
}, {});

console.log(countedNames)