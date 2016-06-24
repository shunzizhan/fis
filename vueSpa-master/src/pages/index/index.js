/*
* 项目首页
* @require '/libs/vue.js'
* @require '/libs/vue-router.js'
* @require '/components/components.js'
*/

(function(){
    var Vue = window.Vue;
    var VueRouter = window.VueRouter;
    var UI = window.RUI;
    var dialog = UI.dialog;
    var toast = UI.toast;
    var modal = UI.modal;

    //开启debug 模式
    Vue.config.debug = true;

    //路由模块开始
    //api 模块
    var Api = Vue.extend({
        template: __inline('../api/api.html'), 
    });

    //社区模块
    var Space = Vue.extend({
      template: __inline('../space/space.html'),
    });

    //反馈模块
    var Feedback = Vue.extend({
      template: __inline('../feedback/feedback.html'),
    });

    var main = Vue.extend({
      template: __inline('../main/main.html'),
    });

    //首页模块 
    var App = Vue.extend({
      // template: __inline('../main/main.html'),  
    });

    // 组件模块
    var mainIndex =Vue.extend({
      template: __inline('../main/mainIndex/mainIndex.html'), 
    });
        //关于我们模块
        var about = Vue.extend({
           template: __inline('../main/about/about.html'),  
        });
        //开发组模块
        var Dev = Vue.extend({
           template: __inline('../main/dev/dev.html'),  
        });

    //基础组件模块
    var checkBox = Vue.extend({
       template: __inline('../main/base/checkBox/checkBox.html'),  
       components: {
        'ui-checkbox': UI.checkbox,
        'ui-radio': UI.radio,   
       },
    });

        var radio = Vue.extend({
           template: __inline('../main/base/radio/radio.html'),  
           components: {
            'ui-checkbox': UI.checkbox,
            'ui-radio': UI.radio,   
           }
        });

        var dialogs = Vue.extend({
           data: function(){
              return {
                dialog: null,
              };
           },
           template: __inline('../main/base/dialog/dialog.html'),
           components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-dialog': UI.dialog,
           }, 
           methods: {
              clickAlert: function(){
                this.dialog = {
                  title: 'Dialog的 alert() 弹出层效果',
                };
              },

              clickComfire: function(){
                this.dialog = {
                  type: 'confirm',
                  title: '是否选择？',
                  cancelText: '否',
                  confirmText: '是',
                  onConfirm: function(){
                      alert("ok");  
                  }
                };
              },
           }  
        });

        var modals = Vue.extend({
           template: __inline('../main/base/modal/modal.html'), 
           components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-dialog': UI.dialog,
           },  
           methods:{
              clickAlert: function(){
                modal.alert({
                  title:'this is title',
                  content: 'this is content'
                });
              },

              clickComfire: function(){
                modal.confirm({
                  title:'this is title',
                  content: 'this is content',
                  onConfirm: function(){
                    alert('ok');
                  }
                });
              },

           }
        });
        
        var button = Vue.extend({
           template: __inline('../main/base/button/button.html'),
           components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-radio': UI.radio,
           },  
        });

        var toasts = Vue.extend({
           data: function(){
              return {
                toast: null,
              };
           },
           template: __inline('../main/base/toast/toast.html'),
           components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-toast': UI.toast,
           }, 
           methods: {
              clickAlert: function(){
                this.toast = {
                  title: 'Dialog的 alert() 弹出层效果',
                  time: 2000,
                };
              },

           }  
        });

    //swiper 动画组件模块
    var swiperItem = Vue.extend({
      template: __inline('../main/swiper/swiperItem/swiperItem.html'), 
       components: {
        'ui-button': UI.button,
        'ui-checkbox': UI.checkbox,
        'ui-dialog': UI.dialog,
        'ui-swiper-headline' : UI.swiperHeadline
       }, 
    });

      var swiperBanner = Vue.extend({
          template: __inline('../main/swiper/swiperBanner/swiperBanner.html'), 
          components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-dialog': UI.dialog,
            'ui-swiper-headline' : UI.swiperHeadline,
            'ui-swiper-banner' : UI.swiperBanner
          }, 
          data: function(){
            return {
              banner:[
                {
                  url: 'http://www.baidu.com',
                  imgUrl: '../static/components/default/banner1.jpg',
                },
                {
                  url: 'http://www.baidu.com',
                  imgUrl: '../static/components/default/banner2.jpg',
                },
                {
                  url: 'http://www.baidu.com',
                  imgUrl: '../static/components/default/banner3.jpg',
                },
              ]
            };
          }
      });

      var swiperTab = Vue.extend({
          template: __inline('../main/swiper/swiperTab/swiperTab.html'), 
          components: {
            'ui-button': UI.button,
            'ui-checkbox': UI.checkbox,
            'ui-dialog': UI.dialog,
            'ui-swiper-tab' : UI.swiperTab,
          }, 
          data: function(){
          }
      });
    
    //loading 动画组件模块
    var progress = Vue.extend({
      template: __inline('../main/loading/progress/progress.tpl'),
      components: {
        'ui-button': UI.button,
        'ui-checkbox': UI.checkbox,
        'ui-dialog': UI.dialog,
        'ui-progress': UI.progress
       },  
    }); 

      var loading = Vue.extend({
        template: __inline('../main/loading/loading/loading.tpl'),
        components: {
          'ui-button': UI.button,
          'ui-checkbox': UI.checkbox,
          'ui-dialog': UI.dialog,
          'ui-progress': UI.progress,
          'ui-loading': UI.loading,
         },  
      }); 


    //多栏目选择则select
    var selects = Vue.extend({
      template: __inline('../main/select/province/province.tpl'),
      components: {
        'ui-button': UI.button,
        'ui-checkbox': UI.checkbox,
        'ui-swiper-headline': UI.swiperHeadline,
        'ui-progress': UI.progress,
        'ui-select-province': UI.selectProvince
       },  
    });     


    var router = new VueRouter({
        hashbang: false,           //  路径格式化  /#!/ or /#/
        linkActiveClass: 'active',     //配置当 v-link 元素匹配的路径时需要添加到元素上的 class 
    });

    router.map({
      '/': {
        component: main,

        subRoutes: {
          //首页介绍
          '/': {
            component: mainIndex
          },

          '/index/dev': {
           component: Dev 
          },

          '/index/about': {
            component: about
          },

          //显示基本组件
          '/base/checkBox': {
            component: checkBox
          },
          '/base/radio': {
            component: radio
          },
          '/base/dialog': {
            component: dialogs
          },
          '/base/modal': {
            component: modals
          },
          '/base/button': {
            component: button
          },
          '/base/toast': {
            component: toasts
          },
          
          //swiper 动画组件模块
          '/swiper/swiperItem': {
            component: swiperItem
          },

              '/swiper/swiperBanner': {
                component: swiperBanner
              },
              '/swiper/swiperTab': {
                component: swiperTab
              },

          //loading 动画组件模块
          '/loading/progress': {
            component: progress
          },
          '/loading/loading': {
            component: loading
          },

          // 多条件select
          '/select/province': {     //省市区的选择
            component: selects
          },
          

        }

      },
      '/api': {
        component: Api
      },
      '/space': {
        component: Space
      },
      '/feedback': {
        component: Feedback
      },
    });    


    router.start(App, '#wrap');
    //路由模块结束


    //设置footer位置
    var footerPos = document.getElementById("footer");
    var footerTop = document.body.scrollHeight;
    footerPos.style.top = footerTop + 'px';
})(window);
