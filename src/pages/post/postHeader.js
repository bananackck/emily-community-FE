import '../../components/profileImg.js';
import {  editBtnClicked, deleteBtnClicked } from './post.js';

class MyHeader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    set data(post){
        this.render(post);
        this.addEvents(post);
    }

    render(post){
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="post-header"> 
                <p class="post-title">${post.title}</p>
                <div class="writer-area">
                    <div class="writer-wrap">
                        <my-profileimg id="profile-img" src="${"http://localhost:8080"+post.userProfileImg}"></my-profileimg>
                        <div class="writer" id="writer">${post.userNickname}</div>
                        <p class="post-time" id="post-time">${post.createdAt.replace('T',' ')}</p>
                    </div>
                    <div class="edit-btns">
                        <button class="small-btn" id="post-edit-btn">수정</button>
                        <button class="small-btn" id="post-delete-btn">삭제</button>
                    </div>
                </div>
            </div>
        `;

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../../assets/style/button.css');
        template.content.appendChild(link);
        template.content.prepend(style);

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    addEvents(post){
        const elEditBtns = this.shadowRoot.querySelector('.edit-btns');
        if(post.userId != localStorage.getItem('userId')){
            elEditBtn.classList.add('none');
        }

        elEditBtns.addEventListener('click', (e) => {
            // 삭제
            if (e.target.matches('#post-delete-btn')) {
                deleteBtnClicked(post.id);
            }
            // 수정
            if (e.target.matches('#post-edit-btn')) {
                editBtnClicked(post.id);
            }
        });
    }
}

customElements.define('my-postheader', MyHeader);

//CSS
const style = document.createElement('style');
style.textContent = `
/* 작성자 영역 */
.post-header {
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid #00000029;
}

.post-title {
    flex: 1;
    font-weight: 700;
    font-size: 1.3rem;
    margin:0;
}

.writer-area {
    flex: 2;
    display: flex;
    padding-top: 16px;
}

.writer-wrap {
    flex: 4;
    display: flex;
}

.profile-img-wrap {
    border-radius: 50%;
    overflow: hidden;
    width: 2.5rem;
    height: 2.5rem;
}

.profile-img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
}

.writer {
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 700;
    margin-left: 0.5rem;
}

.post-time {
    flex: 3;
    display: flex;
    justify-content: flex-end; 
    align-items: center;
    padding: 0 0.4rem;
    font-size: 0.8rem;
}
    .none{
        display: none;
    }`;

export const updateDom = (container, post) => {
    const postHeader = container.querySelector('my-postheader');
    if (postHeader) {
        postHeader.data = post;
    } else {
        const newPostHeader = document.createElement('my-postheader');
        newPostHeader.data = post;
        container.appendChild(newPostHeader);
    }
}