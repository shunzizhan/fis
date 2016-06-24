fis.match('*', {
  useHash: false
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

// fis.match('*.{css,less}', {
//   packTo: '/static/aio.css'
// });
