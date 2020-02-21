<template>
  <!-- 没有兼容IE -->
  <div class="liveVideo" ref="liveVideo">
      <div class="playobj">
        <div class="objTop">
          <p>{{ name + "的直播间" }}</p>
        </div>
        <!-- 全屏 -->
        <div class="boxVideo" ref="boxVideo">
          <video class="video-ent" ref="myObj" autoplay>
            暂不支持video标签。
          </video>
          <!-- 播放器部件 -->
          <div class="module">
            <!-- 播放状态部件 -->
            <div class="module-start">
              <div :class="howPlay" @click="playObj" />
              <!-- 播放时间 -->
              <div class="mrg timelen">
                {{ time }}
              </div>
            </div>
            <div class="module-end">
              <!-- 音量 -->
              <div class="mrg volumeBar-cont" title="音量" />
              <!-- 窗口模式 -->
              <div class="mrg window-pat" @click="theraterMode" title="剧场模式" />
              <!-- 全屏模式 -->
              <div :class="fullMax" @click="handWindows" title="全屏模式" />
            </div>
          </div>
        </div>
        </div>
      <!-- 聊天盒子 -->
      <div class="playchat">
        <div class="playchat-Top">
          <p>聊天室</p>
        </div>
        <ul class="chat-centent">
          <!-- 聊天内容 -->
           <li :data-index="index" v-for="(item,index) in listChat" :key="index">
              <span>{{ name + ":" }}</span>
              <span class="spanSize">{{ item.cot }}</span>
              <span>{{ item.name  }}</span>
              <div class="gitfImg" :style="'background:url(' + item.img + ');background-size: 30px;background-repeat: no-repeat;'" />
           </li>
        </ul>

        <!-- 输入条 -->
        <div class="chat-end">
          <input type="text" v-model="chatContent" placeholder="请输入内容" maxlength="30" />
          <button @click="pushChat">发送</button>
          <div class="face">
          </div>
        </div>
        <!-- 礼物栏 -->
      </div>
      <ul class="chat-gift">
        <div class="gift-Top">
          <p>礼物栏</p>
        </div>
        <li v-for="(item,index) of listGift" :key="index" @click="giveGift(index)">
          <img :src="item.img" alt="礼物" width="60" height="60">
          <p>{{ item.name }}</p>
        </li>      
      </ul>
    </div>
</template>

<script>
import gift1 from "../assets/huoguo.gif"
import gift2 from '../assets/jiangbei.gif'
import gift3 from "../assets/xueping.gif"
import gift4 from "../assets/yingguangbang.gif"
import gift5 from "../assets/chaojihuojian.gif"
import gift6 from "../assets/chaohuo.gif"
import gift7 from "../assets/tangyuan.gif"
import gift8 from "../assets/gaonengyujing.gif"
import gift9 from "@/assets/kongtou.png"

export default {
  data(){
    return{
      name:"清哥",
      chatContent:"",
      time:"00:00",
      howPlay:"mrg stopVideo",
      fullMax:"mrg fullscreen-pat",
      scsize:"",
      listChat:[],
      listGift:[
        {img:gift1,name:"火锅"},
        {img:gift2,name:"奖杯"},
        {img:gift3,name:"血瓶"},
        {img:gift4,name:"荧光棒"},
        {img:gift5,name:"超级火箭"},
        {img:gift6,name:"超火"},
        {img:gift7,name:"汤圆"},
        {img:gift8,name:"高能预警"},
        {img:gift9,name:"空投"},
      ],
      giftBox:[],
      objAnt:false,
      full:false,
      therater:false,
    }
  },
  watch:{
  },  
  beforeDestroy(){
    clearInterval(this.mit)
  },
  mounted(){
    this.mit = setInterval(() => {
    var newTime = Math.floor(this.$refs.myObj.currentTime/60); //分钟
    var hetTime = Math.floor(this.$refs.myObj.currentTime%60); //
    var isFull = document.mozFullScreen
      || document.fullscreen
      || document.msFullscreenEnabled 
      || document.msFullscreenEnabled 
      || document.webkitRequestFullScreen 
      || document.webkitIsFullScreen; 
    if (newTime < 10) {
      newTime = "0" + newTime; 
    }
    if(hetTime < 10) {
      hetTime = '0' + hetTime;
    }
    this.time = newTime + ":" + hetTime; 
    if(isFull === false){
      return this.fullMax = "mrg fullscreen-pat"
    }else{
      console.log(isFull)
      this.fullMax = "mrg smallscreen-pat"
    }
    },500);
  },
  methods:{
    playObj(){
      if (this.objAnt == false) {
        let constraints = {
          video:{
            width:500,
            height:390
          },
          audio:true,
        }
          var promise = navigator.mediaDevices.getUserMedia(constraints);
          promise.then(MediaStream =>{
            this.$refs.myObj.srcObject = MediaStream; //获取
            this.$refs.myObj.play();      //开始直播
          })
          .catch(() => {
            this.howPlay = "mrg stopVideo";
            return alert("获取授权失败...") })
          this.howPlay = "mrg playVideo"
          return this.objAnt = true       
      }else{
        this.$refs.myObj.pause();
        this.howPlay = "mrg stopVideo"
        return this.objAnt = false
      } 
    },

    handWindows(){
      /* 兼容浏览器 */
      var isFull = document.mozFullScreen
      || document.fullscreen
      || document.msFullscreenEnabled 
      || document.msFullscreenEnabled 
      || document.webkitRequestFullScreen 
      || document.webkitIsFullScreen; 
      if(isFull === false){
        if(this.$refs.boxVideo.requestFullscreen){
          this.$refs.boxVideo.requestFullscreen();
        }else if(this.$refs.boxVideo.webkitRequestFullScreen){
          this.$refs.boxVideo.webkitRequestFullscreen();
        }else if(this.$refs.boxVideo.mozCancelFullScreen){
          this.$refs.boxVideo.mozRequestFullScreen();
        }else if(this.$refs.boxVideo.msRequestFullscreen){
          this.$refs.boxVideo.msRequestFullscreen();
        }else if(this.$refs.boxVideo.oRequestFullscreen){
          this.$refs.boxVideo.oRequestFullscreen();
        }
        return this.fullMax = "mrg smallscreen-pat";
      }else{
        if (document.exitFullscreen) {
          document.exitFullscreen();  
        }else if(document.msExitFullscreen) {
          document.msExitFullscreen();
        }else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }else if(document.oRequestFullscreen) { 
            document.oCancelFullScreen();
        }else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.fullMax = "mrg fullscreen-pat";    
      }
    },
    
    pushChat(){
      function isNull(str){
        if (str === "" || str === null || str == undefined) {
          return true
        }
      }
      if (isNull(this.chatContent)) {
        this.$message({
          message:"内容不能为空",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }else{
        this.listChat.push({cot : this.chatContent});
        this.chatContent = "";
      }
    },

    //送礼物
    giveGift(index){
      this.listChat.push({name: "送出一个" + this.listGift[index].name,img:this.listGift[index].img});
    },
    
    theraterMode(){
      
    }
    

    /* 键盘事件 */


  }
}
</script>

<style scoped>

  .liveVideo {
    min-width: 1200px;
    height: 450px;
    display: flex;
    overflow: hidden;
  }

  .liveVideo .playobj {
    width: 50%;
    background-color: rgb(234, 240, 250);
    height: auto;
  }

  .playobj .objTop {
    line-height: 60px;
    background-color: rgb(125, 154, 192);
    color: white;
    padding-left: 15px;
  }

  .playobj .boxVideo {
    min-width: 50%;
    width: 100%;
    min-height: 390px;
    height: 390px;
    background-color: rgb(110, 110, 110);
    position: relative;
  }

  .boxVideo .video-ent {
    object-fit: cover;
    -o-object-fit:cover;
    width: 100%;
    min-height: 390px;
    height: 100%;
  }

  .playobj .module {
    width: 100%;
    height: 60px;
    z-index: 111;
    color: white;
    background-color: rgb(87, 85, 85);
    opacity: .6;
    display: flex;
    position: absolute;
    bottom: 0;
  }

  .module .mrg {
    margin: 0 10px;
  }

  .module .module-start {
    position: relative;
    margin: 10px 10px;
    line-height: 40px;
    display: flex;
  }

  .module .stopVideo {
    width: 40px;
    height: 40px;
    background-image: url("../assets/btn.png");
    background-position: -4px -4px;
    cursor: pointer;
    background-size: 240px;
    background-repeat: no-repeat;
  }

  .module .playVideo {
    width: 40px;
    height: 40px;
    background-image: url("../assets/btn.png");
    background-position:-4px -52px;
    cursor: pointer;
    background-size: 240px;
    background-repeat: no-repeat;
  }

  .module .playVideo:hover {
    background-position: -52px -52px;
  }

  .module .stopVideo:hover {
    background-position: -52px -4px;
  }

  .module .module-end {
    position: absolute;
    display: flex;
    padding: 10px 10px;
    right: 0;
  }

  .module-end .fullscreen-pat {
    width: 40px;
    height: 40px;
    background-image: url("../assets/quanping.png");
    opacity: .6;
    background-repeat: no-repeat;
    cursor: pointer;
    background-position: 5px 5px;
  }

  .module-end .smallscreen-pat {
    width: 40px;
    height: 40px;
    background-image: url("../assets/suoxiao.png");
    opacity: .6;
    background-repeat: no-repeat;
    cursor: pointer;
    background-position: 5px 5px;
  }

  .module .fullscreen-pat:hover {
    opacity: 1;
  }

  .module-end .smallscreen-pat:hover {
    opacity: 1;
  }

  .module .window-pat {
    width: 40px;
    height: 40px;
    background-image: url("../assets/window.png");
    opacity: .6;
    background-repeat: no-repeat;
    cursor: pointer;
    background-position: 5px 5px;
  }

  .module .window-pat:hover {
    opacity: 1;
  }

  .playchat {
    width: 25%;
    height: 100%;
    background-color: rgba(170, 201, 216, 0.39);
    border: 1px rgb(173, 172, 172) ridge;
    position: relative;
  }

  .playchat .playchat-Top {
    line-height: 60px;
    background-color: rgb(122, 122, 122);
    text-align: center;
    color: white;
    position: relative;
    
  }

  .playchat .chat-centent {
    line-height: 30px;
    height: 347px;
  }

  .chat-centent:hover {
    overflow-y: auto;
  }

  /* 兼容 */
  .chat-centent::-webkit-scrollbar {
    width: 2px;
    background-color: white; 
  }

  .chat-centent::-webkit-scrollbar-thumb {
    background-color:rgb(19, 19, 19);
    border-radius: 10px;
  }

  .chat-centent .spanSize {
    font-size: 15px;
    font-family: 宋体;
  }

  .chat-centent li {
    display: flex;
  }

  .chat-centent .gitfImg {
    width: 30px;
    height: 30px;
  }

  .playchat .chat-end {
    width: 100%;
    line-height: 60px;
    display: flex;
    z-index: 222;
  }

  .chat-end input {
    width: 60%;
    padding-left: 16.5px;
    line-height: 40px;
    outline: none;
    border: 1px rgb(248, 203, 203) solid;
  }
  .chat-end button {
    width: 20%;
    line-height: 40px;
    border: 1px rgb(248, 203, 203) solid;
    background-color: rgb(248, 203, 203);
    outline: none;
    cursor: pointer;
  }
  
  .chat-end .face {
    width: 20%;
    height: 40px;
    border: 1px rgb(197, 229, 250) solid;
    background-color: rgb(197, 232, 252);
    background-image: url("../assets/face.png");
    background-repeat: no-repeat;
    background-position: 9px 5px;
    cursor: pointer;
  }
  
  .chat-end .face:hover {
    background-image: url("../assets/facehover.png");
  }

  .chat-gift {
    width:25%;
    margin:0 auto;
    background-color: rgba(205, 212, 216, 0.918);
  }

  .chat-gift .gift-Top {
    line-height: 60px;
    text-align: center;
    background-color: rgb(238, 117, 143);
  }

  .chat-gift li {
    text-align: center;
    float: left;
    cursor: pointer;
    margin: 15px 6px;
    border-radius: 10px;
  }

  .chat-gift li:hover {
    background-color: rgb(140, 191, 250);
    box-shadow: 0 0 5px 5px rgb(140, 191, 250);
  }
  
</style>