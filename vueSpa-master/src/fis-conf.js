/**
 * 相关配置
 */

//域
fis.set('domain_debug', ''); //开发环境静态资源
// fis.set('domain_prod', '//dn-runedu-h5.qbox.me'); //发布环境静态资源
fis.set('domain_prod', ''); //发布环境静态资源

//参考：https://github.com/kangax/html-minifier
fis.config.set('settings.optimizer.html-minifier', {
    removeComments: true, //删除注释
    ignoreCustomComments: [
        /<\!--\[if\s(gt|lt|gte|lte)?ie(\s\d+(\.\d)?)?\]>.*?<\!\[endif\]-->/i //忽略ie条件注释
    ]
});

//参考：https://github.com/fex-team/fis-spriter-csssprites
fis.config.set('settings.spriter.csssprites', {
    htmlUseSprite: true, //开启模板内联css处理,默认关闭
    styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
    margin: 5 //图之间的边距
});

//参考：https://github.com/fex-team/fis-optimizer-uglify-js
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define' //不需要混淆的关键字
    },
    compress: {
        drop_console: true //自动删除console
    }
});

//参考：https://github.com/ken1987/fis-postprocessor-rjy-postcss
// fis.config.set('settings.postprocessor.rjy-postcss', {
//     addPlugins: function () {
//         var plugins = [];
 
//         //参考：https://github.com/postcss/autoprefixer 
//         var pl = require('autoprefixer');
//         pl({ browsers: ['> 3% in CN'] });
 
//         plugins.push(pl);
 
//         return plugins;
//     }
// });

// 排除指定目录和文件
fis.set('project.ignore', [
    '.git/**',
    '.svn/**',
    'node_modules/**',
    '*.bat',
    '*.log',
    'fis-conf.js',
    "package.json",
    "**/___*.png" //过滤三下划线开头的预览图片
]);

/**
 * 开发阶段
 */

fis
    // .match('*.{css,less}', {
    //     postprocessor: fis.plugin('rjy-postcss')
    // })
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    //配置：https://github.com/fex-team/fis3-postpackager-loader
    .match('::package', {
        postpackager: fis.plugin('loader')
    })
    //所有资源
    //所有默认资源都产出到static目录下
    .match("**", {
        isMod: true,
        useSameNameRequire: true, //开启同名依赖
        domain: "${domain_debug}",
        release: "/static/$&"
    })
    //pages目录下的页面，产出到根目录
    .match(/^\/pages\/(.*\.html)$/, {
        release: '/$1'
    })
    //pages目录下与上级目录同名的页面，产出到上一级目录
    .match(/^\/pages\/(.*)([^\/]+)\/\2\.html$/, {
        release: '/$1$2.html'
    });

/**
 * 发布阶段
 */
fis.media('prod')
    //定位到发布环境
    .match("**", {
        domain: "${domain_prod}"
    })
    //vuejs的tpl不适用
    // .match("*.html", {
    //     optimizer: fis.plugin('html-minifier')   
    // })
    .match("*.js", {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    .match(/(libs\/(big|fastclick|vue|vue-resource|vue-validator)|(components|configs|utils)\/.*)\.js$/, {
        packTo: "base.js"
    })
    .match('*.{css,less}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    .match(/(libs|components)\/.*\.(css|less)$/, {
        packTo: "base.css"
    })
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' // pngcrush or pngquant default is pngcrush
        })
    })
    //测试目录不发布
    .match('/test/**', {
        release: false
    });
