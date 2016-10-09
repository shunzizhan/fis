
fis.hook('relative'); 
fis.match('**', { relative: true })
//域
fis.set('domain_test', ''); //开发环境静态资源

fis.set('domain_pre', ''); //预发布环境静态资源

fis.set('domain_build', ''); //发布环境静态资源
// 定义版本号
fis.set('version', '1.0.0'); 

//参考：https://github.com/kangax/html-minifier
fis.config.set('settings.optimizer.html-minifier', {
    removeComments: true, //删除注释
    ignoreCustomComments: [
        /<\!--\[if\s(gt|lt|gte|lte)?ie(\s\d+(\.\d)?)?\]>.*?<\!\[endif\]-->/i //忽略ie条件注释
    ]
});

//参考：https://github.com/fex-team/fis-spriter-csssprites
// fis.config.set('settings.spriter.csssprites', {
//     htmlUseSprite: true, //开启模板内联css处理,默认关闭
//     styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
//     margin: 5 //图之间的边距
// });

//参考：https://github.com/fex-team/fis-optimizer-uglify-js
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
      except: 'exports, module, require, define' //不需要混淆的关键字
    },
    compress: {
      drop_console: true //自动删除console
    }
});
// 排除指定目录和文件
fis.set('project.ignore', [
    '.git/**',
    '.svn/**',
    'node_modules/**',
    '*.bat',
    '*.log',
    'fis-conf.js',
    "package.json",
    "**/___*.png" ,//过滤三下划线开头的预览图片
    '**/*.less'
]);

/**
 * 发布阶段
 */
fis.media('build')
    //定位到发布环境
    .match("**", {
        domain: "${domain_build}"
    })
    .match('*.html', {
        useMap: true
    })
    .match('::package', {
      spriter: fis.plugin('csssprites')
    })
    // js进行压缩，并使用hash值
    .match("widget/**/*.js", {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    // 将less文件编译成css
    .match('widget/**/*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    // 对css进行压缩，使用hash值，并合成雪碧图
    .match('widget/**/*.{less,css}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 给图片添加hash值
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    // 压缩图片
    .match('widget/**/*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' 
        })
    })
    // //widget目录下的页面，产出到根目录
    // .match(/^\/widget\/(.*\.html)$/, {
    //     release: '/$1'
    // })
    // //widget目录下与上级目录同名的页面，产出到上一级目录
    // .match(/^\/widget\/(.*)([^\/]+)\/\2\.html$/, {
    //     release: '/$1$2.html'
    // })

    // .match('*', {
    //   deploy: fis.plugin('http-push', {
    //     receiver: 'http://192.168.1.9:8999/receiver',
    //     //远端目录
    //     to: '/root/fis_test/test/'
    //   })
    // })
