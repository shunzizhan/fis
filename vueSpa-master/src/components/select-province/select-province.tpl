<div class="selectby">
    <label>
        <span>所在省：</span>
        <select v-model="selectProvince">
            <option v-for="province in provinces" 
                    :value="province.value"
                    :change="changeName()">{{province.name}}</option>
        </select>        
    </label>

    <br /><br />

    <label>
        <span>所在市：</span> 
        <select v-model="selectCities" :change="selectArea()">
            <option v-for="city in cities" :value="city.name">{{city.name}}</option>
        </select>
    </label>  

    <br /><br />
    
    <label>
        <span>所在区/县：</span> 
        <select v-model="selectDistrict">
            <option v-for="district in districts" :value="district">{{district}}</option>    
        </select>
    </label> 

    <br /><br />

    您所选择的地址是: {{provinces[selectProvince]}}  {{selectCities}} {{selectDistrict}}  

</div>