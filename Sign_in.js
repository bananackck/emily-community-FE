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

elInputEmail.onkeyup=function(){
    const email=elInputEmail.value
    emailPass=false
    if(email){
        if(validEmail(email)==false){
            elEmailHelper.innerHTML='*올바른 이메일 주소 형식을 입력해주세요.</br>(예: example@example.com)'
        }
        else{
            // if(overlappingEmail()){
            //     elEmailHelper.innerHTML='*중복된 이메일입니다.'
            // }
            // else{return true}
            elEmailHelper.innerHTML=''
            emailPass=true
        }
    }
    else{
        elEmailHelper.innerHTML='*이메일을 입력해주세요.'
    }
    btnActivate()
}
function pwValidator(el, helper){
    if(validLength(el)==false){
        helper.innerHTML='*비밀번호는 8자 이상, 20자 이하이어야 합니다.'
        return false
    }
    else if(strongPassword(el)==false){
        helper.innerHTML='*대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
        return false
    }
    return true
}
elInputPw.onkeyup=function(){
    const pw=elInputPw.value
    const pw2=elInputPw2.value
    pwPass=false
    if(pw){
        if(pwValidator(pw, elPwHelper)){
            elPwHelper.innerHTML=''
            pwPass=true
        }
    }
    else{
        elPwHelper.innerHTML='*비밀번호를 입력해주세요.'
    }
    btnActivate()
}
elInputPw2.onkeyup=function(){
    const pw=elInputPw.value
    const pw2=elInputPw2.value
    pw2Pass=false
    if(pw2){
        if(pwValidator(pw2, elPw2Helper)){
            if(pw!=pw2){
                elPw2Helper.innerHTML='*비밀번호가 다릅니다.'
            }
            else{
            elPw2Helper.innerHTML=''
            pw2Pass=true
        }
        }
    }
    else{
        elPw2Helper.innerHTML='*비밀번호를 한 번 더 입력해주세요.'
    }
    btnActivate()
}
elInputNickname.onkeyup=function(){
    const nickname=elInputNickname.value
    nicknamePass=false
    if(nickname){
        if(nickname.includes(" ")){
            elNicknameHelper.innerHTML='*띄어쓰기를 없애주세요.'
        }
        else if(nickname.length>=11){
            elNicknameHelper.innerHTML='*닉네임은 최대 10자까지 작성 가능합니다.'
        }
        // else if(overlappingNickname()){
        //     elNicknameHelper.innerHTML='*중복된 닉네임입니다.'
        // }
        else{
            elNicknameHelper.innerHTML=''
            nicknamePass=true
        }
    }
    else{
        elNicknameHelper.innerHTML='*닉네임을 입력해주세요.'
    }
    btnActivate()
}

function btnActivate(){
    if(profilePass && emailPass && pwPass && pw2Pass && nicknamePass){
        elSigninBtn.style.backgroundColor="#7F6AEE"
        elSigninBtn.onclick=function(){
            window.location.href="./Posts.html"
        }
    }
    else{
        elSigninBtn.style.backgroundColor="#ACA0EB"
    }
}