var elInputPw = document.getElementById('pw')
var elInputPw2 = document.getElementById('pw2')

var pwPass = false
var pw2Pass = false

var elPwHelper = document.getElementById('pw-helper')
var elPw2Helper = document.getElementById('pw2-helper')

var elEditBtn = document.getElementById('edit-btn')

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
function btnActivate(){
    if(pwPass && pw2Pass){
        elEditBtn.style.backgroundColor="#7F6AEE"
        elEditBtn.onclick=function(){
            toastOn()
        }
    }
    else{
        elEditBtn.style.backgroundColor="#ACA0EB"
    }
}

let elToastMsg = document.getElementsByClassName('toast-msg')[0]

function toastOn(){
    elToastMsg.classList.add('active');
    setTimeout(function(){
        elToastMsg.classList.remove('active');
    },1500);
}


