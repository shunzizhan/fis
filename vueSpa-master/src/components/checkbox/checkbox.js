/**
 * 多选
 * @require '../_.js'
 */
window.RUI.checkbox = {
    template: __inline('checkbox.tpl'),
    props: {
        model: {
            default: false
        },
        value: {
            default: true
        }
    },
    
    computed: {
        checked: function() {
            if (Object.prototype.toString.call(this.model) === '[object Array]') {
                for (var i = 0, l = this.model.length; i < l; i++) {
                    if (this.model[i] === this.value) {
                        return true;
                    }
                }
            } else if (this.model === this.value) {
                return true;
            }
            return;
        }
    }
};
