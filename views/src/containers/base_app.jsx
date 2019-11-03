import React, {Component} from 'react'
import { connect } from "react-redux";

import Counter from "../components/counter";
import { number } from 'prop-types';

import { increment, decrement, incrementAsync } from "../redux/actions";

/**
 * 用来将redux管理的state数据映射成 UI组件所需要的属性
 */

 //映射一般属性
function mapStateToProps(state) {
  return {
    count: state
  }
}

/**
 * 
 * @param {*} dispatch
 * 用来将包含dispatch代码的函数映射成UI组件的函数属性的函数 
 */

 //如果是函数, 会自动调用得到对象, 讲对象中的方法作为函数属性传入UI组件
function mapDispatchToProps(dispatch) {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number)),
    incrementAsync: (number) => dispatch(incrementAsync(number))
  }
}

// 如果是对象, 讲对象中的方法包装成一个新函数, 并传入UI组件
// const mapDispatchToProps = {increment, decrement}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(Counter)