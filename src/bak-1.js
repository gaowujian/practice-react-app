import fiberElement from "./fiberElement";

// 根fiber永远不变
// let rootFiber = {
//   stateNode: container,
//   props: { children: [element] },
// };
let rootFiber = fiberElement;

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
    // 没有儿子也没兄弟,修改currentFiber指向叔叔,递归向上完成工作
    currentFiber = currentFiber.return;
  }
  //执行到这里的时候，说明执行完currentFiber = currentFiber.return之后， currentFiber为空，
  //这就意味着我们已经回到了 rootFiber, 说明收集副作用完成

  commitRoot();
}

//根据vdom创建fiber
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
