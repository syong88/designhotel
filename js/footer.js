$(function(){
	var t = false;  //0 == false
		
		setTimeout(sitematFormatFn,100);

		//화면 너비가 1100초과하면 모든 사이트맵 메인버튼, 서브메뉴가, 아이콘 초기화 slideDown
		function sitematFormatFn(){
			//언제? 1100초과이면 서브메뉴가 펼쳐진 모양
			if( $(window).innerWidth() > 1100 ){
				$('.mapSub').stop().slideDown(0);
				t = false;
			}
			else{ //언제? 1100이하이면 서브메뉴가 접힌 모양
				if( t === false ){
					t = true;  // 1 == true
					$('.mapNavBt').removeClass('addFoot');
					$('.mapSub').stop().slideUp(0);
				}
			}
		}
		
		$(window).resize(function(){			
			sitematFormatFn();
		});
		
	
		//사이트맵 메뉴버튼 클릭 이벤트
		$('.mapNavBt').each(function(index){
			$(this).on({
				click:	function(){
					
					//사이트맵 서브메뉴 초기화 및 이벤트
					$('.mapSub').stop().slideUp(500,'easeOutExpo');
					$(this).next().stop().slideToggle(500,'easeOutExpo');			
		
					$(this).toggleClass('addFoot');  		//Bug(버그) 클릭된 자신의 버튼을 삭제를 못한다.
					
					for(i=0; i<$('.mapNavBt').length; i++){
						if( i != index ){  //현재 클릭된 자신은 제외하고 삭제 알고지즘
							if( $('.mapNavBt').eq(i).hasClass('addFoot')){  //true
								$('.mapNavBt').eq(i).removeClass('addFoot');
							}
						}
					}
				}
			});
		});
		

});//header.js







