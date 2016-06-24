fis.match('*', {
  useHash: true
});

fis.match('::packager', {
  postpackager: fis.plugin('loader', {
    // allInOne: true
  })
});

fis.match('*.es6', {
  parser: fis.plugin('translate-es6'),
  rExt: '.js' // .es6 最终修改其后缀为 .js
})

// fis.match('/widget/*.js', {
//   packTo: '/static/widget_pkg.js'
// })

fis.match('/widget/*.js', {
  packTo: '/static/widget_pkg.js'
});