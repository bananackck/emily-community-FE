import * as validator from "../components/validator.js" 
const elInputProfile = document.getElementById('profile-image')
const elInputNickname = document.getElementById('nickname')
const elNicknameHelper = document.getElementById('nickname-helper')
const elEditBtn = document.getElementById('edit-btn')

let nicknamePass = false

elInputProfile.onchange = function(){
    profilePass=validator.uploadProfile(elInputProfile);
}

elInputNickname.onkeyup=function(){
    nicknamePass=validator.handleNicknameInput(elInputNickname.value, elNicknameHelper);
    btnActivate()
}

function btnActivate(){ 
    if(nicknamePass){
        elEditBtn.style.backgroundColor="var(--activate-color)"
        elEditBtn.onclick=function(){
            // window.location.href="./Posts.html"
            // 작성 좀 해라...
        }
    } 
    else{
        elEditBtn.style.backgroundColor="var(--point-color)"
    }
}

// 수정완료 토스트 메세지
let elToastMsg = document.getElementsByClassName('toast-msg')[0]

function toastOn(){
    elToastMsg.classList.add('active');
    console.log('클래스 연결 됨?');
    setTimeout(function(){
        elToastMsg.classList.remove('active');
    },1500);
}

elEditBtn.addEventListener('click',function(){
    console.log('이벤트가 잘 연결 됐는지 확인');
    toastOn()
});


// 회원 탈퇴 모달
const elDeleteBtn = document.getElementById('delete-btn')
const modal = document.querySelector("my-modal")

elDeleteBtn.onclick=function(){
    console.log("회원탈퇴")
    modal.classList.add('block')
}