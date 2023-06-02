var date = new Date();
var year = date.getFullYear();                          // 년도
var month = ('0' + (date.getMonth() + 1)).slice(-2);    // 월
var day = ('0' + date.getDate()).slice(-2);             // 일
var today = date.getDay();                              // 요일 index
var dok_kor = ['일','월','화','수','목','금','토']; 
var dok = dok_kor[today];       // dok: day of the week

// 제목에 오늘 날짜 표기
document.getElementById('today').innerText = `${year}년 ${month}월 ${day}일 ${dok}요일`;

var sunday_tmp = new Date(date.setDate(date.getDate() - today));
var sunday = sunday_tmp.getDate();  // 이번주의 첫번째 날 구하기 (일요일)

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


// 일별 루틴 상세보기
function goRoutine(num){
    document.getElementById('calendar').style.display = 'none';    
    document.getElementById('routine_area').style.display = 'block';    
    
    document.getElementById('day').innerText = arr_week[num];
    cnt_key = arr_week[num];
    
    loadRoutine();
}

var cnt_key = "";   // 로컬스토리지에 내용 저장할때의 key
var routines = [];  // 루틴 목록 저장할 배열

// 루틴 목록 추가하기
function addCnt(){
    var routine = document.getElementById('content').value;
    if(routine.trim() !== ""){

        var listId = routines.length +1; 
        var content = {
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
    var values = window.localStorage.getItem(`Routine_${cnt_key}`);
    if(values !== null){
        document.getElementById('routine_list').innerHTML = '';     
        routines = JSON.parse(values);

        var list_area = document.getElementById('routine_list');
        
     routines.forEach((routine, index) => {
            var li_tag = document.createElement("li");
            var span_tag = document.createElement("span");
            var button_tag = document.createElement('button');
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
}

function delList(index) {
    routines.splice(index, 1);
   
    window.localStorage.setItem(`Routine_${cnt_key}`, JSON.stringify(routines));
    loadRoutine();
}

function returnList(){
    document.getElementById('calendar').style.display = 'block';    
    document.getElementById('routine_area').style.display = 'none';    
    document.getElementById('routine_list').innerHTML = '';
    document.getElementById('content').innerText = '';

    routines = [];
}
