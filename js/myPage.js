var date = new Date();
var year = date.getFullYear();                          // 년도
var month = ('0' + (date.getMonth() + 1)).slice(-2);    // 월
var day = ('0' + date.getDate()).slice(-2);             // 일
var today = date.getDay();                              // 요일 index
var dok_kor = ['일','월','화','수','목','금','토']; 
var dok = dok_kor[today];       // dok: day of the week

// 제목에 오늘 날짜 표기
document.getElementById('today').innerText = `${year}년 ${month}월 ${day}일 ${dok}요일`;

// today에 해당하는 요일 배경색 빨간색 변경
var dayList = document.getElementById("day_of_week").children;
dayList[today].style.background = 'crimson';
dayList[today].style.color = 'beige';

// 이번주의 첫번째 날 구하기 (일요일)
var sunday_tmp = new Date(date.setDate(date.getDate() - today));
var sunday = sunday_tmp.getDate(); 

var arr_week = new Array(7);        // 이번주 전체 날짜 배열
for(i=0; i<7; i++){
    var tomorrow_tmp = new Date(sunday_tmp.setDate(sunday + i));
    var tomorrow =('0' + tomorrow_tmp.getDate()).slice(-2);
    arr_week[i] = tomorrow;

}
console.log(arr_week);

// 각 버튼에 날짜 할당
document.getElementById('sun').innerText = arr_week[0] +'일';
document.getElementById('mon').innerText = arr_week[1] +'일';
document.getElementById('tue').innerText = arr_week[2] +'일';
document.getElementById('wed').innerText = arr_week[3] +'일';
document.getElementById('thr').innerText = arr_week[4] +'일';
document.getElementById('fri').innerText = arr_week[5] +'일';
document.getElementById('sat').innerText = arr_week[6] +'일';

// 로그인여부 확인 및 Nav 표시 상이
var loginYn = JSON.parse(window.localStorage.getItem("LoginYn"));
console.log(`로그인여부 :: ${loginYn.login}`);
if(loginYn.login == "Y"){
    document.getElementById("joinPath").style.display = "none";
    // 정상적인 로그인을 한 상태면 logout으로 text 변경
    document.getElementById("loginPath").innerHTML = `<a href="./login.html">Logout</a>`;
}else {
    alert("회원만 이용가능합니다.");
    location.href = "./login.html";
}

// 로그인 후 login -> logout 변경된 버튼 클릭시, 로그인 상태를 'N'로 저장
document.getElementById("loginPath").addEventListener('click', ()=>{
    loginYn.login = "N";
    window.localStorage.setItem("LoginYn", JSON.stringify(loginYn)); 
});


// 일별 루틴 상세보기
function goRoutine(num){
    document.getElementById('calendar').style.display = 'none';   
    document.getElementById('modal').style.display = 'none'; 
    document.getElementById('routine_area').style.display = 'block';    
    
    document.getElementById('day').innerText = arr_week[num];
    cnt_key = arr_week[num];
    
    loadRoutine();
}

var cnt_key = "";   // 로컬스토리지에 내용 저장할때의 key
var routines = [];  // 루틴 목록 저장할 배열

// 루틴 목록 추가하기
function addCnt(){
    let routine = document.getElementById('content').value;
    if(routine.trim() !== ""){

        let listId = routines.length +1; 
        let content = {
            id: listId,
            text: routine
        }
        
        routines.push(content);
        
        window.localStorage.setItem(`Routine_${cnt_key}`, JSON.stringify(routines));
        document.getElementById('content').value = "";
        loadRoutine();
    }else {
        alert("운동 루틴을 입력해주세요.");
        document.getElementById('content').focus();
    }

}

// localStorage에서 저장된 값 불러오기
function loadRoutine(){
    let values = window.localStorage.getItem(`Routine_${cnt_key}`);
    let notionCnt = window.localStorage.getItem(`Notion_${cnt_key}`);

    if(values !== null){
        document.getElementById('routine_list').innerHTML = '';     
        routines = JSON.parse(values);

        let list_area = document.getElementById('routine_list');
        
     routines.forEach((routine, index) => {
            let li_tag = document.createElement("li");
            let span_tag = document.createElement("span");
            let button_tag = document.createElement('button');
            span_tag.innerText = routine.text;
            button_tag.innerText = "X";
            button_tag.className = "delBtn";
            button_tag.id = `del_${index}`;
            li_tag.id = index;
            li_tag.appendChild(span_tag);
            li_tag.appendChild(button_tag);
            list_area.appendChild(li_tag);    

            button_tag.addEventListener('click', ()=>delList(index))
        });
           
    }else {
         console.log('운동을 등록해주세요.');
    }

    if(notionCnt !== null){
        let cnt = JSON.parse(notionCnt);
        document.getElementById('note').value = cnt.Notion;
        document.getElementById('notionBtn').innerText = "알림수정";
    }
}

// 루틴 리스트 단일 항목 삭제
function delList(index) {
    routines.splice(index, 1);
   
    window.localStorage.setItem(`Routine_${cnt_key}`, JSON.stringify(routines));
    loadRoutine();
}

// 메모 저장
function addNotion(){
    let notion = document.getElementById('note').value.trim();
    if(notion == ""){
        alert("내용을 입력해주세요.");
        return false;
    }else {
        let notionData = {
            Notion : notion
        };
        
        window.localStorage.setItem(`Notion_${cnt_key}`, JSON.stringify(notionData));
        alert(" 메모가 저장되었습니다. ");
    }
}

// 메모 삭제
function delNotion(){
    document.getElementById('note').value = '';
    document.getElementById('notionBtn').innerText = "알림등록";
    
    window.localStorage.removeItem(`Notion_${cnt_key}`);
}

// 입력한 메모를 해당 날짜에 로그인시 모달창으로 노출
console.log(`today :: ${arr_week[today]}`);
var today_notion = window.localStorage.getItem(`Notion_${arr_week[today]}`);
if(today_notion !== null){
    var notion_memo = JSON.parse(today_notion).Notion;
    document.getElementById('modal-cnt').innerText = notion_memo;
    document.getElementById('modal').style.display = 'block';
}

// modal 창닫기 이벤트
document.getElementById('cloModalBtn').addEventListener('click',()=>{delModal();});
function delModal(){
    document.getElementById('modal').style.display = 'none';
}

// 목록으로 돌아가기
function returnList(){
    document.getElementById('calendar').style.display = 'block';    
    document.getElementById('routine_area').style.display = 'none';    
    document.getElementById('routine_list').innerHTML = '';
    document.getElementById('content').innerText = '';
    document.getElementById('note').value = '';
    document.getElementById('notionBtn').innerText = "알림등록";

    routines = [];
}
