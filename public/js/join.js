const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

cancelBtn.addEventListener('click', function(){
    console.log('취소');
    location.href = "./login.html"
});

const members = [];   // localStorage에 저장할 배열
console.log('int :: '+members);
function submit(){
    let userId = document.getElementById('userId').value.trim();
    let userPwd = document.getElementById('userPwd').value.trim();
    let userPwd_chk = document.getElementById('userPwd_chk').value.trim();
    let userName = document.getElementById('userName').value.trim();
    let userAge = document.getElementById('userAge').value;
    console.log('sub :: '+members);
    if(!validation(userId, userPwd, userPwd_chk, userName, userAge)){
        console.log('val');
    }else{
        if(!idDupChk){
            alert('아이디 중복확인을 해주세요.');
            return false;
        }

        if(userPwd !== userPwd_chk){
            document.getElementById('caution_1').style.display = 'block';
            return false;
        }else {
            document.getElementById('caution_1').style.display = 'none';
        }
        
        // localStorage에 저장
        let member = {
            id: userId,
            password: userPwd,
            name: userName,
            age: userAge
        }

        let preMemberList = window.localStorage.getItem('Members');
        if(preMemberList !== null){
            members = JSON.parse(preMemberList);
        }

        members.push(member);
        window.localStorage.setItem('Members', JSON.stringify(members));

        alert(' 회원정보가 저장되었습니다. \n 로그인 후 이용해주세요.');
        location.href = "./login.html"
    }
}

// 입력값 유효성 체크
function validation(userId, userPwd, userPwd_chk, userName, userAge){
    
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
    }else if(userName === ""){
        alert("이름을 입력해주세요.");
        document.getElementById('userName').focus();
        return false;
    }else if(userAge === ""){
        alert("나이를 선택해주세요.");
        document.getElementById('userAge').focus();
        return false;
    }

    return true;
}

var idDupChk = false;     // 가입시 아이디 중복확인 필수를 위한 전역변수 선언  
// 아이디 중복체크
function duplCheck() {
    const userId = document.getElementById('userId').value.trim();
    let memberList = JSON.parse(window.localStorage.getItem('Members'));
    console.log(memberList);
    if(memberList !== null){ 

        if( userId !== ""){
            let dupl_chk = memberList.findIndex(v => v.id == userId);
            if(dupl_chk < 0){
                alert('사용이 가능한 아이디입니다.');
                idDupChk = true;
            }else {
                alert('이미 사용중인 아이디입니다.');
                idDupChk = false;
            } 
        }else {
            alert("아이디를 입력해주세요.");
            
        }
    }else {
        alert('사용이 가능한 아이디입니다.');
        idDupChk = true;
    }

}