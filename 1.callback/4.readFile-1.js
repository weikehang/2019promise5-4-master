let fs = require("fs");
function after(times,callback){
  let results = [];
  return function (data) {
    results.push(data);
    if(--times === 0){
      callback(results)
    }
  }
}

let fn = after(2,function (arr) {
    console.log(arr)
});

fs.readFile("./name.txt","utf8",function (err,data) {
  fn(data);
});

fs.readFile("./age.txt","utf8",function (err,data) {
  fn(data);
});