/*
 * 异步请求
 * 完全支持jquery.ajax的写法，只对个别配置进行封装
 * @require /libs/vue.js
 * @require /libs/vue-resource.js
 * @require /configs/configs.js
 * @require _.js
 */

(function(window) {
    var Vue = window.Vue;

    //数据交互
    Vue.use(window.VueResource);
    Vue.http.options.emulateJSON = true;

    var utils = window.RUtils;
    var config = window.RConfigs;
    var api = config.api;

    /**
     * @param  {object} options 配置
     * @return {object} xhr实例
     */
    utils.xhr = function(options) {
        options = options || {};

        //方法
        options.method = options.type || 'get';

        //url
        var url = options.url;
        if (Object.prototype.toString.call(url) === "[object String]") {
            //过滤hash，http请求中不会处理，过滤后，减少干扰
            url = options.url.replace(/#.*$/, '');

            //前缀替换
            url = options.url.replace(/^\{(.*?)\}/, function(str, _1) {
                return api[_1];
            });

            //防止浏览器缓存url
            if (options.cache === false || (options.method.toLowerCase() == 'get' && options.cache === undefined)) {
                //简单的实现方案
                //参数名为_，效仿jquery
                //随机数 = 时间戳
                url += /\?/.test(url) ? "&" : "?";
                url += '_=' + (+new Date());
            }

            options.url = url;
        }


        //头信息
        options.headers = options.headers || {};
        options.headers._c = 'h5'; //移动版与后台的约定


        //封装回调函数
        var _success = options.success,
            _error = options.error;

        delete options.success;
        delete options.error;

        var success = function(response) {
            var data = response.data;
            var h = data && data.h;
            var code = h && h.code;
            if (code == 200) {
                typeof _success == "function" && _success(data.b); //成功的数据
            } else {
                typeof _error == "function" && _error(data, h && h.msg, code); //来至服务端处理后的分析结果
            }
        };

        var error = function(xhrequest) {
            typeof _error == "function" && _error(xhrequest, "网络异常"); //未知错误，需要自行分析
        };

        return Vue.http(options).then(success, error);
    };
}(this));
