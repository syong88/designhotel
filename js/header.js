$(function(){
	var t = winW = vidW = 0;

		windowResizeFn();
		setTimeout(windowResizeFn, 100);
	
	
		//appbarBt 앱바버튼 클릭이벤트
		//앱바 메뉴바는 우측으로 left:100%; 이동
		//앱메뉴 박스 전체가 좌측에서 left:-100% ~ left:0 으로 이동
		$('.appbarBt').on({
			click:	 function(){
				$('.header-mobile-menu-bar').stop().animate({left:100+'%'},500,'easeInOutExpo');
				$('.mobile-modal-menu').stop().animate({left:0+'%'},500,'easeInOutExpo');
			}
		});
		
		//앱바 닫기 버튼 이벤트
		$('.appbarCloseBt').on({
			click:	 function(){
				$('.header-mobile-menu-bar').stop().animate({left:0+'%'},500,'easeInOutExpo');
				$('.mobile-modal-menu').stop().animate({left:-100+'%'},500,'easeInOutExpo');
			}
		});

		
		$(window).resize(function(){
			windowResizeFn(); //모달과 모방일메뉴
		});
		
		
		function windowResizeFn(){
			//헤더를 고정(fixed)으로 [모바일 메뉴바]
			if( $(window).innerWidth()<=1100 ){
				$('#header').addClass('addFixed');
				$('.footer-sitemap>ul>li>a').addClass('addMobile');
			}
			else{
				$('#header').removeClass('addFixed');
				$('.footer-sitemap>ul>li>a').removeClass('addMobile');
			}
			
			//화면너비가 1090초과하면 초기화 모달, 메뉴바 모두
			if( $(window).innerWidth()>1100 ){
				if(t==0){
					t=1;
					$('.appbarCloseBt').trigger('click');	
				}
			}
			else{
				t=0;
			}
		}		

});//header.js







