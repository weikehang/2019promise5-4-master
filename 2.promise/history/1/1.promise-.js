
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

// race的原理

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
});

/*Promise.race = function(values){
  return new Promise((resolve,reject)=>{
    for(let i = 0 ; i< values.length;i++){
      let current = values[i];
      if((typeof current === 'object' &&  current !==null)|| typeof current === 'function'){
        let then = current.then;
        if(typeof then == 'function'){ // 比较哪个promise比较快，谁快用快
          then.call(current,resolve,reject)
        }else{
          resolve(current);
        }
      }else{
        resolve(current);
      }
    }
  });
}*/
Promise.race([p1, p2]).then((result) => {
  console.log(result)
},err=>{
  console.log(err)
});
p2.then(function(data){

},err=>{
  console.log("1111",err)
})