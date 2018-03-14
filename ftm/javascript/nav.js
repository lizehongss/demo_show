$(
	function () {

			$("#inputSearch").focus(function(){
				$(this).addClass("focus");
				if($(this).val()==this.defaultValue){
					$(this).val("");

				}

			}).blur(function(){
				$(this).removeClass("focus");
				if($(this).val()==''){
					$(this).val(this.defaultValue);

				}
			}).keyup(function(e){
				if(e.which==13){
					alert('ok');
				}
			})

			$("#nav_show > li ").hover(function(){
				//alert("this is ok");
			$(this).find("div").show();
			},function(){
				//alert("this is hide")
				//$(this).next("div").hide();
				$(this).find("div").hide();
			});
		})