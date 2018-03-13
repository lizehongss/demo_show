$(function(){
    nie.config.copyRight.setWhite();
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
            content:shareTxt
        });
    });
});
