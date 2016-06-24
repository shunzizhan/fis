<div class="m-banner">
    <div
        class="m-banner__bd"
        v-el:list
        @touchstart='onStart($event)'
        :style='boxStyle'
    >
        <a 
            v-for='item in items'
            class="m-banner__item" 
            :href="item.url"
            :style='curStyles[$index - oldactive + 1]||{}'
        >
            <img :src="item.imgUrl">
        </a>
    </div>
    <div class="m-banner__dots" v-if='items.length > 1'>
        <i 
            class='m-banner__dot'
            v-for='item in items' 
            :class='$index==active?"z-on":""'
            @click='change($index)'
        ></i>
    </div>
</div>