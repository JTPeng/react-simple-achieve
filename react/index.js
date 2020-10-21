import Component from './component'
const React = {
  createElement,
  Component,
}

function createElement(tag, attrs, ...childerns) {
  return {
    tag, // 外层标签
    attrs, // 属性 对象
    childerns, // 子节点  数组
  }
}

export default React
