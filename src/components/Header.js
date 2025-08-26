import './dropdown.js';

//HTML
const template = document.createElement('template');
template.innerHTML = `
  <header>
    <div class="header-contents">    
        <div class="nav-btn left">
            <a href="javascript:history.back()">
                <img id="nav-back-img" src="../../assets/img/navigate-back.png" alt="뒤로가기">
            </a>
        </div>
        <div class="project-name">내 새꾸 좀 봐봐요</div>
        <div class="nav-btn right" id="dropdown">
            <my-dropdown></my-dropdown>
        </div>
    </div>
  </header>

`;

//JS
class MyHeader extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM 사용: 스타일 및 DOM 캡슐화 가능
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // "left-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('left-hidden')) {
      const navBtns = this.shadowRoot.querySelector('.nav-btn.left');
      navBtns.classList.add('hidden');
    }
    // "right-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('right-hidden')) {
      const navBtns = this.shadowRoot.querySelector('.nav-btn.right');
      navBtns.classList.add('hidden');
    }

    //아무 말 대잔치 누를 시 게시판 목록으로
    const elHeaderLogo = this.shadowRoot.querySelector('.project-name');
    elHeaderLogo.addEventListener('click', () => {
      window.location.href = '../posts/posts.html';
    });
  }
}

//CSS
const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', '../../assets/style/common.css');
template.content.appendChild(link);

const style = document.createElement('style');
style.textContent = `
  header{
      width: 100%;
      height: 10vh;

      top: 0;
      position: sticky;
      display: flex;
      align-items: center;
      justify-content: center;
      
      font-family: var(--point-font);
      font-weight: 400;
      font-size: 2rem;
      line-height: 2;

      border-bottom: 1px solid #000000;
  }
  .header-contents{
      width: 570px;
      align-items: center;
      justify-content: center;
      display: flex;
  }
  .project-name{
      text-align: center;
      cursor: pointer;
  }
  .nav-btn{
      height: 40px;
  }
  .nav-btn img {
      height: 40px; 
      
      cursor: pointer;
  }
  .left{
      margin-right: auto;
  }
  .right{
      margin-left: auto;
  }

`
template.content.prepend(style);

customElements.define('my-header', MyHeader);


