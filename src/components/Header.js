import './dropdown.js'; // header.js의 맨 위에

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../assets/style/header.css">
  <header>
    <div class="header-contents">    
        <div class="nav-btn left">
            <a href="javascript:history.back()">
                <img id="nav-back-img" src="../assets/img/navigate-back.png" alt="뒤로가기">
            </a>
        </div>
        <div class="project-name">내 새꾸 좀 봐봐요</div>
        <div class="nav-btn right" id="dropdown">
            <my-dropdown></my-dropdown>
        </div>

    </div>
  </header>

`;

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
      window.location.href = '../pages/posts.html';
    });


  }
}

customElements.define('my-header', MyHeader);


