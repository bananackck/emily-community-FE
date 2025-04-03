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

// DOM 업데이트
export const updateDom = (container, comment)=>{
    const commentElement = document.createElement('my-commentsview');
    commentElement.data = comment;
    container.appendChild(commentElement);
};