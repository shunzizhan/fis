<div class='m-dialog' v-if="show">
    <div class="m-dialog__content">
        <div class="m-dialog__hd">
            <!-- <i class="icon-wrong" @click='close'></i> -->
            {{show.title}}
        </div>
        <div class="m-dialog__bd"> 
            {{{show.content}}}
        </div>
        <div class="m-dialog__ft">
            <button class="m-dialog__btn" @click="confirm">{{show.confirmText||'确定'}}
            </button>
        </div>
    </div>
</div>