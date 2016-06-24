/**
 * 对话框
 * @require '../_.js'
 * @require '../button/button.js'
 */
window.RUI.dialog = {
    template: __inline('dialog.tpl'),
    props: ['show'],
    methods: {
        close: function() {
            this.show = null;
        },
        confirm: function() {
            var fn = this.show && this.show.onConfirm;
            if (typeof fn == 'function') {
                fn();
            }
            this.close();
        },
        cancel: function() {
            var fn = this.show && this.show.onCancel;
            if (typeof fn == 'function') {
                fn();
            }
            this.close();
        }
    }
};
