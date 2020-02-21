<template>
  <div class="content">
    <video ref="myobj" controls class="vjs-matrix video-js vjs-theme-fantasy" data-setup='{"fluid":true}'>
    </video>
    <!-- 弹幕 -->
    <vue-baberrage id="baberrage" ref="baberrage"
    :isShow="barrageIsShow" 
    :barrageList="barrageList" 
    :loop="barrageLoop"
    :throttleGap="0" />
    <div ref="myChatInput" hidden>
      <input id="myValueLab" class="vjs-control" 
      style="width:80%;height:40px;outline:none;border-radius:10px;text-align:left;padding-left:10px;border:none;" 
      placeholder="请输入内容" maxlength="40" />
      <button class="andChat" style="width:80px;height:40px;outline:none;cursor: pointer;">发送</button>
    </div>
  </div>
</template>

<script>
import videoTab from "video.js"
import 'video.js/dist/video-js.css'
import '@videojs/themes/dist/fantasy/index.css'
import { MESSAGE_TYPE } from "vue-baberrage"
import TXQQ from "../assets/TXQQ.png"
import tt from "../assets/xueping.gif"
export default {
  props:{
    options:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      videoPlay:null,
      defat:"1",
      barrageIsShow: true,
      currentId : 0,
      barrageLoop: false,
      barrageList: [],
      la:tt,
    }
  },
  beforeDestroy(){
    if(this.videoPlay){
      this.videoPlay.dispose();
    }
  },
  mounted(){
    this.videoPlay = videoTab(this.$refs.myobj,this.options,function ready(){
      this.play();
    })
    if (localStorage.getItem("newdefat") == "1") { //第一次进入页面时 记录
      var defat = "2";
      localStorage.setItem("newdefat",defat);
    }else{                                        //第二次到无数次 刷新页面
      localStorage.setItem("newdefat",this.defat);
      var url =  window.location.href;
      window.location.href = url;
      return
    }
    window.HELP_IMPROVE_VIDEOJS = false;
    var newbtn = document.createElement('div');
    newbtn.style = "display:flex;margin:auto auto;width:70%;padding:0 30px;";
    newbtn.innerHTML = this.$refs.myChatInput.innerHTML;
    var a = document.getElementsByClassName("vjs-control-bar")[0];
    a.append(newbtn);
    newbtn.querySelector("input").addEventListener("keyup", (event)=>{
      if(event.keyCode == 13){
        this.addToList()
      }
    })
    newbtn.querySelector("button").addEventListener("click", ()=>{
      this.addToList();
    });
    console.log(location)
  },
  methods:{
    playObj(){
      this.$refs.myobj.play()
    },
    addToList(){
      var valueLab = document.getElementById("myValueLab");
      //封装是否空
      function isNull(str) {
        if(str === "" || str === null || str == undefined) return true;
      }
      if(isNull(valueLab.value)) return  this.$message({
          message:"输入不能为空",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      this.barrageList.push({
        id: ++this.currentId,
        avatar:this.la? this.la : TXQQ,
        msg: valueLab.value,
        time: 5,
        type: MESSAGE_TYPE.NORMAL
      });
      return valueLab.value = "";
    },
    fullsize(){
      console.log(123)
    }
  },
}
</script>

<style scoped>

  .content {
    width: 100%;
    height: 100%;
  }

  .content .objVideo {
    width: 50%;
    color: white;
    background-color: rgb(139, 136, 136);
    position: relative;
  }

  .objVideo p {
    padding-left: 15px;
  }

  .objVideo .objVideo-top {
    line-height: 60px;
    height: 60px;
    background-color: rgb(152, 193, 247);
    position: relative;
  }

  .objVideo .objVideo-end {
    width: 100%;
    line-height: 40px;
    background-color: #111;
    opacity: .5;
    position: absolute;
    bottom: 0;
  }

  .vjs-matrix {
    z-index: 777;
  }

  .vjs-tech {
    object-fit: cover;
    object-position: center center;
    outline: none;
  }

  .objVideo-end .objVideo-play {
    height: 40px;
    width: 40px;
    background: url("../assets/btn.png");
    background-repeat: no-repeat;
    background-size: 200px;
    cursor: pointer;
  }

  .objVideo-end .objVideo-play:hover {
    background-position: -40px 0px;
  }

  .cas {
    line-height: 60px;
    background-color: red;
    height: 60px; 
  }

  #baberrage {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }

</style>