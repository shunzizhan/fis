/**
 * 多选
 * @require '../_.js'
 */
window.RUI.radio = {
    template: __inline('radio.tpl'),
    props: {
        model: {
            default: false
        },
        value: {
            default: 'test'
        }
    },
    
    computed: {
        checked: function() {
            console.log(this.model);
            if (Object.prototype.toString.call(this.model) === '[object Array]') {
                for (var i = 0, l = this.model.length; i < l; i++) {
                    if (this.model[i] === this.value) {
                        return true;
                    }
                }
            } else if (this.model === this.value) {
                console.log(this.model);
                return true;
            }
            return;
        }
    }
};
