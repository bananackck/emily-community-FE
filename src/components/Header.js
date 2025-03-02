const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../assets/style/header.css">
  <header>
    <div class="header-contents">    
        <div class="nav-btn left">
            <a href="./login.html">
                <img id="nav-back-img" src="../assets/img/navigate-back.png" alt="뒤로가기">
            </a>
        </div>
        <div class="project-name">아무 말 대잔치</div>
        <div class="nav-btn right">
            <a href="./posts.html">
                <img id="profile-img" src="../assets/img/profile.png" alt="프로필 가기" style="border-radius: 20px;">
            </a>
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
      const navBtns = this.shadowRoot.querySelectorAll('.nav-btn.left');
      navBtns.forEach(btn => btn.classList.add('hidden'));
    }
    // "right-hidden" 속성이 있으면 네비 버튼에서 hidden 클래스를 추가
    if (this.hasAttribute('right-hidden')) {
      const navBtns = this.shadowRoot.querySelectorAll('.nav-btn.right');
      navBtns.forEach(btn => btn.classList.add('hidden'));
    }
  }
}

customElements.define('my-header', MyHeader);
