//set 可以去重 里面的内容是唯一的

let arr = [1, 2, 3, 4, 5, 2, 3];
let s = new Set(arr);

//console.log(s);

//for of可以迭代数组或者有Symbol.iterator的方法
/*
for (let key of arr) {
  console.log(key);
}*/

/*
for (let key of s.values()) {
  console.log(key);
}
*/

/*
for (let key of s.values()) {
  console.log(key);
}
*/

// console.log(Object.entries(s));

/*

let obj = {a:1,b:2, c: 3};
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));*/


/*let arr1 = [1,2,3,1,2];  // [1,2,3]
let arr2 = [3,4,5,3,1];  // [1,3,4,5]*/

/*
let s1 = new Set([...arr1, ...arr2]);
console.log([...s1]);*/

/*
let s1 = new Set(arr1);
let s2 = new Set(arr2);



console.log([...s1].filter(function (a) {
  return s2.has(a);
}));
*/

/*let a = [['name', '111'], ['age', '333'], ['age', '4949']];
var ss = new Map(a);
console.log(ss.get("age"));*/

/*let a = new A();
let map = new Map();
map.set(a, 1);
a = null;
console.log(a);*/

//浅拷贝

/*let o = {room: 10};
let ss = {room: o};
let my = {money: 100};*/
/*let obj = {...ss, ...my};
o.room = 11111;
console.log(obj);*/

//如何实现对象的深拷贝 递归+类型判断
//instanceof原理 判断当前__proto__是否有 RegExp.prototype
/*
let obj = {a:{a:{a:1,fn:function () {

      },a:undefined,reg:/\d+/}}};

let a = JSON.parse(JSON.stringify(obj));
console.log(a);*/

/*
let obj = {};
obj.a = obj;
function deepClone(obj,hash=new WeakMap()) {
  if(obj == null) return obj;
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);
  if(typeof obj !== "object") return obj;
  //其他情况 对象 数组
  if (hash.has(obj)) return hash.get(obj);
  let instance = new obj.constructor;
  hash.set(obj, instance);//把当前拷贝的和拷贝后的做一个映射

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      instance[key] = deepClone(obj[key], hash);
    }
  }

  return instance;
}
console.log(deepClone(obj));*/


let obj = [1, 2, 3];
