// 计算器实现代码
var $add=document.getElementById("add-btn");
var $minus=document.getElementById("minus-btn");
var $times=document.getElementById("times-btn");
var $divide=document.getElementById("divide-btn");
var $num1=document.getElementById("first-number");
var $num2=document.getElementById("second-number");
var $result=document.getElementById("result");
var $tranfer_result=document.getElementById("tranfer_result")
var $dec_number=document.getElementById("dec-number")
var $trans_btn=document.getElementById('trans-btn')
var res=0;
//检查是否输入数字类型
function checknum(value) {
            var Regx = /^[0-9]*$/;
            if (Regx.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };
$trans_btn.onclick=function(){
    if(!checknum($dec_number.value)) {console.log("please put the right number")}
    var result = ''
    var value =$dec_number.value
    while(!(value===0)){
        result= (value%2).toString()+result
        value=(value)/2
        value=parseInt(value)
    }
    $tranfer_result.innerHTML=result
}
$add.onclick=function(){
  if(checknum($num1.value)&& checknum($num2.value)){
	res=parseFloat($num1.value)+parseFloat($num2.value);
    $result.innerHTML=res;
  }else {
}
}
$minus.onclick=function(){
	res=parseFloat($num1.value)-parseFloat($num2.value);
	$result.innerHTML=res;
}
$times.onclick=function(){
	res=parseFloat($num1.value)*parseFloat($num2.value);
	$result.innerHTML=res;
}
$divide.onclick=function(){
    if($num2.value === '0') {
        console.log(" can not input the zero")
    } else {
	res=parseInt($num1.value)/parseFloat($num2.value);
    $result.innerHTML=res;
    }
}
