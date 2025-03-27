import {updateDom, getComments, deleteComment} from '../components/commentsView.js'

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');

// 게시글 불러오기
async function getPost() {
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
    if(!response.ok){
      console.error("[FE]🚨 게시글 조회 오류")
    }
    const post = await response.json();

    console.log(post.userId)
    console.log(localStorage.getItem('userId'))
    // DOM 업데이트
    if(post.userId != localStorage.getItem('userId')){
      const elEditBtn = document.querySelector('.edit-btns');
      elEditBtn.classList.add('none');
    }
    // 저자
    console.log(post)
    document.querySelector(".post-title").innerHTML=post.title;
    document.querySelector("#writer-profile").src="http://localhost:8080"+post.userProfileImg;
    document.querySelector('#writer').innerHTML=post.userNickname;
    document.querySelector('#post-time').innerHTML=post.createdAt.replace('T',' ');

    if(post.img==null){
      document.querySelector('#post-img').classList.add('none');
    }
    else{
      document.querySelector('#post-img').src="http://localhost:8080"+post.img;
    }

    //TODO: 글 여러 줄?
    const postText=document.querySelector('.post-text');
    const pTag = document.createElement("p");
    pTag.innerHTML=post.text;
    postText.appendChild(pTag);

    document.querySelector('#like-count').innerHTML=post.likeCount;
    document.querySelector('#view-count').innerHTML=post.viewCount;
    document.querySelector('#comment-count').innerHTML=post.commentCount;

    //댓글
    getComments();

    // 응답 생성
    return{
        ok: true,
        status: 200,
        json: async () => ({
            message: "[FE]✅ 게시글 & 댓글 조회 성공",
            data: post
        })
    };
    } catch (error) {
        return{
        ok: false, status: null,
        message: "[FE]🚨 게시글 조회 오류: "+ error
        };
    }
}

//--------------------
// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    await getPost();
});

//---------------------
// 포스트 수정 버튼 클릭
document.querySelector("#post-edit-btn").addEventListener("click", () => {
    window.location.href = `../pages/post-edit.html?id=${postId}`;
});

// 포스트 삭제 모달
const postModal = document.querySelector("#post-modal");
// 포스트 삭제 버튼 클릭
document.querySelector("#post-delete-btn").addEventListener("click", () => {
    postModal.classList.add('block');
    postModal.shadowRoot.querySelector(".modal-btn.no").addEventListener("click", () => {
    postModal.classList.remove('block');
    });
    postModal.shadowRoot.querySelector(".modal-btn.yes").addEventListener("click", () => {
      postModal.classList.remove('block');

      deletePost(postId);
      setTimeout(()=>{
        window.location.href = "../pages/posts.html";
      },500);
    });
});

//게시물 & 댓글 & 좋아요 삭제
async function deletePost(postId) {
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok){
      return{message: "[FE]✅ 삭제 성공"}
    }
  } catch (err) {
    return{
      ok: false, status: null,
      message: "[FE]🚨 게시글 삭제 오류"
    }
  }

  try {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok){
        return{message: "[FE]✅ 댓글 조회 성공"}
      }
      const comments = await res.json();
      comments.forEach(comment => deleteComment(comment.id));
    } catch (err) {
      return{
        ok: false, status: null,
        message: "[FE]🚨 댓글 조회 오류"
      }
    }
    //TODO: 좋아요 삭제
}

//------------------------
// 좋아요
const elLikeBtn = document.querySelector('.like-box');
elLikeBtn.addEventListener("click", async ()=>{
    const container = document.querySelector("#like-count");

    try{
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/like`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(response.ok){
        console.log("[FE]✅ 좋아요 성공")
      }
      const like = await response.json();

      // DOM 업데이트
      container.innerHTML = "";
      container.innerHTML=like.likeCount;

      return{message: "[FE]✅ 좋아요 성공"}
    }
    catch{
      return{
        ok: false, status: null,
        message: "[FE]🚨 좋아요 오류"
      }
    }
});

//---------------------------
// 댓글 업로드
const elCommentUploadBtn = document.querySelector('#comment-upload-btn');
const elInputComment = document.querySelector('#comment-inputbox');
elCommentUploadBtn.addEventListener("click", async ()=>{
    const container = document.querySelector(".comments");
    container.innerHTML = "";

    console.log("clicked"+ elInputComment.value)
    try{
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: elInputComment.value })
      })
      if(response.ok){
        console.log("[FE]✅ 댓글 업로드 성공")
        // DOM 업데이트
        elInputComment.value = "";
        elInputComment.placeholder="댓글을 남겨주세요!"
        getComments();
      }
      
      return{message: "[FE]✅ 댓글 그리기 성공"}
    }
    catch{
      return{
        ok: false, status: null,
        message: "[FE] 🚨댓글 업로드 오류"
      }
    }
});