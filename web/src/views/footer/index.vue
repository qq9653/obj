<template>
  <div class="footer">
    <p v-for="(item,index) in writingList" :key="index"> {{ item }} </p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      writingList:[],
      aboutWriting:[
        "个人呢,很喜欢听音乐,这是个人爱好,但并不妨碍你成长路上的坎坷。",
        "你小时候的梦想可不是你现在的梦想啊。",
        "我要给未来对象的妈一个差评，发货太慢，到现在还没收到人儿。",
        "这乱七八糟的生活还会好吗",
        "偶尔也想用眼泪证明一下我没那么坚强",
        "渐渐喜欢上了现在的生活 没有惊喜 也没有意外啊",
        "有时候我害怕自己不够我爸那样伟大",
        "生活不算太糟糕，一半坚强一般高",
        "如果你想了解站主，想和站主一起生活，我想你还是算了吧，他自己都过的乱七八糟",
        "孤独成瘾，而你孤独成精",
        "悄悄告诉你,我不是哑巴 我爱你 I LOVE YOU 我也会说哦",
        "现在这个年纪不应该说I like you 而不是 I love you",
        "陪伴是最长情的告白",
        "满载而归的是对家的思念",
        "努力和不努力只有一个字之差,但你要努力就得经得起考验了。",
        "希望现在是你，未来也是你",
        "十几岁的爱情可能走不了多久但至少惊艳了整个青春",
        "到底热爱到什么程度才敢错过千万次都想从来",
        "短短几分钟的歌曲我却循环了一晚上...",
        "千万要对一个女孩子好,因为女孩子都好可爱",
        "希望所有烦恼都离屏幕前的这个小笨蛋远一点。",
        "你讨厌父亲的平庸,却不知道他曾经也是怀揣梦想的少年",
        "你嫌弃母亲的唠叨,却不记得她也曾是对镜子贴花的姑娘",
        "温柔扑了空才会长记性",
        "听说某些小笨蛋会在晚上躲在被窝里偷偷抹眼泪",
        "连崩溃都考虑后果的人,该说他/她懂事还是无能为力",
        "春天总会来的,尽管冬夜漫长",
        "这世界欠你的温柔,春天会还给你",
        "开始慢慢懂爱情,却开始害怕听情歌",
        "人啊一矫情起来听什么都像是在唱自己",
        "不明不白的开始,不明不白的结束",
        "走不到的路就不走了吧 爱不到的人就不爱了吧",
        "跟你拥抱的时候竟然会脸红心跳",
        "牵着你手的时候生怕把你弄丢了",
        "我总是依靠细枝末节来拼凑你爱我的可能",
        "一个人啊有多不正经,就有多少委屈",
        "我长大了,你呢",
        "他可能一点都不喜欢装傻的自己",
        "奔向你的时候途径的一切事物都觉得很可爱",
        "我还是以往如前,图个四块五的妞~嘻嘻",
        "君有所向,一往无前",
        "相信自己,不是颓废,不是垃圾,你就是你,与众不同的逆风亚索",
        "你，缺乏想象力,此刻，大幕渐起,我为你，精心筹备,将你杀死，便又是我的一部杰作了。",
        "错失彼此的爱情故事，总是无比迷人。",
      ],
    }
  },
  mounted(){
    var index = 5; //循环次数
    // for(var i = 0; i < index;i++){
    //   var num= [Math.floor(Math.random()*this.aboutWriting.length)];   //取总数量的随机数
    //   // this.writingList.push(this.aboutWriting[num]);             //加入抽取随机数进去
    //   console.log(num.every)
    // }
    var arr=this.aboutWriting;
    this.writingList =new Array();
    for (var i=0;i< index;i++){ 
      var num=Math.floor(Math.random()*this.aboutWriting.length); 
      this.writingList.push(arr[num]);
      arr.splice(num,1);      //删除重复
    }
  }
}
</script>

<style scoped>
  .footer {
    min-width: 900px;
    background-color: rgb(111, 111, 114);
    bottom: 0;
    text-align: center;
    color: rgb(255, 254, 254);
    line-height: 30px;
  }
</style>