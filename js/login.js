const joinBtn = document.getElementById("joinBtn");

// 회원가입 버튼 클릭이벤트 - 페이지 이동
joinBtn.addEventListener('click', function(){
    location.href='./join.html';
});

function login() {
    const userId = document.getElementById('userId').value.trim();   
    const userPwd = document.getElementById('userPwd').value.trim();   

    // 입력값 검증
    if(userId === ""){
        alert("아이디를 입력해주세요.");
        document.getElementById('userId').focus();
    }else if(userPwd === "") {
        alert("비밀번호를 입력해주세요.");
        document.getElementById('userPwd').focus();
    }else {
        let members = window.localStorage.getItem('Members');
        if(members !== null){
            // storage에 저장된 정보와 비교
            let preMemberList = JSON.parse(members);
            let member = preMemberList.find(v=>v.id == userId);
            console.log('member:: '+member);
            //회원 검증
            if(member !== undefined){   //아이디와 비밀번호 일치 확인
                if(member.password == userPwd){
                    let loginYn = {
                        login : "Y",
                        id : userId,
                        name : member.name
                    }                    
                    window.localStorage.setItem("LoginYn", JSON.stringify(loginYn));
                    alert(` ${member.name}님 어서오세요.`);
                    location.href='./myPage.html'
                }else{
                    alert('비밀번호가 일치하지 않습니다.');
                }
            }else {         // 해당 아이디로 등록된 회원인지 확인
                alert('해당아이디로 등록된 회원 정보가 없습니다.\n아직 회원이 아니시라면 회원가입 후 이용해주세요.');
            }
            
        }else {
            alert('등록된 회원이 아닙니다.\n회원가입 후 이용해주세요.');

        }
    }

}