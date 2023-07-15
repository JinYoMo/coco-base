import resize from './resize'

const install = function(Vue) {
  Vue.directive('resize', resize)
}

if (window.Vue) {
  window.resize = resize
  Vue.use(install); // eslint-disable-line
}

resize.install = install
export default resize
