$(function(){
    //////////////nav
    $(".nav>ul>li").mouseover(function(){
        $(this).find(".submenu").stop().slideDown(0);
    });
    $(".nav>ul>li").mouseout(function(){
        $(this).find(".submenu").stop().slideUp(0);
    });

    //slide 선언, 복사, 셋인터벌증감식 이프문셋타임아웃초기화

    // let currentIndex = 0;   //현재 이미지
    // $(".sliderWrap").append($(".slider").first().clone(true));

    // setInterval(function(){
    //     currentIndex++;     //현재 이미지를 1씩 증가
    //     $(".sliderWrap").animate({marginLeft: -1920 * currentIndex}, 600);

    //     if(currentIndex == 5){
    //         setTimeout(function(){
    //             $(".sliderWrap").animate({marginLeft:0}, 0);
    //             currentIndex = 0;
    //         }, 700);
    //     }
    // }, 3000);


    ///////////////menu
    const menuBtn = $(".menuBtn>ul>li>a");
    const menuBox = $(".menuBox>ul");

    menuBtn.click(function(){
        const index = $("this").index();
        $(this).addclass("active").siblings().removeclass("active");

    });


    ////////////// popup
    $("#popup>.close").click(function(){
        $("#popup").hide();
    });

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    
    // 슬라이드와 버튼 요소 선택
    var visual = $('#main_slides > ul.slides_container > li');
    var button = $('#main_slides > ul.slides-pagenation > li');
    var current = 0; // 현재 활성화된 슬라이드 인덱스
    var setIntervalId; // 자동 슬라이드 간격을 관리할 변수

    // 버튼 클릭 이벤트 처리
    button.on({
        click: function () {
            var tg = $(this);
            var i = tg.index();
            button.removeClass('on'); // 모든 버튼에서 'on' 클래스 제거
            tg.addClass('on'); // 클릭한 버튼에 'on' 클래스 추가
            move(i); // 해당 인덱스의 슬라이드로 이동
        }
    });

    // 이전 슬라이드 버튼 클릭 이벤트 처리
    $('#prev').click(function () {
        var n = current - 1; // 현재 활성화된 슬라이드의 인덱스에서 1을 뺍니다. 이는 이전 슬라이드로 이동하기 위한 인덱스를 계산합니다.

        if (n == -1) {
            n = visual.size() - 1; // 슬라이드의 첫 번째 슬라이드에서 이전을 누르면, 마지막 슬라이드로 이동하도록 합니다. 이 부분은 슬라이드 순환을 처리합니다.
        }

        move(n); // 계산된 인덱스로 슬라이드를 이동시킵니다.
        button.eq(n).trigger('click'); // 이전 슬라이드에 해당하는 버튼을 클릭한 것과 동일한 효과를 주기 위해 해당 버튼을 클릭 이벤트로 처리합니다.
        return false; // 이벤트 처리 후 기본 동작을 방지하기 위해 false를 반환합니다. 예를 들어, 링크의 기본 동작(페이지 이동)을 방지합니다.

    });

    // 다음 슬라이드 버튼 클릭 이벤트 처리
    $('#next').click(function () {
        var n = current + 1;
        // 현재의 current 변수에 1을 더하여 다음 슬라이드를 선택하는 인덱스를 준비합니다.

        if (n == visual.size()) {
            // 만약 n 값이 이미 슬라이드의 총 개수와 동일하다면,
            // 다음 슬라이드가 없다는 의미입니다.
            n = 0; // n 값을 0으로 설정하여 처음 슬라이드로 돌아갑니다.
        }

        move(n); // move() 함수를 호출하여 슬라이드를 변경합니다.

        button.eq(n).trigger('click');
        // n 번째 버튼(페이지네이션 버튼)을 선택하고 이 버튼에 대한 클릭 이벤트를 강제로 실행시킵니다.
        return false;
        // 클릭 이벤트의 기본 동작을 중단시키고, 페이지 이동을 막습니다.

    });

    // 마우스가 슬라이드 영역에 머물렀을때 슬라이드 전환 효과를 정지시키는 이벤트 

    $('#main_slide').on({
        mouseover: function () {
            clearInterval(setIntervalId);
            // clearInterval - 주기적인 작업 중단 
            // setIntervalId - 슬라이드쇼 전환시 사용 (일정시간 간격식별 변수)           
        },
        // 마우스가 벗어났을때 슬라이드 다시 시작
        mouseout: function () {
            timer();
            // timer() - 슬라이드 자동전환 타이머 시작 함수호출
        }
    });

    timer(); // 페이지 로딩 후 초기 슬라이드 자동 시작 


    // 자동 슬라이드 동작 함수 
    function timer() {
        setIntervalId = setInterval(function () {
            var n = current + 1; // 현재 인덱스에 1을 더하여 다음 인덱스를 계산합니다.
            if (n == visual.size()) {
                // 다음 인덱스가 'visual' 컬렉션의 크기와 같은지 확인합니다.
                // 만약 다음 인덱스가 컬렉션의 크기와 같다면, 이것은 끝에 도달했음을 의미합니다.
                // 이 상황을 처리하기 위한 코드를 여기에 추가할 수 있습니다.
                n = 0; // 다음 슬라이드가 없으면, 0으로 돌아감 
            }
            // 다음 슬라이드 버튼을 클릭하여 슬라이드 변경 
            button.eq(n).click();
        }, 3000); // 3초 
    }

    // 슬라이드 이동 함수 
    function move(i) {
        if (current == i) return;
        // 현재 활성된 슬라이드의 목표 슬라이드가 같으면 동작하지 않음
        var currentEl = visual.eq(current); // 현재 슬라이드 
        var nextEl = visual.eq(i); // 목표 슬라이드

        currentEl.css({ // currentEl의 CSS 속성을 설정합니다. 현재 엘리먼트의 left 속성을 '0%'으로 설정하여 현재 위치를 나타냅니다.
            left: '0%'
        }).stop().animate({ // .stop() 메서드를 사용하여 이전에 실행 중인 모든 애니메이션을 중지합니다.
            left: '-100%'
        }); // 슬라이드 왼쪽으로 이동
        // animate() 메서드를 사용하여 엘리먼트를 왼쪽으로 애니메이션화합니다. 
        // left 속성을 '-100%'로 설정하여 엘리먼트를 왼쪽으로 이동시킵니다. 이로써 현재 엘리먼트는 화면에서 사라지게 됩니다.


        nextEl.css({ // 다음 엘리먼트(nextEl)를 오른쪽에서 화면으로 이동시키는 애니메이션을 실행합니다. 
            // nextEl의 CSS 속성을 설정합니다. 다음 엘리먼트의 left 속성을 '100%'로 설정하여 오른쪽에서 시작하도록 합니다.
            left: '100%'
        }).stop().animate({ // .stop() 메서드를 사용하여 이전에 실행 중인 모든 애니메이션을 중지합니다.
            left: '0%' // animate() 메서드를 사용하여 엘리먼트를 애니메이션화합니다.
            // left 속성을 '0%'로 설정하여 엘리먼트가 화면 내에서 가운데로 이동합니다. 이로써 다음 엘리먼트가 화면에 나타나게 됩니다.
        });
        current = i; // 현재 슬라이드 인덱스를 갱신 (=업데이트)
    }


    ////////////////////////////////////////////////
    // btn_top /////////////////////////////////////

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $(".button").fadeIn();
            // 안보이던 화살표 버튼이 500px 이상으로 스크롤이 내려오면 나타남
        } else {
            $(".button").hide(); // 500px 이하일 경우 사라짐
        }
    });

    // .logo와 .btn_top 클릭시 최상단으로 가게 하기
    // 로고와 화살표를 클릭했을때 최상단(TOP:0)으로 위치 
    $(".logo, .button").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 400); //0.4초
    });

});