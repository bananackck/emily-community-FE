const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" type="text/css" href="../assets/style/Header.css">
  <header>
    <div class="header-contents">    
        <div class="nav-btn left hidden">
            <a href="./Log_in.html">
                <img id="nav-back-img" src="../assets/img/navigate_back.png" alt="뒤로가기">
            </a>
        </div>
        <div class="project-name">아무 말 대잔치</div>
        <div class="nav-btn right hidden">
            <a href="./Posts.html">
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
}

customElements.define('my-header', MyHeader);
