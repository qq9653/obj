<template>
  <div class="header">
    <div class="labelNav">
      <img src="../../assets/music.png" width="60px" height="60px" alt="听歌网" />
      <samp>清歌吧</samp>
      <div class="boxTab" v-show="musitPage">
        <input type="text" v-model="songName" :placeholder="placeholder" maxlength="30" @keyup="keyupD" />
        <i class="el-icon-search but" @click="searchName"></i>
      </div>
    </div>
    <samp class="dateTab">{{ dateTab }}</samp>
    <ul class="navmoTone">
        <li>
          <el-popover
            placement="top-start"
            title="shop"
            width="150"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <samp slot="reference" class="samp-tab1">请登录账号</samp>
          </el-popover>
        </li>
        <li>
          <samp @click="drawer = true" class="samp-tab1">我的账号</samp>
        </li>
        <li>
          <samp class="samp-tab1" @click="dayFeed = true">日常反馈</samp>
        </li>
        <li>
          <samp class="samp-tab1"  @click="handQuery">联系QQ客服</samp>
        </li>
        <li>
          <samp class="samp-tab1" @click="cperAtion = true">投资合作</samp>
        </li>
        <li>
          <router-link class="a-tab1-2" :style="musicOffice" to="/Music">
         <samp>听歌主页|聊天室</samp></router-link>
        </li>
      </ul>
      <div class="labelHeader">
        <ul class="musicLabelNav">
          <router-link to="/">
            <li class="musicLabelNav_li">首页</li>
          </router-link>
          <router-link to="/music">
            <li class="musicLabelNav_li">清歌吧</li>
          </router-link>
          <router-link to="/tabRanking">
            <li class="musicLabelNav_li">排行榜</li>
          </router-link>
          <router-link to="/tabRanking">
            <li class="musicLabelNav_li">商城</li>
          </router-link>
          <router-link to="/tabRanking">
            <li class="musicLabelNav_li">歌单</li>
          </router-link>
          <router-link to="/tabRanking">
            <li class="musicLabelNav_li">MV</li>
          </router-link>
        </ul>   
      </div>
      <div>
      <el-drawer
        :visible.sync="drawer"
        direction="ltr"
        :withHeader="false">
        <el-collapse v-model="activeName" accordion>
          <div class="avatImg">
            <el-row>
              <el-col :span="24">
                <div>
                  <el-avatar :size="70" style="cursor: pointer" />
                </div>
                <div>
                  <span>{{ userName }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-collapse-item title="修改资料" name="1">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="查询账单" name="2">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="客服查询" name="3">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-drawer>

      <el-dialog class="dialog" title="日常反馈" :visible.sync="dayFeed">
        <div class="feedTab">
          <span>如果对本站有什么意见或者问题,请送往</span>
          <p>邮箱:965388169@qq.com</p> 
        </div>
        <div slot="footer" class="dialog-footer">
          初识网
        </div>
      </el-dialog>

      <el-dialog class="dialog" title="投资合作" :visible.sync="cperAtion">
        <div class="feedTab">
          <p>有意者请点击联系qq客服进行交谈</p>
        </div>
        <div slot="footer" class="dialog-footer">
          初识网
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabelShop',
  data() {
    return {
      activeName: '1',
      userName:"请登录...",
      dateTab:"现在时间为...",
      songName:"",
      placeholder:"",
      musicOffice:"",
      headIndex:0,
      musitPage:true,
      dayFeed:false,
      labelNav:false,
      drawer: false,
      cperAtion:false,
      musicPage:false,
      headerNavBanner:[
        {name:"格局网"},
        {name:"听歌网"},
        {name:"聊天室"}
      ],
    }
  },
  created() {
    if (this.$route.path == "/") {
      this.musitPage = false
    }else{
      this.musicPage = true
    }
    if(this.$route.name == "tabMusic") {
      this.musicOffice = "color:rgb(71, 179, 250)"
    }
    setInterval(() => {
      var myDateDay = new Date();
      var myDateDay_getHours = myDateDay.getHours(); //时
      var myDateDay_getMinutes = myDateDay.getMinutes();//分
      var myDateDay_getSeconds = myDateDay.getSeconds();//秒
      var Hours = myDateDay.getHours();
      var Minutes = myDateDay.getMinutes();
      var Seconds = myDateDay.getSeconds();
      if(myDateDay_getHours < 10) {
        Hours = "0" + myDateDay_getHours;
      }
      if(myDateDay_getMinutes < 10) {
        Minutes = "0" + myDateDay_getMinutes;
      }
      if(myDateDay_getSeconds < 10) {
        Seconds = "0" + myDateDay_getSeconds;
      }
      this.dateTab = Hours + ":" + Minutes + ":" + Seconds;
    },1000)

    //初始化热门列表
    this.axios({method:'get',url:'/nofocus'})
    .then(res => {
      if(res.data.data.length != null || res.data.data.length != "" || res.data.data.length != undefined){
        return null;
      }
      this.placeholder = res.data.data[this.handIndex].keyword;
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

  },
  mounted(){

  },
  methods: {
    handQuery() {
      var QQ = "859749101" //死数据
      window.location.href = 'tencent://message/?uin='+ QQ + '&Site=初识&Menu=yes'
    },
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
          return
        }
      }else{
        //判断是否为自身 否传参数切数据
        if (this.songName != this.$route.query.keyword) {
          this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.songName }})
        }
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
          return
        }
      }else{
        //判断是否为自身 否传参数切数据
        if (this.songName != this.$route.query.keyword) {
            this.$router.push({path:"/musicData",query:{ searchType:this.searchType,keyword:this.songName }})
        }
      }
      }
    }
    
  }
}
</script> 
<style scoped>

 a {
   color: white;
 }

  .header {
    background-color: rgb(163, 205, 253);
    line-height: 60px;
    position: relative;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .avatImg {
    line-height: 30px;
  }

  .samp-tab1 {
    padding-right:4px; 
    padding-left:4px; 
    border-right: rgb(168, 167, 167) 1px solid;
  } 

  samp[class*="tab"] {
    cursor: pointer;
  }

  .samp-tab1:hover {
    color: rgb(71, 179, 250);
    
  }
  
  .samp-tab1-2:hover {
    color: rgb(71, 179, 250);
  }

  .a-tab1-2:hover {
    color: rgb(71, 179, 250);
  }

  .a-tab1-2 {
    padding-right:4px; 
    padding-left:4px;
    text-decoration: none;
    color: #000;
  }

  .feedTab {
    white-space: pre-line;
    text-align: center;
  }

  ul li {
    float: left;
    list-style: none;
  }

  .labelNav {
    display: flex;
    left: 0;
    top: 0;
    position: absolute;
  }

  .header .navmoTone {
    position: absolute;
    right: 0;
    top: 0;
  }

  .header .dateTab {
    display: flex;
    justify-content: center;
  }

  .labelHeader {
    min-width: 900px;
    background-color: rgb(84, 92, 100);
    position: relative;
  }

  .labelHeader .musicLabelNav {
    width: 900px;
    display: flex;
    margin: 0 auto;
    color: white;
    line-height: 60px;
  }

  .musicLabelNav .musicLabelNav_li {
    padding-left:50px; 
    padding-right:50px; 
    cursor: pointer;
  }

  .musicLabelNav .musicLabelNav_li:hover {
    background-color: #409EFF;
  }

  .boxTab {
    display: flex;
    margin:auto 50px;
  }

  .labelNav input {
    min-width: 200px;
    height: 40px;
    border-top: 1px rgba(163, 162, 162, 0.836) ridge;
    border-left: 1px rgba(163, 162, 162, 0.836) ridge;
    border-bottom: 1px rgba(163, 162, 162, 0.836) ridge;
    border-right: none;
    outline: none;
    font-size: 14px;
    font-family: "楷体";
    font-weight: 100;
    opacity: .8;
  }

  .labelNav .but {
    text-align: center;
    width: 3rem;
    line-height: 40px;
    height: 40px;
    border-top: 1px rgba(163, 162, 162, 0.836) ridge;
    border-right: 1px rgba(163, 162, 162, 0.836) ridge;
    border-bottom: 1px rgba(163, 162, 162, 0.836) ridge;
    border-left: none;
    background-color: white;
    cursor: pointer;
    opacity: .8;
  }

  .labelNav .but:hover {
    color:rgb(255, 193, 241);
  }


</style>