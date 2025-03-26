import * as validator from "../components/validator.js" 
const elInputProfile = document.querySelector('#profile-image-input')
const elProfileImg = document.querySelector('#img')
const elEmail = document.querySelector('.text')
const elInputNickname = document.querySelector('#nickname')
const elNicknameHelper = document.querySelector('#nickname-helper')
const elEditBtn = document.querySelector('#edit-btn')

const token = localStorage.getItem('jwtToken');

let nicknamePass = true

let img;
// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    console.log(localStorage.getItem('profileImg'))
    e.preventDefault();

    //기본 세팅하기
    elProfileImg.src=localStorage.getItem('profileImg');
    elEmail.innerHTML=localStorage.getItem('email');
    elInputNickname.placeholder=localStorage.getItem('nickname');
    elInputNickname.onblur = function () {
        this.placeholder = localStorage.getItem('nickname');
    };

    btnActivate();
});



elInputProfile.onchange = function(){
    elProfileImg.src="";
    img=validator.uploadProfile(this);
    // console.log(URL.createObjectURL(img).replace("blob:",""))
    // localStorage.setItem('profileImg', URL.createObjectURL(img).replace("blob:",""));
}

elInputNickname.onkeyup=function(){
    nicknamePass=validator.handleNicknameInput(elInputNickname.value, elNicknameHelper);
    localStorage.setItem('nickname', elInputNickname.value);
    btnActivate();
}


function btnActivate(){ 
    if(nicknamePass){
        elEditBtn.style.backgroundColor="var(--activate-color)"
    } 
    else{
        elEditBtn.style.backgroundColor="var(--point-color)"
    }
}


// 수정완료 토스트 메세지
let elToastMsg = document.getElementsByClassName('toast-msg')[0]

function toastOn(){
    elToastMsg.classList.add('active');
    setTimeout(function(){
        elToastMsg.classList.remove('active');
    },1500);
}

elEditBtn.addEventListener('click',async() => {
    toastOn();

    const formData = new FormData();
    const nickname=localStorage.getItem('nickname');
    formData.append('data', new Blob([JSON.stringify({ nickname })], { type: 'application/json' }));
    if (img) formData.append('file', img);

    try{
        const response = await fetch("http://localhost:8080/api/users/me", {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',            // 기본값이지만 명시 권장
            credentials: 'include',   // allowCredentials=true일 때만 사용
            body: formData
        });

        const user=await response.json();
        console.log(user)
        
        if(response.status===409){
            elNicknameHelper.innerHTML="이미 사용중인 닉네임입니다."
            // elNicknameHelper.style.color="var(--)"
            nicknamePass=false
            btnActivate()
        }
        else if(!response.ok){
            console.error("🚨 "+ response.status)
        }
        else{
            localStorage.setItem('nickname', user.nickname);
            localStorage.setItem('profileImg', "http://localhost:8080"+user.img);
            console.log("✅ 201 update success.");
            setTimeout(()=>{
                window.location.href = "../pages/Posts.html";
            },500);
        }
    }
    catch{
        console.error("🚨 catch 에러 발생 ")
    }
});


// 회원 탈퇴 모달
const elDeleteBtn = document.getElementById('delete-btn')
const modal = document.querySelector("my-modal")

elDeleteBtn.onclick=function(){
    console.log("회원탈퇴")
    modal.classList.add('block')
    modal.shadowRoot.querySelector(".modal-btn.no").addEventListener("click", () => {
        modal.classList.remove('block');
    });
    modal.shadowRoot.querySelector(".modal-btn.yes").addEventListener("click", () => {
        modal.classList.remove('block');
        deleteUser();
    });
}

const deleteUser=async()=>{
    try{
        const response = await fetch("http://localhost:8080/api/users/me", {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',            // 기본값이지만 명시 권장
            credentials: 'include',   // allowCredentials=true일 때만 사용
        });
        if(!response.ok){
            console.error("🚨 "+ response.status)
        }
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('email');
        localStorage.removeItem('profileImg');
        localStorage.removeItem('userId');

        console.log("✅ 200 delete success.");
        setTimeout(()=>{
            //TODO
            // window.location.href = "../pages/login.html";
        },1000);
    }
    catch{
        console.error("🚨 catch 에러 발생 ")
    }
}