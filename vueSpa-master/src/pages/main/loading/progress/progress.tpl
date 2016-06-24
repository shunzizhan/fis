<div class="showinfo">
    <div class="maininfo">

        <div class="use">
            <h3 class="infotitle">loading Progress 动画</h3>
            
            <div class="info">
                <ui-progress end="20"></ui-progress>
                <br /><br />
                <ui-progress end="40" color="#41B883"></ui-progress>
                <br /><br />
                <ui-progress end="60" color="#FF5400"></ui-progress>
                <br /><br />
                <ui-progress end="80" color="gray"></ui-progress>
                <br /><br />
                <ui-progress end="100" color="green"></ui-progress>
                <br /><br />
                <ui-progress></ui-progress>
            </div>

            <h3 class="infotitle">选项</h3>
            <div class="info">


                <span class="">大小:</span>
                <ui-checkbox>biger</ui-checkbox> &nbsp;&nbsp;
                <ui-checkbox>small</ui-checkbox>
                
                <br /><br />

                <span>展示效果:</span>
                <ui-button type='primary' size='biger'> Test </ui-button>
            </div>
            
            <h3 class="infotitle">说明</h3>
            <div class="info">
                <ul>
                    <li>可以自定义扩展的class</li>
                    <li>使用方法2</li>
                </ul>
            </div>
        </div>
        
        <div class="showcode">
            <h3 class="infotitle">作者 [Author]: <span>Zigzag</span></h3>

            <h3 class="infotitle">完成进度 [Percent]</h3>
                <div class="info">
                    <ui-progress end="100"></ui-progress>
                </div>    

            <h3 class="infotitle">代码引用 [showCode]</h3>
                
                <div class="info">
                    <div class="showcodeinfo">
                       <span class="htmlcode span">HTML</span><span class="jscode span active">JS</span>
                       <div class="showcodemain" style="">


<pre><code class="xml">
    &ltui-progress end="100" color="#000"&gt&lt/ui-progress&gt
</code></pre>
                       </div>

    <div class="showcodemain">

<pre><code class="javascript">
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
</code></pre>

    </div>

        </div>
    </div>  
</div> 


    </div>               
</div>




    


