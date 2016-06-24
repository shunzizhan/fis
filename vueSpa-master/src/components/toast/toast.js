/**
 * 提示语
 * @require '../_.js'
 * @require '../button/button.js'
 */

window.RUI.toast = {
    template: __inline('toast.tpl'),
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
    },

    ready: function(){
        if(this.show){
            console.log(this);
        }else{
            window.setTimeout(function(){
                this.show = null;
            },2000)
        }
    }
};
