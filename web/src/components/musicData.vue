<template>
  <div class="musicData">
    <headTop />
    <div class="searchSongName">
      <div class="input_model1">
        <input type="text" v-model="songName" :placeholder="placeholder" maxlength="30" @keyup="keyupD" />
        <i class="el-icon-search but" @click="searchName"></i>
      </div>
    </div>
    <div class="box-song">
      <el-menu :default-active="songIndex" class="songList" mode="horizontal">
        <el-menu-item index="1" @click="songIndex_one">单曲</el-menu-item>
        <el-menu-item index="2" @click="songIndex_two">歌单</el-menu-item>
        <el-menu-item index="3" @click="songIndex_three">MV</el-menu-item>
      </el-menu>
      <div class="songMain">
        <samp>{{ "搜索到" }}</samp>
        <q class="search_font">{{ searchList }}</q>
        <samp>{{ "的歌曲" }}</samp>
        <div class="search_but">
          <el-button type="primary" icon="el-icon-plus" @click="addAll">播放列表</el-button>
        </div>
      </div>
      <div class="songMainNav">
        <el-row>
          <el-col class="list_ant" :span="12">
            <span class="list_fot list_ant">歌曲名</span>
          </el-col>
          <el-col :span="6">
            <span class="list_fot">专辑</span>
          </el-col>
          <el-col :span="6">
            <span class="list_fot fot-span-1">时长</span>
          </el-col>
        </el-row>
      </div>
        <el-row class="songMainList" v-for="(item,index) of songData" :key="index">
          <div>
            <el-col class="list_ant" :span="12">
              <span class="addList" @click="addMusic(index)">+</span>
              <span class="list_fot list_ant list-ant-1" @click="dataIndex(index)">{{ item.filename }}</span>
            </el-col>
            <el-col :span="6">
              <span class="list_fot">{{ item.album_name }}</span>
            </el-col>
            <el-col :span="6">
              <span class="list_fot fot-span-1">{{ time[index] }}</span>
            </el-col>       
          </div>
        </el-row>
        <div class="nodata" v-show="nowData">
          <samp>暂无数据</samp>
        </div>
    </div>
    <footEnd />
  </div>
</template>

<script>
import headTop from '@/views/header/index'
import footEnd from "@/views/footer/index"
export default {
  components:{
    headTop,
    footEnd,
  },
  data(){
    return{
      mota:'',
      songName:'',
      placeholder:"",
      songIndex:"1",
      searchList:"",
      index:0,
      searchType:this.$route.query.searchType,
      nowData:false,
      songData: [],
      listData:[],
      time:[],
      checkedCities: [],
    }
  },
  watch:{
    //监听路由参数 searchType 类型变化
    "$route.query.searchType"(newval){
      if (newval == "special") {
        this.songIndex = "2"
      }else if(newval == "MV" || newval == "mv"||newval == "mV"||newval == "Mv"){
        this.songIndex = "3"
      }
    },
    //监听路由参数 Keyword 参数变化
    "$route.query.keyword"(){
      this.axios({method:'get',url:"/api",params:{
      format:"json",keyword:this.$route.query.keyword
      }})
      .then(res => {
        this.searchList = this.$route.query.keyword;
        this.songData.splice(0,99999999)  //删除当前数据替换新数据
          for(var i =0; i< res.data.data.info.length;i++){
            this.songData.push(res.data.data.info[i]);
          }
        if (this.songData === null || this.songData === "" || this.songData == undefined) {
          return this.nowData = true
        }else{
          return this.nowData = false
        }
      })
    }
  },

  created(){
     this.searchList = this.$route.query.keyword;
    if (this.searchType == "special") {
      this.songIndex = "2"
    }else if(this.searchType == "MV" || this.searchType == "mv"||this.searchType == "mV"||this.searchType == "Mv"){
      this.songIndex = "3"
    }
    if (this.songData === null || this.songData === "" || this.songData == undefined || this.songData <= 0) {
      return this.nowData = true
    }else{
      return this.nowData = false
    }
  },
  mounted(){
    this.axios({method:'get',url:"/api",params:{
    format:"json",keyword:this.$route.query.keyword
    }})
    .then(res => {
      for(var i =0; i< res.data.data.info.length;i++){
        this.songData.push(res.data.data.info[i]);
        var time_Minute = Math.floor(res.data.data.info[i].duration/60);//获取分钟
        var time_second = Math.floor(res.data.data.info[i].duration%60);//获取剩余秒
        this.time.push(time_Minute + ":" + time_second);
        if (time_Minute < 10 && time_second < 10) {    //判断两个是否为单数 是则
          this.time[i] = "0" + time_Minute + ":" + "0" + time_second;
        }else if(time_Minute < 10){                    //判断获取的分钟是否为单数 是则
          this.time[i] = "0" + time_Minute + ":" + time_second;
        }else if(time_second < 10){                    //判断获取的剩余的秒是否为单数 是则
          this.time[i] = time_Minute + ":" + "0" + time_second;
        }
      }
    })

    //初始化热门列表
    this.axios({method:'get',url:'/nofocus'})
    .then(res => {
      this.placeholder = res.data.data[this.index].keyword;
    })

    //定时刷新热门列表
    this.axios({method:'get',url:'/nofocus'})
    .then(res => {
      this.placeholder = res.data.data[this.index].keyword;
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
    setInterval(() =>{
      if (this.songData === null || this.songData === "" || this.songData == undefined || this.songData <= 0) {
        return this.nowData = true
      }else{
        return this.nowData = false
      }  
    })
  },
  methods:{
    searchName(){
      //判断是否为空
      function strNull(srt) {
        if (srt === null||srt === '' || srt == undefined) {
          return true
        }
      }
      if(strNull(this.songName)){
        if (this.$route.query.keyword != this.placeholder) {
          this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.placeholder }})  //空 跳转当前热门页
          this.axios({method:'get',url:"/api",params:{
            format:"json",keyword:this.placeholder
            }})
            .then(res => {
              this.songData.splice(0,99999999)  //删除当前数据替换新数据
              for(var i =0; i< res.data.data.info.length;i++){
                this.songData.push(res.data.data.info[i]);      //新数据
              }
            })
          return
        }
      }else{
        //判断是否为自身 否传参数切数据
        if (this.songName != this.$route.query.keyword) {
            this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.songName }})
            this.axios({method:'get',url:"/api",params:{
            format:"json",keyword:this.$route.query.keyword
            }})
            .then(res => {
              this.songData.splice(0,99999999)  //删除当前数据替换新数据
              for(var i =0; i< res.data.data.info.length;i++){
                this.songData.push(res.data.data.info[i]);  //新数据
              }
            })
        }
      }
    },
    songIndex_one(){
      if (this.songName != this.$route.query.keyword || this.$route.query.searchType != "song") {
        this.$router.push({path:"/musicData",query:{searchType:"song",keyword:this.$route.query.keyword}});
      }
    },
    songIndex_two(){
      if (this.songName != this.$route.query.keyword || this.$route.query.searchType != "special") {
        this.$router.push({path:"/musicData",query:{searchType:"special",keyword:this.$route.query.keyword}});
      }
    },
    songIndex_three(){
      if (this.songName != this.$route.query.keyword || this.$route.query.searchType != "MV") {
        this.$router.push({path:"/musicData",query:{searchType:"MV",keyword:this.$route.query.keyword}});
      }
    },
    dataIndex(index){
      //传入hash和id到url
      this.$router.push({path:"/song",query:{hash:this.songData[index].hash,album_id:this.songData[index].album_id}})
      this.$store.state.musicAllData.push(this.songData[index]);      //vuex存值传给Music页面
    },
    handleCheckAllChange(val) {
      if (val == true) {
        this.checkedCities = true
      }else{
        this.checkedCities = false
      }
      this.isIndeterminate = false;
    },
    addMusic(index) {
      var a = this.$store.state.musicAllData.indexOf(this.songData[index])   //查找数组是否存在相同值
      console.log(this.$store.state.musicAllData)
      if (a < 0) {
        this.$store.state.musicAllData.push(this.songData[index]);      //vuex存值传给Music页面
        this.$message({
          message:"添加成功",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }else{
        this.$message({
          message:"列表已有,无法添加",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }
    },

    addAll(){
      for(var i = 0; i < this.songData.length;i++){
        var a = this.$store.state.musicAllData.indexOf(this.songData[i])   //查找数组是否存在相同值
      }
      if (a < 0) {
        for(var j = 0; j < this.songData.length;j++){
          this.$store.state.musicAllData.push(this.songData[j]);      //vuex存值传给Music页面
        }
        this.$message({
          message:"添加成功",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }else{
        this.$message({
          message:"列表已存在,无法添加",
          center:true,
          duration:1000,
          iconClass:"false"
        })
      }
    },




    /* 键盘事件 */

    keyupD() {
      function strNull(srt) {
        if (srt === null||srt === '' || srt == undefined) {
          return true
        }
      }
      if (event.keyCode == 13) {
      if(strNull(this.songName)){
        if (this.$route.query.keyword != this.placeholder) {
          this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.placeholder }})  //空 跳转当前热门页
          this.axios({method:'get',url:"/api",params:{
            format:"json",keyword:this.placeholder
            }})
            .then(res => {
              this.songData.splice(0,99999999)  //删除当前数据替换新数据
              for(var i =0; i< res.data.data.info.length;i++){
                this.songData.push(res.data.data.info[i]);      //新数据
              }
            })
          return
        }
      }else{
        //判断是否为自身 否传参数切数据
        if (this.songName != this.$route.query.keyword) {
            this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.songName }})
            this.axios({method:'get',url:"/api",params:{
            format:"json",keyword:this.$route.query.keyword
            }})
            .then(res => {
              this.songData.splice(0,99999999)  //删除当前数据替换新数据
              for(var i =0; i< res.data.data.info.length;i++){
                this.songData.push(res.data.data.info[i]);  //新数据
              }
            })
        }
      }
      }
    }
    
  }
}
</script>

<style scoped>
  
  .musicData {
    min-width: 1100px;
    min-height: 500px;
  }

  .searchSongName {
    display: flex;
    justify-content: center;
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
    line-height: 40px;
    border-top: 1px rgba(163, 162, 162, 0.836) ridge;
    border-right: 1px rgba(163, 162, 162, 0.836) ridge;
    border-bottom: 1px rgba(163, 162, 162, 0.836) ridge;
    border-left: none;
    background-color: white;
    cursor: pointer;
  }

  .input_model1 .but:hover {
    color:rgb(255, 193, 241);
  }

  .musicData .box-song {
    width: 900px;
    min-height: 500px;
    margin: 0 auto;
  }

  .songMain {
    line-height: 60px;
    display: flex;
    position: relative;
  }

  .songMain .search_font {
    color: rgb(137, 158, 185);
    padding-left: 5px;
    padding-right: 5px;
  }
  
  .songMain .search_but {
    position: absolute;
    right: 0;
  }

  .songMainNav {
    background-color: #f8f8f8;
    text-align: right;
  }

  .musicData .list_fot {
    color: #606266;
    font-size: 14px;
    font-weight: 500;
  }

  .musicData .list_ant {
    padding-left: 10px;
    padding-right: 5px;
  }

  .musicData .fot-span-1 {
    position: absolute;
    right: 30px;
  }

  .el-col {
    display: flex;
    line-height: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .songMainList {
    line-height: 60px;
  }

  .songMainList .list-ant-1 {
    cursor: pointer;
  }

  .songMainList .list-ant-1:hover {
    color: #409EFF;
  }

  .nodata {
    width: 100%;
    height: 400px;
    position: relative;
  }

  .nodata samp {
    white-space: nowrap;
  }

  .songMainList .addList {
    height: 15px;
    line-height: 15px;
    border: rgb(148, 148, 148) 1px solid;
    color: rgb(148, 148, 148);
    margin: auto 0px;
    cursor: pointer;
  }

  .songMainList .addList:hover {
    border: rgb(87, 190, 250) 1px solid;
    color: rgb(87, 190, 250);
  }

</style>