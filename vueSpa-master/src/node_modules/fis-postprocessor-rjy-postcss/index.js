var postcss = require('postcss');

module.exports = function (content, file, conf) {
    if (file.isCssLike && typeof conf.addPlugins == 'function') {
        var plugins = conf.addPlugins();

        if (Array.isArray(plugins) && plugins.length) {
            return postcss(plugins).process(content).css;
        }
    }
    return content;
};
