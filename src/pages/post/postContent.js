import { likeBtnClicked } from "./post.js";

class MyContent extends HTMLElement{
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
        <div class="post-content">
            <div class="post-img-wrap">
                <img id="post-img" title="이미지 입니다"/>
            </div>
            <div class="post-text">
                <!--<p></p>-->
            </div>    
            <div class="info-wrap">
                <div class="box-wrap">
                    <div class="box like-box">
                        <p id="like-count">${post.likeCount}</p>
                        <p class="box-title">좋아요수</p>
                    </div>
                    <div class="box">
                        <p id="view-count">${post.viewCount}</p>
                        <p class="box-title">조회수</p>
                    </div>
                    <div class="box">
                        <p id="comment-count">${post.commentCount}</p>
                        <p class="box-title">댓글</p>
                    </div>
                </div>
            </div>
        </div>    
        `;
        template.content.prepend(style);

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    addEvents(post){
        const elImg = this.shadowRoot.querySelector('#post-img');
        if (post.img == null) {
          elImg.classList.add('none');
        } else {
          const fullUrl = "http://localhost:8080" + post.img;
    
          const tempImg = new Image();
          tempImg.src = fullUrl;
    
          tempImg.onload = () => {
            const isWide = tempImg.width > tempImg.height;
    
            elImg.src = fullUrl;
            elImg.style.width = isWide ? '100%' : 'auto';
            elImg.style.height = isWide ? 'auto' : '100%';
          };
        }

        const postText=this.shadowRoot.querySelector('.post-text');
        const pTag = document.createElement("p");
        pTag.innerHTML=post.text;
        postText.appendChild(pTag);

        // 좋아요
        const elLikeBtn = this.shadowRoot.querySelector('.like-box');
        elLikeBtn.addEventListener("click", async ()=>{
            const container = this.shadowRoot.querySelector("#like-count");

            likeBtnClicked(container);
            
        });
    
    }
}

customElements.define('my-postcontent', MyContent);

//CSS
const style = document.createElement('style');
style.textContent = `

/* 사진과 글 영역 */
#post-img {
    margin: auto;
    padding-top: 12px;
    object-fit: contain;
    display: flex;
}

.post-text {
    font-size: 0.9rem;
    line-height: 21.15px;
    letter-spacing: 0%;
    margin: 12px 24px;
}

/* 좋아요수, 조회수, 댓글 */
.info-wrap {
    display: flex;
    align-items: center;
    justify-content: center; 
    padding-bottom: 32px; 
    border-bottom: 1px solid #00000029;
}

.box-wrap {
    width: calc(var(--post-width) * 0.6);
    display: flex;
    justify-content: center; 
}

.box {
    flex: 1;
    height: 77px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    background-color: var(--secondary-color);
    margin: 0 8px;
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
}

.like-box:hover {
    cursor: pointer;
    background-color: var(--point-color);
}

#like-count,
#comment-count,
#view-count {
    line-height: 26px;
    margin: auto;
}

.box-title {
    line-height: 25.04px;
    margin: auto;
}
`;

export const updateDom = (container, post) => {
    const postContent = container.querySelector('my-postcontent');
    postContent.data = post;
}