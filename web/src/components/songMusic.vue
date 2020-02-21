<template>
  <div class="songMusic">
    <headTop />
    <div class="content">
      <!-- 主体内容 -->
      <div class="contentMain">
        <div class="album_rl">
          <img :src="tabImages" class="tabImages" width="260" height="260" alt="专辑图片">
          <!-- 头部标题 -->
          <div class="titleName">
            <h3>{{ titleName }}</h3>
            <ul class="titleAlbum">
              <li>
                <span class="fontOpact">专辑:</span>
                <router-link :to="titleName">{{ titleName }}</router-link>
              </li>
              <li>
                <span class="fontOpact">歌手:</span>
                <router-link :to="author_name">{{ author_name }}</router-link>
              </li>
            </ul> 
            <!-- 歌词 -->
            <div class="lyrics" ref="layTab">
              <p v-for="(item,index) of lyricsList" :key="index" ref="laylist">{{item}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footAudio">
        <div class="footAudioColor" />
        <!-- 播放器 -->
        <audio :src="hashAudio" id="myMusic" hidden autoplay ref="audio" @ended="endMusic">您的浏览器不支持audio元素。
          <source :src="hashAudio" type="video/mp4">
          <source :src="hashAudio" type="video/ogg">
        </audio>
         <div class="audio_module">
           <!-- 播放器控件 -->
            <div class="audio_play upAudio" title="上一首" />
            <div :class="playAudio" preload ref="playMusic" :title="titlePlay" @click="playMusic" />
            <div class="audio_play nextAudio" title="下一首" />
            <!-- 歌手图片 -->
            <div class="module_images">
              <img :src="tabImages" width="50" height="50" alt="歌手图片">
            </div>
            <!-- 播放进度条 -->
            <div class="musicProgress">
              <!-- 时间 -->
              <div class="musicTime">
                <samp> {{ soTime + "/" + time }} </samp>
              </div>
              <div class="progressBar">
                <!-- 进度条进度 -->
                <samp class="progressBar-Bar" @mouseup="contBar_up" />
                <!-- 拖拽按钮 -->
                <samp class="progressBar-start" :style="'width:' + cont + '%'" />
                <samp class="progressBar-cont" :style="'margin-left:' + cont + '%'" />
                <samp class="progressBar-end" />
              </div>
            </div>
            <!-- 下载，音量 -->
            <div class="music-audo">
              <!-- 音量 -->
              <div class="volumeBar-cont" title="音量" @mouseleave="showVolume = false">
                <el-slider
                  v-model="volumeValue"
                  vertical
                  height="40px"
                  :debounce="100"
                  :show-stops="true"
                  v-show="showVolume">
                </el-slider> 
                <div :class="howVolume" @click="musicVolume" />
              </div>
              <!-- 下载 -->
              <div class="marg music-download" title="下载" />
              <!-- 播放模式 -->
              <div :class="pattern" :title="musicPat" @click="musicPattern" />
              <!-- 分享功能 -->
              <el-dropdown @command="addSpace">
                <div class="marg music-share" title="分享" />
                <el-dropdown-menu 
                style="text-align:center" 
                placement="top" 
                slot="dropdown">
                  <p>分享到</p>
                  <el-dropdown-item command="addSpace">
                    <div class="share-images">
                      <img src="../assets/QQspace.png" width="30" height="30" alt="QQ空间">
                    </div>
                    <b>QQ空间</b>
                  </el-dropdown-item>
                  <el-dropdown-item command="wechatFined">
                    <div class="share-images">
                      <img src="../assets/wechatfd.png" width="30" height="30" alt="朋友圈">
                    </div>
                    <b>朋友圈</b>
                  </el-dropdown-item>
                  <el-dropdown-item command="TXQQ">
                    <div class="share-images">
                      <img src="../assets/TXQQ.png" width="30" height="30" alt="朋友圈">
                    </div>
                    <b>QQ好友</b>
                  </el-dropdown-item>
                  <el-dropdown-item command="wechat">
                    <div class="share-images">
                      <img src="../assets/wechat.png" width="30" height="30" alt="朋友圈">
                    </div>
                    <b>微信好友</b>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
         </div>
        <div class="ulText">
          <div class="ulText" @click="andShowList">
            <div class="imgmusicList" />
            <samp>{{ musicList.length }}</samp>
          </div>
          <ul class="music-list" v-show="showList" @mouseleave="showList = false">
            <div class="labelTop">
              <label>播放列表</label>
              <div class="deleteClose">
                <samp><i class="el-icon-delete" @click="deleteAll" />清空</samp>
                <samp @click="showList = false">关闭<i class="el-icon-close" /></samp>
              </div>
            </div>
            <div class="liAllData">
              <li v-for="(item,index) of musicList" :key="index" @click="playIndex(index)">
                <samp>{{ item.filename }}</samp>
              </li>
              <div class="boxNull" v-show="musicList <= 0">
                空空如也~~~
              </div>
            </div>
          </ul>
        </div>
      </div>
      <!-- 背景图 -->
      <div class="imgavter" :style="imgAvter" />
    </div>
  </div>
</template>

<script>
import headTop from '@/views/header/index'
export default {
  components:{
    headTop,
  },
  data(){
    return {
      imgAvter:"",
      tabImages:"",
      author_name:"",
      audio_name:"",
      titleName:"",
      hashAudio:"",
      playAudio:"audio_play stopAudio",
      pattern:"marg music-pattern",
      time:"",
      soTime:"",
      cont:"",
      refresh:"1",
      howVolume:'marg music-volume',
      titlePlay:"暂停",
      musicPat:"顺序播放",
      macthValue:1,
      showList:false,
      myMusic:false,
      showVolume:false,
      volumeValue:100,
      layAd:0,    //当前歌词播放位置
      layTime:[], //歌词时间
      lyricsList:[], //歌词
      musicList:[],
    }
  },
  watch:{
    soTime(){
      this.myMusic = true;
      this.playAudio = "audio_play playAudio";
    },
    myMusic(){
      if (this.myMusic == true) {
        this.playAudio = "audio_play playAudio";
      }else{
        this.playAudio = "audio_play stopAudio";
      }
    },
    volumeValue(a){
      this.$refs.audio.volume = a/100;
      if (a <= 0) {
        this.howVolume = "marg music-noVolume";
      }else if(a < 30){
        this.howVolume = "marg music-threeVolume";
      }else if(a > 30){
        this.howVolume = "marg music-volume";
      }
    },
  },
  beforeDestroy(){
    clearInterval(this.setval); //页面离开时销毁定时器
    var refresh = "1";
    localStorage.setItem("newRefresh",refresh);
  },
  created(){
    this.soTime = "00:00";  
    this.setval = setInterval(() =>{
      var numCont = this.$refs.audio.currentTime / this.$refs.audio.duration * 100;
      var newTime = Math.floor(this.$refs.audio.currentTime/60); //分钟
      var hetTime = Math.floor(this.$refs.audio.currentTime%60); //秒钟
      this.cont = numCont.toFixed(2);
      if (newTime < 10) {
        newTime = "0" + newTime; 
      }
      if(hetTime < 10) {
        hetTime = '0' + hetTime;
      }
      this.soTime = newTime+ ":" + hetTime;
      var hhh = this.$refs.audio.currentTime%60;  //取秒数不算整
      var st = hhh.toFixed(2);                  //留两位小数做对比
      if (st < 10) {
        st = "0" + st;
      }
      var setTime = newTime + ":" + st; //取得同步歌曲作比较数值
      for(var i = 0; i < this.layTime.length;i++){
        this.layAd = this.layTime.indexOf(setTime);  //查找时间所在位置返回
      }      
      if (this.layAd === "" || this.layAd === null || this.layAd == undefined) {
        return
      }else if(this.layAd > 0){        
        this.$refs.layTab.scrollTop = this.$refs.laylist[this.layAd].offsetTop - 200; // 滚动条位置
        for(var e = 0; e < this.$refs.laylist.length;e++){      //所有不是当前时间歌词的为白色
          this.$refs.laylist[e].style = "color:white"         
        }
        this.$refs.laylist[this.layAd].style = "color:rgb(127, 196, 253)"    //当前歌词时间字体颜色
      }
    });
    if (localStorage.getItem("newRefresh") == "1") { //第一次进入页面时 记录
      var refresh = "2";
      localStorage.setItem("newRefresh",refresh);
    }else{                                        //第二次到无数次 刷新页面
      localStorage.setItem("newRefresh",this.refresh);
      var url =  window.location.href;
      window.location.href = url;
      return
    }
  },
  mounted(){
    this.axios({method:'get',url:"/getdata",params:{
      callback:"jQuery19103655374953050088_1579792944107",
      hash:this.$route.query.hash,
      album_id:this.$route.query.album_id,
      dfid:"2kPd7R2QRtod0fJ8Lz2bBFMq",
      mid:"03dd14d8ce6bf62499cc00bb5ee8def3",
    }})
    .then(res =>{
      this.imgAvter = "background-image:url(" + res.data.data.img +")";
      this.tabImages = res.data.data.img;
      this.author_name = res.data.data.author_name;
      this.titleName = res.data.data.song_name;
      this.hashAudio = res.data.data.play_url;
      this.audio_name = res.data.data.audio_name;
      //歌曲时间
      var time_Minute = Math.floor(res.data.data.timelength/1000/60);//获取分钟
      var time_second = Math.floor(res.data.data.timelength/1000%60);//获取剩余秒
      if (time_Minute < 10 && time_second < 10) {    //判断两个是否为单数 是则
        this.time = "0" + time_Minute + ":" + "0" + time_second;
      }else if(time_Minute < 10){                    //判断获取的分钟是否为 单数 是则
        this.time = "0" + time_Minute + ":" + time_second;
      }else if(time_second < 10){                    //判断获取的剩余的秒是否为单数 是则
        this.time = time_Minute + ":" + "0" + time_second;
        return
      }else{
        this.time =  time_Minute + ":" + time_second;
      }
    this.axios({method:'get',url:"/api",params:{
    format:"json",keyword:this.audio_name
    }})
    .then(res => {
      this.musicList.push(res.data.data.info[0])
    })

      var lrc = String(res.data.data.lyrics);
      var lrcs = lrc.split("\n");  //拆分数组
      for(var i = 0 ; i <lrcs.length;i++){
        var s = lrcs[i].indexOf("[");
        var b = lrcs[i].indexOf("]")+1;
        this.layTime.push(lrcs[i].substring(s+1,b-1));        //歌词时间
        this.lyricsList.push(lrcs[i].substring(b,lrcs[i].length+1)) //歌词
      }
    })
  },
  methods:{
    playMusic(){
      var layMusic = document.getElementById("myMusic")  //获取播放器
      if (this.myMusic == true) {
        layMusic.pause();  // 停止
        this.titlePlay = "播放";
        return this.myMusic = false;
      }else{
        layMusic.play();  // 开始
        this.titlePlay = "暂停";
        return  this.myMusic = true;
      }
    },
    contBar_up(){
      var numCont = event.layerX/370*100; //百分比进度
      this.cont = numCont.toFixed(2);                       //保留两位小数
      var newCont = this.$refs.audio.duration /100;         //获取百分比
      this.$refs.audio.currentTime = numCont * newCont;     //播放进度时间
      this.$refs.audio.play();
    },

    addSpace(command){
        var url = window.location.href;
        var title = this.audio_name;
        var picurl = this.tabImages;
        var summary = "我在" + document.title + "上听《" + title + "》这首歌曲真的太棒了！(来自清歌单曲音乐)"
      if (command == "TXQQ") {
        // 图i
         window.location.href = 'https://connect.qq.com/widget/shareqq/index.html?&title=' +title + '&url='+ url +'&pics='+ picurl + "&summary=" + summary
      }else if (command == "addSpace"){
        window.location.href = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ url + "&title="+ title + "&pics" + picurl +"&summary=" + summary 
      }
    },
    musicVolume(){
      if (this.showVolume == false) {
        this.showVolume = true
        return
      }else{
        this.showVolume = false
      }
    },
    andShowList(){
      if (this.showList == false) {
        this.showList = true;
      }else{
        this.showList = false;
      }
    },
    musicPattern(){
      if (this.pattern === "marg music-pattern") {
        this.pattern = "marg music-loop";
        this.musicPat = "单曲循环";
        this.$message({
          message:"单曲循环",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }else if(this.pattern === "marg music-loop"){
        this.pattern = "marg music-random";
        this.musicPat = "随机播放";
        this.$message({
          message:"随机播放",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }else if(this.pattern === "marg music-random"){
        this.pattern = "marg music-pattern";
        this.musicPat = "顺序播放";
        this.$message({
          message:"顺序播放",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }
    },
    deleteAll() {
      this.$store.state.musicAllData.splice(0,99999999999)
    },
    playIndex(index){
      if(this.$route.query.hash != this.musicList[index].hash) {
        this.$router.push({path:"/song",query:{hash:this.musicList[index].hash,album_id:this.musicList[index].album_id}});
      }
    },
    endMusic() {
      console.log("借宿了")
    } 
  }
}
</script>

<style scoped>


  /* element样式 */
  .el-dropdown-menu__item {
    display: flex;
  }

  .share-images {
    width: 30px;
    height: 30px;
    position: relative;
  } 

  .el-slider {
    width: 40px;
    height: 60px;
    padding-top: 20px;
    bottom: 16px;
    position: absolute;
    background-color: rgb(112, 112, 112);
    opacity: .6;
  }



  /* 输入框获取焦点 */

  .audio_module .musicFocus {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  /* html样式 */

  .songMusic {
    height: 100%;
    max-height: 800px;
  }

  .content {
    background: #000;
    min-width: 1100px;
    min-height: 700px;
    color: white;
    background-size: cover;
    position: relative;
    z-index: 999;
  }

  .content .footAudio {
    width:100%;
    height: 70px;
    position: fixed;
    color: whitesmoke;
    bottom: 0;
    left: 0;
    display: flex;
  }

  .footAudio .audio_module {
    width: 900px;
    display: flex;
    height: 100%;
    margin: 0 auto;
  }

  .audio_module .audio_play {
    width: 40px;
    height: 70px;
  }

  .audio_module .upAudio {
    width: 36px;
    height: 36px;
    background-image: url("../assets/btn.png");
    background-position:0 -143px;
    margin-top: 20px;
    cursor: pointer;
  }

  .audio_module .stopAudio {
    width: 60px;
    height: 60px;
    background-image: url("../assets/btn.png");
    background-position: 0px 0px;
    cursor: pointer;
    margin-top: 5px;
  }

  .audio_module .playAudio {
    width: 60px;
    height: 60px;
    background-image: url("../assets/btn.png");
    background-position: 0px -60px;
    cursor: pointer;
    margin-top: 5px;
  }

  .audio_module .nextAudio {
    width: 36px;
    height: 36px;
    background-image: url("../assets/btn.png");
    background-position:-744px -143px;
    margin-top: 20px;
    cursor: pointer;
  }

  .audio_module .module_images {
    margin:10px 10px;
  }

  .audio_module .upAudio:hover {
    background-position: -36px -143px;
  }

  .audio_module .stopAudio:hover {
    background-position: -60px 0px;
  }

  .audio_module .playAudio:hover {
    background-position: -60px -60px;
  }

  .audio_module .nextAudio:hover {
    background-position: -780px -143px;
  }

  .footAudio .footAudioColor {
    background-color: rgb(29, 28, 28);
    width: 100%;
    height: 70px;
    position: absolute;
    opacity: .1;
    z-index: -99;
  }



  /* 主要内容 */

  .content .imgavter {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size:inherit;
    filter: blur(90px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -8;
    filter:alpha(opacity=60);
    opacity: .4;
  }

  .content .contentMain {
    width: 800px;
    margin: 0 auto;
    height: 50rem;
    padding-top: 20px;
  }
  
  .contentMain .album_rl {
    display: flex;
  }

  .contentMain .tabImages {
    cursor: pointer;
  }

  .contentMain .titleName {
    color: white;
    width: 440px;
    margin-left: 100px;
  }

  .titleName .lyrics {
    height: 400px;
    line-height: 40px;
    overflow: hidden;
    opacity: .6;
    color: rgb(250, 250, 250);
  }

  .titleName .lyrics:hover {
    overflow-y: auto;
  }

  /*滚动条样式 */

  .titleName .lyrics::-webkit-scrollbar {
    width: 5px;
  }

  .titleName .lyrics::-webkit-scrollbar-thumb{
    background-color: hsl(240, 1%, 34%);
    border-radius: 10px;
  }







  .titleAlbum {
    display: flex;
    margin-top: 10px;
  }

  .titleAlbum li {
    width: 50%;
    white-space: nowrap;
  }

  .titleAlbum span {
    font-size: 13px;
    font-weight: 400;
  }

  .titleAlbum a {
    color:white;
    padding-left: 10px;
  }

  .titleAlbum a:hover {
    text-decoration: underline white;
  }

  .titleAlbum .fontOpact {
    opacity: .6;
  }


  /* 播放器控件 */
  .musicProgress {
    margin:10px 10px;
    position: relative;
  }
  
  .musicProgress .progressBar {
    width: 370px;
    height: 3px;
    display: flex;
    background-color: rgb(126, 125, 125);
    margin-top: 30px;
    cursor: pointer;
    position: relative;
  }

  .musicProgress .musicTime {
    position: absolute;
    top: 0;
    right: 0;
  }

  .progressBar .progressBar-Bar {
    width: 370px;
    height: 3px;
    display: flex;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .progressBar .progressBar-end {
    width: 3px;
    height: 3px;
    background-color: white;
    position: absolute;
    right: 0;
  }
  
  .progressBar .progressBar-cont {
    width: 13px;
    height: 14px;
    position: absolute;
    background-image: url("../assets/btn.png");
    background-repeat: no-repeat;
    background-position:-259px -179px;
    bottom: -5px;
    left: -5px;
    z-index: 99;
  }

  .progressBar .progressBar-start {
    background-color: rgb(153, 198, 250);
  }

  .progressBar .progressBar-cont:hover {
    background-position:-238px -179px;
  }

  .music-audo {
    height: 16px;
    position: relative;
    top: 30px;
    display: flex;
  }

  .music-audo .marg {
    margin: 0 12px;
    width: 18px;
    height: 17px;
    cursor: pointer;
  }

  .music-audo .music-volume {
    width: 16px;
    height: 16px;
    background-image: url("../assets/btn.png");
    background-position:-112px -195px;
    cursor: pointer;
  }
  
  .music-audo .music-threeVolume {
    width: 16px;
    height: 16px;
    background-image: url("../assets/btn.png");
    background-position:-47px -195px;
    cursor: pointer;
  }
  
  .music-audo .music-noVolume {
    width: 16px;
    height: 16px;
    background-image: url("../assets/btn.png");
    background-position:-175px -195px;
    cursor: pointer;
  }

  .music-audo .music-download {
    width: 18px;
    height: 17px;
    background-image: url("../assets/btn.png");
    background-position:-238px -48px;
    cursor: pointer;
  }

  .music-audo .music-pattern {
    width: 16px;
    height: 16px;
    cursor: pointer;
    background-image: url("../assets/btn.png");
    background-position:-112px -179px;
  }

  .music-audo .music-random {
    width: 16px;
    height: 16px;
    cursor: pointer;
    background-image: url("../assets/btn.png");
    background-position:-176px -179px;
  }

  .music-audo .music-loop {
    width: 16px;
    height: 16px;
    cursor: pointer;
    background-image: url("../assets/btn.png");
    background-position:-48px -179px;
  }

  .music-audo .music-share {
    width: 16px;
    height: 16px;
    cursor: pointer;
    background-image: url("../assets/btn.png");
    background-position:-240px -16px;
  }

  .music-audo .music-volume:hover {
    background-position:-64px -195px;
  }

  .music-audo .music-download:hover {
    background-position:-238px -32px;
  }

  .music-audo .music-pattern:hover {
    background-position:-64px -179px;
  }

  .music-audo .music-random:hover {
    background-position:-127px -179px;
  }

  .music-audo .music-loop:hover {
    background-position:0px -179px;
  }

  .music-audo .music-share:hover {
    background-position: -240px 0px;
  }

  .music-audo .volumeBar-cont {
    position: relative;
  }

  .music-audo .music-noVolume:hover {
    background-position:-127px -195px;
  }

  .music-audo .music-threeVolume:hover {
    background-position:1px -195px;
  }

  .ulText {
    width: 50px;
    height: 17px;
    background-color: rgb(56, 56, 58);
    margin: auto auto;
    border-radius: 50px;
    display: flex;
  }

  .ulText .imgmusicList {
    margin-left: 5px;
    width: 20px;
    height: 17px;
    background-image: url("../assets/btn.png");
    background-position: -188px -123px;
    cursor: pointer;
    border-radius: 20px;
  }

  .imgmusicList:hover {
    background-position:-127px -123px;  
  }

  .music-list {
    position:absolute;
    width: 400px;
    min-height: 200px;
    max-height: 400px;
    bottom: 70px;
    right: 50px;
    overflow: hidden;
    z-index: 15;
    background-color: #565858; 
  }
  
  .music-list:hover {
    overflow-y: auto;
  }

   .music-list::-webkit-scrollbar {
    width: 2px;
    background-color: #565858; 
  }

  .music-list::-webkit-scrollbar-thumb{
    background-color:white;
    border-radius: 10px;
  }

  .music-list .labelTop {
    width: 100%;
    display: flex;
    line-height: 40px;
    background-color: #7c898e; 
    opacity: .7;
    z-index: 99;
  }

  .music-list .liAllData {
    z-index: 15;
  }

  .music-list .liAllData:hover {
    color: rgb(171, 204, 253);
    cursor: pointer;
  }

  .music-list .deleteClose {
    position: absolute;
    right: 0;
  }

  .music-list .boxNull {
   background-color: none; 
  }

  .deleteClose samp {
    padding: 5px;
  }
  

</style>