fis.match('*', {
  useHash: true
});

fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    // allInOne: true
  })
});

fis.match('*.less', {
  // fis-parser-less 插件进行解析
  parser: fis.plugin('less'),
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
})

fis.match('/js/{a.js,b.js,c.js}', {
  packTo: '/js/contact_all.js'
});