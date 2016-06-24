/**
 * 头条
 * @require '../_.js'
 */

window.RUI.swiperTab = {

    template: __inline('swiper-tab.tpl'),

    data:function(){
        return {
            items:['精选','美食','电影','酒店'],
            headActive: 0
        };
    },

    props: {}, 

    methods:{
        changehead: function(index){
            var domhead = this.$els.tabhead;
            var dombar = this.$els.headbar; 

            this.headActive = index;
            dombar.style.left = index * 25 + '%';

            this.$els.tabcontent.style.left = - index * this.contentWidth + 'px';
        }
    },
    
    ready:function(){
        var domhead = this.$els.tabhead;
        var tabcontent = this.$els.tabcontent;
        var children = tabcontent.children;
        var contentWidth = domhead.clientWidth;    

        this.contentWidth = domhead.clientWidth;

        tabcontent.style.width = contentWidth * this.items.length + 'px';

        for (var i = 0, l = children.length; i < l; ++i) {
            children[i].style.width = contentWidth + 'px';
        }
    }
};
