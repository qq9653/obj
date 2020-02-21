<template>
  <div class="tabMusic">
    <headTop />
    <!-- 搜索歌曲详情 -->
    <div class="searchSongName">
      <div class="input_model1">
        <input type="text" v-model="songName" :placeholder="placeholder" @keyup="keyupD" maxlength="30" />
        <i class="el-icon-search but" @click="searchName"></i>
      </div>
      <div class="centent">
      </div>
    </div>
    <footEnd />
  </div>
</template>

<script>

import headTop from '@/views/header/index.vue'
import footEnd from '@/views/footer/index.vue'

export default {
  components:{
    headTop,
    footEnd,
  },
  data () {
    return {
      songName:'',
      placeholder:"",
      hash:"",
      album_id:"",
      audioData:"",
      index:0,
    }
  },
  created () {
  },
  mounted(){
    //初次渲染热门列表
    this.axios({method:'get',url:'/nofocus'})
    .then(res => {
      this.placeholder = res.data.data[this.index].keyword;
    })

    //定时刷新热门列表
    this.axios({method:'get',url:'/nofocus'})
    .then(res => {
      setInterval(()=> {
        for(var i = 0;i <= 0; i++){
          if (this.index < res.data.data.length-1) {
            this.index++;
            this.placeholder = res.data.data[this.index].keyword;
          }else{
            this.index = 0;
          }
        }
      },30000)
    })

    // this.axios({method:"get",url:"/musicHome",params:{
    //   g_tk:"1797384398",hostUin:0,format:"json",inCharset:"utf8",outCharset:"GB2312",notice:0,platform:"yqq.json",needNewCode:0,cmd:"shoubo",lan:"all"
    // }})
    // .then(res => console.log(res))
  },
  methods:{
    searchName(){
      function strNull(srt) {
        if (srt === null||srt === '' || srt == undefined) {
          return true
        }
      }
      if(strNull(this.songName)){
        return this.$router.push({path:"/musicData",query:{searchType:"song",keyword:this.placeholder}});
      }else{
        this.axios({method:'get',url:"/api",params:{
        format:"json",keyword:this.songName
        }})
        .then(() => {
          this.$router.push({path:"/musicData",query:{searchType:"song",keyword:this.songName}});
        })
      }
    },
    keyupD() {
      function strNull(srt) {
      if (srt === null||srt === '' || srt == undefined) {
        return true
      }
      }
      if (event.keyCode == 13) {
        if(strNull(this.songName)){
          return this.$router.push({path:"/musicData",query:{searchType:"song",keyword:this.placeholder}});
        }else{
          this.axios({method:'get',url:"/api",params:{
          format:"json",keyword:this.songName
          }})
          .then(() => {
            this.$router.push({path:"/musicData",query:{searchType:"song",keyword:this.songName}});
          })
        }
      }
    }
  }
}
</script>
<style scoped>

  .tabMusic {
    min-width: 1200px;
  }

  .tabMusic .centent {
    width: 900px;
    min-height: 500px;
    margin: 0 auto;
  }

  .searchSongName {
    background-color: rgb(247, 244, 244);
  }

  .input_model1 {
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .input_model1 input {
    min-width: 300px;
    height: 40px;
    border-top: 1px rgba(163, 162, 162, 0.836) ridge;
    border-left: 1px rgba(163, 162, 162, 0.836) ridge;
    border-bottom: 1px rgba(163, 162, 162, 0.836) ridge;
    border-right: none;
    outline: none;
    font-size: 14px;
    font-family: "楷体";
    font-weight: 100;
  }

  .input_model1 .but {
    text-align: center;
    width: 3rem;
    height: 40px;
    line-height: 40px;
    border-top: 1px rgba(163, 162, 162, 0.836) ridge;
    border-right: 1px rgba(163, 162, 162, 0.836) ridge;
    border-bottom: 1px rgba(163, 162, 162, 0.836) ridge;
    border-left: none;
    background-color: white;
  }

  .input_model1 .but:hover {
    cursor: pointer;
    color:rgb(255, 193, 241);
  }

</style>
