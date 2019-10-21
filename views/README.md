# state() 更新状态的两种写法
    1. setState(updater, [callback])
        updater 为返回stateChage对象的函数: (state, props) => stateChange
        接收的state和props的值都是最新的

    2. setState(stateChange, [callback])
        stateChange为对象
        callback 是可选的回调函数， 在状态更新且界面更新后才执行
    
    3. 总结
        对象方式是函数方式的简写方式
            如果新状态不依赖上一个状态 --> 使用对象方式
            如果新状态以来上一个状态 --> 使用函数方式

        如果需要在setState()后获取最新的状态， 需要调用回调函数


# 判断state()方式是异步还是同步
    1. 执行setState() 的位置
        异步：在react控制的回调函数中：生命周期钩子函数、react事件监听回调
        同步：在非react控制的异步回调函数：定时器、原生DOM事件监听回调、promise回调


# 异步中多次调用setState()
    1. 多次调用，如何处理
        setState({}): 合并更新一次状态，只调用一次render()更新界面 -- 状态更新和页面更新都合并
        setState(fn): 更新多次状态，只调用一次render() 更新界面 -- 状态多次更新、页面合并

    2. 对象方式和函数方式混合
        执行顺序会对结果产生影响


# PureComponent的基本原理
    1. 重写实现shouldComponentUpdate(nextProps, nextState)
    
    2. 对组件的新\旧state 和props中的数据进浅比较，如果都没有变化，返回return false，否则return true
    
    3. shouldComponentUpdate() 返回false后 不再执行更新的render()

    4. 使用pureComponent时进行赋值需要使用setState(fn) \ setState({date:[...]})


# PureComponent 和 component的区别
    1. Component存在的问题?
        1). 父组件重新render(), 当前组件也会重新执行render(), 即使没有任何变化
        2). 当前组件setState(), 重新执行render(), 即使state没有任何变化

    2. 解决Component存在的问题
        1). 原因: 组件的componentShouldUpdate()默认返回true, 即使数据没有变化render()都会重新执行
        2). 办法1: 重写shouldComponentUpdate(), 判断如果数据有变化返回true, 否则返回false
        3). 办法2: 使用PureComponent代替Component
        4). 说明: 一般都使用PureComponent来优化组件性能