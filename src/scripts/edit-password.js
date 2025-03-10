import * as validator from "../components/validator.js";

const elInputPw = document.getElementById('pw')
const elInputPw2 = document.getElementById('pw2')

let pwPass = false
let pw2Pass = false

const elPwHelper = document.getElementById('pw-helper')
const elPw2Helper = document.getElementById('pw2-helper')

const elEditBtn = document.getElementById('edit-btn')


elInputPw.onkeyup = function() {
  pwPass = validator.handlePwInput(elInputPw.value, elPwHelper);
  btnActivate();
};

elInputPw2.onkeyup = function() {
  pw2Pass = validator.handlePw2Input(elInputPw.value, elInputPw2.value, elPw2Helper);
  btnActivate();
};

function btnActivate(){
    if(pwPass && pw2Pass){
        elEditBtn.style.backgroundColor="var(--activate-color)";
        elEditBtn.onclick=function(){
            toastOn()
        }
    }
    else{
        elEditBtn.style.backgroundColor="var(--point-color)";
    }
}

let elToastMsg = document.getElementsByClassName('toast-msg')[0]

function toastOn(){
    elToastMsg.classList.add('active');
    setTimeout(function(){
        elToastMsg.classList.remove('active');
    },1500);
}


