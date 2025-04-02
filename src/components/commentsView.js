const params = new URLSearchParams(window.location.search);
const postId = params.get('id');
const token = localStorage.getItem('jwtToken');
const container = document.querySelector('.comments');


// 페이지 로드 시 댓글 목록 불러오기
document.addEventListener('DOMContentLoaded', () => getComments());

// 댓글 컨테이너에 이벤트 위임 설정
container.addEventListener('click', async (e) => {
  const commentEl = e.target.closest('.comment');

  if (!commentEl) return;
  const commentId = commentEl.dataset.id;

  // 삭제
  if (e.target.matches('.comment-delete-btn')) {
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
class CommentsView extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }
  
  set data(comment){
    const template = document.createElement('template');
    template.innerHTML = `
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
        </div>`;
    if(comment.userId == localStorage.getItem('userId')){
        template.innerHTML += `
        <div class="edit-btns">
            <button class="small-btn comment-edit-btn">수정</button>
            <button class="small-btn comment-delete-btn">삭제</button>
        </div>`;
    }
    template.content.prepend(style);

    this.shadowRoot.innerHTML = ""; // 초기화
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-commentsview', CommentsView);

// CSS
const style  = document.createElement('style');
style.textContent = `
/* 댓글 */
.comments{
    display: flex;
    flex-direction: column;

}
.comment{
    flex:2;

    display: flex;
    padding-top: 16px;
}

.comment-content{
    flex: 4;
    display: flex;
    flex-direction: column;
}
.post-time.comment-setting{
    justify-content: flex-start;
}
.comment-text{
    flex:4;
    padding: 0.8rem 0 0 3rem;
    font-weight: 100;
}

/* 댓글 버튼 공간 */
.comment-btn-wrap{
    flex: 2;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    padding-right: 8px;
}
.main-btn{
    width: 138px;
    height: 39px;
    border-radius: 16px;
    
    font-weight: 700;
    line-height: 16.71px;
    letter-spacing: 0%;
}
.main-btn:hover{
    background-color: var(--activate-color);
}`;


export const updateDom = (container, comment)=>{
    const commentElement = document.createElement('my-commentsview');
    commentElement.data = comment;
    container.appendChild(commentElement);
};