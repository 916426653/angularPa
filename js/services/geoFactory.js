/**
 * 取得实际位置
 * 调用方式：geoFactory.getGeo();
 */
define(['jquery','app'], function ($,app) {

    app.factory('geoFactory', ['$http','$q', function($http,$q) {
       
       function getGeo(){

                var def = $q.defer();

                var options = {
                    /**
                     *是否返回更详细更准确的结构，默认为false不启用
                     * */
                      enableHighAccuracy: true,
                }
           /**
            * 获得地理定位
            navigator.geolocation.getCurrentPosition(
            successCallback, [errorCallback] , [positionOptions]);
            successCallback 获取定位成功时执行的回调函数
            errorCallback 定位失败时执行的回调函数
            positionOptions 用来设置positionOptions来更精细的执行定位
            * */
                navigator.geolocation.getCurrentPosition(function(position){
                    //返回一个地理数据对象position作为参数
                    //timestamp和coords。timestamp表示该地理数据创建时间（时间戳）；
                    // coords包括另外七个属性：
                    /**
                     *  1. coords.latitude：估计纬度
                     　　2. coords.longitude：估计经度
                     　　3. coords.altitude：估计高度
                     　　4. coords.accuracy：所提供的以米为单位的经度和纬度估计的精确度
                     　　5. coords.altitudeAccuracy：所提供的以米为单位的高度估计的精确度
                     　　6. coords.heading： 宿主设备当前移动的角度方向，相对于正北方向顺时针计算
                     　　7. coords.speed：以米每秒为单位的设备的当前对地速度
                     * */
                  var pc = position.coords,
                      lat = pc.latitude,
                      lng = pc.longitude;

                  $http.jsonp('http://api.map.baidu.com/geoconv/v1/?coords='+lng+','+lat+'&from=1&to=5&ak=A226e59f9ee3bbbe0fcc35878b45787b&callback=JSON_CALLBACK').success(
                       function(data){
                           $http.jsonp('http://api.map.baidu.com/geocoder/v2/?ak=A226e59f9ee3bbbe0fcc35878b45787b&callback=?&location='+data.result[0].y+','+data.result[0].x+'&output=json&pois=0&callback=JSON_CALLBACK').success(function(result) {
                                  def.resolve(result);
                             })
                       }     
                  )
                  },function(error){
                  switch(error.code)
                  {
                  case error.PERMISSION_DENIED:
                    alert("请打开定位功能！")
                    break;
                  case error.POSITION_UNAVAILABLE:
                    alert("不支持定位服务！")
                    break;
                  case error.TIMEOUT:
                    alert("请求超时！")
                    break;
                  case error.UNKNOWN_ERROR:
                    alert("未知异常！")
                    break;
                  }
                },options)

              return def.promise;
       }
      

      return {

        getGeo : getGeo

      }

  }])

})
