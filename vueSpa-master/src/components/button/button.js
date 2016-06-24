/**
 * 按钮
 * @require '../_.js'
 */
window.RUI.button = {
    props: ['exclass', 'type', 'size', 'block', 'width'], //扩展的class 色调类型 尺寸
    computed: {
        className: function() {
            var cn = '';
            cn += this.size ? ' btn_' + this.size : '';
            cn += this.type ? ' btn_' + this.type : '';
            cn += this.block ? ' btn_block' : '';
            cn += this.exclass ? " " + this.exclass : '';
            return cn;
        },
        style: function() {
            return this.width ? 'width:' + this.width : '';
        }
    },
    template: __inline('button.tpl')
};

