/*
setImmediate(function () {
  console.log("setImmediate")

});

setTimeout(function () {
  console.log("setTimeout")

});*/


/*
setTimeout(()=>{
    console.log('timeout')
})
//process.nextTik是微任务
process.nextTick(()=>{
    console.log('nextTick'); //  微任务
});
console.log('hello');*/

// 2)
/*
const fs = require('fs');

fs.readFile('./age.txt', () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});*/

/*
Promise.resolve().then(()=>{
    console.log('prmise 1');
    setTimeout(()=>{
    console.log('timeout1')
  })
});
setTimeout(()=>{
  Promise.resolve().then(()=>{
    console.log('promise2 ');
  });
  console.log('timeout2');
});*/


//node 中的nextTick比promise快
/*
Promise.resolve().then(()=>{
  console.log('then1');
});


process.nextTick(()=>{
  console.log('nextTick')
});*/


let fs = require("fs");
let path = require("path");

/*
// resolve 出来的是绝对路径
console.log(path.resolve(__dirname,'./name.txt'));
// join会自动加 /
console.log(path.join(__dirname, "name.txt",'/'));
//获取扩展名
console.log(path.extname("main.js"));
//获取前缀
console.log(path.basename("1.js", ".js"));

//获取父路径
console.log(path.dirname(__dirname));
*/

//读取文件的时候最好取绝对的路径
/*
let r = fs.readFileSync(path.join(__dirname, "./name.txt"), "utf8");
console.log(r);
*/
//判断文件是否存在，不存在就报错
fs.accessSync("./name.txt");
