

function addLoadEvent(func) {
    var oldonload =window.onload;
    if(typeof window.onload!='function'){
        window.onload =func;
    }
    else {
        window.onload=function () {
            oldonload();
            func();
            
        }
        
    }
    
}/**
 * Created by as on 2016/11/20.
 */
