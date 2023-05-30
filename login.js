const joinBtn = document.getElementById("joinBtn");

joinBtn.addEventListener('click', function(){
    location.href='file:///C:/Users/BD/project/vanilla/join.html'
});

function login() {
    const userId = document.getElementById('userId').value.trim();   
    const userPwd = document.getElementById('userPwd').value.trim();   
    
    console.log('ID :: '+userId.length);
    console.log('PW :: '+userPwd.length);

    // 입력값 검증
    if(userId === ""){
        alert("아이디를 입력해주세요.");
        document.getElementById('userId').focus();
    }else if(userPwd === "") {
        alert("비밀번호를 입력해주세요.");
        document.getElementById('userPwd').focus();
    }else {
        // storage에 저장된 정보와 비교
         
        location.href='file:///C:/Users/BD/project/vanilla/myPage.html'
    }

}