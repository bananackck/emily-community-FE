const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');

// 헬퍼텍스트
const elInputTitle = document.getElementById('title')
const elInputText = document.getElementById('text')
const elCompleteBtn = document.getElementById('complete-btn')
const elTextHelper = document.getElementById('text-helper')

let elTitle = document.querySelector("#title");
let elText = document.querySelector("#text");
let elImgName = document.getElementById('filename');

let imgFileName;
let img;
// 게시글 불러오기
async function getPostContent() {
  try {
    // 게시글 헤더
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        mode: 'cors',            // 기본값이지만 명시 권장
        credentials: 'include'   // allowCredentials=true일 때만 사용
    });
    const post = await response.json();

    console.log(post)
    // DOM 업데이트
    const updateDom = ()=>{
        elTitle.value=`${post.title}`;
        elText.value=`${post.text}`;

        if(post.img!= null){
            imgFileName=post.img.split('_').pop();
            elImgName.innerHTML=""
            elImgName.innerHTML=`${imgFileName}`;   
        }
    }
    updateDom();

    // 응답 생성
    return {
        ok: true,
        status: 200,
        json: async () => ({
            message: "get_post",
            data: post,
        }),
    };
  } catch (error) {
        console.error("게시물 내용 로드 오류:", error);
        const response = {
        ok: false,
        status: 404,
        json: async () => ({
            message: "not_found",
            data: null,
        }),
        };
        return response;
    }
}

// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const response = await getPostContent();
    if (response.ok) {
        const result = await response.json();
        // 헬퍼 텍스트와 버튼 활성화
        elTextHelper.innerHTML='';
        elCompleteBtn.style.backgroundColor="var(--activate-color)";
        

        console.log("게시물 조회 성공", result);
    } else {
        console.error("게시물 조회 실패");
    }
});

async function patchPost(title, text, img){
    //전달 데이터
    console.log("------------  PATCH ------------")
    console.log(img)
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify({ title, text })], { type: 'application/json' }));
    if (img) formData.append('file', img);

    try{
        const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors',            // 기본값이지만 명시 권장
            credentials: 'include',   // allowCredentials=true일 때만 사용
            body: formData
        });
        
        if(!response.ok){
            return{
                ok:false,
                status: response.status,
                message: "🚨 오류 발생"
            }
        }
        return{
            ok: true,
            status: 201,
            message: "✅ 201 post upload success.",
            data: response.json()
        }
    }
    catch{
        return{
            message: "catch 에러 발생 "
        };
    }
}

//수정 버튼 클릭
elCompleteBtn.onclick=function(){
    patchPost(
        elTitle.value,
        elText.value,
        img
    );
    setTimeout(()=>{
        window.location.href=`../post/post.html?id=${postId}`
    },1000);
}

// 파일 핸들러
let elFile = document.getElementById('file')

elFile.onchange=function(){
    const selected=this.files[0];

    const reader = new FileReader();
    
    reader.onload=function(){
        let msg=document.getElementById('filename')
        msg.innerHTML=selected.name
    }
    reader.readAsDataURL(selected)
    img=selected
}

// 헬퍼텍스트
let titlePass = true
let textPass = true


elInputTitle.onkeyup=function(){
    const title=elInputTitle.value
    titlePass=title && true;
    if(title){
        elTextHelper.innerHTML=''
    }
    else{
        elTextHelper.innerHTML='*제목, 내용을 모두 작성해주세요'
    }
    btnActivate()
} 

elInputText.onkeyup=function(){
    const text=elInputText.value
    textPass=text && true;
    if(text){
        elTextHelper.innerHTML=''
    }
    else{
        elTextHelper.innerHTML='*제목, 내용을 모두 작성해주세요'
    }
    btnActivate()
}

function btnActivate(){
    if(titlePass && textPass){
        elCompleteBtn.style.backgroundColor="var(--activate-color)"
    }
    else{
        elCompleteBtn.style.backgroundColor="var(--point-color)"
    }
}