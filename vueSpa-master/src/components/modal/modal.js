/**
 * 模态框
 * @require '/libs/vue.js'
 * @require '../_.js'
 * @require '../dialog/dialog.js'
 */
(function() {
    var Vue = window.Vue;
    var RUI = window.RUI;

    var createDIV = function() {
        var div = document.createElement('div');
        document.body.appendChild(div);
        return div;
    };

    var Dialog = Vue.extend({
        template: __inline('modal.tpl'),
        components: {
            'ui-dialog': RUI.dialog
        }
    });

    var init = function(props) {
        props.show = true;

        //重构
        var onClosed = props.onClosed;
        props.onClosed = function() {
            this.$root.$destroy(true);
            typeof onClosed == 'function' && onClosed();
        };

        new Dialog({
            el: createDIV(),
            data: {
                show: props
            }
        });
    };

    RUI.modal = {
        alert: function(props) {
            props = props || {};
            props.type = 'alert';
            init(props);
        },
        confirm: function(props) {
            props = props || {};
            props.type = 'confirm';
            init(props);
        },
        prompt: function(props) {
            props = props || {};
            props.type = 'prompt';
            init(props);
        },
        loading: function(props) {
            props = props || {};
            props.type = 'loading';
            init(props);
        }
    };
}());
