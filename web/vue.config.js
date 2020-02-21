module.exports ={
  devServer:{
    open:true,
    https:false,
    hot:false,
    port:80,
    host:"127.0.0.1",
    disableHostCheck: true,
    proxy:{
      "/api":{
        target:"http://mobilecdn.kugou.com/api/v3/search/song?",
        ws:true,
        changeOrigin:true,
      },
      "/nofocus":{
        target:"https://searchrecommend.kugou.com/v1/word_nofocus?",
        ws:true,
        changeOrigin:true,
      },
      "/nolist":{
        target:"http://m.kugou.com/?json=true",
        ws:true,
        changeOrigin:true,
      },
      "/getdata":{
        target:"https://wwwapi.kugou.com/yy/index.php?r=play/getdata",
        ws:true,
        changeOrigin:true,
      },
      "/musicHome":{
        target:"https://map.baidu.com/?newmap=1&qt=cen&b=12290000,2488000;12339000,2498000&l=13&dtype=1&callback=jsonp30175898",
        ws:true,
        changeOrigin:true,
      },
    }
  },
    pwa: {
      iconPaths: {
        favicon32: 'favicon.ico',
        favicon16: 'favicon.ico',
        appleTouchIcon: 'favicon.ico',
        maskIcon: 'favicon.ico',
        msTileImage: 'favicon.ico'
      }
    },
}