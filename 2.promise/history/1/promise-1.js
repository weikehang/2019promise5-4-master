 function resolvePromise(promise2, x, resolve, reject) {
    //判断x的类型，来处理promise是成功还是失败
  //所有的promise都遵循这个规范，不同的人写的promise可能会混用
  //尽量考虑周全，要考虑别人promise可能出错的情况

  if(promise2 === x){
    return reject(new Error("循环引用"));
  }

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

            this.rejectedCallbacks.push(()=>{
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

  catch(rejectFuc) {
    return this.then(null, rejectFuc);
  }
}

//产生个resolve这样，外面可以方便的调用这个方法
//调用resolve,将值传到then,则需要新的promise
Promise.resolve = function (value) {
  return new Promise((resolve, reject)=>{
    resolve(value);
  });
};

//产生一个reject,返回promise对象，通过reject传值到then
Promise.reject = function (reason) {
  return new Promise((resolve,reject)=>{
    reject(reason);
  })
};

//暴露一个方法需要返回一个对象，对象上面需要有promise,resolve,reject
//减少嵌套
Promise.defer = Promise.defered = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

//promise的原理分析
//promise需要以数组的形式传需要实行的函数，然后再all方法返回promise对象
//从数组中拿到数据遍历，看看每一项参数是否是函数还是常量
//如果是对象或者函数，则需要调用then方法
//如果是常量
//最后将得到的结果放在数组存起来resolve出去
//将所有结果返回才取值
Promise.all = function (values) {
  return new Promise((resolve,reject)=>{
    let results = [];
    let i = 0;
    let processData =  (value, index)=> {
        results[index] = value;
      //如果当成功的个数和当前个数相同就把结果抛出去
      if (i++ === index) {
        resolve(results);
      }
    };

    for (let i = 0;i<values.length;i++){
        //获取当前的函数
        let current = values[i];
        //判断是函数还是常量
      if (typeof current === "function" || (typeof current === "object" && typeof current !== "number")) {
        if (typeof current.then === "function") {
          current.then(y=>{
            processData(y, i);
          },reject)
        }else{
          processData(current, i);
        }
      } else {
        //常量
        processData(current, i);
      }
    }
  })

};

//race的原理
//谁先快就选谁
Promise.race = function (values) {
  return new Promise((resolve,reject)=>{
    for (let i = 0; i < values.length; i++) {
      let current = values[i];
      if (typeof current === "function" || (typeof current === "object" && current !== null)) {
        let then = current.then;
        if (typeof then === "function") {
          then.call(current,resolve, reject);
        } else {
          resolve(current);
        }
      } else {
        resolve(current);
      }
    }
  })
};




module.exports = Promise;