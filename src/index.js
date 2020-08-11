import element from "./fiberElement";
let container = document.getElementById("root");

// 根fiber永远不变
// let rootFiber = {
//   stateNode: container,
//   props: { children: [element] },
// };
let rootFiber = element;

// 表示正在处理的fiber对象
let nextUnitOfWork = rootFiber;
function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // debugger;
  }
}
// currentFiber和workInProgressFiber表示一个，更有语义性
function performUnitOfWork(currentFiber) {
  // 用于建立currentFiber的上下级关系，包括sibling和return等
  beginWork(currentFiber);
  // ----- 中间这一段表示遍历的顺序 ------------
  // 有儿子先执行儿子,让儿子去开始
  if (currentFiber.child) {
    return currentFiber.child;
  }
  // 执行到这里的时候，当前fiber已经没有了自己的儿子
  // 这里用了while开始实现想上归的操作
  while (currentFiber) {
    // 首先把自己的任务完成
    completeWork(currentFiber);
    // 如果有兄弟返回兄弟, 让兄弟去开始
    if (currentFiber.sibling) {
      return currentFiber.sibling;
    }
    // 没有儿子也没兄弟,让currentFiber指向父亲先去完成任务
    // 之后再看父亲有没有弟弟，有弟弟的话就返回，让叔叔去开始执行任务
    // 如果父亲也没有弟弟, 再让currentFiber指向爷爷，让爷爷先完成才任务
    // 再查看爷爷有没有弟弟
    currentFiber = currentFiber.return;
  }
  //执行到这里的时候，说明执行完currentFiber = currentFiber.return之后， currentFiber为空，
  //这就意味着我们已经回到了 rootFiber, 说明收集副作用完成

  commitRoot();
}

// 1. 根据vdom创建子fiber，主要是vdom中的children属性
// 2. 创建真实dom元素，并绑定到fiber上，但是还没有到挂载渲染阶段
function beginWork(currentFiber) {
  console.log(`${currentFiber.key} 开始`);
}
//收集副作用
function completeWork(currentFiber) {
  console.log(`${currentFiber.key} 完成`);
}
// 根据effect副作用链，开始渲染
//第一次渲染的时候，相当于是把节点全部插入
function commitRoot() {
  console.log("开始渲染");
}

requestIdleCallback(workLoop);
