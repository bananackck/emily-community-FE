var elDropBtn = document.getElementById('dropbtn')
var elDropcontent = document.getElementById('content')
var elInputProfile = document.getElementById('profile-image')
// var elHover = document.getElementsByClassName('profile-hover')[0]
var elInputNickname = document.getElementById('nickname')
var elNicknameHelper = document.getElementById('nickname-helper')
var elEditBtn = document.getElementById('edit-btn')

var isShown = false
var nicknamePass = false

elDropBtn.onclick=function(){
    if(!isShown){
        elDropcontent.style.display="block"
    }
    else{
        elDropcontent.style.display="none"
    }
    isShown=isShown ^ true
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
    if(nicknamePass){
        elEditBtn.style.backgroundColor="#7F6AEE"
        elEditBtn.onclick=function(){
            // window.location.href="./Posts.html"
            // 작성 좀 해라...
        }
    } 
    else{
        elEditBtn.style.backgroundColor="#ACA0EB"
    }
}

let elToastMsg = document.getElementsByClassName('toast-msg')[0]

//2. 토스트 메시지 노출-사라짐 함수 작성
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

var elDeleteBtn = document.getElementById('delete-btn')
const modal = document.querySelector('.modal')
elDeleteBtn.onclick=function(){
    // console.log("회원탈퇴")
    modal.classList.add('on')
}
const popupNo = document.querySelector('.modal-btn.no')
const popupYes = document.querySelector('.modal-btn.yes')

popupNo.onclick=function(){
    modal.classList.remove('on')
}
popupYes.onclick=function(){
    window.location.href='./Log_in.html'
}