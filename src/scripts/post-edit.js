// 게시글 불러오기
async function getPostContent() {
  try {
    // 게시글 헤더
    const response1 = await fetch("../data/post-data.json");
    const posts = await response1.json();
    const post=posts[0];

    // DOM 업데이트
    
    const updateDom = ()=>{
        const title = document.querySelector("#title");
        title.value=`${post.title}`;
        
        const text = document.querySelector("#text");
        text.value=`${post.content[0].text}`;

        let msg=document.getElementById('filename');
        msg.innerHTML=`${post.content[0].img}`;

    }
    updateDom();

    // 응답 생성
    const response = {
        ok: true,
        status: 200,
        json: async () => ({
            message: "get_post",
            data: post,
        }),
    };
    return response;
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
        elCompleteBtn.onclick=function(){
            window.location.href="../pages/post.html"
        }

        console.log("게시물 조회 성공", result);
    } else {
        console.error("게시물 조회 실패");
    }
});

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
}

// 헬퍼텍스트
const elInputTitle = document.getElementById('title')
const elInputText = document.getElementById('text')
const elCompleteBtn = document.getElementById('complete-btn')
const elTextHelper = document.getElementById('text-helper')

let titlePass = true
let textPass = true


elInputTitle.onkeyup=function(){
    const title=elInputTitle.value
    titlepass=title && true;
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
    textpass=text && true;
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
        elCompleteBtn.onclick=function(){
            window.location.href="../pages/post.html"
        }
    }
    else{
        elCompleteBtn.style.backgroundColor="var(--point-color)"
    }
}