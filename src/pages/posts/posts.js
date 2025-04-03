import {updateDom} from './postsView.js'

// 게시글 불러오기
async function getPosts() {
  //jwt토큰
  const token = localStorage.getItem('jwtToken');
  try {
    // 게시글 헤더
    const response1 = await fetch('http://localhost:8080/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'   // allowCredentials=true일 때만 사용
    });

    const posts = await response1.json();

    // 모든 게시물 정보 가져오기
    const postList = posts.map((post) => {

      return {
        id: post.id,
        title: post.title,
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        viewCount: post.viewCount,
        createdAt: post.createdAt.replace('T',' '),

        //게시글 작성자
        author: post.userNickname,
        profile: "http://localhost:8080"+post.userProfileImg
      };
    });
    // DOM 업데이트
    const container = document.querySelector(".posts");
    container.innerHTML = "";
    postList.reverse().forEach((post)=>{
      updateDom(container, post);
    });

    // 응답 생성
    return postList;

  } catch (error) {
    console.error("🚨게시물 로드 오류:", error);
    return null;
  }
}


// 이벤트 핸들러
document.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    if(localStorage.getItem('jwtToken')===null){
      window.location.href = "../pages/login.html";
    }
    
    const postList = await getPosts();
    console.log("게시물 조회 결과:", postList);
});