/**
 * 三联选择
 * @require '../_.js'
 */
window.RUI.selectProvince = {
    template: __inline('select-province.tpl'),

    data: function(){
        return {
            selectProvince: 0,
            selectCities: '请选择',
            selectDistrict: '请选择',
            info: __inline('select-province.json'),
            provinces: [],
            cities: [],
            districts: [],
        };
    },

    ready: function(){
        //省名称添加
        this.provincess = this.provinces || [];

        this.provinces.push({
           name: '请选择',
           value: 0, 
        });   

        for (var i = 0, l = this.info.length; i < l; ++i) {
            this.provincess = this.provinces.push({
                name: this.info[i].name,
                value: i+1,    
            });
        }

        //市名称的选择
        this.citiess = this.cities || [];
        this.cities.push({
           name: '请选择',
           value: 101, 
        });

        //区、县 的名称
        this.districtss = this.districts || [];
        this.districts.push('请选择'); 
    },

    methods:{
        changeName: function(val){
            if(val){
                var thisProvince = this.info[val-1];

                this.cities = thisProvince.city;
                if(this.cities.length == 1){
                    this.cities.push({
                       name: '请选择',
                       value: 101, 
                    });                     
                }

            }
        },

        changeArea: function(vals){
            var selectProvince = this.selectProvince;
            console.log(selectProvince,vals);
        },

        selectArea: function(){
            if(this.selectCities !== '请选择'){
                for (var m = 0, n = this.cities.length; m < n; ++m) {
                    if(this.cities[m].name === this.selectCities){
                        this.districts.push('请选择');
                        this.districts = this.cities[m].area;
                    } 
                }
            }else{
                this.selectDistrict = "请选择";
            }
        }
    },

    watch:{
        selectProvince: function(val){
            if(val !== 0){
                this.changeName(val);
            }else{
                this.cities = [{
                   name: '请选择',
                   value: 101,  
                }];
            }
        },

        
    },

};

