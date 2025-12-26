interface EnterEl extends HTMLElement {
  _eventHandler: (event: KeyboardEvent) => void
}
export const vEnter = {
  mounted(el: EnterEl, binding: any, vnode: any) {
    // 下面会介绍各个参数的细节
    el._eventHandler = function (event: KeyboardEvent) {
      if (event.key === 'Enter') {
        const isOnlyEnter = 
          !event.ctrlKey && 
          !event.altKey && 
          !event.shiftKey && 
          !event.metaKey &&
          event.code === 'Enter' && // 确保是主 Enter 键
          event.keyCode === 13 &&   // 兼容旧浏览器
          event.which === 13;
        if (isOnlyEnter) {
          binding.value()
          event.preventDefault();
        }
      }
    }
    el.addEventListener('keydown', el._eventHandler)
  },
 
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el: EnterEl, binding: any, vnode: any) {
    el.removeEventListener('keydown', el._eventHandler)
  },
}