
let Promise = require('./promise-1');

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




let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
});

let p2 = new Promise((resolve, reject) => {
  resolve('success')
});



Promise.all([1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
});