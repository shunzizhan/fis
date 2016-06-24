# fis技术分享

@(fis)[资源定位|内容嵌入|部署|]

**FIS3 **是面向前端的工程构建工具。解决前端工程中性能优化、资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）、模块化开发、自动化工具、开发规范、代码部署等问题。

-------------------

[TOC]

## 环境配置
### 安装 Node 和 NPM
详细过程[参考官网](https://nodejs.org) https://nodejs.org
  Node 版本要求 0.8.x，0.10.x, 0.12.x，4.x，6.x，不在此列表中的版本不予支持。最新版本 node 支持会第一时间跟进，支持后更新支持列表。

### 安装 FIS3
``` 
npm install -g fis3
```
- `-g` 安装到全局目录，必须使用全局安装，当全局安装后才能在命令行（cmd或者终端）找到 fis3 命令
- 安装完成后执行` fis3 -v `判断是否安装成功，如果安装成功，则显示类似如下信息
- FIS 升级 FIS3 `npm update -g fis3`

### FIS3插件
fis3 中`内嵌`了很多常用的插件
- fis-optimizer-clean-css `压缩css`
- fis-optimizer-png-compressor `压缩png`
- fis-optimizer-uglify-js `压缩js`
- fis-spriter-csssprites `对css中的图片进行合并`
- fis3-deploy-local-deliver `本地部署`
- fis3-deploy-http-push `本地部署以及远程upload部署能力`

在实际开发中，我们还会使用一些fis3插件，此时，我们需要使用`npm install -g XXX`，例如：
-  将less文件编译成css `npm install -g fis-parser-less`
- 在fis-config中使用相对路径 `npm install -g fis3-hook-relative` 

### 基本命令
- release 常用 `-d` `-w` `-L` `-c`
```
$ fis3 release -h
 [INFO] Currently running fis3 (/usr/local/lib/node_modules/fis3/)
 Usage: fis3 release [media name]
 Options:
   -h, --help            print this help message (打印帮助信息)
   -d, --dest <path>     release output destination (编译产出到一个特定的目录)
   -l, --lint            with lint (启用文件格式检测)
   -w, --watch           monitor the changes of project (启动文件监听)
   -L, --live            automatically reload your browser (启动 livereload 功能)
   -c, --clean           clean compile cache (清除编译缓存)
   -u, --unique          use unique compile caching (启用独立缓存)
```
> **提示：**形如`fis3 release -d ./output`，且支持多种命令混合使用，如：`fis3 release  -wLc`

- server 常用 `start` `stop` `clean ` 

```
$ fis3 server --help
 [INFO] Currently running fis3 (/usr/local/lib/node_modules/fis3/)
  Usage: server <command> [options]
  
  Commands:
    start                  start server
    stop                   shutdown server
    restart                restart server
    info                   output server info
    open                   open document root directory
    clean                  clean files in document root
    install <name>         install server framework
    
  Options:
    -h, --help                     output usage information
    -p, --port <int>               server listen port
    --root <path>                  document root
    --type <php|java|node>         process language
    --rewrite [script]             enable rewrite mode
    --repos <url>                  install repository
    --timeout <seconds>            start timeout
    --php_exec <path>              path to php-cgi executable file
    --php_exec_args <args>         php-cgi arguments
    --php_fcgi_children <int>      the number of php-cgi processes
    --php_fcgi_max_requests <int>  the max number of requests
    --registry <registry>          set npm registry
    --include <glob>               clean include filter
    --exclude <glob>               clean exclude filter
    --https                        start https server
```
> **提示：**形如`fis3 server open`


## 资源定位
> 资源定位能力，可以有效地分离开发路径与部署路径之间的关系，工程师不再关心资源部署到线上之后去了哪里，变成了什么名字，这些都可以通过配置来指定。而工程师只需要使用相对路径来定位自己的开发资源即可。这样的好处是 资源可以发布到任何静态资源服务器的任何路径上，而不用担心线上运行时找不到它们，而且代码 具有很强的可移植性，甚至可以从一个产品线移植到另一个产品线而不用担心线上部署不一致的问题。

> 在默认不配置的情况下只是对资源相对路径修改成了绝对路径(`我们可以通过使用fis3-hook-relative是文件保持使用相对路径`)。通过配置文件可以轻松分离开发路径（源码路径）与部署路径。

### 在html中定位资源
FIS3 支持对html中的`script、link、style、video、audio、embed`等标签的src或href属性进行分析，一旦这些标签的资源定位属性可以命中已存在文件，则把命中文件的url路径替换到属性中，同时可保留原来url中的query查询信息。
例如：
```vbscript-html
<!--源码：
<img title="百度logo" src="images/logo.gif"/>
编译后-->
<img title="百度logo" src="/images/logo_74e5229.gif"/>

<!--源码：
<link rel="stylesheet" type="text/css" href="demo.css">
编译后-->
<link rel="stylesheet" type="text/css" href="/demo_7defa41.css">

<!--源码：
<script type="text/javascript" src="demo.js"></script>
编译后-->
<script type="text/javascript" src="/demo_33c5143.js"></script>
```
如果发布至线上时我们需要将所有的js、css、img都放置static文件下
```javascript
fis.match('*.{js,css,png,gif}', {
    useHash: true // 开启 md5 戳
});

// 所有的 js
fis.match('**.js', {
    //发布到/static/js/xxx目录下
    release : '/static/js$0'
});

// 所有的 css
fis.match('**.css', {
    //发布到/static/css/xxx目录下
    release : '/static/css$0'
});

// 所有image目录下的.png，.gif文件
fis.match('/images/(*.{png,gif})', {
    //发布到/static/pic/xxx目录下
    release: '/static/pic/$1$2'
});
```
发布后
```vbscript-html
<!--源码：
<img title="百度logo" src="images/logo.gif"/>
编译后-->
<img title="百度logo" src="/static/pic/logo_74e5229.gif"/>

<!--源码：
<link rel="stylesheet" type="text/css" href="demo.css">
编译后-->
<link rel="stylesheet" type="text/css" href="/static/css/demo_7defa41.css">

<!--源码：
<script type="text/javascript" src="demo.js"></script>
编译后-->
<script type="text/javascript" src="/static/js/demo_33c5143.js"></script>
```
> **提示：**在 实际情况中，我们可能会需要在页面中使用完整的绝对路，例如：http://img3.fdc.com.cn/bbs/static/js/demo_33c5143.js，fis也支持，后续会提及

### 在js中定位资源
>js语言中，可以使用编译函数 __uri(path) 来定位资源，fis分析js文件或 `html中的script标签`内内容 时会替换该函数所指向文件的线上url路径。
``` javascript
//源码
var img = __uri('images/logo.gif');
//编译后
var img = '/images/logo_74e5229.gif';

//源码
var css = __uri('demo.css');
//编译后
var css = '/demo_7defa41.css';

//源码
var js = __uri('demo.js');
//编译后
var js = '/demo_33c5143.js';
```

> **提示：**了解即可，实际开发中不推荐使用，从易读性角度，还是直接写路径


### 在css中定位资源

>fis编译工具会识别`css文件`或 `html的style标签内容 中 url(path) 以及 src=path 字段`，并将其替换成对应资源的编译后url路径

``` less
 // 源码
 @import url('demo.css');
 // 编译后
 @import url('/demo_7defa41.css');

 // 源码
 .style {
      background: url('images/body-bg.png');
  }
 // 编译后
 .style {
      background: url('/images/body-bg_1b8c3e0.png');
  }

```

> **提示：**了解即可，实际开发中不推荐使用，直接使用less文件的导入功能即可，且在less编译成css过程中，就行自动修改图片路径，并添加md5戳

## 内容嵌入

> 嵌入资源即内容嵌入，可以为工程师提供诸如图片base64嵌入到css、js里，前端模板编译到js文件中，将js、css、html拆分成几个文件最后合并到一起的能力。有了这项能力，可以有效的减少http请求数，提升工程的可维护性。 fis不建议用户使用内容嵌入能力作为组件化拆分的手段，因为声明依赖能力会更适合组件化开发。

### 在html中嵌入资源

在html中可以嵌入其他文件内容或者base64编码值，可以在资源定位的基础上，给资源加` ?__inline` 参数来标记资源嵌入需求。

- html中嵌入图片base64
  ```vbscript-html
  <!--源码-->
  <img title="百度logo" src="images/logo.gif?__inline"/>
  <!--编译后-->
  <img title="百度logo" src="data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7"/>
  
  ```
- html中嵌入样式文件
  ``` vbscript-html
  <!--源码-->
   <link rel="stylesheet" type="text/css" href="demo.css?__inline">
  <!--编译后-->
  <style>img { border: 5px solid #ccc; }</style>
  
  ```
- html中嵌入脚本资源
  ``` vbscript-html
  <!--源码-->
  <script type="text/javascript" src="demo.js?__inline"></script>
  <!--编译后-->
   <script type="text/javascript">console.log('inline file');</script>
  
  ```
- html中嵌入页面文件
  ``` vbscript-html
  <!--源码-->
   <link rel="import" href="demo.html?__inline">
  <!--编译后-->
  <!-- this is the content of demo.html -->
  <h1>demo.html content</h1>
  
  ```

### 在js中嵌入资源
在js中，使用编译函数 __inline() 来提供内容嵌入能力。可以利用这个函数嵌入图片的base64编码、嵌入其他js或者前端模板文件的编译内容， 这些处理对html中script标签里的内容同样有效。
``` javascript
//源码
 __inline('demo.js');
//编译后
console.log('demo.js content');

//源码
var img = __inline('images/logo.gif');
//编译后
var img = 'data:image/gif;base64,R0lGODlhDgGBALMAAGBn6eYxLvvy9PnKyfO...Jzna6853wjKc850nPeoYgAgA7';


//源码
 __inline('demo.js');
//编译后
console.log('demo.js content');
```
### 在css中嵌入资源(不推荐)
与html类似，凡是命中了资源定位能力的编译标记， 除了src="xxx"之外，都可以通过添加 ?__inline 编译标记都可以把文件内容嵌入进来。src="xxx"被用在ie浏览器支持的filter内，该属性不支持base64字符串，因此未做处理。
>**说明：**实际开发中，我们采用less编程，如果涉及到需要将图片直接以base64引入，则直接给img设置一个后缀？__inline，例如：
`.style {
   background: url(images/logo.gif?__inline);
  }`

## 实践：由grunt转变为fis

>为了更加方便快速的实现`打包部署`，我们决定尝试使用fis来实现项目的自动化。此外，前端后期计划采用`组件化开发模式`，实现项目前端的`高度解耦`，提供代码的`可复用性`。
>**说明：**我们短时间内保持文件目录与原来一致，以便大家对fis有一个感性的认知。
>
讲解示例[demo](https://github.com/shunzizhan/fis/tree/develop/project-demo/src) https://github.com/shunzizhan/fis/tree/develop/project-demo/src

### 安装fis及fis常用插件
``` cmake
  npm install -g fis3
  npm install -g fis-parser-less
  npm install -g fis3-hook-relative
```
**说明：**前提是已安装`node`、`npm` 

### 项目目录及简介

![Alt text](./fis0000.png)![Alt text](./fis0001.png)


>**注意：** 
1. html文件中，引入的样式文件是`less`，其余的与目前保持一致；
2. 在less文件中，需要使用雪碧图的地方，请在图片路劲的背后添加`?__sprite`，例如：background-image: url('../images/ico/list-1.png?__sprite');
3. 开发期间我们只需双击`test.bat`文件，fis就会自动将我们当前项目映射到本地c盘的一个小服务中（通过`fis3 server 系列操作`可以查看文件、启动/停止服务），与此类似，预发布执行`pre.bat`,线上执行`build.bat`


### fis-config一览
``` javascript

// 保持发布使用相对路径
fis.hook('relative'); 
fis.match('**', { relative: true })

//域
// 测试环境
fis.set('domain_test', ''); //开发环境静态资源
// 预发布环境
fis.set('domain_pre', 'http://preuc.fdc.com.cn'); 
// 线上环境
fis.set('domain_build', 'http://img3.fdc.com.cn'); 
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
 * 开发测试阶段
 */

fis.media('test')
    //定位到发布环境
    .match("**", {
        domain: "${domain_test}"
    })
    .match('::package', {
      spriter: fis.plugin('csssprites')
    })
    // js进行压缩，并使用hash值
    .match("/js/*.js", {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    // 将less文件编译成css
    .match('/css/*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    // 对css进行压缩，使用hash值，并合成雪碧图
    .match('/css/*.{less,css}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 给图片添加hash值
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    // 压缩图片
    .match('images/*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' 
        })
    })
    // 将合成的雪碧图直接放在images/sprite文件中
    .match('/css/(*.{png,gif})', {
      //发布到/images/sprite/xxx目录下
      release: '/images/sprite/$1$2'
    })

/**
 * 预发布阶段
 */
fis.media('pre')
    //定位到发布环境
    .match("**", {
        domain: "${domain_pre}"
    })
    .match('::package', {
      spriter: fis.plugin('csssprites')
    })
    // js进行压缩，并使用hash值
    .match("/js/*.js", {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    // 将less文件编译成css
    .match('/css/*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    // 对css进行压缩，使用hash值，并合成雪碧图
    .match('/css/*.{less,css}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 给图片添加hash值
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    // 压缩图片
    .match('images/*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' 
        })
    })
    // 将合成的雪碧图直接放在images/sprite文件中
    .match('/css/(*.{png,gif})', {
      //发布到/images/sprite/xxx目录下
      release: '/images/sprite/$1$2'
    })

/**
 * 发布阶段
 */
fis.media('build')
    //定位到发布环境
    .match("**", {
        domain: "${domain_build}"
    })
    .match('::package', {
      spriter: fis.plugin('csssprites')
    })
    // js进行压缩，并使用hash值
    .match("/js/*.js", {
        useHash: true,
        optimizer: fis.plugin('uglify-js')
    })
    // 将less文件编译成css
    .match('/css/*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    // 对css进行压缩，使用hash值，并合成雪碧图
    .match('/css/*.{less,css}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 给图片添加hash值
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    // 压缩图片
    .match('images/*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' 
        })
    })
    // 将合成的雪碧图直接放在images/sprite文件中
    .match('/css/(*.{png,gif})', {
      //发布到/images/sprite/xxx目录下
      release: '/images/sprite/$1$2'
    })
    // 将文件打包发送至远端服务器中
    .match('*', {
      deploy: fis.plugin('http-push', {
        receiver: 'http://192.168.1.9:8999/receiver',
        //远端目录
        to: '/root/fis_test/test/'
      })
    })

```
## 组件化开发

>组件化开发，思想是：按照功能划分目录，一个组件一目录，一个目录中有自己的html、js、css文件，每个人员只需关注自己开发的组件，最后由fis的脚手架工具进行组件组装，以实现项目的整体业务需求。此外，对于高度可复用性的部分，我们只需编写一次，后期可以反复复用。
>**说明：**攻关研究中，尽请期待……

## 总结

> 1. fis的核心主要包含：`资源定位`、`内容嵌入`、`打包部署`，但是在实际过程中，`fis-config`中基本已为我们做好对应的全套配置，因此我们只需了解即可。当然，我们也愿意更多的人员来一起维护、修改我们的fis-config文件。
> 2. 为了帮助大家快速打包部署项目，我将打包部署需要的一些命令配置在dos下的批处理文件中，大家开发时，只需执行对应`test.bat`即可。
> 3. 图片的压缩合并在此强烈向大家推荐，部署文件时，fis会自动将标识为`?__sprite`按文件合并在一起,不仅减少了http请求，也减轻了前端的工作量。
> 4. 部署的`deploy`较为复杂，我们需要远端服务器安装`node`、`npm`，我们还需要在远端配置接收程序，详见[发布到远端机器](http://fis.baidu.com/fis3/docs/beginning/debug.html#%E5%8F%91%E5%B8%83%E5%88%B0%E8%BF%9C%E7%AB%AF%E6%9C%BA%E5%99%A8)
> 5. 在执行`build`(包含但不限于直接点击`build.bat`文件)时，会自动将本地程序打包部署到`线上环境`，因此原则上，在执行前都需向PM申请，所有人员请慎重使用。
> 6. 【缺】目前我们采用的是使用fis自带的`md5戳`，暂时无法给js、css添加对应的版本号，后期我们将会自行封装一些满足我们需要的fis插件。