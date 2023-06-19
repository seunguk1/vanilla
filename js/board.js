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

    location.reload();
}

// 글 상세 보여주기
function showDtil(num) {
    document.getElementById('pageTit').innerText = '글 상세보기';
    document.getElementById('contentList_area').style.display = 'none';
    document.getElementById('detail-area').style.display = 'block';
    document.getElementById('writeBtn').style.display = 'none';
    console.log(`글 index :: ${num}`);
    post_index = num;

    // localStorage에서 해당 글 찾아서 보여주기
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let obj = post.find(v => v.index == num);
    document.getElementById('detail_title').innerText = `제목 : ${obj.title}`;
    document.getElementById('detail_content').innerText = obj.body;
    
    loadComment();
}

// 게시글 index 전역변수로 선언
var post_index = '';    // 상세글보기, 해당글에 댓글달기 시 필요 

// 댓글 등록하기
function addComment(){
    let comment_val = document.getElementById('comment_input').value.trim();
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let post_content = post.find(v => v.index == post_index);

    let obj = {
        id : loginYn.id,
        comment : comment_val,
        date : `${year}.${month}.${day}`
    };

    post_content.reply.push(obj);

    window.localStorage.setItem('Post', JSON.stringify(post));
}

// 댓글 보여주기
function loadComment() {
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let post_content = post.find(v => v.index == post_index);
    let comments = post_content.reply;
    console.log(comments);
}

// 글 등록하기
function submitCnt() {
    let cnt_title = document.getElementById('cntTitle').value.trim();
    let cnt_body = document.getElementById('cntBody').value.trim();

    let post = JSON.parse(window.localStorage.getItem('Post'));
    let obj = {
        index : post.length+1,
        id : loginYn.id,
        title : cnt_title,
        body : cnt_body,
        date : `${year}.${month}.${day}`,
        reply : []
    }
    post.push(obj);

    window.localStorage.setItem('Post', JSON.stringify(post));

    // 입력 form clear
    cnt_title = '';
    cnt_body = '';
    showList();

}

// Pagenation
const buttons = document.querySelector('.buttons');

const totalCnt = 120;
const showCnt = 10;
const showBtn = 5;
const maxPage = Math.ceil(totalCnt/showCnt);

let crrPage = 1;

// 게시판 글목록 구성하기
function loadCnt() {

    let post_list = JSON.parse(window.localStorage.getItem('Post'));

    for(let i=0; i<post_list.length; i++){
        let list_html = `
            <tr class="list" onclick="showDtil(${post_list[i].index});">
                <td>${post_list[i].index}</td>
                <td>${post_list[i].title}</td>
                <td>${post_list[i].id}</td>
                <td>${post_list[i].reply.length}</td>
                <td>${post_list[i].date}</td>
            </tr>
        `;

        document.querySelector("tbody").insertAdjacentHTML("afterbegin", list_html);
    }

    let page = `
        <button class="button" id="page_1" onclick="pageMove(1);">1</button>
    `;

    buttons.innerHTML = page;
}

// 페이지 이동
function pageMove(num){
    let currPage = document.getElementById(`page_${num}`);

    currPage.classList.add("active");
    console.log(`현재 페이지 :: ${num}`);
}

loadCnt();