const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');
const container = document.querySelector('.comments');


// 페이지 로드 시 댓글 목록 불러오기
document.addEventListener('DOMContentLoaded', () => getComments());

// 댓글 컨테이너에 이벤트 위임 설정
container.addEventListener('click', async (e) => {
  const commentEl = e.target.closest('.comment');
  console.log(commentEl.dataset);

  if (!commentEl) return;
  const commentId = commentEl.dataset.id;
  console.log(commentId);

  // 삭제
  if (e.target.matches('.comment-delete-btn')) {
    await deleteComment(commentId);
    return getComments();
  }

  // 수정
  if (e.target.matches('.comment-edit-btn')) {
    const newText = prompt('댓글을 수정하세요:', commentEl.querySelector('.comment-text').textContent);
    if (newText) {
      await patchComment(commentId, newText);
      return getComments();
    }
  }
});

// 댓글 목록 조회
export async function getComments() {
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('댓글 조회 실패');
    const comments = await res.json();
    container.innerHTML = '';
    comments.reverse().forEach(comment => updateDom(container, comment));
  } catch (err) {
    console.error('댓글 로드 오류:', err);
  }
}

// 댓글 삭제
export async function deleteComment(commentId) {
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('댓글 삭제 실패');
  } catch (err) {
    console.error('댓글 삭제 오류:', err);
  }
}

// 댓글 수정
async function patchComment(commentId, text) {
  try {
    const res = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('댓글 수정 실패');
  } catch (err) {
    console.error('댓글 수정 오류:', err);
  }
}

//----------------------------------------------------------
// DOM 업데이트
export const updateDom = (container, comment)=>{
    console.log("밑에 내려옴")
    const commentElement = document.createElement("article");
    
    // 댓글 하나씩 그리기
    commentElement.classList.add("comment");
    commentElement.dataset.id = comment.id;
    commentElement.innerHTML = `
        <div class="comment-content">
            <div class="writer-wrap">
                <!-- 작성자 -->
                <div class="profile-img-wrap">
                     <img class="profile-img" id="comment-profile" src="${"http://localhost:8080"+comment.userProfileImg}">
                </div>
                <div class="writer" id="comment-writer">${comment.userNickname}</div>
                <!-- 작성 시간 -->
                <p class="post-time comment-setting" id="comment-post-time">${comment.createdAt.replace('T',' ')}</p>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
        <!-- 편집 버튼 -->
        <div class="edit-btns">
            <button class="small-btn" id="comment-edit-btn">수정</button>
            <button class="small-btn comment-delete-btn">삭제</button>
        </div>`;
    container.appendChild(commentElement);
}