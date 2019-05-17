/*let fs = require('mz/fs');
async function read(){
        let filename = await fs.readFile('./name1.txt','utf8');
        let age = await fs.readFile(filename,'utf8');
        let b = await [1,2,3];
        return age+b;
}   
read().then(data=>{
    console.log('s',data);
},err=>{
    console.log(err);
})*/

function * read() {
  let a = yield 1;
  console.log(a)
  let b = yield (2);
  console.log(b);
  let c = yield (3);
  console.log(c);
}

let it = read();
it.next();
it.next(100);
it.next(200);
it.next(300);