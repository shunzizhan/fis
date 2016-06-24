/**
 * 进度条
 * @require '../_.js'
 */
window.RUI.progress = {
    template: __inline('progress.tpl'),

    props: {
        percent: {
            default: 1,
        },
        traget: {
            default: 20
        },
        end:null,
        color: '#41B883'
    }, //扩展的class 色调类型 尺寸

    ready: function(){
        this.addpercent();
    },

    methods:{
        addpercent: function(){
            var that = this;
            var tragets = that.percent;
            var end = that.end ? that.end : 100;

            that.timer = setTimeout(function(){
                if(tragets < end){
                    that.percent = +that.percent + 1;
                    that.$els.progress.style.backgroundColor = that.color;//颜色变换    
                }else{
                    clearTimeout(that.timer); 
                    //that.percent = 0;  //是否重置 
                }
                that.addpercent(); 
            },60);
        }
            
    }
};

