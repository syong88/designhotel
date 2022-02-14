jQuery(function(){
	var n = $('.section3-gallery-wrap>li').length-1;
	
	var All = [];	
	var Beach = [];	
	var City = [];	
	var Mountain = [];	
	var Alternative = [];	
	var Rejuvenate = [];
	var cnt = [-1,-1,-1,-1,-1,-1];
	
	var AllMore = [];	
	var BeachMore = [];	
	var CityMore = [];	
	var MountainMore = [];	
	var AlternativeMore = [];	
	var RejuvenateMore = [];
	var cntMore = [-1,-1,-1,-1,-1,-1];
	var more = [0,0,0,0,0,0]; 
		//각 메뉴 6개 해당하는 LoadMore버튼 클릭시 1로 설정
		//예] beach(index) 클릭시 more[1]=1, more=[0,1,0,0,0,0]				
		//예] city(index) 클릭시 more[2]=1,  more=[0,1,1,0,0,0]				
	//Resize Response변수
	var z = col = 0;
	var winW = $(window).innerWidth();
	var vidW = vidH = imgW = imgH = winW/3;
	
	//글상자
	var txtW = blankCol = arrLength = _fontSize = _paddingTop = 0;
	

	setTimeout(initFn,100); //Loading시 실행
	function initFn(){ //한번만수행
		mainGalleryFn();
		galleryResizeFn();
		txtBoxFn();
	}
	
	$(window).resize(function(){ //계속수행
		galleryResizeFn();
	});
	
	//글상자 1칸너비, 2칸너비 정하는것
	//탭메뉴버튼 클릭시 배열의 목록이 출력되면 빈칸이 생길수 있다. 1칸 2칸일 경우.
	//로드모어 버튼 클릭시 배열의 목록이 변경되면서 출력되는데 역시 칸수가 달라진다. 1칸 2칸
	//함수연동0 = 로드시 init()
	//함수연동1 = 반응형때문에 galleryResizeFn() 함수 내에 txtBoxFn() 텍스트 박스를 연동한다.
	//함수연동2 = 탭메뉴버튼
	//함수연동3 = 로드모아버튼
	
	//글상자 알고리즘
	//1. 백분율 너비(33.333% or 50% or 100%) = 100%/칸수
	//2. 빈칸수 = 칸수 - (배열길이 % 칸수)
	//3. 글상자(sign-wrap)의 너비 (백분율) = 빈칸수 * 백분율(33.333% or 50% or 100%)
	//4. 글상자의 높이(픽셀) = 비디오높이 or 이미지높이;
	//5. 폰트크기 선택자 .sign-wrap>div>a 폰트사이즈 = 비율*창너비 최소크기는 11픽셀
	//6. 패딩값  선택자 .sign-wrap>div>a>span 패딩초기화 그리고 패딩탑값 = (글상자의 높이(픽셀)- 폰트사이즈)/2
	////////////////////////////////////////////////////////////////////
	//문제점 너비를 백분율로 계산 = 창너비/칸수 -> 예] 100/3=33.333+'%'
	//빈칸을 찾아야 함 = 배열 항목값 배열.length % 칸수 예] 5 % 3 = 2 나머지를 칸수-나머지 = 1칸 빈칸
	
	function txtBoxFn(){

	
		// console.log('winW :'+ winW ); //체크 ok
		// console.log('col :'+ col ); //체크 ok
		// console.log('vidH :'+ vidH ); //체크 ok
		
		// console.log(All);
		// console.log(Beach);
		// console.log(City);
		// console.log(Mountain);
		// console.log(Alternative);
		// console.log(Rejuvenate);

		//1. 백분율
		txtW = 100/col;
		console.log('백분율 :'+ txtW );
		
		//2. 빈칸수
		if( z === 0 ){ //z = 탭메뉴버튼 인식하는 변수
			arrLength = All.length;
		}
		else if( z === 1 ){
			arrLength = Beach.length;
		}
		else if( z === 2 ){
			arrLength = City.length;
		}
		else if( z === 3 ){
			arrLength = Mountain.length;
		}
		else if( z === 4 ){
			arrLength = Alternative.length;
		}
		else if( z === 5 ){
			arrLength = Rejuvenate.length;
		}
		//console.log('빈칸 :'+ blankCol );
		
		if( arrLength % col != 0 ){ //나머지가 0이 아니면 col-(배열길이%col)
			blankCol = col - (arrLength % col);
		}
		else{
			blankCol = 0; //나머지가 0일때는 0셋팅
		}
		console.log('빈칸수 : '+blankCol); //체크 ok
		
		_fontSize = 0.015 * winW; //폰트사이즈
		_paddingTop = (imgH-_fontSize)/2; //패딩탑
		if( blankCol>0 ){ //빈칸(blankCol)이 0보다 클때만 글상자가 보인다
			$('.sign-wrap').show();
			$('.sign-wrap').css({width:(txtW*blankCol)+'%', height:imgH });
			
			$('.sign-wrap>div>a').css({fontSize:(_fontSize < 13)?13:_fontSize });
			$('.sign-wrap>div>a>span').css({paddingTop:_paddingTop});
		}
		else{ //빈칸이 없다면
			$('.sign-wrap').hide();
		}
	}
	
	
	function galleryResizeFn(){
		winW = $(window).innerWidth();
		
		if( winW>800 ){
			col=3;
		}
		else if( winW>500 ){
			col=2;
		}
		else{
			col=1;
		}
		vidW = vidH = imgW = imgH = winW/col;
		$('.section3-gallery-wrap video').css({width:vidW, height:vidH });
		$('.section3-gallery-wrap img').css({width:imgW, height:imgH });
		
		txtBoxFn();
		
	}
	
	
	//비디오 갤러리 필터링 반응형 제작 시작
	//모든 버튼의 종류의 목록은 배열처리한다.
	//갤러리 메인함수 - 데이터 목록(li.eq(index번호))을 배열값에 넣는다.
	//필터링 - 배열이 끝나면 - 기본 3행 4열을 출력한다.
	

	
	function mainGalleryFn(){
		
		for( i=0; i<n; i++ ){
			//var className = $('.section3-gallery-wrap>li').eq(i).data();
			//var className = $('.section3-gallery-wrap>li').eq(i).attr('class');
			
			if( !( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('more') >=0 ) ){
				//1.All : 전체목록중 More를 제외한 모든 데이터를 All[]에 저장
				cnt[0]++;
				All[ cnt[0] ] = i;
				
				//2.Beach[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('beach') >=0 ){
					cnt[1]++;
					Beach[ cnt[1] ]=i;
					
				}
				
				//3.City[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('city') >=0 ){
					cnt[2]++;
					City[ cnt[2] ]=i;
					
				}
				
				//4.Mountain[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('mountain') >=0 ){
					cnt[3]++;
					Mountain[ cnt[3] ]=i;
					
				}
				
				//5.Alternative[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('alternative') >=0 ){
					cnt[4]++;
					Alternative[ cnt[4] ]=i;
					
				}
				
				//6.Rejuvenate[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('rejuvenate') >=0 ){
					cnt[5]++;
					Rejuvenate[ cnt[5] ]=i;
					
				}
				
			}
			else{ //...-more 포함된 데이터 목록만 추출
				//1.AllMore[] : 전체목록중 More가 포함된 데이터를 AllMore[]에 저장
				cntMore[0]++;
				AllMore[ cntMore[0] ] = i;
				//2.BeachMore[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('beach-more') >=0 ){
					cntMore[1]++;
					BeachMore[ cntMore[1] ]=i;
				}
				//3.CityMore[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('city-more') >=0 ){
					cntMore[2]++;
					CityMore[ cntMore[2] ]=i;
				}
				//4.MountainMore[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('mountain-more') >=0 ){
					cntMore[3]++;
					MountainMore[ cntMore[3] ]=i;
					
				}
				
				//5.AlternativeMore[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('alternative-more') >=0 ){
					cntMore[4]++;
					AlternativeMore[ cntMore[4] ]=i;
				}
				
				//6.RejuvenateMore[]
				if( $('.section3-gallery-wrap>li').eq(i).data('name').indexOf('rejuvenate-more') >=0 ){
					cntMore[5]++;
					RejuvenateMore[ cntMore[5] ]=i;
					
				}
			}
		}	
			//7.기본 보여질 목록 12개 
			//All[]배열값 목록 출력
			$('.section3-gallery-wrap>li').hide();
			for( i=0; i<All.length; i++ ){
				$('.section3-gallery-wrap>li').eq(i).show();
			}
	}
	
	
	//8.버튼 클릭 이벤트 : 해당 목록만 출력 [필터링]
	$('.tabmenuBt').on({
		click:	function(){
			if($(this).text().toLowerCase() == 'all'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<All.length; i++ ){
					$('.section3-gallery-wrap>li').eq( All[i] ).show();
				}
				//LoadMore
				z=0;
				if( more[0]===0 && (more[1]===0 || more[2]===0 || more[3]===0 || more[4]===0 || more[5]===0) ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}

			}
			else if($(this).text().toLowerCase() == 'beach'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<Beach.length; i++ ){
					$('.section3-gallery-wrap>li').eq( Beach[i] ).show();
				}
				//LoadMore
				z=1;
				if( more[1]===0 && more[0]===0 ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
			}
			else if($(this).text().toLowerCase() == 'city'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<City.length; i++ ){
					$('.section3-gallery-wrap>li').eq( City[i] ).show();
				}
				//LoadMore
				z=2;
				if( more[2]===0 && more[0]===0 ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}

			}
			else if($(this).text().toLowerCase() == 'mountain'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<Mountain.length; i++ ){
					$('.section3-gallery-wrap>li').eq( Mountain[i] ).show();
				}
				//LoadMore
				z=3;
				if( more[3]===0 && more[0]===0 ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
			}
			else if($(this).text().toLowerCase() == 'alternative'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<Alternative.length; i++ ){
					$('.section3-gallery-wrap>li').eq( Alternative[i] ).show();
				}
				//LoadMore
				z=4;
				if( more[4]===0 && more[0]===0 ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
			}
			else if($(this).text().toLowerCase() == 'rejuvenate'){
				//목록 삭제 정리
				$('.section3-gallery-wrap>li').hide();
				for( i=0; i<Rejuvenate.length; i++ ){
					$('.section3-gallery-wrap>li').eq( Rejuvenate[i] ).show();
				}
				//LoadMore
				z=5;
				if( more[5]===0 && more[0]===0 ){
					$('.section3-loadMore').show(); //애니메이션 이미지 . gif	
					$('.loadMore').show(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
				else{
					$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	
					$('.loadMore').hide(); //버튼
					$('.loadingImg').hide(); //애니메이션 이미지
				}
			} //제어문 if조건문 끝
			
			//글상자를 탭메뉴 버튼 클릭시 함수 호출하여 연동
			//모든 배열들의 값을 돌려준다
			txtBoxFn();

		}
	});
	
	
	//9.Load More 클릭 이벤트
	//1) 변수 설정[more[]] : 각메뉴를 클릭시 Load More버튼 클릭여부를 판단하기 위해서 필요
	//2) 다시 그 메뉴 클릭시 Load More버튼을 보이지 않게 해야하고 if(more[1]==1)이면 안보임, 0이면 보임
	//3) 해당 메뉴 갤러리 비디오 하단에 Load More버튼은 한번 누르면 사라지고 목록이 추가된다.
	//4) 그리고 다른 버튼 누르고 다시 해당버튼 메뉴를 클릭시 셋팅이 Load More 목록이 추가된상태이어야 한다.
	//5) 그리고 또 All 메뉴의 목록에는 추가가 자동으로 된다. 
	//6) if all 추가 모든 메뉴의 갤러리 하단의 LoadMore버튼이 클릭된 상태이면
	//7) if 각메뉴 5개 모두 1이면 All 메뉴의 하단에 LoadMore버튼은 사라진다.
	
	//모든 메뉴의 갤러리 하단의 Load More 버튼이 클릭 된 상태이면
	//All 메뉴의 하단에 Load More 버튼은 사라진다.
	//또한 All 메뉴의 하단에 Load More 버튼을 클릭하면
	//모든 메뉴의 하단에도 Load More버튼이 사라진다.
	
	/////////////////////////////////////////////////
	//탭메뉴 클릭 인덱스 번호 전달받은 함수
	
	
	//9.Load More 클릭 이벤트	
	$('.loadMore').on({
		click:	function(){
			loadMoreFn();
		}
		
			
	});
	
	function loadMoreFn(){
		
		//목록추가 예] beach 메뉴 클릭시 index = 1
		//탭메뉴 클릭시 LoadMore버튼 노출여부 0이면 보이고 1이면 안보임
		more[z]=1; //more[1]=1 more =[0,1,0,0,0,0]
	
		$('.loadMore').hide(); //버튼
		$('.loadingImg').show(); //애니메이션 이미지 . gif
		setTimeout(function(){ //로딩시실행
			$('.loadingImg').hide(); //애니메이션 이미지 . gif	
			$('.section3-loadMore').hide(); //애니메이션 이미지 . gif	

			if( z===0 ){
				for( i=0; i<AllMore.length; i++ ){ //인덱스번호 15 1개
					$('.section3-gallery-wrap>li').eq(AllMore[i]).show();
					cnt[0]++;
					All[ cnt[0] ] = AllMore[i]; //추가목록
				}
			}
			else if( z===1 ){
				for( i=0; i<BeachMore.length; i++ ){ 
					$('.section3-gallery-wrap>li').eq(BeachMore[i]).show();
					cnt[0]++; //추가목록 누적증가
					All[ cnt[0] ] = BeachMore[i]; //추가목록					

					cnt[1]++; //추가목록 누적증가
					Beach[ cnt[1] ] = BeachMore[i]; //추가목록					
				}
			}
			else if( z===2 ){
				for( i=0; i<CityMore.length; i++ ){ 
					$('.section3-gallery-wrap>li').eq(CityMore[i]).show();
					cnt[0]++; //추가목록 누적증가
					All[ cnt[0] ] = CityMore[i]; //추가목록					

					cnt[2]++; //추가목록 누적증가
					City[ cnt[2] ] = CityMore[i]; //추가목록					
				}
			}
			else if( z===3 ){
				for( i=0; i<MountainMore.length; i++ ){ 
					$('.section3-gallery-wrap>li').eq(MountainMore[i]).show(); //LoadMore 눌렀을때 나오는 내용
					cnt[0]++; //추가목록 누적증가
					All[ cnt[0] ] = MountainMore[i]; //추가목록					

					cnt[3]++; //추가목록 누적증가
					Mountain[ cnt[3] ] = MountainMore[i]; //추가목록 탭메뉴눌렀을때 나오는 내용					
				}
			}
			else if( z===4 ){
				for( i=0; i<AlternativeMore.length; i++ ){ 
					$('.section3-gallery-wrap>li').eq(AlternativeMore[i]).show(); //LoadMore 눌렀을때 나오는 내용
					cnt[0]++; //추가목록 누적증가
					All[ cnt[0] ] = AlternativeMore[i]; //추가목록					

					cnt[4]++; //추가목록 누적증가
					Alternative[ cnt[4] ] = AlternativeMore[i]; //추가목록 탭메뉴눌렀을때 나오는 내용					
				}
			}
			else if( z===5 ){
				for( i=0; i<RejuvenateMore.length; i++ ){ 
					$('.section3-gallery-wrap>li').eq(RejuvenateMore[i]).show(); //LoadMore 눌렀을때 나오는 내용
					cnt[0]++; //추가목록 누적증가
					All[ cnt[0] ] = RejuvenateMore[i]; //추가목록					

					cnt[5]++; //추가목록 누적증가
					Rejuvenate[ cnt[5] ] = RejuvenateMore[i]; //추가목록 탭메뉴눌렀을때 나오는 내용					
				}
			}
			//로드모어버튼 클릭시 2초 후에 동작되는 모든 배열의 추가항목
			//탭메뉴의 전체 배열에 추가된 내용까지 확인 가능
			//추가항목이 텍스트박스에 전달
			txtBoxFn();
			
		},1000);
	}	
});
//videoGallery.js



/////////////////////////////////////////////////
//갤러리의 버튼에 마우스 오버시 비디오 일시정지 마우스 떠나면 비디오재생
jQuery(function(){
		
		$('.galleryBt').on({
			mouseenter:	function(){  //일시정지				
				if( $(this).find('video').prop('tagName') === 'VIDEO' ){ //prop : className, tagName둘다사용가능
					$(this).find('video').get(0).pause();					
				}
			},
			mouseleave:	function(){	//태그이름으로 검색 비디오에서만
				if( $(this).find('video').prop('tagName') === 'VIDEO' ){
					$(this).find('video').get(0).play();				
				}				
			}
		});
});
//videoGallery.js



























