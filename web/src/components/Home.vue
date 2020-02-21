<template>
  <div class="Home">
    <headTop />
    <div class="box-module">
      <div class="home-box">
        <!-- 未兼容IE -->
        <!-- <liveVideo /> -->
        <!-- videojs插件 -->
        <obj-video :options="autoOptions" />
      </div>
      <div class="mapTab">
        <!-- <mapBody /> -->
      </div>
    </div>
  </div>
</template>

<script>
import headTop from '../views/header/index.vue'
import objVideo from "../views/objVideo.vue"
// import mapBody from '../views/queryMap'
// import liveVideo from '@/views/liveVideo'

export default {
  components:{
    headTop,
    objVideo,
    // mapBody,
    // liveVideo
  },
  data () {
    return {
      autoOptions:{
        audoplay:true,
        liveui:true,
        controls:true,
        controlBar: {
          durationDisplay:false,
          progressControl:false,
          captionsButton: false,
          PictureInPictureToggle:false,
          SubsCapsButton:false,
          SubtitlesButton:false,
          DescriptionsButton:false,
          ChaptersButton:false,
          PlaybackRateMenuButton:true,
          RemainingTimeDisplay:false,
          CurrentTimeDisplay:false,
          TimeDivider:false,
          fullscreen:false,
        },
        sources:[
          {src:"https://vjs.zencdn.net/v/oceans.mp4",type:"video/mp4"}
        ]
      }
    }
  },
  
  mounted(){
  },
  methods:{
  }
}
</script>
<style scoped>

  .Home {
    min-width: 1200px;
  }

  .Home .box-module {
    width: 1200px;
    margin: 30px auto;
    overflow: hidden;
  }

  .Home .home-box {
    display: flex;
    position: relative;
  }

</style> 
