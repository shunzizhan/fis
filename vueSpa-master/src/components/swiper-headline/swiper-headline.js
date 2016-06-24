/**
 * 头条
 * @require '../_.js'
 */

window.RUI.swiperHeadline = {

    template: __inline('swiper-headline.tpl'),

    props: {
        //数据
        items: {
            type: Array,
            default: function() {
                return [];
            }
        },
    }, 

    methods:{

        autoPlay: function(){
            var that = this;
            //每次进来先清除定时器
            window.clearTimeout(this.timer);
            that.timer = null;

            var alength = this.$els.headLine.children.length;

            

            that.timer = setTimeout(function() {

                if(that.moveHeight <= 31 * (alength - 1) ){
                    that.$els.headLine.style.webkitTransform="translate3d(0px,"+ -that.moveHeight+"px,0px)";
                }else{
                    that.moveHeight = 0;
                    this.moveHeight = 0;
                    that.$els.headLine.style.webkitTransform="translate3d(0px,"+ -that.moveHeight+"px,0px)";
                    //that.stopPlay(); 
                    // 
                    that.autoPlay();
                    
                }

            that.moveHeight += 31;
    
            that.autoPlay();

            }, 2000);
        },

        stopPlay: function() {
            if (this.timer) {
                
                window.clearTimeout(this.timer);
                this.timer = null;
                
                this.autoPlay();
            }
        }

    },
    
    ready:function(){
        var that = this;
        var headline = this.$els.headLine;
        var children = headline.children;
        var moveHeight = 31;  

        that.moveHeight = 0;

        var heights =  moveHeight * (children.length + 1);

        headline.style.width = "100%";
        headline.style.height = heights +'px';  
        headline.style.transition="-webkit-transform 500ms";

        this.autoPlay();
        
    }
};
