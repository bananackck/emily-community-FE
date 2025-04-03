import * as validator from "../../components/validator.js";

const elInputPw = document.getElementById('pw')
const elInputPw2 = document.getElementById('pw2')

let pwPass = false
let pw2Pass = false

const elPwHelper = document.getElementById('pw-helper')
const elPw2Helper = document.getElementById('pw2-helper')

const elEditBtn = document.getElementById('edit-btn')

const token = localStorage.getItem('jwtToken');

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
    }
    else{
        elEditBtn.style.backgroundColor="var(--point-color)";
    }
}

// 수정 완료 토스트 메세지
let elToastMsg = document.getElementsByClassName('toast-msg')[0]

function toastOn(){
    elToastMsg.classList.add('active');
    setTimeout(function(){
        elToastMsg.classList.remove('active');
    },1500);

}

elEditBtn.onclick = async function(){
    toastOn();

    const response = await fetch("http://localhost:8080/api/users/me/password", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            newPassword: elInputPw.value
        })
    });

    if(response.ok){
        setTimeout(()=>{
            window.location.href = "../pages/edit-profile.html";
        },1000);
    }
    else{
        console.error("비밀번호 변경 실패", response.message);
    }
}
