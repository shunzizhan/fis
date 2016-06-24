/**
 * 轮播图
 * @require '../_.js'
 */
window.RUI.swiperBanner = {
    template: __inline('swiper-banner.tpl'),
    props: {
        //数据
        items: {
            type: Array,
            default: function() {
                return [];
            }
        },
        //当前页码
        active: {
            default: 0,
            //转换成非负整数
            coerce: function(val) {
                val = parseInt(val);
                return val > 0 ? val : 0;
            }
        },
        //最小移动距离
        baseDistance: {
            default: 100,
            //大于100的数
            coerce: function(val) {
                val = parseFloat(val);
                return val > 100 ? val : 100;
            }
        },
        //动画延时
        delay: {
            default: 300,
            //大于100的数
            coerce: function(val) {
                val = parseFloat(val);
                return val > 300 ? val : 300;
            }
        },
        speed: {
            default: 5000
        }
    },
    
    data: function() {
        return {
            timer: null, //自动播放的定时器
            coordinateX: 0,
            oldactive: 0,
            _isLast: true,
            _isFirst: true,
            boxStyle: {
                "transition-duration": 0,
                "transform": "translate(0, 0) translateZ(0)"
            },
            curStyles: [{
                "left": "-100%"
            }, {
                "left": 0
            }, {
                "left": "100%"
            }]
        };
    },

    methods: {
        _setCss: function(distance, delay) {
            this.boxStyle = {
                "transition-duration": delay + 'ms',
                "transform": "translate(" + distance + ", 0) translateZ(0)"
            };
        },
        _init: function() {
            if (!this.items || !this.items.length) return;

            var active = this.active,
                children = this.$els.list.children;

            this.oldactive = active;
            this._isFirst = !children[active - 1];
            this._isLast = !children[active + 1];

            this._setCss(0, 0);
        },
        _page: function(distance) {
            var delay = this.delay;
            if (distance >= this.baseDistance && !this._isFirst) {
                this._setCss("100%", delay);
                this.active--;
            } else if (distance <= -this.baseDistance && !this._isLast) {
                this._setCss("-100%", delay);
                this.active++;
            } else {
                this._setCss(0, delay);
            }
        },
        change: function(index) {
            if (index > this.items.length - 1) {
                index = 0;
            }
            this.active = this.oldactive = index;
        },
        onStart: function(e) {
            this.coordinateX = e.changedTouches[0].clientX;
            this._init();
            this.stopPlay();
            document.body.addEventListener('touchmove', this._onMove);
            document.body.addEventListener('touchend', this._onEnd);
        },
        
        _onMove: null,
        _onEnd: null,

        autoPlay: function() {
            var that = this;
            this.timer = setTimeout(function() {
                that.change(that.active + 1);
                that.autoPlay();
            }, this.speed);
        },
        stopPlay: function() {
            if (this.timer) {
                window.clearTimeout(this.timer);
                this.timer = null;
            }
        }
    },

    ready: function() {
        var that = this;
        this._onMove = function(e) {
            e.preventDefault(); //解决 微信以及部分安卓浏览器无法点击的问题
            var distance = e.changedTouches[0].clientX - that.coordinateX;
          
            //如果向两端翻页，增加阻力
            if ((!that._isFirst && distance > 0) || (!that._isLast && distance < 0)) {
                distance = distance / 2;
            }

            that._setCss(distance + 'px', 0);                

        };

        this._onEnd = function(e) {
            
            that._page(e.changedTouches[0].clientX - that.coordinateX);
            that.autoPlay();
            
            document.body.removeEventListener('touchmove', that._onMove);
            document.body.removeEventListener('touchend', that._onEnd);
        };

        this._init();
        this.autoPlay();
    }

};
