 function onscroll(){
    var oToTopLink = document.getElementById('totop');
    var oScrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var scrollX = document.documentElement.scrollLeft||document.body.scrollLeft;
    if(oScrollTop<150){
        oToTopLink.style.display = 'none';

    }
    else {
        oToTopLink.style.display = 'block';
    }
    oToTopLink.onclick = function(){
        window.scrollTo(scrollX,0);

    }
};
 addLoadEvent(onscroll);