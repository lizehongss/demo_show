$(function(){
/*-----------侧栏导航-----------*/
$("#nav_index li").mousemove(function(){

	var index=$(this).index("#nav_index li");
	$(".hidden_nav").css("display","block");
		$($(".hidden_nav .hidden_navshow")[index]).css("display","block").
		siblings().css("display","none");


})
$("#nav_index").mouseleave(function(){
$(".hidden_nav").css("display","none");
})
/*----------轮播实现-------------*/
var $imgrolls=$("#img_lb div li");
$imgrolls.css("opacity","0.7");
var len =$imgrolls.length;
console.log(len);
var index =0;
var adTimer=null;
$("#img_lb div li").mouseover(function(){
	index = $("#img_lb div li").index(this);
	showImg(index);
}).eq(0).mouseover();

$("#img_lb").hover(function(){
	if(adTimer){
		clearInterval(adTimer);
	}
},
function(){
	adTimer=setInterval(function(){
		showImg(index);
		index++;
		console.log(index);
		if(index==len){
			index=0;
		}
	},2000);
}
).trigger("mouseleave");

function showImg(index){
	var $rollobj =$("#img_lb");
	var $rolllist =$rollobj.find("#lb_href img");
	var newhref=$rolllist.eq(index).attr("href");
	$("#lb_href").attr("href","newhref")
				.find("img").eq(index).stop(true,true).fadeIn()
				.siblings().fadeOut();
$("#img_lb div li").removeClass("chos").css("opacity","0.7")
		.eq(index).addClass("chos").css("opacity","1");
}


})