import Vue from 'vue'

// v-dialogDrag: 弹窗拖拽
// Vue.directive('dialogDrag', {

// })
export default {
  bind(el, binding, vnode, oldVnode) {
    // el---指令所绑定的HTML元素，binding是指令绑定时传入的参数， vnode 和 oldVnode 新旧虚拟Dom节点
    // 获取拖拽内容头部
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // 获取拖拽内容整体 这个rrc-dialog是我自己封装的组件 如果使用element的组件应写成.el-dialog
    const dragDom = el.querySelector('.el-dialog') || el.querySelector('.ele-form-dialog')
    dialogHeaderEl.style.cursor = 'move' // 设置移动时鼠标的状态

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    //  const sty = window.getComputedStyle(dragDom, null)
    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      console.log('e.clientX', e.clientX)
      console.log('e.clientY ', e.clientY)
      console.log('dialogHeaderEl', dialogHeaderEl)
      console.log('dialogHeaderEl.offsetLeft', dialogHeaderEl.offsetLeft)
      console.log('dialogHeaderEl.offsetTop', dialogHeaderEl.offsetTop)
      // 获取到的值带px 正则匹配替换
      let styL, styT

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        // 把px去除变成数据（加减位置）
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      console.log('styL', styL)
      console.log('styT', styT)
      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
        const l = e.clientX - disX // 计算出从左往右边拖动了多少
        const t = e.clientY - disY // 计算出从上往下拖动了多少

        console.log('l', l)
        console.log('t', t)
        let finallyL = l + styL
        let finallyT = t + styT

        // 边界值判定 注意clientWidth scrollWidth区别 要减去之前的top left值
        // dragDom.offsetParent表示弹窗阴影部分
        if (finallyL < 0) {
          // finallyL = 0
          finallyL = l + styL
          console.log('finallyL', finallyL)
        } else if (finallyL > dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft) {
          finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft
        }

        if (finallyT < 0) {
          // finallyT = 0
          finallyT = t + styT
          console.log('finallyT', finallyT)
        } else if (finallyT > dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft) {
          (
            finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft
          )
        }

        // 移动当前元素
        dragDom.style.left = `${finallyL}px`
        dragDom.style.top = `${finallyT}px`

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

// 使用  <el-dialog v-v-dialogDrag></el-dialog>