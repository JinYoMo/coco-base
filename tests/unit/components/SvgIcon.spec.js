import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/SvgIcon/index.vue'
describe('SvgIcon.vue', () => {
  it('iconClass', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        iconClass: 'test'
      }
    })
    expect(wrapper.find('use').attributes().href).toBe('#icon-test')
  })
  it('className', () => {
    const wrapper = shallowMount(SvgIcon, {
      propsData: {
        iconClass: 'test',
        className: 'test'
      }
    })
    expect(wrapper.classes().length).toBe(2)
    // wrapper.setProps({ className: 'test' })
    // console.log(wrapper.classes())
    expect(wrapper.classes().includes('test')).toBe(true)
  })
})
