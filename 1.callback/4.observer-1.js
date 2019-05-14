//观察者模式 需要被观察者与观察者  被观察者存放观察者的信息  以便及时更新状态通知观察者

//bei观察者
class Subject {
    constructor(name){
        this.name = name;
        this.observers = [];
        this.state = "我开心";
    }

    //被观察者需要存放观察者的方法，便于及时更新
    attach(fn){
        this.observers.push(fn);
    }

    //孩子状态改变的时候，通知观察者，更新观察者
    setSate(newState){
        this.state = newState;
        this.observers.forEach(observer=>observer.update(newState))
    }

}

class Observer {
    constructor(name) {
        this.name = name;
    }

    //更新方法,告诉观察者状态更新了
    update(newState){
        console.log(this.name + "说：宝宝"+newState)
    }
}

var s1 = new Subject("小宝宝");
var o1 = new Observer("妈妈");
var o2 = new Observer("爸爸");

s1.attach(o1);
s1.attach(o2);
s1.setSate("哭了");
/*

//迭代器
function * fun() {
    yield 1;
    yield 2;
    return 100;
}

let it = fun();  //迭代器 返回的是生成器 生成器有一个next方法，调用这个返回一个对象 对象里面有done是否完成迭代   value产出的结果
console.log(it.next())
console.log(it.next())
console.log(it.next())
*/


function f() {
    /*let arr = [...{0:3,1:5,2:8,length:3,[Symbol.iterator]:function () {
            let index = 0;
           return {
               next:()=>{
                   return {done:this.length == index,value:this[index++]}
               }
           }
        }}]

    console.log(arr)*/

    let arr = [...{0:1,1:2,2:4,3:4,length:4,[Symbol.iterator]:function * () {
            let index = 0;
            while (index != this.length) {
                yield this[index++];
            }
        }}]
    console.log(arr)
}

f(1,2,3)