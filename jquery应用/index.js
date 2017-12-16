
;(function  () {
	'use strict';
	//定义变量
	var $form_add_task=$('.add-task'),
	task_list={},
	$delail_task,
	$delete_task,
	$task_detail=$('.task-detail'),
	$task_detail_masks=$('.task-detail-mask'),
	current_index,
	$upate_form,
	$task_detail_content,
	$task_detail_content_input,
	$checkbox_complete,
	$msg=$('.msg'),
	$msg_content=$msg.find('.msg-content'),
	$msg_confirm=$msg.find('.confirmed'),
	$alerter=$('.alerter'),
	$body=$('body'),
	$window=$(window)
	;
	init();
	
	//click mask事件
	$task_detail_masks.on('click',hidden_task_detail);
    /*submit事件*/
	$form_add_task.on('submit',function(e){
		var new_task={};
		e.preventDefault();/*禁用default*/
		var $input=$(this).find('input[name=content]');
		new_task.content = $input.val();
		if(!new_task.content) return;
		/*存放Task*/
		if(add_task(new_task)){
			$input.val(null);
		}
	})
	function pop(arg){
		if(!arg){
			console.error('error');
		}
		var conf={},$box,$mask,$title,$content,$confirm,$cancel,dfd,
		confirmed,timer;
		
		if(typeof arg=='string')
			conf.title=arg;
		else {
			conf=$.extend(conf,arg);
		}
		dfd=$.Deferred();
		function adjust_box_position(){
			var window_width=$window.width(),
				window_height=$window.height(),
				box_width=$box.width(),
				box_height=$box.height(),
				move_x,
				move_y
				;
				move_x=(window_width-box_width)/2;
				move_y=((window_height-box_height)/2)-30;
				$box.css({
					left:move_x,
					top:move_y,
				})
		}
		function dismiss_pop(){
			$mask.remove();
			$box.remove();
		}

		$box=$('<div>'+'<div class="pop-title">'+conf.title+'</div>'+
				'<div class="pop-content">'+
				'<div><button style="margin-right:5px;" class="primary confirm">确定</button>'+
				'<button class="cancel">取消</button></div>'+
				'</div>'+
			'</div>').css({
			width:300,
			height:200,
			background: '#fff',
			position:'fixed',
			'border-radius':3,
			'box-shadow':'0 1px 2px rgba(0,0,0,.3)',
			color:'#444'

		})
		$mask=$('<div></div>').css({
			position:'fixed',
			background:'rgba(0,0,0,0.4)',
			top:0,
			bottom:0,
			left :0,
			right :0,

		})


		$title=$box.find('.pop-title').css({
			padding:'5px 10px',
			'font-weight':900,
			'font-size':20,
			'text-align':'center'

		})
		$content =$box.find('.pop-content').css({
			padding:'5px 10px',
			'text-align':'center'
		})
		$confirm=$content.find('button.confirm');
		$cancel=$content.find('button.cancel');
		timer=setInterval(function(){
			if(confirmed!==undefined){
				dfd.resolve(confirmed);
				clearInterval(timer);
				dismiss_pop();

		}
				
		},50)
		
		$confirm.on('click',function(){
			confirmed=true;
		})
		$cancel.on('click',function(){
			confirmed=false;
		})
		$mask.on('click',function(){
			confirmed=false;

		})
		$window.on('resize',function(){
			adjust_box_position();
		})
		
		$mask.appendTo($body);
		$box.appendTo($mask);
		$window.resize();
		return dfd.promise();
		
	}


	function listen_msg_event(){
		$msg_confirm.on('click',function(){
			hide_msg();
		})
	}
	/*delete事件*/
	function list_task_delete(){
	$delete_task.on('click',function(){
		var $this=$(this);
		var $item=$this.parent().parent();
		var index=$item.data('index');
		pop("Are you sure?").then(function(r){
			r? delete_task(index):null;
		    
	     })



	    })
        }
    //click详情事件
    function listion_task_detail(){

   		var index;
    	$('.task-item').on('dblclick',function(){
    		 index=$(this).data('index');
    		show_task_detail(index);


    	})

    	$delail_task.on('click',function(){
    		var $this=$(this);
    		var $item=$this.parent().parent();
    		 index=$item.data('index');
    		show_task_detail(index);
    	})

    }
    function listen_checkbox_complete(){
     	$checkbox_complete.on('click',function(){
     	var $this=$(this);
     	var index=$this.parent().parent().data('index');
     	 var item=store.get('task_list')[index];
     	 if(item.complete){
     	   upate_task(index,{complete:false});
		}
		else{
			upate_task(index,{complete:true});
		}
     	})
     }
	 

    //查看Task详情
    function show_task_detail(index){
    	render_task_detail(index);
    	current_index=index;
    	$task_detail.show();
    	$task_detail_masks.show();
    }
    //更新详情
    function upate_task(index,data){
    	if(!index||!task_list[index])
    		return;
    	task_list[index]=$.extend({},task_list[index],data);
    	refresh_task_list();
    }

    //渲染详情的html界面
    function render_task_detail(index){
    	if(index===undefined||!task_list[index])
    		return;
    	var item=task_list[index];
    	var tpl='<form>'+
			'<div class="content">'+
			item.content+
			'</div>'+
			'<div><input style="display:none"  type="text" name="content" value="'+item.content+'"></div>'+
			'<div>'+
			'<div class="desc">'+
			'<textarea name="desc" >'+(item.desc||'')+'</textarea>'+
			'</div>'+
		    '</div>'+
		    '<div class="remind">'+'<label>提醒时间</label>'+
			'<input class="datetime" type="text" value="'+(item.remain_data||"")+'" name="remind_date">'+
		    '</div>'+
		    '<div><button type="submit">更新</button></div>'+
		    '</form>';
		    $task_detail.html(null);
		    $task_detail.html(tpl);
		    $(".datetime").datetimepicker();
		    $upate_form=$task_detail.find('form');
		    $task_detail_content=$upate_form.find('.content');
		    $task_detail_content_input=$upate_form.find('[name=content]');
		    $task_detail_content.on('dblclick',function(){
		    	$task_detail_content_input.show();
		    	$task_detail_content.hide();
		    })
		    $upate_form.on('submit',function(e){
		    	e.preventDefault();
		    	var data={};
		    	data.content = $(this).find('[name=content]').val();
		    	data.desc=$(this).find('[name=desc]').val();
		    	data.remain_data=$(this).find('[name=remind_date]').val();
		    	upate_task(index,data);
		    	hidden_task_detail();

		    })

    }
    function hidden_task_detail(){
    	$task_detail.hide();
    	$task_detail_masks.hide();
    }
	function add_task(new_task){
			/*将taskpush入task_list*/
			task_list.push(new_task);
			refresh_task_list();
			return true;
		}
		/*保存数据在store并渲染html*/
	function refresh_task_list(){
			store.set('task_list',task_list);
			render_task_list();

		}
	function delete_task(index){
			if(!index===undefined||!task_list[index]) return;
			delete task_list[index];
			refresh_task_list();
		}
	function init(){
			
			task_list=store.get('task_list')||[];
			listen_msg_event();
			if(task_list.length)
			render_task_list();
			task_remind_check();
		}
	function task_remind_check(){
		var current_timestamp;
		var itl =setInterval(function(){
			for(var i=0;i<task_list.length;i++){
			var item =task_list[i],task_timestamp;
			if(!item || !item.remain_data || item.informed)
				continue;
			current_timestamp = (new Date()).getTime();
			//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数
			task_timestamp=(new Date(item.remain_data)).getTime();
			if(current_timestamp-task_timestamp>=1){
				upate_task(i,{informed:true});
				show_msg(item.content);
			}
			}
		},300);

	}

	function show_msg(msg){
		if(!msg) return;
		$msg_content.html(msg);
		$alerter.get(0).play();
		$msg.show();
	}
	function hide_msg(msg){
		$msg.hide();
	}

       /*渲染html*/
    function render_task_list(){
       	var $task_list=$('.task-list');
       	$task_list.html('');
       	var complete_items=[];
       
       	for(var i=0;i<task_list.length;i++){
       			var item=task_list[i];
       		if(item&&item.complete)
			complete_items[i]=item;
			else
       		var $task=render_task_tpl(task_list[i],i);
       		$task_list.prepend($task);
       	}
       	for(var j=0;j<complete_items.length;j++){
       	     $task=render_task_tpl(complete_items[j],j);
       		 if(!$task) continue;
       		 $task.addClass("completed");
       		 $task_list.append($task);
       	}

       		$delete_task=$('.action.delete');/*获取delete类*/
       		$delail_task=$('.action.detail');
       		$checkbox_complete=$('.complete');
       		list_task_delete();/*删除事件*/
       		listion_task_detail();
       		listen_checkbox_complete();
       }
       /*渲染html*/
    function render_task_tpl(data,index){
       	if(!data||!index) return;
       	var list_item_tpl=
	       '<div class="task-item" data-index="'+ index+'">'+
	       '<span><input class="complete"'+(data.complete ? 'checked':'')+' type="checkbox"></span>'+
	       '<span class="task-content">'+data.content+'</span>'+
	           '<span class="fc">'+
	          '<span class="action delete">删除 </span>'+
	        '<span class="action detail"> 详细 </span>'+
	       '<span>'+
	        '</div>'
	return $(list_item_tpl);
       }
   
})();
