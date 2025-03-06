export const updateDom = (post, users)=>{
    const container = document.querySelector(".contents");
    container.innerHTML = "";

    const postElement = document.createElement("article");

    // 게시물 그리기
    postElement.classList.add("post");
    postElement.innerHTML = `
        <div class="post-header">
                    <p class="post-title">${post.title}</p>
                    <div class="writer-area">
                        <div class="writer-wrap">
                            <!-- 작성자 -->
                            <div class="profile-img-wrap">
                                <img class="profile-img" src=${"../"+users[post.author].profilePicture} alt="프로필 가기">
                            </div>
                            <div class="writer">${users[post.author].nickname}</div>
                            <!-- 작성 시간 -->
                            <p class="post-time">${post.createdAt}</p>
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
                        <textarea id="comment-inputbox" placeholder="댓글을 남겨주세요!"></textarea>
                        <div class="comment-btn-wrap">
                            <button class="main-btn">댓글 등록</button>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="writer-area">
                            <div class="comment">
                                <div class="writer-wrap">
                                    <!-- 작성자 -->
                                    <div class="profile-img-wrap">
                                        <img class="profile-img" src=${"../"+users[post.comment[0].author].profilePicture} alt="프로필 가기">
                                    </div>
                                    <div class="comment-writer">
                                        ${users[post.comment[0].author].nickname}
                                    </div>
                                    <!-- 작성 시간 -->
                                    <p class="comment-post-time">${post.comment[0].createdAt}</p>
                                </div>
                                <p class="comment-text">${post.comment[0].text}</p>
                            </div>
                            <!-- 편집 버튼 -->
                            <div class="edit-btns">
                                <button class="small-btn">수정</button>
                                <button class="small-btn">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
      `;
    container.appendChild(postElement);
}