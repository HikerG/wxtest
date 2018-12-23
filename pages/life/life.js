// pages/life/life.js
Page({
  data: {},
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    that.getLocation();
  },

  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },

  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "lDPmwz4UvHMDwztVFH0b0dygkoNtNKGb",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;

        that.setData({
          city: city,
          district: district,
          street: street,
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //获取天气信息
  getWeahter: function (city) {
    var that = this
    var url = "https://free-api.heweather.com/v5/weather"
    var params = {
      city: city,
      key: "894fc2a749104d679fa022c3e71afe83"
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var air = res.data.HeWeather5[0].suggestion.air.txt;
        var comf = res.data.HeWeather5[0].suggestion.comf.txt;
        var cw = res.data.HeWeather5[0].suggestion.cw.txt;
        var drsg = res.data.HeWeather5[0].suggestion.drsg.txt;
        var flu = res.data.HeWeather5[0].suggestion.flu.txt;
        var sport = res.data.HeWeather5[0].suggestion.sport.txt;
        var trav = res.data.HeWeather5[0].suggestion.trav.txt;
        var uv = res.data.HeWeather5[0].suggestion.uv.txt;
        that.setData({
          air: air,
          comf: comf,
          cw: cw,
          drsg: drsg,
          flu: flu,
          sport: sport,
          trav: trav,
          uv: uv
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})