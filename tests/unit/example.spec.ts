import { mount } from '@vue/test-utils'
import HomePage from '@/views/PedirPage.vue'

describe('HomePage.vue', () => {
  it('renders home view', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Inbox')
  })
})
