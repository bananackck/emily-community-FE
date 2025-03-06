// DOM 업데이트
export const updateDom = (container, post)=>{
    const postElement = document.createElement("article");
    // 클릭 시 이동
    postElement.addEventListener("click", () => {
      location.href = "./post.html";
    });
    // 게시물 하나씩 그리기
    postElement.classList.add("post");
    postElement.innerHTML = `
      <div class="post-header">
          <div class="post-info">
              <div class="post-title" id="title">${post.title}</div>
              <div class="post-info-wrap">
                  <div class="info">좋아요<p id="likeCount">${post.likeCount}</p></div>
                  <div class="info">댓글<p id="commentCount">${post.commentCount}</p></div>
                  <div class="info">조회수<p id="viewCount">${post.viewCount}</p></div>
              </div>
          </div>
          <div id="post-time">${post.createdAt}</div>
      </div>
      <div class="writer-wrap">
          <div class="profile">
              <img id="profile-img" src="${post.profile}" alt="프로필 가기" style="border-radius: 20px;">
          </div>
          <div id="writer">${post.author}</div>
      </div>
    `;
    container.appendChild(postElement);
}