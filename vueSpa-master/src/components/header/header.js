/**
 * 头部
 * @require '../_.js'
 */

window.RUI.header = {
    props: ['title', 'type'],
    template: __inline('header.tpl'),
    computed: {
        exClass: function() {
            return this.type ? "m-header_style" + this.type : "";
        }
    }
};

