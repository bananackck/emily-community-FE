import {updateDom} from '../components/commentsView.js'

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');

// 게시글 불러오기
async function getPost() {
  try {
    // 게시글 헤더
    console.log(postId);
    const response1 = await fetch(`http://localhost:8080/api/posts/${postId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      mode: 'cors',            // 기본값이지만 명시 권장
      credentials: 'include'   // allowCredentials=true일 때만 사용
    });
    const post = await response1.json();

    // DOM 업데이트
    // 저자
    console.log(post)
    document.querySelector(".post-title").innerHTML=post.title;
    document.querySelector("#writer-profile").src="http://localhost:8080"+post.userProfileImg;
    document.querySelector('#writer').innerHTML=post.userNickname;
    document.querySelector('#post-time').innerHTML=post.createdAt.replace('T',' '),

    //내용
    //TODO: 이미지 null 처리 (null이면 div hidden 처리)
    document.querySelector('#post-img').src="http://localhost:8080"+post.img;
    console.log(post.img)
    console.log()

    const postText=document.querySelector('.post-text');
    const pTag = document.createElement("p");
    pTag.innerHTML=post.text;
    postText.appendChild(pTag);

    document.querySelector('#like-count').innerHTML=post.likeCount;
    document.querySelector('#view-count').innerHTML=post.viewCount;
    document.querySelector('#comment-count').innerHTML=post.commentCount;

    //댓글
    const response2 = await fetch(`http://localhost:8080/api/posts/${postId}/comments`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      mode: 'cors',            // 기본값이지만 명시 권장
      credentials: 'include'   // allowCredentials=true일 때만 사용
    });
    const comments = await response2.json();
    
    // DOM 업데이트
    const container = document.querySelector(".comments");
    container.innerHTML = "";
    comments.reverse().forEach((comment)=>{
      updateDom(container, comment);
    });

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
        console.error("게시물 상세 로드 오류:", error);
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

//--------------------
// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const response = await getPost();
    if (response.ok) {
      const result = await response.json();
      console.log("게시물 조회 성공", result);
    } else {
      console.error("게시물 조회 실패");
    }
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

      //TODO: 게시글 삭제 DELETE api 추가
      window.location.href = "../pages/posts.html";
    });
});


//---------------------------
// 댓글 업로드
const elCommentBox = document.querySelector('#comment-upload-btn');
const elInputComment = document.querySelector('#comment-inputbox');
elCommentBox.addEventListener("click", async ()=>{
    const token = localStorage.getItem('jwtToken');

    const container = document.querySelector(".comments");
    container.innerHTML = "";

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    try{
      const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        mode: 'cors',            // 기본값이지만 명시 권장
        credentials: 'include',   // allowCredentials=true일 때만 사용
        body: JSON.stringify({ text: elInputComment.value })
      })
      if(!response.ok){
        console.error("errer", response.status);
      }

      // DOM 업데이트
      getPost();
      
      return{
        ok: true,
        status: response.status,
        message: "✅success"
      }
    }
    catch{
      return{
        ok: false,
        status: null,
        message: "🚨error"
      }
    }
});

// 댓글 편집 모달
const commentModal = document.querySelector("#comment-modal");
// 댓글 수정 버튼 클릭ㄱㄷ
document.querySelector("#comment-edit-btn").addEventListener("click", async () => {

    try {
      // 게시글
      const response1 = await fetch("../data/post-data.json");
      const posts = await response1.json();
      const comment=posts[0].comment[0];
      console.log(comment)

    // DOM 업데이트
    //댓글
    document.querySelector('#comment-inputbox').value=comment.text;

    // 응답 생성
    const response = {
        ok: true,
        status: 200,
        json: async () => ({
            message: "get_comment",
            data: comment,
        }),
    };
    return response;
    } catch (error) {
        console.error("댓글 내용 로드 오류:", error);
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
  
});
// 댓글 삭제 버튼 클릭
document.querySelector("#comment-delete-btn").addEventListener("click", () => {
  commentModal.classList.add('block');
  // 취소 버튼 클릭 시 모달 숨기기
  commentModal.shadowRoot.querySelector(".modal-btn.no").addEventListener("click", () => {
    commentModal.classList.remove('block');
  });
  // 확인 버튼 클릭 시 로그인 페이지 이동
  commentModal.shadowRoot.querySelector(".modal-btn.yes").addEventListener("click", () => {
    commentModal.classList.remove('block');
    // window.location.href = "../pages/posts.html";
  });
});

