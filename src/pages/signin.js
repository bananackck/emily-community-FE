import * as validator from "../components/validator.js"

var elInputProfile = document.getElementById('profile-image')
var elInputEmail = document.getElementById('email')
var elInputPw = document.getElementById('pw')
var elInputPw2 = document.getElementById('pw2')
var elInputNickname = document.getElementById('nickname')

var profilePass = false
var emailPass = false
var pwPass = false
var pw2Pass = false
var nicknamePass = false

var elProfileHelper = document.getElementById('profile-helper')
var elEmailHelper = document.getElementById('email-helper')
var elPwHelper = document.getElementById('pw-helper')
var elPw2Helper = document.getElementById('pw2-helper')
var elNicknameHelper = document.getElementById('nickname-helper')

const info=document.getElementById('info-wrap')
var elSigninBtn = document.getElementById('signin-btn')



elInputProfile.onchange = function(){
    profilePass=false
    const selected=this.files[0];

    const reader = new FileReader();
    
    reader.onload=function(){
        const img=document.getElementById('img')
        img.src=reader.result

        img.style.width='149px'
        profilePass=true
    }
    reader.readAsDataURL(selected)
}

elInputEmail.onkeyup = function() {
    emailPass = validator.handleEmailInput(elInputEmail.value, elEmailHelper);
    btnActivate();
};


elInputPw.onkeyup=function(){
    pwPass=validator.handlePwInput(elInputPw.value, elPwHelper);
    btnActivate()
};


elInputPw2.onkeyup=function(){
    pw2Pass=validator.handlePw2Input(elInputPw.value, elInputPw2.value, elPw2Helper);
    btnActivate();
};

elInputNickname.onkeyup=function(){
    nicknamePass=validator.handleNicknameInput(elInputNickname.value, elNicknameHelper);
    btnActivate()
};


function btnActivate(){
    if(emailPass && pwPass && pw2Pass && nicknamePass){
        elSigninBtn.style.backgroundColor="var(--activate-color)"
        elSigninBtn.onclick=function(){
            window.location.href="./posts.html"
        }
    }
    else{
        elSigninBtn.style.backgroundColor="var(--point-color)"
    }
}