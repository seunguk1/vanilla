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
    loginYn.id = "";
    window.localStorage.setItem("LoginYn", JSON.stringify(loginYn)); 
});

//오늘 날짜
var date = new Date();
var year = date.getFullYear();                          // 년도
var month = ('0' + (date.getMonth() + 1)).slice(-2);    // 월
var day = ('0' + date.getDate()).slice(-2);

// 글쓰기 form 표시
function writeCnt(){
    document.getElementById('pageTit').innerText = '글 작성하기';
    document.getElementById('contentList_area').style.display = 'none';
    document.getElementById('writeForm').style.display = 'block';
    document.getElementById('writeBtn').style.display = 'none';
    document.getElementById('submitCnt').style.display = 'inline';
}

// 목록 보여주기
function showList() {
    document.getElementById('pageTit').innerText = '공유 게시판';
    document.getElementById("writeForm").style.display = 'none';
    document.getElementById("contentList_area").style.display = 'block';
    document.getElementById('submitCnt').style.display = 'none';
    document.getElementById('writeBtn').style.display = 'inline';
}

// 글 상세 보여주기
function showDtil(num) {

    console.log(`글 index :: ${num}`);
}

// 글 등록하기
function submitCnt() {
    let cnt_title = document.getElementById('cntTitle').value.trim();
    let cnt_body = document.getElementById('cntBody').value.trim();

    let post = JSON.parse(window.localStorage.getItem('Post'));
    let obj = {
        index : 2,
        id : loginYn.id,
        title : cnt_title,
        body : cnt_body,
        date : `${year}.${month}.${day}`,
       
    }
    post.push(obj);

    window.localStorage.setItem('Post', JSON.stringify(post));

    // 입력 form clear
    cnt_title = '';
    cnt_body = '';
    showList();

}



// Pagenation
const contetList = document.querySelector(".contents");
const buttons = document.querySelector('.buttons');

const totalCnt = 120;
const showCnt = 10;
const showBtn = 5;
const maxPage = Math.ceil(totalCnt/showCnt);

let crrPage = 1;

function loadCnt() {
    const tr_tag = document.createElement('tr');
    const td_no_tag = document.createElement('td');
    const td_tit_tag = document.createElement('td');
    const td_auth_tag = document.createElement('td');
    const td_repl_tag = document.createElement('td');
    const td_date_tag = document.createElement('td');

    let post_list = JSON.parse(window.localStorage.getItem('Post'));
    let list_HTML = '';

    for(let i=0; i<post_list.length; i++){
        td_no_tag.innerText = post_list.index;
        td_tit_tag.innerText = post_list.title;
        td_auth_tag.innerText = post_list.id;
        td_repl_tag.innerText = '0';    // post_list.replies.length
        td_date_tag.innerText = '2023.06.09'; //post_list.date  
        
        tr_tag.appendChild(td_no_tag);
        tr_tag.appendChild(td_tit_tag);
        tr_tag.appendChild(td_auth_tag);
        tr_tag.appendChild(td_repl_tag);
        tr_tag.appendChild(td_date_tag);
        tr_tag.classList.add('list');
        // tr_tag.onclick(showDtil(post_list.index));

        document.getElementById('contentList').append(tr_tag);
    }

    // td_no_tag.innerText = '2';
    // td_tit_tag.innerText = 'test';
    // td_auth_tag.innerText = 'kim';
    // td_date_tag.innerText = '2023.06.09';
    // td_repl_tag.innerText = '0';
    // tr_tag.appendChild(td_no_tag);
    // tr_tag.appendChild(td_tit_tag);
    // tr_tag.appendChild(td_auth_tag);
    // tr_tag.appendChild(td_date_tag);
    // tr_tag.appendChild(td_repl_tag);
    // document.getElementById('content-list').appendChild(tr_tag);

    let page = `
        <button class="button" id="page_1" onclick="pageMove(1);">1</button>
    `;

    buttons.innerHTML = page;
}

function pageMove(num){
    let currPage = document.getElementById(`page_${num}`);

    currPage.classList.add("active");
    console.log(`현재 페이지 :: ${num}`);
}

loadCnt();