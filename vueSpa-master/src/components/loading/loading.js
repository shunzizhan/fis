/**
 * loading基础动画
 * @require '../_.js'
 */
window.RUI.loading = {
    template: __inline('loading.tpl'),

    props: {
        percent: {
            default: 1,
        },
        traget: {
            default: 20
        },
        end:null,
        colors: {default : '#41B883'}
    }, //扩展的class 色调类型 尺寸

    ready: function(){
        this.showCanvas();
        this.showtriangle();
        this.showCircle();
        this.showHeart();
    },

    methods:{
        showCanvas: function(){   //正方形
            var ctx;
            this.ctx = this.$els.canvas.getContext('2d');
            this.ctx.fillStyle = this.colors;   
            this.ctx.fillRect (0, 0, 100, 100); 
        },

        showtriangle: function(){  //三角形
            var ctx;
            console.log(this.$els);
            ctx = this.$els.canvasTriangle.getContext('2d');
            ctx.fillStyle = this.colors;   
            ctx.beginPath();
            ctx.moveTo(50,0);
            ctx.lineTo(100,100);
            ctx.lineTo(0,100);
            ctx.fill();
        },

        showCircle: function(){
            var ctx;
            ctx = this.$els.canvasCircle.getContext('2d');
            ctx.arc(50,50,49,0,Math.PI*2,true);
            ctx.moveTo(35,40);
            ctx.arc(30,40,5,0,Math.PI*2,true); 
            ctx.moveTo(75,40);
            ctx.arc(70,40,5,0,Math.PI*2,true);
            ctx.moveTo(80,50);
            ctx.arc(50,50,30,0,Math.PI,false);  
            ctx.strokeStyle = this.colors; 
            ctx.stroke();        
        },

        showHeart: function(){
            var ctx;
            ctx = this.$els.canvasHeart.getContext('2d'); 
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fillStyle = this.colors;  
            ctx.fill();                    
        }
    }

};

