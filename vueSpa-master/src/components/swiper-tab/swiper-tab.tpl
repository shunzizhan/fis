<div class="tabcomponent">
    <div class="tabhead" v-el:tabhead >
        <div class="tabheader" 
             v-for='item in items'
             :class="{'active': $index === headActive}" 
             @click="changehead($index)">
            {{item}}
        </div>        
        
        <div class="tabheadbar" v-el:headbar></div> 
    </div>
    
    <div class="tabcontent" v-el:tabcontent>
        <div class="contenta" v-for='item in items'>
            {{item}}contents
        </div>
    </div>
</div>