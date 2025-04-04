import { updateDom } from './commentsView.js';
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');
const container = document.querySelector('.comments');


// 페이지 로드 시 댓글 목록 불러오기
document.addEventListener('DOMContentLoaded', () => getComments());

// 댓글 삭제 버튼 클릭
export const deleteBtnClicked = (commentId)=>{

  const commentModal = document.querySelector("#comment-modal");
  commentModal.classList.add('block');
  
  const yesBtn = commentModal.shadowRoot.querySelector(".modal-btn.yes");
  const noBtn = commentModal.shadowRoot.querySelector(".modal-btn.no");
  
  noBtn.addEventListener("click", () => {
    commentModal.classList.remove('block');
  });
  yesBtn.addEventListener("click", () => {
    commentModal.classList.remove('block');
    deleteComment(commentId);
    setTimeout(()=>{
      getComments();
    },300);
  });
}
// 댓글 수정 버튼 클릭
export const editBtnClicked = async(commentId) => {
  const commentEl = document.querySelector(`my-commentsview[data-id="${commentId}"]`);
  if (!commentEl) return;

  const shadowText = commentEl.shadowRoot.querySelector('.comment-text')?.textContent;
  const newText = prompt('댓글을 수정하세요:', shadowText);
  if (newText) {
    await patchComment(commentId, newText);
    return getComments();
  }
};

// API -----------------------------------
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
