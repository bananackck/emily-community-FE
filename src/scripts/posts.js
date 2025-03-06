import {updateDom} from '../components/postsView.js'

// 게시글 불러오기
async function getPosts() {
  try {
    // 게시글 헤더
    const response1 = await fetch("../data/post-data.json");
    const posts = await response1.json();

    // 게시글 저자
    const response2 = await fetch("../data/user-data.json");
    const users = await response2.json();

    // 모든 게시물 정보 가져오기
    const postList = posts.map((post) => {
      const user = users[post.author];
      return {
        title: post.title,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
        author: user.nickname,
        profile: "../" + user.profilePicture,
      };
    });
    // DOM 업데이트
    const container = document.querySelector(".posts");
    container.innerHTML = "";
    postList.forEach((post)=>{
      updateDom(container, post);
    });

    // 응답 생성
    const response = {
      ok: true,
      status: 200,
      json: async () => ({
        message: "get_posts",
        data: postList,
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
    const response = await getPosts();
    if (response.ok) {
      const result = await response.json();
      console.log("게시물 조회 성공", result);
    } else {
      console.error("게시물 조회 실패");
    }
});