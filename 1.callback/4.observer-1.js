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