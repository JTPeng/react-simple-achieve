import Component from '../react/component'
const ReactDOM = {
  render,
}

function render(vnode, container) {
  return container.appendChild(_render(vnode))
}

/**
 * 组件创建
 * @param {*} comp 组件
 * @param {*} props 属性
 * @returns
 */
function createComponent(comp, props) {
  // comp 是函数组件还是类组件
  let inst
  if (comp.prototype && comp.prototype.render) {
    // 类定义组件 -> 创建实例返回
    inst = new comp(props)
  } else {
    // 函数定义组件 -> 函数扩展成类组件
    inst = new Component(props)
    console.log(inst)
    inst.constructor = comp // constructor 指向当前的函数组件
    // 定义render函数 返回jsx对象
    inst.render = function () {
      console.log(this) // this => inst
      return this.constructor(props)
    }
  }
  return inst
}

/**
 *渲染组件
 * @param {*} comp 组件
 */
function renderComponent(comp) {
  const render = comp.render() // jsx 对象
  console.log(render)
  const base = _render(render)
  comp.base = base
  console.log(base)
}

/**
 * 设置组件的属性
 * @param {*} comp 组件
 * @param {*} props 属性
 */
function setComponentProps(comp, props) {
  console.log(comp, props)
  // 设置属性
  comp.props = props
  // 渲染组件
  renderComponent(comp)
}

function _render(vnode) {
  if (typeof vnode === undefined || vnode === null || typeof vnode === 'boolean')
    return (vnode = '')
  // 文本节点
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  // tags是函数,则渲染组件
  if (typeof vnode.tag === 'function') {
    // 1.创建组件
    const comp = createComponent(vnode.tag, vnode.attrs)
    // 2.设置组件的属性
    setComponentProps(comp, vnode.attrs)
    // 3.组件渲染的节点对象返回
    return comp.base
  }

  // vdom对象
  /**
   * tag 标签对象
   * attrs 对应标签的属性 如className,on事件,style样式,子节点
   */
  const { tag, attrs, childerns } = vnode

  // 标签节点创建
  const dom = document.createElement(tag)
  // 标签是否设置了属性
  if (attrs) {
    // 遍历属性
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  if (childerns && childerns.length > 0) {
    childerns.forEach((child) => render(child, dom))
  }
  return dom
}

/**
 * 属性设置
 * @param {*} dom 绑定的对象
 * @param {*} key 属性key值
 * @param {*} value 对应key的value值
 */
function setAttribute(dom, key, value) {
  // className转class
  if (key === 'className') {
    key = 'class'
  }
  // 事件转换 如onClick -> onclick
  if (/on\w+/.test(key)) {
    // 转换成小写
    key = key.toLowerCase()
    dom[key] = value || ''
  } else if (key === 'style') {
    // style可能是字符串或对象
    if (!value || typeof value === 'string') {
      // 字符串
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      // 对象
      for (let k in value) {
        // 仅设置数值
        if (typeof value[k] === 'number') {
          key.style[k] = value[k] + 'px'
        } else {
          key.style[k] = value[k]
        }
      }
    }
  } else {
    // 其他属性
    if (key in dom) {
      dom[key] = value || ''
    }
    // 更新值
    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

export default ReactDOM
