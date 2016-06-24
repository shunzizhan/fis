# fis-postprocessor-rjy-postcss
基于fis的postcss插件，不自带任何postcss相关插件，根据需要自行安装。

## 依赖插件 [postcss](https://github.com/postcss/postcss)
`npm i postcss -g`

## 安装
`npm i fis-postprocessor-rjy-postcss -g`

## 配置
```js
fis.config.set('settings.postprocessor.rjy-postcss', {
    addPlugins: function () {
        var plugins = [];

        //参考：https://github.com/postcss/autoprefixer
        var pl = require('autoprefixer');
        pl({ browsers: ['> 3% in CN'] });

        plugins.push(pl);

        return plugins;
    }
});
```
## 使用
````js
fis.match('*.{css,less}', {
    postprocessor: fis.plugin('rjy-postcss')
});
````
