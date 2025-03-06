// 게시글 불러오기
async function getPost() {
  try {
    // 게시글 헤더
    const response1 = await fetch("../data/post-data.json");
    const posts = await response1.json();
    const post=posts[0];

    // 게시글 저자
    const response2 = await fetch("../data/user-data.json");
    const users = await response2.json();

    // DOM 업데이트
    // 저자
    document.querySelector(".post-title").innerHTML=post.title;
    document.querySelector("#writer-profile").src="../"+users[post.author].profilePicture;
    document.querySelector('#writer').innerHTML=users[post.author].nickname;
    document.querySelector('#post-time').innerHTML=post.createdAt;

    //내용
    document.querySelector('#post-img').src="../"+post.content[0].img;
    const postText=document.querySelector('.post-text');
    const pTag = document.createElement("p");
    pTag.innerHTML=post.content[0].text;
    postText.appendChild(pTag);
    document.querySelector('#like-count').innerHTML=post.likeCount;
    document.querySelector('#view-count').innerHTML=post.viewCount;
    document.querySelector('#comment-count').innerHTML=post.commentCount;

    //댓글
    document.querySelector('#comment-profile').src="../"+users[post.comment[0].author].profilePicture;
    document.querySelector('#comment-writer').innerHTML=users[post.comment[0].author].nickname;
    document.querySelector('#comment-post-time').innerHTML=post.comment[0].createdAt; 
    document.querySelector('.comment-text').innerHTML=post.comment[0].text;


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
        console.error("게시물 로드 오류:", error);
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
    const response = await getPost();
    if (response.ok) {
      const result = await response.json();
      console.log("게시물 조회 성공", result);
    } else {
      console.error("게시물 조회 실패");
    }
});

// 포스트 편집 모달
const postModal = document.querySelector("#post-modal");
// 포스트 수정 버튼 클릭
document.querySelector("#post-edit-btn").addEventListener("click", () => {
    window.location.href = "../pages/post-edit.html";
});
// 포스트 삭제 버튼 클릭
document.querySelector("#post-delete-btn").addEventListener("click", () => {
    postModal.classList.add('block');
    postModal.shadowRoot.querySelector(".modal-btn.no").addEventListener("click", () => {
    postModal.classList.remove('block');
    });
    postModal.shadowRoot.querySelector(".modal-btn.yes").addEventListener("click", () => {
      postModal.classList.remove('block');
      window.location.href = "../pages/posts.html";
    });
});

// 댓글 편집 모달
const commentModal = document.querySelector("#comment-modal");
// 댓글 수정 버튼 클릭
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

