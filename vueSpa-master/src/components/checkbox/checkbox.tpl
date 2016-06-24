<label class='u-checkbox' :class='{"z-checked":checked}'>
    <i></i>
    <input type="checkbox" v-model='model' :value='value'>
    <slot></slot>
</label>