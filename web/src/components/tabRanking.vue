<template>
  <div class="tabRanking">
    <!-- 头部 -->
    <headTop />
    <!-- 排行榜排名 -->
    <div class="content">
      <div class="content-head">
        <table>榜单</table>
      </div>
      <!-- 排行榜内容 -->
      <ul  class="content-Ranking">
        <li class="li-box-top">
          <!-- 歌曲名 -->
          <div class="ranking-name-top">
            <samp>歌曲名</samp>
          </div>
          <!-- 发布时间 -->
          <div class="ranking-addtime-top">
            <samp>发布时间</samp>
          </div>
          <!-- 时长 -->
          <div class="ranking-time-top">
            <samp>时长</samp>
          </div>
        </li>
        <li class="li-box" v-for="(item,index) of ranKingList" :key="index">
          <!-- 歌曲名 -->
          <div class="ranking-name" @click="kingIndex(index)">
            <samp>{{ index + 1 + "." + item.filename }}</samp>
          </div>
          <!-- 发布时间 -->
          <div class="ranking-addtime">
            <samp>{{ item.addtime }}</samp>
          </div>
          <!-- 时长 -->
          <div class="ranking-time">
            <samp>{{ duration[index] }}</samp>
          </div>
        </li>
      </ul>
    </div>
    <footEnd />
  </div>
</template>

<script>
import headTop from "@/views/header/index"
import footEnd from '@/views/footer/index'
export default {
  components:{
    headTop,
    footEnd,
  },
  data(){
    return{
      ranKingList:[],
      duration:[],
    }
  },
  mounted(){
    this.axios({method:"get",url:"/nolist"})
    .then(res => {
      for(var i = 0; i < res.data.data.length;i++){
        this.ranKingList.push(res.data.data[i]);    
        var a = res.data.data[i].duration/60;
        var time = a.toFixed(2);
        if (time < 10) {
          time = "0" + time;
        }
        this.duration.push(time);
      }
    })
  },
  methods:{
    kingIndex(index){
      this.$router.push({path:"/song",query:{hash:this.ranKingList[index].hash,album_id:this.ranKingList[index].album_id}})
    }
  }
}
</script>

<style scoped>

  .content {
    width: 900px;
    min-height: 500px;
    margin: 0 auto;
  }

  .content .content-head {
    background-color: rgb(181, 228, 224);
    color: rgb(90, 83, 83);
    line-height:40px;
    padding-left: 15px;
  }

  .content .content-Ranking {
    background-color: rgb(253, 247, 247);
    line-height: 40px;
    margin-bottom: 40px;
  }

  .content-Ranking .content-Ranking-top {
    display: flex;
  }

  .content-Ranking .li-box {
    display: flex;
  }

  .li-box .ranking-name {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 15px;
  }

  .li-box .ranking-name:hover {
    color: rgb(153, 204, 245);
    cursor: pointer;
  }

  .li-box .ranking-addtime {
    width: 25%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .li-box .ranking-time {
    width: 25%;
    text-align: end;
    padding-right: 20px;
    overflow: hidden;
    white-space: nowrap;
  }

  .content-Ranking .li-box-top {
    display: flex;
    background-color: rgb(203, 236, 255);
  }

  .li-box-top .ranking-name-top {
    width: 50%;
    padding-left: 15px;
  }

  .li-box-top .ranking-addtime-top {
    width: 25%;
    text-align: center;
  }

  .li-box-top .ranking-time-top {
    width: 25%;
    text-align: end;
    padding-right: 20px;
  }

</style>