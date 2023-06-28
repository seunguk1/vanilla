// 로그인여부 확인 및 Nav 표시 상이
var loginYn = JSON.parse(window.localStorage.getItem("LoginYn"));
console.log(`로그인여부 :: ${loginYn.login}`);
if(loginYn.login == "Y"){
    document.getElementById("joinPath").style.display = "none";
    // 정상적인 로그인을 한 상태면 logout으로 text 변경
    document.getElementById("loginPath").innerHTML = `<a href="./login.html">Logout</a>`;
    document.getElementById('myPagePath').innerHTML = `<a href="./myPage.html">${loginYn.name}</a>님, 반갑습니다.`;
}else {
    alert("회원만 이용가능합니다.");
    location.href = "./login.html";
}

// 로그인 후 login -> logout 변경된 버튼 클릭시, 로그인 상태를 'N'로 저장
document.getElementById("loginPath").addEventListener('click', ()=>{
    loginYn.login = "N";
    loginYn.id = "";
    loginYn.name = "";
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

    // 글 작성자가 로그인시 수정, 삭제 버튼 노출
    if(obj.id == loginYn.id){
        document.getElementById('modifyBtn').style.display = 'inline';
        document.getElementById('deleteBtn').style.display = 'inline';
    }
    
    loadComment();
}

// 게시글 index 전역변수로 선언
var post_index = '';    // 상세글보기, 수정, 해당글에 댓글달기 시 필요 

// 댓글 등록하기
function addComment(){
    let comment_val = document.getElementById('comment_input').value.trim();
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let post_content = post.find(v => v.index == post_index);

    if(comment_val !== ""){
        let obj = {
            id : loginYn.id,
            comment : comment_val,
            date : `${year}.${month}.${day}`
        };
        
        post_content.reply.push(obj);
        
        window.localStorage.setItem('Post', JSON.stringify(post));
        document.getElementById('comment_input').value = '';
        loadComment();
    }else {
        alert("댓글 내용을 입력해주세요.");
    }
}

// 댓글 보여주기
function loadComment() {
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let post_content = post.find(v => v.index == post_index);
    let comments = post_content.reply;
    console.log(comments);

    let comment_html = '';
    for(let i=0; i<comments.length; i++){
        let html = `
            <ul  class="comment-row">
                <li class="comment-id">${comments[i].id}</li>
                <li class="comment-cnt">${comments[i].comment}</li>
                <li class="comment-date">${comments[i].date}</li>
                <button class="comment-delete-btn" onclick="delComment(${i});">X</button>
            </ul>  
        `;

        comment_html += html;
    }

    document.getElementById('comment_list').innerHTML = comment_html;
}

// 댓글 삭제
function delComment(index){
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let post_content = post.find(v => v.index == post_index);
    let comments = post_content.reply; 
    // 삭제 버튼을 클릭한 댓글의 인덱스를 받아와서 해당 댓글만 빠진 배열을 새로 저장함
    comments.splice(index,1);
    // 해당 댓글 삭제된 새로운 배열을 기존 Post 배열에 담음
    post_content.reply = comments;

    window.localStorage.setItem("Post", JSON.stringify(post));
    loadComment();
}

var post_separator = ''; // 새 글 등록과 기존글 수정을 구분하기 위한 전역변수

// 글 등록하기
function submitCnt() {
    let cnt_title = document.getElementById('cntTitle').value.trim();
    let cnt_body = document.getElementById('cntBody').value.trim();

    if(cnt_title == ""){
        alert('제목을 입력해주세요.');
        return false;
    }else if(cnt_body == ""){
        alert('내용을 입력해주세요.');
        return false;
    }else {
        let post = JSON.parse(window.localStorage.getItem('Post'));
        let obj = '';
        if(post_separator == "MODI"){       // 수정일 경우
            let post_content = post.find(v => v.index == post_index);
        
            post_content.title = cnt_title;
            post_content.body = cnt_body;
            post_content.date = `${year}.${month}.${day}`;
            
        }else {                             // 신규 등록
            obj = {
                index : post[post.length-1].index+1,
                id : loginYn.id,
                title : cnt_title,
                body : cnt_body,
                date : `${year}.${month}.${day}`,
                reply : []
            };
            post.push(obj);
        }
        
        window.localStorage.setItem('Post', JSON.stringify(post));
        
        // 입력 form clear
        cnt_title = '';
        cnt_body = '';
        showList();
    }
}

// 글 수정하기
function modifyCnt() {
    writeCnt();
    post_separator = 'MODI';
    document.getElementById('detail-area').style.display = 'none';
    document.getElementById('modifyBtn').style.display = 'none';
    document.getElementById('deleteBtn').style.display = 'none';
    document.getElementById('listBtn').innerText = '취소';

    // localStorage에서 해당 글 찾아서 보여주기
    let post = JSON.parse(window.localStorage.getItem('Post'));
    let obj = post.find(v => v.index == post_index);
    document.getElementById('cntTitle').value = obj.title;
    document.getElementById('cntBody').value = obj.body;

}

// 글 삭제하기
function deleteCnt(){
    const msg = '게시글을 삭제하시겠습니까?';
    if(confirm(msg)){
        let post = JSON.parse(window.localStorage.getItem('Post'));
        let index = post.findIndex(v => v.index == post_index);
        post.splice(index, 1);
        
        window.localStorage.setItem("Post", JSON.stringify(post));
        alert("삭제되었습니다.");
        showList();
    }else {

    }
}

    // Pagenation
    let post_list = JSON.parse(window.localStorage.getItem('Post'));
    var page_arr = [];  // 페이지별 보여줄 글목록 새로운 배열
    const maxPage = Math.ceil(post_list.length/5);
    var currPage = 1;

    // 글번호를 내림차순으로 정렬 
    post_list.sort(function(a,b){
        return b.index - a.index;
    });
    
    for(let i=0; i<maxPage; i++){
        page_arr.push(post_list.splice(0,5));
    }
    console.log(page_arr);

    let page_html = '';
    for(let x=0; x<page_arr.length; x++){
        page_html += `<button class="button" id="page_${x+1}" onclick="pageMove(${x+1});">${x+1}</button>`;
    }
    document.getElementById('page_area').innerHTML = page_html;

// 페이지 이동
function pageMove(num){
    console.log(`현재 페이지 :: ${num}`);
    const button = document.querySelectorAll('.button');
    button.forEach(v => {
        v.classList.toggle('active');
    });

    document.getElementById("contentList").innerHTML = '';
    loadCnt(num);
}
document.get
// 게시판 글목록 구성하기
function loadCnt(num) {
    let p = num ? num-1 : 0;
    // 글목록 생성
    for(let i=0; i<page_arr[p].length; i++){

        let list_html = `
            <tr class="list" onclick="showDtil(${page_arr[p][i].index});">
                <td>${page_arr[p][i].index}</td>
                <td>${page_arr[p][i].title}</td>
                <td>${page_arr[p][i].id}</td>
                <td>${page_arr[p][i].reply.length}</td>
                <td>${page_arr[p][i].date}</td>
            </tr>
        `;

        document.getElementById("contentList").insertAdjacentHTML("beforeend", list_html);
    }
    
    // 페이지 처음 진입시 1 페이지를 표시
    if(p == 0){
        document.getElementById('page_1').classList.add('active');
    }
}

loadCnt();