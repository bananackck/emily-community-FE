// 이메일 정보
var elInputEmail = document.getElementById('email')
// 비밀번호 정보
var elInputPw = document.getElementById('pw')

var emailPass = false
var pwPass = false
const info=document.getElementById('info-wrap')
// 로그인 버튼
var elLoginBtn = document.getElementById('login-btn')
// 경고메세지
var elHelperText = document.getElementById('helper-text')

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
function validEmail(email){
    if(emailPattern.test(email)===false){return false;}
    else{return true;}
}
function strongPassword(password){
    if(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(password)){
        return true
    }
    else{return false}
}
function validLength(password){
    if(password.length>=8 && password.length<=20){
        return true
    }
    else{return false}
}

elInputEmail.onkeyup=function(){
    const email=elInputEmail.value
    emailPass=false

    if(email){
        if(validEmail(email)==false){
            elHelperText.innerHTML='*올바른 이메일 주소 형식을 입력해주세요.</br> (예: example@example.com)'
        }
        else{
            elHelperText.innerHTML=''
            emailPass=true
        }
    }
    else{
        elHelperText.innerHTML='*이메일을 입력해주세요.'
    }
    btnActivate()
 
}
elInputPw.onkeyup=function(){
    const pw=elInputPw.value
    pwPass=false

    if(pw){
        if(validLength(pw)==false){
            elHelperText.innerHTML='*비밀번호는 8자 이상, 20자 이하이어야 합니다.'
        }
        else if(strongPassword(pw)==false){
            elHelperText.innerHTML='*대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
        }
        else{
            elHelperText.innerHTML=''
            pwPass=true
        }
    }
    else{
        elHelperText.innerHTML='*비밀번호를 입력해주세요'
    }
    btnActivate()
}

function btnActivate(){
    if(emailPass && pwPass){
        elLoginBtn.style.backgroundColor="#7F6AEE"
        elLoginBtn.onclick=function(){
            window.location.href="./Posts.html"
        }
    }
    else{
        elLoginBtn.style.backgroundColor="#ACA0EB"
    }
}