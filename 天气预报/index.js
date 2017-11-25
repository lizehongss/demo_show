/**
 * Created by as on 2017/5/19.
 */
$(function () {
    $.ajax({
        type:"GET",
        url:"http://wthrcdn.etouch.cn/weather_mini?city=北京",
        dataType: "json",
        success: function (data) {
           var w =data.data.city;
            var rh=data.data.ganmao;
            var wd=data.data.forecast[0].high;
            var tmp=data.data.forecast[0].type;


          $(".w").text("城市:"+w);
           $(".rh").text(rh);
           $(".wd").text(wd);
            $(".tmp").text(tmp);

        },
        error: function () {
            alert("error");
        }


    })



})
