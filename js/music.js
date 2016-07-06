$(function(){
	var audio=$('#audio').get(0);
	var $audio=$('#audio');

	//播放暂停
	$('.start').on('click',function(){
		if(audio.paused){
			audio.play();
		}else{
			audio.pause();
		}
	})
	$audio.on('play',function(){
		$('.start').addClass('stop');
	})
	$audio.on('pause',function(){
		$('.stop').removeClass('stop');
	})
	//静音键
	$('.voice-icon').on('click',function(){
		if(! $(this).attr('voice')){
			$(this).attr('voice',audio.volume);
			audio.volume=0;
		}else{
			audio.volume=$(this).attr('voice');
			$(this).removeAttr('voice');
		}	
	})
	//音量调节
	var voice=$('.voice-size');
	voice.on('click',function(e){
		audio.volume=e.offsetX/$(this).width();
	})
	$audio.on('volumechange',function(){
		var w=audio.volume*$('.voice-size').width();
		$('.voice-bar').width(w);
		$('.voice-op').css({left:w});
		if(audio.volume===0){
			$('.voice-bar').width(0);
			$('voice-op').css({left:0});
			$('.voice-icon').addClass('voice-none');
		}else{
			$('.voice-icon').removeClass('voice-none');
		}
	})
	$('.voice-op').on('click',function(e){
		e.stopPropagation();
	})
	//拖拽音量
	$('.voice-op').on('mousedown',function(e){
		e.stopPropagation();
		$(this).closest('.voice-size').addClass('moving');
		$(document).on('mousemove',function(e){
			var w=e.pageX -$('.voice-size').offset().left;
			var v=left/$('.voice-size').width();
			v=(v>1)?1:v;
			v=(v<0)?0:v;
			audio.volume=v;
		})
	})
})