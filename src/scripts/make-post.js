const elInputTitle = document.getElementById('title')
const elInputText = document.getElementById('text')
const elCompleteBtn = document.getElementById('complete-btn')
const elTextHelper = document.getElementById('text-helper')
const elFile = document.getElementById('file')

let img;

let titlePass = false
let textPass = false

const info=document.getElementById('info-wrap')

//제목 입력
elInputTitle.onkeyup=function(){
    const title=elInputTitle.value
    titlePass=false
    if(title){
        titlePass=true
    }
    btnActivate()
} 
//텍스트 입력
elInputText.onkeyup=function(){
    const text=elInputText.value
    textPass=false
    if(text){
        elTextHelper.innerHTML=''
        textPass=true
    }
    else{
        elTextHelper.innerHTML='*제목, 내용을 모두 작성해주세요'
    }
    btnActivate()
}
//이미지 입력
elFile.onchange=function(){
    const selected=this.files[0];

    const reader = new FileReader();
    
    reader.onload=function(){
        const msg=document.getElementById('filename');
        msg.innerHTML=selected.name;
    }
    reader.readAsDataURL(selected)

    img = selected;
}
//버튼 활성화
function btnActivate(){
    if(titlePass && textPass){
        elCompleteBtn.style.backgroundColor="var(--activate-color)"
    }
    else{
        elCompleteBtn.style.backgroundColor="var(--point-color)"
    }
}
//수정 완료 클릭 버튼 이벤트
elCompleteBtn.onclick = async () =>{
    console.log(img)
    try{
        const response = await postUpload(
            elInputTitle.value,
            elInputText.value,
            img
        );
        console.log(response);
        setTimeout(()=>{
            window.location.href = `../pages/post.html?id=${response.data.id}`;
        },500);
    }
    catch{
        console.error("게시물 생성 실패", response.message);
    }
}

//----------------------------------
//게시물 업로드 완료
async function postUpload(title, text, img) {
    //jwt토큰
    const token = localStorage.getItem('jwtToken');
    //전달 데이터
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify({ title, text })], { type: 'application/json' }));
    if (img) formData.append('file', img);

    console.log([...formData.keys()]);
    try{
        const response = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',            // 기본값이지만 명시 권장
            credentials: 'include',   // allowCredentials=true일 때만 사용
            body: formData
        });
        
        if(!response.ok){
            if(response.status===404){
                return{
                    ok:false,
                    status: 404,
                    message: "🚨 404 NOT FOUND"
                }
            }
            else if(response.status===401){
                return {message: "🚨 401 UNAUTHORIZED"}
            }
        }
        return{
            ok: true,
            status: 201,
            message: "✅ 201 post upload success.",
            data: await response.json()
        }
    }
    catch{
        return {
            ok:false,
            status: 500,
            message: "🚨 500 unexpected server error"
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(localStorage.getItem('userId'))
});