const nav = [
    {   // 로그인
        id : "loginPath",
        url : "./login.html",
        title : "Login" 
    },
    {   // 회원가입
        id : "joinPath",
        url : "./join.html",
        title : "Join"
    },
    {   // 게시판
        id : "boardPath",
        url : "./board.html",
        title : "Board"
    },
    {   // ToDoList
        id : "myPagePath",
        url : "./myPage.html",
        title : ""
    },
    {   // 지도 검색
        id : "kakaomapApi",
        url : "./searchMap.html",
        title : "인바디 검사소 검색"
    }
];

$(document).ready(function(){
    nav.forEach(element => {
        let navHTML = `<li id="${element.id}"><a href="${element.url}">${element.title}</a></li>`;
        $("nav ul").append(navHTML);
        // console.log(navHTML);
    });
    
    // 로그인여부 확인 및 Nav 표시 상이
    let loginYn = JSON.parse(window.localStorage.getItem("LoginYn"));
    if(loginYn.login === "Y"){
        $("#loginPath a").text("Logout");
        $("#joinPath").hide();
        $("#myPagePath a").text(`${loginYn.name}님, 반갑습니다.`);
        
        // 로그인 후 login -> logout 변경된 버튼 클릭시, 로그인 상태를 'N'로 저장
        $("#loginPath").on("click", function() {
            loginYn.login = "N";
            loginYn.id = "";
            loginYn.name = "";
            window.localStorage.setItem("LoginYn", JSON.stringify(loginYn)); 
        });
    }else if(loginYn.login === "N") {
        $("#boardPath").hide();
        $("#myPagePath").hide();
        $("#kakaomapApi").hide();
    }
    
});



