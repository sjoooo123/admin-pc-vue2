// directives.js
import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el) {
    // 获取拖拽内容整体 这个rrc-dialog是我自己封装的组件 如果使用element的组件应写成.el-dialog,重新设置垂直水平居中
        const dragDom = el.querySelector('.el-dialog'),
            dialogHeaderEl = el.querySelector('.el-dialog__header'),
            sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dragDom.setAttribute("style", "margin:0; top: 15%; left:calc(50% - 294px); width: 588px;");
        dialogHeaderEl.style.cursor = 'move';

        // 鼠标按下事件
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
            const disX = e.clientX - dialogHeaderEl.offsetLeft,
                disY = e.clientY - dialogHeaderEl.offsetTop;

            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = Number(document.body.clientWidth) * (Number(sty.left.replace(/%/g, '')) / 100);
                styT = Number(document.body.clientHeight) * (Number(sty.top.replace(/%/g, '')) / 100);
            } else {
                styL = Number(sty.left.replace(/px/g, ''));
                styT = Number(sty.top.replace(/px/g, ''));
            }

            // 鼠标拖拽事件
            document.onmousemove = function (e1) {
                // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
                const l = e1.clientX - disX,
                    t = e1.clientY - disY;

                let finallyL = l + styL,
                    finallyT = t + styT;

                // 边界值判定 注意clientWidth scrollWidth区别 要减去之前的top left值
                // dragDom.offsetParent表示弹窗阴影部分
                if (finallyL < 0) {
                    finallyL = 0
                } else if (finallyL > dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft) {
                    finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft
                }

                if (finallyT < 0) {
                    finallyT = 0
                } else if (finallyT > dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft) {

                    finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft

                }

                // 移动当前元素
                dragDom.style.left = `${finallyL}px`;
                dragDom.style.top = `${finallyT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})