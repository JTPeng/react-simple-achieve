import { renderComponent } from '../react-dom'
class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }
  setState(changeState) {
    Object.assign(this.state, changeState)
    renderComponent(this)
  }
}

export default Component
