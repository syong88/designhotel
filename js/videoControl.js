$(function(){
	var winH = $(window).innerHeight();  		//창의높이
	var winW = $(window).innerWidth();   		//창너비
	var vidH = $('#mainVideo').innerHeight();  	//비디오높이
	var vidW = $('#mainVideo').innerWidth();  	//비디오너비
	var videoPlay  = 'on';  					//기본은 켜진(on)상태
	var soundMuted = 'off';  					//기본은 꺼진(off)상태

		//비디오 자동 재생 제어 autoplay=true(자동재생함) , autoplay=false(자동재생안함)
		// $('#mainVideo').get(0).autoplay = false ;  //배경이나 포스터 보인다. 비디오는 안보인다.
		//$('#mainVideo').get(0).pause();     //비디오 중지 //비디오거 보이고 정지상태
		//$('#mainVideo').get(0).play();      //비디오 제생
		//$('#mainVideo').get(0).loop = 1 ;   //비디오 제생 loop=1 Repeat(연속재생)
		//$('#mainVideo').get(0).playbackRate = 1.3;  //1.3배속
		//$('#mainVideo').get(0).playbackRate = 2.5;  //2.5배속
		//$('#mainVideo').get(0).currentTime = 35; 		//실행위치를 끝으로 이동
		
		$('#mainVideo').get(0).autoplay = true ;  	//호환성 때문에 코딩
		$('#mainVideo').get(0).loop = false ;   		//비디오 제생 loop=0 Once(한번) 
		$('#mainVideo').get(0).playbackRate = true; 	//배속 기본 1배속 (0.1, 0.5, ... 1, 1.2, 1.4,  2, 3...)
		$('#mainVideo').get(0).muted = true; 		//소리끄기 켜기 false
		

		
		setInterval(videoResizeFn, 100);
	
		$(window).resize(function(){
			videoResizeFn();
		});
	
		function videoResizeFn(){
			winH = $(window).innerHeight();  		//969		
			winW = $(window).innerWidth();   				
			vidH = $('#mainVideo').innerHeight(); 	//1080	
			vidW = $('#mainVideo').innerWidth();  	
			
			//1. 비디오박스높이=창높이 : 기본으로 창높이로 설정 너비 100%		비디오 뷰박스(Video ViewBox) 	
			$('.section1-main-video').css({ width:100+'%', height: winH }); 
			
			//2. 비디오 가로크기와 세로크기를 비디오박스(창크기) 보다 작으면 비디오박스와 같거나 크게 설정한다.
			if( winH > vidH ){  //창높이보다 비디오높이가가 작으면
				$('#mainVideo').css({ width:'auto', height: winH })
			}
			
			if( winW > vidW ){ //창너비보다 비디오너비가 작으면
				$('#mainVideo').css({ width: winW, height: 'auto' })
			}	
			
			//3. (비디오높이-창높이)/2= -마진탑값   : 비디오 수직 가운데 정렬
			//   (비디오너비-창너비)/2= -마진레프트값 : 비디오 수평 가운데 정렬
			$('#mainVideo').css({marginTop: (winH-vidH)/2, marginLeft: (winW-vidW)/2 }); //-55.5=(969-1080)/2

			
		}
	
		//watchagainBt 가운데 둥근버튼 클릭 이벤트 재생
		$('.watchagainBt').on({
			click:	function(){
				videoPlay = 'on';
				$('#mainVideo').get(0).play(); //비디오 재생
				$('.playPuaseIconBt').find('img').attr('src','img/icon-player-pause.png');  // || 중지 이미지로 변경 됨
				$('.section1-watch-again').hide();  //가운데  둥근 아이콘이 숨김	
				$('.section1-next-section').hide();  //아래  다음 버튼  나타남									
			}
		});
	
	
		//videoPlay='on' || videoPlay='off' 비디오 제어 Toggle 버튼 (플레이(on)/일시정지(off)
		$('.playPuaseIconBt').on({
			click: function(){
				if( videoPlay === 'on' ){  //비디오가 켜진 상태라면
					//비디오를 끈다(off)
					videoPlay = 'off';
					$('#mainVideo').get(0).pause(); //비디오 일시정지
					//아이콘 이미지 변경 플레이 이미지 삼각형
					$(this).find('img').attr('src','img/icon-player-play.png'); //플레이 이미지로 변경 됨
				}
				else{
					videoPlay = 'on';
					$('#mainVideo').get(0).play(); //비디오 재생
					$(this).find('img').attr('src','img/icon-player-pause.png');  //중지 이미지로 변경 됨
					$('.section1-watch-again').hide();  //가운데  둥근 아이콘이 숨김					
					$('.section1-next-section').hide();  //아래  다음 버튼  나타남					
				}
			}
		});
		
		
		//soundMuted='on' || soundMuted='off' 사운드 토글 Toggle 버튼 켜기(on)/끄기(off) )
		$('.mutedIconBt').on({
			click: function(){
				if( soundMuted === 'off' ){
					soundMuted = 'on';
					$('#mainVideo').get(0).muted = false;  //소리 켜기
					$(this).find('i').attr('class','icon-oe icon-oe-player-volume'); //소리 켜진 아이콘으로 변경
				}
				else{
					soundMuted = 'off';
					$('#mainVideo').get(0).muted = true; 	//소리 끄기
					$(this).find('i').attr('class','icon-oe icon-oe-player-volume-no'); //소리 꺼진 아이콘으로 변경					
				}
				
				//Muted 확인
				// console.log( $('#mainVideo').get(0).muted );
			}
		});

		//비디오가 재생되는 순간 순간을 체크해야 하기에 타이머가 필요한다.
		//현재 진행중인 비디오길이(시간) 확인 currentTime 메소드  초단위 시간 
		//전체 비디오길이(시간) 확인       duration    메소드  초단위 시간 
		//비디오 정지를 확인             ended	      메소드  종료시 true 반환 재생시 false 반환
		
		//비디오가 정지되면 가운데 section1-watch-again 둥근 아이콘이 나타나고
		//비디오가 재생되면 가운데 section1-watch-again 둥근 아이콘이 감춰진다
		//비디오 재생 아이콘으로 이미지변경 삼각형 아이콘
		
		setId = setInterval(videoTimeCountFn,100);
		
		function videoTimeCountFn(){
			// console.log( '현재진행 비디오시간 : ' + $('#mainVideo').get(0).currentTime );
			// console.log( '전체 비디오 시간 길이 : ' +  $('#mainVideo').get(0).duration );  //37.44
			// console.log( '비디오 정지 여부 : ' + $('#mainVideo').get(0).ended	 );

			if(  $('#mainVideo').get(0).ended == true ){  //비디오가 정지되면			
			// if(  $('#mainVideo').get(0).currentTime == ($('#mainVideo').get(0).duration) ){  //비디오가 정지되면
				$('.section1-watch-again').show();  //가운데  둥근 아이콘이 나타남
				$('.section1-next-section').show();  //아래  다음 버튼  나타남
				// $('#mainVideo').get(0).currentTime = $('#mainVideo').get(0).duration; //				
				// $('#mainVideo').get(0).pause();

				//비디오 꺼진 상태임을 변수와 아이콘 변경
				videoPlay = 'off';
				$('.playPuaseIconBt').find('img').attr('src','img/icon-player-play.png');
				clearInterval( setId );
			}
		}
		
		
		//다음섹션
		$('.nextsectionBt').on({
			click:	function(){
				$('html,body').stop().animate({scrollTop: $('#section2').offset().top }, 600,'swing');
			}
		});
		
		
});//videoControl.js







