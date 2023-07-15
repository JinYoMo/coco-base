export default {
  bind(el, binding, value) {

  },
  inserted(el, binding) {
    // 将回调函数从参数binding中取出来
    const callback = binding.value
    function documentHandler() {
      const bodyHeight = window.innerHeight
      const bodyWidth = window.innerWidth
      console.log('window resize:', bodyHeight, bodyWidth)
      callback(bodyHeight, bodyWidth)
    }
    el.__vueWindowResize__ = documentHandler
    // 监听浏览器的resize事件
    window.addEventListener('resize', documentHandler)
  },
  unbind(el, binding, vnode) {
    window.removeEventListener('onresize', el.__vueWindowResize__)
    delete el.__vueWindowResize__
  }
}
