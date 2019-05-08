function resolvePromise(promise2, x, resolve, reject) {
   //判断x的类型 来处理promise2是成功还是失败
    if (promise2 === x) {
        return reject(new TypeError("循环引用"));
    }

    //判断x是不是当前x的then方法，这个then方法可能定义的时候，用object.defineProperty
  if (typeof x === "function" || (typeof x === "object" && x !== null)) {
    //尝试获取当前x的值，这个then方法用的object.defindProperty
    let called;
    try {
      let then = x.then;  //如果方法出错，那就用拒绝promise2
      if (typeof then === "function") {
        then.call(x,y=>{
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        },r=>{
          if(called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    }catch (e) {
      if(called) return;
      called = true;
      reject(e);
    }
  }else {
    // x肯定一个常量
    resolve(x);
  }


}

class Promise {
    //实例化的时候转入一个回掉函数实行器，实行resolve和reject
    constructor(executor){

        this.value = ""; //为什么成功
        this.reason = ""; //为什么是失败
        this.status = "pending"; //状态 成功态和失败态不能同时存在，不能互相转换

        this.resolveCallbacks = []; //存放异步成功回掉函数
        this.rejectedCallbacks = []; //存放异步失败回掉函数

        let resolve = (value)=>{
          //成功的时候讲长态改为成功
          if(this.status === "pending"){
              this.status = "fulfilled";
              this.value = value;

              //遇到异步的时候，遍历resolveCallbacks实行成功回掉函数
              this.rejectedCallbacks.forEach(fn=>fn())
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
        promise2 = new Promise((resolve, reject) => {
            //在下一个then判断当前状态是fulfilled还是rejected
            //然后调用onfulfilled还是onrejected将值往下转递
            //成功的时候施行成功回掉函数
            console.log(this.status)
            if (this.status === "fulfilled") {
              setTimeout(()=>{
                try {
                  //x是普通函数还是promise，如果是普通值，直接调用promise2的resolve
                  //如果是promise 那应该让x这个promise实行.then
                  let x = onfulfilled(this.value);
                  resolvePromise(promise2, x, resolve, reject);
                }catch (e) {
                  reject(e);
                }
              },0);
            }

            //失败的时候实行失败回掉函数
            if (this.status === "rejected") {
              setTimeout(()=>{
                try {
                  let x = onrejected(this.reason);
                  resolvePromise(promise2, x, resolve, reject);
                }catch (e) {
                  reject(e);
                }
              },0);
            }

            //为让异步的resolve,rejected先实行在实行then
            //所以先将resolve,rejected分别存放在数组
            if (this.status === "pending") {
              this.resolveCallbacks.push(()=>{
                  setTimeout(()=>{
                    try {
                      let x = onfulfilled(this.value);
                      resolvePromise(promise2, x, resolve, reject);
                    }catch (e) {
                      reject(e);
                    }
                  },0);

                });
                this.rejectedCallbacks.push(()=>{
                  setTimeout(()=>{
                    try {
                      let x = onrejected(this.reason);
                      resolvePromise(promise2, x, resolve, reject);
                    }catch (e) {
                      reject(e);
                    }
                  },0);

                });
            }

        });

        return promise2;
    }
}

module.exports = Promise;