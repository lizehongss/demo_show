$(function(){
    nie.config.copyRight.setWhite();
    var tc = $(".tc");
    var tcLength= tc.length;
    var share = null;
    var shareUrl = $("#share_url").html();
    var sharePic = $("#share_pic").attr("data-src");
    var shareTxt = $("#share_desc").html();
    var shareTitle = $("#share_title").html();
    nie.define(function(){
        var share = nie.require("nie.util.shareV5");
        share({
            fat:"#icon",
            type:1,
            defShow:[23,22,2,1,4,3],
            title:shareTitle,
            //url:shareUrl,
            img:sharePic,
            content:shareTxt,
            product:"产品号"
        });
    });

    var area = $("#links").find("area");
    area.mouseover(function(){
        var index = $(this).index();
        $(".btn").find("a").eq(index).addClass("hover");
    });
    area.mouseout(function(){
        var index = $(this).index();
        $(".btn").find("a").eq(index).removeClass("hover");
    });
    $(".close").click(function(){
        $(this).closest(".tc").fadeOut();
        $(".tc-bg").hide();
    });
    area.click(function(){
        var index = $(this).index();
        $(".tc-bg").height($(document).height()).show();
        tc.eq(index).fadeIn();
        $(window).trigger("resize");//触发resize事件
    });
    $(".nav-left").click(function(){
        var index = $(this).closest(".tc").index();
        var left =((index-1)<0?tcLength-1:index-1)%tcLength;
        tc.eq(index).fadeOut();
        tc.eq(left).fadeIn();
    });
    $(".nav-right").click(function(){
        var index = $(this).closest(".tc").index();
        var right = (index+1)%tcLength;
        tc.eq(index).fadeOut();
        tc.eq(right).fadeIn();
    });

    $(window).resize(function(){
        var e = $('.tc');
        var bigHeight = $(window).outerHeight();
        var bigWidth = $(window).outerWidth();
        var tcHeight = e.outerHeight();
        var tcWidth = e.outerWidth();
        var halfHeightSpace = (bigHeight-tcHeight)/2;
        var halfWidthSpace = (bigWidth-tcWidth)/2;
        e.css("top",halfHeightSpace);
        e.css("left",halfWidthSpace);
    });
    $('a').focus(function(){$(this).blur()});
    area.click(function(){$(this).blur()});
    $(".cont").mCustomScrollbar({
        scrollButtons:{
            enable:true
        }
    });
});
