var date = new Date();
var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);
var dok_kor = ['일','월','화','수','목','금','토'];
var dok = dok_kor[date.getDay()];   // day of the week

document.getElementById('today').innerText = `${year}년 ${month}월 ${day}일 ${dok}요일`;

function goRoutin(){
    console.log('월요일입니다.');
}