import {updateDom} from '../components/postsView.js'

// 게시글 불러오기
async function getPost() {
  try {
    // 게시글 헤더
    const response1 = await fetch("../data/post-data.json");
    const posts = await response1.json();

    // 게시글 저자
    const response2 = await fetch("../data/user-data.json");
    const users = await response2.json();

    const post=posts[0];
    // 게시물 정보 가져오기
    console.log(post);

    // DOM 업데이트
    // updateDom(postList);
// DOM 업데이트
    const updateDom = ()=>{
     console.log(post);

    const container = document.querySelector(".post");
    container.innerHTML = "";

      const postElement = document.createElement("article");

      // 게시물 그리기
      console.log(post);
      postElement.classList.add("post");
      postElement.innerHTML = `
        <div class="post-header">
                    <p class="post-title">제목 1</p>
                    <div class="writer-area">
                        <div class="writer-wrap">
                            <!-- 작성자 -->
                            <div class="profile">
                                <img id="profile-img" src=${"../"+users[post.author].profilePicture} alt="프로필 가기" style="border-radius: 20px;">
                            </div>
                            <div id="writer">${users[post.author].nickname}</div>
                            <!-- 작성 시간 -->
                            <p id="post-time">${post.createdAt}</p>
                        </div>
                        <!-- 편집 버튼 -->
                        <div class="edit-btns">
                            <button class="small-btn">수정</button>
                            <button class="small-btn">삭제</button>
                        </div>
                    </div>
                </div>
            
                <div class="post-content">
                    <!-- <div class="post-img-wrap> -->
                        <img id="post-img" src=${"../"+post.content[0].img} />
                    <!-- </div> -->
                    <div class="post-text">
                        <p>${post.content[0].text}</p>
                    </div>    
                    <div class="info-wrap">
                        <div class="box-wrap">
                            <div class="box">
                                <p id="likeCount">${post.likeCount}</p>
                                <p class="box-title">좋아요수</p>
                            </div>
                            <div class="box">
                                <p id="viewCount">${post.viewCount}</p>
                                <p class="box-title">조회수</p>
                            </div>
                            <div class="box">
                                <p id="commentCount">${post.commentCount}</p>
                                <p class="box-title">댓글</p>
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="comment-wrap">
                    <div class="comment-box">
                        <textarea id="comment-textbox" placeholder="댓글을 남겨주세요!"></textarea>
                        <div class="comment-btn-wrap">
                            <button class="main-btn">댓글 등록</button>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="writer-area">
                            <div class="writer-wrap">
                                <!-- 작성자 -->
                                <div class="profile">
                                    <img id="profile-img" src="../assets/img/profile.png" alt="프로필 가기" style="border-radius: 20px;">
                                </div>
                                <div class="writer">
                                    더미 작성자 1
                                </div>
                                <!-- 작성 시간 -->
                                <p class="post-time">2021-01-01 00:00:00</p>
                            </div>
                            <p class="comment-text">댓글 내용</p>
                        </div>
                        <!-- 편집 버튼 -->
                        <div class="edit-btns">
                            <button class="small-btn">수정</button>
                            <button class="small-btn">삭제</button>
                        </div>
                    </div>
                </div>
      `;
      container.appendChild(postElement);

}

updateDom();






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
    const response = await getPost();
    // if (response.ok) {
    //   const result = await response.json();
    //   console.log("게시물 조회 성공", result);
    // } else {
    //   console.error("게시물 조회 실패");
    // }
});