 //实现深度克隆对象

 let obj = {name:{age:55}};
 obj.a = obj;
  function deepClone(obj,hash=new WeakMap()) {
      //如果为null
      if(obj === null) return obj;
      //如果是正则
      if(obj instanceof RegExp) return new RegExp(obj);
      //如果是时间
      if(obj instanceof Date) return new Date(obj);
      //如果是其他
      if(typeof obj !== "object") return obj;
      //对象 数组
      //判断有没有存过对象  返回上一次给你
      if(hash.get(obj)) return hash.get(obj);
      //获取的对象之后存起来  做个映射，下次判断如果已经存在直接返回
      let instance = new obj.constructor;
      hash.set(obj, instance);
      for (let key in obj){
          if (obj.hasOwnProperty(key)) {
              instance[key] = deepClone(obj[key], hash);
          }
      }
      return instance;
  }

 console.log(deepClone(obj));