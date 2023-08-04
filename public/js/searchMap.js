
$(document).ready(function() {
    // 지도가 표시될 위치
    const container = document.getElementById("map");
    // 지도 초기값 세팅
    let options = {
        center : new kakao.maps.LatLng(33.450701, 126.570667),  // 중심위치 위경도(카카오스페이스닷)
        level : 3       // 지도 확대 레벨 
    };

    let map = new kakao.maps.Map(container, options);

    // 크롬에서 위치 정보 제공 동의시 현재 접속위치를 중심위치로 세팅함
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let latitude = position.coords.latitude;    // 위도
            let longitude = position.coords.longitude;  // 경도
            // console.log("1");
            // console.log(latitude);
            // console.log(longitude);

            let location = new kakao.maps.LatLng(latitude, longitude);
            // 위치표시 마커 메세지
            let message = '<div style="padding:5px; background-color:lightgrey;">현재 위치입니다.</div>';

            // 마커 생성
            let marker = new kakao.maps.Marker({
                map : map,
                position : location
            });

            // 인포윈도우를 생성합니다.
            let infowindow   = new kakao.maps.InfoWindow({
                content : message,
                removable : true
            });

            // 인포윈도우를 마커 위에 표시
            infowindow.open(map, marker);
            // 접속위치 위경도 세팅
            map.setCenter(location);    
        });
    } else {            // 위치정보 제공 비동의시 회원가입시 입력한 활동지역 위치 표시

    }
});

function searchMap() {
    const searchWord = $("#searchWord").value.trim();


}