// DOM 업데이트
export const updateDom = (container, comment)=>{
    const commentElement = document.createElement("article");
    
    // 게시물 하나씩 그리기
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
        <div class="comment-content">
            <div class="writer-wrap">
                <!-- 작성자 -->
                <div class="profile-img-wrap">
                     <img class="profile-img" id="comment-profile" src="${comment.userProfileImg}">
                </div>
                <div class="writer" id="comment-writer">${comment.userNickname}</div>
                    <!-- 작성 시간 -->
                    <p class="post-time comment-setting" id="comment-post-time">${comment.createdAt}</p>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                </div>
                <!-- 편집 버튼 -->
                <div class="edit-btns">
                    <button class="small-btn" id="comment-edit-btn">수정</button>
                    <button class="small-btn" id="comment-delete-btn">삭제</button>
                </div>`;
    container.appendChild(commentElement);
}