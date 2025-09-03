import '../../components/profileImg.js';
class PostsView extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    set data(post) {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="post">
                <div class="post-header">
                    <div class="post-info">
                        <div class="post-title">${post.title}</div>
                        <div class="post-info-wrap">
                            <div class="info">좋아요 ${post.likeCount}</div>
                            <div class="info">댓글 ${post.commentCount}</div>
                            <div class="info">조회수 ${post.viewCount}</div>
                        </div>
                    </div>
                    <div class="post-time">${post.createdAt}</div>
                </div>
                <div class="writer-wrap">
                    <my-profileimg id="profile-img" src="${post.profile}"></my-profileimg>
                    <div class="writer">${post.author}</div>
                </div>
            </div>
        `;
        template.content.prepend(style);
  
        this.shadowRoot.innerHTML = ""; // 초기화
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        this.addEventListener('click', () => {
            window.location.href = `./post.html?id=${post.id}`;
        });
    }
}
  
customElements.define('posts-view', PostsView);
  
//CSS
const style  = document.createElement('style');
style.textContent = `
    /* 게시글 */
.post{
    display: flex;
    flex-direction: column;

    width: var(--post-width);
    border-radius: 16px;

    background-color: #FFFFFF;

    margin-top: 12px;
    cursor: pointer;
}

/* 게시글 헤더(정보 부분) */
.post-header{
    flex: 2;
    display: flex;
    margin: 1.5rem;
}
.post-info{
    flex:2;
}
.post-title{
    font-weight: 700;
    font-size: 1.5rem;

    margin-bottom: .75rem;
}
.post-info-wrap{
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
}
.info{
    display: flex;
    margin-right: 0.5rem;
}
.post-time{
    flex:1;
    margin-top: auto;
    margin-left: auto;

    display: flex;
    justify-content: flex-end; 
    align-items: flex-end;

    font-size: 0.8rem;
}

/* 작성자 */
.writer-wrap{
    flex: 1;

    display: flex;

    padding: 1rem 1.5rem;

    border-top: 1px solid #00000029;
}
.writer{
    flex: 12;

    display: flex;
    align-items: center;

    font-weight: 700;
    margin-left: 8px;
}
`;

// DOM 업데이트
export const updateDom = (container, post) => {
    const postComponent = document.createElement('posts-view');
    postComponent.data = post; // setter 호출
    container.appendChild(postComponent);
  };
  