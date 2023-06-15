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

function writeCnt(){
    document.getElementById("content-table").style.display = 'none';
    document.getElementById("writeForm").style.display = 'block';
    document.getElementById('writeBtn').style.display = 'none';
    document.getElementById('submitCnt').style.display = 'block';
    
    // var tr_tag = document.createElement('tr');
    // var td_no_tag = document.createElement('td');
    // var td_tit_tag = document.createElement('td');
    // var td_auth_tag = document.createElement('td');
    // var td_date_tag = document.createElement('td');
    // var td_repl_tag = document.createElement('td');

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

}

function showList() {
    document.getElementById("content-table").style.display = 'block';
    document.getElementById("writeForm").style.display = 'none';
    document.getElementById('writeBtn').style.display = 'block';
    document.getElementById('submitCnt').style.display = 'none';
}