import '../../components/profileImg.js';

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
                <my-profileimg id="profile-img" src="${"http://localhost:8080"+comment.userProfileImg}"></my-profileimg>
                <div class="writer">${comment.userNickname}</div>
                <!-- 작성 시간 -->
                <p class="post-time comment-setting" id="comment-post-time">${comment.createdAt.replace('T',' ')}</p>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>`;
    
    template.innerHTML += `
    <div class="edit-btns">
        <button class="small-btn comment-edit-btn">수정</button>
        <button class="small-btn comment-delete-btn">삭제</button>
    </div>`;
    
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../assets/style/button.css');
    template.content.appendChild(link);
    template.content.prepend(style);

    this.shadowRoot.innerHTML = ""; // 초기화
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const editBtns = this.shadowRoot.querySelector('.edit-btns');
    if (comment.userId != localStorage.getItem('userId') && editBtns) {
      editBtns.classList.add('hidden');
    }
  }
}

customElements.define('my-commentsview', CommentsView);

// CSS
const style  = document.createElement('style');
style.textContent = `
  :host {
    flex: 2;
    display: flex;
    padding-top: 16px;
  }

  /* 댓글 콘텐츠 영역 */
  .comment-content {
    flex: 4;
    display: flex;
    flex-direction: column;
  }

  .post-time.comment-setting {
    flex: 4;
    padding-left: 8px;
    font-size: 0.75rem;
}

  .comment-text {
    flex: 4;
    padding: 0 0 0 3rem;
    font-weight: 100;
  }

  /* 작성자 영역 */
  .writer-wrap {
    flex: 4;
    display: flex;
  }
  .writer{
    font-weight: 700;
    margin: auto 0.75rem;
    flex: 2;
  }
    .edit-btns{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
        .hidden{
    visibility: hidden !important;;
}
`;

// DOM 업데이트
export const updateDom = (container, comment)=>{
    const commentElement = document.createElement('my-commentsview');
    commentElement.data = comment;
    container.appendChild(commentElement);
};