function resolvePromise(promise2, x, resolve, reject) {
    //判断x的类型，来处理promise是成功还是失败
  //所有的promise都遵循这个规范，不同的人写的promise可能会混用
  //尽量考虑周全，要考虑别人promise可能出错的情况
  if (typeof x === "function" || (typeof x === "object" && x !== null)) {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
          //成功状态
          then.call(x,y=>{
             if (called) return;
             called = true;
             resolvePromise(promise2, y, resolve, reject);//递归调用，把所有resolve返回值传到then中
          },r=>{
             if(called) return;
             called = true;
            reject(r); //让promise变成
          })
      }else{
        //x 是一个普通的函数，没有then方法
        resolve(x)
      }
    }catch (e) {
       if (called) return;
       called = true;
      reject(e);
    }
  }else{
    //常量
    resolve(x);
  }


}

class Promise {
    //实例化的时候转入一个回掉函数实行器，实行resolve和reject
    constructor(executor){

        this.value; //为什么成功
        this.reason; //为什么是失败
        this.status = "pending"; //状态 成功态和失败态不能同时存在，不能互相转换

        this.resolveCallbacks = []; //存放异步成功回掉函数
        this.rejectedCallbacks = []; //存放异步失败回掉函数

        let resolve = (value)=>{
          //成功的时候讲长态改为成功
          if(this.status === "pending"){
              this.status = "fulfilled";
              this.value = value;

              //遇到异步的时候，遍历resolveCallbacks实行成功回掉函数
              this.resolveCallbacks.forEach(fn=>fn())
          }
        };

        let reject = (reason) => {
         //失败的时候讲长态改为失败
          if(this.status === "pending"){
              this.status = "rejected";
              this.reason = reason;

              //遍历实行回掉函数
              this.rejectedCallbacks.forEach(fn=>fn())
          }
        };

        //实行异常时，内部将错误原因转为失败态
        try {
            executor(resolve,reject);
        }catch (e) {
            reject(e)
        }
    }

    then(onfulfilled,onrejected){

        //then的时候需要必须返回新的promise
        let promise2;
        promise2 = new Promise((resolve, reject)=>{
          if (this.status === "fulfilled") {
            setTimeout(() => {
              try {
                let x =  onfulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              }catch (e) {
                reject(e);
              }

            },0);
          }


          if (this.status === "rejected") {
            setTimeout(() => {
              try {
                let x = onrejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              }catch (e) {
                reject(e);
              }
            }, 0);

          }

          if (this.status === 'pending') {
            this.resolveCallbacks.push(()=>{
              setTimeout(()=>{
                try {
                  let x =  onfulfilled(this.value);
                  resolvePromise(promise2, x, resolve, reject);
                }catch (e) {
                  reject(e);
                }
              },0);

            });

            this.rejectCallbacks.push(()=>{
              setTimeout(() => {
                try {
                  let x =  onrejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject);
                }catch (e) {
                  reject(e);
                }
              }, 0);

            });
          }
        });

        return promise2;
    }
}

module.exports = Promise;