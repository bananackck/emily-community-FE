import * as validator from "../components/validator.js" 
const elInputProfile = document.querySelector('#profile-image-input')
const elProfileImg = document.querySelector('#profile-image')
const elEmail = document.querySelector('.text')
const elInputNickname = document.querySelector('#nickname')
const elNicknameHelper = document.querySelector('#ickname-helper')
const elEditBtn = document.querySelector('#edit-btn')

let nicknamePass = false

// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem('profileImg'))
    console.log(localStorage.getItem('email'))      
    //기본 세팅하기
    elProfileImg.src=localStorage.getItem('profileImg');
    elEmail.innerHTML=localStorage.getItem('email');
    elInputNickname.placeholder=localStorage.getItem('nickname');
});



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