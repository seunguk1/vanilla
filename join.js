const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', function(){
    console.log('취소');
    location.href = "file:///C:/Users/BD/project/vanilla/login.html"
});

function submit(){
    validation();

    console.log("save");
}

function validation(){
    const userId = document.getElementById('userId').value.trim();
    const userPwd = document.getElementById('userPwd').value.trim();
    const userPwd_chk = document.getElementById('userPwd_chk').value.trim();
    const userName = document.getElementById('userName').value.trim();
    const userAge = document.getElementById('userAge').value;

    if(userId === ""){
        alert("아이디를 입력해주세요.");
        document.getElementById('userId').focus();
        return false;
    }else if(userPwd === ""){
        alert("비밀번호를 입력해주세요.");
        document.getElementById('userPwd').focus();
        return false;
    }else if(userPwd_chk === ""){
        alert("비밀번호를 다시 한번 입력해주세요.");
        document.getElementById('userPwd_chk').focus();
        return false;
    }else if(userPwd !== "" && userPwd_chk !== ""){
        if(userPwd !== userPwd_chk){
            document.getElementById('caution_1').style.display = 'block';
            return false;
        }else {
            document.getElementById('caution_1').style.display = 'none';
            return true;
        }
    }else if(userName === ""){
        alert("이름을 입력해주세요.");
        document.getElementById('userName').focus();
        return false;
    }else if(userAge === ""){
        alert("나이를 선택해주세요.");
        document.getElementById('userAge').focus();
        return false;
    }

}