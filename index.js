import React from './react'
import ReactDOM from './react-dom'
const ele = (
  <div className="active" title="123">
    hello, <span>React</span>
  </div>
)

// function Home() {
//   return (
//     <div className="active" title="123">
//       hello, <span>react</span>
//     </div>
//   )
// }

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="active" title="123">
        hello, <span>react</span>
      </div>
    )
  }
}

/**
 * 核心:组件化开发
 * 问题1:为什么ReactDOM.render()必须要引入React？
 *  将jsx对象转换成js对象进行操作
 * 问题2:函数组件 类组件创建出来的对象形式?
 */
// ReactDOM.render(ele, document.querySelector('#root'))
/**
 * 实现:函数组件 / 类组件 的JSX解析
 * 1.类组件则直接将组件实例化 / 函数组件需要将其构造成类组件进行实例化
 */
ReactDOM.render(<Home name="123" />, document.querySelector('#root'))
