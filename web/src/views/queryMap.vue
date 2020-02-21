<template>
    <div class="content">
      <div class="map-posi">
        <div class="box-querymetro">
          <div class="querymap">
            <samp><b style="color:white"> {{ city + "地铁" }}</b></samp>
          </div>
          <div id="container"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      center: {lng:116.404, lat: 39.915},
      zoom: 15,
      posit:"",
      metro:"",
      city:"",
      showMetro:false,
    }
  },
    mounted(){

    var subwayCityName = "广州";
    var list = BMapSub.SubwayCitiesList;
    var subwaycity = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === subwayCityName) {
        subwaycity = list[i];
        break;
      }
    }
    var subway = new BMapSub.Subway('container', subwaycity.citycode); //初始化地图
    this.city = subwayCityName;
    subway.setZoom(0.5);
    subway.setCenter("珠江新城");//设置为中心
    var zoomControl = new BMapSub.ZoomControl({
      anchor:BMAPSUB_ANCHOR_BOTTOM_RIGHT,
      offset: new BMapSub.Size(10,100)
    })
   subway.addControl(zoomControl)
    var infowindow = new BMapSub.InfoWindow(
        '<div id="bd-subwayInfo">'
        + '<div id="bd-subwayTitle">'
        + '公司所在目的地'
        + '</div>'
        + '</div>'
    );
    subway.openInfoWindow(infowindow, '珠江新城');
    subway.setCenter('珠江新城');
    subway.setZoom(0.5);
    var endIcon = new BMapSub.Icon(
      'https://api.map.baidu.com/images/subway/end-bak.png',
      new BMapSub.Size(120, 150)
    );
    var marker = new BMapSub.Marker('珠江新城', {icon: endIcon});
    subway.addMarker(marker);
    subway.setCenter("珠江新城");
    subway.setZoom(0.5);      
  },
  methods:{





    /* 键盘事件 */
  }
}
</script>
<style scoped>

  .content {
    width: 416px;
    margin: 0 40px;
    position: relative;
  }

  .content .map-posi {
    width: 400px;
    border: 8px rgb(117, 138, 158) solid;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .map-posi .querymap {
    line-height: 60px;
    background-color: rgb(117, 138, 158);
  }

  .querymap input {
    width: 300px;
    height: 40px;
    font-size: 15px;
  }

  .querymap span {
    background-color: rgb(134, 207, 255);
  }

  #container {
    width: 100%;
    height: 300px;

  }

</style> 