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
    const postTitle= document.querySelector(".post-title");
    postTitle.innerHTML=post.title;
    const writerProfile =document.querySelector("#writer-profile");
    writerProfile.src="../"+users[post.author].profilePicture;
    const writer = document.querySelector('#writer');
    writer.innerHTML=users[post.author].nickname;
    const postTime=document.querySelector('#post-time');
    postTime.innerHTML=post.createdAt;

    //내용
    const postImg=document.querySelector('#post-img');
    postImg.src="../"+post.content[0].img;
    const postText=document.querySelector('.post-text');
    const pTag = document.createElement("p");
    pTag.innerHTML=post.content[0].text;
    postText.appendChild(pTag);
    const likeCount=document.querySelector('#like-count');
    likeCount.innerHTML=post.likeCount;
    const viewCount=document.querySelector('#view-count');
    viewCount.innerHTML=post.viewCount;
    const commentCount=document.querySelector('#comment-count');
    commentCount.innerHTML=post.commentCount;

    //댓글
    const commentProfile=document.querySelector('#comment-profile');
    commentProfile.src="../"+users[post.comment[0].author].profilePicture;
    const commentWriter=document.querySelector('#comment-writer');
    commentWriter.innerHTML=users[post.comment[0].author].nickname;
    const commentPostTime=document.querySelector('#comment-post-time');
    commentPostTime.innerHTML=post.comment[0].createdAt; 
    const commentText=document.querySelector('.comment-text');
    commentText.innerHTML=post.comment[0].text;


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


// 이벤트 위임 방식으로 처리
const postsContainer = document.querySelector(".contents");
postsContainer.addEventListener("click", (e) => {
  // 수정 버튼 클릭
  if (e.target.closest("#post-edit-btn")) {
    e.preventDefault();
    window.location.href = "../pages/post-edit.html";
  }
  // 삭제 버튼 클릭
  if (e.target.closest("#post-delete-btn")) {
    e.preventDefault();
    window.location.href = "../pages/posts.html";
  }

  // 댓글
    // 수정 버튼 클릭
   if (e.target.closest("#comment-edit-btn")) {
    e.preventDefault();
    // window.location.href = "../pages/post-edit.html";
  }
  // 삭제 버튼 클릭
  if (e.target.closest("#comment-delete-btn")) {
    e.preventDefault();
    // window.location.href = "../pages/posts.html";
  }
});